using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.WebUtilities;
using System.IO;
using log_analyzer_api.Services;
using Hangfire;
using Swashbuckle.AspNetCore.Annotations;

namespace log_analyzer_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [SwaggerTag("Supports uploading of log files")]
    public class LogFileUploadController : Controller
    {
        private readonly ILogger<LogFileUploadController> _logger;
        private readonly ILogFileUploadService _logFileUploadService;
        private readonly ILogProcessingService _logProcessingService;

        public LogFileUploadController(ILogger<LogFileUploadController> logger, ILogFileUploadService logFileUploadService, ILogProcessingService logProcessingService)
        {
            _logger = logger;
            _logFileUploadService = logFileUploadService;
            _logProcessingService = logProcessingService;
        }

        /// <summary>
        /// Uploads a given log file to log analyzer.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status415UnsupportedMediaType)]
        public async Task<ActionResult> PostLogFile( IFormFile filePayload)
        {
            if (!HttpContext.Request.HasFormContentType)
                throw new InvalidOperationException(ReasonPhrases.GetReasonPhrase(StatusCodes.Status415UnsupportedMediaType)); 

            var fileName = filePayload.FileName.Trim('"');
            var logFilePath = Path.Combine($"{Path.GetTempPath()}", fileName);
            if (filePayload.Length > 0)
                using (var fileStream = new FileStream(logFilePath, FileMode.Create))
                    await filePayload.CopyToAsync(fileStream);

            _logFileUploadService.Create(new Models.LogFileUploadInformation() {
                LogDate = DateTime.UtcNow,
                LogFilePath = logFilePath
            });
            BackgroundJob.Enqueue(() => _logProcessingService.ProcessLogInformation(logFilePath));
            return new OkObjectResult("Success");
        }
    }
}
