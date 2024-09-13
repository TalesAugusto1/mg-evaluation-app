import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

interface User {
  name: string;
  email: string;
  password: string;
}

const users: User[] = [];

//e. de usuários

app.post("/api/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.status(201).send("Usuário registrado com sucesso");
});

app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ email: user.email }, "secreta", {
      expiresIn: "1h",
    });
    res.json({ token, name: user.name });
  } else {
    res.status(401).send("Credenciais inválidas");
  }
});

//e. de projetos

app.post("/api/projects", async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const project = await prisma.project.create({
    data: { name, description },
  });
  res.status(201).json(project);
});

app.get("/api/projects", async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});

app.get("/api/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });
  res.json(project);
});

app.put("/api/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: { name, description },
  });
  res.json(project);
});

app.delete("/api/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.project.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
});

//e. de tarefas (a serem adicionados)

// Iniciar o servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
