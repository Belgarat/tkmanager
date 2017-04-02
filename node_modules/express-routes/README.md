#express-routes

A route helper for express that allows you to generate URLs for your routes by applying the parameters the pattern may contain.

[![Build Status](https://secure.travis-ci.org/dluces/express-routes.png)](http://travis-ci.org/dluces/express-routes)


##Installation

  npm install express-routes

##Features

  * Relate your route definitions to a specific name
  * Get the pattern for routes by using the route name
  * Generate URLs for routes by using the route name and an object with parameter values
  * Independent of the template engine you use
  
##Quick Start

On your app file, include express-routes, configure it, and use it with your Express app:

``` javascript
var routes = require('express-routes');

// use the helper
routes(app, {
  // directory where the helper will look for route files automatically (optional)
  directory: [path.join(__dirname, 'myRoutesDirectory1'), path.join(__dirname, 'myRoutesDirectory2')],
  // the base path of your application to generate absolute URLs
  basePath: 'http://local.host:3000',
  // a prefix for generated URLs
  prefix: '/',
  // helper names for your templates, in case the default ones conflict with current helpers you have.
  helpers: {
    generateUrl: 'url',
    getPattern: 'pattern'
  }
});
```

### Route files

If you specified a directory key in the configuration, the helper will look for all javascript files in each of the directories and require them.
It will expect each file to export a function that receives the express application as only parameter.

A regular route file will look like this:

``` javascript
var routes = require('express-routes');

module.exports = function(app) {
  // Route registration, see below
  routes.register([...])
}
```

### Registering Routes

To register your routes, you don't need to call app.VERB anymore, as express-routes will handle that for you. Instead, do the following:

``` javascript
routes.register([
  {
    // the route name, to be used with the helper functions (generateURL or getPattern)
    name: 'myRouteName',
    // the pattern for the route, the prefix specified in the configuration will be added at the begining (should not include it)
    pattern: 'myRoute/:pattern',
    // functions for each VERB that Express uses
    all: function(req, res, next) {...},
    get: function(req, res, next) {...},
    post: function(req, res, next) {...},
    put: function(req, res, next) {...},
    del: function(req, res, next) {...},
  }
]);
```

### View helpers

In your templates, you can do the following:
```
a(href=url('myRouteName', {pattern: 'myValue'})) My Link
``` 

Of for absolute URLs:
```
a(href=url('myRouteName', {pattern: 'myValue'}, true))
``` 

##Configuration options

**routes.configure([options])**

The available options are:

* `directory`: directory to load route files from (optional)
* `basePath`: base path to generate absolute URLs (optional). Do not include any sub-directories (eg: http://local.host:3000), see prefix for that.
* `prefix`: any prefix to add to your routes automatically (optional, defaults to '/')
* `helpers`: helper names for your templates, in case the default ones conflict with current helpers you have.

##License

(The MIT License)

Copyright (c) 2014 Diego Luces <me@dluces.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.