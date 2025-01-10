import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { selectFilteredContacts } from "./redux/contactsSlice";
import { fetchContacts, addContact, deleteContact } from "./redux/contactsOps";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const filter = useSelector((state) => state.filters.name);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  // Fetch contacts from backend on app load
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addNewContact = (newContact) => {
    if (
      contacts.some(
        (contact) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const removeContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (e) => {
    dispatch({ type: "filters/setFilter", payload: e.target.value });
  };

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactForm onAddContact={addNewContact} />
      <SearchBox filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={contacts} onDeleteContact={removeContact} />
    </div>
  );
};

export default App;
