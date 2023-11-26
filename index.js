import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const listOfPosts = [];


app.get("/", (req, res) => {
  res.render("index.ejs", {
      posts: listOfPosts,
      lengthArray: listOfPosts.length,
  });
});

app.get("/logo", (req, res) => {
  res.render("index.ejs", {
      posts: listOfPosts,
      lengthArray: listOfPosts.length,
  });
});


app.get("/home", (req, res) => {
  res.render("index.ejs", {
      posts: listOfPosts,
      lengthArray: listOfPosts.length,
  });
});


// post route homepage
app.post("/submit", (req, res) => {
  const newPost = req.body["newpost"];
  listOfPosts.push(newPost); // updating array with new posts
  res.redirect("/");
});

// edit post route
app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  const postToEdit = listOfPosts[index];
  res.render("edit.ejs", {
      index: index,
      postToEdit: postToEdit,
  });
});

// update post route
app.post("/update/:index", (req, res) => {
  const index = req.params.index;
  const updatedPost = req.body.updatedpost;
  listOfPosts[index] = updatedPost;
  res.redirect("/");
});

// delete post route
app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  listOfPosts.splice(index, 1);
  res.redirect("/");
});

//-----------------------------------------------------------------
//todo routing
//-----------------------------------------------------------------

const listOfTodos = [];

app.get("/todo", (req, res) => {
  res.render("todo.ejs", { todos: listOfTodos });
});

app.post("/addTodo", (req, res) => {
  const newTodo = { task: req.body.newTodo, completed: false };
  listOfTodos.push(newTodo);
  res.redirect("/todo");
});

app.post("/markTodo", (req, res) => {
  const todoIndex = req.body.todoIndex;
  if (todoIndex !== undefined && listOfTodos[todoIndex] !== undefined) {
    listOfTodos[todoIndex].completed = !listOfTodos[todoIndex].completed;
  }
  res.redirect("/todo");
});

app.post("/deleteTodo", (req, res) => {
  const todoIndex = req.body.todoIndex;
  if (todoIndex !== undefined && listOfTodos[todoIndex] !== undefined) {
    listOfTodos.splice(todoIndex, 1);
  }
  res.redirect("/todo");
});

//------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

