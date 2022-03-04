# <a href="https://untitled-notes-ten.vercel.app/" target="_blank">Untitled Notes</a>
- <a href="https://untitled-notes-ten.vercel.app/" target="_blank">https://untitled-notes-ten.vercel.app/</a>

## Contents:
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Local Installation](#local-installation)

## Description

**Untitled Notes** is a markdown editor with realtime preview built by a team of 5 for Northcoders final project phase. With Next.js as our main framework, we used Cloud Firestore as the backend database to store our user's notes. Firebase Authentication was used to handle user login, with Remirror to create the actual editor. Finally, we deployed the site online using Vercel.

## Tech Stack
- TypeScript
- React.js / Next.js
- Firebase Authentication
- Cloud Firestore
- Remirror
- Y.js
- WebRTC
- Chakra UI
- Framer Motion

## Local Installation

### Clone
Clone the project to your machine by running ```git clone https://github.com/Edgily/untitled-notes.git``` in your terminal wherever you wish to install the project.

### Install Dependencies
This project was made with (and may depend on):
- node v16.0.0

Navigate into the newly created 'untitled-notes' folder and run the command ```npm i``` which will install all other dependencies. 

### Create .env File
We need a .env file to tell our project which Cloud Firestore database to connect to. Create a ```.env.local``` file in the root directory of the project (where ```package.json``` etc. are). The structure of the file is as follows:
### ACTUAL VALUES ARE KEPT BLANK FOR SECURITY REASONS AND ARE AVAILABLE ON REQUEST
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ABLY_API_KEY=
```
### Start A Local Server
Once all the above steps are complete you can run the ```npm run dev``` command to host a local preview of the site accessible on ```http://localhost:3000``` in your browser by default. Check your terminal for the correct URL. Done!
