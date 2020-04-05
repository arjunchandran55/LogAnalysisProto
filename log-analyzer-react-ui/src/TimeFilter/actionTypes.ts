import { Action } from "redux";

export const SET_FILTER: "timeFilter/FILTER_KEY" = "timeFilter/FILTER_KEY";

export interface ISetFilterAction extends Action {
    type: "timeFilter/FILTER_KEY" ,
    filterKey: string,
    filterText: string
    fromDateUtc: string,
    toDateUtc: string
};


