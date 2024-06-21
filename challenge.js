const Rates = [
  { size: 'S', capacity: 5, cost: 5000 },
  { size: 'M', capacity: 10, cost: 8000 },
  { size: 'L', capacity: 15, cost: 12000 }
];

function Calculation(seats) {

  let minCost = Infinity;
  let bestCombination = null;

  for (let s = 0; s <= seats / Rates[0].capacity; s++) {
      for (let m = 0; m <= seats / Rates[1].capacity; m++) {
          for (let l = 0; l <= seats / Rates[2].capacity; l++) {
              const totalSeats = s * Rates[0].capacity + m * Rates[1].capacity + l * Rates[2].capacity;
              if (totalSeats >= seats) {
                  const totalCost = s * Rates[0].cost + m * Rates[1].cost + l * Rates[2].cost;
                  if (totalCost < minCost) {
                      minCost = totalCost;
                      bestCombination = { S: s, M: m, L: l };
                  }
              }
          }
      }
  }


  let result = `Please input number (seat): ${seats}\n`;
  for (let key in bestCombination) {
      if (bestCombination[key] > 0) {
          result += `${key} x ${bestCombination[key]}\n`;
      }
  }
  result += `Total = PHP ${minCost}`;

  return result;
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
}); 

readline.question('Enter the number of seats needed: ', (seatsInput) => {
  const seatsNeeded = parseInt(seatsInput);

  if (isNaN(seatsNeeded) || seatsNeeded <= 0) {
      console.log('Invalid input. Please enter a valid number of seats.');
  } else {
      const result = Calculation(seatsNeeded);
      console.log(result);
  }

  readline.close();
});
