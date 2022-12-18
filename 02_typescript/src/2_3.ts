function arrayConcat<T>(item1: T[], item2: T[]): T[] {
  return item1.concat(item2);
}

let arr2 = arrayConcat<number>([1, 2, 3], [4, 5]);
// arr2.push("hello"); 오류 발생