# E-Commerce Frontend Application

## 📋 Mô tả / Description

Ứng dụng E-Commerce Frontend được xây dựng bằng Vue.js 3 và TypeScript, cung cấp giao diện người dùng hiện đại và responsive cho hệ thống thương mại điện tử. Ứng dụng bao gồm đầy đủ các tính năng cho người dùng và quản trị viên, với trải nghiệm người dùng mượt mà và giao diện đẹp mắt.

E-Commerce Frontend application built with Vue.js 3 and TypeScript, providing modern and responsive user interface for e-commerce system. The application includes complete features for both users and administrators, with smooth user experience and beautiful interface.

## 🛠️ Công nghệ sử dụng / Technology Stack

### Core Framework
- **Vue.js**: 3.4.21
- **TypeScript**: 5.4.2
- **Vite**: 5.1.6 (Build tool)

### State Management & Routing
- **Pinia**: 2.1.7 (State management)
- **Vue Router**: 4.3.0 (Routing)

### Styling
- **Tailwind CSS**: 3.4.1 (Utility-first CSS)
- **Radix Vue**: 1.9.17 (Accessible UI primitives)
- **Reka UI**: 2.6.0 (Component library)
- **Lucide Vue Next**: 0.555.0 (Icons)

### HTTP Client
- **Axios**: 1.6.7 (HTTP client)
- **Request/Response Interceptors** (Token handling, error handling)

### Utilities
- **@vueuse/core**: 14.1.0 (Vue composition utilities)
- **vue-sonner**: 2.0.9 (Toast notifications)
- **clsx**: 2.1.1 (Conditional class names)
- **tailwind-merge**: 3.4.0 (Merge Tailwind classes)

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Vite HMR**: Hot module replacement

## 📦 Yêu cầu hệ thống / Prerequisites

- **Node.js**: 18+ hoặc **Bun**: 1.0+ / 18+ or **Bun**: 1.0+
- **Package Manager**: npm, yarn, pnpm, hoặc bun / npm, yarn, pnpm, or bun
- **Backend API**: E-Commerce Backend đang chạy / E-Commerce Backend running

## 🚀 Cài đặt và Chạy / Installation and Running

### 1. Clone Repository

```bash
git clone <repository-url>
cd ecommerce_fe
```

### 2. Cài đặt Dependencies / Install Dependencies

```bash
# Sử dụng Bun (Khuyến nghị) / Using Bun (Recommended)
bun install

# Hoặc sử dụng npm / Or using npm
npm install

# Hoặc sử dụng yarn / Or using yarn
yarn install

# Hoặc sử dụng pnpm / Or using pnpm
pnpm install
```

### 3. Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc của project:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8686/api/v1
```

Hoặc tạo file `.env.local` cho local development:

```env
VITE_API_BASE_URL=http://localhost:8686/api/v1
```

### 4. Chạy Development Server / Run Development Server

```bash
# Sử dụng Bun / Using Bun
bun run dev

# Hoặc sử dụng npm / Or using npm
npm run dev

# Hoặc sử dụng yarn / Or using yarn
yarn dev

# Hoặc sử dụng pnpm / Or using pnpm
pnpm dev
```

Application sẽ chạy tại: `http://localhost:5173`

### 5. Build cho Production / Build for Production

```bash
# Build
bun run build

# Hoặc / Or
npm run build
yarn build
pnpm build

# Preview production build
bun run preview

# Hoặc / Or
npm run preview
yarn preview
pnpm preview
```

## 🧪 Testing / Kiểm thử

### Chạy Tests / Run Tests

```bash
# Unit tests (khi được cấu hình) / Unit tests (when configured)
npm run test

# E2E tests (khi được cấu hình) / E2E tests (when configured)
npm run test:e2e
```

### Coverage Target / Mục tiêu Coverage

- **Components**: 70%+ coverage
- **Composables**: 80%+ coverage
- **Services**: 80%+ coverage

## 📁 Cấu trúc Project / Project Structure

