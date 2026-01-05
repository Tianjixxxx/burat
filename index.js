const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gen/certificate", (req, res) => {
  const name = (req.query.name || "John Doe").toUpperCase();
  const course = req.query.course || "Completed the Course";
  const issuer = req.query.issuer || "Certificate Authority";
  const date = req.query.date || new Date().toLocaleDateString();

  const WIDTH = 1200;
  const HEIGHT = 900;
  const PADDING = 60;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Border
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(
    PADDING,
    PADDING,
    WIDTH - PADDING * 2,
    HEIGHT - PADDING * 2
  );

  // Title
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";

  ctx.font = "bold 64px Arial";
  ctx.fillText("CERTIFICATE OF COMPLETION", WIDTH / 2, 200);

  // Subtitle
  ctx.font = "28px Arial";
  ctx.fillText("This certifies that", WIDTH / 2, 280);

  // Name
  ctx.font = "bold 72px Arial";
  ctx.fillText(name, WIDTH / 2, 380);

  // Course text
  ctx.font = "30px Arial";
  ctx.fillText("has successfully completed", WIDTH / 2, 460);

  ctx.font = "bold 40px Arial";
  ctx.fillText(course, WIDTH / 2, 520);

  // Footer
  ctx.font = "24px Arial";
  ctx.fillText(`Issued by ${issuer}`, WIDTH / 2, 640);
  ctx.fillText(`Date: ${date}`, WIDTH / 2, 680);

  // Signature line
  ctx.beginPath();
  ctx.moveTo(300, 750);
  ctx.lineTo(600, 750);
  ctx.stroke();

  ctx.font = "20px Arial";
  ctx.fillText("Authorized Signature", 450, 780);

  // Output
  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

app.listen(PORT, () => {
  console.log("Certificate API running on port", PORT);
});