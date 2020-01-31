# Zoom OAuth Hello World

This is a Hello World app using an OAuth Marketplace App client ID and Secret to create an OAuth token, used to call the Zoom API.

[Zoom App Marketplace](https://marketplace.zoom.us)

## Setup 

Run server using [nodemon](/)

```
npm run start
```

### Setup dotenv 
Create a `.env` file in which to store your PORT, access credentials, and Redirect URL.

```
touch .env
```

Copy the following into this file, with your own values entered:

```
PORT=4000
clientID=
clientSecret=
redirectURL=
```



## Install [ngrok](/)

run ngrok

```
~/./ngrok http 4000
```
