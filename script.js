const contacts = [
  {
    id: 1,
    fullName: "Mochamad Irvan",
    age: 20,
    phone: "+62-881-0800-70700",
    email: "mchmdirvaan@gmail.com",
    location: "Jakarta",
  },
  {
    id: 2,
    fullName: "Irvan Mochamad",
    age: 10,
    phone: "+62-852-1955-7750",
    email: "irvaanmchmd@gmail.com",
    location: "Bandung",
  },
  {
    id: 3,
    fullName: "Prabowo Subianto",
    age: 70,
    phone: "+62-812-3456-7890",
    email: "prabowo@gmail.com",
    location: "Bogor",
  },
  {
    id: 4,
    fullName: "Gibran Rakabuming Raka",
    age: 40,
    phone: "+62-812-3333-4444",
    email: "gibran@gmail.com",
    location: "Solo",
  },
];

function displayContacts() {
  contacts.map((contact) => {
    console.log(
      `
      🆔${contact.id},
      🧑🏻${contact.fullName},
      🎂${contact.age} years old,
      📞${contact.phone},
      ✉️${contact.email},
      📍${contact.location}`
    );
  });
}

function addContact(fullName, age, phone, email, location) {
  const nextId = contacts[contacts.length - 1].id + 1;

  contacts.push({
    id: nextId,
    fullName: fullName,
    age: age,
    phone: phone,
    email: email,
    location: location,
  });

  displayContacts();
}

function searchContacts() {
  const contact = contacts.find((contact) => contact.id === 3);
  console.log(contact);
}

function deleteContact() {
  //TODO
}

function updateContact() {
  //TODO
}

addContact(
  "Adhitya Sofyan",
  40,
  "+62-888-0000-1111",
  "adhitya@gmail.com",
  "Yogyakarta"
);
addContact("Ariel Noah", 40, "+62-888-0000-1111", "ariel@gmail.com", "Jakarta");

// displayContacts();
searchContacts();
