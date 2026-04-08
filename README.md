# NexLearn Frontend Machine Test

## 🚀 Project Overview

This project is a frontend implementation of an exam platform based on the provided Figma design. It includes OTP-based authentication, user onboarding, and exam functionality.

---

## 🛠️ Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Fetch API (custom wrapper)
* Redux Toolkit

---

## 🔐 Authentication Flow

1. User enters mobile number
2. OTP sent via `/auth/send-otp`
3. OTP verified via `/auth/verify-otp`

   * Existing user → logged in
   * New user → redirected to create profile
4. Profile created via `/auth/create-profile`
5. Tokens stored in localStorage
6. Protected routes require JWT

---

## 🌐 API Configuration

Create a `.env.local` file in the root of the project and add:

```bash
NEXT_PUBLIC_API_URL=https://nexlearn.noviindusdemosites.in
```

---

## ✨ Features

* Pixel-perfect UI implementation from Figma
* Fully responsive design
* OTP-based authentication
* Profile creation with image upload
* Protected routes
* Exam module with timer
* Answer submission and result view
* Loading and error handling

---

## ⚡ Performance

* Optimized images using Next.js
* Clean component structure
* Minimal unnecessary re-renders

---

## ♿ Accessibility

* Semantic HTML
* Form labels
* Accessible interactions

---

## 🧪 Run Locally

```bash
git clone <your-repo-link>
cd <project-folder>
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📄 Submission

GitHub Repository: https://github.com/VishnuKV9933/NexLearn.git

---

## 👤 Author

Vishnu KV
