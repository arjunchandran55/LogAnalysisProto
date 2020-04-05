import * as t from "./actionTypes";
import { IFieldFilter } from "./model";

export const AddFilter = (filters: Map<string,IFieldFilter>) => ({
    type: t.ADD_LOG_FILTER,
    filters,
});

