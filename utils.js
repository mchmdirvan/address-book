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
