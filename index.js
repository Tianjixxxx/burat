const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gen/brat", (req, res) => {
  let text = (req.query.text || "").toLowerCase().trim();
  if (!text) return res.status(400).send("missing text");

  const SIZE = 500;
  const PADDING = 40;
  const GAP_X = 40;   // column gap
  const GAP_Y = 12;   // line gap

  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const words = text.split(/\s+/);

  let fontSize = 64;
  let columns, rows;

  // auto shrink until it fits
  while (fontSize > 18) {
    ctx.font = `${fontSize}px Arial`;

    const lineHeight = fontSize + GAP_Y;
    rows = Math.floor((SIZE - PADDING * 2) / lineHeight);
    columns = Math.ceil(words.length / rows);

    const colWidth = Math.max(
      ...words.map(w => ctx.measureText(w).width)
    );

    const totalWidth =
      columns * colWidth + (columns - 1) * GAP_X;

    if (totalWidth <= SIZE - PADDING * 2) break;

    fontSize -= 2;
  }

  ctx.font = `${fontSize}px Arial`;

  const lineHeight = fontSize + GAP_Y;
  rows = Math.floor((SIZE - PADDING * 2) / lineHeight);

  let x = PADDING;
  let y = PADDING;
  let row = 0;

  for (let i = 0; i < words.length; i++) {
    ctx.fillText(words[i], x, y);

    row++;
    y += lineHeight;

    if (row >= rows) {
      row = 0;
      y = PADDING;

      const wordWidth = ctx.measureText(words[i]).width;
      x += wordWidth + GAP_X;
    }
  }

  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () => {
  console.log("brat-style API running on", PORT);
});