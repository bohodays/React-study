## 11. axios를 이용한 HTTP 통신

<br>

### 11.1 axios란?

- axios는 HTTP 기반 통신을 지원하는 가장 많이 사용되는 자바스크립트 라이브러리다. 다음은 fetch와 axios를 비교한 표이다.
- axios
  - 모듈 설치 : 설치해야 함 (npm install --save axios)
  - Promise API : 사용
  - timeout 기능 : 지원 (timeout 시간 내에 응답이 오지 않으면 중단시킬 수 있음)
  - JSON 자동 변환 : 지원 (Content-type 정보를 이용해 자동으로 객체로 변환함)
- fetch
  - 모듈 설치 : 설치할 필요 없음 (브라우저 내장 API)
  - Promise API : 사용
  - timeout 기능 : 지원하지 않음
  - JSON 자동 변환 : 지원하지 않음 (수신한 JSON 데이터를 객체로 변환하는 Promise 체인을 추가해야 함.)
- axios를 사용하려면 npm 패키지를 설치해야 하는 단점이 있지만 브라우저 호환성, timeout을 이용한 중단(abort) 기능, Content Type을 이용한 JSON 자동 변환 기능 등 장점이 많다.

<br>

### 11.2 크로스 오리진 문제란?

- 크로스 오리진 (cross origin) 문제란 "브라우저는 자신의 오리진과 다른 오리진의 API 서버와 통신할 때 문제가 발생한다."는 개념이다. 크로스 오리진 문제를 발생시킴으로써 잠재적인 위험을 가진 문서의 로딩을 제한해 브라우저 공격의 가능성을 줄일 수 있다.
- 크로스 오리진 문제는 웹 브라우저에 내장된 SOP (Same Origin Policy: 동일 근원 정책) 라는 보안 정책 때문에 발생한다. SOP는 "브라우저의 오리진과 동일한 오리진을 가진 서버일 때만 통신을 가능하게 한다." 라는 의미를 가진 브라우저 내부의 보안 정책이다. 반대로 말하면 동일 오리진이 아닌 다른 오리진, 즉 크로스 오리진일 때는 통신에 뭔가 문제가 발생한다는 것이다. 크로스 오리진과 SOP를 이해하려면 브라우저의 오리진이라는 개념부터 이해해야 한다.
- 브라우저가 웹 서버에 요청을 보내면 웹 서버는 응답한다. 일반적인 경우라면 웹 서버는 HTML 문서 형태를 응답할 것이다. 웹 브라우저는 HTML 문서르 제공한 웹 서버의 정보`(가장 앞에서부터 포트번호까지의 문자열 정보)`를 `오리진`으로 저장한다. 즉 오리진은 "HTML 문서를 내려받은 원천지는 이 곳이다"라는 뜻이다.
- 크로스 오리진 문제는 크게 두 가지 해결 방법이 있다. 첫 번째는 백엔드 API 서버 측에서 CORS(Cross Origin Resource Sharing)라는 기능을 제공해주는 방법이고, 또 한 가지는 프론트엔드 애플리케이션을 호스팅하는 웹 서버에 프록시(proxy)를 설정하는 방법이다.
- CORS
  1. 브라우저는 프론트 서버에서 HTML 문서를 받아와 자신의 오리진을 설정한다.
  2. 자바스크립트 코드로 백엔드 API 서버에 요청한다. 이때 자신의 오리진을 Origin HTTP 헤더에 추가한다.
  3. 백엔드 API 서버는 전송된 Origin 헤더를 읽어내어 등록된 리스트에 일치하는 것이 있는지 확인한다. (이 단계는 선택적이다)
  4. 백엔드 API 서버는 Access-Control-Allow-Origin 응답 헤더를 추가하고, \* 또는 브라우저의 오리진을 값으로 지정하여 응답한다.
  5. 브라우저는 자신의 오리진과 백엔드 API 서버로부터 전송받은 Access-Control-Allow-Origin 헤더가 일치하거나 \*라면 응답이 허가된 것으로 간주하고 데이터를 로딩한다.
- 프록시를 이용한 우회
  - 브라우저가 백엔드 API 서버와 직접 통신하는 것이 아니라 프론트엔드 애플리케이션을 호스팅하는 서버(이하 프론트 서버)에 프록시를 설치하여 프론트 서버의 프록시를 거쳐서 백엔드 API에 통신하도록 하여 브라우저 측에서는 동일한 오리진과 통신하도록 하는 방법이다.
- CRA(create-react-app)에서의 프록시 설정 방법
  CRA 도구로 생성한 프로젝트에서는 프록시의 설정 방법이 조금 다르다. src/setupProxy.js 파일을 추가하고 다음과 같이 프록시 설정을 하면 된다.

  - ```javascript
    const { createProxyMiddleware } = require("http-proxy-middleware");

    module.exports = function (app) {
      app.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        })
      );
    };
    ```

- 더 자세한 정보는 [웹 서버 기술명] + http proxy 로 구글링하기

<br>

### 11.3 axios 라이브러리 사용 방법

- axios.get( ) 함수

```javascript
// 사용 방법
// url : 요청하는 백엔드 API의 URL을 지정한다.
// config : 요청 시에 지정할 설정값들이다.
// 요청 후에는 Promise를 리턴하며 처리가 완료된 후에는 response 객체를 응답한다.
axios.get(rul, config);

// 사용 예시 : Promise
const requestAPI = () => {
  const url = "/api/todolist/gdhong";
  axios.get(url).then((response) => {
    console.log("응답 객체 : ", response);
  });
};
requestAPI();

// 사용 예시 : async / await
const requestAPI = async () => {
  const url = "/api/todolist/gdhong";
  const response = await axios.get(url);
  console.log("응답 객체 : ", response);
};
requestAPI();
```

- 응답 객체는 여섯 가지 속성을 가지고 있고, 다음과 같다.
  - config: 요청 시에 사용된 config 옵션
  - data: 수신된 응답 데이터
  - headers: 백엔드 API 서버가 응답할 때 사용된 응답 HTTP 헤더
  - request: 서버와의 통신에 사용된 XMLHttpRequest 객체의 정보
  - status: 서버가 응답한 HTTP 상태 코드
  - statusText: 서버의 HTTP 상태를 나타내는 문자열 정보

<br>

- axios.post( ) 함수

```javascript
// url, config는 axios.get()의 내용과 동일하다.
// data는 POST 요청의 HTTP Content Body로 전송할 데이터다
axios.post(url, data, config);
```

<br>

- axios.get( ), axios.post( ) 이외에도 axios.put( ), axios.delete( )를 사용할 수 있다. axios.put( )은 PUT 요청을 처리하는 함수이며 axios.post( )와 같은 방법으로 사용하면 된다. axios.delete( )는 DELETE 요청을 처리하는 함수이며 axios.get( )과 같은 방법으로 사용한다.

```javascript
axios.delete(url, config);
axios.put(url, data, config);
```
