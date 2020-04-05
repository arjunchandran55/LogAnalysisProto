
export type FieldFilterState = {
  readonly filters: Map<string, IFieldFilter>
}

export interface IFieldFilter {
  filterKey: string; filterValue: string; filterOperation: string
}

export enum FilterField { 
  "ipAddress" = "ip_address", 
  "userAgent"= "user_agent",
  "statusCode"= "status_code",
  "requestType"= "request_type",
  "apiName"= "api_name",
  "user"= "user",
  "enterpriseId"= "enterprise_id",
  "enterpriseName"= "enterprise_name"
};

export class FiledNameMapper {
  static filterFieldNames = () => {
    const filterFieldNamesMap = new Map<string, string>();
    filterFieldNamesMap.set(FilterField.ipAddress, "Ip Address");
    filterFieldNamesMap.set(FilterField.enterpriseId, "Enterprise Id");
    filterFieldNamesMap.set(FilterField.enterpriseName, "Enterprise Name");
    filterFieldNamesMap.set(FilterField.apiName, "API");
    filterFieldNamesMap.set(FilterField.requestType, "Request Type");
    filterFieldNamesMap.set(FilterField.statusCode, "Status Code");
    filterFieldNamesMap.set(FilterField.user, "User");
    filterFieldNamesMap.set(FilterField.userAgent, "User Agent");
    return filterFieldNamesMap;
  }
}

export class SignMapper {
  static operationSigns = () => {
    const operationSignsMap = new Map<string, string>();
    operationSignsMap.set(SignMapper.equalityOperations().equals, "=");
    operationSignsMap.set(SignMapper.equalityOperations().contains, "~");
    operationSignsMap.set(SignMapper.equalityOperations().not_contains, "!~");
    return operationSignsMap;
  }

  static equalityOperations = () => {
    enum equalityOperations {
      "equals" = "equals",  "contains" = "contains", "not_contains"="not_contains", "none" = ""
    }
    return equalityOperations;
  }
}