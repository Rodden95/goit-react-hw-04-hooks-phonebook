import { useState, useEffect } from "react";
import './App.scss';
import Phonebook from "./components/Phonebook";

function App() {

  const [contacts, addContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [updateLocal, setUpdateLocal] = useState(false);

  const contactAdd = ({ name, number, id }) => {
    const newContact = { id, name, number };
    let findResult = contacts.find(e => e.name === name);
    typeof findResult !== 'object' ?
      addContacts(state => ([...state, newContact])) : alert('this name is present in');
    setUpdateLocal(true);
  }

  const contactsFilter = () =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter));
  
  const filterInputValueToState = data =>
    setFilter(data.target.value.toLowerCase());
  
  useEffect(() => {
    if (updateLocal) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
      setUpdateLocal(false)
      return;
    }
  }, [contacts, updateLocal])
  
  const contactDelete = currentId => {
    addContacts(contacts.filter(({ name }) =>
      name !== currentId));
    setUpdateLocal(true)
  }

  useEffect(() => addContacts(JSON.parse(localStorage.getItem('contacts'))), []);
    
  return (
    <div>
      <Phonebook
        onSubmitFunc={contactAdd}
        contacts={contactsFilter()}
        filter={filterInputValueToState}
        deleteContact={contactDelete}
      />
    </div>
  )
}

export default App;
