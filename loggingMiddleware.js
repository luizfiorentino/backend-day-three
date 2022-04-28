function loggingMiddleware(req, res, next) {
  const currentTime = newDate();
  console.log(`Request received at: ${currentTime}`);
  res.setHeader("X-Codaisseur-Time", currentTime);
  next();
}
