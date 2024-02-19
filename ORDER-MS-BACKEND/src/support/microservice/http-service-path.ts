import { EnvironmentConfiguration } from "../../configuration/environment-configuration";

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();

const PRODUCTBUCKET = appConfig.getProductDataImportBucket();

export default class HttpMSServicePath {
    static createOrder: string = "service/master/product-decrease";
    static taskCreate: string = "service/master/product-save"; 
    static orderCancellation: string = "http://localhost:4000/service/master/product-increase";
<<<<<<< HEAD
    static confirmOrder: string ="http://localhost:4000/service/master/product-decrease";
}
=======
}
>>>>>>> parent of 29ded14 (Did the proceed to checking part with message queue and microservice)
