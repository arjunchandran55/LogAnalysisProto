
export interface LogInformation {
    id: MongoId;
    ipAddress: String;
    userAgent: String;
    statusCode: Number;
    requestType: String;
    apiName: String;
    user: String;
    enterpriseId: String;
    enterpriseName: String;
    loggedDate: Date;
    email: String;
    authStatus: String;
    rawLog: String;
}
export interface MongoId {
    "timestamp":Number,
    "machine":Number,
    "pid":Number,
    "increment":Number,
    "creationTime":Date
}