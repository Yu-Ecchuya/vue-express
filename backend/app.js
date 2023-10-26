const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.FRONT_ENDPOINT, "*"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// 受け取ったJSONを解析
app.use(express.json());

// データベースに接続
const db = new sqlite3.Database("./DB/mydatabase.db");

// ユーザー一覧
app.get("/api/users", (req, res) => {
  // データベースからユーザーデータを取得するクエリを実行
  const sql = "SELECT * FROM users";
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "データベースエラー" });
      return;
    }
    // 取得したユーザーデータをJSON形式でクライアントに返す
    res.json({ users: rows });
  });
});

// ユーザー情報取得
app.get("/api/users/edit", (req, res) => {
  const id = req.query.userID;
  // データベースからユーザーデータを取得するクエリを実行
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "データベースエラー" });
      return;
    }
    // 取得したユーザーデータをJSON形式でクライアントに返す
    res.json({ users: rows });
  });
});

// usersテーブル登録
app.post("/api/users/post", (req, res) => {
  // リクエストが空だったらエラーを返す
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "ユーザー情報が不正です。" });
  }

  const { name, age, address, tell } = req.body;

  // DBに保存
  const sql = `
    INSERT INTO users (name, age, address, tell)
    VALUES (?, ?, ?, ?)
  `;
  db.run(sql, [name, age, address, tell], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("DB保存エラー");
      return;
    }

    // 保存成功
    res.send("DB保存成功");
  });
});

// ユーザー情報更新
app.put("/api/users/edit/:id", (req, res) => {
  // リクエストが空だったらエラーを返す
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "ユーザー情報が不正です。" });
  }

  const id = req.params.id;
  const { name, age, address, tell } = req.body;

  // DBに保存
  const sql = `UPDATE users SET name=?, age=?, address=?, tell=? WHERE id=${id}`;

  db.run(sql, [name, age, address, tell], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("DB保存エラー");
      return;
    }

    // 保存成功
    res.send("DB保存成功");
  });
});

// ユーザー削除
app.delete("/api/users/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM users WHERE id = ${id}`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error("ユーザーの削除中にエラーが発生しました: " + err.message);
      res.status(500).send("ユーザーの削除に失敗しました");
      return;
    }

    // 削除成功
    console.log("ユーザーが削除されました");
    res.send("ユーザーが削除されました");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
