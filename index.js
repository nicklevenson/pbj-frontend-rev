

const express = require('express');
const path = require('path');

const app = express();

// Redirect to https in production if not already
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`pbj listening on ${port}`);