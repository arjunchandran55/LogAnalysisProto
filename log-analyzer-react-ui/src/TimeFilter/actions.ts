import * as t from "./actionTypes";

export const setFilter = (filterKey: string, filterText: string, fromDateUtc: string, toDateUtc: string) => ({
    type: t.SET_FILTER,
    filterKey,
    filterText,
    fromDateUtc,
    toDateUtc
});

