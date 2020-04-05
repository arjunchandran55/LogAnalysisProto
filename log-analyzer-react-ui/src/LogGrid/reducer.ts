import * as t from "./actionTypes";
import {LogGridState } from "./model";

const initialState: LogGridState = { lstLogInformation: [] } as LogGridState;

export default (state = initialState, action: t.IGetLogInformation | t.ISetLogInformation): LogGridState => {
       switch (action.type) {
          case t.SET_LOG_INFORMATION:
            return {...initialState, lstLogInformation: action.lstLogInformation};
          case t.GET_LOG_INFORMATION:
          default:
            return initialState;
  }
};
