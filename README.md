# Salazar: Video Chat Language Exchange Application

## Summary
   This application was designed to connect students that speak different languages with each other in order to facilitate language exchange. This is done by allowing students to schedule video calls with each other that have live translation. Allowing students to have conversations with each other in different languages and the ability to convert it into a language of their choice that they can understand. 
   Since the students speak a variety of different languages the application offers the user a preference of language to display from the home page before signing in.
 
 ![Salazar](https://user-images.githubusercontent.com/80747028/147184655-11562915-08df-47e7-8db8-5eaf31fd6082.gif)
 
 
## Getting Started
```Config.js
enter example config
```
```.env
.env example
```
## Features
### Sign Up
   - Google authentication is implemented using firebase.
   - Users profiles are created with information from their gmail account
   - Users can select multiple languages
       - Identify their profiency of a language using 4 skill levels
       - These fields are important for the search feature aloowing users to easily find other students of a specific language and proficiency.  
##
### Multi-Language Support
![MultiLanguage](https://user-images.githubusercontent.com/52953412/146631558-baddffca-3dcb-44df-aed3-d93d90e1c3f7.png)
 - il8 Package provides support translating page for following languages.
     - English
     - Spanish
     - Portugues
     - French
     - Chinese
     - Korean
     - German
     - Swedish
     - Italian
     - Russian
##
### Messaging

<img width="599" alt="textchat" src="https://user-images.githubusercontent.com/52953412/146631743-68712285-43bc-414d-925b-871503b19b8d.png">

 - Send text messages to other students
 - Translate them into another language!
##
### Scheduling
![Scheduling](https://user-images.githubusercontent.com/52953412/146631560-0e51f1b6-eac2-4d52-8060-05bc2563e7cb.png)
- Select Time, Date, and Language you want to practice with another student.
- Add a message with your invitation.
- Events are tracked using Google Calendar
    - Links are provided to specified calendar events
- Time until future calls are displayed from the Days ==> Hours ==> Minutes.
##
### Video Chat
![video](https://user-images.githubusercontent.com/52953412/146631667-4cf25b52-529b-4807-8033-5b4884988ad5.png)
- Students can select languages they want to translate
- As well as language they want to translate to.
- Original transcript from other student is displayed first
- Followed by translated transcription.
- Supported transcript languages
    - English
    - Spanish
    - French
    - German
    - Russian
    - Portuguese
    - Swedish
    - Korean
    - Italian

### Responsive Web Design
<img width="438" alt="mobile (1)" src="https://user-images.githubusercontent.com/80747028/147184870-c443e964-d282-44b3-9103-ede06c1ac6da.png">
Use of CSS to automatically resize, hide components, or shrink photos, to make our app look good and fully functional on both desktop and mobile devices.

