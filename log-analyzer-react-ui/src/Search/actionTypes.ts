import { Action } from "redux";

export const SET_SEARCH_TERM: "search/SET_SEARCH_TERM" = "search/SET_SEARCH_TERM";

export interface ISetSearchTermAction extends Action {
    type: "search/SET_SEARCH_TERM" ,
    searchTerm: string,
};


