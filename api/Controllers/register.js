const HandleRegister = (req, res, postgres, bcrypt) => {
  // console.log(req.body)
  // res.send('ok')
  const {name, email, password} = req.body;
  const hash = bcrypt.hashSync(password);
  // bcrypt.hash(password, null, null, function(err, hash) {
  //    Store hash in your password DB.
  // });

  // database.users.push({
  //   id: '125',
  //   name: name,
  //   email: email,
  //   password: password,
  //   entries: 0,
  //   joined: new Date()
  // })
  if(!name || !email || !password){
    return res.status(400).json('incorrect form submission')
  }
  postgres.transaction(trx => {
    trx.insert({hash: hash, email: email}).into('login').returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({email: loginEmail[0], name: name, joined: new Date()}).then(user => {
        //res.send(database.users[database.users.length - 1]);
        res.json(user[0])
      })
      .catch(err => res.status(400).json(err))
    })
    .then(trx.commit).catch(trx.rollback)
  })
  //.catch(err => res.status(400).json(err))
}
  module.exports = {
    HandleRegister: HandleRegister
  }
