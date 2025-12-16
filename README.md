# 🎬 Movie App (React)

React를 이용해 영화 정보를 조회하고, 사용자 인터랙션을 제공하는 웹 애플리케이션입니다.  
TMDB(The Movie Database) API를 활용하여 인기 영화 목록을 불러오고,  
반응형 UI를 적용해 모바일 환경에서도 사용 가능하도록 구현하였습니다.

---

## 📌 주요 기능 (Features)

- 🎥 **영화 목록 조회**
    - TMDB API를 활용한 인기 영화 데이터 fetch
- ❤️ **Wishlist 기능**
    - 관심 있는 영화를 저장 / 해제 가능
- 📱 **반응형 헤더 UI**
    - PC / 모바일 환경에 맞춘 네비게이션 레이아웃
    - 모바일에서 중앙 정렬된 메뉴 제공
- 🔄 **Infinite Scroll / Table View**
    - 스크롤 방식 또는 페이지 방식 선택 가능
- 🎨 **다크 테마 기반 UI**
    - 영화 서비스에 어울리는 스타일 적용

---

## 🛠 사용 기술 (Tech Stack)

- **Frontend**
    - React
    - JavaScript (ES6+)
    - CSS (Flexbox, Media Query)
- **API**
    - TMDB API
- **Tools**
    - Axios
    - Git / GitHub
    - WebStorm / VS Code

---

## 📂 프로젝트 구조 (Structure)

```
src/
 ┣ api/
 ┃ ┗ tmdb.js
 ┣ components/
 ┃ ┣ Header.jsx
 ┃ ┣ MovieCard.jsx
 ┃ ┗ ...
 ┣ hooks/
 ┃ ┗ useWishlist.js
 ┣ pages/
 ┃ ┣ Popular.jsx
 ┃ ┗ ...
 ┣ styles/
 ┃ ┣ header.css
 ┃ ┣ popular.css
 ┃ ┗ ...
 ┣ App.js
 ┗ index.js
```

---

## 📱 반응형 UI 설명

- **PC 환경**
    - 로고 / 메뉴 / 로그아웃 버튼을 좌우 정렬
- **모바일 환경**
    - 메뉴를 화면 중앙에 고정
    - 로고와 로그아웃 버튼은 좌우에 배치
    - `media query`를 이용해 모바일 전용 레이아웃 적용


---

## ▶ 실행 방법 (How to Run)

```bash
npm install
npm start
```

브라우저에서 아래 주소로 접속합니다.

```
http://localhost:3000
```

---

## ✍️ 구현 중 신경 쓴 부분

- 모바일 환경에서 **중앙 정렬이 무너지지 않도록 레이아웃 구조를 분리**
- `flex`와 `absolute positioning`을 적절히 조합하여 UI 안정성 확보
- 상태 관리 로직을 커스텀 Hook으로 분리하여 재사용성 향상

---

## 🚀 향후 개선 사항 (Todo)

- 🔍 영화 검색 기능 추가
- 🎞 영화 상세 페이지 구현
- 🌙 사용자 설정 저장 (LocalStorage)
- 🎬 장르별 필터링 기능

---

## 👤 제작자

- 이름: 이대복
- 전공: 컴퓨터공학부
- 사용 목적: React 학습 및 프로젝트 과제
- Github pages 주소: https://rinda1234.github.io/Netflix.github.io