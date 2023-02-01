const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const pictures = await prisma.picture.findMany();
  res.status(200).json(pictures);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const picture = await prisma.picture.findUnique({
    where: {
      id: id,
    },
  });

  res.status(200).json(picture);
});

router.post("/", async (req, res) => {
  if (!req.body) res.status(400).json({ message: "Content missing" });

  const { name, url } = req.body;
  let { productId } = req.body;
  productId = parseInt(productId);

  try {
    const picture = await prisma.picture.create({
      data: {
        name: name,
        url: url,
        productId: productId,
      },
    });

    res.status(201).json(picture);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const { name, url } = req.body;

  try {
    const picture = await prisma.picture.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        url: url !== undefined ? url : undefined,
      },
    });

    res.status(201).json(picture);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    const picture = await prisma.picture.delete({
      where: { id },
    });

    res.status(201).json(picture);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
