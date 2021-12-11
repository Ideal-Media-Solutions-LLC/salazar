Auth/Signin flow
- Sign in with google
- Send an axios get request to '/auth' to check if response.status === 400 or 200
  - If 400 : user has not signed up for our application.  Direct them to the signup route
    - Axios post languages and signup information (uid, refreshtoken, token, email, photoURL, displayName) to '/auth' route
  - if 200 : user has already been signed up and stored in our database. Direct them to userinterface route