```
ecommerce_fe/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── admin/          # Admin-specific components
│   │   │   ├── CategoryFormModal.vue
│   │   │   ├── ProductFormModal.vue
│   │   │   ├── RoleFormModal.vue
│   │   │   └── UserFormModal.vue
│   │   ├── layouts/        # Layout components
│   │   │   ├── AuthLayout.vue
│   │   │   └── DefaultLayout.vue
│   │   ├── orders/        # Order-related components
│   │   │   └── OrderDetailModal.vue
│   │   ├── ui/            # UI component library (Shadcn/Radix Vue)
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   ├── dialog/
│   │   │   ├── table/
│   │   │   ├── select/
│   │   │   └── ...        # Other UI components
│   │   └── ToastContainer.vue
│   │
│   ├── composables/       # Vue composition functions
│   │   ├── useNavigation.ts
│   │   ├── useToast.ts
│   │   └── index.ts
│   │
│   ├── config/            # Configuration files
│   │   ├── axios.ts      # Axios instance & interceptors
│   │   └── env.ts        # Environment variables
│   │
│   ├── constants/         # Application constants
│   │   └── index.ts      # API endpoints, routes, storage keys
│   │
│   ├── lib/              # Library utilities
│   │   └── utils.ts      # Utility functions (cn, etc.)
│   │
│   ├── router/           # Vue Router configuration
│   │   └── index.ts      # Route definitions & guards
│   │
│   ├── services/         # API service layer
│   │   ├── auth.ts      # Authentication API
│   │   ├── product.ts   # Product API
│   │   ├── category.ts  # Category API
│   │   ├── cart.ts      # Cart API
│   │   ├── order.ts     # Order API
│   │   ├── user.ts      # User API
│   │   ├── role.ts      # Role API
│   │   └── index.ts     # Services exports
│   │
│   ├── stores/           # Pinia state management
│   │   ├── auth.ts      # Authentication store
│   │   └── cart.ts      # Cart store
│   │
│   ├── types/            # TypeScript type definitions
│   │   ├── api.ts       # API response types
│   │   ├── auth.ts      # Authentication types
│   │   ├── user.ts      # User types
│   │   ├── role.ts      # Role types
│   │   ├── product.ts   # Product types
│   │   ├── category.ts  # Category types
│   │   ├── cart.ts      # Cart types
│   │   ├── order.ts     # Order types
│   │   └── index.ts     # Type exports
│   │
│   ├── utils/            # Utility functions
│   │   ├── errorMessages.ts    # Error message constants
│   │   ├── getErrorMessage.ts  # Error message utilities
│   │   ├── retry.ts            # Retry logic
│   │   └── sidebarStorage.ts   # Sidebar state persistence
│   │
│   ├── views/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   │   ├── LoginView.vue
│   │   │   ├── SignUpView.vue
│   │   │   ├── OtpVerificationView.vue
│   │   │   ├── ForgotPasswordView.vue
│   │   │   └── PasswordResetView.vue
│   │   ├── admin/        # Admin pages
│   │   │   ├── AdminDashboardView.vue
│   │   │   ├── ProductManagementView.vue
│   │   │   ├── CategoryManagementView.vue
│   │   │   ├── OrdersManagementView.vue
│   │   │   ├── UsersManagementView.vue
│   │   │   └── ProductFormView.vue
│   │   ├── HomeView.vue
│   │   ├── ProductsView.vue
│   │   ├── ProductDetailView.vue
│   │   ├── CartView.vue
│   │   ├── CheckoutView.vue
│   │   ├── AccountView.vue
│   │   ├── OrdersView.vue
│   │   ├── LogoutView.vue
│   │   └── NotFoundView.vue
│   │
│   ├── App.vue           # Root component
│   ├── main.ts           # Application entry point
│   └── style.css         # Global styles
│
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies
└── README.md            # This file
```

## ✨ Features / Tính năng

### 🔐 Authentication & Authorization / Xác thực & Phân quyền

- ✅ User registration with email verification (OTP) / Đăng ký với xác thực email (OTP)
- ✅ Secure login/logout functionality / Chức năng đăng nhập/đăng xuất an toàn
- ✅ JWT token-based authentication / Xác thực dựa trên JWT token
- ✅ Automatic token refresh mechanism / Cơ chế làm mới token tự động
- ✅ Password reset flow / Quy trình đặt lại mật khẩu
- ✅ Account activation via OTP / Kích hoạt tài khoản qua OTP
- ✅ Protected routes with authentication guards / Bảo vệ routes với authentication guards
- ✅ Role-based access control (Admin/User) / Kiểm soát truy cập dựa trên vai trò

### 🛒 Shopping Features / Tính năng Mua sắm

