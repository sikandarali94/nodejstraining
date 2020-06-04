const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
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

app.get('/weather', ({ query } = {}, res) => {
  const { address } = query;

  if (!address) {
    return res.send({
      error: 'No address was provided'
    });
  }

  geocode(address, (error, { longitude, latitude, location }) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast,
        location,
        address
      });
    });
  });
});

/* Query strings are at the end of a URL; we start it off with a question mark, followed by key-value pairs (separated
by &) e.g. app.com?search=games&rating=5. */
app.get('/products', (req, res) => {
  /* We have to make sure not to respond to the same request twice, otherwise, we get the error: Cannot set headers
  after they are sent to the client. */
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  /* req.query contains all of the parsed query string information e.g. { search: 'games', rating: '5' }. */
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sikandar Ali',
    message: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sikandar Ali',
    message: 'Page not found'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});