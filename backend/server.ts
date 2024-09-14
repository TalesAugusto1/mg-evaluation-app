import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Função para converter base64 para buffer
const base64ToBuffer = (base64: string): Buffer => {
  const base64Data = base64.split(",")[1];
  return Buffer.from(base64Data, "base64");
};

// Função para converter buffer para base64
const bufferToBase64 = (buffer: Buffer): string => {
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
};

app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, profilePicture } = req.body;
    let profilePictureBuffer: Buffer | undefined;

    if (profilePicture) {
      profilePictureBuffer = base64ToBuffer(profilePicture);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePicture: profilePictureBuffer, // Armazenar como BLOB
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, "secreta", {
        expiresIn: "1h",
      });

      res.json({
        token,
        name: user.name,
        userId: user.id,
        profilePicture: user.profilePicture
          ? bufferToBase64(user.profilePicture)
          : undefined,
      });
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.post("/api/projects", async (req: Request, res: Response) => {
  const { name, description, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId é necessário" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const project = await prisma.project.create({
      data: { name, description, userId },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.get("/api/projects", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "userId é necessário" });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { userId },
    });
    res.json(projects);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.get("/api/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Projeto não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.put("/api/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name, description },
    });
    res.json(project);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.delete("/api/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
