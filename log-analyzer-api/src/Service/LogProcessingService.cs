using log_analyzer_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;
using System.IO;

namespace log_analyzer_api.Services
{
    public class LogProcessingService: ILogProcessingService
    {
        private readonly ILogInfoService _logInfoService;

        private string logDelimiter = "!Request-Body=";

        public LogProcessingService(ILogInfoService logInfoService)
        {
            _logInfoService = logInfoService;
        }

        public void ProcessLogInformation(string filePath)
        {
            FileStream fileStream = new FileStream(filePath, FileMode.Open);
            using (StreamReader reader = new StreamReader(fileStream))
            {
                string paragraph = string.Empty;
                string logHeader = string.Empty;
                while (!reader.EndOfStream) {
                    string currentLine = reader.ReadLine();
                    if(logHeader == string.Empty) {
                        logHeader = currentLine;
                    }
                    else {
                        paragraph = paragraph + currentLine;
                    }
                    if(paragraph.Contains(logDelimiter) || currentLine.Contains(logDelimiter)) {
                        prepareLogModel(logHeader, paragraph);
                        paragraph = string.Empty;
                        logHeader = string.Empty;
                    }
                };
            }
        }

        public void prepareLogModel(string logHeader, string paragraph) {
            string[] headerElements = logHeader.Split(" ");
            string[] elements = paragraph.Split("#,!");
            string logTime = $"{headerElements[0]} {headerElements[1]}".Replace(",", ".");
            DateTime localTime = DateTime.Parse(logTime); // UTC enforced while adding to Mongo Model
            LogInformation logInformation = new LogInformation() {
                LoggedDate = localTime,
                RawLog = paragraph
            };
            foreach (var element in elements)
            {
                populateLogModel(element, logInformation);
            }
            _logInfoService.Create(logInformation);
        }

        public void populateLogModel(string element, LogInformation logInformation) {
            string[] keyValue = element.Split("=");
            string key = keyValue[0];
            string value = keyValue[1];
            switch(key) {
                case "IP-Address": logInformation.IpAddress = value; break;
                case "User-Agent": logInformation.UserAgent = value; break;
                case "Status-Code": logInformation.StatusCode = value; break;
                case "Request-Type": logInformation.RequestType = value; break;
                case "API": logInformation.ApiName = value; break;
                case "User-Name": logInformation.User = value; break;
                case "User-Login": logInformation.Email = value; break;
                case "EnterpriseId": logInformation.EnterpriseId = value; break;
                case "Auth-Status": logInformation.AuthStatus = value; break;
            }
        }
    }
}