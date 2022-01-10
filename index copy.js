const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

const blogs = [
  { id: 1, title: "Belajar laravel" },
  { id: 2, title: "Belajar Express" },
  { id: 3, title: "Belajar React js" },
];

//menampilkan respon
app.get("/", (req, res) => {
  response.send({
    title: "hello world",
  });
});

//get blog
app.get("/blogs", (req, res) => {
  res.send({
    blogs,
  });
});

//tambah blog
app.post("/blogs", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.send({
      error: true,
      message: "Please include title",
    });
  }

  const ids = blogs.map((blog) => blog.id);
  const latestId = Math.max(...ids);
  const newBlog = {
    id: latestId + 1,
    title,
  };

  blogs.push(newBlog);

  res.send({
    status: "Success",
    data: newBlog,
  });
});

//update
app.patch("/blog/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const idIndex = blogs.findIndex((blog) => blog.id === +id);

  if (idIndex == -1) {
    res.send({
      error: true,
      message: "id tidak ditemukan",
    });
  }

  blogs.splice(idIndex, 1, {
    id: +id,
    title: title,
  });

  res.send({
    status: "success",
    message: "Berhasil update",
  });
  // console.log(blogs);
});

//delete
app.delete("/blog/:id", (req, res) => {
  const { id } = req.params;

  const idIndex = blogs.findIndex((blog) => blog.id === +id);

  if (idIndex == -1) {
    res.send({
      error: true,
      message: "id tidak ditemukan",
    });
  }

  blogs.splice(idIndex, id);

  res.send({
    status: "success",
    message: "Berhasil hapus",
  });
});

app.listen(port, () => {
  console.log(`Your app is running on port ${port}`);
});

// GET => Get resource (database,json)
// POST => Add resource
// PATCH / PUT => Update
// Delete
