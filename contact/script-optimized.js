// Cache DOM elements for better performance
const contactElements = {
  fullname: DOMCache.get("contact-fullname"),
  email: DOMCache.get("contact-email"),
  phone: DOMCache.get("contact-phone"),
  city: DOMCache.get("contact-city"),
  birthdate: DOMCache.get("contact-birthdate"),
  favoriteIcon: DOMCache.get("favorite-icon"),
  editBtn: DOMCache.get("edit-btn"),
  deleteBtn: DOMCache.get("delete-btn")
};

let currentContactId = null;

function displayContact() {
  const id = getURLParam("id");
  if (!id) {
    showFeedback("No contact ID provided", "error");
    window.location.href = "/";
    return;
  }

  currentContactId = parseInt(id);
  const contact = getContactById(currentContactId);
  
  if (!contact) {
    showFeedback("Contact not found", "error");
    window.location.href = "/";
    return;
  }

  // Populate contact details efficiently
  if (contactElements.fullname) contactElements.fullname.textContent = contact.fullname;
  if (contactElements.email) contactElements.email.textContent = contact.email;
  if (contactElements.phone) contactElements.phone.textContent = contact.phone;
  if (contactElements.city) contactElements.city.textContent = contact.city;
  if (contactElements.birthdate) contactElements.birthdate.textContent = formatDate(contact.birthdate);
  
  // Update favorite icon
  if (contactElements.favoriteIcon) {
    contactElements.favoriteIcon.innerHTML = contact.isFavorited 
      ? '⭐' // Filled star
      : '☆'; // Empty star
    contactElements.favoriteIcon.title = contact.isFavorited ? 'Remove from favorites' : 'Add to favorites';
  }

  // Update action buttons
  if (contactElements.editBtn) {
    contactElements.editBtn.href = `/edit/?id=${contact.id}`;
  }
  
  if (contactElements.deleteBtn) {
    contactElements.deleteBtn.onclick = () => deleteContact(contact.id);
  }
}

function toggleFavorite() {
  if (!currentContactId) return;
  
  const contacts = loadContacts();
  const updatedContacts = contacts.map(contact => 
    contact.id === currentContactId 
      ? { ...contact, isFavorited: !contact.isFavorited }
      : contact
  );

  if (saveContacts(updatedContacts)) {
    displayContact(); // Refresh display
    showFeedback(
      updatedContacts.find(c => c.id === currentContactId).isFavorited 
        ? 'Added to favorites!' 
        : 'Removed from favorites!'
    );
  }
}

function deleteContact(id) {
  if (!confirm('Are you sure you want to delete this contact?')) {
    return;
  }

  const contacts = loadContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== id);

  if (saveContacts(filteredContacts)) {
    showFeedback('Contact deleted successfully!');
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
}

// Initialize contact detail page
function initContactPage() {
  displayContact();
  
  // Add favorite toggle functionality
  if (contactElements.favoriteIcon) {
    contactElements.favoriteIcon.addEventListener('click', toggleFavorite);
    contactElements.favoriteIcon.style.cursor = 'pointer';
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initContactPage);
