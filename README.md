# Romerike Markiseservice v2.0

http://romerike-markise.no/

#### Backend

Scalatra-based Scala backend with REST interface. 

#### Frontend

React-based frontend

* React for the view
* Redux for data-flow through the app
* Babel 6 for transpiling fancy ES2015 code into boring old javascript
* Webpack for building and bundling 

#### Build and Deploy

Use utilities for building 

```
./build.sh
```
and deploying
```
./start.sh
```

Make sure Dropbox is running on the server machine with `dropbox start` or `dropbox status`
