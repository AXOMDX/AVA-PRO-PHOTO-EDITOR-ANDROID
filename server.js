const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({
  limit: "50mb"
}));

app.use(express.static(
  path.join(__dirname, "../")
));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../index.html")
  );
});

// Fallback for any other route
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../index.html")
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Ava Pro running on port ${PORT}`);
});
