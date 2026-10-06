# Pixly

Pixly is a simple full-stack visual sharing app for posting images, discovering
moments from across the app, and reacting to posts. The interface uses a
minimal black-and-white visual style rather than following a traditional
social-media layout.

**Live demo:** https://insta-clone-9n3w.onrender.com/feed

## Current features

- User registration and login
- Cookie-based JWT authentication
- Image posts with optional captions
- Global feed visible to signed-in users
- Like and unlike posts
- Image upload and delivery through ImageKit
- Responsive Pixly frontend with SCSS styling

## Current product state

- Posts are currently global rather than limited by followers.
- Posts cannot be deleted yet.
- Login and logout controls from the feed are planned.
- Following and follower functionality is planned, but it will not remove the
  global feed.

## Planned features

- Comments
- Bookmarks and personal collections
- Sharing
- User profiles and profile editing
- Follow and unfollow
- Notifications
- Explore and search
- Mood tags for organizing moments

## Tech stack

### Frontend

- React
- React Router
- SCSS
- Vite

### Backend

- Node.js
- Express
- MongoDB Atlas
- JWT and HTTP-only cookies
- ImageKit

## Project structure

```text
insta-clone/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   └── ...
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/SouravPareek/insta-clone.git
cd insta-clone
```

### 2. Configure and start the backend

Create `Backend/.env` with your own values:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
PORT=3000
```

Then start the API:

```bash
cd Backend
npm install
npm run dev
```

### 3. Configure and start the frontend

In `Frontend/.env`, use the local API proxy:

```env
VITE_API_URL=/api
```

Then, in a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on the Vite development server, while `/api` requests are
proxied to the backend at `http://localhost:3000`.

## Production build

From the `Frontend` directory:

```bash
npm run build
```

The production files are generated in `Frontend/dist`. Configure your hosting
provider to use:

```text
Build command: npm run build
Output directory: dist
```

For a separately hosted backend, set the production frontend environment
variable to the deployed API URL:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Keep all credentials and production secrets in the hosting provider's
environment configuration. Do not commit `.env` files.

## Deployment notes

GitHub stores the source code; it does not host the running application by
itself. A production deployment needs:

1. A hosted backend connected to MongoDB Atlas.
2. ImageKit credentials configured on the backend.
3. A hosted frontend with the correct `VITE_API_URL`.
4. Backend CORS configured for the deployed frontend domain.
5. A production smoke test covering registration, login, posting, feed loading,
   and likes.

The current live deployment uses Render. The free tier may take a short time
to respond after inactivity because of cold starts.

## Author

**Sourav Pareek**
