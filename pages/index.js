import { useState } from "react";
import Head from "next/head";

const ORDINALS = [
  { id: 1, type: "ord", emoji: "🟠", name: "Ordinal Punk #4291", collection: "Ordinal Punks", price: "0.085", usd: "$8,245", inscription: "i4a9f2b...3c8d", sat: "1,923,847,291", rarity: "Uncommon", tags: ["Alien", "Laser Eyes"] },
  { id: 2, type: "ord", emoji: "⚡", name: "Bitcoin Frog #812", collection: "Bitcoin Frogs", price: "0.042", usd: "$4,074", inscription: "i7d2e1a...9f0b", sat: "2,104,923,114", rarity: "Common", tags: ["Gold", "Crown"] },
  { id: 3, type: "ord", emoji: "🔥", name: "Rare Sat – Vintage", collection: "Rare Sats", price: "0.310", usd: "$30,070", inscription: "—", sat: "420,000", rarity: "Legendary", tags: ["Pizza Sat", "Vintage"] },
  { id: 4, type: "ord", emoji: "💎", name: "NodeMonke #2099", collection: "NodeMonkes", price: "0.128", usd: "$12,416", inscription: "i1b8c3d...7e2f", sat: "891,234,567", rarity: "Rare", tags: ["Diamond", "Cyborg"] },
];
const RUNES = [
  { id: 5, type: "rune", emoji: "🟣", name: "UNCOMMON•GOODS", collection: "Runes Protocol", price: "0.000042", usd: "$0.004", supply: "21B", holders: "48,291", marketCap: "$84.2M", change: "+12.4%" },
  { id: 6, type: "rune", emoji: "🔮", name: "DOG•GO•TO•THE•MOON", collection: "Runes Protocol", price: "0.000018", usd: "$0.0017", supply: "100B", holders: "102,884", marketCap: "$172M", change: "+8.1%" },
  { id: 7, type: "rune", emoji: "🌙", name: "SATOSHI•NAKAMOTO", collection: "Runes Protocol", price: "0.00091", usd: "$0.088", supply: "21M", holders: "12,450", marketCap: "$1.85M", change: "-3.2%" },
];
const BRC20 = [
  { id: 8, type: "brc", emoji: "🔵", name: "ORDI", collection: "BRC-20", price: "0.00082", usd: "$0.0795", supply: "21M", holders: "89,234", marketCap: "$1.67M", change: "+5.6%" },
  { id: 9, type: "brc", emoji: "🌊", name: "SATS", collection: "BRC-20", price: "0.0000003", usd: "$0.000029", supply: "2.1T", holders: "214,890", marketCap: "$60.9M", change: "+2.8%" },
  { id: 10, type: "brc", emoji: "🎯", name: "RATS", collection: "BRC-20", price: "0.00000041", usd: "$0.000040", supply: "1T", holders: "76,112", marketCap: "$39.7M", change: "-1.4%" },
];

const TICKER_DATA = [
  { name: "Ordinal Punks", price: "0.085 BTC", change: "+4.2%", up: true, type: "ord" },
  { name: "Bitcoin Frogs", price: "0.042 BTC", change: "+1.8%", up: true, type: "ord" },
  { name: "UNCOMMON•GOODS", price: "0.000042 BTC", change: "+12.4%", up: true, type: "rune" },
  { name: "DOG•GO•TO•THE•MOON", price: "0.000018 BTC", change: "+8.1%", up: true, type: "rune" },
  { name: "ORDI", price: "0.00082 BTC", change: "+5.6%", up: true, type: "brc" },
  { name: "SATS", price: "0.0000003 BTC", change: "+2.8%", up: true, type: "brc" },
  { name: "NodeMonkes", price: "0.128 BTC", change: "+9.1%", up: true, type: "ord" },
  { name: "SATOSHI•NAKAMOTO", price: "0.00091 BTC", change: "-3.2%", up: false, type: "rune" },
  { name: "RATS", price: "0.00000041 BTC", change: "-1.4%", up: false, type: "brc" },
];

