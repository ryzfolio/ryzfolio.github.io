// Loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const main = document.getElementById("mainContent");
  
    setTimeout(() => {
      loader.style.display = "none";
      main.style.display = "block";
    }, 1000); // 1.2s biar lebih smooth
  });

// tes crypto
async function fetchCryptoPrices() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      const data = await response.json();
      console.log(`Harga Bitcoin: $${data.bitcoin.usd}`);
      console.log(`Harga Ethereum: $${data.ethereum.usd}`);
      // Anda dapat menambahkan kode untuk memperbarui elemen HTML dengan data ini
    } catch (error) {
      console.error('Error mengambil data harga crypto:', error);
    }
}
  
fetchCryptoPrices();
  
      
  const alphaKey = "YIBDZCNB8VK9UEXU";
  const finnhubKey = "cvqurfhr01qp88cnoap0cvqurfhr01qp88cnoapg";
  const twelveKey = "018898b76d934090a7f54501ac6784e2";
  const symbols = ["AAPL", "MSFT", "TSLA", "DJIA"];

  function loadAllMarkets() {
    symbols.forEach(symbol => {
      // ===== Alpha Vantage (utama) =====
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphaKey}`)
        .then(res => res.json())
        .then(data => {
          const quote = data["Global Quote"];
          if (quote && quote["05. price"]) {
            const price = parseFloat(quote["05. price"]);
            const open = parseFloat(quote["02. open"]);
            const high = parseFloat(quote["03. high"]);
            const low = parseFloat(quote["04. low"]);
            const prevClose = parseFloat(quote["08. previous close"]);
            const changePercent = parseFloat(quote["10. change percent"]);
            const isPositive = changePercent >= 0;

            document.getElementById(symbol.toLowerCase()).innerHTML = `
              <strong>${symbol}</strong>: $${price.toFixed(2)} 
              <span style="color: ${isPositive ? 'green' : 'red'}">
                (${isPositive ? '▲' : '▼'} ${Math.abs(changePercent).toFixed(2)}%)
              </span><br>
              <span style="margin-bottom:15px">
              🔁 Open: $${open.toFixed(2)} <br>📈 High: $${high.toFixed(2)} <br>🔽 Low: $${low.toFixed(2)} <br>🔚 Prev Close: $${prevClose.toFixed(2)}
              </span>`;
          } else {
            // Kalau gagal, lanjut ke TwelveData
            fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${twelveKey}`)
              .then(res => res.json())
              .then(data => {
                if (data.price) {
                  const price = parseFloat(data.price);
                  const changePercent = parseFloat(data.percent_change);
                  const isPositive = changePercent >= 0;

                  document.getElementById(symbol.toLowerCase()).innerHTML = `
                    <strong>${symbol}</strong>: $${price.toFixed(2)} 
                    <span style="color: ${isPositive ? 'green' : 'red'}">
                      (${isPositive ? '▲' : '▼'} ${Math.abs(changePercent).toFixed(2)}%)
                    </span><br>
                    <span style="margin-bottom:15px">
                    🔁 Open: $${parseFloat(data.open).toFixed(2)}<br>📈 High: $${parseFloat(data.high).toFixed(2)} <br>🔽 Low: $${parseFloat(data.low).toFixed(2)} <br>🔚 Prev Close: $${parseFloat(data.previous_close).toFixed(2)}
                  </span>`;
                } else {
                  // Kalau gagal juga, pakai Finnhub
                  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubKey}`)
                    .then(res => res.json())
                    .then(data => {
                      const price = data.c;
                      const change = data.d;
                      const changePercent = data.dp;
                      const isPositive = changePercent >= 0;

                      document.getElementById(symbol.toLowerCase()).innerHTML = `
                        <strong>${symbol}</strong>: $${price.toFixed(2)} 
                        <span style="color: ${isPositive ? 'green' : 'red'}">
                          (${isPositive ? '▲' : '▼'} ${Math.abs(changePercent).toFixed(2)}%)
                        </span><br>
                        <span style="margin-bottom:15px">
                        🔁 Open: $${data.o.toFixed(2)} <br>📈 High: $${data.h.toFixed(2)} <br>🔽 Low: $${data.l.toFixed(2)} <br>🔚 Prev Close: $${data.pc.toFixed(2)}
                      </span>`;
                    })
                    .catch(() => {
                      document.getElementById(symbol.toLowerCase()).innerHTML = `${symbol}: ❌ Can't fetch the server`;
                    });
                }
              });
          }
        })
        .catch(() => {
          document.getElementById(symbol.toLowerCase()).innerHTML = `${symbol}: ❌ Error Alpha Vantage`;
        });
    });
  }

  loadAllMarkets();
