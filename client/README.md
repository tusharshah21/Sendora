# Sendora Frontend (`client`)

This is the React frontend for the Sendora DApp. It allows users to send Ethereum transactions, view transaction history, and attach GIFs to their transfers using the Giphy API. The UI is styled with TailwindCSS and connects to the Ethereum blockchain via MetaMask and ethers.js.

---

## Features

- **Send Ethereum:** Transfer ETH to any address with a message and keyword.
- **Transaction History:** View all past transactions on the blockchain.
- **Giphy Integration:** Attach a GIF to each transaction using a keyword.
- **MetaMask Integration:** Connect your wallet to interact with the DApp.
- **Modern UI:** Responsive design using TailwindCSS.

---

## Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Environment

Create a `.env` file in the `client/` folder:

```
VITE_GIPHY_API=YOUR_GIPHY_API_KEY
```

### 3. Update Contract Address

After deploying your smart contract, update the `contractAddress` in [`src/utils/constants.js`](src/utils/constants.js) with your deployed contract address.

### 4. Start the Frontend

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
client/
│
├── src/
│   ├── components/      # React components (Navbar, Welcome, Services, Transactions, Footer, etc.)
│   ├── context/         # React context for transaction state
│   ├── hooks/           # Custom React hooks (e.g., useFetch for Giphy)
│   ├── utils/           # Utility files (constants, dummy data, etc.)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── images/              # Static images and logos
├── index.html           # Main HTML file
├── tailwind.config.js   # TailwindCSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Project dependencies and scripts
└── .env                 # Environment variables (not committed)
```

---

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run serve` — Preview the production build

---

## Requirements

- Node.js (v14 or higher recommended)
- MetaMask browser extension
- Deployed Ethereum smart contract (see the `smart_contract` folder)

---

## License

MIT
