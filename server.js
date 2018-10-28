// Load the express module and store it in the variable express (Where do you think this comes from?)
const express = require("express");
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3001;
// invoke express and store the result in the variable app
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));

app.use(parser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    console.log('getting to index');
    response.render('index', { title: 'EJS Crazy Cats' });
});

const cats_array = [
    { cat_id: 1, name: "Garfield", age: 5, food: 'Lasagna', sleep_spot: 'in the bed', image: 'cat1.jpg'}, 
    { cat_id: 2, name: "One Eyed Willie", age: 14, food: 'Fish', sleep_spot: 'Goondocks', image: 'cat2.jpg'}, 
    { cat_id: 3, name: "Louis", age: 9, food: 'Wet cat food', sleep_spot: 'in the sun', image: 'cat3.jpg'}, 
    { cat_id: 4, name: "Tigger", age: 11, food: 'Not honey', sleep_spot: 'Tigger doesn\'t sleep', image: 'cat4.jpg'}
];

app.get('/cats', (request, response) => {
    console.log('getting to cats');
    // hard-coded user data

    response.render('cats', {
        cats: cats_array, 
        title: 'Cats Page' 
    });
});

app.get('/cats/:id', (request, response) => {
    console.log(`sent to individual cat page: ${request.params}`);
    // const which_cat = (request.params.id - 1);
    // const cat = cats_array[which_cat];
    const cat = cats_array.find(cat => cat.cat_id === parseInt(request.params.id));
    // just to illustrate that req.params is usable here:
    // code to get user from db goes here, etc...
    response.render('details', {
        cat,
        title: 'Details Page'
    });
});

// app.get('/cats/new', function (request, response) {
//     console.log('getting to cats');
//     response.render('form', {
//         title: 'Add Cat'
//     });
// });

// catch 404 and forward to error handler
app.use((request, response, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, request, response, next) => {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    response.status(err.status || 500);
    // render the error page
    response.render('error', {title: 'Cars and Cats Error page'});
  });

// tell the express app to listen on port 3001, always put this at the end of your server.js file
// app.listen(3001, function() { console.log("listening on port 3001"); });         // ES5 way
app.listen(port, () => console.log(`Express server listening on port ${port}`));    // ES6 way