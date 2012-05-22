# Torpedo [![Build Status](https://secure.travis-ci.org/speier/torpedo.png?branch=master)](http://travis-ci.org/speier/torpedo)

Simple framework for building modern web applications.

## Installation

    $ npm install -g torpedo

## Getting Started

The quickest way to get started is to utilize the executable `torpedo` to generate an application as shown below:

Create a new application:

    $ torpedo new myapp
    $ cd myapp

Install dependencies:
    
    $ npm install

Build your application:

    $ torpedo build

Start the server:

    $ npm start // to run your server with up
    
Start development server and Watch for changes:

    $ torpedo watch // to run your server with up and monitor for changes

## Features

  * Application run in both node.js and the browser
  * Use the same Express based router on the server and client
  * Client side routing history supports HTML5 Push States
  * Reuse the same templates on the client and the server

## Test

```bash
$ npm test
```

## License 

(The MIT License)

Copyright (c) 2012 Kalman Speier &lt;kalman.speier@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 