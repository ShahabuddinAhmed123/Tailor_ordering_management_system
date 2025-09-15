# 🧵 Tailor Management System

A comprehensive web application for managing tailor shops, orders, customers, and business operations. Built with Next.js, Firebase, and modern web technologies.

![Tailor Management System](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop)

## ✨ Features

### 📊 **Dashboard & Analytics**
- Real-time business metrics and KPIs
- Interactive charts and graphs (Revenue, Orders, Customer Growth)
- Order status distribution with pie charts
- Popular items analysis
- Performance tracking with progress indicators

### 📋 **Order Management**
- Create, view, edit, and track orders
- Order filtering by status (Pending, In Progress, Completed)
- Detailed order information with customer details
- Order timeline and status updates
- Measurements and fabric tracking

### 👥 **User Management**
- Customer and tailor profile management
- Role-based access control (Admin, Tailor, Customer)
- User creation with dynamic form fields
- Profile viewing and editing capabilities
- Professional tailor information (specialization, rates, experience)

### 💬 **Chat System**
- Real-time customer communication
- Separate conversations for each customer
- Online/offline status indicators
- Unread message counters
- Automatic customer responses (demo)

### 🧵 **Measurements & Fabric**
- Fabric inventory management
- Stock tracking and low-stock alerts
- Measurement templates for different garments
- Custom measurement recording

### 💳 **Payment Tracking**
- Revenue monitoring
- Payment status tracking
- Transaction history
- Invoice generation capabilities

### ⭐ **Reviews & Ratings**
- Customer feedback system
- Rating analytics
- Review management
- Response tracking

### 🔔 **Notifications**
- Push notification support
- Order status updates
- Payment confirmations
- Stock alerts
- Firebase Cloud Messaging integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Firestore, Authentication, Cloud Messaging)
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd tailor-management-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

   If you encounter dependency conflicts, try:
   \`\`\`bash
   npm install --legacy-peer-deps
   # or
   npm install --force
   \`\`\`

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Firebase Configuration (Client-side)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Firebase Admin (Server-side)
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
   FIREBASE_VAPID_KEY=your_vapid_key
   \`\`\`

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Generate service account key for admin operations
   - Enable Cloud Messaging for notifications

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

### Test Accounts

The system comes with pre-configured test accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | admin@tailorshop.com | admin123456 | Full system access |
| **Tailor** | tailor@tailorshop.com | tailor123456 | Order & customer management |
| **Customer** | customer@tailorshop.com | customer123456 | Limited access |

### Creating Test Users

1. Visit `/setup` to create test users
2. Or use the "Add New User" feature in the User Management section

## 📱 Features Overview

### Dashboard Modules

1. **📊 Dashboard** - Business overview and analytics
2. **🛍️ Orders** - Order management and tracking
3. **👥 Users** - Customer and tailor management
4. **📏 Measurements & Fabric** - Inventory and templates
5. **💬 Chat** - Customer communication
6. **💳 Payments** - Financial tracking
7. **⭐ Reviews** - Customer feedback
8. **📈 Analytics** - Detailed reports
9. **🔔 Notifications** - Alert management

### Order Workflow

\`\`\`
📝 Order Created → 📏 Measuring → 🧵 In Progress → ✅ Completed → 🚚 Delivered
\`\`\`

### User Roles & Permissions

- **👑 Admin**: Full system access, user management, analytics
- **✂️ Tailor**: Order management, customer communication, measurements
- **👤 Customer**: Order tracking, chat, profile management

## 🔧 Configuration

### Firebase Rules

**Firestore Security Rules:**
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

### Notification Setup

1. Add `firebase-messaging-sw.js` to your public folder
2. Configure VAPID keys in Firebase Console
3. Set up Cloud Messaging in your Firebase project

## 📦 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests (when configured)

# Deployment
npm run deploy       # Deploy to Vercel
\`\`\`

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`

2. **Set Environment Variables**
   Add all environment variables in Vercel dashboard

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Manual Deployment

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Deploy the `.next` folder** to your hosting provider

## 🔍 Troubleshooting

### Common Issues

**1. Dependency Conflicts**
\`\`\`bash
npm install --legacy-peer-deps
# or
rm -rf node_modules package-lock.json
npm install
\`\`\`

**2. Firebase Connection Issues**
- Verify environment variables
- Check Firebase project settings
- Ensure Firestore rules allow access

**3. Build Errors**
- Clear Next.js cache: `rm -rf .next`
- Restart development server
- Check for TypeScript errors

**4. Notification Issues**
- Verify VAPID key configuration
- Check browser notification permissions
- Ensure service worker is registered

### Environment Variables Check

Visit `/api/test-firebase` to verify your Firebase configuration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Recharts](https://recharts.org/) - Chart library
- [Lucide](https://lucide.dev/) - Icons


---

**Made with ❤️ for the tailoring community**

## 🗺️ Roadmap

### Upcoming Features

- [ ] **Mobile App** (React Native)
- [ ] **Inventory Management** (Advanced)
- [ ] **Multi-language Support**
- [ ] **Advanced Analytics** (AI-powered insights)
- [ ] **Appointment Scheduling**
- [ ] **Photo Upload** (Progress tracking)
- [ ] **Barcode Scanning**
- [ ] **Integration APIs** (Accounting software)
- [ ] **Offline Mode** (PWA)
- [ ] **Advanced Reporting** (PDF exports)

### Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added chat system and notifications
- **v1.2.0** - Enhanced user management and profiles
- **v1.3.0** - Real-time Firebase integration

---
