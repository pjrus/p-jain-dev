# Conceptual Plan: Migrating to MongoDB for Dynamic Content

Currently, the portfolio is a static site where content like projects, work experience, and skills are hardcoded in the HTML files (`index.html`, `portfolio.html`). To make this dynamic using MongoDB, a backend tier must be introduced to connect to the database and serve that data to the frontend.

> [!NOTE]
> This document outlines how such a migration would theoretically take place given the current VPS setup. **This plan is for planning purposes only and will not be executed.**

## Goals
- Conceptually design a system to store and manage portfolio data (Projects, Experience, Certifications) in MongoDB.
- Outline how the frontend can be updated to dynamically fetch and render this data instead of relying on hardcoded HTML.
- Provide a scalable architecture that allows easy updates to content without touching code, tailored for a VPS environment.

## Proposed Architecture for VPS Deployment

Since the site is currently Vanilla HTML/JS and deployed on a Virtual Private Server (VPS), the most straightforward approach is to build a lightweight Node.js/Express REST API that the frontend can query. This naturally fits into a VPS setup since there is full control over the operating system.

1.  **Database**: MongoDB hosted either:
    -   *Locally on the VPS*: Provides the lowest latency and ultimate control. Requires managing the MongoDB service (via `systemctl`) and backups manually.
    -   *MongoDB Atlas (Cloud)*: Easiest to maintain with automated backups and scaling, connecting the VPS backend to the cloud database.
2.  **Backend (New)**: Node.js + Express.js API. This service would run continuously on the VPS, likely managed by a process manager like **PM2**.
3.  **Frontend (Updated)**: Existing HTML/JS, updated to use the `fetch` API.
4.  **Web Server / Reverse Proxy**: The existing web server (like Nginx or Apache) would route API requests (e.g., `/api/*`) to the Node.js port (e.g., `localhost:3000`) while continuing to serve the static HTML/CSS/JS files directly.

## Step-by-Step Implementation Outline

### Phase 1: Database & Backend Setup on VPS
1.  **MongoDB Setup**: Install MongoDB on the VPS or configure a MongoDB Atlas connection string.
2.  **Node.js Project Init**: Create a new directory for the backend (e.g., `/var/www/p-jain-api`).
3.  **Define Schemas (Mongoose)**:
    -   `Project`: `{ title, description, tags, link, github, imageIcon, featured }`
    -   `Experience`: `{ role, company, location, dateRange, bulletPoints }`
4.  **Create REST API Endpoints**:
    -   `GET /api/projects`: Fetch all projects (or just featured ones with a query param).
    -   `GET /api/experience`: Fetch work experience history.

### Phase 2: Frontend Integration
Modify the existing HTML/JS to fetch data dynamically:
1.  **Remove Hardcoded Data**: Clear out the existing hardcoded project cards and experience list items in `index.html` and `portfolio.html`, leaving only the container elements (e.g., `<div class="carousel-track" id="proj-track"></div>`).
2.  **Add Fetch Logic**: Write JavaScript functions to call the new API endpoints when the page loads.
3.  **DOM Manipulation**: Dynamically create HTML elements (cards, list items) using the returned JSON data and append them to the DOM.

### Phase 3: Content Management
To easily update the MongoDB database without writing queries manually:
-   **Option A (Simplest)**: Use MongoDB Compass connected to the VPS/Atlas instance to manually add/edit documents.
-   **Option B (Custom)**: Build a simple Admin Dashboard (requires authentication) on the site to add/edit projects.
-   **Option C (Headless CMS)**: Use a tool like Strapi or Payload CMS to generate an admin UI automatically, connected to the MongoDB instance.

## VPS Deployment Considerations

When moving from a static site to a Node.js + MongoDB stack on a VPS, the deployment process changes:
-   **Process Management**: A tool like `pm2` is needed to ensure the Node.js API restarts automatically if it crashes or if the server reboots.
-   **Nginx Configuration**: The Nginx config (`/etc/nginx/sites-available/your-site`) must be updated to proxy requests. For example, requests to `example.com/api` should be routed to `http://localhost:3000`.
-   **Security**: Ensure the MongoDB instance is secured. If run locally on the VPS, it should only bind to `localhost` and ideally require authentication.
-   **SSL/TLS**: Let's Encrypt certificates will still work, and Nginx will handle HTTPS termination before passing the traffic to the Node API.
