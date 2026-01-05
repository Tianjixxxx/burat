const express = require("express");
const { createCanvas } = require("canvas");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/gen/brat", (req, res) => {
  const text = (req.query.text || "BRAT").toUpperCase();

  const SIZE = 500;
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#8ACF00";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // auto shrink text
  let fontSize = 220;
  do {
    ctx.font = `bold ${fontSize}px Arial`;
    fontSize -= 5;
  } while (ctx.measureText(text).width > SIZE - 40 && fontSize > 40);

  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, SIZE / 2, SIZE / 2);

  res.set("Content-Type", "image/png");
  res.send(canvas.toBuffer("image/png"));
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});