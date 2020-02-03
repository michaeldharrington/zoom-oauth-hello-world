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

        // res.send(req.query.code)

        // let url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.clientID + '&redirect_uri=' + process.env.redirectURL;

        // // Step 3: 
        // // Request an Access Token

        // request.post(url, (error, response, body) => {
            
        //     // convert response to JSON 
        //     body = JSON.parse(body)

        //     console.log(body.access_token);
        //     // res.send(body.access_token)

        // }).auth(process.env.clientID, process.env.clientSecret)

        let url = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + process.env.redirectURL;

        // STEP 3
        // we need to exchange the code for a oauth token
        request.post(url, function (error, response, body) {

            // the response should be a JSON payload
            body = JSON.parse(body);
            //html for displaying response in the browser
            //Prettify the JSON format using pre tag and JSON.stringify

            //print access_token in the browser
            console.log(`access_token: ${body.access_token}`);
            console.log(`refresh_token: ${body.refresh_token}`);

            if (body.access_token) {

                // STEP 4
                // we can now use the access token to make API calls
                request.get('https://api.zoom.us/v2/users/me', function (error, response, body) {
                    if (error) {
                        console.log('Error in API ', error)
                    } else {
                        body = JSON.parse(body);
                        //display response in console
                        console.log('API call ', body);
                        //display response in browser
                        var result = '<code><pre>' + JSON.stringify(body, null, 2) + '</pre></code>'
                        res.send(result);

                    }

                }).auth(null, null, true, body.access_token);

            } else {
                //handle error, something went wrong
            }

        }).auth(process.env.clientID, process.env.clientSecret);

        return;





    }

    // Step 2: 
    // If no authorization code is available, redirect to Zoom OAuth to authorize
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.clientID + '&redirect_uri=' + process.env.redirectURL)
})

app.listen(process.env.PORT, () => console.log(`Zoom Hello World app listening at PORT: ${process.env.PORT}`))