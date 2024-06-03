import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();

// Middlewares
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Setup Multer
const upload = multer({
  dest: "./uploads",
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = file.originalname.split(".").pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    },
  }),
});

app.get("/test", (req, res, next) => {
  res.status(200).json("It works");
  console.log("Request made to /test");
});

app.post("/upload", upload.array("files"), (req, res, next) => {
  // Validate file extension
  //   const fileExt = req.file.filename.split(".")[1];
  //   const allowedExts = ["png", "jpeg", "jpg"];

  //   //   Check if ext is allowed
  //   if (!allowedExts.includes(fileExt)) {
  //     return res.status(401).json(`Only ${allowedExts.join(",")} are allowed!`);
  //   }

  // return files details
  console.log(req.files);
  res.status(201).json("files uploaded");
});

app.listen(3001, () => console.log("Server started on port 3001"));
