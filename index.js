const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gen/brat", (req, res) => {
  const text = req.query.text || "";

  const SIZE = 500;
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Font style (brat-like)
  const fontSize = 160;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = "#000000";

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Slight blur / softness
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 2;

  // Draw text
  ctx.fillText(text, SIZE / 2, SIZE / 2);

  // Output image
  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () => {
  console.log("Brat API running on port", PORT);
});