const bubbleRecursiveSortingArray = (arr,n) => {
  const length = n
  if(length === 1) return

  for (let i = 0; i < n - 1; i++) {
    if(arr[i] > arr[i + 1]) {
      [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
    }
  }

  bubbleRecursiveSortingArray(arr, n -1 )

  return {
    number : arr
  }
}

const separateTheOddAndEvenNumber = (arr) => {
  const oddNum = []
  const evenNum = []

  for (let number of arr) {
    if(number % 2 === 0) evenNum.push(number)
      else oddNum.push(number)   
  }

  return {
    oddNum,
    evenNum
  }
}

const mainFunctionSortArray = (arr) => {
  const separated = separateTheOddAndEvenNumber(arr)

  const sorted = bubbleRecursiveSortingArray(arr, arr.length)


  return {
    sortedNumbers : sorted.number,
    oddNumbers : separated.oddNum,
    evenNumbers : separated.evenNum
  }

}

// const numbersInputArray = [22, 53, 43, 34, 88, 10, 92, 41, 50, 44, 62, 78];

// const result = mainFunctionSortArray(numbersInputArray)

// console.log('Sorted Numbers :', result.sortedNumbers)
// console.log('----------------------------------------')
// console.log('Odd Numbers :', result.evenNumbers)
// console.log('----------------------------------------')
// console.log('Even Numbers :', result.oddNumbers)