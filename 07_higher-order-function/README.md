## 06. 고차함수와 렌더링 최적화

<br>

### 7.1 고차 함수란?

- 고차 함수(higher-order function)는 다른 함수와 컴포넌트를 인자로 전달받거나 리턴하는 함수를 말한다. 리액트에서는 컴포넌트 사이의 공통 로직을 분리하고 재사용하기 위해 리액트 훅과 고차 함수를 사용할 수 있다. 고차함수는 인자로 전달받은 기존 컴포넌트에 공통 로직을 추가하여 리턴한다.
- 예를 들면 사용자 로그인 여부나 권한 상태를 확인하는 기능은 대부분의 컴포넌트에서 공통으로 필요한 기능이다. 이 기능을 컴포넌트를 작성할 때마다 작성하는 것은 비효율적이다. 이런 경우 고차 함수를 만들어서 적용하면 편리하고, 공통 로직의 재사용도 손쉬워진다. 이 밖에도 에러 처리, 로깅 등의 기능에서도 고차 함수를 사용한다. 리액트에서는 함수로 컴포넌트를 작성할 수 있이므로 고차 함수는 고차 컴포넌트라고 부를 수 있다.
- 클래스 컴포넌트의 공통 로직을 분리하는 경우라면 고차 함수를 사용할 수밖에 없다. 하지만 함수 컴포넌트를 사용한다면 사용자 정의 훅을 작성하여 공통의 로직을 분리할 것을 권장한다.
- 함수 컴포넌트를 사용할 때 고차함수를 권장하지 않는 이유는 다음과 같다.
  - 한 컴포넌트에서 여러 고차함수를 적용할 때 동일한 이름의 속성을 사용하고 있다면 충돌이 난다.
  - 인자로 전달되는 컴포넌트의 속성이 무엇일지 알 수 없으므로 암묵적으로 any 타입을 사용할 수밖에 없다. 즉, 타입스크립트와 같은 정적 타입 언어를 적용할 때 어려움이 있다.

<br>

### 7.2 React.memo 고차 함수

- React.memo는 리액트 라이브러리로 기본 제공되는 고차 함수이며, 컴포넌트가 동일한 상태나 속성을 가지고 있다면 얕은 비교를 수행하도록 하여 불필요한 렌더링을 방지한다. 반드시 기억할 것은 PureComponent와 마찬가지로 React.memo 고차 함수도 불변성을 가진 상태의 변경이 필수적이다.

```javascript
const Child = (...) => {
    ......
}
export default React.memo(Child);

-또는-

const Child = React.memo((...) => {
    ......
})
export default Child;
```

- React.memo의 두 번째 인자로 렌더링 여부를 지정하기 위한 함수를 전달할 수 있다. React.memo의 두 번째 인자의 사용 방법은 다음과 같다.

```javascript
// 두 번째로 전달할 함수의 리턴값이 true면 렌더링하지 않습니다.
// preProps: 이전의 속성
// nextProps: 새롭게 전달된 속성
React.memo(컴포넌트, (preProps, nextProps) => {});
```

- 하지만 위의 방법은 렌더링이 오작동할 수 있어서 함부로 사용하면 안 된다. 가능하면 컴포넌트를 상세하게 분할하여 최적화하는 것이 바람직하다.

<br>

### 7.3 추가적인 컴포넌트의 분할

- TodoList 앱에서 할 일을 추가할 때마다 모든 TodoListItem 컴포넌트들이 다시 렌더링되는 문제를 해결하려면 컴포넌트를 적절히 분할해야 한다.
- 하나의 컴포넌트 영역에서 자주 바뀌는 속성을 전달받을 영역과 그렇지 않은 영역으로 서로 다른 컴포넌트로 분할한다.