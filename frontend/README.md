# Frontend for Counter dApp

This is a minimal frontend demo showing how to connect a browser wallet and where to call the Anchor RPCs.

Notes:
- This simple demo is not bundled with `@project-serum/anchor` or `@solana/web3.js`. For a full frontend, use a bundler (Vite/Create React App) and install `@project-serum/anchor` and `@solana/web3.js`.

Usage (developer):

1. Replace the placeholder program id in `app.js` with your deployed program id.
2. Build a proper frontend and import Anchor to call `initialize` and `increment` (see tests for RPC usage examples).
3. Deploy the frontend on Vercel or Netlify and paste the URL into `PROJECT_DESCRIPTION.md`.
TODO