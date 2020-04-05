using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
 
namespace log_analyzer_api.Models
{
    public class LogInformation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        
        [BsonElement("ip_address")]
        public string IpAddress { get; set; }

        [BsonElement("user_agent")]
        public string UserAgent { get; set; }
        
        [BsonElement("status_code")]
        public string StatusCode { get; set; }
        
        [BsonElement("request_type")]
        public string RequestType { get; set; }

        [BsonElement("api_name")]
        public string ApiName { get; set; }

        [BsonElement("user")]
        public string User { get; set; }

        [BsonElement("enterprise_id")]
        public string EnterpriseId { get; set; }

        [BsonElement("enterprise_name")]
        public string EnterpriseName { get; set; }

        [BsonElement("logged_date")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime LoggedDate { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("auth_status")]
        public string AuthStatus { get; set; }

        [BsonElement("raw_log")]
        public string RawLog { get; set; }
    }
}