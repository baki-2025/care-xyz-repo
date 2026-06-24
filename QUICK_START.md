# Quick Start Guide - Care.xyz

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Update `.env.local` with Your Credentials
```bash
# Update these values:
GOOGLE_CLIENT_ID=your-value
GOOGLE_CLIENT_SECRET=your-value
MONGODB_URI=your-mongodb-url
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
STRIPE_PUBLIC_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
NEXTAUTH_SECRET=your-generated-secret
```

### 3. Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Copy the output and paste in `.env.local` as `NEXTAUTH_SECRET`

### 4. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

---

## 🧪 Quick Test Flow

1. **Register**: Go to `/register` and create an account
2. **Login**: Go to `/login` and sign in
3. **Browse Services**: Home page shows available services
4. **Book Service**: Click on a service and complete the booking form
5. **View Bookings**: Go to `/my-bookings` to see your bookings
6. **Admin Dashboard**: Go to `/admin` (requires admin role)

---

## 📦 Project Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint

# Database
# Use MongoDB Compass to connect to your MONGODB_URI
```

---

## 🔧 Environment Variables Checklist

```env
✓ NEXTAUTH_URL=http://localhost:3000
✓ NEXTAUTH_SECRET=<generated-secret>
✓ GOOGLE_CLIENT_ID=<from Google Cloud Console>
✓ GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
✓ MONGODB_URI=<your MongoDB connection string>
✓ EMAIL_SERVER_HOST=smtp.gmail.com
✓ EMAIL_SERVER_PORT=587
✓ EMAIL_SERVER_USER=<your Gmail>
✓ EMAIL_SERVER_PASSWORD=<Gmail app password>
✓ STRIPE_PUBLIC_KEY=pk_test_<your-key>
✓ STRIPE_SECRET_KEY=sk_test_<your-key>
✓ CLIENT_URL=http://localhost:3000
```

---

## 🚀 Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then redeploy
vercel --prod
```

---

## 📱 Available Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Public | Home page with services overview |
| `/register` | Public | User registration |
| `/login` | Public | User login |
| `/service/:id` | Public | Service details |
| `/booking/:id` | Private | Book a service |
| `/my-bookings` | Private | View user's bookings |
| `/profile` | Private | User profile |
| `/admin` | Private/Admin | Admin dashboard |

---

## 💡 Test Stripe Payments

Use these test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any expiry date in future
- Any CVC

---

## ❌ Common Issues

**"Cannot find module"**
→ Run `npm install`

**"env variables not loading"**
→ Restart dev server after changing `.env.local`

**"Email not sending"**
→ Check EMAIL credentials, enable Less Secure Apps for Gmail

**"MongoDB connection error"**
→ Verify MONGODB_URI, check IP whitelist in Atlas

**"Google OAuth fails"**
→ Verify redirect URIs in Google Cloud Console

---

## 📖 Documentation

Full setup guide: See `SETUP_COMPLETE.md`
Project structure: Check folder organization above
API reference: See `SETUP_COMPLETE.md` > API Endpoints

---

**Status**: ✅ Ready to use!

Start the dev server and explore the platform.
