import * as http from 'http';
import * as fs from 'fs';
import * as p from 'path';
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer();
const publicDir = p.relative(__dirname, 'public');

/* server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    console.log('request.method', request.method);
    console.log('request.url', request.url);
    console.log('request.headers', request.headers);
    

    const array: any[] = [];
    // post获取请求消息体
    request.on('data', (chunk) => {
        array.push(chunk);
    });

    request.on('end', () => {
        const body = Buffer.concat(array).toString();
        console.log('body', body);
        response.end('hi');
    })
}); */

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
   const { method, url, headers } = request;
   switch(url) {
        case '/index.html':
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
                if (error) throw error
                response.end(data.toString());
            })
            break
        case '/style.css':
            response.setHeader('Content-Type', 'text/css;charset=utf-8');
            fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
                if (error) throw error
                response.end(data.toString());
            })
            break
        case '/main.js':
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
            fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
                if (error) throw error
                response.end(data.toString());
            })
            break
   }
});

server.listen(8888);