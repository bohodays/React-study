## 09. 리액트 라우터

<br>

### 9.1 리액트 라우터란?

- 리액트 라우터는 리액트 기반의 강력한 라우팅 라이브러리로서 화면에 렌더링하는 컴포넌트와 URI 경로를 동기화하면서 새로운 화면과 흘므을 애플리케이션에 빠르게 추가할 수 있는 기능을 제공한다.
- 리액트 라우터를 이용하면 SPA(Single Page Application)를 손쉽게 작성할 수 있다. SPA는 하나의 HTML 페이지로 여러 개의 화면을 전환할 수 있는 네비게이션 기법이다. SPA는 하나의 HTML 페이지에서 요청된 URI 경로를 이용해 화면을 전환하기 때문에 화면의 전환을 위해 웹 서버로부터 새로운 페이지를 로딩하지 않는다. 화면 전환에 필요한 모든 코드는 첫 화면을 로딩할 때 한꺼번에 서버에서 로딩한다.
- npm install react-router react-router-dom

<br>

### 9.2 URI 파라미터 이용

- URI 경로에 동적으로 매번 다른 값이 포함되고, 컴포넌트를 실행할 때 URI 경로의 동적인 값을 받아서 이용해야 하는 경우가 있다. 이럴 때 사용할 수 있는 것이 동적 파라미터이다. 동적 파라미터를 적용하는 방법은 다음과 같다.

```javascript
<Route path='/songs/:id' element={<SongDetail song={songs} />} />

type SongParam = {
    id? : string
};

const SongDetail = (...) => {
    ...
    const { id } = useParams<SongParam>();
    ...
}
```

<br>

### 9.3 중첩 라우트

- 중첩 라우트(nested route)는 `<Route />` 컴포넌트에 의해 렌더링된 컴포넌트에 기존 Route의 중첩된 `<Route />`의 컴포넌트가 나타나도록 구성하는 `<Route />` 컴포넌트의 적용 방법이다. 예를 들어, 다음과 같은 상황에서 사용할 수 있다.
  - /songs로 요청 : SongList 컴포넌트 렌더링
  - /songs/:id로 요청 : SongList 컴포넌트와 Player 컴포넌트 렌더링
- 중첩 라우트를 적용하는 방법은 다음과 같다.

```javascript
...
    <Route path='/song' element={<SongList songs={songs} />}>
      <Route path=':id' element={<Player songs={songs} />} />
    </Route>
...
```

<br>

### 9.3.1 index 라우트 설정

- 중첩 라우트에서 상위 경로(부모 경로)까지만 매칭이 되는 경우에는 부모 경로의 `<Route />` 컴포넌트의 element만 렌더링했었다. 하지만 index 라우트를 설정하면 부모 경로까지만 매칭되는 경우에도 자식 컴포넌트를 렌더링할 수 있다. 사용 방법은 다음과 같다.

```javascript
<Route path="/parents" element={<Parent />}>
  <Route index element={<DefaultChild />} />
  <Route path=":param" element={<Child1 />} />
</Route>
```

- 위의 예시는 요청 경로에 따라 다음과 같이 컴포넌트를 렌더링한다.
  - parents로 요청 : Parent, DefaultChild 컴포넌트 렌더링
  - parents/:param으로 요청 : Parent, Child1 컴포넌트 렌더링

<br>

### 9.4 리액트 라우터가 제공하는 훅

- 리액터 라우터가 제공하는 훅은 다음과 같다.
  - useMatch( )
    - 현재 요청 경로가 지정한 경로 패턴에 매칭되는 경우 PathMatch 객체를 리턴한다. PathMatch는 매칭된 경로 정보를 담고 있다.
  - ussParams( )
    - URI 파라미터 값을 포함하는 Params 객체를 리턴한다.
  - useSearchParams( )
    - 현재 요청의 쿼리 문자열을 읽거나 수정할 수 있다. 쿼리 문자열은 URL 뒤에 ?a=1&b=2와 같이 따라붙는 문자열 정보다.
  - useLocation( )
    - 화면 요청된 경로 정보를 포함하는 Location 객체를 리턴한다.
  - useNavigate( )
    - 화면 전환(이동)을 위한 Navigate 함수를 리턴한다.
  - useOutletContext( )
    - 상위 경로에 상태를 저장하고, Outlet 컴포넌트에 렌더링하는 자식 컴포넌트에서 상태에 접근할 수 있도록 한다.

<br>

### 9.4.1 useMatch

- useMatch 훅은 현재 요청된 URI 경로가 인자로 전달한 경로 패턴과 매칭하는지 확인하고 PathMatch 객체를 리턴한다. 사용 방법은 다음과 같다.

