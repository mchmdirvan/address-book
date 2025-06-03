// Shared utility functions for Bookmate application

// DOM helper functions for better performance
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Cached DOM elements to avoid repeated queries
const DOMCache = {
  elements: {},
  get(id) {
    if (!this.elements[id]) {
      this.elements[id] = document.getElementById(id);
    }
    return this.elements[id];
  },
  clear() {
    this.elements = {};
  }
};

// URL parameter helper
function getURLParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Date formatting helpers
function formatDate(date, locale = 'id-ID') {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(date));
}

function formatDateForInput(date) {
  return new Date(date).toISOString().split('T')[0];
}

// SVG icon templates (much smaller than hardcoded SVGs)
const ICONS = {
  eye: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`,
  
  pencil: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
    <path d="m15 5 4 4"/>
  </svg>`,
  
  trash: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>`
};

// Optimized action button creator
function createActionButton(href, icon, onclick = null) {
  const isLink = href && !onclick;
  const element = isLink ? 'a' : 'button';
  const hrefAttr = isLink ? `href="${href}"` : '';
  const onclickAttr = onclick ? `onclick="${onclick}"` : '';
  
  return `<${element} ${hrefAttr} ${onclickAttr} class="action-btn">
    ${ICONS[icon]}
  </${element}>`;
}

// Contact validation with better performance
function validateContact(contact) {
  const errors = [];
  const emailRegex = /\S+@\S+\.\S+/;
  
  if (!contact.fullname?.trim()) errors.push('Full name is required');
  if (!contact.email?.trim()) errors.push('Email is required');
  if (!contact.phone?.trim()) errors.push('Phone is required');
  if (contact.email && !emailRegex.test(contact.email)) {
    errors.push('Invalid email format');
  }
  
  return errors;
}

// Optimized feedback system
function showFeedback(message, type = 'success') {
  // Create a toast notification instead of alert for better UX
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 transform transition-all duration-300 ${
    type === 'error' ? 'bg-red-500' : 'bg-green-500'
  }`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('translate-x-0'), 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Debounce function for search optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance monitoring
const Performance = {
  measure(fn, name) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  }
};

// Enhanced search function
function searchContacts(contacts, keyword) {
  if (!keyword) return contacts;
  
  const searchTerm = keyword.toLowerCase();
  return contacts.filter(contact => 
    contact.fullname.toLowerCase().includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm) ||
    contact.phone.includes(searchTerm) ||
    contact.city.toLowerCase().includes(searchTerm)
  );
}

function getParams() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const keyword = params.get("q");

  return keyword;
}

function getID() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  return id;
}

function generateID(contacts) {
  newID = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
  return newID;
}

function formattedDate(contactFormData) {
  const birthdate = new Date(contactFormData.get("birthdate"));
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeZone: "Asia/Jakarta",
  }).format(birthdate);

  return formattedDate;
}
