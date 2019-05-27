"use strict";


const SemaphoreSMS = require("../lib");

var client = new SemaphoreSMS({
    apiKey: process.env.SEMAPHORE_API_KEY
    // This is optional
  , version: 'api/v4'
  , host: process.env.SEMAPHORE_HOST || "https://api.semaphore.co/"
});

client.sendMessage({
        number: '09051234567',
        message: 'Hello World'
    }, (err, data) => {
    console.log(err || data);
    // =>
    // [ { message_id: 72725061,
    //     user_id: 7291,
    //     user: 'username@yourdomain.com',
    //     account_id: 7158,
    //     account: 'AccountName',
    //     recipient: '639051234567',
    //     message: 'Hello World',
    //     sender_name: 'Semaphore',
    //     network: 'Globe',
    //     status: 'Pending',
    //     type: 'Single',
    //     source: 'Api',
    //     created_at: '2019-05-27 16:49:20',
    //     updated_at: '2019-05-27 16:49:20' } ]
});
