// Cache DOM elements for better performance
const contactListElement = DOMCache.get("contact-list");
const searchInputElement = DOMCache.get("search-input");
const sumContactElement = DOMCache.get("sum-contacts");

// Debounced search for better performance
const debouncedSearch = debounce(() => {
  const keyword = searchInputElement.value.trim();
  if (keyword !== getURLParam("q")) {
    const url = new URL(window.location);
    if (keyword) {
      url.searchParams.set("q", keyword);
    } else {
      url.searchParams.delete("q");
    }
    window.history.pushState({}, "", url);
    renderContacts();
  }
}, 300);

// ------------------------------------------------------------------
// OPTIMIZED FUNCTIONS
// ------------------------------------------------------------------

function renderContacts() {
  return Performance.measure(() => {
    const contacts = loadContacts();
    const keyword = getURLParam("q");
    
    const contactToRender = keyword
      ? searchContacts(contacts, keyword)
      : contacts;

    // Update search input if keyword exists
    if (keyword && searchInputElement) {
      searchInputElement.value = keyword;
    }

    // Update contact count
    sumContactElement.textContent = contacts.length;

    // Optimized rendering with fragment
    const fragment = document.createDocumentFragment();
    
    contactToRender.forEach(contact => {
      const row = document.createElement('tr');
      row.className = 'table-row';
      row.innerHTML = `
        <td class="ps-20 py-6">${contact.fullname}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td class="flex gap-3 justify-center p-3">
          ${createActionButton(`/contact/?id=${contact.id}`, 'eye')}
          ${createActionButton(`/edit/?id=${contact.id}`, 'pencil')}
          ${createActionButton(null, 'trash', `deleteContact(${contact.id})`)}
        </td>
      `;
      fragment.appendChild(row);
    });

    // Single DOM update instead of innerHTML
    contactListElement.innerHTML = '';
    contactListElement.appendChild(fragment);
  }, 'renderContacts');
}

function deleteContact(id) {
  if (!confirm('Are you sure you want to delete this contact?')) {
    return;
  }

  const contacts = loadContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== id);

  if (saveContacts(filteredContacts)) {
    showFeedback('Contact deleted successfully!');
    renderContacts();
  }
}

// Initialize search functionality
function initSearch() {
  if (searchInputElement) {
    searchInputElement.addEventListener('input', debouncedSearch);
    
    // Handle form submission to prevent page reload
    const searchForm = searchInputElement.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        debouncedSearch();
      });
    }
  }
}

// ------------------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  renderContacts();
  initSearch();
});
