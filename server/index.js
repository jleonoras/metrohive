const express = require("express");

const app = express();
const port = 5000

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success"
  })
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});