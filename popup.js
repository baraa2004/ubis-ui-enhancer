
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleEnhancer');
  const status = document.getElementById('statusText');

  chrome.storage.sync.get(['enhancerEnabled'], res => {
    const enabled = res.enhancerEnabled ?? true;
    toggle.checked = enabled;
    status.textContent = enabled ? "Enabled" : "Disabled";
  });

  toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    chrome.storage.sync.set({ enhancerEnabled: isEnabled }, () => {
      status.textContent = isEnabled ? "Enabled" : "Disabled";
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});
