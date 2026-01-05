const express = require("express");
const { createCanvas } = require("canvas");

// IMPORTANT: disable font loading
process.env.FONTCONFIG_PATH = "/tmp";
process.env.FONTCONFIG_FILE = "/tmp/fonts.conf";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gen/brat", (req, res) => {
  const text = String(req.query.text || "BRAT").toUpperCase();

  const SIZE = 500;
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#8ACF00";
  ctx.fillRect(0, 0, SIZE, SIZE);

  let fontSize = 220;
  do {
    ctx.font = `bold ${fontSize}px Arial`;
    fontSize -= 4;
  } while (ctx.measureText(text).width > SIZE - 40 && fontSize > 40);

  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, SIZE / 2, SIZE / 2);

  res.setHeader("Content-Type", "image/png");
  res.end(canvas.toBuffer("image/png"));
});

app.listen(PORT, () => {
  console.log("API running on", PORT);
});