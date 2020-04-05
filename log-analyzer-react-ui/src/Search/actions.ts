import * as t from "./actionTypes";

export const setSearchTerm = (searchTerm: string) => ({
    type: t.SET_SEARCH_TERM,
    searchTerm,
});

