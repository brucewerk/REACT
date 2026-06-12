/* IMPORTAMOS OS FRAMEWORKS */
import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

/* CRIAMOS O SERVIDOR */
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
const prisma = new PrismaClient();

/* METODO HTTP GET */
app.get("/usuarios", async (req, res) => {
  let users = [];
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: {
          contains: req.query.name,
        },
        email: {
          contains: req.query.email,
        },
        age: {
          equals: req.query.age,
        },
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/* METODO HTTP POST */
app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

/* METODO HTTP PUT */
app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(202).json(req.body);
});

/* METODO HTTP DELETE */
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(203).json({ message: "Usuário deletado com sucesso!" });
});
