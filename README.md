# Node.js Project - Business Card Management API

## 📌 Overview
This project is a **REST API** for managing business cards. The application allows users to register, log in, create and manage business cards. The system includes different user roles: **Regular users, Business users, and Admins**.

## 🚀 Technologies Used
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **bcryptjs** for password hashing
- **Joi** for input validation
- **Morgan** for logging
- **CORS** for secure requests
- **dotenv** for environment variables

## 🔑 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-link.git
   cd your-project-folder](https://github.com/yair02010/cardserverproject.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```
   or in development mode:
   ```sh
   npm run dev
   ```

## 📌 API Endpoints

### 🧑 User Routes
| Method | Endpoint | Description | Authorization |
|--------|---------|-------------|---------------|
| POST | `/users` | Register a new user | Public |
| POST | `/users/login` | Login & get token | Public |
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Admin / User himself |
| PUT | `/users/:id` | Edit user | User himself |
| PATCH | `/users/:id` | Change isBusiness status | User himself |
| DELETE | `/users/:id` | Delete user | Admin / User himself |

### 🏷️ Business Card Routes
| Method | Endpoint | Description | Authorization |
|--------|---------|-------------|---------------|
| GET | `/cards` | Get all cards | Public |
| GET | `/cards/my-cards` | Get user’s own cards | Registered User |
| GET | `/cards/:id` | Get a specific card | Public |
| POST | `/cards` | Create a new card | Business User |
| PUT | `/cards/:id` | Edit a card | Owner of the card |
| PATCH | `/cards/:id` | Like a card | Registered User |
| DELETE | `/cards/:id` | Delete a card | Admin / Owner |

## 🔐 Authentication & Authorization
- Users must log in to access protected routes.
- Tokens are required in `Authorization` headers as `Bearer [TOKEN]`.
- Admins have full access to all users and cards.

## ✅ Validation (Joi)
- **Users:** Ensures valid email, password strength, and unique email.
- **Cards:** Ensures valid input such as title, phone number, and email.

## 📄 Logging & Security
- Uses `Morgan` for request logging.
- Logs errors with a `file logger` for status codes **400+**.
- Passwords are **hashed** using `bcryptjs`.
- Invalid login attempts are blocked after **3 failed tries for 24 hours**.

## 🏗 Initial Data
On first run, three default users and three default business cards are created:
1. **Regular User**
2. **Business User**
3. **Admin User**

## 🛠 Future Enhancements
- Add support for profile images.
- Implement email verification upon registration.
- Advanced analytics for business card interactions.

---
📌 **Developed as part of a Full-Stack course.** 🚀

