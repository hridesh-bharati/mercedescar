# Mercedes Garage Dubai — Specialist Mercedes-Benz Service & Upgrade Platform

A full-stack Next.js web application built for **Mercedes Garage Dubai (German Auto Expert)**, an independent luxury automotive workshop in Al Quoz, Dubai specializing in Mercedes-Benz diagnostics, maintenance, body kits, facelifts, and custom upgrades.

**Live Website:** [https://www.mercedesgaragedubai.com](https://www.mercedesgaragedubai.com)  
**Repository:** [https://github.com/hridesh-bharati/mercedescar](https://github.com/hridesh-bharati/mercedescar)

---

## Key Features

- **Service & Car-Class Divisions:** Dedicated dynamic pages for Mercedes-Benz classes (`G-Class`, `S-Class`, `C-Class`, `E-Class`, `AMG`, and more) alongside an `/all` overview directory.
- **Body Kits & Upgrades Catalog:** Dynamic routing for AMG Body Kits, Mercedes Facelifts, and Custom Upgrades backed by Firebase Realtime Database.
- **Online Service Booking & Lead Capture:** Interactive appointment booking forms with validation, real-time submission to Firebase, and instant WhatsApp (`wa.me`) and direct call (`tel:`) lead buttons.
- **Technical SEO & Structured Data:**
  - Dynamic `generateMetadata` with canonical URLs, Open Graph, and Twitter Cards.
  - Rich JSON-LD `@graph` schemas (`AutoRepair`, `BreadcrumbList`, `ItemList`, `Service`, and `FAQPage`).
- **Performance & Accessibility Optimized:**
  - Next.js Image optimization (`AVIF` / `WebP`), responsive `sizes`, `priority` LCP loading, and long-term static asset caching.
  - WCAG-compliant color contrast, semantic heading hierarchy, and keyboard/screen-reader accessibility.
- **Analytics & Conversion Tracking:** Integrated Google Analytics 4 (`GA4`) with automatic pageview tracking and `beacon`-based event tracking for WhatsApp and phone call conversions.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19, Bootstrap 5, Lucide React
- **Backend & Database:** Firebase Realtime Database, Next.js API Routes
- **Media Optimization & CDN:** Cloudinary, Next.js Image Optimization
- **Analytics:** Google Analytics 4 (GA4)
- **Deployment:** Vercel

---

## Project Structure

```text
src/
├── app/
│   ├── api/                  # Newsletter & backend API endpoints
│   ├── body-kits/            # AMG body kits, facelifts & custom upgrade routes
│   ├── car-class/
│   │   └── [className]/      # Dynamic car-class pages (SSR + JSON-LD + Client UI)
│   ├── models/               # Mercedes-Benz model directory
│   ├── services/             # Workshop diagnostics & repair services
│   ├── layout.js             # Root layout, global providers & analytics
│   └── page.js               # Landing page
├── components/
│   ├── layout/               # Header, Footer & navigation components
│   └── providers/            # Scroll animation & analytics trackers
└── services/
    └── dbService.js          # Firebase database abstraction layer
