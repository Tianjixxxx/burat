const express = require("express");
const { createCanvas, registerFont } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

registerFont("./fonts/ArialNarrow.ttf", { family: "ArialNarrow" });

function fitText(ctx, text, maxWidth, maxHeight) {
  let fontSize = 200;
  do {
    ctx.font = `${fontSize}px ArialNarrow`;
    fontSize--;
  } while (
    ctx.measureText(text).width > maxWidth ||
    fontSize > maxHeight
  );
  return fontSize;
}

app.get("/gen/brat", (req, res) => {
  const text = (req.query.text || "BRAT").toUpperCase();

  const size = 500;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#8ACF00";
  ctx.fillRect(0, 0, size, size);

  // text
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const fontSize = fitText(ctx, text, 450, 350);
  ctx.font = `${fontSize}px ArialNarrow`;

  ctx.fillText(text, size / 2, size / 2);

  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () =>
  console.log(`Brat API running on http://localhost:${PORT}`)
);