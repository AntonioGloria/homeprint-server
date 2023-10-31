const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: 'print-files' })
const ptp = require("pdf-to-printer")
const fs = require("fs")

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    res.json(req.file)
  }

  catch (error) {
    next(error)
  }
})

router.post("/print", async (req, res, next) => {
  try {
    const { file, options } = req.body
    const { path } = file

    console.log("INCOMING PRINT JOB")
    console.table({"filename": file.originalname, ...options});
    await ptp.print(path, { ...options, printer:"EPSON L4150 Series" })
    fs.unlinkSync(path)

    res.json(`Printing ${file.originalname}...`)
  }

  catch (error) {
    next(error);
  }
});

module.exports = router;
