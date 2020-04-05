import { Action } from "redux";
import { LogInformation } from "../Model/LogInformation";

export const GET_LOG_INFORMATION: "logGrid/GET_LOG_INFORMATION" = "logGrid/GET_LOG_INFORMATION";

export interface IGetLogInformation extends Action {
    type: "logGrid/GET_LOG_INFORMATION"
};

export const SET_LOG_INFORMATION: "logGrid/SET_LOG_INFORMATION" = "logGrid/SET_LOG_INFORMATION";

export interface ISetLogInformation extends Action {
    type: "logGrid/SET_LOG_INFORMATION",
    lstLogInformation: LogInformation[]
};