const ACTIVITY = [
  { type: "sale", asset: "Ordinal Punk #4291", price: "0.085 BTC", from: "bc1qxy2...9fk", to: "bc1pz4k...8mn", time: "2m ago" },
  { type: "list", asset: "DOG•GO•TO•THE•MOON", price: "0.000018 BTC", from: "bc1q4a7...3xp", to: "—", time: "5m ago" },
  { type: "sale", asset: "NodeMonke #2099", price: "0.128 BTC", from: "bc1pf8r...7qw", to: "bc1q9d2...1yz", time: "11m ago" },
  { type: "sale", asset: "ORDI ×1000", price: "0.82 BTC", from: "bc1qm3t...5rs", to: "bc1p0x1...4ab", time: "18m ago" },
  { type: "list", asset: "Rare Sat – Vintage", price: "0.310 BTC", from: "bc1qw8n...6cd", to: "—", time: "24m ago" },
  { type: "transfer", asset: "SATS ×5,000,000", price: "—", from: "bc1q2j6...9ef", to: "bc1pk4r...2gh", time: "31m ago" },
];

const WALLETS = [
  { name: "Xverse", desc: "Most popular Bitcoin & Ordinals wallet", icon: "🟧", color: "#F7931A" },
  { name: "Leather", desc: "Formerly Hiro Wallet — Bitcoin native", icon: "🟤", color: "#8B4513" },
  { name: "UniSat", desc: "Built for Ordinals & BRC-20", icon: "🔵", color: "#3B82F6" },
  { name: "OKX Wallet", desc: "Multi-chain with Bitcoin Ordinals support", icon: "⬛", color: "#333" },
];

const badgeClass = (type) => type === "ord" ? "badge-ord" : type === "rune" ? "badge-rune" : "badge-brc";
const badgeLabel = (type) => type === "ord" ? "ORDINAL" : type === "rune" ? "RUNE" : "BRC-20";
const typeColor = (type) => type === "ord" ? "#f7931a" : type === "rune" ? "#a78bfa" : "#38bdf8";

