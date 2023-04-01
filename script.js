function calculateRisk() {
  // Get input values
  const portfolioBalance = parseFloat(document.getElementById('portfolio-balance').value);
  const maxLossPerTrade = parseFloat(document.getElementById('max-loss-per-trade').value/100);
  const entryPrice = parseFloat(document.getElementById('entry-price').value);
  const stoplossPrice = parseFloat(document.getElementById('stoploss-price').value);
  const leverage = parseFloat(document.getElementById('leverage').value);
  const takeProfitPrice = parseFloat(document.getElementById('take-profit-price').value);

  // Calculate stoploss
  const stoplossPercent = (1- (stoplossPrice / entryPrice));
  
  // Calculate order quantity
  const orderQuantity = portfolioBalance * (maxLossPerTrade) / (stoplossPercent) / entryPrice;
  
  // Calculate margin
  const margin = entryPrice * orderQuantity / leverage;
  
  // Calculate estimated liquidation price
  const liquidationPrice = (((entryPrice * orderQuantity) - margin) / orderQuantity)+ (0.011* entryPrice);

  // Output results
  document.getElementById('stoploss-percent').innerHTML = (stoplossPercent*100).toFixed(2) +'%';
  document.getElementById('order-quantity').innerHTML = orderQuantity.toFixed(2);
  document.getElementById('margin').innerHTML = margin.toFixed(2);
  document.getElementById('liquidation-price').innerHTML = liquidationPrice.toFixed(2);
  
  // Create chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Price'],
      datasets: [
        {
          label: 'Entry Price',
          borderColor: '#007bff',
          data: [entryPrice]
        },
        {
          label: 'Stop Loss Price',
          borderColor: '#dc3545',
          data: [stoplossPrice]
        },
        {
          label: 'Take Profit Price',
          borderColor: '#28a745',
          data: [takeProfitPrice]
        },
        {
          label: 'Estimated Liquidation Price',
          borderColor: '#ffc107',
          data: [liquidationPrice]
        }
      ]
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
