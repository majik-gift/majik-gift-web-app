# Majik Gift Web App

A comprehensive Next.js-based web application for a gift and services marketplace platform. This application provides features for browsing products, booking services, managing events, and connecting with light workers.

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.0 (with Turbopack)
- **React**: 19.0.0
- **UI Library**: Material-UI (MUI) 6.4.0
- **State Management**: Redux Toolkit 2.5.0
- **Styling**: Tailwind CSS 3.4.1, Emotion
- **Form Handling**: React Hook Form 7.56.1 with Yup validation
- **Payment**: Stripe (@stripe/react-stripe-js, @stripe/stripe-js)
- **Real-time**: Socket.io Client 4.8.1
- **Notifications**: Firebase 11.6.1
- **HTTP Client**: Axios 1.7.9
- **Date Handling**: Day.js, Moment.js, date-fns
- **Icons**: Font Awesome, Material Icons, React Icons
- **Other Libraries**: Swiper, Framer Motion, Emoji Mart

## 📋 Features

### User Features
- **Authentication**: Login, Sign Up, OTP Verification, Password Reset
- **Products**: Browse and purchase products
- **Services**: Book various services (medical, mediumship, etc.)
- **Events**: View and participate in events
- **Light Workers**: Connect with service providers
- **Chat**: Real-time messaging functionality
- **Orders**: Track and manage orders
- **Subscriptions**: Manage service subscriptions
- **Wishlist**: Save favorite items
- **Profile Management**: User profile customization
- **Notifications**: Push notifications via Firebase

### Admin Features
- **User Management**: Admin user administration
- **Banner Management**: Manage promotional banners
- **Category Management**: Organize products and services
- **Order History**: View and manage all orders
- **Settings**: Application configuration

### Additional Features
- Payment integration with Stripe
- Real-time chat with Socket.io
- Firebase Cloud Messaging for notifications
- Responsive design with Material-UI and Tailwind CSS
- Image upload and management
- Review and rating system
- Coupon system
- Group activities

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd majik-gift-web-app
   ```

2. **Install dependencies**
   
   Using npm:
   ```bash
   npm install
   ```
   
   Using pnpm (recommended):
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_SOCKET_URL=your_socket_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
majik-gift-web-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (screens)/         # Main application screens
│   │   ├── components/        # Reusable UI components
│   │   ├── Hoc/               # Higher-order components
│   │   └── schema/            # Form validation schemas
│   ├── apis/                  # API service functions
│   │   ├── admin/             # Admin API endpoints
│   │   ├── auth/              # Authentication APIs
│   │   ├── event/             # Event-related APIs
│   │   ├── light-worker/      # Light worker APIs
│   │   └── services/          # Service APIs
│   ├── assets/                # Static assets (images, SVGs)
│   ├── constant/              # Application constants
│   ├── helper/                # Utility helpers
│   ├── hook/                  # Custom React hooks
│   ├── lib/                   # Library configurations
│   ├── pure-components/       # Pure/presentational components
│   ├── shared/                # Shared components and utilities
│   └── store/                 # Redux store configuration
├── public/                    # Public static files
├── next.config.mjs            # Next.js configuration
├── tailwind.config.mjs        # Tailwind CSS configuration
└── package.json               # Project dependencies
```

## 🔧 Configuration

### Next.js Configuration
The application is configured to allow images from AWS S3 (`s3.us-east-2.amazonaws.com`). Update `next.config.mjs` if you need to add additional image domains.

### Firebase Setup
Make sure to configure Firebase for:
- Cloud Messaging (push notifications)
- Service Worker registration (`/firebase-messaging-sw.js`)

### Stripe Setup
Configure Stripe keys in your environment variables for payment processing.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📞 Support

For support and inquiries, please contact the development team.

---

Built with ❤️ using Next.js and Material-UI