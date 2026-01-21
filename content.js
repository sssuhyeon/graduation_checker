// content.js
const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected_script.js'); // 우리 파일을 가져와서
(document.head || document.documentElement).appendChild(script); // 페이지 헤더에 붙여버림
script.onload = () => script.remove(); // 다 읽었으면 깔끔하게 태그 삭제

window.addEventListener("message", (event) => {
    // 보안을 위해 현재 창에서 보낸 메시지인지 확인합니다.
    if (event.source !== window) return;

    // 우리가 설정한 타입("NDRIMS_GRADE_DATA")의 메시지인지 확인합니다.
    if (event.data && event.data.type === "NDRIMS_GRADE_DATA") {
        console.log("Content Script: 웹 페이지에서 데이터를 받았습니다. Side Panel로 전달합니다.");
        
        // 크롬 확장 프로그램 시스템을 통해 다른 파일(sidepanel.js 등)로 데이터를 던집니다.
        chrome.runtime.sendMessage(event.data);
    }
});