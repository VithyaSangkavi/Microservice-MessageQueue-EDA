import config from "config";
import { AppConfigurationsDto } from "../common/dto/app-configuration-dto";

export class EnvironmentConfiguration {
  readAppConfiguration(): AppConfigurationsDto {
    let appConfig: AppConfigurationsDto = new AppConfigurationsDto();

    appConfig.setIp(process.env.server_ip || config.get("server.ip"));
    let port: any = process.env.server_port;
    appConfig.setPort(port || config.get("server.port"));
    appConfig.setDataBase(process.env.db_name || config.get("db.db"));
    appConfig.setHost(process.env.db_host || config.get("db.host"));
    appConfig.setPassword(process.env.db_password || config.get("db.password"));
    let dataBasePort: any = process.env.db_port;
    appConfig.setDataBasePort(dataBasePort || config.get("db.port"));
    appConfig.setUserName(process.env.db_user_name || config.get("db.userName"));
    appConfig.setAwsAccessKeyId(process.env.aws_access_key || config.get("aws.accessKey"));
    appConfig.setAwsSecretAccessKey(process.env.aws_secretAccessKey || config.get("aws.secretAccessKey"));
    appConfig.setAwsProductBucket(process.env.aws_productBucket || config.get("aws.productBucket.bucket"));
    appConfig.setAwsProductBucketFolderPath(process.env.aws_productBucketFolderPath || config.get("aws.productBucket.folderPath"));
    appConfig.setAwsPlanogramBucket(process.env.aws_planogramBucket || config.get("aws.planogramBucket.bucket"));
    appConfig.setAwsPlanogramBucketFolderPath(process.env.aws_planogramBucketFolderPath || config.get("aws.planogramBucket.folderPath"));
    appConfig.setAwsTempBucket(process.env.aws_tempBucket || config.get("aws.tempBucket.bucket"));
    appConfig.setAwsTempBucketFolderPath(process.env.aws_tempBucketFolderPath || config.get("aws.tempBucket.folderPath"));
    appConfig.setAwsRegion(process.env.aws_region || config.get("aws.region"));
    appConfig.setAwsDefaultBucket(process.env.default_bucket || config.get("aws.defualtBucket"));
    appConfig.setAwsManualComplianceBucket(process.env.manual_compliance_bucket || config.get("aws.manualComplianceBucket.bucket"))
    appConfig.setAwsManualComplianceBucketFolderPath(process.env.manual_compliance_bucket_folder_path || config.get("aws.manualComplianceBucket.folderPath"))

    let expirationDuration: any = process.env.aws_expirationDuration;

    appConfig.setAwsExpireDuration(parseInt(expirationDuration) || config.get("aws.expirationDuration"));
    appConfig.setJwtSecret(process.env.jwtSecret || config.get("jwtSecret"));
    appConfig.setApiKey(process.env.apiKey || config.get("apiKey"));
    appConfig.setEmailPassword(process.env.email_password || config.get("email.password"));
    appConfig.setEmailUserName(process.env.email_username || config.get("email.username"));
    let emailPort: any = process.env.email_port;
    appConfig.setEmailPort(emailPort || config.get("email.port"));
    appConfig.setEmailSenderAddress(process.env.email_senderAddress || config.get("email.senderAddress"));

    // aws media collection
    appConfig.setAwsMediaCollectionAccessKeyId(process.env.aws_mc_accessKey || config.get("aws.mc.accessKey"));
    appConfig.setAwsMediaCollectionSecretAccessKey(
      process.env.aws_mc_secretAccessKey || config.get("aws.mc.secretAccessKey")
    );
    appConfig.setAwsMediaCollectionProductBucket(
      process.env.aws_mc_productBucket || config.get("aws.mc.productBucket.bucket")
    );
    appConfig.setAwsMediaCollectionProductBucketFolderPath(
      process.env.aws_mc_productBucket_folderPath || config.get("aws.mc.productBucket.folderPath")
    );
    appConfig.setAwsMediaCollectionFieldBucket(
      process.env.aws_mc_planogramField || config.get("aws.mc.planogramField.bucket")
    );
    appConfig.setAwsMediaCollectionFieldBucketFolderPath(
      process.env.aws_mc_planogramField_folderPath || config.get("aws.mc.planogramField.folderPath")
    );
    let mediaCollectionExpirationConfiguration: any = process.env.aws_mc_expirationDuration;
    appConfig.setAwsMediaCollectionExpireDuration(
      parseInt(mediaCollectionExpirationConfiguration) || config.get("aws.mc.expirationDuration")
    );

    // aws sales buckets
    appConfig.setAwsOurSaleImportedBucket(process.env.aws_our_sales_bucket || config.get("aws.ourSaleImportedBucket"));
    appConfig.setAwsClinetSaleImportedBucket(process.env.aws_client_sales_bucket || config.get("aws.clinetSaleImportedBucket"));

    //product import bucket
    appConfig.setProductDataImportBucket(process.env.aws_product_data_import_bucket || config.get("aws.ProductDataImportBucket"));


    // micro service
    appConfig.setTaskMicroServicePath(process.env.ms_task || config.get("ms.task"));
    appConfig.setUserManagementMicroServicePath(process.env.ms_userManagement || config.get("ms.userManagement"));
    appConfig.setNotificationMicroServicePath(process.env.ms_notification || config.get("ms.notification"));
    appConfig.setArigoMicroServicePath(process.env.ms_arigo || config.get("ms.arigo"));
    appConfig.setPlanigoMicroServicePath(process.env.ms_planigo_simulation || config.get("ms.planigo"));

    appConfig.setAwsProductImageCashBucket(process.env.product_image_cash_bucket || config.get("aws.productImageCashBucket.bucket"));
    appConfig.setAwsProductImageCashBucketFolderPath(process.env.product_image_cash_bucket_folder_path || config.get("aws.productImageCashBucket.folderPath"));
    appConfig.setAwsProductCashImageURL(process.env.product_image_cash_url || config.get("aws.productImageCashUrl"));

    //message Queue
    appConfig.setMessageQueueServerUrl(process.env.ms_msgq || config.get("queue.url"));
    appConfig.setMessageQueueType(process.env.msgq_type || config.get("queue.type"));
    appConfig.setMessageQueueUsername(process.env.msgq_user || config.get("queue.username"));
    appConfig.setMessageQueuePassword(process.env.msgq_pass || config.get("queue.password"));

    let redisPort: any = process.env.redisPort;
    appConfig.setRedisPort(redisPort || config.get("redis.port"));
    appConfig.setRedisHost(process.env.redisHost || config.get("redis.host"));
    
    return appConfig;
  }
}
