using Newtonsoft.Json;
 
namespace log_analyzer_api.Models
{
    public class FilterInformation
    {    
        [JsonProperty("filterKey")]
        public string filterKey { get; set; }

        [JsonProperty("filterValue")]  
        public string filterValue { get; set; }

        [JsonProperty("filterOperation")]  
        public string filterOperation { get; set; }

    }
}