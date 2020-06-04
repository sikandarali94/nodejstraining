const path = require('path');
const express = require('express');
const hbs = require('hbs');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

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

app.get('/weather', (req, res) => {
  res.send({
    forecast: "Overcast",
    location: "Sydney"
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