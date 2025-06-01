// ------------------------------------------------------------------
// STORAGE
// ------------------------------------------------------------------

function saveContacts(contacts) {
  localStorage.setItem("data-contacts", JSON.stringify(contacts));
  renderContacts();
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
