// Cache form elements for better performance
const formElements = {
  form: DOMCache.get("contact-form"),
  get fullname() { return DOMCache.get("fullname"); },
  get phone() { return DOMCache.get("phone"); },
  get email() { return DOMCache.get("email"); },
  get city() { return DOMCache.get("city"); },
  get birthdate() { return DOMCache.get("birthdate"); },
  get isFavorited() { return DOMCache.get("isFavorited"); }
};

function addContact(event) {
  event.preventDefault();
  
  // Show loading state
  formElements.form.classList.add('loading');
  
  try {
    const contactFormData = new FormData(formElements.form);
    const contacts = loadContacts();

    // Create new contact object with improved ID generation
    const newContact = {
      id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
      fullname: contactFormData.get("fullname"),
      phone: contactFormData.get("phone"),
      email: contactFormData.get("email"),
      city: contactFormData.get("city"),
      birthdate: formatDate(contactFormData.get("birthdate")),
      isFavorited: Boolean(contactFormData.get("isFavorited")),
    };

    // Validate contact data
    const errors = validateContact(newContact);
    if (errors.length > 0) {
      showFeedback(`Please fix the following errors:\n${errors.join('\n')}`, 'error');
      return;
    }

    // Save contact
    const updatedContacts = [...contacts, newContact];
    if (saveContacts(updatedContacts)) {
      formElements.form.reset();
      showFeedback("Contact successfully added!");
      
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  } catch (error) {
    console.error('Error adding contact:', error);
    showFeedback('An error occurred while adding the contact', 'error');
  } finally {
    // Remove loading state
    formElements.form.classList.remove('loading');
  }
}

// Initialize form with better error handling
function initForm() {
  if (formElements.form) {
    formElements.form.addEventListener("submit", addContact);
    
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initForm);
