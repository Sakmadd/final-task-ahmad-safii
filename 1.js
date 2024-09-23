const isItPrimeNumber = (n) => {
  let lowestPrime = 2

  if(n < lowestPrime) return false

  for (lowestPrime ; lowestPrime < n; lowestPrime++) {
    if( n % lowestPrime === 0) return false
  }

  return true
}

const MakeRowRightTriangle = (count) => {
  const rowOfPrimes = [];
  let primeNumbers = 2;

  while (rowOfPrimes.length < count) {
    if (isItPrimeNumber(primeNumbers)) {
      rowOfPrimes.push(primeNumbers); 
    }
    primeNumbers++;
  }
  
  return rowOfPrimes;
};


const drawPrimeRightTriangle = (sizeTriangle) => {

  let totalSeriesOfTriangle = (sizeTriangle * (sizeTriangle + 1)) / 2;
  let allPrimesArray = MakeRowRightTriangle(totalSeriesOfTriangle); 

  let index = 0; 

  for (let row = 1; row <= sizeTriangle; row++) {
    let line = "";
    for (let column = 0; column < row; column++) {
      line += allPrimesArray[index++] + " ";
    }
    console.log(line);
  }
}

// drawPrimeRightTriangle(12)