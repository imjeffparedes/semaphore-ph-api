## Documentation

You can see below the API reference of this module.

### `SemaphoreSMS(options)`
Creates the instance of the `SemaphoreSMS` class.

#### Params

 - **Object** `options`: An object containing:
 - `apiKey` (String): SemaphoreSMS API Key (mandatory).
 - `version` (String): Semaphore api version appended to host. (default: `api/v4`).
 - `host` (String): The `Semaphore.co` api host (default: `https://api.semaphore.co/`).


### `sendMessage(data, cb)`
Send a message to single destination.

#### Params

- **Object** `data`: The Sending Messages parameters (documented [here](https://semaphore.co/docs)).
- **Function** `cb`: The callback function.


### `sendPriorityMessage(data, cb)`
Normally messages are processed in the order they are received and during periods of heavy traffic messaging, messages can be delayed. If your message is time sensitive, you may wish to use our premium priority queue which bypasses the default message queue and sends the message immediately. This service is 2 credits per 160 character SMS.

#### Params

- **Object** `data`: The Sending Messages parameters (documented [here](https://semaphore.co/docs)).
- **Function** `cb`: The callback function.


### `retrieveMessage(params, cb)`
To retrieve outgoing SMS messages.

#### Params

- **Object** `params`: The Retrieving Messages parameters (documented [here](https://semaphore.co/docs)).
- **Function** `cb`: The callback function.

### `retrieveMessageById(id, cb)`
Retrieve a single outgoing SMS message by its unique id

#### Params

- **String** `id`: ID of the message to get.
- **Function** `cb`: The callback function.


### `retrieveAccount(cb)`
To retrieve basic information about your account.

#### Params
- **Function** `cb`: The callback function.


### `retrieveAccountTransactions(params, cb)`
To retrieve transaction information about your account.

#### Params
- **Object** `params`: The Limit and Page parameters (documented [here](https://semaphore.co/docs)).
- **Function** `cb`: The callback function.


### `retrieveSenderNames(params, cb)`
To retrieve sender names associated with your account.

#### Params
- **Object** `params`: The Limit and Page parameters (documented [here](https://semaphore.co/docs)).
- **Function** `cb`: The callback function.


### `retrieveUsers(params, cb)`
To retrieve users associated with your account

#### Params
- **Object** `params`: The Limit and Page parameters (documented [here](https://semaphore.co/docs)).
- **Function** `cb`: The callback function.


