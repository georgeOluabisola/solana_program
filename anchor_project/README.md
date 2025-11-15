# Counter Anchor Program

This is a simple Anchor program that demonstrates a PDA-based `Counter` account.

Instructions:

- `initialize` creates a PDA-derived account for the calling authority (seed: `"counter" | authority`).
- `increment` increments the stored `count` (only the authority can sign for the PDA-derived account).

See `tests/counter.ts` for usage examples.
TODO