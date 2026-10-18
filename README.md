# Event Management System

A React application where users can explore events from the Ticketmaster Discovery API,
register for events, and manage their registrations.

## Features
- User registration, login and logout (frontend simulation using Local Storage)
- Login state persists after page refresh
- Browse upcoming events with search, category chips, country/date filters, sorting and pagination
- Event details page (date, time, venue, location, category, image, price, seat map)
- Register for an event (duplicate registration is blocked) and cancel registration
- My Events page with Upcoming and Completed tabs
- Protected routes (My Events needs login)
- Responsive design with a mobile menu
- Loading and error states, form validation

## Tech Stack
- React (Vite)
- Redux Toolkit (auth, events and registrations slices)
- React Router
- Ticketmaster Discovery API

## Setup Instructions

1. Clone the repository
   git clone https://github.com/YOUR_USERNAME/event-management-system.git
   cd event-management-system

2. Install dependencies
   npm install

3. Get a free API key from https://developer.ticketmaster.com/

4. Create a `.env` file in the project root (see `.env.example`)
   VITE_TM_API_KEY=your_api_key_here

5. Start the app
   npm run dev
   Open http://localhost:5173

## Project Structure
src/
- app/            Redux store
- features/       Redux slices (auth, events, registrations)
- services/       Ticketmaster API calls
- utils/          Helper functions
- components/     Reusable components
- pages/          Page components for each route

## Routes
| Route | Page | Protected |
|-------|------|-----------|
| / | Home | No |
| /events | Events list | No |
| /events/:id | Event details | No |
| /login | Login | No |
| /register | Register | No |
| /my-events | My Events | Yes |

## Notes
- Authentication is only a frontend simulation. Users and registrations are stored in the browser's Local Storage.
- The `.env` file is not committed to GitHub.

## Author
Your Name