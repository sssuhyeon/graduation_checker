// injected_script.js
(function() {
    // XMLHttpRequest 서버와 통신하는 도구
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // open 함수 개조 (주소 확인)
    XMLHttpRequest.prototype.open = function(method, url) {
        // 1. 요청하는 URL을 저장해둡니다.
        this._url = url;
        // 원래 open 함수 실행
        return originalOpen.apply(this, arguments);
    };

    // send 함수 개조 (응답 가로채기)
    XMLHttpRequest.prototype.send = function() {
        this.addEventListener('load', function() {
            // 2. URL에 'doList.do'가 포함된 경우에만 로직을 실행합니다.
            if (this._url && this._url.includes("doList.do")) { // url 체크
                try {
                    const responseData = JSON.parse(this.responseText); // 문자열을 객체로 변환

                    // 3. 데이터 구조(dsMain)가 있는지 한 번 더 확인합니다.
                    if (responseData.dsMain) {
                        console.log(`[${this._url}] 에서 성적 데이터를 발견했습니다!`);
                        
                        // 데이터 전송
                        window.postMessage({
                            type: "NDRIMS_GRADE_DATA",
                            payload: {
                                courses: responseData.dsMain,
                                summary: responseData.dsSub
                            }
                        }, "*");
                        
                        // 디버깅을 위해 테이블로 출력
                        console.log("전체 데이터 개수:", responseData.dsMain.length); // 개수 확인용
                        console.table(responseData.dsMain); // 전체 출력
                    }
                } catch (e) {
                    // JSON 형식이 아니면 조용히 넘어갑니다.
                }
            }
        });
        return originalSend.apply(this, arguments);
    };
})();