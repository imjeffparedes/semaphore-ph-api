"use strict";


const SemaphoreSMS = require("../lib");

var client = new SemaphoreSMS({
    apiKey: process.env.SEMAPHORE_API_KEY
    // This is optional
  , version: 'api/v4'
  , host: process.env.SEMAPHORE_HOST || "https://api.semaphore.co/"
});

client.sendMessage({
        number: '09123456789',
        message: 'Hello World'
    }, (err, data) => {
    console.log(err || data);
    // =>
    //      {
    //      "message_id": "123456",
    //      "user_id": "123456",
    //      "user": "test@mail.com",
    //      "account_id": "1234",
    //      "account": "Test",
    //      "recipient": "091234567",
    //      "message": "Hello World",
    //      "sender_name": "Test",
    //      "network": "Smart",
    //      "status": "Pending",
    //      "source": "prepaid",
    //      "type": "127.33",
    //      "created_at": "2017-08-04T09:59:29.660Z",
    //      "updated_at": "2017-08-05T09:59:29.660Z"
    //      }
});
