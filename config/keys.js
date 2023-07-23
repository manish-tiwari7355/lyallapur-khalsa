// const path = require("path");
// require("dotenv").config({
//   path: "/home/ubuntu/lyallpur-khalsa-college_team-backend/.env",
// });
const path = require("path");
// // require("dotenv").config({
// //   path: "/home/ubuntu/lyallpur-khalsa-college_team-backend/.env",
// // });
require("dotenv").config({});

module.exports = {
  emailverifyKey: {
    initVector: process.env.EMAILVERIFY_INIT_VECTOR || "89447f577bd0b8f6",
    securitykey: process.env.SECURITY_KEY || "3e56d72f08673a7e11266ec6bb6ee196",
  },
  app: {
    name: "IFA Backend",
    serverURL: process.env.BASE_SERVER_URL,
    apiURL: process.env.BASE_API_URL,
    clientURL: process.env.BASE_CLIENT_URL,
  },
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME,
    fileURL: `https://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}`,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    // sesSenderAddress: "chairmanifa@gmail.com",
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  database: process.env.DB_CONNECT,
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET || "McQfThWmZq4t7w",
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE || "7d",
    refreshSecret:
      process.env.REFRESH_TOKEN_SECRET || "RgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6",
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || "180d",
  },
  nodemailer: {
    sender: process.env.NODEMAILER_EMAIL_SENDER,
    pass: process.env.NODEMAILER_EMAIL_PASS,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  coins: {
    buyPrice: 0.05,
    redeemPrice: 0.035,
    minAmount: 200,
    commissionRate: 0.5,
    purchaseCommission: 0.7,
    bundles: [
      {
        id: 1,
        amount: 500,
      },
      {
        id: 2,
        amount: 1000,
      },
      {
        id: 3,
        amount: 2000,
      },
      {
        id: 4,
        amount: 5000,
      },
      {
        id: 5,
        amount: 7500,
      },
      {
        id: 6,
        amount: 10000,
      },
    ],
  },
};
