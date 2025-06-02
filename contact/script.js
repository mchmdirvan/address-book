function showContact() {
  const contacts = loadContacts();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const findContact = contacts.find((contact) => {
    return contact.id == id;
  });
}

showContact();
