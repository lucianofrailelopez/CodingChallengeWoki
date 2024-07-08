# Movies Aplication

## Overview

Woki's Coding Challenge

## Features

- **Search Functionality:** Users can search for movies by title, genre, or keywords.
- **Movie Details:** Detailed information about each movie, including title, release date, genres, synopsis, and rating is displayed.
- **Similar Movies:** Lists of similar movies are shown based on the genre of the selected movie.
- **Responsive Design:** Designed using Material UI components for a visually appealing and responsive user interface.
- **User Authentication:**
  Users can log in to the application to access personalized features and save their preferences

## Technical Stack

- **Framework:** Next.js with TypeScript.
- **State Management:** React Redux Toolkit.
- **API Calls:** Axios for fetching data from TMDb API.
- **Styling:** Material UI for consistent and attractive UI components and Tailwind.
- **Routing:** Next.js dynamic routing for smooth navigation between pages.

## Installation

To run this project locally:

1. Install dependencies: `npm install`

2. Set up environment variables for TMDb API key.

   - Create .env.local file in main folder
     NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3
     NEXT_PUBLIC_API_KEY=1f413e4f0aa48a5c40e5080ceb7c9381
     NEXT_PUBLIC_IMAGE=https://image.tmdb.org/t/p/w500

3. Start the development server: `npm run dev`
