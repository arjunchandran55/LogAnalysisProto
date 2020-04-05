import AppConfig from "../config";
import { initiateGetCall } from "../RestUtil";
import { IFieldFilter } from "../FieldFilter/model";

export const fetchLogData = (
    fromDateUtc: string,
    toDateUtc: string,
    recordCount: string,
    successCallback?: (response: any) => void, errorCallback?: (error: any) => void): void => {
        const params = new URLSearchParams();
        params.append("fromDate", fromDateUtc);
        params.append("toDate", toDateUtc);
        params.append("recordCount", recordCount);
        params.forEach((value, key) => {
            if (value === "") { params.delete(key); }
        });
        initiateGetCall(AppConfig.getConfig().LOG_GET_API,params, successCallback);
};

export const searchLogData = (
    searchTerm: string,
    successCallback?: (response: any) => void, errorCallback?: (error: any) => void): void => {
        const params = new URLSearchParams();
        params.append("searchTerm", searchTerm);
        params.forEach((value, key) => {
            if (value === "") { params.delete(key); }
        });
        initiateGetCall(AppConfig.getConfig().LOG_SEARCH_API,params, successCallback);
};

export const fetchFilteredLogData = (filters: Map<string, IFieldFilter>,
    successCallback?: (response: any) => void, errorCallback?: (error: any) => void) => {
    const lstFilters: IFieldFilter[] = [];
    Array.from(filters.keys()).forEach((k) => {
        lstFilters.push(filters.get(k) as IFieldFilter);
    });
    let params = new URLSearchParams({'filters': JSON.stringify(lstFilters)});
    initiateGetCall(AppConfig.getConfig().LOG_FILTER_API,params, successCallback);
}