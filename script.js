let dataContacts = [
  {
    id: 1,
    fullName: "Mochamad Irvan",
    age: 20,
    phone: "+62-881-0800-70700",
    email: "mchmdirvaan@gmail.com",
    city: "Jakarta",
  },
  {
    id: 2,
    fullName: "Prabowo Subianto",
    age: 70,
    phone: "+62-812-3456-7890",
    email: "prabowo@gmail.com",
    city: "Bogor",
  },
];

// ------------------------------------------------------------------
// FUNCTION
// ------------------------------------------------------------------

function displayContacts() {
  dataContacts.forEach((contact) => {
    console.log(
      `
      🆔 ${contact.id}
      🧑🏻 ${contact.fullName}
      🎂 ${contact.age} years old
      📞 ${contact.phone}
      ✉️ ${contact.email}
      📍 ${contact.city}`
    );
  });
}

function addContact(contactData) {
  const nextId = dataContacts[dataContacts.length - 1].id + 1;
  dataContacts.push({
    id: nextId,
    ...contactData,
  });
}

function searchContacts(keyword) {
  const foundContacts = dataContacts.filter((contact) =>
    contact.fullName.toLowerCase.includes(keyword.toLowerCase)
  );
  return foundContacts;
}

function deleteContact(id) {
  const updatedContacts = dataContacts.filter((contact) => contact.id !== id);
  dataContacts = updatedContacts;
}

function updateContact(id, newContact) {
  const updatedContacts = dataContacts.map((contact) => {
    if (contact.id === id) {
      return {
        ...contact,
        ...newContact,
      };
    } else {
      return contact;
    }
  });
  dataContacts = updatedContacts;
}

function renderContacts() {
  const contactsListElement = document.getElementById("contacts-list");

  contactsListElement.innerHTML = dataContacts
    .map((contact) => {
      return `
      <li>
        <h2>${contact.fullName}</h2>
        <p>${contact.email}</p>
        <p>${contact.phone}</p>
        <p>${contact.age}</p>
        <p>${contact.city}</p>
      </li>
      `;
    })
    .join("");
}

const contactFormElement = document.getElementById("contact-form");

contactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactFormElement);

  const newContactFormData = {
    fullName: String(formData.get("fullName")),
    age: Number(formData.get("age")),
    email: String(formData.get("email")),
    phone: String(formData.get("phone")),
    address: String(formData.get("address")),
  };

  addContact(newContactFormData);

  renderContacts();
});

// ------------------------------------------------------------------
// PROGRAM
// ------------------------------------------------------------------

renderContacts();
