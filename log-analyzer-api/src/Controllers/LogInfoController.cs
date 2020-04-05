using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using log_analyzer_api.Models;
using log_analyzer_api.Services;
using Swashbuckle.AspNetCore.Annotations;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace log_analyzer_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [SwaggerTag("Support retrieval of Log information   ")]
    public class LogInfoController : ControllerBase
    {

        private readonly ILogger<LogInfoController> _logger;
        private readonly ILogInfoService _logInfoService;

        public LogInfoController(ILogger<LogInfoController> logger, ILogInfoService logInfoService)
        {
            _logger = logger;
            _logInfoService = logInfoService;
        }

        /// <summary>
        /// Gets all the logs specified withing the given date range.
        /// </summary>
        /// <returns>The list of Logs in the given range.</returns>
        [HttpGet]
        [Route("/logs")]
        [ProducesResponseType(200,Type = typeof(LogInformation))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Produces("application/json")]
        public IActionResult GetLogs(string fromDate, string toDate, int recordCount, int skipCount)
        {
            return new ObjectResult(_logInfoService.GetLogsInRange(fromDate, toDate, recordCount , skipCount));
        }

        /// <summary>
        /// Searches the given term in all the logs.
        /// </summary>
        /// <returns>The list of Logs having the given search term.</returns>
        [HttpGet]
        [Route("/logs/search")]
        [ProducesResponseType(200,Type = typeof(LogInformation))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Produces("application/json")]
        public IActionResult SearchLogs(string searchTerm)
        {
            return new ObjectResult(_logInfoService.SearchLogs(searchTerm));
        }

        /// <summary>
        /// Provides log filtered according to the Filter criteria
        /// </summary>
        /// <returns>Logs filtered as per filter criteria</returns>
        [HttpGet]
        [Route("/logs/filter")]
        [ProducesResponseType(200,Type = typeof(LogInformation))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Produces("application/json")]
        public IActionResult GetFilteredLogs([FromQuery]List<string> filters, int recordCount, int skipCount)
        {
            return new ObjectResult(_logInfoService.GetFilteredLogs(filters, recordCount , skipCount));
        }

    }
}
