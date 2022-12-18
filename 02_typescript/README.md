## 02. 타입스크립트

<br>

### 2.1 타입스크립트란?

- ES6에 정적 데이터 형식 기능이 추가된 것이며, 자바스크립트 언어의 확장버전이다. 따라서 타입스크립트는 ES6의 상위 집합인 슈퍼셋(superset)이며, 기존 ES6 문법을 모두 사용할 수 있다.
- 타입스크립트의 장점은 다음과 같다.
  - 정적 데이터 형식을 사용할 수 있다.
    - 코드 에러를 줄일 수 있고, 디버깅을 쉽게 할 수 있다.
  - 통합 개발 환경(IDE)과 쉽게 통합된다.
    - 타입스크립트는 VSCode에서 쉽게 통합되어 코드 자동완성 등의 기능을 제공하므로 개발 생산성이 높아진다.
  - 기존 언어와 문법저긍로 유사하다.
  - 자바스크립트와 동일한 패키지 관리 환경을 사용한다.

<br>

### 2.2 타입 지정 방법

- 지정할 수 있는 타입의 종류

  - number: 숫자 타입
  - string: 문자열 타입
  - boolean: true/false에 해당하는 타입
  - any: 모든 타입을 포함. 이 타입이라면 형식 검사를 수행하지 않음
  - array: 배열에 해당하는 타입. 사용방법은 다음과 같음.
    - `let a : number[] = [1, 2, 3]`
  - null: '객체가 없음'을 나타내는 값으로, 타입스크립트에서 null은 타입으로도 사용함.
  - undefined: '할당한 값이 없음'을 나타내는 값이자 타입.
  - void: 결과값을 리턴하지 않는 함수의 타입을 지정할 때 설정.
    - `function test(): void {}`
    - `const test2 = () : void => {}`
  - union: 여러 타입의 값을 허용할 때 사용.
    - `let a : number | string = 'hello';`
  - 사용자 정의 타입: 복잡한 타입을 지정할 때 사용.ㅉ

- 복잡한 타입을 재사용하려면 타입 별칭(type alias)을 사용한다.

```typescript
type TestType {
id: number,
age: number,
name: {
    first: string,
    last: string
}
}

let obj : TestType = {
id: 1001,
age: 20,
name: {
    first: "Larry",
    last: "King"
}
}
```

<br>

### 2.3 제네릭

- 제네릭(generic)을 사용하면 일관된 타입의 값을 처리할 수 있다.

```typescript
function arrayConcat<T>(item1: T[], item2: T[]): T[] {
  return item1.concat(item2);
}

let arr2 = arrayConcat<number>([1, 2, 3], [4, 5]);
arr2.push("hello");
```

- 위의 예시에서 제네릭 타입을 number로 지정하여 호출했기 때문에 전달되는 인자와 리턴값 모두 number[] 형식이다. 따라서 arr2.push('hello')와 같이 number가 아닌 다른 형식의 값을 추가하는 것을 허용하지 않는다.

<br>

### 2.4 타입 별칭

- 타입 별칭(type alias)은 기존 타입에 대한 별칭을 부여하는 기능이다. 단순한 타입보다는 복잡하게 정의한 사용자 정의 타입을 재사용할 때 자주 사용한다.

```typescript
// string 타입에 대한 별칭 부여
type MyType = string;
let a: MyType = "Hello";

// 복잡한 타입에 대한 별칭 부여
type MyType2 = { name: string; age: number };
let b: MyType2 = { name: "홍길동", age: 20 };

// 선택적 속성과 읽기 전용 속성
type MyType3 = {
  name: string;
  age?: number;
  readonly email: string;
};

let c: MyType3 = { name: "홍길동", email: "pjw@test.com" };
// 읽기 전용이므로 오류 발생
// c.email = 'pjw@test.com';

// 튜플 타입
type TupleType = [string, number];
let d: TupleType = ["hello", 100];
```

- 타입 별칭을 활용해 다른 타입을 선언할 수도 있다.

```typescript
type PersonType = {
  name: string;
  mobile: string;
  birthYear?: number;
};

type PersonListType = {
  pageNo: number;
  pageSize: number;
  persons: PersonType[];
};

const personList: PersonListType = {
  pageNo: 2,
  pageSize: 4,
  persons: [
    { name: "정연", mobile: "010-2222-1111" },
    { name: "유나", mobile: "010-2222-1111", birthYear: 1993 },
    { name: "유정", mobile: "010-2222-1111" },
  ],
};
```

<br>

### 2.5 유니온 타입

- 유니온 타입(union type)은 OR의 개념을 지원하는 타입이다. 유니온 타입은 파이프라인 기호(|)를 이용해 정의한다.

```typescript
type YourType = string | number;

let a1: YourType = 100;
let a2: YourType = "hello";
```

- 유니온 타입은 복잡한 객체 타입도 정의할 수 있다.

