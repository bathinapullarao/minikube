const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>perchases</h1>");
});

server.listen(8091, () => {
  console.log("Server running on port 8091");
});
