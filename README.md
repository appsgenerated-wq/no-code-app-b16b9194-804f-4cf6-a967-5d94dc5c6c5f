# GrapeTracker: A Manifest-Powered React App

This application allows users to create, view, and manage a personal catalog of grape varieties. It's built entirely on the Manifest backend platform, with a responsive React frontend.

## Features

- **User Authentication**: Secure sign-up and login for users.
- **Grape Variety CRUD**: Create, Read, Update, and Delete grape varieties.
- **Image Uploads**: Attach a photo to each grape variety, with automatic thumbnail generation.
- **Ownership Policies**: Users can only edit or delete the varieties they have created.
- **Public Viewing**: All cataloged grape varieties are publicly visible.
- **Admin Panel**: A built-in admin interface to manage all users and data.

## Tech Stack

- **Backend**: Manifest (YAML-based configuration)
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all frontend-backend communication

## Getting Started

### Prerequisites

- Node.js and npm
- A Manifest account and a deployed backend instance.

### Setup

1. **Clone the repository.**
2. **Install dependencies**: `npm install`
3. **Configure Environment**: Create a `.env` file in the root and set `VITE_API_URL`, `VITE_BACKEND_URL`, and your Manifest `APP_ID`.
4. **Run the development server**: `npm run dev`

## Usage

- Visit the landing page to log in with the demo user or access the admin panel.
- **Demo User**: `user@example.com` / `password`
- **Admin User**: `admin@manifest.build` / `admin` (access via the Admin Panel link).
- Once logged in, you can add new grape varieties using the form and view your collection.