<a name="readme-top"></a>

# 🏦 Financy - Personal finance app

<p align="center">
  <img src="https://github.com/user-attachments/assets/6e87ca69-0294-429a-b270-1e2c7b9f309c" alt="Financy screenshot" width="800" />
  <br>
  <em>Minimalist ecommerce built with Nextjs, Tailwind and Zustand. Server components, server actions, integrated with PayPal for payments, and Cloudinary for product image storage.</em>
  <br>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  •
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  •
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <br>
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" /> 
  •
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<p align="center">
  <strong><a href="https://financy-app-theta.vercel.app/" target="_blank">Preview here</a></strong>
</p>

## About Financy

Financy is a high-performance, minimalist expenses tracker fullstack application built with [React](https://react.dev/) 19 and [Express](https://expressjs.com/). With users, transactions, charts, tables and filter systems powered by [Prisma](https://www.prisma.io/). User session and routes are handled with [JWT tokens](https://es.wikipedia.org/wiki/JSON_Web_Token) and [Bcrypt](https://www.npmjs.com/package/bcrypt), ensuring Security.

See the [demo here](https://financy-app-theta.vercel.app/).

![financy](https://github.com/user-attachments/assets/1a79fd8a-62f9-49bf-9d0d-e7de0aa897cb)

## 🛠️ APPS

Financy is a monorepo for two main apps, a React frontend and a Experss.js backend

- [**Frontend**](https://github.com/USpiri/financy/tree/main/app)
- [**Backend**](https://github.com/USpiri/financy/tree/main/server)

## 🛠️ Tech Stack

- **Frameworks**: React 19 & Express.js
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand
- **Security**: JWT and Bcrypt
- **Validation**: Express-Validation and React-Form
- **Language**: TypeScript
- **Authentication**: Custom implementation

## 🖼️ Screenshoots

![674shots_so](https://github.com/user-attachments/assets/902406e0-8f60-409e-8c6f-1f8aab9dfa53)
![256shots_so](https://github.com/user-attachments/assets/eb89db4c-1bc4-4a51-b90a-83d0e8658227)
![512shots_so](https://github.com/user-attachments/assets/8e1c6266-8ed7-4618-b559-6aace2c96ed6)


## 🗃️ Folder structure

```bash
app/
  ├── index.html
  └── src/
  ├── App.tsx
  ├── index.css
  ├── main.tsx
  ├── components/
  │   ├── .../
  │   └── ui/
  ├── config/
  ├── hooks/
  ├── lib/
  ├── models/
  ├── pages/
  │   ├── auth/
  │   ├── dashboard/
  │   └── transactions/
  ├── router/
  ├── store/
  └── utils/
server/
  ├── README.md
  ├── server.ts
  ├── prisma/
  │   ├── schema.prisma
  │   └── migrations/
  └── src/
  ├── index.ts
  ├── config/
  ├── controllers/
  ├── lib/
  ├── middlewares/
  ├── models/
  ├── routes/
  ├── seed/
  ├── services/
  └── utils/
```
Aquí está el documento con un formato corregido:

## Getting Started

### Development:

1. **Clone the project:**

   ```bash
   git clone https://github.com/USpiri/financy.git
   ```

   Or just [click here](https://github.com/USpiri/financy/fork).

2. **Go to the application folder:**

   ```bash
   cd financy
   ```

3. **Copy `.env.template` and rename it to `.env`.**

4. **Update the `.env` file with your environment variables.**

5. **Install dependencies:**

   ```bash
   npm install
   ```

6. **Set up the server:**

   - Enter the server folder:

     ```bash
     cd server
     ```

   - Set up Docker:

     ```bash
     docker compose up -d
     ```

   - Apply Prisma migrations:

     ```bash
     npm prisma generate && npx prisma migrate dev
     ```

   - Return to the `financy` folder:

     ```bash
     cd ..
     ```

7. **Seed the database with sample data:**

   ```bash
   npm run server:seed
   ```



8. **Start the development server:**

   ```bash
   npm run dev
   ```

   > **Note:** This command will setup both, frontend and backend. For individual servers run `npm run dev:app` or `npm run dev:server`

9. **Open** [http://localhost:5173/](http://localhost:5173/) in your browser.

### Build:

```
npm run build
```

# 🤝 Contribution Guidelines

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

<p align="right"><a href="#readme-top">Back to top ⬆️</a></p>






