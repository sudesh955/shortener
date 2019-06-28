import { Router } from "express";
import { createLink, removeLink, clicks } from "./links";

const router = Router();

router.post("/link", (req, res) => {
  const url = req.body.url;
  if (typeof url !== "string") {
    res.status(400).end();
    return;
  }
  createLink(url)
    .then(link => res.send(link))
    .catch(() => res.status(500).end());
});

router.get("/link/:id/clicks", (req, res) => {
  clicks(req.params.id)
    .then(clicks => res.send(clicks))
    .catch(() => res.status(500).end());
});

router.delete("/link/:id", (req, res) => {
  removeLink(req.params.id)
    .then(removed => res.status(removed ? 200 : 404).end())
    .catch(error => res.status(500).send(error));
});

export default router;
