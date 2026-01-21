// 확장프로그램 아이콘 클릭 시 사이드바가 나타나도록 하는 코드
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));