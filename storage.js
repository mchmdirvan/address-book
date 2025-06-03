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

function saveContacts(contacts) {
  try {
    localStorage.setItem("data-contacts", JSON.stringify(contacts));
    return true;
  } catch (error) {
    console.error("Failed to save contacts:", error);
    showFeedback("Error saving contacts. Please try again.", "error");
    return false;
  }
}

function loadContacts() {
  try {
    const contacts = localStorage.getItem("data-contacts");
    
    if (!contacts) {
      saveContacts(dataContacts);
      return dataContacts;
    }
    
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Failed to load contacts:", error);
    showFeedback("Error loading contacts. Using default data.", "error");
    return dataContacts;
  }
}

// Get contact by ID (reduces repeated find operations)
function getContactById(id) {
  const contacts = loadContacts();
  return contacts.find(contact => contact.id == id);
}
