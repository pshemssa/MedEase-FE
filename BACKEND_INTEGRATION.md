# Backend Integration Guide

This document outlines the backend integration setup for the MedSystem application.

## Overview

The application has been integrated with the backend API at `https://medsystemapplication.onrender.com/`. The integration follows a step-by-step approach, starting with core services and gradually migrating components.

## Architecture

### API Client (`src/lib/api-client.ts`)
- Centralized HTTP client for all backend communication
- Handles authentication tokens automatically
- Provides consistent error handling
- Supports GET, POST, PUT, DELETE methods

### Service Layer
- **Auth Service** (`src/lib/auth-service.ts`): Handles authentication operations
- **Queue Service** (`src/lib/queue-service.ts`): Manages queue-related operations

### API Routes (`src/app/api/`)
Next.js API routes act as a proxy layer between frontend components and the backend:
- `/api/auth/login` - User authentication
- `/api/queue/join` - Join patient queue
- `/api/queue/position` - Get queue position
- `/api/queue` - Get queue list
- `/api/queue/status/[id]` - Update queue status

## Environment Configuration

The backend URL is configured in `.env.local`:
```
NEXT_PUBLIC_API_URL=https://medsystemapplication.onrender.com
```

## Integrated Features

### ✅ Authentication
- Login functionality integrated with backend
- Token management handled automatically
- Ready for registration, password reset, and OTP verification

### ✅ Queue Management
- Patient queue joining integrated
- Queue position tracking
- Queue status updates (waiting, in-consultation, completed)
- Doctor queue view integrated

## Usage Examples

### Using Auth Service
```typescript
import { authService } from '@/lib/auth-service';

// Login
const result = await authService.login({ email, password });
if (result.success) {
  // Token is automatically stored
  console.log(result.data.user);
}

// Logout
await authService.logout();
```

### Using Queue Service
```typescript
import { queueService } from '@/lib/queue-service';

// Join queue
const result = await queueService.joinQueue({
  clinic: 'City Medical Center',
  department: 'General Medicine',
  doctor: 'Dr. Smith'
});

// Get position
const positionResult = await queueService.getPosition(queueId);

// Get queue list
const queueResult = await queueService.getQueue(doctorId, 'waiting');
```

### Direct API Client Usage
```typescript
import { apiClient, API_ENDPOINTS } from '@/lib/api-client';

// Make authenticated request
const response = await apiClient.get(API_ENDPOINTS.PATIENTS.LIST);

// Make unauthenticated request
const response = await apiClient.post(
  API_ENDPOINTS.AUTH.LOGIN,
  { email, password },
  false // Don't include auth token
);
```

## Next Steps

The following features can be integrated next:

1. **Patient Management**
   - Create/update patient records
   - Fetch patient list
   - Patient profile management

2. **Prescriptions**
   - Create prescriptions
   - View prescription history
   - Update prescription status

3. **Medical Records**
   - Request medical records
   - View medical history
   - Download reports

4. **Additional Features**
   - User registration
   - Password reset flow
   - OTP verification
   - Profile management

## Error Handling

All API calls include error handling:
- Network errors are caught and returned with user-friendly messages
- HTTP errors are parsed and returned with appropriate status codes
- Components can check `success` flag and display `error` messages

## Testing

To test the integration:
1. Ensure `.env.local` has the correct backend URL
2. Start the development server: `npm run dev`
3. Test login with valid credentials
4. Test queue joining and position tracking
5. Monitor browser console for any API errors

## Notes

- The integration maintains backward compatibility with localStorage for fallback scenarios
- API routes act as a proxy to handle CORS and add additional security
- Authentication tokens are stored in localStorage (consider httpOnly cookies for production)
- All API endpoints are defined in `API_ENDPOINTS` constant for easy maintenance
