const express = require('express');

//this is the express router app,that will take care of the server app routing process
const router = express.Router();

let { people } = require('../data')

//The base route of the all the people routes below is /api/people,after this base,then other
//routes are extended from it

//Instead of using ('/api/people') in the router.get() or router.post() as the beginning of the
//route,we replace ('/api/people') with just (/) because this router url path has been already
//defined in the importing file(app - the server app) --app.use('/api/people', people).
//Its the base router url,its already fined,hence only extension after the base url will need
//to be AudioDestinationNode,eg router.post('/postman'), in this people.js file

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people })
})
  
router.post('/', (req, res) => {
    const { name } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, person: name })
  })
  
router.post('/postman', (req, res) => {
    const { name } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] })
  })
  
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
  
    const person = people.find((person) => person.id === Number(id))
  
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.map((person) => {
      if (person.id === Number(id)) {
        person.name = name
      }
      return person
    })
    res.status(200).json({ success: true, data: newPeople })
})
  
router.delete('/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(
      (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
})
  
module.exports = router