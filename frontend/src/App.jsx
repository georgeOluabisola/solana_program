import React, { useState, useEffect } from 'react'
import * as anchor from '@project-serum/anchor'
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js'

export default function App() {
  const [connected, setConnected] = useState(false)
  const [count, setCount] = useState('-')
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState(null)
  const [program, setProgram] = useState(null)
  const [programId, setProgramId] = useState(null)

  useEffect(() => {
    // Initialize Phantom wallet connection on mount
    const initWallet = async () => {
      if (!window.solana) {
        console.log('Phantom wallet not detected')
        return
      }

      try {
        // Check if already connected
        const resp = await window.solana.connect({ onlyIfTrusted: true })
        if (resp) {
          initAnchorProvider()
        }
      } catch (err) {
        console.log('Wallet not connected yet')
      }
    }
    initWallet()
  }, [])

  const initAnchorProvider = async () => {
    if (!window.solana) return

    const conn = new Connection('https://api.devnet.solana.com', 'confirmed')
    const wallet = {
      publicKey: window.solana.publicKey,
      signTransaction: window.solana.signTransaction.bind(window.solana),
      signAllTransactions: window.solana.signAllTransactions.bind(window.solana),
    }

    const prov = new anchor.AnchorProvider(conn, wallet, { preflightCommitment: 'confirmed' })
    anchor.setProvider(prov)
    setProvider(prov)

    // Use placeholder program id (replace after deploy)
    const pid = new PublicKey('Counter111111111111111111111111111111111111')
    setProgramId(pid)

    // Load the IDL for the program (you'll need to add this from your build output)
    try {
      // In production, load from ./idl/counter.json
      // const idl = require('../idl/counter.json')
      // const program = new anchor.Program(idl, pid, prov)
      // setProgram(program)
    } catch (err) {
      console.log('IDL not loaded (expected for demo)', err)
    }

    setConnected(true)
  }

  const handleConnect = async () => {
    if (!window.solana) {
      alert('Install Phantom wallet: https://phantom.app')
      return
    }

    try {
      await window.solana.connect()
      initAnchorProvider()
    } catch (err) {
      console.error('Failed to connect:', err)
      alert('Failed to connect wallet')
    }
  }

  const handleInitialize = async () => {
    if (!provider || !programId) {
      alert('Wallet not connected or program ID not set')
      return
    }

    setLoading(true)
    try {
      // Example: call initialize instruction
      // const [counterPda] = await PublicKey.findProgramAddress(
      //   [Buffer.from('counter'), provider.wallet.publicKey.toBuffer()],
      //   programId
      // )
      // await program.methods.initialize().accounts({
      //   counter: counterPda,
      //   user: provider.wallet.publicKey,
      //   systemProgram: SystemProgram.programId,
      // }).rpc()
      alert('Initialize called. (Demo: replace with real call once program is deployed)')
    } catch (err) {
      console.error('Initialize failed:', err)
      alert('Failed to initialize: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleIncrement = async () => {
    if (!provider || !programId) {
      alert('Wallet not connected or program ID not set')
      return
    }

    setLoading(true)
    try {
      // Example: call increment instruction
      // const [counterPda] = await PublicKey.findProgramAddress(
      //   [Buffer.from('counter'), provider.wallet.publicKey.toBuffer()],
      //   programId
      // )
      // await program.methods.increment().accounts({
      //   counter: counterPda,
      //   user: provider.wallet.publicKey,
      // }).rpc()
      alert('Increment called. (Demo: replace with real call once program is deployed)')
    } catch (err) {
      console.error('Increment failed:', err)
      alert('Failed to increment: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <h1>Counter dApp (Vite + React + Anchor)</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={handleConnect}
          disabled={connected}
          style={{ marginRight: 8, padding: '8px 16px', cursor: connected ? 'not-allowed' : 'pointer' }}
        >
          {connected ? 'Connected ✓' : 'Connect Wallet'}
        </button>
        <button
          onClick={handleInitialize}
          disabled={!connected || loading}
          style={{ marginRight: 8, padding: '8px 16px', cursor: !connected || loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Loading...' : 'Initialize'}
        </button>
        <button
          onClick={handleIncrement}
          disabled={!connected || loading}
          style={{ marginRight: 8, padding: '8px 16px', cursor: !connected || loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Loading...' : 'Increment'}
        </button>
      </div>
      <div>
        <p><strong>Status:</strong> {connected ? 'Connected ✓' : 'Not connected'}</p>
        <p><strong>Wallet:</strong> {connected && provider ? provider.wallet.publicKey.toString().slice(0, 8) + '...' : '-'}</p>
        <p><strong>Count:</strong> {count}</p>
      </div>
      <hr />
      <p style={{ fontSize: 12, color: '#666' }}>
        <strong>Demo Note:</strong> This frontend is set to use the placeholder program ID. After deploying the program to Devnet,
        update the program ID in the code and uncomment the real Anchor method calls. See PROJECT_DESCRIPTION.md for deployment steps.
      </p>
    </div>
  )
}
