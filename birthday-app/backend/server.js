require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const db = require("./models/connection");
//const mongoose = require('mongoose');
const db = require("./models/index");
// const config = require("./models/index");
//const db = require("./config/connection")



const port = process.env.PORT || 4000;

const app = express();
const bdRoutes = require("./routes/birthday.routes");//(app);
const registerRoutes = require("./routes/register.routes");
const logoutRoutes = require("./routes/logout.routes");
const authRoutes = require("./routes/auth.routes");

// var conn = mongoose.createConnection(db.bd_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// var conn2 = mongoose.createConnection(db.u_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// global.clientConnection = db.initClientDbConnection(config.bd_url);

// global.clientConnection = db.initClientDbConnection(config.u_url);

db.mongoose
  .connect(db.bd_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    //listDatabases(db);
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//   db.mongoose
//   .connect(db.u_url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//     //listDatabases(db);
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

  //console.log(db.listCollections({name: 'birthday-app'}));

app.use(cors());
// parses incoming JSON requests and puts the parsed data in req.body object.
app.use(express.json());

// print on the console the HTTP method and the URL of every request
app.use((req, res, next) => {
  // For example, a GET request to `/test` will print "GET /test"
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

//app.listen();

// ---------------------------------------------------------------------------
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// mongoose.connect(uri);

// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })

// const BirthdayRoute = require('./Routes/Birthday');

// // use() function is used to mount the specified middleware function (are the functions that have access to the request object and response object, or we can call it a response-request cycle) at the path which is being specified.
// app.use('/products', BirthdayRoute)