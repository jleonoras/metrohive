import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/uploads");
  },

  filename: (request, file, callback) => {
    const uniquePrefix = Date.now();
    const extension = path.extname(file.originalname);
    callback(null, uniquePrefix + extension);
  },
});

const upload = multer({
  storage: storage,
  filFilter: function (request, file, callback) {
    if (file.mimeType === "image/png" || file.mimeType === "image/jpg") {
      callback(null, true);
    } else {
      console.log("Only .png .jpg file supported!");
      callback(null, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 3 },
});

export { upload, storage };