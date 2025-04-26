# 🧠 Task 8: Advanced Server-Side Functionality

**Level:** Expert  
**Objective:**  
- Add custom middleware  
- Implement server-side caching  
- Use Redis and Bull for background jobs (simulated email service)

---

## 🛠 Technologies Used

- Node.js + Express
- Redis
- Bull (job queue)
- Node-cache
- dotenv

---

## 📁 Project Structure

task8_server_advanced/ ├── views/ │ └── home.ejs ├── jobs/ │ └── emailJob.js ├── server.js ├── worker.js ├── package.json ├── .env

yaml
Copy
Edit

---

## 🔧 Features

- **Middleware** logs every request with timestamp
- **Node-cache** used to cache time response
- **Redis** stores background job queue
- **Bull** handles background "email" jobs
- `worker.js` processes queued jobs separately

---

## ⚙️ Setup Instructions

1. Make sure **Redis is running**
   - (Use WSL or Docker on Windows)

2. Install packages:
   ```bash
   npm install
Run the app:

bash
Copy
Edit
node server.js
In another terminal, run the worker:

bash
Copy
Edit
node worker.js
💻 App URLs
GET / → Cached time view

POST /send-email → Adds background job

🔁 Example Flow
Load / once → cache stores time

Wait 10 sec and reload → updated time

Submit email form → email job is processed by worker.js

