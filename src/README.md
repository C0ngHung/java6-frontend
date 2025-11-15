# E-Commerce Frontend - Source Structure

## 📁 Directory Structure

```
src/
├── api/                    # API services
│   ├── auth.ts            # Authentication API
│   └── index.ts           # API exports
│
├── components/             # Vue components
│   └── ui/                # UI components (shadcn-style)
│       └── Input.vue      # Input component
│
├── composables/           # Vue composables (reusable logic)
│   ├── useAuth.ts         # Authentication composable
│   ├── useNavigation.ts   # Navigation composable
│   └── index.ts           # Composables exports
│
├── config/                # Configuration files
│   ├── axios.ts           # Axios instance & interceptors
│   └── env.ts            # Environment variables
│
├── constants/             # Application constants
│   └── index.ts          # Constants exports
│
├── router/                # Vue Router configuration
│   └── index.ts          # Router setup
│
├── stores/                # Pinia stores
│   └── auth.ts           # Authentication store
│
├── types/                 # TypeScript type definitions
│   ├── api.ts            # API response types
│   ├── auth.ts           # Authentication types
│   ├── user.ts           # User types
│   ├── admin.ts          # Admin types
│   └── index.ts          # Types exports
│
├── utils/                 # Utility functions
│   └── index.ts          # Utility exports (cn, etc.)
│
├── views/                 # Page components
│   ├── auth/             # Authentication pages
│   │   ├── LoginView.vue
│   │   ├── SignUpView.vue
│   │   ├── OtpVerificationView.vue
│   │   ├── ForgotPasswordView.vue
│   │   └── PasswordResetView.vue
│   ├── admin/            # Admin pages
│   │   └── AdminDashboardView.vue
│   ├── HomeView.vue
│   ├── DashboardView.vue
│   └── NotFoundView.vue
│
├── App.vue                # Root component
├── main.ts                # Application entry point
├── style.css              # Global styles
└── vite-env.d.ts          # Vite type definitions
```

## 🎯 Key Features

### API Layer (`api/`)
- Centralized API service functions
- Type-safe API calls
- Error handling

### Composables (`composables/`)
- Reusable Vue composition functions
- `useAuth`: Authentication logic
- `useNavigation`: Navigation helpers

### Constants (`constants/`)
- Application-wide constants
- API endpoints
- Routes
- Storage keys
- Configuration values

### Utils (`utils/`)
- Utility functions
- `cn()`: Class name merger (Tailwind + clsx)

### Components (`components/`)
- Reusable UI components
- Shadcn-style components

### Stores (`stores/`)
- Pinia state management
- Authentication state

### Types (`types/`)
- TypeScript type definitions
- Shared types across the application

## 🔧 Best Practices

1. **Imports**: Use `@/` alias for absolute imports
2. **Components**: Place reusable components in `components/`
3. **Composables**: Extract reusable logic to `composables/`
4. **Constants**: Use constants from `constants/` instead of magic strings
5. **Types**: Define types in `types/` and export via `index.ts`
6. **API**: All API calls go through `api/` services

## 📝 Code Style

- Use TypeScript for type safety
- Follow Vue 3 Composition API
- Use `<script setup>` syntax
- Prefer composables over mixins
- Use Tailwind CSS for styling
- Follow naming conventions:
  - Components: PascalCase (e.g., `LoginView.vue`)
  - Composables: camelCase with `use` prefix (e.g., `useAuth.ts`)
  - Utils: camelCase (e.g., `cn()`)
  - Constants: UPPER_SNAKE_CASE (e.g., `STORAGE_KEYS`)

