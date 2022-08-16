const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
//the middleware urlencoded puts the submitted form data(data entered in html body/form element,
//which is in pair key form as created in html form,eg name:Simon) in the req objected so it 
//can be accessed and used in the server app.The data in stored in the .body property of req objects
//the req.object holds are the form name values,made and initialized on the html form 
// extended:false helps in processing the data/strings passed in
app.use(express.urlencoded({ extended: false }))

// parse json -Below function puts the data submitted by JS code(not in form element) into the
//the server,so it can accessed in form of JSON data
app.use(express.json())

//This is an example of an http GET method (just display data),its the browsers default
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people }) //.json(people) -works the same
})

//This is an example of an http POST method(send/add data to the server)
app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
})

//This is an example of an http POST method(send/add data to the server)
//This route handles the data submitted in the form,hence its POST and must handled differently
app.post('/login', (req, res) => {
  console.log(req.body);//body holds form data&will display the key pair sent in form name:Simon
  const { name } = req.body //getting actual value that the form name attribute contains - entered by user
  console.log(name); //this will display the name entered by the user on the website
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please Provide Credentials')
})

app.put('/api/people/:id', (req, res) => { //put url example: localhost:5000/api/people/1
  const { id } = req.params //get the exact item to update,params gets the :id of item passed in url
  const { name } = req.body //get the actual data that will be the update
  console.log(id,name);
  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res.status(404).json({ success: false, msg: `no person with id ${id}` })
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })

  res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id', (req, res) => {
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

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
