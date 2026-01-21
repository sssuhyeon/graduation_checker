// 해당 사이트에서만 확장프로그램 사용 가능
const NDRIMS_ORIGIN = 'https://ndrims.dongguk.edu';

// 확장프로그램 아이콘 클릭 시 사이드바가 열림
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// ndrims에서만 사용 가능하도록 설정
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;

    const url = new URL(tab.url);

    if (url.origin === NDRIMS_ORIGIN) {
        // ndrims 사이트: 아이콘 클릭 시 사이드바 활성화
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'sidepanel.html',
            enabled: true
        });
    } else {
        // 다른 사이트: 아이콘 클릭해도 사이드바 활성화되지 않음
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
})