# 🇬🇭 Ghanaian Name Generator

A Web3-powered application that generates authentic Ghanaian names with cultural meaning, stores them on IPFS, and links them to your wallet address.

*Built with Next.js, WalletConnect, MongoDB, and Pinata IPFS*

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Web3 Enabled](https://img.shields.io/badge/Web3-Enabled-blue?style=for-the-badge)](https://walletconnect.com)

## ✨ Features

- **🌍 Authentic Ghanaian Names**: Generate names from Akan, Ewe, Ga, Dagomba, and Fante traditions
- **🤖 AI-Powered Generation**: Contextual name generation using OpenAI (optional)
- **💼 WalletConnect Integration**: Connect your Web3 wallet to claim names
- **🔗 IPFS Storage**: All claimed names are permanently stored on IPFS via Pinata
- **📊 MongoDB Persistence**: Store name cards, transactions, and user profiles (optional)
- **🔍 Explore & Share**: Browse all claimed names and share your name cards
- **📜 Transaction History**: Complete audit trail of all name-related actions
- **🎁 Name Gifting**: Transfer name ownership to other wallet addresses

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- MongoDB Atlas account (or local MongoDB instance) for full functionality
- Pinata account for IPFS storage
- Reown/WalletConnect Project ID
- OpenAI API key (optional, for AI-powered generation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ghana-names.git
cd ghana-names
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Configure environment variables in `.env.local`:
```env
# MongoDB Connection (use MongoDB Atlas or local instance for development)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ghana-names

# Pinata IPFS
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
PINATA_JWT=your_pinata_jwt_token

# Reown/WalletConnect Project ID
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id

# OpenAI API (optional, for AI-powered generation)
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with React 19, Tailwind CSS, and NativeWind
- **Web3**: Reown AppKit (WalletConnect) with Wagmi and Viem
- **Database**: MongoDB with Mongoose ODM
- **IPFS**: Pinata for decentralized storage
- **AI**: OpenAI GPT for contextual name generation (optional)

## 📁 Project Structure

```
ghana-names/
├── app/
│   ├── api/
│   │   ├── generate-name/     # AI name generation endpoint
│   │   ├── names/             # Name claiming, exploring, gifting
│   │   ├── pinata/            # IPFS upload endpoint
│   │   └── transactions/     # Transaction history endpoints
│   ├── explore/               # Browse all claimed names
│   ├── profile/               # User profile with claimed names
│   └── page.tsx              # Main name generator page
├── components/
│   ├── ghanaian-name-generator.tsx  # Main generator component
│   ├── wallet-connect.tsx           # Wallet connection UI
│   └── wallet-provider.tsx          # Web3 provider wrapper
├── lib/
│   ├── mongodb.ts            # MongoDB connection utility
│   ├── pinata.ts             # Pinata IPFS utilities
│   └── wallet.ts             # Wallet configuration
└── models/
    ├── User.ts               # User schema
    ├── NameCard.ts           # Name card schema
    └── Transaction.ts        # Transaction schema
```

## 🎯 How It Works

1. **Generate a Name**: Enter your last name and optionally provide context about yourself
2. **Choose Mode**: Select between simple database lookup or AI-powered contextual generation
3. **Connect Wallet**: Connect your Web3 wallet using WalletConnect
4. **Claim Name**: Save your generated name to IPFS and optionally to MongoDB
5. **Share & Explore**: View your claimed names, share IPFS links, or browse others' names

## 🌐 Web3 Features

- **Wallet Authentication**: Connect with any WalletConnect-compatible wallet
- **IPFS Storage**: Decentralized, permanent storage on IPFS
- **Transaction Records**: All actions are logged as verifiable transactions
- **Name Ownership**: Names are linked to wallet addresses
- **Name Gifting**: Transfer name ownership to other wallets

## 🔧 Configuration

### MongoDB Setup

For local development, use one of these options:

1. **MongoDB Atlas** (Recommended): Get a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Local MongoDB**: Install and run MongoDB locally
3. **Railway Public URL**: Use Railway's public connection string (not internal hostname)

### Pinata Setup

1. Create an account at [pinata.cloud](https://pinata.cloud)
2. Get your API key, secret, and JWT token
3. Add them to `.env.local`

### Reown/WalletConnect Setup

1. Create a project at [cloud.reown.com](https://cloud.reown.com)
2. Copy your Project ID
3. Add it to `.env.local` as `NEXT_PUBLIC_REOWN_PROJECT_ID`

## 📝 Environment Variables

All required environment variables are documented in `.env.local` with helpful comments and instructions.

## 🚢 Deployment

The application can be deployed to Vercel, Railway, or any Node.js hosting platform. Make sure to set all environment variables in your deployment platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Ghanaian naming traditions and cultural heritage
- WalletConnect/Reown for Web3 connectivity
- Pinata for IPFS infrastructure
- OpenAI for AI-powered name generation

---

Built with ❤️ for the Ghanaian community and Web3 enthusiasts
