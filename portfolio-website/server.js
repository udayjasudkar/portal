const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Requested root route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

// Optional catch-all (static serves direct paths)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Root: http://localhost:${PORT}/ → "Server is running ✅"`);
  console.log(`Portfolio: http://localhost:${PORT}/index.html`);
});
