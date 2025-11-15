#!/bin/bash
export PATH=$HOME/.local/share/solana/install/active_release/bin:$HOME/.cargo/bin:$PATH
cd /mnt/c/Users/GEORGE\ OLUABISOLA/Music/program-georgeOluabisola/anchor_project
cargo build-sbf --manifest-path programs/counter/Cargo.toml
