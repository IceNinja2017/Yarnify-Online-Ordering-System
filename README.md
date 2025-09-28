# Yarnify-Online-Ordering-System

**Yarnify** is an online ordering system for crochet and knitting tools and supplies, developed using the **MERN stack** (MongoDB, Express, React, Node.js).  
The platform provides essential features like user authentication, product catalog management, and a payment system, making it a complete solution for handling online orders.


---

## 📦 Installation  

Clone the repository:  

```bash
git clone https://github.com/IceNinja2017/Yarnify-Online-Ordering-System.git
cd Yarnify-Online-Ordering-System
```

### 1. Install frontend dependencies
```bash
cd frontend
npm install
```

### 2. Install backend service dependencies
Each service is independent and has its own `package.json`.  
Run `npm install` inside each one:  

```bash
cd services/auth-service && npm install
cd ../payment-service && npm install
cd ../product-service && npm install
```

---

## 🚀 Running the Project
Start the development server at the Root folder:
```bash
npm run dev:all
```

Open your browser and go to http://localhost:5173 to view the app.

---

## ⚙️ Configuration  

This project requires **environment variables** to run.  
Each service has its own `.env` file, plus a shared **global `.env`**.  

### 1. Global `.env`
Located in the `/services` folder.  
Used for shared values like database URIs and secrets.  

### 2. Service-specific `.env`
Each service (`auth-service`, `payment-service`, `product-service`) also has its own `.env` file for service-specific configs (e.g., ports, service names).  

---

⚠️ **Note:** For security reasons, `.env` files are **not included** in this repository.  
👉 Please contact the repository owner to obtain the required `.env` files.

---

## 🌱 Working with Branches  

This project is split into feature branches for each service:  
- auth-service  
- product-service  
- payment-service  

### 🔄 Keeping Your Branch Up-to-Date with main

Before pushing new changes, always update your branch with the latest code from main.  

1. Make sure you are on your service branch (example: auth-service):  
   git checkout auth-service  

2. Fetch the latest changes:  
   git fetch origin  

3. Merge main into your branch:  
   git merge origin/main  

   If there are merge conflicts, resolve them in your code editor, then run:  
   git add .  
   git commit  

4. Push the updated branch to GitHub:  
   git push origin auth-service  

---

Tip: Always pull updates before starting work to avoid large conflicts.  
If you want a clean history, you can use:  
   git rebase origin/main  
instead of merge (advanced).
