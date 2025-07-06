This project is a simple marketplace application built with **Node.js**, **Express**, **MongoDB**, and **Materialize CSS**.  
Users can create offers to sell items with a title, description, price, and optionally upload an image. All offers are stored in MongoDB and displayed on the frontend.

---

## Features

- Create new offers with title, description, price, and optional image upload.
- Images are stored on the server filesystem and linked to offers in MongoDB.
- View all existing offers with images displayed.
- Responsive and styled UI using Materialize CSS.
- RESTful API endpoints for uploading and retrieving offers.

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer
- **Frontend:** HTML, JavaScript, Materialize CSS
- **Others:** UUID for unique image filenames

---

## Installation

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
Install dependencies:


npm install
Make sure MongoDB is running on mongodb://127.0.0.1:27017/testdb.

Start the server:

npm start
Open your browser at http://localhost:3000 to access the app.

API Endpoints
POST /upload — Upload a new offer with optional image.

GET /offers — Retrieve all offers with image links.


Notes
The application uses Multer to handle image uploads.

Unique filenames are generated using UUID to avoid collisions.

Images are served statically from /images URL path.

The frontend dynamically loads offers on page load and after submitting a new offer.