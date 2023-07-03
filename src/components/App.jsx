import { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useLocalStorage } from './Hook/localStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('newContacts', []);
  const [filter, setFilter] = useState('');

  const handleAddContact = ({ name, number }) => {
    const findName = contacts.find(
      elem => elem.name.toLowerCase() === name.toLowerCase()
    );
    if (findName) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts([
      ...contacts,
      {
        id: crypto.randomUUID(),
        name,
        number,
      },
    ]);
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredData = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  const filteredData = getFilteredData();
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm
        // handleChange={this.handleChange}
        handleAddContact={handleAddContact}
      />
      <h2 className={css.title}>Contacts</h2>
      <Filter onFilter={handleChangeFilter} filterValue={filter} />
      <ContactList contacts={filteredData} onDelete={handleDelete} />
    </div>
  );
};
