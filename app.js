const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});
/*app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(response => {
    console.log(response);
    res.render('beers', { response });
  });
});*/

app.get('/beers', async (req, res) => {
  const response = await punkAPI.getBeers();
  console.log(response);
  res.render('beers', { response });
});

app.get('/random-beer', async (req, res) => {
  const response = await punkAPI.getRandom();
  console.log(response);
  res.render('random-beer', { response });
});

app.get('/individual/:id', async (req, res) => {
  const response = await punkAPI.getBeer(req.params.id);
  const beer = response[0];
  console.log('beer', beer);
  res.render('partials/beer', beer);
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
