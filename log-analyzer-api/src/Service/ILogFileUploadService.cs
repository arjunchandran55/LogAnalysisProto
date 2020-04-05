using log_analyzer_api.Models;
using System.Collections.Generic;

namespace log_analyzer_api.Services
{
    public interface ILogFileUploadService
    {
        public List<LogFileUploadInformation> Get();

        public LogFileUploadInformation Get(string id);

        public LogFileUploadInformation Create(LogFileUploadInformation logFileUploadInformation);

        public void Update(string id, LogFileUploadInformation logFileUploadInformationToUpdate);

        public void Remove(LogInformation logInformationToRemove);

        public void Remove(string id);
    }
}