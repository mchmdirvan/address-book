import { loadContacts, saveContacts } from "/storage.js";
import { formattedDate, generateID } from "/utils.js";

const contactFormElement = document.getElementById("contact-form");

function addContact(event) {
  event.preventDefault();
  const contacts = loadContacts();

  const contactFormData = new FormData(contactFormElement);
  const newDate = formattedDate(contactFormData);
  const newId = generateID(contacts);

  const newContact = {
    id: newId,
    fullname: contactFormData.get("fullname"),
    phone: contactFormData.get("phone"),
    email: contactFormData.get("email"),
    city: contactFormData.get("city"),
    birthdate: newDate,
    isFavorited: Boolean(contactFormData.get("isFavorited")),
  };

  const updateContacts = [...contacts, newContact];
  saveContacts(updateContacts);

  contactFormElement.reset();
  window.location.href = "/";
}

contactFormElement.addEventListener("submit", addContact);
