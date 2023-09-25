import React from 'react';

import { Form } from './ContactForm/ContactForm';
import { ContactList } from './Contacts/Contacs';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { StyledSubTitle, StyledTitle, StyledWrapper } from './Styles/App.styled';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  componentDidMount() {
    const contactsArr = JSON.parse(window.localStorage.getItem('contacts'));
    if (contactsArr?.length) {
      this.setState({ contacts: contactsArr });
    }
  }


  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    const item = contacts.find(item => item.name.toLowerCase() === name.toLowerCase());

    if (item) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };
  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  handleContactDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    const filteredData = this.filterContacts();
    const deleteContact = this.handleContactDelete;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <StyledWrapper>
          <StyledTitle>PhoneBook</StyledTitle>
          <Form onAddContact={this.handleAddContact} />
          <StyledSubTitle>Contacts</StyledSubTitle>
          <Filter
            inputFilterData={this.handleChangeFilter}
            filterValue={filter}
          />
          <ContactList contacts={filteredData} onDelete={deleteContact} />
        </StyledWrapper>
      </div>
    );
  }
}