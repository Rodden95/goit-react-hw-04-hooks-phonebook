import { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Contacts from "../Contacts";
import Filter from "../Filter";
import shortid from "shortid";

export default function Phonebook({onSubmitFunc, contacts, filter, deleteContact}) {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');

  const onSubmitInputHander = event => {
    event.preventDefault();
    setId(shortid.generate());
    onSubmitFunc({ name, number, id });
  };
  
  const inputValueHandler = ({target:{name, value}}) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <Form >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Contact name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={inputValueHandler}
          />
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={inputValueHandler}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={onSubmitInputHander}>Submit</Button>
      </Form>
      <Filter filter={filter} />
      {
        contacts.length === 0 ? <h2>List clear</h2> :
          <Contacts contacts={contacts} deleteContact={deleteContact} />
      }
    </div>
  )
}

PropTypes.Phonebook = {
  onSubmitFunc: PropTypes.func,
  contacts: PropTypes.array,
  filter: PropTypes.func,
  deleteContact: PropTypes.func,
};