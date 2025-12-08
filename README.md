# Charm Frontend

A modern Next.js application designed to facilitate the Charm Money Identities (CMI) assessment. This platform allows users to discover their unique financial personality archetypes through an interactive questionnaire, visualizing the results with dynamic charts and detailed insights.

## Features

- **CMI Assessment Engine**: An interactive, multi-step questionnaire designed to analyze financial behaviors and attitudes.
- **Dynamic Result Visualization**: Detailed breakdown of personality traits using Recharts (Radar Charts) to map users against 8 distinct archetypes (e.g., The Reflectors, The Builders, The Idealists).
- **Internationalization (i18n)**: Full multi-language support for English, Japanese, and Chinese using next-intl.
- **Authentication**: Secure user login and signup flows powered by Supabase.
- **Modern UI/UX**: A responsive, accessible interface built with Tailwind CSS 4, Radix UI primitives, and Framer Motion animations.
- **Email System**: Transactional email integration using React Email and Nodemailer.
- **Containerization & Hosting**: Configured for Docker and Firebase hosting.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide React
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Backend/Auth**: Supabase
- **Internationalization**: next-intl
- **Email**: React Email, Nodemailer

## Project Structure

```text
charm/
├── app/                  # App Router pages and layouts
│   ├── [locale]/         # Internationalized routes
│   │   ├── (app)/        # Protected application routes
│   │   ├── (auth)/       # Authentication routes (Login, Signup)
│   │   ├── (marketing)/  # Marketing pages (Home, About, Resources)
│   └── api/              # API routes (CMI submission, email handling)
├── components/           # Reusable UI components
│   ├── emails/           # React Email templates
│   ├── features/         # Feature-specific components (CMI)
│   ├── layout/           # Header, Footer, Navigation
│   └── ui/               # Base UI primitives (Buttons, Inputs, etc.)
├── i18n/                 # i18n routing and request configuration
├── lib/                  # Utilities, CMI logic, and Supabase client
├── messages/             # i18n translation files (en, ja, zh)
├── public/               # Static assets (Images, Fonts)
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## License
Copyright (c) 2025 Charm

All rights reserved.

The contents of this repository, including but not limited to the code, assets, and documentation, are the intellectual property of Charm. Unauthorized copying, modification, distribution, or use of this file, via any medium, is strictly prohibited.
