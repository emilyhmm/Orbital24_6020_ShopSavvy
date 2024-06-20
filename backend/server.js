const express = require("express")
const bodyParser = require("body-parser")
const connectDB = require("./db")
const User = require("./models/userModel")
const authRouter = require("./Routes/authRoute")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const app = express()
app.use(cors())
connectDB()

//body parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', authRouter);

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is running on port',PORT)
});