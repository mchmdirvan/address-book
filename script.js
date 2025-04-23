let dataContacts = [
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
  dataContacts.forEach((contact) => {
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
  const nextId = dataContacts[dataContacts.length - 1].id + 1;
  const newContact = {
    id: nextId,
    fullName: fullName,
    age: age,
    phone: phone,
    email: email,
    location: location,
  };
  dataContacts.push(newContact);
  return newContact;
}

function searchContacts(keyword) {
  const foundContacts = dataContacts.filter((contact) =>
    contact.fullName.includes(keyword)
  );
  return foundContacts;
}

function deleteContact(id) {
  const updatedContacts = dataContacts.filter((contact) => contact.id !== id);
  dataContacts = updatedContacts;
}

function updateContact() {
  const updatedContacts = dataContacts.filter((contact) => contact.id !== id);
  dataContacts = updatedContacts;
}

displayContacts();
deleteContact(2);
displayContacts();
