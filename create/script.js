const contactFormElement = document.getElementById("contact-form");

function addContact(event) {
  event.preventDefault();
  const contacts = loadContacts();

  const contactFormData = new FormData(contactFormElement);

  const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;

  const newContact = {
    id: newId,
    fullname: contactFormData.get("fullname"),
    phone: contactFormData.get("phone"),
    email: contactFormData.get("email"),
    city: contactFormData.get("city"),
    birthdate: new Date(contactFormData.get("birthdate")),
    isFavorited: Boolean(contactFormData.get("isFavorited")),
  };

  const updateContacts = [...contacts, newContact];
  saveContacts(updateContacts);

  contactFormElement.reset();
  alert("Contact berhasil ditambahkan!");
}

contactFormElement.addEventListener("submit", addContact);
