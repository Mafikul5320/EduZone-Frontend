# Frontend Authentication & API Fix

## 🔧 Issues Fixed

### 1. Auth Client Configuration
**Problem**: Auth client was using frontend URL (`NEXT_PUBLIC_APP_URL`) instead of backend URL.

**Fixed**:
```typescript
// Before (WRONG):
baseURL: env.NEXT_PUBLIC_APP_URL ? env.NEXT_PUBLIC_APP_URL : "/api/auth"
// This was pointing to http://localhost:3000/api/auth

// After (CORRECT):
baseURL: env.NEXT_PUBLIC_BACKEND_URL 
    ? `${env.NEXT_PUBLIC_BACKEND_URL}/api/auth`
    : "http://localhost:5000/api/auth"
// Now points to http://localhost:5000/api/auth (backend)
```

### 2. Environment Variables
**Changed to use local development URLs** by default:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000  # Backend API
NEXT_PUBLIC_APP_URL=http://localhost:3000       # Frontend
```

### 3. Fetch Options
**Added proper headers**:
```typescript
fetchOptions: { 
    credentials: "include",  // Important for cookies
    headers: {
        "Content-Type": "application/json",
    }
}
```

---

## ✅ What You Need to Do

### Step 1: Restart Frontend Development Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
pnpm dev
```

### Step 2: Clear Browser Data (Important!)

1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Under **Storage**, click **Clear site data**
4. Or manually:
   - **Cookies**: Delete all cookies for `localhost:3000`
   - **Local Storage**: Clear all
   - **Session Storage**: Clear all

### Step 3: Test Authentication Flow

1. **Register a new user**:
   - Go to `/register` or signup page
   - Fill in details
   - Submit

2. **Check Network Tab**:
   - Request should go to `http://localhost:5000/api/auth/sign-up`
   - NOT `http://localhost:3000/api/auth/sign-up`

3. **Login**:
   - Go to `/login`
   - Use credentials
   - Should redirect to dashboard

4. **Check Cookie**:
   - Open DevTools → Application → Cookies
   - Should see `better-auth.session_token` for `localhost:5000`

---

## 🐛 Common Issues & Solutions

### Issue 1: Still getting CORS errors

**Symptom**: 
```
Access to fetch at 'https://assignment-4-frontend-red.vercel.app/api/auth/get-session' 
from origin 'http://localhost:3000' has been blocked by CORS
```

**Solution**: You're still using production URLs. Make sure:
1. `.env` has local URLs uncommented
2. You restarted the dev server
3. You cleared browser cache

### Issue 2: "No session found"

**Check List**:
- ✅ Backend server is running on port 5000
- ✅ Frontend is making requests to `localhost:5000/api/auth/*`
- ✅ Browser is sending cookies (check DevTools → Network → Request Headers)
- ✅ Cookie name is `better-auth.session_token`

**Debug**:
```typescript
// In browser console:
console.log(document.cookie); // Should show session token
```

### Issue 3: 404 on `/api/auth/*`

**Solution**: This means frontend is trying to use its own `/api/auth` route.
- Make sure `auth-client.ts` has the correct `baseURL`
- Restart frontend server
- Clear browser cache

### Issue 4: Image 404 errors

**Symptom**:
```
GET http://localhost:3000/api/placeholder/400/400 404 (Not Found)
```

**This is a separate issue** - add placeholder image or update image sources.

### Issue 5: Hydration mismatch warnings

**These are React warnings** - not related to auth. They won't break functionality but should be fixed:
- Check for `Date.now()` or `Math.random()` in components
- Make sure server and client render the same HTML

---

## 📋 Environment Variable Reference

### Development (Local)
```env
# Backend API endpoint
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Frontend URL
APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth endpoint (backend + /api/auth)
AUTH_URL=http://localhost:5000/api/auth
```

### Production (Vercel)
```env
# Backend API endpoint (your deployed backend)
BACKEND_URL=https://your-backend.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend.vercel.app

# Frontend URL (your deployed frontend)
APP_URL=https://your-frontend.vercel.app
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app

# Auth endpoint
AUTH_URL=https://your-backend.vercel.app/api/auth
```

---

## 🧪 Testing Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Register new user works
- [ ] Login works
- [ ] Session persists on page refresh
- [ ] Protected routes redirect when not logged in
- [ ] Dashboard loads with user data
- [ ] Logout works
- [ ] Network tab shows requests going to `:5000/api/auth/*`
- [ ] Cookies are set and sent with each request

---

## 🚀 Deployment to Vercel

### Backend Deployment

1. **Update Backend `.env` in Vercel**:
```env
APP_URL=https://your-backend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app
PROD_FRONTEND_URL=https://your-frontend.vercel.app
```

2. **Redeploy backend**

### Frontend Deployment

1. **Update Frontend `.env` in Vercel**:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.vercel.app
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
BACKEND_URL=https://your-backend.vercel.app
AUTH_URL=https://your-backend.vercel.app/api/auth
```

2. **Redeploy frontend**

### Important Notes for Production:

1. **Cookie Settings**: Backend automatically uses `secure: true` and `sameSite: "none"` in production
2. **CORS**: Backend allows all `*.vercel.app` domains
3. **HTTPS**: Both frontend and backend MUST be on HTTPS (Vercel does this automatically)

---

## 📝 Key Files Changed

1. `src/lib/auth-client.ts` - Fixed auth client baseURL
2. `.env` - Changed to local development URLs
3. `.env.example` - Added for reference

---

## 💡 Understanding the Flow

### Registration/Login:
```
Frontend (localhost:3000)
    ↓ POST
Backend (localhost:5000/api/auth/sign-in)
    ↓ Sets cookie: better-auth.session_token
    ↓ Returns: user data
Frontend stores user in state
```

### Protected Routes:
```
User visits /dashboard
    ↓
Frontend checks session (authClient.getSession())
    ↓ GET localhost:5000/api/auth/get-session
    ↓ Sends cookie: better-auth.session_token
Backend validates session
    ↓ Returns: user data
Frontend allows access
```

### API Calls:
```
Frontend makes API call
    ↓ GET/POST localhost:5000/api/v1/student/dashboard
    ↓ Browser automatically sends cookie
Backend middleware checks session
    ↓ Validates cookie
    ↓ Returns: protected data
```

---

## ✨ Summary

**Main Problem**: Frontend was trying to authenticate against itself (`localhost:3000/api/auth`) instead of the backend (`localhost:5000/api/auth`).

**Solution**: Updated `auth-client.ts` to use `NEXT_PUBLIC_BACKEND_URL` for authentication endpoints.

**Result**: All auth requests now correctly go to the backend server where better-auth is configured.

---

All fixes are complete! Restart your frontend server and test the authentication flow. 🎉
