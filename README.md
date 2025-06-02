# Bookmate

![header](assets/images/header.png)

> 📇 **Bookmate** - A simple contact management application

Bookmate is an application designed to store and manage contact information for important individuals in your network. It serves as a digital address book, allowing you to maintain essential communication details for professional and personal connections.

## Links

- 🌍 URL: [https://booxmate.vercel.app/](https://booxmate.vercel.app/)
- 📦 Repository: <https://github.com/mchmdirvan/bookmate>

## Features

- ➕ Create Contact
- 📖 Read Contact
- ✏️ Update Contact
- 🗑️ Delete Contact
- 👤 Show Contact Details
- 🔍 Search Contacts

## Tech Stack

- HTML
- Javascript
- Tailwind CSS

## Flowchart

```mermaid
flowchart TD
    A[Start Application] --> B{Check Local Storage}
    B -->|Exists| C[Load Contacts from Local Storage]
    B -->|Empty/Not Exists| D[Initialize Default Data]
    D --> E[Save Initial Data to Local Storage]
    E --> F[Display Contacts List]
    C --> F

    F --> G{User Action}

    G -->|Create New| H[Show Create Form]
    H --> I[Fill Contact Details]
    I --> J[Add to Contacts Array]
    J --> K[Save to Local Storage]
    K --> F

    G -->|Edit Contact| L[Show Edit Form with Data]
    L --> M[Modify Contact Details]
    M --> N[Update Contacts Array]
    N --> K[Save to Local Storage]
    K --> F

    G -->|Delete Contact| P[Remove from Contacts Array]
    P --> K[Save to Local Storage]
    K --> F

    G -->|Search| R[Filter Contacts Display]
    R --> F

    G -->|View Contact| S[Show Contact Details]
    S --> F
```

## References

![header](assets/images/references.png)
