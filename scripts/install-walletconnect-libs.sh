#!/bin/bash

# Install WalletConnect libraries
echo "Installing WalletConnect libraries..."

npm install \
  @reown/walletkit@^1.2.3 \
  @walletconnect/client@^1.8.0 \
  @walletconnect/core@^2.19.2 \
  @walletconnect/react-native-compat@2.19.2 \
  @walletconnect/utils@^2.19.2 \
  @walletconnect/types@^2.19.2

echo "✅ WalletConnect libraries installed!"

