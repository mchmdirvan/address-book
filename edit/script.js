import { loadContacts, saveContacts } from "/storage.js";
import { getID, formattedDate } from "/utils.js";

const birthdateInputElement = document.getElementById("birthdate");
const isFavoritedElement = document.getElementById("isFavorited");
const fullnameInputElement = document.getElementById("fullname");
const phoneInputElement = document.getElementById("phone");
const emailInputElement = document.getElementById("email");
const cityInputElement = document.getElementById("city");

const contactFormElement = document.getElementById("contact-form");

const contacts = loadContacts();
const id = getID();

contacts.find((contact) => {
  if (id == contact.id) {
    fullnameInputElement.value = contact.fullname;
    phoneInputElement.value = contact.phone;
    emailInputElement.value = contact.email;
    cityInputElement.value = contact.city;
    birthdateInputElement.value = new Date(contact.birthdate)
      .toISOString()
      .split("T")[0];
    isFavoritedElement.checked = Boolean(contact.isFavorited);
  }
});

function updateContact(event) {
  event.preventDefault();

  const contactFormData = new FormData(contactFormElement);
  const newDate = formattedDate(contactFormData);

  const newContact = {
    id: Number(id),
    fullname: contactFormData.get("fullname"),
    phone: contactFormData.get("phone"),
    email: contactFormData.get("email"),
    city: contactFormData.get("city"),
    birthdate: newDate,
    isFavorited: Boolean(contactFormData.get("isFavorited")),
  };

  const updatedContacts = contacts.map((contact) => {
    if (contact.id == id) {
      return {
        ...contact,
        ...newContact,
      };
    } else {
      return contact;
    }
  });

  saveContacts(updatedContacts);
  window.location.href = "/";
}

contactFormElement.addEventListener("submit", updateContact);
