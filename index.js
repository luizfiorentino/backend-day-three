const express = require("express");

const app = express();
const PORT = 3000;

// Create a middleware function with the name loggingMiddleware. In addition to logging the current time to the console, this
// middleware should also send a custom header (using res.setHeader(name, value)) to the client. The header name should
// be X-Codaisseur-Time, and its value should be the same timestamp that was logged to the console. Add this middleware at the application level.

function loggingMiddleware(req, res, next) {
  const currentTime = new Date();
  console.log(`Request received at: ${currentTime}`);
  res.setHeader("X-Codaisseur-Time", currentTime);
  next();
}

// Next, make a middleware function called failRandomlyMiddleware. Make it so that 50% of the time (using Math.random) the middleware simply calls
//  next() and the other 50% of the time it will end the request with a 500 status code (and no content). Add this middleware at the route level.
function failRandomlyMiddleware(req, res, next) {
  if (Math.random() * 2 <= 1) {
    next();
  } else {
    res.status(500).end();
  }
}

app.use(loggingMiddleware);

app.get("/", failRandomlyMiddleware, (req, res) => res.send("Hello motto"));
app.get("/always", (req, res) => res.send("Yep"));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
