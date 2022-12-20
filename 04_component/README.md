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
