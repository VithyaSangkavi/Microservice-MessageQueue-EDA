import config from "config";
import { AppConfigurationsDto } from "../common/dto/app-configuration-dto";

export class EnvironmentConfiguration {
  readAppConfiguration(): AppConfigurationsDto {
    let appConfig: AppConfigurationsDto = new AppConfigurationsDto();

    appConfig.setIp(config.get("server.ip"));
    appConfig.setPort(config.get("server.port"));
    appConfig.setDataBase(config.get("db.db"));
    appConfig.setHost(config.get("db.host"));
    appConfig.setPassword(config.get("db.password"));
    appConfig.setDataBasePort(config.get("db.port"));
    appConfig.setUserName(config.get("db.userName"));
    appConfig.setAwsAccessKeyId(config.get("aws.accessKey"));
    appConfig.setAwsSecretAccessKey(config.get("aws.secretAccessKey"));
    appConfig.setAwsProductBucket(config.get("aws.productBucket"));
    appConfig.setAwsPlanogramBucket(config.get("aws.planogramBucket"));
    appConfig.setAwsTempBucket(config.get("aws.tempBucket"));
    appConfig.setAwsExpireDuration(config.get("aws.expirationDuration"));
    appConfig.setJwtSecret(config.get("jwtSecret"));
    appConfig.setEmailPassword(config.get("email.password"));
    appConfig.setEmailUserName(config.get("email.username"));
    appConfig.setEmailPort(config.get("email.port"));
    appConfig.setEmailSenderAddress(config.get("email.senderAddress"));

    // aws media collection
    appConfig.setAwsMediaCollectionAccessKeyId(config.get("aws.mc.accessKey"));
    appConfig.setAwsMediaCollectionSecretAccessKey(config.get("aws.mc.secretAccessKey"));
    appConfig.setAwsMediaCollectionProductBucket(config.get("aws.mc.productBucket"));
    appConfig.setAwsMediaCollectionFieldBucket(config.get("aws.mc.planogramField"));
    appConfig.setAwsMediaCollectionExpireDuration(config.get("aws.mc.expirationDuration"));

    //micro service
    appConfig.setTaskMicroServicePath(process.env.ms_task || config.get("ms.order"));
    // appConfig.setUserManagementMicroServicePath(process.env.ms_userManagement || config.get("ms.userManagement"));
    // appConfig.setNotificationMicroServicePath(process.env.ms_notification || config.get("ms.notification"));

    //message Queue
    appConfig.setMessageQueueServerUrl(process.env.ms_msgq || config.get("queue.url"));
    appConfig.setMessageQueueNameEmail(process.env.ms_msgq || config.get("queue.toEmail"));
    appConfig.setMessageQueueNameProduct(process.env.ms_msgq || config.get("queue.toProduct"));
    appConfig.setMessageQueueType(process.env.msgq_type || config.get("queue.type"));
    appConfig.setMessageQueueUsername(process.env.msgq_user || config.get("queue.username"));
    appConfig.setMessageQueuePassword(process.env.msgq_pass || config.get("queue.password"));
    
    return appConfig;
  }
}
