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

// Registro de usuário
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
        profilePicture: profilePictureBuffer,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

// Login de usuário
app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { email: user.email, userId: user.id },
        "secreta",
        {
          expiresIn: "1h",
        }
      );

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

// Criar projeto
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

// Buscar todos os projetos de um usuário
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

// Buscar detalhes de um projeto, incluindo tarefas
app.get("/api/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { tasks: true },
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

// Atualizar projeto
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

// Deletar projeto
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

// Criar tarefa
app.post("/api/projects/:projectId/tasks", async (req, res) => {
  const { projectId } = req.params;
  const { name, description, userId, status, dueDate } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        name,
        description,
        userId,
        projectId,
        status,
        dueDate: new Date(dueDate),
      },
    });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Editar tarefa
app.put("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { name, description, status, dueDate } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        name,
        description,
        status,
        dueDate: new Date(dueDate),
      },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Deletar tarefa
app.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

// Buscar todas as tarefas de um projeto
app.get("/api/projects/:projectId/tasks", async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
