const express = require('express');

//this is the express router app,that will take care of the server app routing process
const router = express.Router();

const { 
   getPeople,
   createPerson, 
   createPersonPostman, 
   updatePerson, 
   deletePerson 
} = require("../controllers/people")

//let { people } = require('../data')

//The base route of the all the people routes below is /api/people,after this base,then other
//routes are extended from it

//Instead of using ('/api/people') in the router.get() or router.post() as the beginning of the
//route,we replace ('/api/people') with just (/) because this router url path has been already
//defined in the importing file(app - the server app) --app.use('/api/people', people).
//Its the base router url,its already fined,hence only extension after the base url will need
//to be AudioDestinationNode,eg router.post('/postman'), in this people.js file

router.get('/',getPeople);
router.post('/',createPerson);
router.post('/postman',createPersonPostman);
router.put('/:id',updatePerson);
router.delete('/:id',deletePerson);
  
//Second way of using routes
// router.route('/').get(getPeople).post(createPerson);
// router.route('/postman').post(createPersonPostman);
// router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router