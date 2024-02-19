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
      let emailAddress = orderInfo.email;
      let name = orderInfo.customerName;
      console.log('order id -> app.ts: ', orderId)
      sendEmailOrderConfirmation(orderId, totalAmount, emailAddress, name)
  }, { noAck: true });
  
}

async function sendEmailOrderConfirmation(orderId, totalAmount, emailAddress, name) {
  try {
      let info = await transporter.sendMail({
          from: 'divlinkapp@gmail.com',
          to: emailAddress,
          subject: 'Order Confirmation !',
          // text: 'Welcome to our service! Your order with order id ' + orderId + ' has been confirmed successfully. The total amount for your order is Rs. ' + totalAmount + '.00', 
          html: `
              <p>Dear ${name},</p>
              <p>Welcome to our service!</p>
              <p>Your order with <strong>order id ${orderId}</strong> has been confirmed successfully.</p>
              <p>The total amount for your order is <strong>Rs.${totalAmount}.00</strong>.</p>
              <p>Thank you for choosing us!</p>
          `,
      });

      console.log('Email sent:', info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
  }
}

confirmOrderEmail();