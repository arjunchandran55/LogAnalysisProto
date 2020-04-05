using log_analyzer_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;
using MongoDB.Bson;
using Newtonsoft.Json;
namespace log_analyzer_api.Services
{
    public class LogInfoService: ILogInfoService
    {
        private readonly IMongoCollection<LogInformation> _logInformation;
        enum FilterOperations
        { equals = '=', contains = '~', not_contains = '!' }

        public  LogInfoService()
        {
            var client = new MongoClient(Environment.GetEnvironmentVariable("MONGO_DB_SERVER"));
            var database = client.GetDatabase(Environment.GetEnvironmentVariable("MONGO_DB_NAME"));

            _logInformation = database.GetCollection<LogInformation>("LogInformation");
        }

        public List<LogInformation> Get() =>
            _logInformation.Find(logInfo => true).ToList();

        public LogInformation Get(string id) =>
            _logInformation.Find<LogInformation>(logInfo => logInfo.Id.ToString() == id).FirstOrDefault();

        public void Update(string id, LogInformation logInformationToUpdate) =>
            _logInformation.ReplaceOne(logInfo => logInfo.Id.ToString() == id, logInformationToUpdate);

        public void Remove(LogInformation logInformationToRemove) =>
            _logInformation.DeleteOne(logInfo => logInfo.Id == logInformationToRemove.Id);

        public void Remove(string id) => _logInformation.DeleteOne(logInfo => logInfo.Id.ToString() == id);
        
        public LogInformation Create(LogInformation logInformation)
        {
            _logInformation.InsertOne(logInformation);
            return logInformation;
        }

        public List<LogInformation> GetLogsInRange(string fromDate, string toDate, int recordCount, int skipCount) {
            if(string.IsNullOrEmpty(fromDate) && string.IsNullOrEmpty(toDate)) {
                return _logInformation.Find(_ => true).Limit(recordCount).ToList();
            }
            var builder = Builders<LogInformation>.Filter;
            var filter = builder.Empty;
            var greaterThanclause = builder.Gte(x => x.LoggedDate, DateTime.Parse(fromDate));
            var lessThanclause = builder.Lte(x => x.LoggedDate, DateTime.Parse(toDate));
            filter = builder.And(filter, greaterThanclause);
            filter = builder.And(filter, lessThanclause);
            var result = _logInformation.Find(filter);

            return filterOrLimitRecords(result, recordCount, skipCount).ToList();
        }

        public List<LogInformation> GetFilteredLogs(List<string> filterData, int recordCount , int skipCount) {
            if(filterData.Count ==0) {
                return new List<LogInformation>();
            }
            var builder = Builders<LogInformation>.Filter;
            var mongofilter = builder.Empty;
            var notMatchbuilder = Builders<LogInformation>.Filter;
            var notMatchFilter = builder.Empty;
            var notMatchFilterApplied = false;
            foreach( string filterJson in filterData )
            {
                var filterObject = JsonConvert.DeserializeObject<List<FilterInformation>>(filterJson);
                foreach (FilterInformation filter in filterObject) {
                    switch(filter.filterOperation) {
                        case "equals": {
                        var equalClause = builder.Eq(filter.filterKey, filter.filterValue);
                        mongofilter = builder.And(mongofilter, equalClause);  
                        } break;
                        case "contains": {
                        var containsClause = builder.Regex(filter.filterKey, new BsonRegularExpression(".*"+filter.filterValue+".*"));
                        mongofilter = builder.And(mongofilter, containsClause);  
                        } break;
                        case "not_contains": {
                        var notContainsClause = builder.Regex(filter.filterKey, new BsonRegularExpression(".*"+filter.filterValue+".*"));
                        notMatchFilter = notMatchbuilder.And(notMatchFilter, notContainsClause);
                        notMatchFilterApplied = true;
                        } break;
                        default: break;
                    }
                }
            }
            // Work around for not contains
            var result = filterOrLimitRecords(_logInformation.Find(mongofilter), recordCount, skipCount).ToList();
            if(notMatchFilterApplied) {
                var toFilter = filterOrLimitRecords(_logInformation.Find(notMatchFilter), recordCount, skipCount).ToList();
                result.RemoveAll(x => toFilter.Select(y => y.Id).Contains(x.Id));
            }
            return result;
        }

        public List<LogInformation> SearchLogs(string searchTerm)
        {
            searchTerm = searchTerm.ToLower().Trim();
            return _logInformation.Find(Builders<LogInformation>.Filter.Text(searchTerm)).ToList();
        }

        private IFindFluent<LogInformation, LogInformation> filterOrLimitRecords(IFindFluent<LogInformation, LogInformation> result, int recordCount, int skipCount ) {
            if(skipCount > 0) {
                result = result.Skip(skipCount );
            }
            if(recordCount > 0) {
                result = result.Limit(recordCount);
            }
            return result;
        }
    }
}