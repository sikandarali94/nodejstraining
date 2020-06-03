/* We can specifically tell nodemon which extension files to look for changes in using this command: nodemon src/app.js
-e js,hbs
 */
/* Node has a core module called Path that provides us a ton of great utilities for working with paths. This is done in
a cross OS compatible way. */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
/* handlebars is a templating engine that will be able to render dynamic content. We'll be able to easily use and reuse
little pieces of markup throughout the various pages in our app. The hbs library allows handlebars to be easily
integrated into the Express framework. */

/* __dirname contains a path to the directory the current script lives in e.g. D:\Coding\Practice\NodeJS\server\src. */
console.log(__dirname);
/* __filename contains a path to the file itself e.g. D:\Coding\Practice\NodeJS\server\src\app.js. The join() method is
used to join all the path segments together. For example, if __dirname is 'server/src', then joining this path with
'../public' will give us 'server/public'. */
console.log(path.join(__dirname, '../public'));

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/* Below we are telling Express that the view engine we are using is hbs. Note: we must make sure that we write
'view engine' exactly because that is an exact setting name in Express. */
app.set('view engine', 'hbs');
/* With the views setting, we can override the default view folder path with a custom one, as shown below. In our case,
Express will now look in the templates folder for the views instead of the default views folder. */
app.set('views', viewsPath);
/* We provide the partials directory to the hbs.registerPartials() method, thus telling hbs where our partials directory
lies. */
hbs.registerPartials(partialsPath);

/* In general, the use() method is used to customise our server. In our case, we are going to customise the server to
serve out the folder where our index.html page lives. express.static() method takes the path to the folder we want to
serve up. We removed the app.get() method for the root URL because Express goes through our code for each URL until it
satisfies what it needs; because, the root URL ('') is satisfied by app.use(express.static(publicDirectoryPath));, we
do not need app.get('', ...); */
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  /* Since we have already configured Express to use handlebars as the view engine, we can just use the render method
  to render our handlebars template, as shown below. render() method just allows us to render one of our views. Express
  already has it configured that all the views are in the Views folder, so we just provide the name of the view without
  the extension. The second argument is an object which contains key-value pairs data that we want inside of our view
  template. */
  res.render('index', {
    title: 'Weather App',
    name: 'Sikandar Ali'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Sikandar Ali'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is some helpful text.',
    title: 'Help',
    name: 'Sikandar Ali'
  });
})

/* The get() method lets us configure what the server should do when someone tries to get the resource at a specific
URL. The callback method is called with two very important arguments. The first is an object containing information
about the incoming request to the server (it is usually written as 'req'). The second argument is the response: this
contains a bunch of methods allowing us to customize what we're going to send back to the requester (it is usually
written as 'res'). '' refers to the root URL e.g. app.com. If we do not have a route set URL set up for our server and
someone visits a route, they get the default error: 'Cannot GET /about'. */

app.get('/weather', (req, res) => {
  res.send({
    forecast: "Overcast",
    location: "Sydney"
  });
});

/* The listen method is used to start the server. It takes in a port which the server listens to, and a callback
function (optional) which runs when the server is spun up. Spinning up the server is an asynchronous process. */
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});