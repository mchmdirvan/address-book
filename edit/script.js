const fullnameInputElement = document.getElementById("fullname");
const phoneInputElement = document.getElementById("phone");
const emailInputElement = document.getElementById("email");
const cityInputElement = document.getElementById("city");
const birthdateInputElement = document.getElementById("birthdate");
const isFavoritedElement = document.getElementById("isFavorited");

const contactFormElement = document.getElementById("contact-form");

function getID() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  return id;
}

function getContact() {
  const contacts = loadContacts();
  const id = getID();

  const setContact = contacts.find((contact) => {
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

  return setContact;
}

function updateContact(event) {
  event.preventDefault();
  const contacts = loadContacts();
  const id = getID();

  const contactFormData = new FormData(contactFormElement);

  const birthdate = new Date(contactFormData.get("birthdate"));
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeZone: "Asia/Jakarta",
  }).format(birthdate);

  const newContact = {
    id: id,
    fullname: contactFormData.get("fullname"),
    phone: contactFormData.get("phone"),
    email: contactFormData.get("email"),
    city: contactFormData.get("city"),
    birthdate: formattedDate,
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

getContact();
contactFormElement.addEventListener("submit", updateContact);
