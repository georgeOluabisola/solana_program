import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import assert from 'assert';

describe('counter', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider() as anchor.AnchorProvider;
  const program = anchor.workspace.Counter as Program;

  it('initialize counter (happy)', async () => {
    const user = provider.wallet.publicKey;
    const [counterPda, bump] = await PublicKey.findProgramAddress(
      [Buffer.from('counter'), user.toBuffer()],
      program.programId
    );

    await program.methods
      .initialize()
      .accounts({
        counter: counterPda,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    const account = await program.account.counter.fetch(counterPda);
    assert.ok(account.count.toNumber() === 0);
    assert.ok(account.authority.equals(user));
  });

  it('increment counter (happy)', async () => {
    const user = provider.wallet.publicKey;
    const [counterPda, bump] = await PublicKey.findProgramAddress(
      [Buffer.from('counter'), user.toBuffer()],
      program.programId
    );

    await program.methods.increment().accounts({
      counter: counterPda,
      user: provider.wallet.publicKey,
    }).rpc();

    const account = await program.account.counter.fetch(counterPda);
    assert.ok(account.count.toNumber() === 1);
  });

  it('increment counter (unhappy): different signer should fail', async () => {
    const user = provider.wallet.publicKey;
    const other = Keypair.generate();

    const [counterPda, bump] = await PublicKey.findProgramAddress(
      [Buffer.from('counter'), user.toBuffer()],
      program.programId
    );

    // Attempt to call increment with a different signer
    let threw = false;
    try {
      await program.methods.increment().accounts({
        counter: counterPda,
        user: other.publicKey,
      }).signers([other]).rpc();
    } catch (err) {
      threw = true;
    }
    assert.ok(threw, 'Expected transaction to fail when wrong signer used');
  });
});
