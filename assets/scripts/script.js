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
    saveContacts(dataContacts);
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

function displayContacts(contacts) {
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

  displayContacts(foundContacts);
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
  displayContacts(loadContacts());
}

function deleteContact(contacts, id) {
  const filteredContact = contacts.filter((contact) => {
    return contact.id !== id;
  });

  dataContacts = filteredContact;
  saveContacts(dataContacts);
  displayContacts(dataContacts);
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
  displayContacts(loadContacts());
}

function showContact(contacts, id) {
  const contact = contacts.find((contact) => {
    return contact.id === id;
  });

  displayContacts([contact]);
}

// ------------------------------------------------------------------
// PROGRAM
// ------------------------------------------------------------------

// saveContacts(dataContacts);
// displayContacts(loadContacts());

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

// ------------------------------------------------------------------
// DOM
// ------------------------------------------------------------------

function renderContacts() {
  contacts = loadContacts();

  const contactListElement = document.getElementById("contact-list");

  contactListElement.innerHTML = contacts
    .map((contact) => {
      return `
      <tr class="shadow-sm cursor-pointer">
        <td class="ps-20 py-2">${contact.fullname}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td class="flex gap-5 p-2">
          <button class="p-2 hover:bg-slate-200 rounded-full cursor-pointer">
          <svg class="max-w-4 max-h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        
          </button>
          <button class="p-2 hover:bg-slate-200 rounded-full cursor-pointer">
          <svg class="max-w-4 max-h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>
        </td>
      </tr>
    `;
    })
    .join("");
}

renderContacts();
