const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.listen(PORT, function () {
  console.log(`chat app listening on port ${PORT}!`);
});
