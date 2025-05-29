let dataContacts = [
  {
    id: 1,
    fullname: "Adhitya Sofyan",
    phone: "+6281280807070",
    email: "adhitya@gmail.com",
    city: "Yogyakarta",
    birthdate: new Date("1977/11/06"),
    isFavorited: true,
  },
  {
    id: 2,
    fullname: "Raditya Dika",
    phone: "+6281234567890",
    email: "raditya@gmail.com",
    city: "Jakarta",
    birthdate: new Date("1984/12/28"),
    isFavorited: false,
  },
  {
    id: 3,
    fullname: "Aryo Sheggario",
    phone: "+6281987654321",
    email: "aryo@gmail.com",
    city: "Bandung",
    birthdate: new Date("1990/03/15"),
    isFavorited: true,
  },
];

// ------------------------------------------------------------------
// STORAGE
// ------------------------------------------------------------------

function saveContacts(contacts) {
  localStorage.setItem("data-contacts", JSON.stringify(contacts));
}

function loadContacts() {
  const contacts = localStorage.getItem("data-contacts");
  if (!contacts) {
    saveContacts([]);
  }
  try {
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Failed to load contacts", error);
  }
}

// ------------------------------------------------------------------
// FUNCTION
// ------------------------------------------------------------------

function renderContacts(contacts) {
  contacts.forEach((contact) => {
    const birthdate = new Date(contact.birthdate);
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
      timeZone: "Asia/Jakarta",
    }).format(birthdate);

    console.log(
      `
      🆔 : ${contact.id}
      👤 : ${contact.fullname}
      📞 : ${contact.phone}
      📧 : ${contact.email}
      🏙️ : ${contact.city}
      🎂 : ${formattedDate}
      🌟 : ${contact.isFavorited ? "✅" : "❌"}
      `
    );
  });
}

function searchContacts(contacts, keyword) {
  const foundContacts = contacts.filter((contact) => {
    return contact.fullname.toLowerCase().includes(keyword.toLowerCase());
  });

  renderContacts(foundContacts);
}

function addContact(contacts, contactData) {
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    fullname: contactData.fullname,
    phone: contactData.phone,
    email: contactData.email,
    city: contactData.city,
    birthdate: new Date(contactData.birthdate),
    isFavorited: contactData.isFavorited,
  };

  dataContacts = [...contacts, newContact];
  saveContacts(dataContacts);
  renderContacts(loadContacts());
}

function deleteContact(contacts, id) {
  const filteredContact = contacts.filter((contact) => {
    return contact.id !== id;
  });

  dataContacts = filteredContact;
  saveContacts(dataContacts);
  renderContacts(dataContacts);
}

function updateContact(contacts, id, contactData) {
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === id) {
      return {
        ...contact,
        ...contactData,
      };
    } else {
      return contact;
    }
  });

  dataContacts = updatedContacts;
  saveContacts(dataContacts);
  renderContacts(loadContacts());
}

function showContact(contacts, id) {
  const contact = contacts.find((contact) => {
    return contact.id === id;
  });

  renderContacts([contact]);
}

// ------------------------------------------------------------------
// PROGRAM
// ------------------------------------------------------------------

saveContacts(dataContacts);
// renderContacts(loadContacts());

// searchContacts(loadContacts(), "ad");

// addContact(loadContacts(), {
//   fullname: "Mochamad Irvan",
//   phone: +6281280907080,
//   email: "irvan@gmail.com",
//   city: "Jakarta",
//   birthdate: new Date("2000-10-10"),
//   isFavorited: true,
// });

// deleteContact(loadContacts(), 5);

// updateContact(loadContacts(), 1, {
//   fullname: "Mochamad Irvan",
//   phone: +6281280907080,
//   email: "irvan@gmail.com",
//   city: "Jakarta",
//   birthdate: new Date("2000-10-10"),
//   isFavorited: true,
// });

// showContact(loadContacts(), 1);
