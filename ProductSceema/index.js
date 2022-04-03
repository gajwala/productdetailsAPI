import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/product.js";
import variantRouter from "./routes/variants.js";
import ImagesRouter from "./routes/images.js";
import optionsRouter from "./routes/options.js";
import dotenv from "dotenv";
const mongoDBURL =
  "mongodb+srv://admin:admin@registartion.9b5sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/product", productRouter);
app.use("/variant", variantRouter);
app.use("/options", optionsRouter);
app.use("/images", ImagesRouter);

app.get("/", (req, res) => {
  res.send("Hello to Product details API");
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
