# Onam Unplugged Admin

A Nuxt.js admin dashboard for managing QR code scans for the Onam Unplugged event.

## Features

- **Dynamic QR Code Scanning**: Visit `/scan/[id]` to scan QR codes
- **Visitor Management**: Track visitor status and scan counts
- **Real-time API Integration**: Calls API on page mount to get visitor data
- **Responsive Design**: Built with Tailwind CSS for mobile-first design

## Project Structure

```
├── pages/
│   ├── index.vue          # Dashboard with test links
│   ├── qr-code.vue        # QR scanner page (placeholder)
│   └── scan/
│       └── [id].vue       # Dynamic QR scan page
├── composables/
│   └── useVisitorApi.ts   # API composable for visitor operations
├── server/
│   └── api/
│       └── visitors/
│           └── scan/
│               └── [id].post.ts  # Mock API endpoint
└── assets/
    └── css/
        └── main.css       # Tailwind CSS imports
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Configuration

The application is configured to use the API base URL: `https://api.cartiquestore.com`

The scan page (`/scan/[id]`) automatically calls the API when mounted:

- **URL Pattern**: `/scan/[id]` where `[id]` is the QR code identifier
- **API Endpoint**: `POST https://api.cartiquestore.com/api/visitors/scan/[id]`
- **Response**: Returns visitor data including scan count and status

### API Base URL Configuration

The API base URL is configured in `nuxt.config.ts` and can be accessed via runtime config:

```typescript
runtimeConfig: {
  public: {
    apiBaseUrl: 'https://api.cartiquestore.com'
  }
}
```

### Test URLs

- `/scan/qr123` - New visitor (first scan)
- `/scan/qr456` - Existing visitor (multiple scans)
- `/scan/invalid` - Invalid QR code (404 error)

## API Response Format

```json
{
  "visitor": {
    "qrId": "qr123",
    "name": "John Doe",
    "status": "checked-in",
    "scanCount": 1,
    "lastScannedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Key Features of the Scan Page

- **Loading State**: Shows spinner while API call is in progress
- **Error Handling**: Displays appropriate error messages for failed scans
- **Success State**: Shows visitor information with scan count badge
- **Multiple Scan Detection**: Warns when QR code has been scanned multiple times
- **Status Tracking**: Displays visitor status with color-coded indicators
- **Navigation**: Easy return to dashboard

## Technologies Used

- **Nuxt.js 3**: Vue.js framework with SSR capabilities
- **Vue.js**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Nitro**: Server engine for API routes

## Development Notes

- The API composable (`useVisitorApi.ts`) handles all visitor-related API calls
- Mock data is provided in the server API for demonstration
- All pages are responsive and follow a consistent design system
- Error handling is implemented for network failures and invalid QR codes
