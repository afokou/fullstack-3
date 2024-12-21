const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://afokou:${password}@fullstack-3.mnlqp.mongodb.net/?retryWrites=true&w=majority&appName=fullstack-3`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String // String in case it starts with 0
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length <= 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log('added ' + process.argv[3] + ' number ' + process.argv[4] + ' to phonebook')
    mongoose.connection.close()
  })
}