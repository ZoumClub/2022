// Application-wide constants
export const APP_CONFIG = {
  name: 'AutoMarket',
  description: 'Find Your Perfect Car',
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxVideoSize: 100 * 1024 * 1024, // 100MB
  maxImages: 3,
} as const;

// Media configuration
export const MEDIA_CONFIG = {
  images: {
    maxSize: APP_CONFIG.maxImageSize,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxCount: APP_CONFIG.maxImages,
    bucket: 'car-media',
    folder: 'images',
  },
  videos: {
    maxSize: APP_CONFIG.maxVideoSize,
    allowedTypes: ['video/mp4', 'video/webm'],
    maxCount: 1,
    bucket: 'car-media',
    folder: 'videos',
  },
} as const;

// Route definitions
export const ROUTES = {
  home: '/',
  admin: {
    root: '/admin',
    login: '/admin/login',
    dashboard: '/admin/dashboard',
  },
  sell: '/sell',
} as const;

// API configuration
export const API_CONFIG = {
  baseUrl: '/api',
  version: 'v1',
  timeout: 10000, // 10 seconds
} as const;