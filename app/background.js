// background.js

// Add event listeners for when the extension is installed, enabled, and disabled
chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed');
  });
  
  chrome.runtime.onStartup.addListener(function () {
    console.log('Extension started');
  });
  
  chrome.runtime.onSuspend.addListener(function () {
    console.log('Extension suspended');
  });
  
  // Listen for messages from content scripts or other parts of the extension
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Message received:', message);
    
    // Example: Send a response back to the sender
    sendResponse({ received: true });
  });
  