export default function Home() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [walletModal, setWalletModal] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddr, setWalletAddr] = useState("");
  const [toast, setToast] = useState(null);
  const [buying, setBuying] = useState(false);
  const [txStep, setTxStep] = useState(0);

  const showToast = (msg, icon = "✅") => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3500);
  };

  const connectWallet = (wallet) => {
    setWalletModal(false);
    const addr = "bc1p" + Math.random().toString(36).slice(2, 8) + "..." + Math.random().toString(36).slice(2, 5);
    setWalletAddr(addr);
    setConnected(true);
    showToast(`${wallet.name} connected`, "🔗");
  };

  const handleBuy = () => {
    if (!connected) { setWalletModal(true); return; }
    setBuying(true); setTxStep(1);
    setTimeout(() => setTxStep(2), 1200);
    setTimeout(() => setTxStep(3), 2400);
    setTimeout(() => {
      setBuying(false); setTxStep(0); setSelected(null);
      showToast("Purchase complete! Asset transferred to your wallet.", "🎉");
    }, 3600);
  };

  const allItems = [...ORDINALS, ...RUNES, ...BRC20];
  const filtered = allItems.filter(item => {
    if (tab !== "all" && item.type !== tab) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stepLabels = ["", "Building PSBT...", "Awaiting wallet signature...", "Broadcasting to Bitcoin..."];

  return (
    <>
      <Head>
        <title>SATS.MKT — Bitcoin Ordinals & Runes Marketplace</title>
        <meta name="description" content="Trade Ordinals, Runes, and BRC-20 tokens trustlessly on Bitcoin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        :root {
          --bg: #080808; --surface: #0f0f0f; --surface2: #161616;
          --border: #222; --border2: #2a2a2a;
          --orange: #f7931a; --orange-glow: rgba(247,147,26,0.15);
          --text: #f0ece4; --text2: #888; --text3: #555;
          --green: #22c55e; --red: #ef4444;
          --rune: #a78bfa; --brc: #38bdf8;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; min-height: 100vh; }
        .mono { font-family: 'Space Mono', monospace; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 32px; height: 64px;
          background: rgba(8,8,8,0.92); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 800; letter-spacing: -0.5px; }
        .nav-logo-icon { width: 28px; height: 28px; background: var(--orange); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #000; }
        .nav-links { display: flex; gap: 2px; }
        .nav-link { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text2); cursor: pointer; transition: all 0.15s; border: none; background: none; font-family: 'Syne', sans-serif; }
        .nav-link:hover, .nav-link.active { color: var(--text); background: var(--surface2); }
        .btn-connect { padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; background: var(--orange); color: #000; border: none; cursor: pointer; font-family: 'Syne', sans-serif; transition: all 0.15s; }
        .btn-connect:hover { background: #ffaa33; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(247,147,26,0.4); }
        .wallet-connected { display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: var(--surface2); border: 1px solid var(--border2); border-radius: 8px; font-size: 12px; font-family: 'Space Mono', monospace; color: var(--text2); cursor: pointer; }
        .wallet-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); box-shadow: 0 0 6px var(--green); }

        .ticker-bar { position: fixed; top: 64px; left: 0; right: 0; z-index: 99; height: 36px; background: var(--surface); border-bottom: 1px solid var(--border); overflow: hidden; display: flex; align-items: center; }
        .ticker-track { display: flex; gap: 48px; white-space: nowrap; animation: ticker 30s linear infinite; padding: 0 24px; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-item { display: flex; align-items: center; gap: 8px; font-size: 11px; font-family: 'Space Mono', monospace; }
        .ticker-name { color: var(--text2); }
        .ticker-price { color: var(--text); font-weight: 700; }
        .ticker-change.up { color: var(--green); }
        .ticker-change.down { color: var(--red); }
        .ticker-badge { padding: 1px 5px; border-radius: 3px; font-size: 9px; font-weight: 700; }
        .badge-ord { background: rgba(247,147,26,0.15); color: var(--orange); }
        .badge-rune { background: rgba(167,139,250,0.15); color: var(--rune); }
        .badge-brc { background: rgba(56,189,248,0.15); color: var(--brc); }

        .main { padding-top: 100px; }

        .hero { padding: 60px 48px 40px; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; z-index: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(247,147,26,0.07) 0%, transparent 70%); }
        .hero-grid { position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 48px 48px; opacity: 0.3; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent); }
        .hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
        .hero-label { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: var(--orange-glow); border: 1px solid rgba(247,147,26,0.2); border-radius: 20px; font-size: 11px; font-weight: 700; color: var(--orange); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; }
        .hero-label-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--orange); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .hero-title { font-size: clamp(36px, 5vw, 64px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; margin-bottom: 16px; }
        .hero-title span { color: var(--orange); }
        .hero-sub { font-size: 16px; color: var(--text2); max-width: 480px; line-height: 1.6; margin-bottom: 36px; }
        .hero-stats { display: flex; gap: 48px; }
        .hero-stat-val { font-size: 28px; font-weight: 800; font-family: 'Space Mono', monospace; letter-spacing: -1px; }
        .hero-stat-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

        .filters-bar { padding: 0 48px; }
        .filters-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
        .filter-tabs { display: flex; gap: 4px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 3px; }
        .filter-tab { padding: 6px 16px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.15s; border: none; font-family: 'Syne', sans-serif; background: none; color: var(--text2); }
        .filter-tab:hover { color: var(--text); }
        .filter-tab.tab-all.active { background: var(--surface2); color: var(--text); }
        .filter-tab.tab-ord.active { background: rgba(247,147,26,0.15); color: var(--orange); }
        .filter-tab.tab-rune.active { background: rgba(167,139,250,0.15); color: var(--rune); }
        .filter-tab.tab-brc.active { background: rgba(56,189,248,0.15); color: var(--brc); }
        .search-box { flex: 1; min-width: 200px; max-width: 320px; display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; }
        .search-input { background: none; border: none; outline: none; color: var(--text); font-family: 'Syne', sans-serif; font-size: 13px; width: 100%; }
        .search-input::placeholder { color: var(--text3); }
        .sort-select { background: var(--surface); border: 1px solid var(--border); color: var(--text2); padding: 7px 12px; border-radius: 8px; font-size: 12px; font-family: 'Syne', sans-serif; outline: none; cursor: pointer; }

        .grid-wrap { padding: 24px 48px 64px; }
        .grid-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }

        .card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; cursor: pointer; transition: all 0.2s; position: relative; }
        .card:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .card:hover .card-buy { opacity: 1; transform: translateY(0); }
        .card-img { width: 100%; aspect-ratio: 1; position: relative; background: var(--surface2); display: flex; align-items: center; justify-content: center; font-size: 64px; }
        .card-type-badge { position: absolute; top: 10px; left: 10px; }
        .card-body { padding: 14px; }
        .card-name { font-size: 14px; font-weight: 700; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-collection { font-size: 11px; color: var(--text3); margin-bottom: 12px; font-family: 'Space Mono', monospace; }
        .card-rune-info { display: flex; gap: 12px; margin-bottom: 10px; }
        .card-rune-stat-label { font-size: 9px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; }
        .card-rune-stat-val { font-size: 13px; font-weight: 700; font-family: 'Space Mono', monospace; }
        .card-price { font-size: 15px; font-weight: 800; font-family: 'Space Mono', monospace; color: var(--orange); }
        .card-price-usd { font-size: 10px; color: var(--text3); margin-top: 1px; }
        .card-buy { position: absolute; bottom: 14px; right: 14px; padding: 6px 14px; background: var(--orange); color: #000; border-radius: 6px; font-size: 11px; font-weight: 800; font-family: 'Syne', sans-serif; opacity: 0; transform: translateY(4px); transition: all 0.15s; border: none; cursor: pointer; }

        .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .modal { background: var(--surface); border: 1px solid var(--border2); border-radius: 20px; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; }
        .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--border); }
        .modal-title { font-size: 16px; font-weight: 800; }
        .modal-close { width: 32px; height: 32px; border-radius: 8px; background: var(--surface2); border: 1px solid var(--border); color: var(--text2); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .modal-body { padding: 24px; }
        .modal-asset { display: flex; gap: 24px; margin-bottom: 24px; }
        .modal-asset-img { width: 140px; height: 140px; border-radius: 12px; background: var(--surface2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 56px; flex-shrink: 0; }
        .modal-asset-name { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; }
        .modal-asset-col { font-size: 12px; color: var(--text3); font-family: 'Space Mono', monospace; margin-bottom: 16px; }
        .modal-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .modal-tag { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; background: var(--surface2); color: var(--text2); }
        .modal-price-section { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .modal-price-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .modal-price-main { font-size: 28px; font-weight: 800; font-family: 'Space Mono', monospace; color: var(--orange); }
        .modal-price-usd { font-size: 14px; color: var(--text2); margin-top: 2px; }
        .modal-details { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .modal-detail { background: var(--surface2); border-radius: 8px; padding: 12px; }
        .modal-detail-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .modal-detail-val { font-size: 13px; font-weight: 700; font-family: 'Space Mono', monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .psbt-section { background: rgba(247,147,26,0.04); border: 1px solid rgba(247,147,26,0.15); border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .psbt-title { font-size: 12px; font-weight: 700; color: var(--orange); margin-bottom: 8px; }
        .psbt-step { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; }
        .psbt-step-num { width: 18px; height: 18px; border-radius: 50%; background: var(--orange); color: #000; font-size: 10px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .psbt-step-text { font-size: 12px; color: var(--text2); line-height: 1.5; }
        .btn-buy-now { width: 100%; padding: 14px; background: var(--orange); color: #000; border: none; border-radius: 12px; font-size: 15px; font-weight: 800; font-family: 'Syne', sans-serif; cursor: pointer; transition: all 0.15s; }
        .btn-buy-now:hover { background: #ffaa33; box-shadow: 0 4px 24px rgba(247,147,26,0.4); }
        .btn-offer { width: 100%; padding: 14px; background: transparent; color: var(--text); border: 1px solid var(--border2); border-radius: 12px; font-size: 14px; font-weight: 700; font-family: 'Syne', sans-serif; cursor: pointer; transition: all 0.15s; margin-top: 8px; }
        .btn-offer:hover { background: var(--surface2); }
        .wallet-option { display: flex; align-items: center; gap: 14px; padding: 14px; border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: all 0.15s; margin-bottom: 8px; }
        .wallet-option:hover { background: var(--surface2); border-color: var(--border2); }
        .wallet-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .wallet-name { font-size: 14px; font-weight: 700; }
        .wallet-desc { font-size: 12px; color: var(--text3); margin-top: 1px; }
        .toast { position: fixed; bottom: 32px; right: 32px; z-index: 300; background: var(--surface2); border: 1px solid var(--border2); border-radius: 10px; padding: 12px 18px; font-size: 13px; display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .activity-bar { padding: 0 48px 64px; }
        .activity-inner { max-width: 1200px; margin: 0 auto; }
        .section-title { font-size: 18px; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .section-title-line { flex: 1; height: 1px; background: var(--border); }
        .activity-table { width: 100%; border-collapse: collapse; }
        .activity-table th { text-align: left; padding: 8px 12px; color: var(--text3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-size: 10px; border-bottom: 1px solid var(--border); }
        .activity-table td { padding: 10px 12px; border-bottom: 1px solid rgba(34,34,34,0.5); color: var(--text2); font-family: 'Space Mono', monospace; font-size: 11px; }
        .activity-table tr:hover td { background: var(--surface2); color: var(--text); }
        .act-type { padding: 2px 8px; border-radius: 4px; font-size: 9px; font-weight: 700; }
        .act-sale { background: rgba(34,197,94,0.12); color: var(--green); }
        .act-list { background: rgba(247,147,26,0.12); color: var(--orange); }
        .act-transfer { background: rgba(136,136,136,0.12); color: var(--text3); }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">₿</div>
          SATS.MKT
        </div>
        <div className="nav-links">
          {["Market", "Collections", "Runes", "BRC-20", "Activity"].map(l => (
            <button key={l} className={`nav-link${l === "Market" ? " active" : ""}`}>{l}</button>
          ))}
        </div>
        <div>
          {connected
            ? <div className="wallet-connected"><div className="wallet-dot" />{walletAddr}</div>
            : <button className="btn-connect" onClick={() => setWalletModal(true)}>Connect Wallet</button>
          }
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...TICKER_DATA, ...TICKER_DATA].map((t, i) => (
            <div key={i} className="ticker-item">
              <span className={`ticker-badge ${badgeClass(t.type)}`}>{badgeLabel(t.type)}</span>
              <span className="ticker-name">{t.name}</span>
              <span className="ticker-price">{t.price}</span>
              <span className={`ticker-change ${t.up ? "up" : "down"}`}>{t.change}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="main">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" /><div className="hero-grid" />
          <div className="hero-content">
            <div className="hero-label"><div className="hero-label-dot" />Live — Bitcoin Mainnet</div>
            <h1 className="hero-title">The Ordinals &amp; Runes<br />Marketplace <span>Bitcoin Deserves</span></h1>
            <p className="hero-sub">Trade Ordinals, Runes, and BRC-20 tokens trustlessly via PSBT. No custody. No middlemen. Pure Bitcoin.</p>
            <div className="hero-stats">
              <div><div className="hero-stat-val mono">$48.2M</div><div className="hero-stat-label">24h Volume</div></div>
              <div><div className="hero-stat-val mono">284K</div><div className="hero-stat-label">Listings</div></div>
              <div><div className="hero-stat-val mono">91K</div><div className="hero-stat-label">Traders</div></div>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <div className="filters-bar">
          <div className="filters-inner">
            <div className="filter-tabs">
              {[["all","All"], ["ord","Ordinals"], ["rune","Runes"], ["brc","BRC-20"]].map(([v,l]) => (
                <button key={v} className={`filter-tab tab-${v}${tab === v ? " active" : ""}`} onClick={() => setTab(v)}>{l}</button>
              ))}
            </div>
            <div className="search-box">
              <input className="search-input" placeholder="Search collections, runes, tokens..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="sort-select">
              <option>Sort: Floor Price ↓</option>
              <option>Sort: Recent</option>
              <option>Sort: Volume</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="grid-wrap">
          <div className="grid-inner">
            {filtered.map(item => (
              <div key={item.id} className="card" onClick={() => setSelected(item)}>
                <div className="card-img">
                  {item.emoji}
                  <div className="card-type-badge">
                    <span className={`ticker-badge ${badgeClass(item.type)}`}>{badgeLabel(item.type)}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-name">{item.name}</div>
                  <div className="card-collection">{item.collection}</div>
                  {(item.type === "rune" || item.type === "brc") && (
                    <div className="card-rune-info">
                      <div style={{flex:1}}>
                        <div className="card-rune-stat-label">Mkt Cap</div>
                        <div className="card-rune-stat-val" style={{color: typeColor(item.type)}}>{item.marketCap}</div>
                      </div>
                      <div style={{flex:1}}>
                        <div className="card-rune-stat-label">24h</div>
                        <div className="card-rune-stat-val" style={{color: item.change?.startsWith("+") ? "#22c55e" : "#ef4444"}}>{item.change}</div>
                      </div>
                    </div>
                  )}
                  <div className="card-price">{item.price} BTC</div>
                  <div className="card-price-usd">{item.usd}</div>
                </div>
                <button className="card-buy">Buy Now</button>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="activity-bar">
          <div className="activity-inner">
            <div className="section-title">Live Activity <div className="section-title-line" /></div>
            <table className="activity-table">
              <thead><tr><th>Type</th><th>Asset</th><th>Price</th><th>From</th><th>To</th><th>Time</th></tr></thead>
              <tbody>
                {ACTIVITY.map((a, i) => (
                  <tr key={i}>
                    <td><span className={`act-type act-${a.type}`}>{a.type.toUpperCase()}</span></td>
                    <td style={{color:"#f0ece4",fontWeight:700}}>{a.asset}</td>
                    <td style={{color:"#f7931a"}}>{a.price}</td>
                    <td>{a.from}</td><td>{a.to}</td>
                    <td style={{color:"#555"}}>{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ITEM MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={e => { if(e.target === e.currentTarget) setSelected(null); }}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">{selected.name}</div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-asset">
                <div className="modal-asset-img">{selected.emoji}</div>
                <div>
                  <div className="modal-asset-name">{selected.name}</div>
                  <div className="modal-asset-col">{selected.collection}</div>
                  <div className="modal-tags">
                    <span className={`modal-tag ticker-badge ${badgeClass(selected.type)}`}>{badgeLabel(selected.type)}</span>
                    {selected.rarity && <span className="modal-tag">{selected.rarity}</span>}
                    {selected.tags?.map(t => <span key={t} className="modal-tag">{t}</span>)}
                  </div>
                </div>
              </div>
              <div className="modal-price-section">
                <div className="modal-price-label">Current Price</div>
                <div className="modal-price-main">{selected.price} BTC</div>
                <div className="modal-price-usd">≈ {selected.usd}</div>
              </div>
              <div className="modal-details">
                {selected.inscription && <div className="modal-detail"><div className="modal-detail-label">Inscription ID</div><div className="modal-detail-val">{selected.inscription}</div></div>}
                {selected.sat && <div className="modal-detail"><div className="modal-detail-label">Sat Number</div><div className="modal-detail-val">{selected.sat}</div></div>}
                {selected.supply && <div className="modal-detail"><div className="modal-detail-label">Total Supply</div><div className="modal-detail-val">{selected.supply}</div></div>}
                {selected.holders && <div className="modal-detail"><div className="modal-detail-label">Holders</div><div className="modal-detail-val">{selected.holders}</div></div>}
                {selected.marketCap && <div className="modal-detail"><div className="modal-detail-label">Market Cap</div><div className="modal-detail-val">{selected.marketCap}</div></div>}
                {selected.change && <div className="modal-detail"><div className="modal-detail-label">24h Change</div><div className="modal-detail-val" style={{color: selected.change.startsWith("+") ? "#22c55e" : "#ef4444"}}>{selected.change}</div></div>}
              </div>
              <div className="psbt-section">
                <div className="psbt-title">⚡ PSBT Trustless Trade</div>
                <div className="psbt-step"><div className="psbt-step-num">1</div><div className="psbt-step-text">Seller creates a Partially Signed Bitcoin Transaction locking their asset</div></div>
                <div className="psbt-step"><div className="psbt-step-num">2</div><div className="psbt-step-text">You sign the buyer half with your wallet — no funds leave until confirmed</div></div>
                <div className="psbt-step"><div className="psbt-step-num">3</div><div className="psbt-step-text">Combined PSBT broadcasts to Bitcoin — atomic swap, no custody</div></div>
              </div>
              {buying ? (
                <div style={{textAlign:"center",padding:"16px 0"}}>
                  <div style={{fontSize:13,color:"#f7931a",fontFamily:"'Space Mono',monospace",marginBottom:8}}>{["","Building PSBT...","Awaiting wallet signature...","Broadcasting to Bitcoin..."][txStep]}</div>
                  <div style={{background:"#161616",borderRadius:8,height:4,overflow:"hidden"}}>
                    <div style={{height:"100%",background:"#f7931a",width:`${(txStep/3)*100}%`,transition:"width 0.8s ease",borderRadius:8}} />
                  </div>
                </div>
              ) : (
                <>
                  <button className="btn-buy-now" onClick={handleBuy}>{connected ? `Buy for ${selected.price} BTC` : "Connect Wallet to Buy"}</button>
                  <button className="btn-offer">Make Offer</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WALLET MODAL */}
      {walletModal && (
        <div className="modal-overlay" onClick={e => { if(e.target === e.currentTarget) setWalletModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Connect Bitcoin Wallet</div>
              <button className="modal-close" onClick={() => setWalletModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{fontSize:13,color:"#888",marginBottom:20,lineHeight:1.6}}>Connect your Bitcoin wallet to buy, sell, and list Ordinals, Runes, and BRC-20 tokens. All trades are trustless via PSBT — we never hold your funds.</p>
              {WALLETS.map(w => (
                <div key={w.name} className="wallet-option" onClick={() => connectWallet(w)}>
                  <div className="wallet-icon" style={{background: w.color + "22"}}>{w.icon}</div>
                  <div><div className="wallet-name">{w.name}</div><div className="wallet-desc">{w.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast"><span>{toast.icon}</span>{toast.msg}</div>}
    </>
  );
}
