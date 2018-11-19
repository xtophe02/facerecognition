const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./Controllers/register");
const signin = require("./Controllers/signin");
const profile = require("./Controllers/profile");
const image = require("./Controllers/image");

const keys = require("./keys");

const postgres = knex({
  client: "pg",
  connection: {
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
  }
});

// postgres
//   .schema
//   .createTable('users', table => {
//     //table.increments('id')
//     table.uuid('id').primary()
//     table.string('name')
//     table.unique('email')
//     table.float('entries', 0)
//     table.timestamp('joined').defaultTo(postgres.fn.now()).notNullable()
//   })
//   .then(console.log)
// postgres
//   .schema
//   .createTable('login', table => {
//     //table.increments('id')
//     table.uuid('id').primary()
//     table.string('hash').notNullable()
//     table.foreign('users').references(users.id)

//   })
//   .then(console.log)

postgres
  .select("*")
  .from("users")
  .then(console.log);

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(database.users);
  postgres
    .select("*")
    .from("users")
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
});

app.post("/sign", signin.HandleSignIn(postgres, bcrypt));

app.post("/register", (req, res) => {
  register.HandleRegister(req, res, postgres, bcrypt);
});

app.get("/profile/:userId", (req, res) =>
  profile.profileHandler(req, res, postgres)
);

app.put("/image", (req, res) => image.imageHandler(req, res, postgres));
app.post("/imageURL", (req, res) => image.HandlerAPI(req, res));

app.listen(3004, () => {
  console.log("app is running on port 3004");
});
/* /--> this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user */
