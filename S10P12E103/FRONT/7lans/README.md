# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Issue 정리

| 번호 | 이슈 내용                                                                                       | 해결방법                                                                                                                          |
| ---- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1    | 파일명을 파스칼로 변경해서 git add 할 경우에 대/소문자 구분을 못해서 commit이 덜 되는 오류 발생 | git config core.ignorecase로 true인지 false인지 상태 확인 후 true인 경우 `git config core.ignorecase false' 해서 false로 변경하기 |

| 번호 | 이슈 내용                                                  | 해결방법                                                                  |
| ---- | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| 2    | eslint에러로 vscode내에 코드가 전부 빨간줄이 뜨는 이상현상 | eslint error 검색해서 수정. + styled components 확장프로그램 설치(VScode) |

#### 3. Gerrit push issue
![Alt text](image.png)
npm run dev를 해둔 상태에서 git push 하려고 하니까 계속 거절당했다. 
서버 종료시킨 후에 push 하니까 정상적으로 올라감