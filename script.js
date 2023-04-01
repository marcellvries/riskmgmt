function calculateRisk() {
  // Get input values
  const portfolioBalance = parseFloat(document.getElementById('portfolio-balance').value);
  const maxLossPerTrade = parseFloat(document.getElementById('max-loss-per-trade').value);
  const entryPrice = parseFloat(document.getElementById('entry-price').value);
  const stoplossPrice = parseFloat(document.getElementById('stoploss-price').value);
  const leverage = parseFloat(document.getElementById('leverage').value);
  const takeProfitPrice = parseFloat(document.getElementById('take-profit-price').value);

  // Calculate stoploss
  const stoplossPercent = ((entryPrice - stoplossPrice) / entryPrice) * 100;
  
  // Calculate order quantity
  const orderQuantity = ((portfolioBalance * maxLossPerTrade / 100) / (stoplossPercent * 100) );
  
  // Calculate margin
  const margin = entryPrice * orderQuantity / leverage;
  
  // Calculate estimated liquidation price
  const liquidationPrice = ((entryPrice * orderQuantity) - margin) / orderQuantity;

  // Output results
  document.getElementById('stoploss-percent').innerHTML = stoplossPercent.toFixed(2) + '%';
  document.getElementById('order-quantity').innerHTML = orderQuantity.toFixed(2);
  document.getElementById('margin').innerHTML = margin.toFixed(2);
  document.getElementById('liquidation-price').innerHTML = liquidationPrice.toFixed(2);
  
  // Create chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [entryPrice, stoplossPrice, takeProfitPrice, liquidationPrice],
      datasets: [{
        label: 'Price',
        data: [entryPrice, stoplossPrice, takeProfitPrice, liquidationPrice],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
