export function* bubbleSort(arr, n){
    var i, j, temp;
    var swapped;
    for (i = 0; i < n - 1; i++){
        swapped = false;
        for (j = 0; j < n - i - 1; j++){
            yield { type: "active", indices: [i, i + 1] };
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
                yield { type: "swap", indices: [i, i + 1] };
            }
        }
        if(swapped == false){
            break;
        }
    }
    return arr;
}