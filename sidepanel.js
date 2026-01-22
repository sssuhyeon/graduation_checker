// sidepanel.js

// 1. 메시지 리스너 등록 (무전기 대기)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    // 2. 메시지 타입 확인
    if (message.type === "NDRIMS_GRADE_DATA") {
        console.log("✅ Side Panel: 데이터를 정상적으로 수신했습니다.");
        
        const courses = message.payload.courses; // 가로챈 dsMain 데이터

        // 총 이수 학점 계산
        calculateTotalCredits(courses);

        // 수강 과목 출력
        renderCourseList(courses);
    }
});

function calculateTotalCredits(courses) {
    const totalElement = document.getElementById('total-credits');

    const total = courses.reduce((sum, course) => {
        if (courses.RECOD_GRD_NM !== "F" && course.RECOD_GRD_NM !== "NP") {
            return sum + parseFloat(course.CDT);
        }
        return sum;
    }, 0);

    totalElement.innerText = total.toFixed(1);
}

// 데이터를 HTML로 변환하여 화면에 보여주는 함수
function renderCourseList(courses) {
    const listElement = document.getElementById('course-list');
    
    if (!courses || courses.length === 0) {
        listElement.innerHTML = "<p>수강 데이터가 없습니다.</p>";
        return;
    }

    // 자바의 for-each 루프처럼 배열을 하나씩 돌며 HTML 문자열을 만듭니다.
    const htmlContent = courses.map(course => `
        <div class="course-item">
            <span class="course-name">${course.SBJ_NM}</span>
            <div class="course-info">
                <span>${course.YY}년 ${course.SEM_NM}</span> | 
                <span>${course.CDT}학점</span> | 
                <span class="grade-tag">${course.RECOD_GRD_NM}</span>
            </div>
        </div>
    `).join(''); // 배열을 하나의 문자열로 합침

    listElement.innerHTML = htmlContent;
}