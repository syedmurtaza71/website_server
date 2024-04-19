const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const grid = require("@sendgrid/mail");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config({ path: "./.env" });
app.use(cors({ origin: "https://narsunstudios.com/", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;
const mailer = grid;
mailer.setApiKey(process.env.GRID_KEY);

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
}

app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT}`)
})

app.post("/narsun_mail", async (req, res) => {
    const { name, email, seeking, message, number } = req.body;

    if (!name || !email || !seeking || !message || !number)
        return res.status(500).json({ message: "EMAIL FIELD IS EMPTY" });

    const msg = {
        from: "info@narsun.pk",
        to: "info@narsun.pk",
        subject: `Inquiry Regarding ${seeking}`,
        replyTo: email,
        text: `  Hello,
        Name:  ${name}
        Seeking: ${seeking}
        Query: ${message}
        Contact number: ${number}
        Email: ${email}
        `,
    };

    try {
        const emailGrid = await mailer.send(msg);
        console.log(emailGrid, "GRID SENT");
        return res.status(200).json({ message: "EMAIL SENT SUCCESSFULLY" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "FAILED TO SEND EMAIL" });
    }
})