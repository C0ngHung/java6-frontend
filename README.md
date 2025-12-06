# 🛍️ E-Commerce Frontend Application

A modern, responsive e-commerce web application built with Vue.js 3, TypeScript, and Tailwind CSS. This project demonstrates best practices in frontend development, including clean architecture, type safety, and reusable component patterns.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Key Features & Implementation](#key-features--implementation)
- [API Integration](#api-integration)
- [Security](#security)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

This is a full-featured e-commerce frontend application that provides a seamless shopping experience with user authentication, product browsing, shopping cart, and admin dashboard capabilities. The application follows modern web development practices with a focus on code quality, maintainability, and user experience.

**Project Status**: In Development (Core features implemented, additional features in progress)

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ User registration with email verification (OTP)
- ✅ Secure login/logout functionality
- ✅ JWT token-based authentication
- ✅ Automatic token refresh mechanism
- ✅ Password reset flow
- ✅ Account activation via OTP
- ✅ Protected routes with authentication guards

### 🛒 Shopping Features
- ✅ Product browsing and search
- ✅ Product filtering by category
- ✅ Product sorting and pagination
- ✅ Shopping cart management (API ready)
- ✅ Wishlist functionality (UI ready)
- ✅ User dashboard
- ✅ Responsive design for all devices

### 👨‍💼 Admin Features
- ✅ Admin dashboard
- ✅ Product management (CRUD operations)
  - ✅ Product listing with search and filters
  - ✅ Create new products
  - ✅ Edit existing products
  - ✅ Delete products with confirmation
  - ✅ Stock status management
  - ✅ Category assignment
- ✅ User management (in progress)
- ✅ Order management (in progress)

### 🎨 UI/UX
- ✅ Modern, clean interface design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Smooth animations and transitions
- ✅ Accessible components (WCAG 2.1 Level AA)
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Modal dialogs for confirmations
- ✅ Form validation with real-time feedback

## 🛠️ Tech Stack

### Core Framework
- **Vue.js 3.4+** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling

### State Management & Routing
- **Pinia** - Official Vue state management
- **Vue Router 4** - Official router for Vue.js

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Reka UI** - Radix Vue primitives for accessible components
- **Shadcn/Radix Vue** - High-quality component library
- **Lucide Vue Next** - Icon library
- **Custom CSS** - Additional styling and animations

### HTTP Client
- **Axios** - Promise-based HTTP client
- **Request/Response Interceptors** - Automatic token handling and refresh

### UI Libraries
- **@vueuse/core** - Vue composition utilities
- **vue-sonner** - Toast notification library
- **reka-ui** - Radix Vue primitives

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Vite HMR** - Hot module replacement

## 📁 Project Structure

```
src/
├── services/               # API service layer (centralized)
│   ├── auth.ts            # Authentication API endpoints
│   ├── product.ts         # Product API endpoints
│   ├── category.ts        # Category API endpoints
│   ├── cart.ts            # Cart API endpoints
│   ├── order.ts           # Order API endpoints
│   ├── user.ts            # User API endpoints
│   └── index.ts           # Services exports
│
├── components/             # Reusable Vue components
│   ├── admin/             # Admin-specific components
│   │   └── ProductFormModal.vue
│   ├── layouts/           # Layout components
│   │   ├── DefaultLayout.vue
│   │   └── AuthLayout.vue
│   ├── ui/                # UI component library (Shadcn/Radix Vue)
│   │   ├── button/        # Button components
│   │   ├── input/         # Input components
│   │   ├── dialog/        # Dialog/Modal components
│   │   ├── table/         # Table components
│   │   ├── select/        # Select components
│   │   ├── checkbox/      # Checkbox components
│   │   ├── card/          # Card components
│   │   └── ...            # Other UI components
│   └── ToastContainer.vue # Toast notification component
│
├── composables/           # Vue composition functions
│   ├── useNavigation.ts   # Navigation helpers
│   ├── useToast.ts        # Toast notification composable
│   └── index.ts           # Composables exports
│
├── config/                # Configuration files
│   ├── axios.ts           # Axios instance & interceptors
│   └── env.ts             # Environment variables
│
├── constants/             # Application constants
│   └── index.ts           # API endpoints, routes, storage keys
│
├── lib/                   # Library utilities
│   └── utils.ts           # Utility functions (cn, etc.)
│
├── router/                # Vue Router configuration
│   └── index.ts           # Route definitions & guards
│
├── stores/                # Pinia state management
│   ├── auth.ts            # Authentication store
│   └── cart.ts            # Cart store
│
├── tests/                 # Test files
│   ├── components/        # Component tests
│   ├── composables/       # Composable tests
│   ├── services/          # Service/API tests
│   ├── utils/             # Utility function tests
│   ├── stores/            # Store tests
│   └── e2e/               # End-to-end tests
│
├── types/                 # TypeScript type definitions
│   ├── api.ts             # API response types
│   ├── auth.ts            # Authentication types
│   ├── user.ts            # User-related types
│   ├── admin.ts           # Admin types
│   ├── product.ts         # Product types
│   ├── category.ts        # Category types
│   ├── cart.ts            # Cart types
│   └── index.ts           # Type exports
│
├── utils/                 # Utility functions
│   └── sidebarStorage.ts  # Sidebar state persistence
│
├── views/                 # Page components
│   ├── auth/              # Authentication pages
│   │   ├── LoginView.vue
│   │   ├── SignUpView.vue
│   │   ├── OtpVerificationView.vue
│   │   ├── ForgotPasswordView.vue
│   │   └── PasswordResetView.vue
│   ├── admin/             # Admin pages
│   │   ├── AdminDashboardView.vue
│   │   ├── ProductManagementView.vue
│   │   └── ProductFormView.vue
│   ├── HomeView.vue       # Home page
│   ├── ProductsView.vue   # Products listing page
│   ├── DashboardView.vue  # User dashboard
│   ├── LogoutView.vue     # Logout page
│   └── NotFoundView.vue   # 404 page
│
├── App.vue                # Root component
├── main.ts                # Application entry point
└── style.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **Package Manager**: npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce_fe
   ```

2. **Install dependencies**
   ```bash
   # Using bun (recommended)
   bun install
   
   # Or using npm
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   VITE_API_BASE_URL=http://localhost:8686/api/v1
   ```

4. **Start development server**
   ```bash
   # Using bun
   bun run dev
   
   # Or using npm
   npm run dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build
bun run build

# Preview production build
bun run preview
```

## 🏗️ Architecture

### Design Patterns

1. **Layered Architecture**
   - API Layer: Centralized API calls
   - Service Layer: Business logic in composables
   - Presentation Layer: Vue components

2. **Composition API**
   - Reusable composables for shared logic
   - Better code organization and reusability

3. **State Management**
   - Pinia stores for global state
   - Local state for component-specific data

4. **Type Safety**
   - Full TypeScript implementation
   - Type-safe API calls and data structures

### Key Design Decisions

- **Separation of Concerns**: Clear separation between API, business logic, and UI
- **Reusability**: Composables and components designed for maximum reusability
- **Type Safety**: TypeScript throughout for better developer experience
- **Performance**: Code splitting, lazy loading, and optimized builds
- **Maintainability**: Clean code structure, consistent naming, and documentation

## 🔑 Key Features & Implementation

### 1. Authentication Flow

**Registration Flow:**
1. User fills registration form
2. Backend creates account (inactive)
3. OTP sent to email
4. User verifies OTP
5. Account activated

**Login Flow:**
1. User enters credentials
2. JWT tokens received (access + refresh)
3. Tokens stored in localStorage
4. Automatic token refresh on 401 errors

**Security Features:**
- HTTPS encryption for all API calls
- JWT token-based authentication
- Automatic token refresh
- Protected routes with route guards
- Secure password handling (BCrypt on backend)

### 2. API Integration

- **Centralized API Layer**: All API calls through `api/` directory
- **Axios Interceptors**: Automatic token injection and error handling
- **Type-Safe Requests**: TypeScript interfaces for all API calls
- **Error Handling**: Consistent error handling across the application

### 3. State Management

- **Pinia Stores**: Centralized state management
- **Reactive State**: Vue 3 reactivity system
- **Computed Properties**: Derived state from stores

### 4. Routing

- **Route Guards**: Authentication-based route protection
- **Lazy Loading**: Code splitting for better performance
- **Dynamic Routes**: Parameterized routes for dynamic content

### 5. UI Components

- **Reusable Components**: Modular component architecture
- **Shadcn/Radix Vue Integration**: High-quality, accessible UI components
- **Component Library**: Comprehensive set of UI primitives (Button, Input, Dialog, Table, Select, etc.)
- **Custom Components**: Tailored components for specific needs (ProductFormModal, ToastContainer)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA labels, keyboard navigation, focus management

## 🔌 API Integration

The frontend communicates with a RESTful backend API. Key endpoints:

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Token refresh
- `POST /api/v1/auth/otp/send` - Send OTP
- `POST /api/v1/auth/otp/verify` - Verify OTP

### Products
- `GET /api/v1/products` - Get products (with pagination, search, filters)
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create new product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Categories
- `GET /api/v1/categories` - Get categories (with pagination)
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create new category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Cart
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/items` - Add item to cart
- `PUT /api/v1/cart/items/:id` - Update cart item
- `DELETE /api/v1/cart/items/:id` - Remove item from cart

All API calls are type-safe, include proper error handling, and follow the standard response format:
```typescript
{
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}
```

## 🔒 Security

### Implemented Security Measures

1. **HTTPS**: All API calls encrypted in transit
2. **JWT Tokens**: Secure token-based authentication
3. **Token Refresh**: Automatic token renewal
4. **Route Guards**: Protected routes require authentication
5. **Input Validation**: Client-side validation for forms
6. **XSS Protection**: Content Security Policy ready
7. **CSRF Protection**: Token-based protection (backend)

### Security Best Practices

- No sensitive data in client-side code
- Tokens stored securely
- Automatic token expiration handling
- Secure password transmission (HTTPS)
- Backend password hashing (BCrypt)

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile Devices** (< 640px)
- **Tablets** (640px - 1024px)
- **Desktop** (> 1024px)

All components use Tailwind CSS responsive utilities for optimal display across devices.

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark Mode**: Full dark mode support
- **Smooth Animations**: CSS transitions and animations
- **Loading States**: Visual feedback during async operations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback
- **Accessibility**: ARIA labels and keyboard navigation

## 🚧 Future Enhancements

### Planned Features

- [ ] Product detail pages
- [ ] Advanced search and filtering (price range, multiple categories)
- [ ] Product reviews and ratings
- [ ] Checkout process
- [ ] Payment integration (Stripe, PayPal)
- [ ] Order tracking
- [ ] Email notifications
- [ ] Social media integration
- [ ] Multi-language support (i18n)
- [ ] PWA (Progressive Web App) support
- [ ] Advanced admin features
  - [ ] User management (CRUD)
  - [ ] Order management
  - [ ] Analytics dashboard
  - [ ] Inventory management
- [ ] Real-time notifications (WebSocket)
- [ ] Image upload to Cloudinary
- [ ] Wishlist functionality (backend integration)

### Technical Improvements

- [ ] Unit tests with Vitest (target: 70%+ coverage)
- [ ] E2E tests with Playwright
- [ ] Performance optimization
  - [ ] Code splitting improvements
  - [ ] Image lazy loading
  - [ ] Virtual scrolling for long lists
- [ ] SEO improvements (meta tags, sitemap)
- [ ] Advanced caching strategies
- [ ] Service worker implementation
- [ ] Error tracking (Sentry integration)

## 📝 Code Quality

### Standards & Practices

- **TypeScript**: Full type coverage with strict mode
- **ESLint**: Code linting and formatting
- **Component Structure**: Consistent component organization following Vue 3 Composition API
- **Naming Conventions**: 
  - camelCase for variables/functions
  - PascalCase for components/classes
  - UPPER_SNAKE_CASE for constants
- **Documentation**: Inline comments for complex logic
- **Error Handling**: Comprehensive error handling with toast notifications
- **No Console Statements**: Production-ready code (no console.log/error in production)

### Code Organization

- **Modular Structure**: Clear separation of concerns (API → Service → Component)
- **Reusable Code**: DRY (Don't Repeat Yourself) principle
- **Clean Code**: Readable and maintainable
- **Best Practices**: Following Vue.js 3, TypeScript, and User Rules best practices
- **Component Architecture**: 
  - Single Responsibility Principle
  - Composition over inheritance
  - Props/Emits typing
  - Computed properties for derived state
- **API Layer**: Centralized API calls with type-safe requests/responses
- **State Management**: Pinia stores for global state, local state for components

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is part of an academic assignment.

## 👨‍💻 Author

Developed as part of FPT Polytechnic Semester 5 - Block 2 assignment.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors whose libraries made this project possible

---

**Note**: This project is currently in development. Some features may be incomplete or subject to change.
