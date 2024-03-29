import { Db, getConnection, getConnectionManager } from "typeorm";
import { EnvironmentConfiguration } from "./environment-configuration";
import { OrderEntity } from "../entity/master/order-entity";
import { OrderItemsEntity } from "../entity/master/order-items-entity";

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
  entities: [],
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
