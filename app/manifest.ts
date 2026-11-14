// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hassan Digital Skills',
    short_name: 'HDS',
    description:
      'Learn AI, Social Media Marketing & Crypto Trading with live mentorship. Rs. 25,000 value — yours for Rs. 200.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0B1220',
    theme_color: '#3495EB',
    icons: [
      {
        src: '/icon-192.jpg',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.jpg',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-512.jpeg',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable', // Android adaptive icons ke liye
      },
    ],
    shortcuts: [
      {
        name: 'Enroll Now',
        url: '/enroll',
        description: 'Secure your seat in Batch 18',
      },
      {
        name: 'Mentorships',
        url: '/mentorships',
        description: 'Explore all 3 mentorships',
      },
    ],
    categories: ['education', 'productivity'],
  }
}