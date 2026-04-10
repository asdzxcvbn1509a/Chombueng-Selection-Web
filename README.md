# 🛒 จอมบึงซีเล็คชั่น (Chombueng Selection)

E-Commerce web application for **Chombueng Selection** — an online storefront with product browsing, shopping cart, checkout, community features, and a full admin dashboard. Supports authentication via email/password and **LINE Login (LIFF)**.

## ✨ Features

### 🛍️ Customer-Facing
- **Home** — Hero carousel, best-seller showcase, and content highlights
- **Shop** — Browse products with search, category filtering, and price range slider
- **Cart** — Add/remove products, adjust quantities, persistent cart via localStorage
- **Checkout** — Order summary and checkout flow
- **Community** — Community hub / social content page
- **Authentication** — Register, Login, and LINE Login via LIFF SDK

### 🔧 Admin Dashboard
- **Dashboard** — Sales statistics and analytics (powered by Recharts)
- **Category Management** — Create and manage product categories
- **Product Management** — CRUD products with image upload (Cloudinary)
- **Order Management** — View and manage customer orders
- **User Management** — View and manage registered users with role control

### 🔐 Authorization
- Role-based protected routes (`admin` / `user`)
- JWT token-based authentication
- Automatic redirect for unauthorized access

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 7 |
| **Routing** | React Router DOM v7 |
| **State Management** | Zustand (cart & auth) + Redux Toolkit (user session) |
| **Styling** | Tailwind CSS v3 |
| **Animations** | Framer Motion |
| **HTTP Client** | Axios |
| **Charts** | Recharts |
| **UI Components** | Lucide React (icons), Swiper (carousel), rc-slider |
| **Notifications** | React Toastify, SweetAlert2 |
| **Date Handling** | Day.js, Moment.js |
| **Image Upload** | react-image-file-resizer (Cloudinary integration) |
| **Auth (Social)** | LINE LIFF SDK |
| **Deployment** | Vercel |

## 📁 Project Structure

```
src/
├── api/                    # API service layer (Axios calls)
│   ├── auth.jsx            # Auth endpoints (login, current user/admin, LINE login)
│   ├── admin.jsx           # Admin-specific endpoints
│   ├── Category.jsx        # Category CRUD endpoints
│   ├── product.jsx         # Product CRUD & search endpoints
│   ├── order.jsx           # Order management endpoints
│   └── stats.js            # Dashboard statistics endpoints
│
├── components/
│   ├── MainNav.jsx         # Main navigation bar
│   ├── Footer.jsx          # Site footer
│   ├── admin/              # Admin dashboard components
│   │   ├── FormCategory.jsx
│   │   ├── FormDashboard.jsx
│   │   ├── FormProduct.jsx
│   │   ├── FormEditProduct.jsx
│   │   ├── FormOrder.jsx
│   │   ├── TableUsers.jsx
│   │   ├── SidebarAdmin.jsx
│   │   ├── HeaderAdmin.jsx
│   │   └── Uploadfile.jsx
│   ├── card/               # Product & cart card components
│   │   ├── ProductCard.jsx
│   │   ├── CartCard.jsx
│   │   ├── ListCart.jsx
│   │   └── SearchCard.jsx
│   └── home/               # Home page components
│       ├── BestSeller.jsx
│       ├── ContentCarousel.jsx
│       └── Slider.jsx
│
├── layouts/
│   ├── Layout.jsx          # Public layout (nav + footer)
│   ├── LayoutAdmin.jsx     # Admin layout (sidebar + header)
│   └── LayoutUser.jsx      # Authenticated user layout
│
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Shop.jsx            # Product listing / shop page
│   ├── Cart.jsx            # Shopping cart page
│   ├── Checkout.jsx        # Checkout page
│   ├── Community.jsx       # Community page
│   ├── auth/
│   │   ├── Login.jsx       # Email/password login
│   │   ├── Register.jsx    # User registration
│   │   └── Line.jsx        # LINE LIFF login flow
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   ├── Category.jsx
│   │   ├── Product.jsx
│   │   ├── EditProduct.jsx
│   │   ├── Manage.jsx
│   │   └── Order.jsx
│   └── user/
│       └── HomeUser.jsx
│
├── routes/
│   ├── AppRoutes.jsx           # Route definitions
│   ├── ProtectRouteAdmin.jsx   # Admin route guard
│   ├── ProtectRouteUser.jsx    # User route guard
│   └── LoadingToRedirect.jsx   # Redirect with countdown
│
├── store/
│   ├── index.js            # Redux store configuration
│   ├── ecom-store.jsx      # Zustand store (cart, products, auth actions)
│   └── slices/
│       └── userSlice.js    # Redux user session slice
│
├── utils/
│   ├── Date.jsx            # Date formatting helpers
│   ├── number.jsx          # Number formatting (numeral)
│   ├── ScrollToTop.js      # Scroll restoration on route change
│   └── sweetalert.js       # SweetAlert2 confirmation dialogs
│
├── App.jsx                 # Root component
├── main.jsx                # Entry point (React DOM + Redux Provider)
├── index.css               # Global styles
└── App.css                 # App-level styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/Chombueng-Selection-Web.git
cd Chombueng-Selection-Web

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will start at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 🌐 Deployment

This project is configured for deployment on **Vercel**. The `vercel.json` includes SPA rewrites so all routes are handled by `index.html`.

```json
{
  "routes": [
    { "src": "/[^.]+", "dest": "/" }
  ]
}
```

**Backend API**: `https://chombueng-selection.vercel.app/api`

## 🔑 Environment & Configuration

| Item | Location | Note |
|---|---|---|
| API Base URL | Hardcoded in `src/api/*.jsx` and `src/store/ecom-store.jsx` | `https://chombueng-selection.vercel.app/api` |
| LINE LIFF ID | `src/pages/auth/Line.jsx` | `2008047825-Ka9M3qpd` |
| Fonts | `index.html` | Golos Text, Kanit, Sarabun (Google Fonts) |
| Favicon | `index.html` | Hosted on Cloudinary |

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

## 📄 License

This project is private and not licensed for public distribution.
