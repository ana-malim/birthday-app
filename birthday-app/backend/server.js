require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./models/index");

const port = process.env.PORT || 4000;

const app = express();
const bdRoutes = require("./routes/birthday.routes");
const registerRoutes = require("./routes/register.routes");
const logoutRoutes = require("./routes/logout.routes");
const authRoutes = require("./routes/auth.routes");

// TODO how to connect to two different databases for two different services

db.mongoose
  .connect(db.bd_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors());
// parses incoming JSON requests and puts the parsed data in req.body object.
app.use(express.json());

// print on the console the HTTP method and the URL of every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/birthday', bdRoutes);
app.use('/', registerRoutes);
app.use('/', logoutRoutes);
app.use('/', authRoutes);

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Birthday application."
  });
});

// listen for requests on set port 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});