const cron = require('node-cron');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Runs every minute
cron.schedule('* * * * *', () => {
  const coinName = process.env.COIN_NAME;
  const coinUrl = process.env.COIN_URL;

  console.log(`Checking ${coinName} Price...`);

  (async () => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(coinUrl);
      const priceText = await page.evaluate(
        () => document.querySelector('.priceValue').innerText
      );
      const price = Number(priceText.substring(1));
      const targetPrice = 1;

      if (price >= targetPrice) {
        const transporter = nodemailer.createTransport({
          host: process.env.MAIL_SERVER_HOST,
          port: process.env.MAIL_SERVER_PORT,
          secure: false,
          auth: {
            user: process.env.MAIL_SERVER_USER,
            pass: process.env.MAIL_SERVER_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: process.env.TO_EMAIL,
          subject: `The Price of ${coinName} is $${price}`,
          text: `Hi, The Price of ${coinName} is $${price}`,
        });

        console.log('Email Sent!');
      } else {
        console.log(`The price of ${coinName} is less than ${targetPrice}`);
      }

      await browser.close();
    } catch (err) {
      console.log('Error:', err.message);
    }
  })();
});
