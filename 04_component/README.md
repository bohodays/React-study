## 04. 리액트 컴포넌트

<br>

### 4.1 컴포넌트 스타일 지정

- 리액트에서의 스타일 지정
  - 전역 CSS 참조
    - import './index.css'
  - 인라인 스타일 지정
  - 특정 컴포넌트에서만 적용할 수 있는 CSS 모듈 이용
    - 스타일을 CSS 클래스 기반으로 .module.css 확장자를 가진 파일에 작성하고 자바스크립트 객체처럼 임포트 하여 사용

<br>

### 4.1.1 리액트 인라인 스타일 지정

- CSS와는 다르게 케밥 표기법이 아닌 카멜 표기법을 사용해야 한다.

```typescript
const styles = {
    color: "yellow", backgroundColor: "purple"
}

<div style={styles}>Hello</div>
```

<br>

### 4.1.2 CSS 모듈

- 전역 CSS를 사용하게 되면 단점이 존재한다. 여러 컴포넌트에서 임포트한 CSS파일에 동일한 클래스명이 존재하면 충돌이 발생한다. CSS는 마지막에 임포트한 CSS가 적용되어 화면에 나타난다. 이렇게 여러 CSS 파일에서 동일한 이름의 클래스가 중첩될 때의 문제를 해결하기 위해 CSS 모듈 기능을 사용한다.

```typescript
.test {
    color: blue;
    background-color: bisque;
}

import AppCssModule from './App.module.css'

<h2 className={AppCssModule.test}>Hello {msg}</h2>
```

- 개발자 도구를 통해 적용된 부분을 확인하면 \_test_clvpj_1과 같이 절대로 충돌나지 않을만한 이름으로 자동변경된다. 이처럼 CSS 모듈을 사용하면 여러 컴포넌트에서 동일한 이름의 CSS 클래스를 포함한 CSS 파일을 임포트하더라도 충돌이 발생할 가능성이 없다.

<br>

### 4.1.3 Styled-Components

- Styled-Components는 ES6의 태그된 템플릿 리터럴 문법을 사용해 컴포넌트에 동적인 CSS를 사용할 수 있게 하는 라이브러리다. styled-components를 이용하면 CSS 스타일의 문법을 그대로 사용하면서도 전달된 속성에 따라 스타일을 동적으로 구성할 수 있다. 또한 기존 스타일을 확장할 수 있는 extending style 기능도 제공한다.
- 함수를 호출하는 방법 중 아래와 같은 방법도 있다는 것을 알아두어야 한다.

```javascript
const f = (str, ...values) => {
  ...
};

f`첫 번째 값은 ${v1}이고, 두 번째 값은 ${v2}이다.`;


실행시키면 아래의 두 배열을 반환한다.
['첫 번째 값은', '이고, 두 번째 값은', '이다.']
[1, 2]

```

- styled-components 패키지 설치
  - npm i styled-components @types/styled-components
- props로 내릴 때, theme='basic'이라고 한다면 받을 때는 {theme: 'basic'} 형태로 받는다.
- styled-components로 작성한 기존 컴포넌트를 활용하여 스타일을 확장할 수도 있다.

```typescript
const A = styled.div`.....`;
const B = styled(A)`.....`;
```

<br>

### 4.2 속성의 유효성 검증

- 리액트 컴포넌트를 개발할 때는 컴포넌트의 속성을 쉽게 식별할 수 있고, 잘못된 속성이 전달된 경우를 쉽게 확인할 수 있어야 한다. 특히 컴포넌트에서 다음과 같은 내용을 반드시 확인할 수 있어야 한다.
  - 컴포넌트에서 사용할 수 있는 속성은 무엇인지
  - 필수 속성은 무엇인지
  - 속성에 전달할 수 있는 값의 타입은 무엇인지
- 리액트 컴포넌트의 유효성을 검증하는 방법은 대표적으로 2가지있다.
  - 타입스크립트를 사용하여 정적 타입 지원 기능 이용
  - 리액트가 지원하는 PropTypes 이용
    - `npm i prop-types`
    - 컴포넌트에 propTypes 정적 멤버를 추가해서 사용할 수 있다.

<br>

### 4.2.1 지정 가능한 유효성 검증 타입

- 단순 타입
  - PropTypes.array : 배열 타입
  - PropTypes.bool : 불리언 타입
  - PropTypes.func : 속성을 이용해 함수와 메서드를 전달하는 함수 타입
  - PropTypes.number : 숫자 타입
  - PropTypes.object : 객체 타입
  - PropTypes.string : 문자열 타입
- 복잡한 타입
  - PropTypes.instanceOf(Customer) : Customer 클래스의 인스턴스인지를 검증
  - PropTypes.oneOf(['+', '*']) : [ ]에 포함된 값 중의 하나인지를 검증
  - PropTypes.oneOfType([PropTypes.number, PropTypes.string]) : [ ]에 포함된 타입의 값인지를 검증
  - PropTypes.arrayOf(PropTypes.object) : 객체의 배열인지를 검증
- 예시

```typescript
PropType.shape({
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
});
```

<br>

### 4.2.2 속성의 기본값 지정

- 기본 속성(default props)을 지정하면 컴포넌트에 속성값이 전달되지 않았을 때 기본값이 주어지도록 설정할 수 있다.
  - 컴포넌트에 defaultProps라는 정적 멤버를 추가해서 사용할 수 있다.

<br>

### 4.3 리액트 이벤트

