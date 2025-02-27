# Hoot App

MERN Chat app with features like authentication, real-time messaging, typing indicators, online status, optimisitc updates, and more, using React, TypeScript, Node.js, Express, MongoDB, JWT, Socket.io, TanStack Query, Zustand, Tailwind CSS, and more.

## Table of contents

- [Overview](#overview)
  - [Run locally](#run-locally)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Run locally

```bash
    git clone https://github.com/i-shant/hoot-chat-app.git

    cd hoot-chat-app/backend
    pnpm install
    pnpm dev

    cd ../frontend
    pnpm install
    pnpm dev
```

### Features

- **Authentication** – Users can create an account, login, and logout securely with JWT tokens based authnetication.
- **Find Users** – Users can search to find other users by name and start chats with them.
- **Real-time Messaging** – Users can send and receive messages in real-time.
- **Online and Typing Status** – Users can see if other users are online and typing, with real-time updates using **Socket.io**.
- **Client State Management with Zustand** – Managing dialog and sidebar state with Zustand.
- **Server State Management with TanStack Query** - TanStack Query with **Axios** to handle data fetching and state management.
- **Tailwind CSS + shadcn/ui** – Clean and **responsive** UI
- **Strongly-typed with TypeScript** – Strongly-typed with TypeScript on both frontend as well as backend.
- **Dark Mode Toggle** – Users can toggle between light and dark mode.
- **Optimistic Updates** – Users can view pending messages while they are being sent.
- **Notifications** – Real-time notifications for new messages.
- **Create chat only when a user sends a message**
- **Catch-all 404 not found page**

### Screenshots

<video width="640" height="360" controls>
  <source src="https://res.cloudinary.com/doeinsql7/video/upload/du_66/v1740649814/hoot-desktop-demo_w4rzpl.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

![Desktop Notification Screenshot](https://raw.githubusercontent.com/i-shant/hoot-chat-app/refs/heads/main/screenshots/desktop-notification.png?token=GHSAT0AAAAAAC4VQMVDJZMS77AIBUOT4WCSZ6AJR6Q)

![Desktop Optimistic Update Screenshot](https://raw.githubusercontent.com/i-shant/hoot-chat-app/refs/heads/main/screenshots/desktop-optimistic-update.png?token=GHSAT0AAAAAAC4VQMVDKE2EHVT73IOPT4ISZ6AJSLA)

![Desktop Chat Light Screenshot](https://raw.githubusercontent.com/i-shant/hoot-chat-app/refs/heads/main/screenshots/desktop-chat-light.png?token=GHSAT0AAAAAAC4VQMVCB7KFKB5IYMDMBQ2GZ6AJS4Q)

<div>
  <img alt='Mobile Typing Screenshot' src='https://raw.githubusercontent.com/i-shant/hoot-chat-app/refs/heads/main/screenshots/mobile-typing.png?token=GHSAT0AAAAAAC4VQMVDYD26KDTRR3UCDBJUZ6AJTRA' width='45%'/>
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt='Mobile Typing Sidebar Screenshot' src='https://raw.githubusercontent.com/i-shant/hoot-chat-app/refs/heads/main/screenshots/mobile-typing-sidebar.png?token=GHSAT0AAAAAAC4VQMVD2GCRPNJL5VM674UEZ6AJTTA' width='45%'/>
</div>

### Links

- Live Site URL: [https://hoot-chat-app.vercel.app](https://hoot-chat-app.vercel.app)

## My Process

### Built with

#### Frontend

- [React](https://react.dev/) - JS library
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) - Data fetching
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - Server state management
- [Zustand](https://zustand.docs.pmnd.rs/) - Client state management
- [React Router](https://reactrouter.com/) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Tailwind CSS components
- [date-fns](https://date-fns.org/) - Date formatting
- [Socket.io](https://socket.io/) - Real-time messaging
- [Lucide](https://lucide.dev/) - Icons
- [Vite](https://vite.dev/) - Frontend tooling

#### Backend

- [Node.js](https://nodejs.org/) - JS runtime
- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/docs/) - NoSQL Database
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Tokens
- [Socket.io](https://socket.io/) - Real-time messaging
- [BcryptJS](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [cors](https://www.npmjs.com/package/cors) - Cross-Origin Resource Sharing
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser) - Cookie parsing

### Continued development

- Allow users to block other users
- Delete chats/messages
- Sent/delivered/seen status
- View/update user profile
- Group chats

### Useful resources

- [Zustand typescript guide](https://zustand.docs.pmnd.rs/guides/typescript)
- [TanStack Query typescript guide](https://tanstack.com/query/latest/docs/framework/react/typescript)
- [Using Websockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
- [Socket.io handling CORS](https://socket.io/docs/v4/handling-cors/)
- [MERN auth](https://github.com/bradtraversy/mern-auth)

## Author

- GitHub - [i-shant](https://github.com/i-shant)
- LinkedIn - [ishant-bhurani](https://linkedin.com/in/ishant-bhurani)
