export function max (arr) {
  var num = arr[0];
  for (var i = 0; i < arr.length; i++) {
      if (num < arr[i]) {
          num = arr[i];
      }
  }
  return num;
}
