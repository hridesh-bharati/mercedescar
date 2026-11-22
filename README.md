<div align="center">

<img src="public/mercedes-logo.png" alt="Mercedes Garage Dubai Logo" width="120" />

# 🏎️ Mercedes Garage Dubai

### Specialist Mercedes-Benz Service & Upgrade Platform

[![Live Website](https://img.shields.io/badge/🌐_Live-mercedesgaragedubai.com-000000?style=for-the-badge)](https://www.mercedesgaragedubai.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#-license)

**A full-stack Next.js application for an independent luxury Mercedes-Benz workshop in Al Quoz, Dubai.**

[Live Site](https://www.mercedesgaragedubai.com) · [Report a Bug](https://github.com/hridesh-bharati/mercedescar/issues) · [Request a Feature](https://github.com/hridesh-bharati/mercedescar/issues)

</div>

---

## 📸 Screenshots

> _Replace the paths below with actual screenshots in a `/screenshots` folder._

| Landing Page | Services Page |
|:---:|:---:|
| ![Homepage](screenshots/homepage.png) | ![Services](screenshots/services.png) |

| Car Class Directory | Body Kits Catalog |
|:---:|:---:|
| ![Car Classes](screenshots/car-classes.png) | ![Body Kits](screenshots/body-kits.png) |

---

## 📖 About

**Mercedes Garage Dubai (German Auto Expert)** is an independent luxury automotive workshop located in Al Quoz, Dubai, UAE, specializing in Mercedes-Benz diagnostics, maintenance, body kits, facelifts, and custom upgrades.

This repository contains the full-stack Next.js platform powering the business website — from service listings and car-class directories to online booking and lead capture.

---

## ✨ Key Features

- **🚗 Service & Car-Class Divisions** — Dedicated dynamic pages for Mercedes-Benz classes (`G-Class`, `S-Class`, `C-Class`, `E-Class`, `AMG`, and more) alongside an `/all` overview directory.
- **🔧 Body Kits & Upgrades Catalog** — Dynamic routing for AMG Body Kits, Mercedes Facelifts, and Custom Upgrades backed by Firebase Realtime Database.
- **📅 Online Service Booking & Lead Capture** — Interactive appointment forms with validation, real-time Firebase submission, and instant WhatsApp (`wa.me`) and call (`tel:`) lead buttons.
- **🔍 Technical SEO & Structured Data**
  - Dynamic `generateMetadata` with canonical URLs, Open Graph, and Twitter Cards.
  - Rich JSON-LD `@graph` schemas: `AutoRepair`, `BreadcrumbList`, `ItemList`, `Service`, `FAQPage`.
- **⚡ Performance & Accessibility**
  - Next.js Image optimization (`AVIF` / `WebP`), responsive `sizes`, `priority` LCP loading, and long-term static caching.
  - WCAG-compliant color contrast, semantic heading hierarchy, keyboard/screen-reader accessibility.
- **📊 Analytics & Conversion Tracking** — GA4 with automatic pageview tracking and `beacon`-based event tracking for WhatsApp and phone-call conversions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 19, Bootstrap 5, Lucide React |
| **Backend & Database** | Firebase Realtime Database, Next.js API Routes |
| **Media & CDN** | Cloudinary, Next.js Image Optimization |
| **Analytics** | Google Analytics 4 (GA4) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** / **yarn** / **pnpm**
- Firebase project with Realtime Database enabled
- Cloudinary account (for media)
- GA4 property ID

### Installation

```bash
# Clone the repository
git clone https://github.com/hridesh-bharati/mercedescar.git
cd mercedescar

# Install dependencies
npm install
# or: yarn install / pnpm install
