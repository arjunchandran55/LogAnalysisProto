using log_analyzer_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;

namespace log_analyzer_api.Services
{
    public class LogFileUploadService : ILogFileUploadService
    {
        private readonly IMongoCollection<LogFileUploadInformation> _logFileUploadInformation;

        public LogFileUploadService()
        {
            var client = new MongoClient(Environment.GetEnvironmentVariable("MONGO_DB_SERVER"));
            var database = client.GetDatabase(Environment.GetEnvironmentVariable("MONGO_DB_NAME"));

            _logFileUploadInformation = database.GetCollection<LogFileUploadInformation>("LogFileUploadInformation");
        }

        public List<LogFileUploadInformation> Get() =>
            _logFileUploadInformation.Find(logInfo => true).ToList();

        public LogFileUploadInformation Get(string id) =>
            _logFileUploadInformation.Find<LogFileUploadInformation>(logInfo => logInfo.Id.ToString() == id).FirstOrDefault();

        public LogFileUploadInformation Create(LogFileUploadInformation logFileUploadInformation)
        {
            _logFileUploadInformation.InsertOne(logFileUploadInformation);
            return logFileUploadInformation;
        }

        public void Update(string id, LogFileUploadInformation logFileUploadInformationToUpdate) =>
            _logFileUploadInformation.ReplaceOne(logInfo => logInfo.Id.ToString() == id, logFileUploadInformationToUpdate);

        public void Remove(LogInformation logInformationToRemove) =>
            _logFileUploadInformation.DeleteOne(logInfo => logInfo.Id == logInformationToRemove.Id);

        public void Remove(string id) => 
            _logFileUploadInformation.DeleteOne(logInfo => logInfo.Id.ToString() == id);
    }
}