# Case SuddenlySpaces Frontend

## Overview

For the frontend I went with **Next.js**. Since this is a real estate app that exposes public data (property listings), I wanted to explore how the framework could help with **SEO**, which is important in this kind of product.

I also intentionally experimented with different features of Next.js within the same project:

* the **homepage** and other public routes are server-component oriented, taking advantage of better performance and SEO friendliness.
* the **landlords dashboard** is closer to a classic **SPA** experience, with client-side routing, JWT-based authentication and a smoother UI for the logged-in user.

I am aware that Next.js is not an “auto-choice” in production and comes with its own set of troubles. For this case though, I wanted to demonstrate how it could be leveraged in different contexts inside a single app.

The UI was kept simple and functional, focusing more on the architecture and flow than on design polish.

## Run Instructions

Requirements: Node.js and npm installed. The backend API running on http://localhost:3000 (yes, I am aware that i should've created env vars for the url, but I didn't)

1. Clone this repository and access it in the terminal.
```
git clone <this_repo>
cd suddenlyspaces-frontend
```
2. Install the dependencies.
```
npm install
```
3. Make sure the bakcend is running on [http://localhost:3000/](http://localhost:3000/)
4. Run the development script.
```
npm run dev
```
5. Test it by accessing [http://localhost:3001/](http://localhost:3001/) (Next.js should automatically jump to 3001, but yes, we would be better off with a more organized setup)

## Improvements for a Production-ready Project

There are a lot of things I would improve for a production app. Sorry for the informality but I'm getting tired of typing so I'll leave some general software-related ones:

- **Environment Variables:** proper handling of secrets and environment-specific configs.
- **Security:** rethink all auth/authorization flows, input sanitization, token refresh strategy, proper token storage, etc.
- **Caching & Performance:** consider ISR, SWR or dedicated caching strategies for both server and client (must be think carefully).
- **Automated Tests:** integration and E2E tests, especially around authentication and forms.
- **Docker (maybe):** I would dockerize the app for easier setup/deployments.

and some on the business/features side:

- richer property pages with photos and videos.
- more tenant-related information (history, documents).
- an in-app chat for secure landlord ↔ tenant communication.
- improved landlord dashboards with analytics and tenant management.
- better filtering/sorting options for property listings.