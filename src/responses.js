// Node has hardware access, which allows us to access files from hard drive (can't do w/ regular web JS)
const fs = require('fs');

// can use just .readFile but this will load file in background while the rest of the code is running
// do not want server to start before file loads, so use sync
// also, .readFile(Sync)() wants absolute path, which can break when uploaded to Heroku
// must get around this by using variables that a local address can be based around
// _dirname = current directory name (built into Node(?))
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const client2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const css = fs.readFileSync(`${__dirname}/../style.css`);

const serveFile = (request, response, content, mimeType) => {
    response.writeHead(200, { 'Content-type': mimeType });
    response.write(content);
    response.end();
};

const getCss = (request, response) => {
    serveFile(request, response, css, 'text/css');
};

const getIndex = (request, response) => {
    serveFile(request, response, index, 'text/html');
};

// // dont need request but best practice to keep response and request together
// const getIndex = (request, response) => {
//     // if content-type is set as plaintext, even if we're sending an HTML file, it will display
//     // the file as plaintext
//     // server is always authoritative and dominates other commands
//     // must make sure you always use right context type
//     response.writeHead(200, { 'Content-type': 'text/html' });
//     response.write(index);
//     response.end();
// }

const getClient2 = (request, response) => {
    serveFile(request, response, client2, 'text/html')
};

module.exports = {
    getIndex,
    getClient2,
    getCss,
};