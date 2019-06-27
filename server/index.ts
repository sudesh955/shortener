import { createServer } from "http";

const production: boolean = process.env.NODE_ENV === "production";
const port = production ? parseInt(process.env.PORT || "3000") : 3001;

createServer((req, res) => res.end("hlll")).listen(port);
