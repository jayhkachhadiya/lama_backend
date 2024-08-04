const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectdb = require("./config/connectdb");
const userRoute = require("./routers/user");
const projectRoute = require("./routers/project");
const uploadRoute = require("./routers/upload");
dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoURI = process.env.DATABASE_URL;

app.use(express.json());

app.use(cors(corsOptions));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => res.send("Lama backend run successfully!"));

app.use("/user", userRoute);
app.use("/project", projectRoute);
app.use("/upload", uploadRoute);
app.listen(port, () => {
  connectdb(mongoURI);
  console.log(`Example app listening on port ${port}!`);
});
