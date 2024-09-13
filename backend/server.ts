import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

interface User {
  name: string;
  email: string;
  password: string;
}

const users: User[] = [];

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

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