```javascript
// 경로 패턴에는 <Route / > 컴포넌트의 path 속성에 지정하던 경로 형태를 전달한다.
const pathMatch = useMatck(경로패턴);
```

- 응답한 PathMatch 객체는 다음과 같은 속성이 있다.
  - params : URI 경로 파라미터
  - pathname : 요청된 경로
  - pattern : 요청된 경로 패턴

<br>

### 9.4.2 useSearchParams

- useSearchParams 훅은 요청 시 전달하는 쿼리 문자열 정보를 읽어내거나 설정하는 기능을 제공한다. 사용 방법은 다음과 같다.

```javascript
// searchParams : 쿼리 문자열을 읽을 수 있는 전용의 객체이다. ?a=1&b=2와 같이 요청한 경우 searchParams.get('a)와 같이 값에 접근할 수 있다.
// setSearchParams : 쿼리 문자열을 설정할 수 있는 기능을 제공하는 함수이다. setSeatchParams({ a: 3, b: 4 })와 같이 설정할 수 있다.
const [searchParams, setSearchParams] = useSearchParams();
```

<br>

### 9.4.3 useNavigate와 useLocation

- useNavigate 훅은 호출하면 URI 경로를 이동할 수 있는 navigate 함수가 리턴된다. 이 함수를 호출하여 다양한 방법으로 경로를 이동하고 화면을 전환할 수 있다. 사용 방벙은 다음과 같다.

```javascript
// navigate(to, options)
//    - to : 이동하려는 경로
//    - options : 경로를 이동할 때 지정할 수 있는 옵션
const navigate = useNavigate();
```

- navigate 함수의 두 번째 인자(options)에서 사용할 수 있는 속성은 다음과 같다.
  - replace : 내부적으로 이용하는 브라우저 히스토리(history)의 현재 항목을 교체할 것인지를 true/false로 지정한다. 기본값은 false이다.
  - state : 내비게이션할 때 전달할 상태 정보다. 이 정보는 경로 이동이 완료된 후 location 객체의 state 속성(location.state)을 이용해 접근할 수 있다.
- Navigate 함수 대신에 JSX 구문에 포함시켜서 선언적으로 사용할 수 있는 `<Navigate />` 컴포넌트도 있다. 다음 예시는 isLoggined 값이 false이면 /login 경로로 바로 이동시킨다.

```javascript
import { Navigate } from 'react-router-dom'
.....
// JSX 구문 내에서 사용 예시
return (
  <div>
    { isLoggined ? <App /> : <Navigate to="/login" replace={true} /> }
  </div>
);
```

- state 정보를 액세스하려면 useLocation 훅을 사용하면 된다. useLocation 훅의 사용 방법은 다음과 같다.

```javascript
const location = useLocation();
```

- location 객체가 제공하는 속성은 다음과 같다.
  - pathname : 현재 요청된 경로
  - search : 쿼리 문자열
  - state : navigate( )로 이동할 때 전달된 상태(state) 정보

<br>

### 9.4.4 useOutletContext

- useOutletContext 훅은 중첩된 라우트를 사용할 때 상위 경로의 `<Outlet />` 컴포넌트를 이용해 상태 정보를 저장해두고 하위 경로에서 접근할 수 있도록 하는 기능을 제공한다. 사용 방법은 두 단계로 이우어진다.
  - 상위 라우트가 렌더링하는 컴포넌트 (`<Outlet />` 컴포넌트를 렌더링하는 컴포넌트)에서 상태 또는 속성을 `<Outlet / >` 컴포넌트의 context에 지정하여 전달한다.
  - 중첩 라우트의 자식 컴포넌트에서 useOutletContext( ) 훅을 이용해 context 객체를 받아서 이용한다.
- 구체적인 예시를 살펴보면 다음과 같다.

```javascript
// [상위 라우트 컴포넌트에서 상태를 context로 전달하는 경우]
const parentComponent = () => {
  const [title, setTitle] = React.useState('Hello React');
  return (
    ......
    <Outlet context={{ title }} />
    ......
  )
};
export default Home;

// [중첩 라우트 컴포넌트에서 useOutletContext 훅으로 context 객체를 이용하는 경우]
type ContextStateType = { title: string };
const childComponent = () => {
  const { title } = useOutletContext<ContextStateType>();
}
```

<br>

### 9.5 라우터 관련 컴포넌트

- BrowserRouter
  - BrowserRouter는 HTML5 History API를 사용하여 URI와 UI를 동기화한 상태를 유지할 수 있는 기능을 제공한다. BrowserRouter는 URI 경로를 사용하여 브라우저의 주소를 저장하고, 브라우저 history 객체의 스택을 사용해 탐색한다. BrowserRouter 사용은 웹 브라우저에서 리액트 라우터를 적용할 때 가장 권장하는 방법이다.
