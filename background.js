// Listen for the browser action button to be clicked
chrome.browserAction.onClicked.addListener(() => {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        // Check if the tab is a valid tab
        if (currentTab) {
            // Send a message to the current tab
            chrome.tabs.sendMessage(currentTab.id, { message: 'browser_action_clicked' });
        } else {
            alert("No tab selected");
        }
    });
});
// Listen for messages from the content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "popup_opened") {
            // Send a message to the current tab
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const currentTab = tabs[0];
                chrome.tabs.sendMessage(currentTab.id, { message: 'popup_opened' });
            });
        }
    });
