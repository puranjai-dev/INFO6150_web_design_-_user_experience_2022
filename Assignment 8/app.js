const express = require("express");
const app = express();

const mongoose = require("mongoose");
// const userSchema = require("./models/userModel");
const userRouters = require("./routes/userRouters");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares"); //error handling

app.use(express.json()); // postman json
mongoose.connect(
  "mongodb://localhost:27017/assignment8db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Connected to db");
    } else {
      console.log("Error with connection");
    }
  }
); // to connect database

app.get("/", (req, res) => {
  res.send("API is running....");
}); // to check if api is running

app.use("/user/create", userRouters);
app.use("/user/edit", userRouters);
app.use("/user/delete", userRouters);
app.use("/user/getAll", userRouters);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3006; // port selection

app.listen(PORT, console.log(`Server started running on PORT ${PORT}`));
