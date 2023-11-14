const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: 'print-files' })
const ptp = require("pdf-to-printer")
const pdfjsLib = import('pdfjs-dist');
const fs = require("fs")

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { file } = req
    const docLoad = (await pdfjsLib).getDocument(file.path)
    const doc = await docLoad.promise
    const filePages = doc.numPages

    res.json({ ...file, filePages })
  }

  catch (error) {
    next(error)
  }
})

router.post("/print", async (req, res, next) => {
  const dateNow = new Date(Date.now())
  const printDate = dateNow.toDateString()
  const printTime = dateNow.toLocaleTimeString()

  try {
    const { file, options } = req.body
    const { path } = file

    console.log(`INCOMING PRINT JOB - ${printDate} ${printTime}`)
    console.table({ "filename": file.originalname, ...options });
    await ptp.print(path, { ...options, printer: process.env.PRINTER })
    fs.unlinkSync(path)

    res.json(`Printing ${file.originalname}...`)
  }

  catch (error) {
    next(error);
  }
});

module.exports = router;
