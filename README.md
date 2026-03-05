# 🚀 AppWeb-Chat: High-Performance Full-Stack Messenger

**AppWeb-Chat** is a sophisticated, real-time messaging platform inspired by the seamless experience of Telegram. Built with a robust **ASP.NET Core** backend and a highly responsive **React** frontend, it demonstrates the power of modern web technologies in handling real-time data at scale.

## 🔗 Live Demo

Experience the app live here: [AppWeb-Chat Demo](https://appweb-chat-clwz.vercel.app/#/Chat)

---

## 🌟 Key Features

* **Real-Time Communication:** Instant message delivery and "typing..." indicators powered by **SignalR** WebSockets.
* **Secure Authentication:** Industrial-grade security using **JWT (JSON Web Tokens)** for stateless and secure user sessions.
* **Dynamic Group Management:** Support for one-to-one and group chats with complex many-to-many relationship handling.
* **Message Lifecycle (CRUD):** Full support for sending, editing, and deleting messages with real-time UI synchronization.
* **Rich UI/UX:** A clean, modern, and Telegram-inspired interface built for speed and responsiveness.

---

## 🛠 Tech Stack

### **Backend (The Core Engine)**
- **C# / .NET Core 8.0:** High-performance Web API for business logic.
- **SignalR:** For bi-directional, real-time server-client communication.
- **Entity Framework Core:** Advanced ORM for efficient database management and migrations.
- **SQL Server / MySQL:** Reliable relational data storage.

### **Frontend (The User Interface)**
- **React.js:** Functional components and hooks for a dynamic UI.
- **JavaScript (ES6+):** Modern logic implementation.
- **Tailwind CSS:** For a utility-first, fully responsive design.
- **HTML5 & CSS3:** Semantic structure and custom styling.

---

## 🏗 Database Architecture

The system utilizes a normalized relational model to ensure data integrity and performance:
* **AppUser:** Stores encrypted credentials and user profile metadata.
* **Chat:** Represents both private and group conversation entities.
* **UserChat:** A bridge table for seamless many-to-many user-group management.
* **Message:** Stores text content, precise timestamps, and relational foreign keys.

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/l797l/appweb-chat](https://github.com/l797l/appweb-chat)
   cd appweb-chat
   
2. **Install Frontend dependencies:
npm install

3. **Database Migration (Backend):
cd Backend
dotnet ef database update

3. **Run the Application:
# In the root directory
npm run dev


🤝 Contributing
Contributions, issues, and feature requests are welcome!
If you have ideas for end-to-end encryption or video calling features, feel free to open a pull request.

Check the Issues Page to get started.

📄 License
This project is licensed under the MIT License.

👤 Author
GitHub: @l797l

⭐ Show your support
Give a ⭐️ if this project helped you!
