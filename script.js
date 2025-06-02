const contactListElement = document.getElementById("contact-list");
const searchInputElement = document.getElementById("search-input");
const sumContactElement = document.getElementById("sum-contacts");

// ------------------------------------------------------------------
// FUNCTION
// ------------------------------------------------------------------

function renderContacts() {
  const contacts = loadContacts();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const keyword = params.get("q");

  const contactToRender = keyword
    ? searchContacts(contacts, keyword)
    : contacts;

  sumContactElement.innerHTML = `<span>${contacts.length}</span>`;

  contactListElement.innerHTML = contactToRender
    .map((contact) => {
      return `
      <tr
        class="shadow-sm text-sm hover:bg-gray-100 transition-all duration-500"
      >
        <td class="ps-20 py-6">${contact.fullname}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td class="flex gap-5 justify-center p-3">
          <a
            href="/contact/?id=${contact.id}"
            class="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
          >
            <svg
              class="max-w-4 max-h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-eye-icon lucide-eye"
            >
              <path
                d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </a>

          <a
            href="/edit/?id=${contact.id}"
            class="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
          >
            <svg
              class="max-w-4 max-h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-pencil-icon lucide-pencil"
            >
              <path
                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
              />
              <path d="m15 5 4 4" />
            </svg>
          </a>

          <button
            onclick="deleteContact(${contact.id})"
            class="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
          >
            <svg
              class="max-w-4 max-h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trash-icon lucide-trash"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </td>
      </tr>
    `;
    })
    .join("");
}

function searchContacts(contacts, keyword) {
  searchInputElement.value = keyword;

  const foundContacts = contacts.filter((contact) => {
    return contact.fullname.toLowerCase().includes(keyword.toLowerCase());
  });

  return foundContacts;
}

function deleteContact(id) {
  const contacts = loadContacts();

  const filteredContact = contacts.filter((contact) => {
    return contact.id !== id;
  });

  saveContacts(filteredContact);
  renderContacts();
}

// ------------------------------------------------------------------
// PROGRAM
// ------------------------------------------------------------------

renderContacts();
