// helps set up our server
const http = require('http');
const responses = require('./responses.js')

// sets port to the value assigned by Heroku (when deployed) or 3000 (when developing)
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);
    // sends client to diff pages depending on the address they enter
    switch(request.url) {
        case '/page2': 
            responses.getClient2(request, response);
            break;
        case '/style.css': 
            responses.getCss(request, response);
            break;
        default: 
            responses.getIndex(request, response);
            break;
    };
};

// Node creates server here then starts it up by having it listen to the given port
// make sure you set up start command before trying to run
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
