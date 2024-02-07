import { Db, getConnection, getConnectionManager } from "typeorm";
import { EnvironmentConfiguration } from "./environment-configuration";
import { ProductEntity } from "../entity/master/product-entity";

const connectionManager = getConnectionManager();
const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();

const Connection = connectionManager.create({
  type: "mysql",
  host: appConfig.getHost(),
  port: appConfig.getDataBasePort(),
  username: appConfig.getUserName(),
  password: appConfig.getPassword(),
  database: appConfig.getDataBase(),
  synchronize: true,
  entities: [ProductEntity],
  logging: false,
});

export const ConnectToDatabase = async () => {
  try {
    const connection = await Connection.connect();
    console.log("Database connected !");
    // new MasterDataCopy().copyData();
    // new MasterDataCopy().copyAisleToFieldMasterData();
  } catch (error) {
    console.log(error);
    console.log("Database connection Failed !");
  }
};
