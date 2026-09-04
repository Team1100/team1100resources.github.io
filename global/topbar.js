//this file is used to create the top bar navigation for the website. It is injected into the top of the body automatically when the page loads.
const topbarHTML = `
<!-- Top Bar -->
<div id="topbar">
  <div id="topbar-scroll">
    <button class="toggle-btn" id="openBtn" aria-expanded="false">☰ Open Sidebar</button>

    <a href="https://team1100.org/">
      <img src="../../global/media/1100Logo.png" alt="Team 1100 Logo">
    </a>
    <div class="dropdown-row">

    <!-- Home -->
    <div class="dropdown">
      <button class="dropbtn">Home</button>
      <div class="dropdown-content">
        <a href="../../home/thisWebsite/index.html">What is this Website?</a>
        <a href="#">How to maintain this website (no page)</a>
      </div>
    </div>

    <!-- Software -->
    <div class="dropdown">
      <button class="dropbtn">Software</button>
      <div class="dropdown-content">
        <a href="../../software/gettingStarted/index.html">Getting Started</a>
      </div>
    </div>

    <!-- Mechanical -->
    <div class="dropdown">
      <button class="dropbtn">Mechanical</button>
      <div class="dropdown-content">
        <a href="../../mechanical/cad/index.html">CAD</a>
        <a href="#">brad (doesnt exist)</a>
      </div>
    </div>

    </div>

  </div>
</div>
`;

// Inject the navigation bar into the top of the body 
document.body.insertAdjacentHTML('afterbegin', topbarHTML);

//the sidebar button thingy that appears when screen is small 
const toggleButton = document.getElementById('openBtn');

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('sidebar-open');
    toggleButton.textContent = isOpen ? '☰ Close Sidebar' : '☰ Open Sidebar';
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const topbarScroll = document.getElementById('topbar-scroll');
let activeDropdown;

function positionDropdown(dropdown) {
  const button = dropdown.querySelector('.dropbtn');
  const menu = dropdown.querySelector('.dropdown-content');

  if (!button || !menu) return;

  menu.style.display = 'block';
  const buttonRect = button.getBoundingClientRect();
  const menuWidth = menu.getBoundingClientRect().width;
  const left = Math.max(0, Math.min(buttonRect.left, window.innerWidth - menuWidth));

  menu.style.left = `${left}px`;
  menu.style.top = `${buttonRect.bottom}px`;
}

document.querySelectorAll('.dropdown').forEach((dropdown) => {
  dropdown.addEventListener('mouseenter', () => {
    activeDropdown = dropdown;
    positionDropdown(dropdown);
  });
  dropdown.addEventListener('mouseleave', () => {
    dropdown.querySelector('.dropdown-content').style.display = '';
    if (activeDropdown === dropdown) activeDropdown = undefined;
  });
});

if (topbarScroll) {
  topbarScroll.addEventListener('scroll', () => {
    if (activeDropdown) positionDropdown(activeDropdown);
  });
}