- ✅ Product browsing and search / Duyệt và tìm kiếm sản phẩm
- ✅ Product filtering by category / Lọc sản phẩm theo danh mục
- ✅ Product sorting and pagination / Sắp xếp và phân trang sản phẩm
- ✅ Product detail page / Trang chi tiết sản phẩm
- ✅ Shopping cart management / Quản lý giỏ hàng
- ✅ Checkout process / Quy trình thanh toán
- ✅ Order history / Lịch sử đơn hàng
- ✅ User account management / Quản lý tài khoản người dùng
- ✅ Responsive design for all devices / Thiết kế responsive cho mọi thiết bị

### 👨‍💼 Admin Features / Tính năng Quản trị

- ✅ Admin dashboard / Bảng điều khiển quản trị
- ✅ Product management (CRUD) / Quản lý sản phẩm (CRUD)
  - ✅ Product listing with search and filters / Danh sách sản phẩm với tìm kiếm và bộ lọc
  - ✅ Create new products / Tạo sản phẩm mới
  - ✅ Edit existing products / Chỉnh sửa sản phẩm
  - ✅ Delete products with confirmation / Xóa sản phẩm với xác nhận
  - ✅ Stock status management / Quản lý trạng thái tồn kho
  - ✅ Category assignment / Gán danh mục
- ✅ Category management (CRUD) / Quản lý danh mục (CRUD)
  - ✅ Category listing with pagination / Danh sách danh mục với phân trang
  - ✅ Create/Edit/Delete categories / Tạo/Chỉnh sửa/Xóa danh mục
  - ✅ Validation for category deletion / Xác thực khi xóa danh mục
- ✅ Orders management (CRUD) / Quản lý đơn hàng (CRUD)
  - ✅ View all orders / Xem tất cả đơn hàng
  - ✅ Search and filter orders / Tìm kiếm và lọc đơn hàng
  - ✅ Update order status / Cập nhật trạng thái đơn hàng
  - ✅ Delete orders / Xóa đơn hàng
- ✅ Users & Roles management / Quản lý Người dùng & Vai trò
  - ✅ User management (CRUD) / Quản lý người dùng (CRUD)
  - ✅ Role management (CRUD) / Quản lý vai trò (CRUD)
  - ✅ Assign/Remove roles for users / Gán/Xóa vai trò cho người dùng

### 🎨 UI/UX Features / Tính năng Giao diện

- ✅ Modern, clean interface design / Thiết kế giao diện hiện đại, sạch sẽ
- ✅ Fully responsive (mobile, tablet, desktop) / Hoàn toàn responsive
- ✅ Dark mode support / Hỗ trợ chế độ tối
- ✅ Smooth animations and transitions / Hiệu ứng và chuyển tiếp mượt mà
- ✅ Accessible components (WCAG 2.1 Level AA) / Components dễ truy cập
- ✅ Loading states and error handling / Trạng thái tải và xử lý lỗi
- ✅ Toast notifications for user feedback / Thông báo toast cho phản hồi người dùng
- ✅ Modal dialogs for confirmations / Hộp thoại modal cho xác nhận
- ✅ Form validation with real-time feedback / Xác thực form với phản hồi thời gian thực
- ✅ SEO-friendly URLs / URLs thân thiện với SEO

## 🔐 API Integration / Tích hợp API

Frontend giao tiếp với RESTful Backend API. Các endpoints chính:

Frontend communicates with RESTful Backend API. Main endpoints:

### Authentication / Xác thực

- `POST /api/v1/auth/register` - Đăng ký tài khoản / Register account
- `POST /api/v1/auth/login` - Đăng nhập / Login
- `POST /api/v1/auth/refresh` - Làm mới token / Refresh token
- `POST /api/v1/auth/logout` - Đăng xuất / Logout
- `POST /api/v1/auth/send-otp` - Gửi mã OTP / Send OTP
- `POST /api/v1/auth/verify-otp` - Xác thực OTP / Verify OTP

### Products / Sản phẩm

- `GET /api/v1/products` - Lấy danh sách sản phẩm / Get products list
- `GET /api/v1/products/{id}` - Lấy chi tiết sản phẩm / Get product details
- `GET /api/v1/products/slug/{slug}` - Lấy sản phẩm theo slug / Get product by slug
- `POST /api/v1/products` - Tạo sản phẩm (Admin) / Create product (Admin)
- `PUT /api/v1/products/{id}` - Cập nhật sản phẩm (Admin) / Update product (Admin)
- `DELETE /api/v1/products/{id}` - Xóa sản phẩm (Admin) / Delete product (Admin)

### Categories / Danh mục

