import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import chatRouter from "./routes/chat.route";
import messageRouter from "./routes/message.route";
import notificationRouter from "./routes/notification.route";
import { app, io, onConnection, server } from "./config/socket";
import { VercelRequest, VercelResponse } from "@vercel/node";

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
app.use("/api/notifications", notificationRouter);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  io.on("connection", onConnection);

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

export default (req: VercelRequest, res: VercelResponse) => {
  server.emit("request", req, res);
};