```typescript
type PersonType1 = { no: number; name: string; email: string };
type PersonType2 = { no: number; name: string; tel: string };
type PersonTypeUnion = PersonType1 | PersonType2;

let p1: PersonTypeUnion = {
  no: 1001,
  name: "홍길동",
  email: "gdhong@test.com",
};
let p2: PersonTypeUnion = { no: 1001, name: "홍길동", tel: "010-1111-1111" };

//email 또는 tel 속성을 포함하지 않으므로 에러 발생
let p3: PersonTypeUnion = { no: 1001, name: "홍길동" };
```

<br>

### 2.6 인터섹션 타입

- 인터섹션 타입(intersection type)은 AND 개념을 지원하는 타입이다.

```typescript
type PersonTypeA = {
  no: number;
  name: string;
  email: string;
};

type PersonTypeB = {
  no: number;
  name: string;
  tel: string;
};

type PersonTypeInter = PersonTypeA & PersonTypeB;

const p4: PersonTypeInter = {
  no: 1001,
  name: "홍길동",
  email: "pjw@test.com",
  tel: "010-1111-1111",
};
```

- 인터섹션 타입으로 정의하면 두 타입을 모두 만족시켜야 하는 타입이 된다.

<br>

### 2.7 열거형

- 열거형(enum)은 정해진 값을 가지는 집합을 표현하고, 이것을 타입으로 사용할 수 있도록 한다. 열거형은 enum 키워드를 이용해 정의하며 숫자, 문자를 대신해서 의미가 부여된 레이블처럼 값을 지정할 수 있으므로 코드의 가독성을 높여주는 장점이 있다.

```typescript
//숫자 열거형
enum Media {
  Newspaper, //0
  Broadcasting, //1
  SNS, //2
  Magazine, //3
  Youtube, //4
}

let media1: Media = Media.Youtube;
console.log(media1); // 4 출력

//문자 열거형
enum Media2 {
  Newspaper = "신문",
  Broadcasting = "방송",
  SNS = "SNS",
  Magazine = "잡지",
  Youtube = "유튜브",
}

let media2: Media = Media.Youtube;
console.log(media2); // "유튜브"
```

- 기본적으로 열거형을 생성하면 숫자값에 이름을 부여한다. 별도의 지정이 없다면 0부터 시작하는 값이 부여되지만 직접 시작 값을 부여할 수도 있다. 모든 레이블에 값을 부여할 수도 있으며, 하나의 레이블에만 숫자값을 부여하면 그 이후의 값은 부여된 값을 기준으로 1씩 증가하는 값을 가진다.
- 문자 열거형은 숫자가 아니어서 자동으로 1씩 증가할 수 없으므로 모든 레이블에 명시적으로 값을 부여해야 한다.

<br>

### 2.8 인터페이스

- 인터페이스(interface)는 객체, 함수, 클래스의 구조를 표현하는 약속이다. 인터페이스를 통해 객체와 함수가 지정된 형태를 갖도록 규정하고 통제할 수 있다. 인터페이스를 지정하는 방법은 객체에 대한 새로운 타입을 생성하는 방법과 유사하다.

```typescript
interface IEmp {
  no: number;
  name: string;
  salary: number;
}

let emp1: IEmp = { no: 1001, name: "홍길동", salary: 10000 };
```

- 만일 인터페이스를 같은 이름으로 중복 정의하면 해당 인터페이스에 선언된 멤버들은 모두 병합되어 하나의 인터페이스에 쓰인 것과 같다. 아래의 예제에서 IPerson이라는 두 인터페이스가 있다. name 멤버는 중복이지만 age와 tel은 중복되지 않는다. 이 멤버들이 모두 병합되어 IPerson은 name, tel, age 멤버를 정의한 인터페이스로 작동한다.

```typescript
interface IPerson {
  name: string;
  age: number;
}

interface IPerson {
  name: string;
  tel: string;
}
//인터페이스 병합
let p5: IPerson = { name: "홍길동", tel: "010-111-2222", age: 20 };
```

- 인터페이스는 타입(type)과 유사해 보이지만 확장하는 방법이 다르다. 일반적인 타입은 인터섹션(&)을 이용해 확장하고, 인터페이스는 상속(extends)을 통해 확장한다.

```typescript
interface IPerson2 {
  name: string;
  age: number;
}

interface IEmployee extends IPerson2 {
  employeeId: string;
  dept: string;
}

let e1: IEmployee = {
  employeeId: "E001",
  dept: "회계팀",
  name: "홍길동",
  age: 20,
};
```

<br>

### 2.9 타입 추론

- let 키워드로 선언한 변수의 타입은 타입 추론 기능에 의해 처음 선언될 때의 타입으로 선언된다.
- let으로 선언한 변수와 const로 선언한 변수는 조금 다른 방법으로 타입을 추론한다. const로 선언한 변수는 리터럴값으로 타입을 추론한다.
