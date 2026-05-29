# BuildTrack Pro

[![Vite](https://img.shields.io/badge/Vite-0D9488?logo=vite&logoColor=white&labelColor=101010)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&labelColor=101010)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white&labelColor=101010)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&labelColor=101010)](https://www.javascript.com/)


## Short Description

BuildTrack Pro is a professional construction management web application built with React and Vite. It centralizes materials, expenses, budgets, reports, user roles, and site proof uploads into a modern dashboard tailored for construction companies and building projects.

## Features

- Dynamic Dashboard with summaries and activity feed
- Full Material Management (add / edit / delete / search / filters)
- Expense Management (daily entries, cost categories, CRUD)
- Project Budget Management with real-time calculations
- Role-based Authentication (Admin and Site Engineer)
- Site Proof Uploads (image preview, Base64 storage)
- Responsive, professional UI built with Tailwind CSS
- LocalStorage persistence for demo / offline usage

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- React Router DOM
- Lucide React Icons
- LocalStorage (client-side persistence)

## User Roles

- Admin
	- Full access to the app
	- Manage Dashboard, Materials, Expenses, Budget, Reports, Settings, Site Uploads
	- Can delete materials, expenses, and site proof uploads

- Site Engineer
	- Access to Dashboard, Materials, Expenses, Upload Proof
	- Can add/edit materials and expenses
	- Cannot delete materials or expenses
	- Cannot access Budget, Reports, Settings
	- Can upload work/payment proof images

## Demo Login Credentials

- Admin
	- Email: admin@gmail.com
	- Password: 123456

- Site Engineer
	- Email: engineer@gmail.com
	- Password: 123456

## Folder Structure

The app follows a component-driven structure for clarity and scalability:

```
src/
├── assets/          # Images, icons and static assets
├── components/      # Reusable UI components
│   ├── common/      # Buttons, Inputs, Modals, Selects, Cards
│   ├── dashboard/   # Dashboard-specific components (StatCard, charts)
│   ├── materials/   # MaterialForm, MaterialTable, Material-specific UI
│   ├── expenses/    # ExpenseForm, ExpenseTable, Expense-specific UI
│   └── proofs/      # ProofForm, ProofCard, ImagePreviewModal
├── context/         # AuthContext and global providers
├── data/            # Default data and lookup lists (categories, units)
├── hooks/           # Custom React hooks
├── layouts/         # MainLayout, Sidebar, TopNavbar
├── pages/           # Route pages (Dashboard, Materials, Expenses...)
├── routes/          # AppRoutes, ProtectedRoute components
├── services/        # LocalStorage services and business logic
└── utils/           # Helpers (formatCurrency, generateId, validators)
```

This structure helps separate UI from state and business logic, making the app easier to extend.

## Installation Guide

Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-username>/buildtrack-pro.git
cd buildtrack-pro
npm install
```

## How to Run Locally

Start the development server:

```bash
npm run dev
```

Open the URL reported by Vite (usually `http://localhost:5173`) in your browser.

## Available Routes

- `/login` - Authentication page
- `/dashboard` - Main overview and metrics
- `/materials` - Material management page
- `/expenses` - Expense management page
- `/budget` - Project budget settings and summary
- `/reports` - Reports and export views
- `/settings` - Admin settings
- `/upload-proof` - Site Engineer proof upload form
- `/site-uploads` - Admin view of site proof uploads

## Site Proof Uploads

Site Engineers can upload images with metadata (title, category, amount, date, note). Images are converted to Base64 and stored in LocalStorage for this demo project. Admins can view and delete uploads. An image preview modal is available for quick inspection.

## Screenshots

Add screenshots to highlight the UI. Replace the placeholders below with actual images from the `public/` or `assets/` folder.

- Dashboard

![Dashboard Screenshot](screenshots/dashboard.png)

- Materials

![Materials Screenshot](screenshots/materials.png)

- Expenses

![Expenses Screenshot](screenshots/expenses.png)

- Upload Proof

![Upload Proof Screenshot](screenshots/upload-proof.png)

(If you don’t have screenshots yet, create a `screenshots/` folder and add images with the above filenames.)

## Future Improvements

Planned enhancements for BuildTrack Pro:

- Backend integration with Django or Flask
- Database integration (PostgreSQL, MySQL)
- JWT authentication and secure session handling
- Cloud image upload (S3, Cloudinary)
- Admin approval workflow for uploads and changes
- PDF report export and scheduled reports
- Multi-project management and project-level scoping
- Real-time notifications (WebSockets / Pusher)

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss what you’d like to change. For simple fixes, open a pull request and describe the changes.

## License

This repository currently does not include a license file. Add a suitable open-source license (MIT/Apache/BSD) as required.

## Author

Md. Moinul Hossain

---

If you'd like, I can also:

- Add a `screenshots/` folder and generate placeholder images
- Commit the `README.md` and create a git tag
- Add a `LICENSE` file (MIT suggested)

Let me know which next step you prefer.
