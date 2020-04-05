using log_analyzer_api.Models;
using System.Collections.Generic;

namespace log_analyzer_api.Services
{
    public interface ILogProcessingService
    {
        public void ProcessLogInformation(string filePath);
    }
}