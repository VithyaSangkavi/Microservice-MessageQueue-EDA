import { NodeApplication } from "./decorators/custom-decorators";
import "reflect-metadata";
const amqp = require('amqplib');

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

takeOrdersfromOrder()

