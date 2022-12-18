// 기본 파라미터 형태로 기본값을 부여하고, 함수를 호출할 때 전달한 객체를 구조 분해 할당으로 받아낸다.

function add({ num1, num2 }) {
  console.log(num1 + num2);
}

add({ num1: 3, num2 : 5 })