
void chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });

// Disable by default, so that it can be enabled on a per-tab basis.
// Without this, the sidePanel remains open as the user changes tabs
void chrome.sidePanel.setOptions({
    enabled: false,
});

chrome.action.onClicked.addListener(async ({id: tabId}) => {
    console.log("chrome.action.onClicked", {tabId})

    if (tabId) {
        // https://github.com/GoogleChrome/chrome-extensions-samples/issues/987

        // Simultaneously enable and open the side panel.
        // If we wait too long before calling .open(), we will lose the "user gesture" permission
        // There is no way to know whether the side panel is open yet, so we call it regardless.
        void chrome.sidePanel.setOptions({
            tabId,
            path: "sidepanel.html",
            enabled: true,
        });

        await chrome.sidePanel.open({ tabId });
    }
});

// Show in MS Edge error log
console.log("Background script loaded.")
