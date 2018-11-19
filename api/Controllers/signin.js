const HandleSignIn = (postgres, bcrypt) => (req,res) => {
    if(!req.body.email || !req.body.password){
      return res.status(400).json('incorrect form submission')
    }
    //console.log(req.body)
    // bcrypt.compare(res.body.password, hash, function(err, res) {
    //   // res == true
    // });
    // (req.body.email === database.users[0].email && req.body.password === database.users[0].password)
    //   ? res.json(database.users[0])
    //   : res.status(400).json('error logging in')
    postgres.select('email','hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
      if(isValid){
        console.log(req.body.email)
        return postgres.select('*').from('users')
        .where('email','=',req.body.email)
        .then(user => {
          res.json(user[0])
        })
        .catch(err => res.status(400).json('unable to get user'))
      } else{
        res.status(400).json('wrong credentials')
      }

    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
  HandleSignIn: HandleSignIn
}