- `GET /api/v1/categories` - Lấy danh sách danh mục / Get categories list
- `GET /api/v1/categories/{id}` - Lấy chi tiết danh mục / Get category details
- `POST /api/v1/categories` - Tạo danh mục (Admin) / Create category (Admin)
- `PUT /api/v1/categories/{id}` - Cập nhật danh mục (Admin) / Update category (Admin)
- `DELETE /api/v1/categories/{id}` - Xóa danh mục (Admin) / Delete category (Admin)

### Cart / Giỏ hàng

- `GET /api/v1/carts` - Lấy giỏ hàng / Get cart
- `POST /api/v1/carts/items` - Thêm sản phẩm vào giỏ / Add item to cart
- `PUT /api/v1/carts/items/{itemId}` - Cập nhật số lượng / Update quantity
- `DELETE /api/v1/carts/items/{itemId}` - Xóa sản phẩm khỏi giỏ / Remove item from cart
- `DELETE /api/v1/carts` - Xóa toàn bộ giỏ hàng / Clear cart

### Orders / Đơn hàng

- `GET /api/v1/orders` - Lấy danh sách đơn hàng của user / Get user orders
- `GET /api/v1/orders/{id}` - Lấy chi tiết đơn hàng / Get order details
- `POST /api/v1/orders` - Tạo đơn hàng / Create order
- `GET /api/v1/orders/admin` - Lấy tất cả đơn hàng (Admin) / Get all orders (Admin)
- `PUT /api/v1/orders/{id}` - Cập nhật đơn hàng (Admin) / Update order (Admin)
- `DELETE /api/v1/orders/{id}` - Xóa đơn hàng (Admin) / Delete order (Admin)

### Users & Roles / Người dùng & Vai trò

- `GET /api/v1/users` - Lấy danh sách users (Admin) / Get users list (Admin)
- `GET /api/v1/users/{id}` - Lấy chi tiết user / Get user details
- `POST /api/v1/users` - Tạo user (Admin) / Create user (Admin)
- `PUT /api/v1/users/{id}` - Cập nhật user / Update user
- `DELETE /api/v1/users/{id}` - Xóa user (Admin) / Delete user (Admin)
- `POST /api/v1/users/{id}/roles` - Gán role cho user (Admin) / Assign role to user (Admin)
- `DELETE /api/v1/users/{id}/roles/{roleId}` - Xóa role khỏi user (Admin) / Remove role from user (Admin)
- `GET /api/v1/users/{id}/roles` - Lấy roles của user / Get user roles
- `GET /api/v1/roles` - Lấy danh sách roles (Admin) / Get roles list (Admin)
- `POST /api/v1/roles` - Tạo role (Admin) / Create role (Admin)
- `PUT /api/v1/roles/{id}` - Cập nhật role (Admin) / Update role (Admin)
- `DELETE /api/v1/roles/{id}` - Xóa role (Admin) / Delete role (Admin)

Tất cả API calls đều type-safe, có error handling đầy đủ, và tuân theo format response chuẩn:

All API calls are type-safe, include proper error handling, and follow the standard response format:

```typescript
{
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
  timestamp?: string;
}
```

## 🔧 Configuration / Cấu hình

### Environment Variables / Biến môi trường

