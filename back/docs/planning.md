
### Signin/Auth: Elton
post displayname, language and level from signup page
connect through firebase database using config 
send 201

get language and level
connect through firebase database using config
send user language/level by searching firestore database collection by email, 200



-----------------

### Chat: Jinho
  POST req from front end (single line chat)
  send text to user

  GET req from user to translated msg 
  send to AZURE api and res the translated msg
  
------------------

### Calendar: Carlos
  - POST req to create event on organizer calendar (events.insert)
    - Summary
    - Description
    - start.dateTime
    - end.dateTime
    - time zones (IANA time zone identifiers) ?
    - Event ID -> if none provided, generated automatically
    - attendees included with same eventID / sendNotifications: true (for email notification)
    
  - POST req to invite attendees
    - Could be done in the same POST req to create the event
    - Note: Users can indicate in their settings that they don’t want to see unresponded invitations on their calendar. In this case the event won't appear on their calendar until late
  - POST req to send private copy of event
  - GET req for response to invitation
  
  

--------
### Video: Brett
- create link for meeting
- destroy link ?