- HashRouter
  - URL의 해시 정보를 이용해서 URI 경로와 UI를 동기화한 상태로 유지시킨다. 해시는 # 기호로 표시된다. 이 라우터는 주로 BrowserRouter가 지원되지 않는 환경일 때 사용할 것을 권장한다. HashRouter는 http://localhost:3000/#/about 과 같이 # 다음에 /about처럼 라우팅에 사용하는 경로가 브라우저의 주소 입력란에 찍힌다.
- MemoryRouter
  - MemoryRouter는 애플리케이션의 메모리 영역에 배열을 만들어 라우팅 정보를 저장하고 UI와 동기화시킨다. 따라서 URI 경로가 브라우저의 주소창에 표시되지 않고 메모리에만 유지된다. 브라우저 주소 UI를 보여주지 않아도 되는 하이브리드 앱 같은 경우에 사용할 수 있다.

<br>

### 9.5.1 Router 컴포넌트

- 일반적인 웹 애플리케이션이라면 BrowserRouter를 권장한다. 하지만 BrowserRouter를 사용하려면 리액트 애플리케이션을 호스팅하는 웹 서버가 fallback UI를 지원해야 한다. fallback UI는 웹 서버에서 404 Not Fountd 에러가 발생하더라도 정해진 기본 페이지를 응답하는 기능이다.
- fallback UI를 지원하지 않는 웹 서버일 경우
  1. /about 직접 요청
  2. SPA 앱은 index.html 문서 하나만 존재하므로 /about 경로의 리소스가 존재하지 않음
  3. 404 Not Found 오류 발생
- fallback UI를 지원하는 웹 서버일 경우
  1. /about 직접 요청
  2. 웹 서버가 fallback UI를 제공한다면 fallback UI: /index.html
  3. /index.html 응답
  4. /about 경로에 대한 라우팅 수행
- 위의 예시에서 fallback UI가 /index.html로 지정됐다. 이제 http://server/about과 같이 존재하지 않는 경로를 요청하더라도 일단 /index.html 문서를 응답할 것이다. 그리고 그 다음에 웹 브라우저상에서 리액트 라우터 애플리케이션이 `<Route />` 컴포넌트로 매칭된 컴포넌트를 렌더링해주도록 정상 작동할 것이다.
- fallback UI가 없는 웹 서버에서의 에러 확인
  - npm run build
  - npx serve dist --listen 3000

<br>

### 9.5.2 404 라우트와 리디랙션 구성

- 우리가 사용하는 웹 서버는 fallback UI를 지정했기 때문에 404 에러 대신 /index.html을 응답한다. 따라서 404 에러 화면을 리액트 라우터 수준에서 처리해야 하는데, 이를 404 라우트라고 부른다. 404 라우트는 App 컴포넌트에서 `<Routes />` 내부의 가장 마지막에 `<Route path='*' ... />`와 같이 만들어주면 된다.
- 또한 특정 경로로 요청하면 다른 경로로 강제 이동시켜야 하는 경우가 있다. 이와 같은 방법을 리디렉션(redirection)이라고 부르는데, 리액트 라우터 6 버전에서는 `<Navigate />` 컴포넌트를 활용하면 된다. 사용방법은 다음과 같다.

```javascript
<Route path="/a" element={<Navigate to="/b" />} />
<Route path="/b" element={<BComponent />} />
```

<br>

### 9.5.3 NavLink 컴포넌트

- NavLink 컴포넌트는 Link 컴포넌트와 유사해 보이지만 '현재 요청된 경로와의 일치 여부에 따라 각기 다른 스타일을 부여할 수 있는 Link 컴포넌트'이다. 사용 방법은 다음 예시와 같다.

```javascript
// style에 동적으로 부여
<NavLink to='/blog' style={ ({ isActive }) => {
  return isActive ? : activeStyle : undefined
}}>
  Blog
</NavLink>

// className에 동적으로 부여
<NavLink to='/catalogs' className={ ({ isActive }) => {
  return isActive ? : activeClassName : undefined
}}>
  Catalogs
</NavLink>
```

- NavLink와 Link의 차이점은 NavLink를 사용하면 해당 페이지에 있을 경우 메뉴를 활성화시켜서 유저가 해당 메뉴에 있는 것을 인지시킬 수 있다.

<br>

### 9.6 리액트 라우터와 레이지 로딩 기법

### 9.6.1 레이지 로딩이란?

