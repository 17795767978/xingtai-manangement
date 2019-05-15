export function max (arr) {
  let newArr = arr.filter(i => i !== undefined);
  var num = newArr[0];
  for (var i = 0; i < newArr.length; i++) {
      if (num < newArr[i]) {
          num = newArr[i];
      }
  }
  return num;
}

export function min (arr) {
  let newArr = arr.filter(i => i !== null);
  var num = newArr[0];
  for (var i = 0; i < newArr.length; i++) {
    if (num > newArr[i]) {
      num = newArr[i];
    }
  }
  return num;
}
