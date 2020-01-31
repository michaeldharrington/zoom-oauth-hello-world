// bring in environment secrets through dotenv
require('dotenv/config')

// run the express app
const express = require('express')
const app = express()

const request = require('request')


app.get('/', (req, res) => {
    
    // res.send('hello world!')

    // Step 1: 
    // Check if the code parameter is in the url 
    // if an authorization code is available, the user has most likely been redirected from Zoom OAuth
    // if not, the user needs to be redirected to Zoom OAuth to authorize

    if (req.query.code) {

        let url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.clientID + '&redirect_uri=' + process.env.redirectURL;

        // // Step 3: 
        // // Request an Access Token

        // request.post(url, (error, response, body) => {
            
        //     // convert response to JSON 
        //     body = JSON.parse(body)
        // }).auth(process.env.clientID, process.env.clientSecret)

    }

    // Step 2: 
    // If no authorization code is available, redirect to Zoom OAuth to authorize
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.clientID + '&redirect_uri=' + process.env.redirectURL)
})

app.listen(process.env.PORT, () => console.log(`Zoom Hello World app listening at PORT: ${process.env.PORT}`))