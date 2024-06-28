require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const staticPath = path.join(__dirname, "dist");

// Middleware to serve gzipped files
app.get("/bundle.js.gz", (req, res) => {
  const gzipFilePath = path.join(staticPath, "bundle.js.gz");

  // Check if the gzipped file exists
  fs.access(gzipFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }

    // Set appropriate headers for gzipped response
    res.set({
      "Content-Encoding": "gzip",
      "Content-Type": "application/javascript",
    });

    // Create a read stream from the gzipped file and pipe it to the response
    const gzipStream = fs.createReadStream(gzipFilePath);
    gzipStream.pipe(res);
  });
});

// Serve other static files from the 'dist' folder
app.use(express.static(staticPath));

// Start the server on the specified port (or default to 8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.error(`Server is running on port ${PORT}`);
});
