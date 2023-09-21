const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: 'print-files' })
const ptp = require("pdf-to-printer")
const fs = require("fs")
const path = require("path")

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

router.get("/preview", async (req, res, next) => {
  try {
    /* const { file } = req.params
    console.log(file) */
    //console.log(__dirname);
    //console.log(path.dirname("../print-files/ca71c3868e5f2fd47c119dc27429eadc"));
    const abs = path.resolve("print-files\\37dae1eec3520be4d43ac8476deec190")
    console.log(abs);
    res.sendFile(abs)

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
    console.log(file)
    console.log(options)
    await ptp.print(path, options)
    fs.unlinkSync(path)

    res.json("File Printing!")
  }

  catch (error) {
    next(error);
  }
});

module.exports = router;
