
<div align="center">

# 🌄 HimYatra
### Explore the Himalayas

**Discover Himachal Pradesh & Uttarakhand 🏔️**

A travel website for exploring destinations across the Himalayas.

[![Live Website](https://img.shields.io/badge/🌐_LIVE_WEBSITE-Visit_HimYatra-2563EB?style=for-the-badge)](https://him-ytra.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GITHUB-View_Repository-181717?style=for-the-badge&logo=github)](https://github.com/Amittutorial/HIM-YTRA)

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel)

</div>

---

## 📌 About the Project

**HimYatra** is a travel website focused on destinations in **Himachal Pradesh and Uttarakhand**. It provides visitors with a place to explore travel-related content and contact the team for enquiries.

🌐 **Live Website:** https://him-ytra.vercel.app/  
💻 **Repository:** https://github.com/Amittutorial/HIM-YTRA

## ✨ Website Highlights

- 🏔️ Travel-focused experience for Himalayan destinations
- 📍 Content featuring Himachal Pradesh and Uttarakhand
- 🧭 Website navigation and contact section
- ⚛️ React-based frontend
- 🚀 Deployed on Vercel

> This README describes the project at a high level. Update the feature list as functionality is verified or added.

## 🧰 Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,vite,js,css,git,github,vercel" alt="Technology stack"/>

</div>

| Technology | Purpose |
|---|---|
| React | UI components |
| Vite | Development and production build |
| JavaScript | Application logic |
| CSS | Styling |
| Supabase / PostgreSQL | Database services, where configured |
| Vercel | Deployment |
| Git & GitHub | Source control |

## 🗂️ Repository Structure

```text
HIM-YTRA/
├── public/              # Static assets
├── src/                 # React application source
│   └── components/      # Reusable UI components
├── supabase_schema.sql  # Database schema
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

*This is a simplified overview, not a complete directory listing.*

## 🚀 Run Locally

### Prerequisites

- Node.js and npm
- Git
- Supabase project credentials, if required by the application

### 1. Clone the repository

```bash
git clone https://github.com/Amittutorial/HIM-YTRA.git
cd HIM-YTRA
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

If the application uses Supabase, create a local `.env` file and use the exact variable names expected by the application's code.

Example only:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

**Security:** Never commit `.env` files or expose Supabase service-role keys in frontend code or a public repository.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal.

### 5. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🗄️ Supabase Database

The repository includes `supabase_schema.sql`.

Before using it:

1. Review the SQL statements.
2. Confirm that the schema matches your intended Supabase project.
3. Run it in that project's SQL Editor only after verification.
4. Configure appropriate Row Level Security (RLS) policies.

Use only the appropriate publishable/anon key in frontend code. Keep service-role keys and other secrets on a trusted server.

## 🌐 Deployment

The live website is hosted on **Vercel**.

[![Visit HimYatra](https://img.shields.io/badge/EXPLORE_HIMYATRA-Open_Live_Website-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://him-ytra.vercel.app/)

To deploy your own version:

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Deploy the application and verify the live website.

## 👨‍💻 Founder & Developer

<div align="center">

### Amit Verma

**CSE Student | Web Development Enthusiast**

[![GitHub](https://img.shields.io/badge/GitHub-@Amittutorial-181717?style=for-the-badge&logo=github)](https://github.com/Amittutorial)

[🌄 HimYatra — Live Website](https://him-ytra.vercel.app/)

*Building ideas into meaningful digital experiences.*

</div>

## 💬 Feedback

Have a suggestion or found an issue?

- Open an issue in the [GitHub repository](https://github.com/Amittutorial/HIM-YTRA).
- Share feedback to help improve HimYatra.

## ⭐ Support the Project

If you like HimYatra, visit the live website and consider giving the repository a ⭐ star.

---

<div align="center">

**Made with ❤️ by Amit Verma**

### 🌄 Explore More. Discover HimYatra.

</div>
.
