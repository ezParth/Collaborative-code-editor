# 🧠 Collaborative Code Editor

A real-time collaborative code editor built with **React**, **Monaco Editor**, **Socket.IO**, and **Tailwind CSS**. It supports multiple programming languages, live code sharing, and an interactive file system sidebar.

---

## 🚀 Features

- ⚡ Real-time collaboration via **Socket.IO**
- 🧠 Monaco Editor integration with syntax highlighting
- 🌙 Toggle between **light** and **dark** themes
- 🌐 Multi-language support: JavaScript, Python, C++, Go, HTML, CSS, PHP, Ruby
- 📁 Sidebar with file system navigation
- ✍️ Dynamic cursor tracking and code updates
- 🔁 Synchronize code changes across connected users

---

## 📸 Preview

![Preview](preview.png) <!-- Optional: Add a screenshot of your app -->

---

## 🧰 Tech Stack

| Frontend | Backend      | Real-Time |
|----------|--------------|-----------|
| React    | Node.js      | Socket.IO |
| Monaco   | Express (opt)|           |
| Tailwind |              |           |

---

## 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/collaborative-editor.git
cd collaborative-editor
cd server
npm run dev
// open another terminal
cd client
npm run dev
