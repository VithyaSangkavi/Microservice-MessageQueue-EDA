export class AppConfigurationsDto {
  private port: number;
  private ip: string;
  private logLevel: string;
  private host: string;
  private userName: string;
  private password: string;
  private dataBase: string;
  private dataBasePort: number;
  private awsAccessKeyId: string;
  private awsRegion: string;
  private awsSecretAccessKey: string;
  private awsTempBucket: string;
  private awsProductBucketFolderPath: string;
  private awsPlanogramBucketFolderPath: string;
  private awsTempBucketFolderPath: string;
  private awsProductBucket: string;
  private awsPlanogramBucket: string;
  private awsExpireDuration: number;
  private jwtSecret: string;
  private apiKey: string;
  private emailUserName: string;
  private emailPassword: string;
  private emailPort: number;
  private emailSenderAddress: string;

  // media collection bucket
  private awsMediaCollectionAccessKeyId: string;
  private awsMediaCollectionSecretAccessKey: string;
  private awsMediaCollectionProductBucket: string;
  private awsMediaCollectionProductBucketFolderPath: string;
  private awsMediaCollectionFieldBucket: string;
  private awsMediaCollectionFieldBucketFolderPath: string;
  private awsMediaCollectionExpireDuration: number;
  private awsDefaultBucket: string;
  private awsManualComplianceBucket:string;
  private awsManualComplianceBucketFolderPath:string;

  // sales buckets
  private awsOurSaleImportedBucket: string;
  private awsClinetSaleImportedBucket: string;

  // data import buckets - product
  private ProductDataImportBucket: string;

  //micro service
  private taskMicroServicePath: string;
  private userManagementMicroServicePath: string;
  private notificationMicroServicePath: string;
  private arigoMicroServicePath: string;
  private planigoMicroServicePath: string;

  // aws cash Product Bucket
  private AwsProductImageCashBucket: string;
  private AwsProductImageCashBucketFolderPath: string;
  private AwsProductCashImageURL: string;

  //Message queue
  private messageQueueServerUrl: string;
  private messageQueueType: string;
  private messageQueueUsername: string;
  private messageQueuePassword: string;

  //redis
  private redisPort:number;
  private redisHost:string;

  public getAwsManualComplianceBucket(): string {
    return this.awsManualComplianceBucket;
  }

  public setAwsManualComplianceBucket(awsManualComplianceBucket: string): void {
      this.awsManualComplianceBucket = awsManualComplianceBucket;
  }
  
  public getAwsManualComplianceBucketFolderPath(): string {
    return this.awsManualComplianceBucketFolderPath;
  }

  public setAwsManualComplianceBucketFolderPath(awsManualComplianceBucketFolderPath: string): void {
      this.awsManualComplianceBucketFolderPath = awsManualComplianceBucketFolderPath;
  }

  public getMessageQueuePassword(): string {
    return this.messageQueuePassword;
  }
  public setMessageQueuePassword(value: string) {
    this.messageQueuePassword = value;
  }

  public getMessageQueueUsername(): string {
    return this.messageQueueUsername;
  }

  public setMessageQueueUsername(value: string) {
    this.messageQueueUsername = value;
  }

  public getMessageQueueType(): string {
    return this.messageQueueType;
  }
  public setMessageQueueType(value: string) {
    this.messageQueueType = value;
  }

  public getMessageQueueServerUrl(): string {
    return this.messageQueueServerUrl;
  }

  public setMessageQueueServerUrl(messageQueueServerUrl: string): void {
    this.messageQueueServerUrl = messageQueueServerUrl;
  }

  public getAwsProductCashImageURL(): string {
    return this.AwsProductCashImageURL;
  }

  public setAwsProductCashImageURL(AwsProductCashImageURL: string): void {
    this.AwsProductCashImageURL = AwsProductCashImageURL;
  }


  public getAwsProductImageCashBucket(): string {
    return this.AwsProductImageCashBucket;
  }

  public setAwsProductImageCashBucket(AwsProductImageCashBucket: string): void {
    this.AwsProductImageCashBucket = AwsProductImageCashBucket;
  }
  
  public getAwsProductImageCashBucketFolderPath(): string {
    return this.AwsProductImageCashBucketFolderPath;
  }

  public setAwsProductImageCashBucketFolderPath(AwsProductImageCashBucketFolderPath: string): void {
    this.AwsProductImageCashBucketFolderPath = AwsProductImageCashBucketFolderPath;
  }

  public getUserManagementMicroServicePath(): string {
    return this.userManagementMicroServicePath;
  }

  public setUserManagementMicroServicePath(userManagementMicroServicePath: string): void {
    this.userManagementMicroServicePath = userManagementMicroServicePath;
  }

  public getNotificationMicroServicePath(): string {
    return this.notificationMicroServicePath;
  }

  public setNotificationMicroServicePath(notificationMicroServicePath: string): void {
    this.notificationMicroServicePath = notificationMicroServicePath;
  }

  public getTaskMicroServicePath(): string {
    return this.taskMicroServicePath;
  }

  public setTaskMicroServicePath(taskMicroServicePath: string): void {
    this.taskMicroServicePath = taskMicroServicePath;
  }

  public getAwsMediaCollectionAccessKeyId(): string {
    return this.awsMediaCollectionAccessKeyId;
  }

  public setAwsMediaCollectionAccessKeyId(awsMediaCollectionAccessKeyId: string): void {
    this.awsMediaCollectionAccessKeyId = awsMediaCollectionAccessKeyId;
  }

  public getAwsMediaCollectionSecretAccessKey(): string {
    return this.awsMediaCollectionSecretAccessKey;
  }

  public setAwsMediaCollectionSecretAccessKey(awsMediaCollectionSecretAccessKey: string): void {
    this.awsMediaCollectionSecretAccessKey = awsMediaCollectionSecretAccessKey;
  }

  public getAwsMediaCollectionProductBucket(): string {
    return this.awsMediaCollectionProductBucket;
  }

  public setAwsMediaCollectionProductBucket(awsMediaCollectionProductBucket: string): void {
    this.awsMediaCollectionProductBucket = awsMediaCollectionProductBucket;
  }
  
  public getAwsMediaCollectionProductBucketFolderPath(): string {
    return this.awsMediaCollectionProductBucketFolderPath;
  }

  public setAwsMediaCollectionProductBucketFolderPath(awsMediaCollectionProductBucketFolderPath: string): void {
    this.awsMediaCollectionProductBucketFolderPath = awsMediaCollectionProductBucketFolderPath;
  }

  public getAwsMediaCollectionFieldBucket(): string {
    return this.awsMediaCollectionFieldBucket;
  }

  public setAwsMediaCollectionFieldBucket(awsMediaCollectionFieldBucket: string): void {
    this.awsMediaCollectionFieldBucket = awsMediaCollectionFieldBucket;
  }
  
  public getAwsMediaCollectionFieldBucketFolderPath(): string {
    return this.awsMediaCollectionFieldBucketFolderPath;
  }

  public setAwsMediaCollectionFieldBucketFolderPath(awsMediaCollectionFieldBucketFolderPath: string): void {
    this.awsMediaCollectionFieldBucketFolderPath = awsMediaCollectionFieldBucketFolderPath;
  }

  public getAwsMediaCollectionExpireDuration(): number {
    return this.awsMediaCollectionExpireDuration;
  }

  public setAwsMediaCollectionExpireDuration(awsMediaCollectionExpireDuration: number): void {
    this.awsMediaCollectionExpireDuration = awsMediaCollectionExpireDuration;
  }

  public getEmailSenderAddress(): string {
    return this.emailSenderAddress;
  }

  public setEmailSenderAddress(emailSenderAddress: string): void {
    this.emailSenderAddress = emailSenderAddress;
  }

  public getEmailPort(): number {
    return this.emailPort;
  }

  public setEmailPort(emailPort: number): void {
    this.emailPort = emailPort;
  }

  public getEmailUserName(): string {
    return this.emailUserName;
  }

  public setEmailUserName(emailUserName: string): void {
    this.emailUserName = emailUserName;
  }

  public getEmailPassword(): string {
    return this.emailPassword;
  }

  public setEmailPassword(emailPassword: string): void {
    this.emailPassword = emailPassword;
  }

  public getJwtSecret(): string {
    return this.jwtSecret;
  }

  public setJwtSecret(jwtSecret: string): void {
    this.jwtSecret = jwtSecret;
  }
  
  public getApiKey(): string {
    return this.apiKey;
  }

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  public getAwsExpireDuration(): number {
    return this.awsExpireDuration;
  }

  public setAwsExpireDuration(awsExpireDuration: number): void {
    this.awsExpireDuration = awsExpireDuration;
  }

  public getAwsTempBucket(): string {
    return this.awsTempBucket;
  }

  public setAwsTempBucket(awsTempBucket: string): void {
    this.awsTempBucket = awsTempBucket;
  }
  
  public setAwsTempBucketFolderPath(awsTempBucketFolderPath: string): void {
    this.awsTempBucketFolderPath = awsTempBucketFolderPath;
  }

  public getAwsTempBucketFolderPath(): string {
    return this.awsTempBucketFolderPath;
  }

  public getAwsProductBucket(): string {
    return this.awsProductBucket;
  }

  public setAwsProductBucket(awsProductBucket: string): void {
    this.awsProductBucket = awsProductBucket;
  }
 
  public getAwsProductBucketFolderPath(): string {
    return this.awsProductBucketFolderPath;
  }

  public setAwsProductBucketFolderPath(awsProductBucketFolderPath: string): void {
    this.awsProductBucketFolderPath = awsProductBucketFolderPath;
  }

  public getAwsPlanogramBucket(): string {
    return this.awsPlanogramBucket;
  }

  public setAwsPlanogramBucket(awsPlanogramBucket: string): void {
    this.awsPlanogramBucket = awsPlanogramBucket;
  }
  
  public getAwsPlanogramBucketFolderPath(): string {
    return this.awsPlanogramBucketFolderPath;
  }

  public setAwsPlanogramBucketFolderPath(awsPlanogramBucketFolderPath: string): void {
    this.awsPlanogramBucketFolderPath = awsPlanogramBucketFolderPath;
  }

  public getAwsAccessKeyId(): string {
    return this.awsAccessKeyId;
  }

  public setAwsAccessKeyId(awsAccessKeyId: string): void {
    this.awsAccessKeyId = awsAccessKeyId;
  }

  public getAwsSecretAccessKey(): string {
    return this.awsSecretAccessKey;
  }

  public setAwsSecretAccessKey(awsSecretAccessKey: string): void {
    this.awsSecretAccessKey = awsSecretAccessKey;
  }

  public getDataBasePort(): number {
    return this.dataBasePort;
  }

  public setDataBasePort(dataBasePort: number): void {
    this.dataBasePort = dataBasePort;
  }

  public getHost(): string {
    return this.host;
  }

  public setHost(host: string): void {
    this.host = host;
  }

  public getUserName(): string {
    return this.userName;
  }

  public setUserName(userName: string): void {
    this.userName = userName;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getDataBase(): string {
    return this.dataBase;
  }

  public setDataBase(dataBase: string): void {
    this.dataBase = dataBase;
  }

  public getPort(): number {
    return this.port;
  }

  public setPort(port: number): void {
    this.port = port;
  }

  public getIp(): string {
    return this.ip;
  }

  public setIp(ip: string): void {
    this.ip = ip;
  }

  public getAwsRegion(): string {
    return this.awsRegion;
  }

  public setAwsRegion(awsRegion: string): void {
    this.awsRegion = awsRegion;
  }

  public getAwsDefaultBucket(): string {
    return this.awsDefaultBucket;
  }

  public setAwsDefaultBucket(awsDefaultBucket: string): void {
    this.awsDefaultBucket = awsDefaultBucket;
  }

  public getAwsOurSaleImportedBucket(): string {
    return this.awsOurSaleImportedBucket;
  }

  public setAwsOurSaleImportedBucket(awsOurSaleImportedBucket: string): void {
    this.awsOurSaleImportedBucket = awsOurSaleImportedBucket;
  }

  public getAwsClinetSaleImportedBucket(): string {
    return this.awsClinetSaleImportedBucket;
  }

  public setAwsClinetSaleImportedBucket(awsClinetSaleImportedBucket: string): void {
    this.awsClinetSaleImportedBucket = awsClinetSaleImportedBucket;
  }

  public getRedisPort(): number {
    return this.redisPort;
  }

  public setRedisPort(redisPort: number): void {
      this.redisPort = redisPort;
  }

  public getRedisHost(): string {
      return this.redisHost;
  }

  public setRedisHost(redisHost: string): void {
      this.redisHost = redisHost;
  }

  public getProductDataImportBucket(): string {
    return this.ProductDataImportBucket;
  }

  public setProductDataImportBucket(ProductDataImportBucket: string): void {
      this.ProductDataImportBucket = ProductDataImportBucket;
  }

  public getArigoMicroServicePath(): string {
    return this.arigoMicroServicePath;
  }

  public setArigoMicroServicePath(arigoMicroServicePath: string): void {
      this.arigoMicroServicePath = arigoMicroServicePath;
  }

  public getPlanigoMicroServicePath(): string {
    return this.planigoMicroServicePath;
  }

  public setPlanigoMicroServicePath(planigoMicroServicePath: string): void {
      this.planigoMicroServicePath = planigoMicroServicePath;
  }
}