Tạo file `.env` hoặc `.env.local`:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8686/api/v1
```

### Vite Configuration / Cấu hình Vite

Proxy configuration trong `vite.config.ts`:

```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8686',
      changeOrigin: true,
    },
  },
}
```

### Tailwind CSS Configuration / Cấu hình Tailwind CSS

Cấu hình trong `tailwind.config.js` với custom theme và colors.

## 🔒 Security / Bảo mật

### Implemented Security Measures / Các biện pháp bảo mật đã triển khai

1. **JWT Tokens**: Secure token-based authentication / Xác thực dựa trên token an toàn
2. **Token Refresh**: Automatic token renewal / Làm mới token tự động
3. **Route Guards**: Protected routes require authentication / Routes được bảo vệ yêu cầu xác thực
4. **Input Validation**: Client-side validation for forms / Xác thực phía client cho forms
5. **XSS Protection**: Content Security Policy ready / Sẵn sàng cho Content Security Policy
6. **HTTPS**: All API calls encrypted in transit / Tất cả API calls được mã hóa khi truyền

### Security Best Practices / Thực hành bảo mật tốt nhất

- No sensitive data in client-side code / Không có dữ liệu nhạy cảm trong code phía client
- Tokens stored securely in localStorage / Tokens được lưu an toàn trong localStorage
- Automatic token expiration handling / Xử lý hết hạn token tự động
- Secure password transmission (HTTPS) / Truyền mật khẩu an toàn (HTTPS)
- Backend password hashing (BCrypt) / Mã hóa mật khẩu phía backend (BCrypt)

## 📱 Responsive Design / Thiết kế Responsive

Ứng dụng hoàn toàn responsive và được tối ưu cho:

The application is fully responsive and optimized for:

- **Mobile Devices** (< 640px) / Thiết bị di động
- **Tablets** (640px - 1024px) / Máy tính bảng
- **Desktop** (> 1024px) / Máy tính để bàn

Tất cả components sử dụng Tailwind CSS responsive utilities để hiển thị tối ưu trên mọi thiết bị.

All components use Tailwind CSS responsive utilities for optimal display across devices.

## 🎨 UI/UX Features / Tính năng Giao diện

- **Modern Design**: Clean, professional interface / Thiết kế hiện đại, giao diện chuyên nghiệp
- **Dark Mode**: Full dark mode support / Hỗ trợ đầy đủ chế độ tối
- **Smooth Animations**: CSS transitions and animations / Hiệu ứng và chuyển tiếp CSS mượt mà
- **Loading States**: Visual feedback during async operations / Phản hồi trực quan trong các thao tác bất đồng bộ
- **Error Handling**: User-friendly error messages / Xử lý lỗi với thông báo thân thiện
- **Form Validation**: Real-time validation feedback / Xác thực form với phản hồi thời gian thực
- **Accessibility**: ARIA labels and keyboard navigation / Nhãn ARIA và điều hướng bàn phím

## 🏗️ Architecture / Kiến trúc

### Design Patterns / Mẫu thiết kế

1. **Layered Architecture** / Kiến trúc phân lớp
   - API Layer: Centralized API calls / API calls tập trung
   - Service Layer: Business logic in composables / Logic nghiệp vụ trong composables
   - Presentation Layer: Vue components / Components Vue

2. **Composition API** / Composition API
   - Reusable composables for shared logic / Composables tái sử dụng cho logic dùng chung
   - Better code organization and reusability / Tổ chức code tốt hơn và khả năng tái sử dụng

3. **State Management** / Quản lý trạng thái
   - Pinia stores for global state / Stores Pinia cho trạng thái toàn cục
   - Local state for component-specific data / Trạng thái local cho dữ liệu riêng của component

4. **Type Safety** / An toàn kiểu
   - Full TypeScript implementation / Triển khai TypeScript đầy đủ
   - Type-safe API calls and data structures / API calls và cấu trúc dữ liệu an toàn kiểu

### Key Design Decisions / Quyết định thiết kế chính

- **Separation of Concerns**: Clear separation between API, business logic, and UI / Tách biệt rõ ràng giữa API, logic nghiệp vụ và UI
- **Reusability**: Composables and components designed for maximum reusability / Composables và components được thiết kế để tái sử dụng tối đa
- **Type Safety**: TypeScript throughout for better developer experience / TypeScript xuyên suốt để trải nghiệm developer tốt hơn
- **Performance**: Code splitting, lazy loading, and optimized builds / Code splitting, lazy loading và builds được tối ưu
- **Maintainability**: Clean code structure, consistent naming, and documentation / Cấu trúc code sạch, đặt tên nhất quán và tài liệu

## 📝 Code Quality / Chất lượng Code

### Standards & Practices / Tiêu chuẩn & Thực hành

- **TypeScript**: Full type coverage with strict mode / Bao phủ kiểu đầy đủ với strict mode
- **ESLint**: Code linting and formatting / Linting và format code
- **Component Structure**: Consistent component organization following Vue 3 Composition API / Cấu trúc component nhất quán theo Vue 3 Composition API
- **Naming Conventions** / Quy ước đặt tên:
  - camelCase for variables/functions / camelCase cho biến/hàm
  - PascalCase for components/classes / PascalCase cho components/classes
  - UPPER_SNAKE_CASE for constants / UPPER_SNAKE_CASE cho constants
- **Documentation**: Inline comments for complex logic / Comments nội tuyến cho logic phức tạp
- **Error Handling**: Comprehensive error handling with toast notifications / Xử lý lỗi toàn diện với thông báo toast
- **No Console Statements**: Production-ready code (no console.log/error in production) / Code sẵn sàng production (không có console.log/error trong production)
- **Constants Extraction**: All magic numbers/strings extracted to constants / Tất cả magic numbers/strings được extract thành constants
- **Explicit Return Types**: All functions have explicit return types / Tất cả functions có return types rõ ràng
- **Accessibility**: WCAG 2.1 Level AA compliance / Tuân thủ WCAG 2.1 Level AA

### Code Organization / Tổ chức Code

- **Modular Structure**: Clear separation of concerns (API → Service → Component) / Cấu trúc module với tách biệt rõ ràng
- **Reusable Code**: DRY (Don't Repeat Yourself) principle / Code tái sử dụng theo nguyên tắc DRY
- **Clean Code**: Readable and maintainable / Code sạch, dễ đọc và dễ bảo trì
- **Best Practices**: Following Vue.js 3, TypeScript, and User Rules best practices / Tuân theo best practices của Vue.js 3, TypeScript và User Rules
- **Component Architecture** / Kiến trúc Component:
  - Single Responsibility Principle / Nguyên tắc Trách nhiệm Đơn lẻ
  - Composition over inheritance / Composition thay vì inheritance
  - Props/Emits typing / Typing cho Props/Emits
  - Computed properties for derived state / Computed properties cho derived state
- **API Layer**: Centralized API calls with type-safe requests/responses / Lớp API tập trung với requests/responses an toàn kiểu
- **State Management**: Pinia stores for global state, local state for components / Quản lý trạng thái: Pinia stores cho global state, local state cho components

## 🚨 Troubleshooting / Xử lý sự cố

### Lỗi kết nối API / API Connection Error

- Kiểm tra Backend API đang chạy / Check if Backend API is running
- Kiểm tra `VITE_API_BASE_URL` trong `.env` / Check `VITE_API_BASE_URL` in `.env`
- Kiểm tra CORS configuration trên backend / Check CORS configuration on backend

### Lỗi Build / Build Error

- Xóa `node_modules` và `package-lock.json`, sau đó cài đặt lại / Delete `node_modules` and `package-lock.json`, then reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  bun install
  ```

