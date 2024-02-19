import { NodeApplication } from "./decorators/custom-decorators";
import "reflect-metadata";
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
import HttpMSServicePath from "../src/support/microservice/http-service-path";
import axios from "axios";
import MicroServiceHttp from "../src/support/microservice/micro-service-http-impl";
import { Mathod } from "../src/enum/method";
import MicroService from "../src/support/microservice/micro-service";
import { EnvironmentConfiguration } from "../src/configuration/environment-configuration"

let httpReq: MicroService = new MicroServiceHttp();

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
      user: 'divlinkapp@gmail.com', 
      pass: 'nybz nunm lzyy ljwy'
  },
  tls: {
    rejectUnauthorized: false
  }

});


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


  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'toProduct';

  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, async (msg) => {
    
      let products = JSON.parse(msg.content.toString());
      let uuid = products.uuid;

      const payload = {
        quantityToAdd: products.quantityToAdd,
      };

      console.log(products);

      const path = `${HttpMSServicePath.orderCancellation}/${uuid}`;
      const a = await httpReq.call(
          path,
          Mathod.PUT,
          payload,
          null
        );

  }, { noAck: true });
}

async function cancelOrdersfromEmail() {


  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'toEmail';

  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, (msg) => {
      console.log('Received cancel order - Email:', msg.content.toString());
      let orderId = msg.content.toString()
      sendEmail(orderId)
  }, { noAck: true });
  
}

async function sendEmail(orderId) {
  try {
      let info = await transporter.sendMail({
          from: 'divlinkapp@gmail.com',
          to: "thanujadha20@gmail.com",
          subject: 'Oder Rejected !',
          text: 'Welcome to our service! Your order with order id - ' + orderId + ' canceled by owner.', 
      });

      console.log('Email sent:', info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
  }
}

async function confirmOrderEmail() {


  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'orderStatusUpdates';

  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, (msg) => {
      console.log('Received confirm order - Email:', msg.content.toString());
      let orderInfo = JSON.parse(msg.content.toString());
      let orderId = orderInfo.id;
      let totalAmount = orderInfo.total;
      console.log('order id -> app.ts: ', orderId)
      sendEmailOrderConfirmation(orderId, totalAmount)
  }, { noAck: true });
  
}


async function sendEmailOrderConfirmation(orderId, totalAmount) {
  try {
      let info = await transporter.sendMail({
          from: 'divlinkapp@gmail.com',
          to: "vithyasangkavi@gmail.com",
          subject: 'Order Confirmation !',
          text: 'Welcome to our service! Your order with order id ' + orderId + ' has been confirmed successfully. The total amount for your order is Rs. ' + totalAmount + '.00', 
      });

      console.log('Email sent:', info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
  }
}


takeOrdersfromOrder()
cancelOrdersfromOrderCancellation()
cancelOrdersfromAdmin()
cancelOrdersfromEmail()
confirmOrderEmail()
