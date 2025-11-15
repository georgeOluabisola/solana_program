// Minimal frontend example showing how to call the Counter program.
// This is a demo. To use it you'll need to include Anchor and @solana/web3.js in your build,
// or run this through a bundler that provides those modules.

(async () => {
  const connectBtn = document.getElementById('connect');
  const initBtn = document.getElementById('initialize');
  const incBtn = document.getElementById('increment');
  const status = document.getElementById('status');
  const countEl = document.getElementById('count');

  let provider = null;
  let programId = new PublicKey('Counter111111111111111111111111111111111111'); // replace with deployed id

  connectBtn.onclick = async () => {
    if (!window.solana) {
      alert('Install a Solana wallet (Phantom)');
      return;
    }
    await window.solana.connect();
    provider = window.solana;
    status.innerText = 'Connected: ' + provider.publicKey.toString();
  };

  initBtn.onclick = async () => {
    alert('This demo shows where to call anchor methods. Use a bundler to include Anchor in production.');
  };

  incBtn.onclick = async () => {
    alert('This demo does not include a bundled Anchor client. See README for usage instructions.');
  };

})();
