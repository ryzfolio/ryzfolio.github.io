// Fungsi utama untuk memuat semua data
function refreshData() {
  fetchCryptoData();
  fetchForexData();
  fetchGoldData();
  fetchIHSGData();
}

// === 1. Data Crypto (BTC & ETH) ===
function fetchCryptoData() {
  fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,idr&include_24hr_change=true")
    .then(res => res.json())
    .then(data => {
      updateCryptoPrice("btc", data.bitcoin);
      updateCryptoPrice("eth", data.ethereum);
    })
    .catch(() => {
      document.getElementById("btc").textContent = "🪙 BTC: Gagal memuat data.";
      document.getElementById("eth").textContent = "🪙 ETH: Gagal memuat data.";
    });
}

function updateCryptoPrice(id, data) {
  const usdPrice = data.usd.toLocaleString();
  const idrPrice = data.idr.toLocaleString('id-ID');
  const change = data.usd_24h_change.toFixed(2);
  const color = change >= 0 ? "text-green-500" : "text-red-500";
  const direction = change >= 0 ? "▲" : "▼";

  document.getElementById(id).innerHTML = `
    🪙 ${id.toUpperCase()}: $${usdPrice} / Rp${idrPrice}
    <span class="${color}">${direction} ${Math.abs(change)}%</span>
  `;
}

// === 2. Data Forex (USD, EUR, GBP, JPY, KRW ke IDR) ===
function fetchForexData() {
  fetch("https://api.exchangerate.host/latest?base=USD")
    .then(res => res.json())
    .then(data => {
      const usdToIdr = data.rates.IDR;
      updateForexPrice("usd", usdToIdr);
      updateForexPrice("eur", data.rates.EUR * usdToIdr);
      updateForexPrice("gbp", data.rates.GBP * usdToIdr);
      updateForexPrice("jpy", data.rates.JPY * usdToIdr);
      updateForexPrice("krw", data.rates.KRW * usdToIdr);
    })
    .catch(() => {
      document.getElementById("usd").textContent = "💵 USD: Gagal memuat data.";
      document.getElementById("eur").textContent = "💶 EUR: Gagal memuat data.";
      document.getElementById("gbp").textContent = "💷 GBP: Gagal memuat data.";
      document.getElementById("jpy").textContent = "💴 JPY: Gagal memuat data.";
      document.getElementById("krw").textContent = "₩ KRW: Gagal memuat data.";
    });
}

function updateForexPrice(id, value) {
  document.getElementById(id).textContent = `💱 ${id.toUpperCase()}: Rp${Math.round(value).toLocaleString('id-ID')}`;
}

// === 3. Data Harga Emas Antam ===
function fetchGoldData() {
  fetch("https://logam-mulia-api.vercel.app/prices/anekalogam")
    .then(res => res.json())
    .then(data => {
      const emas = data.data[0].sell;
      document.getElementById("emas").textContent = `🥇 Emas Antam: Rp${emas.toLocaleString('id-ID')}/gr`;
    })
    .catch(() => {
      document.getElementById("emas").textContent = "🥇 Emas Antam: Gagal memuat data.";
    });
}

// === 4. Data IHSG (Simulasi) ===
function fetchIHSGData() {
  const ihsg = 7000 + Math.floor(Math.random() * 200);
  document.getElementById("ihsg").textContent = `📈 IHSG: ${ihsg.toLocaleString('id-ID')} (simulasi)`;
}

// Muat data saat halaman pertama kali dibuka
refreshData();

// Atur auto-refresh setiap 5 menit
setInterval(refreshData, 5 * 60 * 1000);
