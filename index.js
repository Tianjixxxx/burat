const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gen/brat", (req, res) => {
  const text = (req.query.text || "").toString();

  const SIZE = 500;
  const PADDING = 40;
  const MAX_WIDTH = SIZE - PADDING * 2;

  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Start with large font
  let fontSize = 170;
  ctx.font = `${fontSize}px Arial`;

  // Auto-shrink font if text is too wide
  while (ctx.measureText(text).width > MAX_WIDTH && fontSize > 20) {
    fontSize -= 5;
    ctx.font = `${fontSize}px Arial`;
  }

  // Text style
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // Draw text (top-left like screenshot)
  ctx.fillText(text, PADDING, PADDING);

  // Output image
  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () => {
  console.log("Brat API running on port", PORT);
});