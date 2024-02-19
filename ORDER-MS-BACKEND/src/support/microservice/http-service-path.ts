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
>>>>>>> 779d94243d62e8a138be71a9acc55ef81bb10d59
