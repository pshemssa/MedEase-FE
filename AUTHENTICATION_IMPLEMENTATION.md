# Authentication & Role-Based Access Control Implementation

## Overview

This document outlines the authentication and role-based access control implementation for the MedSystem application.

## Features Implemented

### ✅ 1. Authentication Middleware (`src/lib/auth-middleware.ts`)
- **Route Protection**: Only authenticated users can access protected routes
- **Role-Based Access**: Users are redirected based on their role (patient, doctor, pharmacist, admin)
- **User State Management**: Centralized authentication state management
- **Helper Functions**: Utilities for checking authentication status and user roles

### ✅ 2. Protected Route Component (`src/components/auth/ProtectedRoute.tsx`)
- **Client-Side Protection**: Wraps protected pages/components
- **Role Checking**: Validates user roles before allowing access
- **Automatic Redirects**: Redirects unauthenticated users to login
- **Loading States**: Shows loading indicator while checking authentication

### ✅ 3. Updated Login Flow (`src/components/auth/LoginForm.tsx`)
- **Backend Integration**: Calls backend API for authentication
- **User Data Storage**: Stores user data including role in localStorage
- **Role-Based Redirects**: Automatically redirects users to their dashboard based on role:
  - `patient` → `/patientDashboard/dashboard`
  - `doctor` → `/doctorDashboard`
  - `pharmacist` → `/pharmacy`
  - `admin` → `/admin`
- **Error Handling**: Displays user-friendly error messages

### ✅ 4. Patient Dashboard Integration (`src/app/patientDashboard/dashboard/page.tsx`)
- **Real Data Fetching**: Fetches patient data from backend API
- **Profile Display**: Shows patient credentials including:
  - Name
  - Email
  - Phone
  - Date of Birth
  - Insurance Provider
  - **Reference Number** (auto-generated if not provided)
- **Prescriptions**: Displays patient prescriptions from backend
- **Allergies**: Shows patient allergies
- **Chronic Diseases**: Displays chronic disease information
- **Medical History**: Shows medical history records
- **Fallback Support**: Uses localStorage data if backend is unavailable

### ✅ 5. Patient Service (`src/lib/patient-service.ts`)
- **Profile Fetching**: Gets patient profile from backend
- **Prescriptions**: Retrieves patient prescriptions
- **Allergies**: Fetches allergy information
- **Chronic Diseases**: Gets chronic disease data
- **Medical History**: Retrieves medical history records
- **Error Handling**: Gracefully handles API failures

### ✅ 6. API Routes
Created Next.js API routes that proxy requests to backend:
- `/api/patients/me` - Get patient profile
- `/api/patients/me/prescriptions` - Get patient prescriptions
- `/api/patients/me/allergies` - Get patient allergies
- `/api/patients/me/chronic-diseases` - Get chronic diseases

### ✅ 7. Route Protection
- **Patient Dashboard Layout**: Protected with `patient` role requirement
- **Doctor Dashboard Layout**: Protected with `doctor` role requirement
- **Automatic Redirects**: Unauthorized users are redirected to appropriate pages

## Reference Number Generation

If a patient doesn't have a reference number from the backend, one is automatically generated:
- Format: `REF-{timestamp}-{userId}`
- Example: `REF-123456-0001`
- Stored in user profile for future reference

## User Flow

1. **Login**:
   - User enters email and password
   - Backend validates credentials
   - User data (including role) is stored in localStorage
   - User is redirected to role-specific dashboard

2. **Dashboard Access**:
   - Protected routes check authentication
   - User role is validated
   - If unauthorized, user is redirected to login or their dashboard

3. **Patient Dashboard**:
   - Fetches patient data from backend
   - Displays profile with reference number
   - Shows prescriptions, allergies, and medical information
   - Falls back to localStorage data if backend unavailable

## Backend API Endpoints Expected

The application expects the following backend endpoints:

### Authentication
- `POST /api/auth/login` - User login
  - Request: `{ email, password }`
  - Response: `{ token, user: { id, email, name, role, ... } }`

### Patient Data
- `GET /api/patients/me` - Get current patient profile
- `GET /api/prescriptions/me` - Get patient prescriptions
- `GET /api/patients/me/allergies` - Get patient allergies
- `GET /api/patients/me/chronic-diseases` - Get chronic diseases

## Error Handling

- **Network Errors**: Gracefully handled with fallback to localStorage
- **Authentication Errors**: Clear error messages displayed to users
- **API Failures**: Dashboard still loads with available data
- **Missing Data**: Default values shown when data is unavailable

## Security Considerations

- **Token Storage**: Currently using localStorage (consider httpOnly cookies for production)
- **Route Protection**: Client-side protection (add server-side validation for production)
- **API Security**: All API calls include authentication tokens
- **Role Validation**: Roles are checked on both client and server side

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should show error)
- [ ] Access patient dashboard as patient (should work)
- [ ] Access doctor dashboard as patient (should redirect)
- [ ] Access patient dashboard without login (should redirect to login)
- [ ] Patient dashboard displays correct user data
- [ ] Reference number is generated if not provided
- [ ] Prescriptions, allergies, and medical info display correctly
- [ ] Dashboard works even if backend is unavailable (fallback)

## Next Steps

1. **Server-Side Validation**: Add server-side route protection
2. **Token Refresh**: Implement token refresh mechanism
3. **Session Management**: Add session timeout handling
4. **Enhanced Security**: Consider httpOnly cookies for token storage
5. **Error Logging**: Add error logging and monitoring
6. **API Documentation**: Document exact backend API endpoints needed
