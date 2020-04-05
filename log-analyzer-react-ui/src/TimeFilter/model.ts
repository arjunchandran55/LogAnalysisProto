// export type AlertType = "danger" | "info" | "success" | "warning" | undefined;
export type LogAppState = {
  readonly timeFilter: TimeFilterState;
  readonly searchTerm: string;
  // readonly filterCriteria: FilterCriteria;
  readonly logList: string[];
};

export type TimeFilterState = {
  readonly filterText: string;
  readonly filterKey: string;
  readonly fromDateUtc: string;
  readonly toDateUtc: string;
}
