export default class AppConfig {

    public static getConfig(): ILogAnalyzerConfig {
      return {
        LOG_SEARCH_API: "https://localhost:5001/logs/search",
        LOG_GET_API: "https://localhost:5001/logs/",
        LOG_FILTER_API: "https://localhost:5001/logs/filter"
        // PRICING_DOWNLOAD_API: `https://${env}.pricing-svc.vcs.cimpress.io/v1/pricing-service/pricefile/download`,
        // PRICING_DOWNLOAD_V2_API: `https://${env}.pricing-svc.vcs.cimpress.io/v2/pricing-service/pricefile/download`,
        // PRICING_SEARCH_API: `https://${env}.pricing-svc.vcs.cimpress.io/v1/pricing-service/pricedetails`,
        // PRICING_SEARCH_V2_API: `https://${env}.pricing-svc.vcs.cimpress.io/v2/pricing-service/pricedetails`,
        // PRICING_UPDATE_API: `https://${env}.pricing-svc.vcs.cimpress.io/v1/prices/bulk`,
        // SUMOLOGIC_ENDPOINT_URL: sumoLogicUrl,
      };
    }
  }
  
  export interface ILogAnalyzerConfig {
    readonly LOG_SEARCH_API: string;
    readonly LOG_GET_API: string;
    readonly LOG_FILTER_API: string;
    // readonly PRICING_SEARCH_API: string;
    // readonly PRICING_SEARCH_V2_API: string;
    // readonly PRICING_DOWNLOAD_API: string;
    // readonly PRICING_DOWNLOAD_V2_API: string;
    // readonly PRICING_UPDATE_API: string,
    // SUMOLOGIC_ENDPOINT_URL: string
  }
  