export function getParams() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const keyword = params.get("q");

  return keyword;
}

export function getID() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  return id;
}

export function generateID(contacts) {
  const newID = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
  return newID;
}

export function formattedDate(contactFormData) {
  const birthdate = new Date(contactFormData.get("birthdate"));
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "Asia/Jakarta",
  }).format(birthdate);

  return formattedDate;
}
