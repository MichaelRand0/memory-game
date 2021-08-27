export function mixArr(arr) { // Функция для перемешивания массива
  return arr.map(i => [Math.random(), i]).sort().map(i => i[1])
}