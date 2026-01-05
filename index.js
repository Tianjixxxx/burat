const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gen/brat", async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).send("Missing ?text=");
  }

  // Canvas size (auto adjust width)
  const fontSize = 160;
  const padding = 80;

  const tempCanvas = createCanvas(1, 1);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.font = `bold ${fontSize}px Arial`;
  const textWidth = tempCtx.measureText(text).width;

  const width = textWidth + padding * 2;
  const height = fontSize + padding * 2;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Black text
  ctx.fillStyle = "#000000";
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  ctx.fillText(text, padding, padding);

  // Return image
  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

app.get("/", (req, res) => {
  res.send("Brat Generator API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
