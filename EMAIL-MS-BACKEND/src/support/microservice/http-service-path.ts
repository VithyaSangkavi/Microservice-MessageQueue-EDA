import { EnvironmentConfiguration } from "../../configuration/environment-configuration";

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();

const PRODUCTBUCKET = appConfig.getProductDataImportBucket();

export default class HttpMSServicePath {
    static orderCancellation: string = "http://localhost:4000/service/master/product-increase";
}