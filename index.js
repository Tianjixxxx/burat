const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Brat API running",
    usage: "/gen/brat?text=HELLO"
  });
});

app.get("/gen/brat", (req, res) => {
  const text = String(req.query.text || "BRAT").toUpperCase();

  const SIZE = 500;
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#8ACF00";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // auto resize text (SYSTEM FONT ONLY)
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
  console.log("✅ Brat API running on port", PORT);
});