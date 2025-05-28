const dataContacts = [
  {
    id: 1,
    fullname: "Adhitya Sofyan",
    phone: "+6281280807070",
    email: "adhitya@gmail.com",
    city: "Yogyakarta",
    birthdate: new Date("1977/11/06"),
  },
  {
    id: 2,
    fullname: "Raditya Dika",
    phone: "+6281234567890",
    email: "raditya@gmail.com",
    city: "Jakarta",
    birthdate: new Date("1984/12/28"),
  },
  {
    id: 3,
    fullname: "Aryo Sheggario",
    phone: "+6281987654321",
    email: "aryo@gmail.com",
    city: "Bandung",
    birthdate: new Date("1990/03/15"),
  },
];

function renderContact() {
  dataContacts.forEach((contact) => {
    console.log(
      `
      🆔 : ${contact.id}
      👤 : ${contact.fullname}
      📞 : ${contact.phone}
      📧 : ${contact.email}
      🏙️ : ${contact.city}
      🎂 : ${contact.birthdate.toString()}
      `
    );
  });
}

renderContact();