- 리액트는 HTML DOM 이벤트를 추상화하여 여러 브라우저에서 동일한 특성(attribute)을 이용할 수 있도록 이벤트를 정규화한다.
- 리액트 이벤트 설정시 주의사항
  - 이벤트 핸들러를 지정할 때는 카멜 표기법을 사용한다. (ex. onClick)
  - 이벤트를 함수 또는 메서드와 연결할 때는 다음과 같이 { } 보간법을 사용한다. 이때 리액트 이벤트는 HTML DOM 이벤트처럼 문자열로 함수 호출 구문을 작성할 수 없다. 대신에 익명 함수를 { } 내부에 작성하여 호출구문을 작성한다.
  ```typescript
  함수 또는 메서드 호출
  <button onClick={func}> OK </button>
  익명 함수 호출
  <button onClick={ () => alert('hello') }> OK </button>
  ```
  - DOM 요소가 아닌 컴포넌트에 이벤트를 설정할 수 없다.

<br>

### 4.3.1 이벤트 적용 방법

- 리액트 이벤트를 적용하는 2가지 방법

  - 이벤트 핸들러 함수를 정의하여 { } 보간법을 이용해 외부 함수를 바인딩한다. 이름없는 함수(익명 함수: anonymous function)도 바인딩할 수 있다.

  ```javascript
  const eventHandler = () => { ... };

  <!-- JSX 내부에서 외부 함수 바인딩 -->
  <input type='text' ... onChange={eventHandler} />

  <!-- JSX 내부에서 익명 함수 바인딩 -->
  <button onClick={ () => { ... }}>버튼</button>
  ```

  - 이벤트 핸들러 함수의 첫 번째 인자를 이용해 이벤트 아규먼트 값을 이용한다.

  ```javascript
  const eventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  ```

<br>

### 4.3.2 이벤트 아규먼트의 정적 타입

- 리액트 이벤트 핸들러 함수에서의 이벤트 아규먼트는 브라우저의 종류와 관계없이 이벤트를 처리할 수 있도록 SyntheticEvent<T> 타입으로 추상화한다. 모든 이벤트를 기억할 필요는 없다. VSCode에서 onChange와 같이 작성한 후 마우스 포인터를 올리면 툴팁을 통해 이벤트 타입을 확인할 수 있다.

<br>

### 4.3.3 리액트의 단방향 데이터 바인딩

- 리액트 애플리케이션은 상태(데이터)가 바뀌면 UI(화면)가 갱신되는 단방향 데이터 바인딩 구조이다. 리액트는 양방향 데이터 바인딩을 지원하지 않으므로 UI에서 입력한 값이 상태에 반영되지 않는다. 그래서 리액트는 UI에서 입력한 값을 상태에 반영하기 위해 리액트 이벤트 시스템을 이용한다. 이벤트 핸들러 함수에서 상태를 변경하면 변경된 상태가 UI를 갱신시킨다.
- State → View → Event → setState( ) → State

<br>

### 4.4 이벤트 핸들러와 상태 변경

- 이벤트 핸들러 함수에서 상태를 변경할 때는 useState( )를 호출해 리턴받은 세터 함수를 이용한다. 주의할 점은 세터 함수는 비동기로 작동하기 때문에 이벤트 핸들러 함수 안에서 같은 상태를 여러 번 변경하면 문제가 발생할 수 있다.
- 아래와 같이 작성하면 increment 함수에서 setCount(count + 1)을 세 번 연속으로 호출해서 카운트가 3씩 증가할 것 같지만 실행결과는 1씩 증가한다. 원인은 setCount( ) 세터 함수가 비동기로 실행되기 때문이다.
  - ```javascript
    const increment = () => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    };
    ```
  - setCount(count + 1) 코드는 상태 변경을 시도한다. 이때 읽어오는 count는 세 번 호출할 때마다 같은 값이다. count가 1이라면 setCount(2)를 세 번 호출하는 것이다. 따라서 count가 1씩 증가한다.
- 리액트의 상태가 비동기로 실행되도록 설계된 이유는 바로 리액트 애플리케이션의 `렌더링 성능` 때문이다. 상태 변경과 렌더링 작업은 깊이 연관되어 있어서 상태 변경을 동기적으로 실행하면 불필요한 렌더링이 추가로 발생하고, 이에 따라 렌더링 성능이 느려진다. 즉, 리액트에서의 상태 변경이 비동기 실행임을 고려해 하나의 이벤트 핸들러 함수에서는 같은 상태를 여러 번 변경하지 않는 것이 바람직하다.
- 불가피하게 같은 상태를 여러 번 변경해야 하는 경우가 있다면 다음과 같이 함수를 이용해 리턴값으로 상태를 변경하도록 작성해야 한다.
  - ```javascript
    const increment = () => {
      setCount((count) => count + 1);
      setCount((count) => count + 1);
      setCount((count) => count + 1);
    };
    ```

<br>

### 4.5 제어 컴포넌트와 비제어 컴포넌트

- 컴포넌트는 상태가 입력 필드를 제어하는지 아닌지에 따라 제어 컴포넌트와 비제어 컴포넌트로 구분된다.
- 제어 컴포넌트는 UI에서 입력 필드의 값이 상태(state)나 속성(props)에 의해 강하게 제어되는 컴포넌트다. 따라서 상태, 속성이 바뀌지 않는 한 입력값을 변경할 수 없다. 제어 컴포넌트에서 입력 필드의 값을 변경하려면 리액트의 이벤트 핸들러를 이요해 상태를 변경해야 한다.
- 비제어 컴포넌트는 입력 필드의 값이 상태나 속성에 의해 제어되지 않는 컴포넌트다. 사용자가 쉽게 변경할 수 있지만 입력한 값이 상태에 반영되지 않는다. 또한 사용자가 UI 입력 필드에 입력한 값을 알아내려면 브라우저의 HTML DOM에 직접 접근해야 하는 단점이 있다.
