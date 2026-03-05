import { useState, useEffect } from "react";
import Head from "next/head";

const HIRO_API = "https://api.hiro.so";
const API_KEY = process.env.NEXT_PUBLIC_HIRO_API_KEY;

const COLLECTIONS = [
  { id:1, name:"NodeMonkes", floor:"0.0240", change:"-15.2%", vol:"3.48", sales:159, listed:"14.4%", cap:"239.90", img:"💎", color:"#0d1f0d" },
  { id:2, name:"Bitcoin Puppets", floor:"0.0110", change:"-2.7%", vol:"2.06", sales:199, listed:"11.2%", cap:"120.01", img:"🤡", color:"#1a1f0d" },
  { id:3, name:"Runestone", floor:"0.0012", change:"-12.7%", vol:"1.91", sales:1212, listed:"2.5%", cap:"185.39", img:"⚔️", color:"#0d1a0d" },
  { id:4, name:"Bitcoin Frogs", floor:"0.0043", change:"+16.2%", vol:"0.80", sales:20, listed:"10.6%", cap:"49.00", img:"🐸", color:"#0d1f0d" },
  { id:5, name:"Ordinal Maxi Biz", floor:"0.0160", change:"-12.1%", vol:"1.77", sales:100, listed:"1.2%", cap:"143.93", img:"🧙", color:"#1a1f0d" },
  { id:6, name:"Bitcoin Shrooms", floor:"0.3333", change:"-0.5%", vol:"0.48", sales:2, listed:"1.8%", cap:"74.66", img:"🍄", color:"#0d1a0d" },
  { id:7, name:"Taproot Wizards", floor:"0.0587", change:"-14.9%", vol:"0.46", sales:10, listed:"0.6%", cap:"123.63", img:"🧙‍♂️", color:"#0d1f0d" },
  { id:8, name:"CENTS", floor:"0.0062", change:"+12.6%", vol:"0.40", sales:78, listed:"6.6%", cap:"401.88", img:"🪙", color:"#1a1f0d" },
];

const RUNES = [
  { id:1, name:"UNCOMMON•GOODS", floor:"0.000042", change:"+12.4%", vol:"84.2", sales:4829, listed:"48,291", cap:"$84.2M", img:"🌿", color:"#0d1f0d" },
  { id:2, name:"DOG•GO•TO•THE•MOON", floor:"0.000018", change:"+8.1%", vol:"172", sales:10288, listed:"102,884", cap:"$172M", img:"🐕", color:"#1a1f0d" },
  { id:3, name:"SATOSHI•NAKAMOTO", floor:"0.00091", change:"-3.2%", vol:"1.85", sales:1245, listed:"12,450", cap:"$1.85M", img:"₿", color:"#0d1a0d" },
  { id:4, name:"RSIC•GENESIS•RUNE", floor:"0.00032", change:"+5.1%", vol:"12.4", sales:892, listed:"8,921", cap:"$12.4M", img:"⚡", color:"#0d1f0d" },
  { id:5, name:"PUPS•WORLD•PEACE", floor:"0.00015", change:"+22.3%", vol:"8.9", sales:3421, listed:"34,210", cap:"$8.9M", img:"🌸", color:"#1a1f0d" },
  { id:6, name:"MAGIC•INTERNET•MONEY", floor:"0.00008", change:"-1.8%", vol:"4.2", sales:2100, listed:"21,000", cap:"$4.2M", img:"✨", color:"#0d1a0d" },
];

