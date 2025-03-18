const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const GOOGLE_DRIVE_API_URL = "https://www.googleapis.com/drive/v3/files/";
const API_KEY = "AIzaSyDy6e6wFHeTwOsGXjeH0Kmjz-RaYgDfe3c"; // NON modificare

app.get("/stream/:fileId", async (req, res) => {
    const fileId = req.params.fileId;
    try {
        const response = await axios.get(`${GOOGLE_DRIVE_API_URL}${fileId}?alt=media&key=${API_KEY}`, {
            responseType: "stream",
        });
        res.setHeader("Content-Type", "audio/mpeg");
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Errore nel caricamento del file");
    }
});

app.listen(3000, () => console.log("Server in ascolto su http://localhost:3000"));
