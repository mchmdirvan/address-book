import { loadContacts, saveContacts } from "/storage.js";
import { getID } from "/utils.js";

const showContactElement = document.getElementById("show-contact");

const contacts = loadContacts();
const id = getID();

function showContact() {
  const findContact = contacts.find((contact) => {
    return contact.id == id;
  });

  showContactElement.innerHTML = `
    <div class="flex justify-between">
      <h2 class="text-xl font-semibold">${findContact.fullname}</h2>

      <div class="flex">
        <a
          href="/edit/?id=${findContact.id}"
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

        <button onclick="deleteContact()" class="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
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
      </div>
    </div>

    <div class="border border-gray-300"></div>

    <div class="mt-2">
      <p>📞 : ${findContact.phone}</p>
      <p>📧 : ${findContact.email}</p>
      <p>🏙️ : ${findContact.city}</p>
      <p>🎂 : ${findContact.birthdate}</p>
      <p>🌟 : ${findContact.isFavorited ? "✅" : "❌"}</p>
    </div>
  `;
}

function deleteContact() {
  const filteredContact = contacts.filter((contact) => {
    return contact.id != id;
  });

  saveContacts(filteredContact);
  window.location.href = "/";
}

window.deleteContact = deleteContact;
showContact();
