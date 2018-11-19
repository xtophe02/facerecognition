const Clarifai = require('clarifai');

//const app = process.env.CLARIFAIAPI || require('./api.js');
const apiKey = process.env.CLARIFAIAPI || require('./api.js');
const app = new Clarifai.App({
  apiKey: apiKey
});

const HandlerAPI = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err))
}


const imageHandler = (req, res, postgres) => {

  //console.log(req.body.id)
  //const data = findUser(req.body.id);
  //data.entries++;
  //console.log(data);
  const {
    id
  } = req.body;
  postgres('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      //console.log(entries);
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))


}

module.exports = {
  imageHandler: imageHandler,
  HandlerAPI: HandlerAPI
}