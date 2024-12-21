import personService from './services/persons.js';

const Persons = ({ persons, setPersons, setSuccessMessage, setErrorMessage }) => {
  const deletePerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      personService.delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));

          setSuccessMessage("Person deleted");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch(error => {
          console.error("Failed to delete person: ", error);
          setErrorMessage("Failed to delete person");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      {persons.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;