const BRC20 = [
  { id:1, name:"ORDI", floor:"0.00082", change:"+5.6%", vol:"1.67", sales:8923, listed:"89,234", cap:"$1.67M", img:"🌱", color:"#0d1f0d" },
  { id:2, name:"SATS", floor:"0.0000003", change:"+2.8%", vol:"60.9", sales:21489, listed:"214,890", cap:"$60.9M", img:"🌊", color:"#1a1f0d" },
  { id:3, name:"RATS", floor:"0.00000041", change:"-1.4%", vol:"39.7", sales:7611, listed:"76,112", cap:"$39.7M", img:"🐀", color:"#0d1a0d" },
  { id:4, name:"MEME", floor:"0.00000021", change:"+8.9%", vol:"12.1", sales:4200, listed:"42,000", cap:"$12.1M", img:"😂", color:"#0d1f0d" },
  { id:5, name:"DOGE", floor:"0.00000089", change:"-4.2%", vol:"8.8", sales:1890, listed:"18,900", cap:"$8.8M", img:"🐶", color:"#1a1f0d" },
  { id:6, name:"PEPE", floor:"0.00000012", change:"+31.4%", vol:"22.4", sales:9821, listed:"98,210", cap:"$22.4M", img:"🐸", color:"#0d1a0d" },
];

const MEMPOOL = [
  { time:"5s", col:"NodeMonkes", price:"0.0240", type:"sale" },
  { time:"12s", col:"UNCOMMON•GOODS", price:"0.000042", type:"list" },
  { time:"28s", col:"Runestone", price:"0.0012", type:"sale" },
  { time:"41s", col:"ORDI", price:"0.00082", type:"sale" },
  { time:"1m", col:"Bitcoin Frogs", price:"0.0043", type:"list" },
  { time:"1m", col:"DOG•GO•TO•THE•MOON", price:"0.000018", type:"sale" },
  { time:"2m", col:"SATS", price:"0.0000003", type:"transfer" },
  { time:"2m", col:"Taproot Wizards", price:"0.0587", type:"list" },
];

const TRENDING = [
  { name:"NodeMonkes", img:"💎", floor:"0.0240" },
  { name:"Bitcoin Frogs", img:"🐸", floor:"0.0043" },
  { name:"UNCOMMON•GOODS", img:"🌿", floor:"0.000042" },
  { name:"DOG•GO•TO•THE•MOON", img:"🐕", floor:"0.000018" },
  { name:"Runestone", img:"⚔️", floor:"0.0012" },
  { name:"ORDI", img:"🌱", floor:"0.00082" },
  { name:"Taproot Wizards", img:"🧙‍♂️", floor:"0.0587" },
  { name:"PEPE", img:"🐸", floor:"0.00000012" },
  { name:"RATS", img:"🐀", floor:"0.00000041" },
  { name:"RSIC•GENESIS•RUNE", img:"⚡", floor:"0.00032" },
];

const WALLETS = [
  { name:"Xverse", desc:"Most popular Bitcoin & Ordinals wallet", icon:"🟧", color:"#F7931A" },
  { name:"Leather", desc:"Formerly Hiro Wallet — Bitcoin native", icon:"🟤", color:"#8B4513" },
  { name:"UniSat", desc:"Built for Ordinals & BRC-20", icon:"🔵", color:"#3B82F6" },
  { name:"OKX Wallet", desc:"Multi-chain with Bitcoin Ordinals support", icon:"⬛", color:"#333" },
];

