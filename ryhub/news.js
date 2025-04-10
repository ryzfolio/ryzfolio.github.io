fetch('https://finnhub.io/api/v1/news?category=general&token=cvqurfhr01qp88cnoap0cvqurfhr01qp88cnoapg')
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.getElementById('news-container');
    data.slice(0, 5).forEach(article => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.innerHTML = `
        <img src="${article.image}" alt="News Image" />
        <h4>${article.headline}</h4>
        <p>${article.summary}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(card);
    });
  });
