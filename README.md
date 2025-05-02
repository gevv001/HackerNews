# HackerNews

# 📰 Hacker News Clone

A lightweight Hacker News clone built with vanilla JavaScript, Node.js, and Express. Includes full user authentication, post commenting with nested replies, and client-side routing.

## ✨ Features

- 🔐 User Authentication (Register/Login/Logout)
- 👤 Profile Management (Update info, Change password)
- 💬 Comment System (Supports nested replies)
- 📰 News Categories: News, Ask, Show, Comments
- 📦 RESTful API built with Express
- 🧭 SPA-style navigation using `window.history` and `loadPage()`

---

## 📁 Project Structure

```bash
git clone https://github.com/gevv001/HackerNews.git
cd HackerNews
cd Back-end
npm install
node app.js

Open client/index.html with Live Server or any static file server.

or 
cd HackerNews/Front-end
npx http-server -p 5000 --spa

Create .env in HackerNews/Back-end
JWT_SECRET=your_jwt_secret
PORT=3000
DDB_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/<your-db-name>?retryWrites=true&w=majority

> ⚠️ Replace the values with your own MongoDB Atlas URI.


🔧 Technologies Used
Frontend: Vanilla JS, HTML, CSS

Backend: Node.js, Express.js, MongoDB (via Mongoose)

Auth: JWT + LocalStorage

Routing: Client-side router with pushState

✅ To Do / Improvements
✨ Post Upvoting

📱 Responsive Styling

🔎 Search Posts

🧪 Tests & Validation

