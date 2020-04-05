using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
 
namespace log_analyzer_api.Models
{
    public class LogFileUploadInformation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        
        [BsonElement("log_date")]
        public BsonDateTime LogDate { get; set; }

        [BsonElement("log_file_path")]
        public string LogFilePath { get; set; }
    }
}