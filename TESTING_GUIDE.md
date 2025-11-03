# Testing Firebase Authentication

## Quick Start Testing Guide

Your dev server is running at: **http://localhost:3000**

## Test Scenarios

### ✅ Scenario 1: Browse Without Login
1. Open http://localhost:3000
2. Navigate through homepage, shop page
3. View product details
4. Add items to cart
5. ✅ **Expected**: You can browse freely without being prompted to login

### ✅ Scenario 2: Buy Now Requires Login
1. Go to any product page (e.g., http://localhost:3000/product/1)
2. Select a size
3. Click **"Buy Now"** button
4. ✅ **Expected**: "LET'S GET RARE!" modal appears asking you to login

### ✅ Scenario 3: Register New Account
1. When login modal appears, click **"Create Account"** at the bottom
2. Enter:
   - Full Name: Test User
   - Email: test@example.com
   - Password: test123 (minimum 6 characters)
3. Click **"Create Account"**
4. ✅ **Expected**: 
   - Modal closes
   - You're redirected to checkout
   - Navbar shows user icon/photo
   - Click user icon to see dropdown menu

### ✅ Scenario 4: Login with Email
1. Click user icon in navbar and logout
2. Go to product page and click "Buy Now"
3. Enter your registered email and password
4. Click **"Sign In"**
5. ✅ **Expected**: Logged in successfully, redirected to checkout

### ✅ Scenario 5: Google Sign-In
1. In login modal, click **"Continue with Google"**
2. Choose a Google account
3. ✅ **Expected**: 
   - Instant login
   - Modal closes
   - Your Google profile photo appears in navbar
   - Name and email populated

### ✅ Scenario 6: Phone Number UI (Backend Pending)
1. In login modal, click **"Phone"** tab
2. Select country code (+91 for India)
3. Enter phone number
4. Click **"Continue"**
5. ⚠️ **Expected**: "Phone authentication coming soon!" message
   - UI is ready, Firebase Phone Auth needs backend setup

### ✅ Scenario 7: User Dropdown Menu
1. After logging in, click your profile icon in navbar (top-right)
2. ✅ **Expected**: Dropdown menu shows:
   - Your name and email
   - My Profile
   - My Orders
   - Wishlist
   - Logout button

### ✅ Scenario 8: Checkout Requires Login
1. Logout if logged in
2. Add items to cart
3. Go to cart and click "Proceed to Checkout"
4. ✅ **Expected**: Login modal appears automatically

### ✅ Scenario 9: Pre-filled User Details
1. Login with any method
2. Go to checkout page
3. ✅ **Expected**: 
   - Name field pre-filled with your display name
   - Email field pre-filled with your email
   - Phone field pre-filled (if available)

### ✅ Scenario 10: Session Persistence
1. Login with any method
2. Refresh the page (F5)
3. ✅ **Expected**: You remain logged in
4. Close browser and reopen
5. ✅ **Expected**: Still logged in (session persists)

### ✅ Scenario 11: Logout
1. Click user icon in navbar
2. Click **"Logout"** button
3. ✅ **Expected**:
   - Redirected to homepage
   - User icon changes to login button
   - Can no longer access checkout without login

### ✅ Scenario 12: Mobile Responsive
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Choose iPhone or Android device
4. Test login modal appearance
5. ✅ **Expected**:
   - Modal is centered and responsive
   - Buttons properly sized
   - Text readable on small screens
   - User menu accessible from hamburger menu

## Firebase Console Verification

### Check User Registration:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **rarerabbit-a412f**
3. Go to **Authentication** > **Users** tab
4. ✅ **Expected**: See newly registered users listed

### Check Authentication Methods:
1. In Firebase Console > Authentication
2. Go to **Sign-in method** tab
3. ✅ **Verify**:
   - ✅ Email/Password: Enabled
   - ✅ Google: Enabled
   - ⚠️ Phone: Needs setup (optional)

## Common Issues & Fixes

### Issue: "Firebase: Error (auth/popup-blocked)"
**Fix**: Allow popups in browser settings for localhost:3000

### Issue: "Firebase: Error (auth/email-already-in-use)"
**Fix**: Use a different email or login with existing credentials

### Issue: "Firebase: Error (auth/invalid-email)"
**Fix**: Enter a valid email format (user@example.com)

### Issue: "Firebase: Error (auth/weak-password)"
**Fix**: Use password with at least 6 characters

### Issue: Modal doesn't appear
**Fix**: 
1. Check browser console for errors
2. Ensure Firebase config is correct in `lib/firebase-config.ts`
3. Verify internet connection (Firebase needs internet)

### Issue: Google Sign-In not working
**Fix**:
1. Enable Google provider in Firebase Console
2. Add authorized domains in Firebase Console
3. Check popup blockers

## Browser Console Logs

To debug, open Browser DevTools (F12) and check:

```javascript
// Should see Firebase initialization
Firebase App initialized

// When login modal opens
Auth modal opened

// On successful login
Firebase user logged in: {email: "...", uid: "..."}

// On logout
User logged out successfully
```

## Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Email/Password Login | ✅ Working | Full registration and login |
| Google Sign-In | ✅ Working | OAuth popup integration |
| Phone Auth UI | ✅ Ready | Backend needs Firebase Phone setup |
| Optional Login | ✅ Working | Only required for checkout/buy |
| User Session | ✅ Working | Persists across refreshes |
| User Dropdown | ✅ Working | Profile, orders, wishlist, logout |
| Pre-filled Forms | ✅ Working | Checkout auto-fills user data |
| Mobile Responsive | ✅ Working | Modal + navbar optimized |
| Password Reset | ✅ Implemented | Use `resetPassword(email)` |
| Logout | ✅ Working | Clears session properly |

## Next Steps

1. **Enable Email Verification** (Optional):
   - Firebase Console > Authentication > Templates
   - Customize verification email template

2. **Setup Phone Authentication** (Optional):
   - Enable Phone provider in Firebase Console
   - Add reCAPTCHA verification
   - Implement OTP verification flow

3. **Production Deployment**:
   - Move Firebase config to environment variables
   - Update authorized domains in Firebase Console
   - Enable rate limiting and security rules

4. **Analytics**:
   - Track login success/failure rates
   - Monitor authentication methods usage
   - Analyze user registration funnel

---

**Happy Testing! 🎉**

For any issues, check:
- Browser Console (F12)
- Firebase Console Logs
- Network Tab for failed requests