### Lỗi TypeScript / TypeScript Error

- Kiểm tra `tsconfig.json` configuration / Check `tsconfig.json` configuration
- Đảm bảo tất cả types được import đúng / Ensure all types are imported correctly

### Lỗi Routing / Routing Error

- Kiểm tra route definitions trong `router/index.ts` / Check route definitions in `router/index.ts`
- Kiểm tra authentication guards / Check authentication guards

## 📚 Dependencies chính / Main Dependencies

- `vue` - Vue.js framework
- `vue-router` - Routing
- `pinia` - State management
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `radix-vue` - Accessible UI primitives
- `reka-ui` - Component library
- `@vueuse/core` - Vue composition utilities
- `vue-sonner` - Toast notifications
- `typescript` - Type safety
- `vite` - Build tool

## 🚧 Future Enhancements / Cải tiến Tương lai

### Planned Features / Tính năng Dự kiến

- [ ] Product reviews and ratings / Đánh giá và xếp hạng sản phẩm
- [ ] Payment integration (Stripe, PayPal) / Tích hợp thanh toán
- [ ] Order tracking / Theo dõi đơn hàng
- [ ] Email notifications / Thông báo email
- [ ] Social media integration / Tích hợp mạng xã hội
- [ ] Multi-language support (i18n) / Hỗ trợ đa ngôn ngữ
- [ ] PWA (Progressive Web App) support / Hỗ trợ PWA
- [ ] Real-time notifications (WebSocket) / Thông báo thời gian thực

### Technical Improvements / Cải tiến Kỹ thuật

- [ ] Unit tests with Vitest (target: 70%+ coverage) / Unit tests với Vitest
- [ ] E2E tests with Playwright / E2E tests với Playwright
- [ ] Performance optimization / Tối ưu hiệu suất
  - [ ] Code splitting improvements / Cải thiện code splitting
  - [ ] Image lazy loading / Lazy loading hình ảnh
  - [ ] Virtual scrolling for long lists / Virtual scrolling cho danh sách dài
- [ ] SEO improvements (meta tags, sitemap) / Cải thiện SEO
- [ ] Advanced caching strategies / Chiến lược caching nâng cao
- [ ] Service worker implementation / Triển khai service worker
- [ ] Error tracking (Sentry integration) / Theo dõi lỗi (tích hợp Sentry)

## 📄 License / Giấy phép

[Specify your license here]

## 👥 Contributors / Người đóng góp

[Add contributors here]

## 📞 Contact / Liên hệ

[Add contact information here]
