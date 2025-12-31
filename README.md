# YelpCamp 

YelpCamp is a **full-stack web application** that allows users to discover, create, and review campgrounds.  
The project demonstrates end-to-end web development using **Node.js, Express, MongoDB**, and server-side rendering.

This application was built as part of my **full-stack learning journey**, with a focus on understanding backend architecture, authentication, authorization, and RESTful design.

---

## Features

- User authentication (register / login / logout)
- Authorization for campground and review ownership
- Create, edit, and delete campgrounds
- Add and manage reviews for campgrounds
- Image upload and storage
- Interactive maps and geocoding
- Flash messages for user feedback
- Secure routes and protected actions

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap
- EJS (templating engine)

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB
- Mongoose

### Authentication & Security
- Passport.js
- Sessions & Cookies
- Password hashing
- Basic security best practices

### Other Tools
- Cloud image storage
- Maps & geocoding services
- Git & GitHub

---

##  Project Structure
```txt
YELPCAMP/
├── cloudinary/
│   └── index.js
├── controllers/
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── models/
│   ├── campground.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── public/
│   ├── javascripts/
│   │   ├── clusterMap.js
│   │   ├── showPageMap.js
│   │   └── validateForms.js
│   └── stylesheets/
│       ├── home.css
│       └── stars.css
├── views/
│   ├── campgrounds/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── partials/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── home.ejs
│   └── error.ejs
├── seeds/
│   ├── cities.js
│   ├── seedHelpers.js
│   └── index.js
├── uploads/
│   └── (uploaded images)
├── utils/
│   ├── catchAsync.js
│   ├── ExpressErrors.js
│   └── mongoSanitizeV5.js
├── .env
├── .gitignore
├── app.js
├── middleware.js
├── schemas.js
├── package.json
└── package-lock.json
```
The project follows an MVC-based architecture with clear separation of concerns for scalability and maintainability.

---

## What I Learned

- Building a complete full-stack application from scratch
- Structuring backend code using MVC principles
- Implementing authentication and authorization
- Working with MongoDB data models and relationships
- Handling user input, validation, and errors
- Writing cleaner, more maintainable server-side code

---

## Notes

- This project does **not use React** and focuses on server-side rendering
- Code quality and structure reflect progressive learning
- The goal was understanding fundamentals over shortcuts

---

## Acknowledgements

This project was inspired by the **YelpCamp project from Colt Steele’s Web Developer Bootcamp**, with personal implementation and modifications as part of my learning process.

---

## Status

Actively improving and refactoring as I continue learning.
