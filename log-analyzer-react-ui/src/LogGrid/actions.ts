import * as t from "./actionTypes";
import { LogInformation } from "../Model/LogInformation";

export const GetLogInformation = () => ({
    type: t.GET_LOG_INFORMATION,
});

export const SetLogInformation = (lstLogInformation: LogInformation[]) => ({
    type: t.SET_LOG_INFORMATION,
    lstLogInformation
});
