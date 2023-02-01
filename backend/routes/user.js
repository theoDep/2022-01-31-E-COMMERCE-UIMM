const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: false,
      lastname: true,
      firstname: true,
      alias: true,
    },
  });
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      password: false,
      lastname: true,
      firstname: true,
      alias: true,
    },
  });

  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  if (!req.body) res.status(400).json({ message: "Content missing" });

  const { email, password, lastname, firstname, alias } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        lastname: lastname,
        firstname: firstname,
        alias: alias,
      },
    });

    res.status(201).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const { alias, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        alias: alias !== undefined ? alias : undefined,
        email: email !== undefined ? email : undefined,
      },
    });

    res.status(201).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    const user = await prisma.user.delete({
      where: { id },
    });

    res.status(201).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
