const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

const VALID_IDS = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand',
};

const API_BASE = 'http://20.244.56.144/evaluation-service';
let windowState = [];

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  if (!VALID_IDS[numberid]) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const apiURL = `${API_BASE}/${VALID_IDS[numberid]}`;
  const windowPrevState = [...windowState];
  let newNumbers = [];

  try {
    // Fetch with 500ms timeout
    const response = await Promise.race([
      axios.get(apiURL),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 500)
      ),
    ]);

    const fetched = response.data.numbers || [];

    // Add only unique numbers (avoid duplicates)
    for (const num of fetched) {
      if (!windowState.includes(num)) {
        windowState.push(num);
        newNumbers.push(num);
      }
    }

    // Maintain fixed window size (sliding window behavior)
    while (windowState.length > WINDOW_SIZE) {
      windowState.shift();
    }

  } catch (error) {
    console.error('Error fetching numbers:', error.message);
  }

  // Calculate average
  const average =
    windowState.length > 0
      ? parseFloat(
          (windowState.reduce((acc, num) => acc + num, 0) / windowState.length).toFixed(2)
        )
      : 0;

  res.json({
    windowPrevState,
    windowCurrState: windowState,
    numbers: newNumbers,
    avg: average,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
