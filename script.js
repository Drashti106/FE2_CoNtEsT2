document.addEventListener('DOMContentLoaded', function() {
    let dataArray = []; // Initialize an empty array to store the fetched data
  
    // Fetch the data from an API or any other source
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        // Store the fetched data in the dataArray variable
        dataArray = data;
  
        // Call the renderTable function with the updated dataArray
        renderTable(dataArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    function renderTable(data) {
      const table = document.getElementById('data-table');
      table.innerHTML = ''; // Clear the table content before rendering
  
      // Create table rows with data
      data.forEach(item => {
        const row = document.createElement('tr');
  
        // Columns in the desired order
        const columns = ['image', 'name', 'symbol', 'current_price', 'total_volume', 'market_cap', 'price_change_percentage_24h'];
  
        columns.forEach(column => {
          const td = document.createElement('td');
          td.style.textAlign = 'center';
  
          if (column === 'image') {
            const img = document.createElement('img');
            img.src = item['image'];
            img.alt = 'Coin Image';
            td.appendChild(img);
          } else if (column === 'name' || column === 'symbol') {
            td.textContent = item[column];
            td.style.textAlign = 'left';
          } else if (column === 'current_price') {
            const price = item['current_price'];
            td.textContent = price ? `$${price.toFixed(2)}` : 'N/A';
          } else if (column === 'total_volume' || column === 'market_cap') {
            const value = item[column];
            td.textContent = value ? `$${value.toFixed(2)}` : 'N/A';
          } else if (column === 'price_change_percentage_24h') {
            const value = item[column];
            if (value !== undefined) {
              const percentage = value.toFixed(2);
              td.textContent = `${percentage}%`;
              if (percentage > 0) {
                td.style.color = 'green';
              } else if (percentage < 0) {
                td.style.color = 'red';
              }
            } else {
              td.textContent = 'N/A';
            }
          }
  
          row.appendChild(td);
        });
  
        table.appendChild(row);
      });
    }
  
    const searchInput = document.querySelector('input[type="text"]');
    searchInput.addEventListener('input', handleSearch);
  
    function handleSearch(event) {
      const searchTerm = event.target.value.toLowerCase();
  
      // Filter the dataArray based on the search term
      const filteredData = dataArray.filter(item =>
        item.name.toLowerCase().includes(searchTerm) || item.symbol.toLowerCase().includes(searchTerm)
      );
  
      // Call the renderTable function with the filtered data
      renderTable(filteredData);
    }
  
    const sortByMktCapButton = document.querySelector('.mkt');
    sortByMktCapButton.addEventListener('click', handleSortByMktCap);
  
    function handleSortByMktCap() {
      // Sort the dataArray by market cap in descending order
      const sortedData = dataArray.sort((a, b) => b.market_cap - a.market_cap);
  
      // Call the renderTable function with the sorted data
      renderTable(sortedData);
    }
  
    const sortByPercentageButton = document.querySelector('.per');
    sortByPercentageButton.addEventListener('click', handleSortByPercentage);
  
    function handleSortByPercentage() {
      // Sort the dataArray by price change percentage in descending order
      const sortedData = dataArray.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  
      // Call the renderTable function with the sorted data
      renderTable(sortedData);
    }
  });
  