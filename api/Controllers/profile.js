const profileHandler = (req, res, postgres) => {
  const {userId} = req.params;

  postgres.select('*').from('users').where('id',userId)
  .then(user => {

      (user.length>0) ? res.json(user) : res.status(404).send('user not found');
  })
  .catch(err => res.status(404).send(err));


  //console.log(userId);
  //const data = findUser(userId);
  //console.log('route', data);
  // (data !== null)
  //   ? res.json(data)
  //   : res.status(404).send('user not found');
}

module.exports = {
  profileHandler: profileHandler
}
