# 📧 MailMind – Smart Email Categorization Service

MailMind is a full-stack web application that demonstrates **AI-powered email categorization** with real-time user feedback and accuracy analytics.
It simulates a smart inbox where emails are automatically classified into categories and improved through user corrections.

---

## 🚀 Live Demo

* **Frontend (Vercel):**
  👉 [https://mail-mind-rust.vercel.app](https://mail-mind-rust.vercel.app)

* **Backend API (Render):**
  👉 [https://mailmind-ezlf.onrender.com](https://mailmind-ezlf.onrender.com)

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Gemini API / Fallback Rule-based Classifier

### Deployment

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**

---

## ✨ Features

* 📥 Inbox view with categorized emails
* 🧠 AI-based email classification
* ✍️ User correction of email category
* 📊 Real-time analytics dashboard
* 🎯 Accuracy calculation (Correct vs Incorrect predictions)
* 🔍 Search and filter emails by category
* 🌐 Fully deployed full-stack application

---

## 🧩 Application Workflow

1. Emails are fetched from MongoDB
2. AI predicts category (Work, Personal, Promotions, Spam)
3. User can:

   * Confirm AI prediction
   * Correct the category
4. Corrections update:

   * Database
   * Accuracy metrics
5. Analytics dashboard reflects live performance

---

## 📁 Project Structure

```
MailMind/
│
├── backend/
│   ├── src/
│   │   ├── config/        # MongoDB connection
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── services/      # Seeding & AI logic
│   │   └── server.js      # Express entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # UI components
│   │   ├── pages/         # Inbox, EmailDetail, Analytics
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Emails

* `GET /api/emails` – Fetch all emails
* `GET /api/emails/:id` – Fetch single email
* `PATCH /api/emails/:id/category` – Update user category

### Analytics

* `GET /api/analytics` – Fetch accuracy metrics

---

## 📊 Analytics Logic

Accuracy is calculated as:

```
accuracy = (correct_predictions / total_emails) * 100
```

Only emails where the user has reviewed the category are counted toward accuracy.

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_api_key
```

These variables are configured directly in **Render Dashboard** for production.

---

## 🧪 Demo Data

The project uses **seeded emails** for demonstration purposes.

> Seeding is executed **once** during setup and disabled afterward to preserve user interactions.

---

## 🚧 Known Limitations

* Real email fetching via IMAP/Nodemailer is not enabled (simulated inbox)
* AI API may fall back to rule-based classification due to quota limits
* Authentication is not implemented (demo-focused)

---

## 🎯 Future Improvements

* Real email inbox integration (IMAP)
* User authentication & multi-user support
* Model fine-tuning based on feedback
* Admin dashboard
* Email reply & archive actions

---

## 🧑‍💻 Author

**MailMind**
Built as a full-stack demonstration project for smart email categorization using AI.

---

## ✅ Project Status

✔ Frontend complete
✔ Backend complete
✔ MongoDB integrated
✔ Analytics working
✔ Fully deployed
✔ Ready for submission