- 수백, 수천 개의 컴포넌트를 작성할 때 만들어진 타입스크립트 파일은 모두 빌드 과정을 거쳐서 하나 또는 몇 개의 .js 파일로 빌드된다. 빌드된 파일은 모든 컴포넌트를 묶은 것이므로 파일의 크기도 클 것으로 예상할 수 있다. 빌드된 파일들을 웹 서버에 배포할 경우 사용자가 첫 화면을 로딩하는 과정은 다음과 같다.
  1. 사용자는 / 경로로 웹 서버에 요청 정보를 전송한다.
  2. 웹 서버는 index.html과 필요한 모든 산출물(.js파일 포함)을 브라우저로 응답한다.
  3. 브라우저에서는 / 경로의 첫 화면만 렌더링한다.
  4. 사용자가 /about 경로를 네비게이션하더라도 웹 서버에 요청하지 않는다. 이미 다운로드한 ,js 파일의 컴포넌트를 이용해 브라우저에서 렌더링한다.
- 위의 과정은 브라우저가 첫 화면을 로딩하기 위해 첫 화면 뿐만 아니라 모든 화면을 위한 .js 파일을 로딩한다. 이때 지연 시간이 발생해서 사용자는 첫 화면을 보기까지 기다리는 시간이 길어질 수 있다. 이 문제를 해결하는 방법 중 하나가 `레이지 로딩(lazy loading)` 기법이다.
- 레이지 로딩은 리액트 애플리케이션의 수많은 화면과 컴포넌트 코드를 적절히 구분하여 화면, 컴포넌트 그룹 단위로 여러 개의 청크(chunk)라 부르는 .js 파일로 빌드하고 특정 컴포넌트가 필요한 시점에 서버에 요청해서 청크 파일을 응답받아 렌더링하는 방법이다. 레이지 로딩 기법을 이용한 화면 요청 과정은 다음과 같다.
  1. / 경로의 첫 화면을 요청한다.
  2. 웹 서버는 / 경로의 화면에 필요한 index.html과 home.js 파일만을 응답한다.
  3. 브라우저 화면에서 /about 경로로 네비게이션한다.
  4. /about 화면 생성에 필요한 정크(about.js) 파일을 웹 서버에 요청한다.
  5. 웹 서버는 청크(about.js) 파일을 응답한다.
  6. 브라우저에서 /about 경로의 화면을 렌더링한다.
- 즉, 레이지 로딩 기법의 핵심은 특정 화면이 필요할 때 관련된 컴포넌트를 포함하고 있는 .js 파일을 웹 서버에 요청하여 받아오는 것이다. 이 방법을 사용하면 애플리케이션이 수많은 컴포넌트를 포함하더라도 첫 화면을 요청할 때는 작은 크기의 청크 파일을 요청하고 응답받으므로 사용자에게 첫 화면을 더 신속하게 보여줄 수 있다.
- 레이지 로딩을 적용하려면 컴포넌트의 임포트를 필요한 시점에 비동기로 수행할 수 있어야 한다. 이를 위해서 React.lazy( ) 함수와 import 함수를 이용한다.
  - ```javascript
    const home = React.lazy(() => import("./Home"));
    ```

<br>

### 9.6.2 Suspense 컴포넌트

- 청크 파일을 필요할 때 로딩하다 보면 실행 중에 약간의 지연 시간이 발생할 수 있다. 지연 시간이 길어지다보면 사용자에게 로딩 중임을 나타내는 화면을 보여주는 것이 좋다. 이런 화면을 fallback UI라고 부르며 이 기능을 손쉽게 구현할 수 있도록 도와주는 컴포넌트가 Suspense 컴포넌트다. Suspense 컴포넌트의 사용 방법은 다음과 같다.

```javascript
// fallback 속성에는 발생한 지연 시간 동안에 보여줄 컴포넌트를 지정할 수 있다.
// 1. 특정 컴포넌트를 감싸줄 수 있다.
<React.Suspense fallback={<Loading />}>
  <TestComponent />
</React.Suspense>

// 2. <Router /> 컴포넌트도 감싸줄 수 있다.
<React.Suspense fallback={<Loading />}>
  <Router>
    ......
  </Router>
</React.Suspense>
```

- npm i react-spinners p-min-delay 설치 필요
  - react-spinners 는 지연 시간 동안 보여줄 컴포넌트를 제공하는 라이브러리
  - p-min-delay 는 의도적으로 지연 시간을 발생시키는 기능을 제공하는 라이브러리
- 처음 페이지의 로딩시에만 지연이 발생하고, 로딩이 된 페이지는 다시 방문해도 지연이 발생하지 않는다.
