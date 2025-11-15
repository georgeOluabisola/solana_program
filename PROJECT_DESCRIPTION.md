# Project Description

**Project Name:** Counter dApp (Anchor PDA example)

**Deployed Frontend URL: https://solana-program-seven.vercel.app

**Solana Program ID: 4gLELQfQy9pv5UEhSu6SnRhxbGlBZwrJfvdLtpPSYaM

## Project Overview

### Description
This small dApp demonstrates a PDA-based counter implemented in Anchor. Each user can initialize a personal `Counter` account derived from their wallet public key and the string seed `"counter"`. The program provides two instructions:

- `initialize`: create the PDA `Counter` account for the caller and set count to 0.
- `increment`: increase the stored `count` by 1 (only the authority who created the PDA can sign and increment).

The goal is to demonstrate Anchor account initialization with PDAs, simple state updates, and TypeScript tests covering happy and unhappy paths.

### Key Features
- PDA-based per-user counter (seed: `"counter"` + authority public key).
- Initialize and increment instructions.
- TypeScript tests that exercise both success and failure scenarios.

### How to Use the dApp (developer flow)
1. Build the program and deploy to Devnet (see instructions below).
2. Update `anchor_project/Anchor.toml` program id with deployed program id.
3. Run `anchor test` or run the frontend to interact.
4. Frontend (optional) connects with a browser wallet and calls the `initialize` and `increment` RPC methods.

## Program Architecture

The program implements a single on-chain account `Counter` (an Anchor `#[account]` type) with two fields:

- `authority: Pubkey` — the owner/creator of the counter (the signer used to derive the PDA).
- `count: u64` — the current counter value.

### PDA Usage
The PDA is derived using seeds `[b"counter", authority_pubkey]` and the program id. This ties the counter account uniquely to a wallet address so only that wallet can sign for the PDA-derived account actions.

**PDAs Used:**
- `Counter PDA`: seeds = `["counter", authority]`. Purpose: store per-authority counter state and authorize operations by matching the seed with the signing key.

### Program Instructions
- `initialize`: Accounts: `counter (init, payer = user, seeds = [b"counter", user])`, `user: Signer`, `system_program`. Effect: Initializes the `Counter` struct with `authority = user` and `count = 0`.
- `increment`: Accounts: `counter (mut, seeds = [b"counter", user])`, `user: Signer`. Effect: increments `count` by 1. Panic/returns error on numerical overflow.

### Account Structure
```rust
#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}
```

## Testing

### Test Coverage
The repository contains TypeScript tests at `anchor_project/tests/counter.ts` implemented with `@project-serum/anchor`. Tests cover:

**Happy Path Tests:**
- Initialize: verifies that the PDA is created with `count = 0` and `authority` set correctly.
- Increment: verifies that calling `increment` by the authority increases `count`.

**Unhappy Path Tests:**
- Increment with wrong signer: tries to call `increment` using a different signer and asserts the transaction fails.

### Running Tests
Install dependencies (from repository root):

```powershell
cd anchor_project
npm install # installs anchor dev dependencies if you created package.json; otherwise ensure anchor/solana/ts toolchain is available
anchor test
```

Notes:
- Tests expect an Anchor/solana environment. Use `anchor build` and ensure `solana` CLI and `anchor` are configured (Devnet or localnet). If you run on Devnet, make sure your keypair has SOL for transactions.

## Deployment (developer steps)
1. Build the program: `anchor build`.
2. Deploy to Devnet: `anchor deploy --provider.cluster Devnet` (update `Anchor.toml` program id accordingly).
3. Update `PROJECT_DESCRIPTION.md` with the deployed program id and frontend URL.

## Frontend
The `frontend/` folder includes a minimal HTML/JS demo showing how to call `initialize` and `increment` using `@solana/web3.js` and `@project-serum/anchor`.

## Additional Notes for Evaluators
This submission demonstrates the required items:
- Anchor program that uses a PDA.
- TypeScript tests exercising both happy and unhappy paths.
- Minimal frontend code and README to guide deployment.
