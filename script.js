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

function addContact() {
  const nextId = contacts[contacts.length - 1].id + 1;

  contacts.push({
    id: nextId,
    fullName: "Adhitya Sofyan",
    age: 40,
    phone: "+62812-8888-0000",
    email: "adhitya@gmail.com",
    location: "Yogyakarta",
  });
}

addContact();
displayContacts();
