const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const routes = require("./routes");
// require("./services/passport");
const socketMessaging = require("./socket/messaging");

const { database } = require("./config/keys");
var cors = require("cors");
const corsOptions = {
  origin: [
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3000/",
    "http://localhost:8001",
    "http://localhost:8001/",
    "https://www.lkctc.edu.in/",
    "https://www.lkctc.edu.in",
    "https://lkctc.edu.in/",
    "https://lkctc.edu.in",
    "https://lkctc-admin.web.app/",
    "https://lkctc-admin.web.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(morgan("combined"));

app.use(routes);

// app.use(passport.initialize());
// app.use(passport.session());

// Connect to MongoDB
mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    "mongodb+srv://khalsaCollege:SeFO9G3nZk6DUu1g@cluster0.0r7vaio.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = process.env.PORT || 5000;

    http.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));
