// const postgres = knex({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: 'nicole',
//     database: 'facerecognition'
//   }
// });

// const {
//   Pool
// } = require('pg');
// const postgres = new Pool({
//   user: keys.pgUser,
//   host: keys.pgHost,
//   database: keys.pgDatabase,
//   password: keys.pgPassword,
//   port: keys.pgPort
// });
// postgres
//   .query('CREATE TABLE IF NOT EXISTS users (number INT)')
//   .catch(err => console.log(err));
// postgres.on('error', () => console.log('Lost PG connection'));

// postgres
//   .query('SELECT * FROM users')
//   .then(console.log)

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'chris',
//       email: 'chris@gmail.com',
//       password: 'cookies',
//       entries: 0,
//       joined: new Date()
//     }, {
//       id: '124',
//       name: 'nicole',
//       email: 'nicole@gmail.com',
//       password: 'papa',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   login: [
//     {
//       id: '987',
//       hash: '',
//       email: 'chris@gmail.com'
//     }
//   ]
// }

// function findUser(data) {
//   let usera = {};
//   let flag = false;
//   database.users.forEach(user => {
//     console.log(user.id)
//
//     if (user.id === data) {
//       flag = true;
//       usera = user
//       return usera;
//     }
//   })
//
//   if (flag) {
//     console.log(usera);
//     return usera
//   } else {
//     return null
//   }
//
// }

//app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.send(database.users);
  postgres
    .select("*")
    .from("users")
    .then(data => {
      res.json(data);
    })
    // postgres
    //   .query('SELECT * FROM users')
    //   .then(data => {
    //     res.json(data);
    //   })
    .catch(err => res.status(400).json(err));
});
