export function* bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
  
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the bars being compared
        yield { type: "active", indices: [j, j + 1] };
  
        if (arr[j] > arr[j + 1]) {
          // Swap arr[j] and arr[j+1]
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
  
          // Yield the swap step
          yield { type: "sorted", indices: [j, j + 1], array: [...arr] };
        }
      }
  
      // After each outer loop, mark the last sorted element
      yield { type: "sorted", indices: [n - i - 1] };
  
      if (!swapped) break;
    }
    return arr;
  }