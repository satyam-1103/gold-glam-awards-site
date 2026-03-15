

# Influencer Awards Night 2026 — Single-Page Event Website

## Overview
A premium, high-converting single-page website with a black & gold luxury theme, red-carpet inspired design, smooth animations, and mobile-first responsive layout.

## Design System
- **Colors**: Black background, gold (#FFD700) accents, white text, subtle red-carpet gradients
- **Typography**: Modern serif for headings (Playfair Display), clean sans-serif for body (Inter)
- **Style**: Luxury feel with gold borders, shimmer effects, glass-morphism cards

## Sections (in order)

### 1. Hero Section
- Full-screen banner with red carpet gradient background and subtle particle/shimmer animation
- Event title "Influencer Awards Night 2026" with gold text
- Subheading and 3 CTA buttons (Register as Influencer, Become a Sponsor, Vendor Registration) — each scrolls to its respective form
- 4 highlight badges: Red Carpet Entry, Media Coverage, Brand Networking, After Party & DJ Night
- Organizer info and contact at bottom of hero

### 2. Countdown Timer
- Live countdown to May 30, 2026
- Days/Hours/Minutes/Seconds display with gold styling
- "Limited nominations open" text

### 3. About the Event
- Rich description of the event with elegant typography
- 4 icon cards: Influencers, Brands, Media, Entrepreneurs

### 4. Event Highlights
- 6 icon cards in a grid: Red Carpet Entry, Award Ceremony, Professional Photography, Influencer Interviews, Brand Networking, DJ Night After Party

### 5. Award Categories
- Tabbed or accordion layout with 4 groups: Main, Content Creator, Entertainment, Professional Creator
- Each category card shows the 4 tiers (Nano/Micro/Macro/Mega) with follower ranges
- Special Awards section with distinct gold styling

### 6. Influencer Registration Form
- All specified fields including category dropdown, tier selection, file upload (profile screenshot), and text areas
- Client-side validation with Zod
- Toast confirmation on submission
- Data stored locally (in-state) with option to export

### 7. Sponsor Registration Form
- All specified fields including sponsorship type dropdown, logo upload
- Validation and confirmation

### 8. Sponsorship Opportunities
- 4 tier cards (Title, Gold, Category, Supporting) with descriptions
- "Download Sponsor Deck" button that downloads a generated PDF

### 9. Vendor Registration Form
- All specified fields including service type dropdown, portfolio upload
- Validation and confirmation

### 10. Gallery Section
- Placeholder grid with "Coming Soon" overlay for future photos/videos

### 11. Contact Section
- Organizer details, phone, website
- WhatsApp button linking to wa.me/919205600437

### 12. Footer
- Quick Links, Privacy Policy, Terms of Participation
- Social media icon links (placeholder)
- Copyright text

## Technical Notes
- All forms store submissions in local state (no backend initially — can add Supabase later for persistence and admin dashboard)
- Sponsor deck PDF generated client-side or linked as a static asset
- Smooth scroll navigation between sections
- Intersection Observer animations for scroll-triggered entrances
- Mobile-responsive throughout
- SEO meta tags in index.html

