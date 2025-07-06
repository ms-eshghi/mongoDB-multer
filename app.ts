import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import cors from "cors";
import { Offer } from "./src/models/Offer";
import { Image } from "./src/models/Image";
import mongoose from "mongoose";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "images"))
);

const imageDir = path.join(__dirname, "..", "public", "images");
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imageDir),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const originalFilename = path.basename(file.originalname, extension);
    const id = uuidv4();
    const filename = `${originalFilename}_${id}${extension}`;
     console.log("Saving file with filename:", filename);
    cb(null, filename);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    let imageId;

    if (req.file) {
      const image = await Image.create({
        filename: req.file.filename,
        path: `/images/${req.file.filename}`,
      });
      imageId = image._id;
    }

    await Offer.create({
      title,
      description,
      price: parseFloat(price),
      imageId,
    });
    res.status(201).send("Offer saved");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to save offer");
  }
});

app.get("/offers", async (req, res) => {
  try {
    const offers = await Offer.find();
    const result = await Promise.all(
      offers.map(async (offer) => {
        let image = null;
        if (offer.imageId) {
          image = await Image.findById(offer.imageId);
        }
        return {
          _id: offer._id,
          title: offer.title,
          description: offer.description,
          price: offer.price,
          imagePath: image ? image.path : null,
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch offers");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
