const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany({
    include: { Picture: true },
  });
  res.status(200).json(products);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: { Picture: true },
  });

  res.status(200).json(product);
});

router.post("/", async (req, res) => {
  if (!req.body) res.status(400).json({ message: "Content missing" });

  const { name, description, price, pictures } = req.body;
  price = parseInt(price);

  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        Picture: {
          createMany: {
            data: pictures,
          },
        },
      },
    });

    res.status(201).json(product);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const { name, description, price } = req.body;
  price = parseInt(price);

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name,
        description: description,
        price: price,
      },
    });

    res.status(201).json(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    const product = await prisma.product.delete({
      where: { id },
    });

    res.status(201).json(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
