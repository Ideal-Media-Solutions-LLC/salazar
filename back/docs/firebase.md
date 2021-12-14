Firebase auth planning

- what does auth get us?
- what information does firebase send us after authorization?

### Chat Firebase DB
****************
Chat is stored in the noSQL Firestore database.
collection is named 'Messages'.
each document is a unique user ID.(uuid)
each document contains an object of keys of all the uuid that have messaged the uuid of the document.(user)
within each uuid key is an array of messages sent in order of time.

example struture:

Collection: 'Messages'

Documents: {
  1: {
    2: [
      {
        time: 12/13/2021 10:00:0000,
        message: 'Hi my name is'
      },
      {
        time: 12/13/2021 10:01:0000,
        message: 'Wow no reply?'
      },
      {
        time: 12/13/2021 10:02:0000,
        message: 'lame'
      }
    ],
    3: [
      {
        time: 12/13/2021 10:05:0000,
        message: 'Hi my name is'
      }
    ],
    5: [
      {
        time: 12/13/2021 11:00:0000,
        message: 'Hi my name is'
      }
    ]
  },
  2: {
    1: [
      {
        time: 12/13/2021 12:00:0000,
        message: 'Hi my name is'
      }
    ],
    3: [
      {
        time: 12/13/2021 11:00:0000,
        message: 'Hi my name is'
      }
    ],
  }
}

API routes:

GET /chat
  query params: sender_ID, reciever_ID
  will do two querys to the DB to make two arrays
    1. All messages sent from sender_ID to reciever_ID
    2. All messages sent from receiver_ID to sender_ID
  ex: user 1 is signed in and wants to look at conversation between user 2.
    1. ['Hi my name is', 'Wow no reply', 'lame']
    2. [] (user 1 has not sent any messages to user 2)
  Sorts two arrays into one by first sent to last sent and then sends the ordered array back to client
    ex: [{2: 'Hi my name is'}, {2: 'Wow no reply'}, {3: 'lame'}]

POST /chat
  query params: sender_ID, reciever_ID, message, time
  Will insert the message into the array inside the reciever_ID document under the sender_ID uuid.

GET /users
  query params: sender_ID
  will search up in sender_ID document and return all uuid keys back.
  will then look into the user Firestore DB and then add the usernames to the uuid.
  will then send an array of key value pairs to the clientof each uuid: displayname.

GET /chat/translation
  query params: sender_ID, receiver_ID, target language
  will get back the array of messages stored in the sender_ID document of the reciever_ID key.
  will send that array and to azure translate api and then store the result in chrono order.
  send back and array of translated messages back to the client