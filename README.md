# CourseVault — Frontend (React)

A modern, responsive React frontend for the Course Content Upload System.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 3** | Styling (Bonus) |
| **React Router 6** | Client-side routing |
| **TanStack React Query** | Server state management + caching |
| **Zustand** | Client auth state (with localStorage persistence) |
| **Axios** | HTTP client with JWT interceptors |
| **React Dropzone** | Drag-and-drop file uploads |
| **React Hot Toast** | Toast notifications |
| **Lucide React** | Icons |
| **date-fns** | Date formatting |

---

## Setup & Run

### Prerequisites
- Node.js 18+
- Backend running at `http://localhost:8080`

### Install & Start
```bash
npm install
npm run dev
```
Opens at **http://localhost:5173**

### Build for Production
```bash
npm run build
npm run preview
```

---

## Features

### Core
- **File upload** with drag-and-drop (React Dropzone)
- **Multi-file upload** — drop multiple files at once
- **Upload progress bar** with real-time percentage via Axios `onUploadProgress`
- **Client-side validation** — file type and size checked before upload
- **File library** — grid view with all uploaded metadata
- **File type filter tabs** — All / PDFs / Videos / Images
- **Search** — filter files by name or description
- **Download / View** — inline view or forced download
- **Delete** with confirmation dialog
- **Statistics bar** — file counts and total storage used

### JWT Authentication (Bonus)
- Register / Login with form validation
- JWT token stored in Zustand + localStorage
- Axios interceptor automatically attaches `Authorization: Bearer <token>` to every request
- Auto-logout + redirect on 401 responses

### Tailwind CSS (Bonus)
- Full custom design system with `Syne` display font and `DM Sans` body font
- Custom color palette (ink, amber, sage, rust)
- Animated components: fade-up, shimmer progress, stagger reveals
- Grain texture overlay for depth
- Fully responsive layout

---

## Project Structure

```
src/
├── api/
│   ├── client.js          # Axios instance with JWT interceptors
│   ├── authApi.js         # Login / Register API calls
│   └── filesApi.js        # Upload / Get / Delete API calls
├── components/
│   ├── FileCard.jsx        # File metadata card with actions
│   ├── FileTypeIcon.jsx    # Dynamic icon by MIME type
│   ├── Navbar.jsx          # Top navigation bar
│   ├── ProtectedRoute.jsx  # Auth guard component
│   ├── Skeleton.jsx        # Loading skeleton components
│   ├── StatsBar.jsx        # File stats dashboard
│   └── UploadDropzone.jsx  # Full upload UI with progress & validation
├── hooks/
│   ├── useAuth.js          # Login / Register / Logout mutations
│   └── useFiles.js         # File query + upload/delete mutations
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   └── UploadPage.jsx
├── store/
│   └── authStore.js        # Zustand store with persistence
└── utils/
    └── fileUtils.js        # Validation, formatting helpers
```

---

## API Integration

All requests are proxied via Vite dev server to `http://localhost:8080`.

| Action | API Call |
|--------|----------|
| Register | `POST /api/auth/register` |
| Login | `POST /api/auth/login` |
| Get all files | `GET /api/files` |
| Upload file | `POST /api/files/upload` (multipart) |
| Download/view | `GET /api/files/download/{fileName}` |
| Delete file | `DELETE /api/files/{id}` |
