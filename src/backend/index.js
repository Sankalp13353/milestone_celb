const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.use("/",(req,res) => {
  res.status(200).send("Hello World");
})

app.listen(port, (req,res) => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
})