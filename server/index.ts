import path from "path";
import { request } from "http";
import express, { Request, Response, NextFunction } from "express";
import api from "./api";
import { initModels } from "./models";
import { click } from "./links";

function serveIndexFile(req: Request, res: Response) {
  if (__DEV__) {
    request(
      `http://localhost:${process.env.PORT || "3000"}/dist/index.html`,
      response => response.pipe(res)
    ).end();
  } else {
    res.sendFile(path.join(process.cwd(), "/dist/index.html"));
  }
}

function handleClick(req: Request, res: Response, next: NextFunction) {
  const id = req.url.substr(1);
  const proxyIp = req.headers["x-forwarded-for"];
  const ip = proxyIp
    ? Array.isArray(proxyIp)
      ? proxyIp[0]
      : proxyIp
    : req.socket.remoteAddress;
  click(id, ip, req.headers.referer, req.headers["user-agent"])
    .then(link => {
      if (link === null) {
        next();
      } else {
        res.redirect(link.url);
      }
    })
    .catch(() => res.status(500).end());
}

async function main() {
  await initModels();
  const app = express();
  if (!__DEV__) {
    app.use(
      "/dist",
      express.static(path.join(process.cwd(), "dist"), {
        maxAge: "100 day",
        immutable: true,
        fallthrough: false
      })
    );
  }
  app.use(express.json());
  app.use("/api", api);
  app.get("/", serveIndexFile);
  app.get("*", handleClick);
  app.use(serveIndexFile);
  app.listen(__DEV__ ? 3001 : parseInt(process.env.PORT || "3000"));
}

main().catch(console.error);
