import { Action } from "redux";
import { IFieldFilter } from "./model";

export const ADD_LOG_FILTER: "fieldFilter/ADD_LOG_FILTER" = "fieldFilter/ADD_LOG_FILTER";

export interface IAddLogFilter extends Action {
    type: "fieldFilter/ADD_LOG_FILTER",
    filters: Map<string, IFieldFilter>
};



