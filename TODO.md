# ✅ QueueNotifier – Real-Time Queue App (Next.js + Socket.io + Google OAuth)

## 🔧 Stack

- Frontend: Next.js (App Router or Pages Router)
- Auth: NextAuth.js with Google Provider
- Backend: Express + Socket.io (deployed separately)
- Realtime: WebSockets (`socket.io`)
- Optional: MongoDB (for queue persistence)
- Deploy: Vercel (frontend), Railway/Render (backend)

---

## ✅ Setup Instructions

### 1. Backend (Express + Socket.io)

- [ ] `npm install express socket.io cors`
- [ ] Setup `Express` server with `http.createServer()`
- [ ] Enable CORS (`origin: https://frontend-domain.vercel.app`)
- [ ] Setup `io.on('connection')` → handle:
  - [ ] `join-queue` → push user to `queue[]` → emit `update-queue`
  - [ ] `leave-queue` → filter user → emit `update-queue`
  - [ ] `disconnect` → optional auto-remove from queue
- [ ] Export `queue[]` in memory or persist with MongoDB
- [ ] Deploy backend to Railway/Render → get public `ws` URL

### 2. Frontend (Next.js)

- [ ] `npm install next-auth socket.io-client`
- [ ] Setup `next-auth` with Google provider:
  - [ ] Create `/api/auth/[...nextauth].ts`
  - [ ] Configure `.env.local`:


    NEXTAUTH_SECRET=your_secret
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=xxx
- [ ] Create `utils/socket.ts`:

  ```ts
  import { io } from 'socket.io-client';
  export const socket = io("https://your-backend-url.com");
  ```

* [ ] In `app/page.tsx` or `pages/index.tsx`:
  * [ ] Use `useEffect` to listen `socket.on("update-queue")`
  * [ ] Emit `join-queue` with user info on button click
  * [ ] Emit `leave-queue` on button click
  * [ ] Show queue list live from state
* [ ] Protect queue page with `useSession()` or `getServerSession()`
* [ ] Use Tailwind to style: position numbers, user highlight, responsive layout

---

## 🌐 Deployment

* [ ] Deploy frontend to **Vercel**

  * [ ] Add `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_URL` to Vercel env
* [ ] Deploy backend to **Railway/Render**

  * [ ] Expose port `3001`
  * [ ] Set CORS to accept frontend domain
* [ ] Update frontend socket connection to deployed URL

---

## ✅ Features Checklist

* [ ] Google OAuth login
* [ ] Protected queue UI
* [ ] Join/leave queue in real-time
* [ ] Auto-broadcast on every queue update
* [ ] Show user's own position highlighted
* [ ] Responsive UI (mobile + desktop)
* [ ] Deployed backend + frontend working together

---

## 🌟 Optional Enhancements

* [ ] MongoDB persistence for queue
* [ ] Admin reset/clear queue
* [ ] Track estimated wait time
* [ ] User avatars from Google profile
* [ ] Toast notifications or sounds
* [ ] Auto-remove on `disconnect`
* [ ] Screensaver display for queue monitor

## 📝 Notes

> Built a real-time queue system using Next.js and Socket.io with Google OAuth login, deployed on Vercel and Render, featuring live position tracking and event-driven WebSocket architecture.
