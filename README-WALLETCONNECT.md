# WalletConnect Libraries Integration

This project now supports advanced WalletConnect functionality using multiple protocol libraries.

## Installed Libraries

1. **@reown/walletkit** - Alternative wallet connection kit
2. **@walletconnect/client** - WalletConnect v1 client (legacy support)
3. **@walletconnect/core** - Core WalletConnect v2 protocol
4. **@walletconnect/react-native-compat** - React Native compatibility
5. **@walletconnect/utils** - Utility functions
6. **@walletconnect/types** - TypeScript types

## Installation

```bash
npm install \
  @reown/walletkit@^1.2.3 \
  @walletconnect/client@^1.8.0 \
  @walletconnect/core@^2.19.2 \
  @walletconnect/react-native-compat@2.19.2 \
  @walletconnect/utils@^2.19.2 \
  @walletconnect/types@^2.19.2
```

Or use the provided script:
```bash
./scripts/install-walletconnect-libs.sh
```

## Usage

### Basic (Current Setup)
The project currently uses `@reown/appkit` which provides high-level wallet connection UI. This works for most use cases.

### Advanced Protocol Control

Use `useWalletConnectAdvanced` hook for protocol-level features:

```tsx
import { useWalletConnectAdvanced } from '@/hooks/use-walletconnect-advanced'

function MyComponent() {
  const { coreInitialized, sessionInfo, formattedAddress } = useWalletConnectAdvanced()
  
  // Access protocol-level information
}
```

### Utility Functions

Use wallet utilities from `@/lib/walletconnect-utils`:

```tsx
import { formatAddress, isValidAddress, getChainName } from '@/lib/walletconnect-utils'

const display = formatAddress('0x1234...') // "0x123...5678"
const valid = isValidAddress(address)
const chain = getChainName(1) // "Ethereum Mainnet"
```

### WalletConnect Core

Access WalletConnect Core for advanced session management:

```tsx
import { getWalletConnectCore } from '@/lib/walletconnect-core'

const core = getWalletConnectCore()
await core.initialize()
core.subscribeToEvents((event) => {
  console.log('WC event:', event)
})
```

## When to Use Each Library

- **@reown/appkit** - Default choice for wallet UI
- **@walletconnect/core** - When you need protocol-level control
- **@walletconnect/utils** - For address/chain utilities
- **@walletconnect/client** - Only for legacy WC v1 support
- **@walletconnect/react-native-compat** - Future React Native app

## Architecture

```
┌─────────────────────────────────────┐
│   User Interface (React)            │
│   - useWalletConnectAdvanced hook   │
│   - WalletAdvancedInfo component     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   WalletConnect Core                 │
│   - Session Management               │
│   - Protocol Events                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Utilities & Helpers                │
│   - Address formatting               │
│   - Chain validation                 │
│   - Protocol encoding                │
└─────────────────────────────────────┘
```

## Benefits

1. **Protocol-Level Control** - Direct access to WalletConnect protocol
2. **Advanced Features** - Custom session management, event handling
3. **Legacy Support** - Support older wallets via WC v1
4. **Type Safety** - Full TypeScript support
5. **Mobile Ready** - Structure for future React Native app
6. **Utilities** - Reusable helper functions

