const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config({ path: "./.env" });
app.use(cors({ origin: "http://127.0.0.1:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 4491;
const URI = process.env.MONGO_URI;
if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
}
app.listen(PORT, () => {
    console.log(`PORT STARTED AT ${process.env.PORT} ${process.env.NODE_ENV.toUpperCase()} MODE`);
})