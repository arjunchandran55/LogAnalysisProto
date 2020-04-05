using log_analyzer_api.Models;
using System.Collections.Generic;

namespace log_analyzer_api.Services
{
    public interface ILogInfoService
    {
        public List<LogInformation> Get();
        public List<LogInformation> GetLogsInRange(string fromDate, string toDate, int recordCount, int skipCount);
        public LogInformation Get(string id);
        public LogInformation Create(LogInformation logInformation);
        public void Update(string id, LogInformation logInformationToUpdate);
        public void Remove(LogInformation logInformationToRemove);
        public void Remove(string id);
        public List<LogInformation> SearchLogs(string searchTerm);
        public List<LogInformation> GetFilteredLogs(List<string> filterData, int recordCount , int skipCount);
    }
}