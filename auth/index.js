const express = require("express");
const userModels = require("./src/models/user.schema");
const connectionDb = require("./src/config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bookRouter = require("./src/routes/books.routes");
const auth = require("./src/middleware/auth");
const BookModel = require("./src/models/book.schema");
app = express();

app.use(express.json());
app.use("/book", bookRouter);
app.use("/book", bookRouter);

app.get("/", async (req, res) => {
  try {
    res.send("Welcome to the home page");
  } catch (error) {
    console.log("error: ", error);
    res.send("Error:",error);
  }
});

app.get("/data", auth, async (req, res) => {
  try {
    const book = await BookModel.find();
    res.json({books:book});
  } catch (error) {
    console.log("error: ", error);

    res.send("This is the home Page");
  }
});

// register
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await userModels.findOne({ email });
  try {
    if (user) {
      return res.send("User is already registerd");
    } else {
      bcrypt.hash(password, 4, async (err, hashedPassword) => {
        try {
          const newUser = new userModels({
            name,
            email,
            password: hashedPassword,
            role,
          });
          await newUser.save();
          res.send("User registration successfull");
        } catch (error) {
          console.log("error: ", error);
          return res.send("Error while hassing the password");
        }
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send("error:", error);
  }
});

// signin
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModels.findOne({ email });
  try {
    if (!user) {
      return res.send("Invalid credentials");
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        try {
          if (result) {
            const token = jwt.sign({ email,password,role:user.role }, process.env.SECRET);
            res.status(200).send({ massage: "Login successfull", token });
          } else {
            res.status(400).send(err);
          }
        } catch (error) {
          console.log("error: ", error);
          res.status(400).send("Password incorrect");
        }
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send("error:", error);
  }
});

app.listen(process.env.PORT, async () => {
  try {
    connectionDb();
    console.log(
      `server is running on Port ${process.env.PORT} and connect to db`
    );
  } catch (error) {
    console.log("error: ", error);
  }
});
