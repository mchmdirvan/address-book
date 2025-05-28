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

function renderContacts(contacts) {
  contacts.forEach((contact) => {
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
      timeZone: "Asia/Jakarta",
    }).format(contact.birthdate);

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

function addContact(contact, contactData) {
  const newContact = {
    id: contact[contact.length - 1].id + 1,
    fullname: contactData.fullname,
    phone: contactData.phone,
    email: contactData.email,
    city: contactData.city,
    birthdate: new Date(contactData.birthdate),
    isFavorited: contactData.isFavorited,
  };

  const newContacts = [...contact, newContact];
  renderContacts(newContacts);
}

function deleteContact(contacts, id) {
  const filteredContacts = contacts.filter((contact) => {
    return contact.id !== id; //when use {} it's need to use return
  });

  dataContacts = filteredContacts;
  renderContacts(dataContacts);
}

// renderContacts(dataContacts);
// searchContacts(dataContacts, "ad");

// addContact(dataContacts, {
//   fullname: "Mochamad Irvan",
//   phone: +6281280907080,
//   email: "irvan@gmail.com",
//   city: "Jakarta",
//   birthdate: new Date("2000-10-10"),
//   isFavorited: true,
// });

deleteContact(dataContacts, 1);
