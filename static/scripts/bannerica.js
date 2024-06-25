const bannerLink = 'https://cluecon.com';
const announcementText = '🚀 ClueCon: a real-time communications conference by developers for developers. August 12-15 in Chicago, IL 📞';

document.addEventListener('DOMContentLoaded', initializeBanner);

function initializeBanner() {

  createHeaderElements();
  setInitialVisibility();
  bindEventListeners();
}

function createHeaderElements() {
  let headerContainer = document.getElementById('headerContainer');

  if (!headerContainer) {
    headerContainer = document.createElement('div');
    headerContainer.id = 'headerContainer';
    document.body.insertBefore(headerContainer, document.body.firstChild);

    const customBanner = document.createElement('a');
    customBanner.id = 'bannerica';
    customBanner.href = bannerLink;
    customBanner.className = 'bannerica';
    customBanner.innerHTML = `
      <button type="button" aria-label="Close" class="close-banner-btn"></button>
    `;
    headerContainer.appendChild(customBanner);

    const announcementBar = document.createElement('div');
    announcementBar.className = 'announcementBar';
    announcementBar.innerHTML = `
      <div class="announcementBarText"><a href="${bannerLink}">${announcementText}</a></div>
      <button class="expand-banner-btn" aria-label="Expand"></button>
    `;
    headerContainer.appendChild(announcementBar);
  }
}

function setInitialVisibility() {
  const customBanner = document.getElementById('bannerica');
  const announcementBar = document.querySelector('.announcementBar');
  const savedState = localStorage.getItem('bannerVisible');

  if (savedState !== null) {
    const isBannerVisible = savedState === 'true';
    customBanner.style.display = isBannerVisible ? 'block' : 'none';
    announcementBar.style.display = isBannerVisible ? 'none' : 'block';
  } else {
    customBanner.style.display = 'block';
    announcementBar.style.display = 'none';
  }
}

function bindEventListeners() {
  const customBanner = document.getElementById('bannerica');
  const announcementBar = document.querySelector('.announcementBar');
  const closeBtn = customBanner.querySelector('.close-banner-btn');
  const expandBtn = announcementBar.querySelector('.expand-banner-btn');

  if (closeBtn && !closeBtn.hasAttribute('data-listener')) {
    closeBtn.addEventListener('click', handleBannerClose);
    closeBtn.setAttribute('data-listener', 'true');
  }

  if (expandBtn && !expandBtn.hasAttribute('data-listener')) {
    expandBtn.addEventListener('click', handleBannerExpand);
    expandBtn.setAttribute('data-listener', 'true');
  }
}

function handleBannerClose(event) {
  event.preventDefault();
  event.stopPropagation();

  const customBanner = document.getElementById('bannerica');
  const announcementBar = document.querySelector('.announcementBar');

  customBanner.style.display = 'none';
  announcementBar.style.display = 'block';
  localStorage.setItem('bannerVisible', 'false');
}

function handleBannerExpand() {
  const customBanner = document.getElementById('bannerica');
  const announcementBar = document.querySelector('.announcementBar');

  customBanner.style.display = 'block';
  announcementBar.style.display = 'none';
  localStorage.setItem('bannerVisible', 'true');
}
