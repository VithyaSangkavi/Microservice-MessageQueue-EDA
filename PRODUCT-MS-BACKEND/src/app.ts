import { NodeApplication } from "./decorators/custom-decorators";
import "reflect-metadata";
import { ProductServiceImpl } from '../src/services/master/impl/product-service-impl';
const amqp = require('amqplib');
import { EnvironmentConfiguration } from "../src/configuration/environment-configuration"

let ProductService = new ProductServiceImpl();


const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();


@NodeApplication
export class Application {
  public run(port: Number): void {
    console.log("Server Listen at : " + port);
  }
}

async function takeOrdersfromOrder() {

  var num = 0

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'ordersToProduct';

  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, (msg) => {
    console.log('Received order:', msg.content.toString());

    num = num + 1;
    console.log(num);

  }, { noAck: true });

}

async function cancelOrdersfromOrderCancellation() {

  var num = 0

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'order_cancellation_queue';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, (msg) => {
    console.log('Received cancel order:', msg.content.toString());

    num = num + 1;
    console.log(num);

  }, { noAck: true });

}

async function cancelOrdersfromAdmin() {

  const path = appConfig.getMessageQueueServerUrl();
  const connection = await amqp.connect(path);
  const channel = await connection.createChannel();

  const response = await ProductService.productQueue(channel);
  console.log(response)
}

async function cancelOrdersfromEmail() {


  const path = appConfig.getMessageQueueServerUrl();
  const connection = await amqp.connect(path);
  const channel = await connection.createChannel();
  
  const response = await ProductService.emailQueue(channel);
  console.log(response)

}


takeOrdersfromOrder()
cancelOrdersfromOrderCancellation()
cancelOrdersfromAdmin()
cancelOrdersfromEmail()