export default function Home() {
  const [tab, setTab] = useState("ordinals");
  const [timeframe, setTimeframe] = useState("1d");
  const [btcPrice, setBtcPrice] = useState(72000);
  const [walletModal, setWalletModal] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [connecting, setConnecting] = useState("");
  const [connected, setConnected] = useState(false);
  const [walletAddr, setWalletAddr] = useState("");
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [mempoolItems, setMempoolItems] = useState(MEMPOOL);

  useEffect(() => {
    fetchBtcPrice();
    const interval = setInterval(() => {
      setMempoolItems(prev => {
        const types = ["sale","list","transfer"];
        const cols = ["NodeMonkes","Runestone","ORDI","DOG•GO•TO•THE•MOON","Bitcoin Frogs","SATS"];
        const prices = ["0.0240","0.0012","0.00082","0.000018","0.0043","0.0000003"];
        const idx = Math.floor(Math.random()*cols.length);
        return [{ time:"now", col:cols[idx], price:prices[idx], type:types[Math.floor(Math.random()*types.length)] }, ...prev.slice(0,7)];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchBtcPrice = async () => {
    try {
      const res = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot");
      const data = await res.json();
      setBtcPrice(parseFloat(data.data.amount));
    } catch(e) {}
  };

  const showToast = (msg, icon="✅") => { setToast({msg,icon}); setTimeout(()=>setToast(null),3000); };
  const connectWallet = (w) => { setWalletModal(false); setWalletAddr("bc1p"+Math.random().toString(36).slice(2,8)+"..."+Math.random().toString(36).slice(2,5)); setConnected(true); showToast(`${w.name} connected`,"🌿"); };


  const connectXverse = async () => {
    setConnecting("Xverse");
    try {
      if (typeof window.XverseProviders === "undefined" && typeof window.BitcoinProvider === "undefined") {
        showToast("Xverse not installed — opening download page","🟧");
        window.open("https://www.xverse.app/download","_blank");
        setConnecting(""); return;
      }
      const provider = window.XverseProviders?.BitcoinProvider || window.BitcoinProvider;
      const response = await provider.request("getAccounts", {
        purposes: ["ordinals","payment"],
        message: "Connect to The Garden",
      });
      if (response?.result?.length > 0) {
        const account = response.result.find(a => a.purpose === "ordinals") || response.result[0];
        const addr = account.address;
        setWalletAddr(addr.slice(0,6)+"..."+addr.slice(-4));
        setWalletType("Xverse"); setConnected(true); setWalletModal(false);
        showToast("Xverse connected — welcome to The Garden 🌿","🟧");
      }
    } catch(e) { showToast("Connection cancelled","❌"); }
    setConnecting("");
  };

  const connectLeather = async () => {
    setConnecting("Leather");
    try {
      if (typeof window.LeatherProvider === "undefined") {
        showToast("Leather not installed — opening download page","🟤");
        window.open("https://leather.io/install-extension","_blank");
        setConnecting(""); return;
      }
      const response = await window.LeatherProvider.request("getAddresses");
      if (response?.result?.addresses) {
        const addr = (response.result.addresses.find(a => a.type === "p2tr") || response.result.addresses[0]).address;
        setWalletAddr(addr.slice(0,6)+"..."+addr.slice(-4));
        setWalletType("Leather"); setConnected(true); setWalletModal(false);
        showToast("Leather connected — welcome to The Garden 🌿","🟤");
      }
    } catch(e) { showToast("Connection cancelled","❌"); }
    setConnecting("");
  };

  const connectUnisat = async () => {
    setConnecting("UniSat");
    try {
      if (typeof window.unisat === "undefined") {
        showToast("UniSat not installed — opening download page","🔵");
        window.open("https://unisat.io/download","_blank");
        setConnecting(""); return;
      }
      const accounts = await window.unisat.requestAccounts();
      if (accounts?.length > 0) {
        const addr = accounts[0];
        setWalletAddr(addr.slice(0,6)+"..."+addr.slice(-4));
        setWalletType("UniSat"); setConnected(true); setWalletModal(false);
        showToast("UniSat connected — welcome to The Garden 🌿","🔵");
      }
    } catch(e) { showToast("Connection cancelled","❌"); }
    setConnecting("");
  };

  const disconnect = () => {
    setConnected(false); setWalletAddr(""); setWalletType("");
    showToast("Wallet disconnected","👋");
  };

  const handleWalletClick = (name) => {
    if (name === "Xverse") connectXverse();
    else if (name === "Leather") connectLeather();
    else if (name === "UniSat") connectUnisat();
    else { showToast("OKX coming soon","⬛"); setWalletModal(false); }
  };

  const tableData = tab==="ordinals" ? COLLECTIONS : tab==="runes" ? RUNES : BRC20;
  const filtered = search ? tableData.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())) : tableData;

  return (
    <>
      <Head>
        <title>The Garden — Bitcoin Ordinals, Runes & BRC-20</title>
        <meta name="description" content="The Garden. Where Bitcoin assets grow." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        :root{
          --bg:#080f08;
          --surface:#0d160d;
          --surface2:#121f12;
          --border:#1a2e1a;
          --border2:#243d24;
          --green:#4ade80;
          --green-dim:#22c55e;
          --green-glow:rgba(74,222,128,0.15);
          --orange:#f7931a;
          --text:#e8f5e8;
          --text2:#7a9e7a;
          --text3:#3d5c3d;
          --red:#f87171;
          --up:#4ade80;
          --down:#f87171;
        }
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh;}

        /* NAV */
        .nav{position:fixed;top:0;left:0;right:0;z-index:100;height:58px;display:flex;align-items:center;padding:0 28px;gap:24px;background:rgba(8,15,8,0.96);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);}
        .nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer;}
        .nav-logo-icon{width:32px;height:32px;background:linear-gradient(135deg,#1a4d1a,#2d7a2d);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;border:1px solid var(--border2);}
        .nav-logo-text{font-size:17px;font-weight:700;letter-spacing:-0.3px;color:var(--text);}
        .nav-logo-sub{font-size:10px;color:var(--text3);letter-spacing:1px;text-transform:uppercase;margin-top:-2px;}
        .nav-search{flex:1;max-width:440px;display:flex;align-items:center;gap:8px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:8px 14px;transition:all 0.15s;}
        .nav-search:focus-within{border-color:var(--border2);box-shadow:0 0 0 3px rgba(74,222,128,0.06);}
        .nav-search input{background:none;border:none;outline:none;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;width:100%;}
        .nav-search input::placeholder{color:var(--text3);}
        .nav-links{display:flex;gap:2px;margin-left:auto;}
        .nav-link{padding:6px 14px;border-radius:6px;font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;border:none;background:none;font-family:'DM Sans',sans-serif;white-space:nowrap;transition:all 0.15s;}
        .nav-link:hover,.nav-link.active{color:var(--text);background:var(--surface2);}
        .nav-right{display:flex;align-items:center;gap:10px;}
        .btc-chip{display:flex;align-items:center;gap:6px;padding:5px 10px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;font-size:11px;font-family:'Space Mono',monospace;color:var(--text2);}
        .btc-dot{width:5px;height:5px;border-radius:50%;background:var(--orange);}
        .btn-connect{padding:7px 18px;border-radius:7px;font-size:13px;font-weight:600;background:linear-gradient(135deg,#1a5c1a,#2d8a2d);color:var(--green);border:1px solid var(--border2);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;white-space:nowrap;}
        .btn-connect:hover{background:linear-gradient(135deg,#1f6e1f,#338a33);box-shadow:0 0 16px rgba(74,222,128,0.2);}
        .wallet-pill{display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;font-size:11px;font-family:'Space Mono',monospace;color:var(--text2);}
        .wallet-dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);}

        /* TRENDING BAR */
        .trending-bar{position:fixed;top:58px;left:0;right:0;z-index:99;height:76px;background:var(--surface);border-bottom:1px solid var(--border);overflow:hidden;display:flex;align-items:center;}
        .trending-scroll{display:flex;gap:10px;white-space:nowrap;animation:scroll 28s linear infinite;padding:0 16px;}
        @keyframes scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .trending-card{display:flex;align-items:center;gap:10px;padding:8px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;cursor:pointer;transition:all 0.15s;flex-shrink:0;}
        .trending-card:hover{border-color:var(--border2);background:#162016;}
        .trending-img{width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;background:var(--surface);border:1px solid var(--border);position:relative;flex-shrink:0;}
        .trending-badge{position:absolute;top:-4px;left:-4px;background:var(--green);color:#000;font-size:7px;font-weight:800;padding:2px 4px;border-radius:3px;letter-spacing:0.5px;}
        .trending-name{font-size:12px;font-weight:600;color:var(--text);}
        .trending-floor{font-size:10px;color:var(--text2);font-family:'Space Mono',monospace;margin-top:1px;}

        /* MAIN LAYOUT */
        .main{padding-top:134px;display:flex;}
        .content{flex:1;min-width:0;padding:20px 20px 40px 24px;}
        .sidebar{width:268px;flex-shrink:0;border-left:1px solid var(--border);padding:16px;height:calc(100vh - 134px);position:sticky;top:134px;overflow-y:auto;}

        /* TABS ROW */
        .tabs-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;gap:12px;flex-wrap:wrap;}
        .tabs{display:flex;gap:2px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:3px;}
        .tab-btn{padding:6px 20px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;background:none;color:var(--text2);transition:all 0.15s;}
        .tab-btn:hover{color:var(--text);}
        .tab-btn.active-ordinals{background:rgba(74,222,128,0.1);color:var(--green);}
        .tab-btn.active-runes{background:rgba(74,222,128,0.1);color:var(--green);}
        .tab-btn.active-brc20{background:rgba(74,222,128,0.1);color:var(--green);}
        .timeframes{display:flex;gap:2px;}
        .tf-btn{padding:5px 10px;border-radius:5px;font-size:11px;font-weight:600;cursor:pointer;border:none;font-family:'Space Mono',monospace;background:none;color:var(--text3);transition:all 0.15s;}
        .tf-btn:hover{color:var(--text2);}
        .tf-btn.active{background:var(--surface2);color:var(--text);border:1px solid var(--border);}

        /* TABLE */
        .table-wrap{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
        .table{width:100%;border-collapse:collapse;}
        .table th{text-align:left;padding:10px 16px;color:var(--text3);font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid var(--border);white-space:nowrap;}
        .table th.right,.table td.right{text-align:right;}
        .table td{padding:13px 16px;border-bottom:1px solid rgba(26,46,26,0.6);font-size:13px;vertical-align:middle;}
        .table tr:last-child td{border-bottom:none;}
        .table tr:hover td{background:rgba(74,222,128,0.02);}
        .col-info{display:flex;align-items:center;gap:12px;}
        .col-img{width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;border:1px solid var(--border);flex-shrink:0;}
        .col-name{font-size:14px;font-weight:600;color:var(--text);}
        .col-sub{font-size:11px;color:var(--text3);margin-top:1px;}
        .up{color:var(--up);}
        .down{color:var(--down);}
        .mono{font-family:'Space Mono',monospace;}
        .spark{display:flex;align-items:flex-end;gap:2px;height:20px;}
        .spark-bar{width:3px;border-radius:1px;transition:height 0.3s;}

        /* SIDEBAR */
        .sidebar-section{margin-bottom:20px;}
        .sidebar-title{font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;display:flex;align-items:center;gap:6px;}
        .live-dot{width:5px;height:5px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);animation:pulse 2s ease-in-out infinite;display:inline-block;flex-shrink:0;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
        .stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .stat-card{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 12px;}
        .stat-label{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;}
        .stat-val{font-size:15px;font-weight:700;font-family:'Space Mono',monospace;color:var(--text);}
        .stat-change{font-size:10px;margin-top:3px;}
        .mempool-item{display:flex;align-items:center;gap:6px;padding:7px 0;border-bottom:1px solid var(--border);font-size:11px;}
        .mempool-item:last-child{border-bottom:none;}
        .mempool-type{padding:2px 5px;border-radius:3px;font-size:8px;font-weight:700;flex-shrink:0;letter-spacing:0.3px;}
        .type-sale{background:rgba(74,222,128,0.12);color:var(--green);}
        .type-list{background:rgba(247,147,26,0.12);color:var(--orange);}
        .type-transfer{background:rgba(61,92,61,0.3);color:var(--text3);}
        .mempool-col{flex:1;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;}
        .mempool-price{font-family:'Space Mono',monospace;color:var(--orange);flex-shrink:0;font-size:10px;}
        .mempool-time{color:var(--text3);flex-shrink:0;min-width:24px;text-align:right;font-size:10px;}

        /* MODAL */
        .modal-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;}
        .modal{background:var(--surface);border:1px solid var(--border2);border-radius:16px;width:100%;max-width:400px;}
        .modal-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border);}
        .modal-title{font-size:15px;font-weight:700;}
        .modal-close{width:28px;height:28px;border-radius:6px;background:var(--surface2);border:1px solid var(--border);color:var(--text2);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
        .modal-body{padding:20px;}
        .modal-tagline{font-size:12px;color:var(--text2);margin-bottom:16px;line-height:1.6;}
        .wallet-option{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer;transition:all 0.15s;margin-bottom:8px;}
        .wallet-option:hover{background:var(--surface2);border-color:var(--border2);}
        .wallet-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;}
        .wallet-name{font-size:13px;font-weight:600;}
        .wallet-desc{font-size:11px;color:var(--text3);margin-top:1px;}

        /* TOAST */
        .toast{position:fixed;bottom:24px;right:24px;z-index:300;background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:10px 16px;font-size:13px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,0.5);}

        /* SCROLLBAR */
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px;}
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">🌿</div>
          <div>
            <div className="nav-logo-text">The Garden</div>
            <div className="nav-logo-sub">Bitcoin Market</div>
          </div>
        </div>
        <div className="nav-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3d5c3d" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input placeholder="Search collections, inscriptions, wallets..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <span style={{fontSize:10,color:"var(--text3)",background:"var(--surface)",border:"1px solid var(--border)",padding:"2px 5px",borderRadius:3,fontFamily:"monospace"}}>⌘K</span>
        </div>
        <div className="nav-links">
          {["Ordinals","Runes","Portfolio","Activity"].map(l=>(
            <button key={l} className={`nav-link${l==="Ordinals"?" active":""}`}>{l}</button>
          ))}
        </div>
        <div className="nav-right">
          <div className="btc-chip"><div className="btc-dot"/>₿ ${btcPrice.toLocaleString()}</div>
          {connected
            ?<div style={{display:"flex",alignItems:"center",gap:6}}>
              <div className="wallet-pill"><div className="wallet-dot"/>{walletAddr}</div>
              <button onClick={disconnect} style={{padding:"6px 10px",borderRadius:"6px",background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.2)",color:"#f87171",fontSize:"11px",cursor:"pointer",fontWeight:600}}>Disconnect</button>
            </div>
            :<button className="btn-connect" onClick={()=>setWalletModal(true)}>Enter the Garden</button>
          }
        </div>
      </nav>

      {/* TRENDING BAR */}
      <div className="trending-bar">
        <div className="trending-scroll">
          {[...TRENDING,...TRENDING].map((t,i)=>(
            <div key={i} className="trending-card">
              <div className="trending-img">
                {t.img}
                <div className="trending-badge">🌱</div>
              </div>
              <div>
                <div className="trending-name">{t.name}</div>
                <div className="trending-floor">{t.floor} BTC</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="main">
        <div className="content">
          <div className="tabs-row">
            <div className="tabs">
              {[["ordinals","Ordinals"],["runes","Runes"],["brc20","BRC-20"]].map(([v,l])=>(
                <button key={v} className={`tab-btn${tab===v?` active-${v}`:""}`} onClick={()=>setTab(v)}>{l}</button>
              ))}
            </div>
            <div className="timeframes">
              {["6h","1d","7d","30d"].map(t=>(
                <button key={t} className={`tf-btn${timeframe===t?" active":""}`} onClick={()=>setTimeframe(t)}>{t.toUpperCase()}</button>
              ))}
            </div>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{width:40}}>#</th>
                  <th>Collection</th>
                  <th className="right">Floor</th>
                  <th className="right">{timeframe.toUpperCase()} Change</th>
                  <th className="right">{timeframe.toUpperCase()} Volume</th>
                  <th className="right">Sales</th>
                  <th className="right">Listed</th>
                  <th className="right">Mkt Cap</th>
                  <th className="right">Chart</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row,i)=>{
                  const isUp = row.change.startsWith("+");
                  const heights = Array.from({length:12},(_,si)=>4+Math.random()*16);
                  return (
                    <tr key={row.id}>
                      <td><span style={{color:"var(--text3)",fontSize:12,fontFamily:"monospace"}}>{i+1}</span></td>
                      <td>
                        <div className="col-info">
                          <div className="col-img" style={{background:row.color}}>{row.img}</div>
                          <div>
                            <div className="col-name">{row.name}</div>
                            <div className="col-sub">{tab==="ordinals"?"Ordinals":tab==="runes"?"Runes Protocol":"BRC-20"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="right mono" style={{fontSize:12}}>{row.floor} <span style={{color:"var(--text3)"}}>BTC</span></td>
                      <td className={`right mono ${isUp?"up":"down"}`} style={{fontSize:12,fontWeight:600}}>{row.change}</td>
                      <td className="right mono" style={{fontSize:12}}>{row.vol} <span style={{color:"var(--text3)"}}>BTC</span></td>
                      <td className="right mono" style={{fontSize:12,color:"var(--text2)"}}>{typeof row.sales==="number"?row.sales.toLocaleString():row.sales}</td>
                      <td className="right mono" style={{fontSize:12,color:"var(--text2)"}}>{row.listed}</td>
                      <td className="right mono" style={{fontSize:12,color:"var(--text2)"}}>{row.cap}</td>
                      <td className="right">
                        <div className="spark" style={{justifyContent:"flex-end"}}>
                          {heights.map((h,si)=>(
                            <div key={si} className="spark-bar" style={{height:`${h}px`,background:isUp?"var(--up)":"var(--down)",opacity:0.4+(si/heights.length)*0.6}}/>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Market Overview</div>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">24H Vol</div>
                <div className="stat-val" style={{fontSize:13}}>$48.2M</div>
                <div className="stat-change up">+12.4%</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">BTC</div>
                <div className="stat-val" style={{fontSize:13}}>${(btcPrice/1000).toFixed(1)}K</div>
                <div className="stat-change up">+2.1%</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Sales</div>
                <div className="stat-val" style={{fontSize:13}}>14.2K</div>
                <div className="stat-change down">-3.2%</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Traders</div>
                <div className="stat-val" style={{fontSize:13}}>91K</div>
                <div className="stat-change up">+8.7%</div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title"><span className="live-dot"/>Live Activity</div>
            {mempoolItems.map((m,i)=>(
              <div key={i} className="mempool-item">
                <span className={`mempool-type type-${m.type}`}>{m.type.toUpperCase()}</span>
                <span className="mempool-col">{m.col}</span>
                <span className="mempool-price">{m.price}</span>
                <span className="mempool-time">{m.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {walletModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setWalletModal(false);}}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">🌿 Enter the Garden</div>
              <button className="modal-close" onClick={()=>setWalletModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="modal-tagline">Connect your Bitcoin wallet to trade Ordinals, Runes, and BRC-20 tokens. All trades are trustless via PSBT — we never hold your funds.</p>
              {WALLETS.map(w=>(
                <div key={w.name} className="wallet-option" onClick={()=>handleWalletClick(w.name)}>
                  <div className="wallet-icon" style={{background:w.color+"22"}}>{w.icon}</div>
                  <div><div className="wallet-name">{w.name}</div><div className="wallet-desc">{w.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast&&<div className="toast"><span>{toast.icon}</span>{toast.msg}</div>}
    </>
  );
}
