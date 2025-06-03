// Cache form elements for better performance
const formElements = {
  form: DOMCache.get("contact-form"),
  fullname: DOMCache.get("fullname"),
  phone: DOMCache.get("phone"),
  email: DOMCache.get("email"),
  city: DOMCache.get("city"),
  birthdate: DOMCache.get("birthdate"),
  isFavorited: DOMCache.get("isFavorited")
};

let currentContactId = null;

function populateForm() {
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

  // Populate form fields efficiently
  formElements.fullname.value = contact.fullname;
  formElements.phone.value = contact.phone;
  formElements.email.value = contact.email;
  formElements.city.value = contact.city;
  formElements.birthdate.value = formatDateForInput(contact.birthdate);
  formElements.isFavorited.checked = Boolean(contact.isFavorited);
}

function updateContact(event) {
  event.preventDefault();
  
  // Show loading state
  formElements.form.classList.add('loading');
  
  try {
    const contacts = loadContacts();
    const contactFormData = new FormData(formElements.form);

    const updatedContact = {
      id: currentContactId,
      fullname: contactFormData.get("fullname"),
      phone: contactFormData.get("phone"),
      email: contactFormData.get("email"),
      city: contactFormData.get("city"),
      birthdate: formatDate(contactFormData.get("birthdate")),
      isFavorited: Boolean(contactFormData.get("isFavorited")),
    };

    // Validate contact data
    const errors = validateContact(updatedContact);
    if (errors.length > 0) {
      showFeedback(`Please fix the following errors:\n${errors.join('\n')}`, 'error');
      return;
    }

    // Update contacts array efficiently
    const updatedContacts = contacts.map((contact) => 
      contact.id === currentContactId ? { ...contact, ...updatedContact } : contact
    );

    if (saveContacts(updatedContacts)) {
      showFeedback("Contact updated successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    showFeedback('An error occurred while updating the contact', 'error');
  } finally {
    // Remove loading state
    formElements.form.classList.remove('loading');
  }
}

// Initialize form validation
function initForm() {
  if (formElements.form) {
    formElements.form.addEventListener("submit", updateContact);
    
    // Add real-time validation
    const inputs = formElements.form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
    });
  }
}

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();
  
  // Remove previous error styling
  field.classList.remove('border-red-500');
  
  // Basic validation
  if (field.hasAttribute('required') && !value) {
    field.classList.add('border-red-500');
    return false;
  }
  
  // Email validation
  if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
    field.classList.add('border-red-500');
    return false;
  }
  
  return true;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateForm();
  initForm();
});
