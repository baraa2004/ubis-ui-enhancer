
(async () => {
  const enhancerEnabled = await new Promise(resolve =>
    chrome.storage.sync.get(["enhancerEnabled"], res => resolve(res.enhancerEnabled ?? true))
  );
  if (!enhancerEnabled) return;

  // Your entire Tampermonkey script goes here:
  

(function () {
    'use strict';

    // Add Bootstrap icons for Quick Access
    const iconLink = document.createElement('link');
    iconLink.rel = 'stylesheet';
    iconLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
    document.head.appendChild(iconLink);

    const blackBack = document.getElementById('BlackBack');
    if (blackBack) blackBack.remove();

const elementToRemove = document.querySelector('div#rightMenu');
if (elementToRemove) {
  elementToRemove.remove();
}

    // Check for login page by detecting login form
    const isLoginPage = document.querySelector('form[action*="Login"]') || window.location.href.includes('Login');

    // Skip sidebar and quick access on login page
    if (isLoginPage) return;

    // Styles
    const style = document.createElement('style');
    style.textContent = `
    body {
        font-family: 'Segoe UI', sans-serif !important;
        background-color: #f4f4f4;
    }
    #block2, .nl2-leftblock, #Menu_1, #ModalDialogBoxContainer ,#toggleNLRB {
        display: none !important;
    }
    #sidebarToggle {
        position: absolute;
        top: 87px;
        left: -4px;
        background-color: #071F34;
        color: white;
        border: none;
        padding: 2px 54px;
        font-size: 16px;
        z-index: 9998;
        cursor: pointer;
    }
    #customSidebar::-webkit-scrollbar {
    width: 0.1;
    }

    #customSidebar {
    scrollbar-width: none;
    -ms-overflow-style: none;
   }
    #customSidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 100%;
        background-color: #071F34;
        color: white;
        z-index: 9998;
        padding-top: 60px;
        overflow-y: auto;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    #customSidebar.show {
        transform: translateX(0);
    }
    #customSidebar input {
        margin: 0 20px 20px 20px;
        width: calc(100% - 40px);
        padding: 8px;
        border-radius: 4px;
        border: none;
    }
    .menu-title {
        font-size: 20px;
        padding: 0 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .sidebar-group {
        padding: 10px 20px;
        cursor: pointer;
        font-weight: bold;
        background-color: #0c2e4e;
        margin-top: 5px;
    }
    .sidebar-links {
        padding-left: 20px;
        display: none;
    }
    .sidebar-links a {
        display: block;
        color: white;
        text-decoration: none;
        padding: 6px 0;
        font-size: 14px;
    }
    .sidebar-links a:hover {
        background-color: #103457;
        border-radius: 4px;
        padding-left: 5px;
    }
    .section-box {
        background: #ddd;
        border-radius: 20px;
        padding: 20px;
        margin: 20px 0;
    }
    .section-box h2 {
        margin-top: 0;
        font-weight: bold;
        font-size: 24px;
        text-shadow: 1px 1px #ccc;
    }
    .quick-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px;
        margin-top: 20px;
    }
    .quick-button {
        background: #68A6C3;
        color: white !important;
        border-radius: 15px;
        padding: 20px 10px;
        text-align: center;
        text-decoration: none;
        font-size: 14px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        transition: 0.3s;
    }
    .quick-button:hover {
        background: #5792af;
    }
    .quick-button i {
        font-size: 28px;
        display: block;
        margin-bottom: 8px;
    }
    .nl2-footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .custom-credit {
        position: absolute;
        top: 27px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 25px;
    }
    .custom-credit img {
        height: 14px;
        vertical-align: middle;
        margin-left: 5px;
    }
    .sidebar-action-buttons {
        display: flex;
        justify-content: space-evenly;
        padding: 15px 0;
        border-top: 1px solid #123;
        margin-top: 10px;
    }
    .sidebar-action-buttons a {
        font-size: 22px;
        color: white;
        text-decoration: none;
    }
    .sidebar-action-buttons a:hover {
        color: #aaa;
    }
    #weatherClockWidget {
    position: absolute;
    top: 20px;
    right: 120px;
    color: white;
    padding: 0px 14px;
    font-size: 20px ;
    z-index: 9999;
    font-family: 'Segoe UI', sans-serif;
    min-width: 200px;
}
      #clock, #weather, #date, #day {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        gap: 8px;
    }
#closeSidebar {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    color: white;
    border: none;
    font-size: 28px !important;
    cursor: pointer;
    z-index: 10001;
}
#closeSidebar:hover {
    color: #ffcccc;
}
`;
    document.head.appendChild(style);

    // Show weather/clock only on homepage (Main pointer)

        const centerContainer = document.querySelector('#centerContainer');
        const widget = document.createElement('div');
        widget.id = 'weatherClockWidget';
        widget.innerHTML = `
            <div id="clock"><i class="bi bi-clock"></i><span>--:--:--</span> <div id="date"><i class="bi bi-calendar"></i><span>--/--/----</span></div></div>
            <div id="weather"><i id="weatherIcon" class="bi bi-cloud"></i><span>Loading...</span><div id="day"><i class="bi bi-calendar-week"></i><span>-----</span></div></div>
        `;
        centerContainer?.appendChild(widget);

        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const dateString = now.toLocaleDateString();
            const dayName = now.toLocaleDateString(undefined, { weekday: 'long' });
            widget.querySelector('#clock span').textContent = timeString;
            widget.querySelector('#date span').textContent = dateString;
            widget.querySelector('#day span').textContent = dayName;
        }, 1000);

        fetch('https://api.open-meteo.com/v1/forecast?latitude=41.02&longitude=28.89&current_weather=true')
            .then(res => res.json())
            .then(data => {
                const temp = data.current_weather.temperature;
                const code = data.current_weather.weathercode;
                const icon = widget.querySelector('#weatherIcon');
                const label = widget.querySelector('#weather span');

                const weatherIcons = {
                    0: 'bi-sun',
                    1: 'bi-cloud-sun',
                    2: 'bi-cloud',
                    3: 'bi-cloud-fill',
                    45: 'bi-cloud-fog',
                    48: 'bi-cloud-fog2',
                    51: 'bi-cloud-drizzle',
                    53: 'bi-cloud-drizzle-fill',
                    55: 'bi-cloud-drizzle-heavy',
                    61: 'bi-cloud-rain',
                    63: 'bi-cloud-rain-fill',
                    65: 'bi-cloud-rain-heavy',
                    71: 'bi-cloud-snow',
                    80: 'bi-cloud-rain-heavy',
                    95: 'bi-cloud-lightning',
                    99: 'bi-cloud-lightning-rain'
                };

                icon.className = `bi ${weatherIcons[code] || 'bi-cloud'}`;
                label.textContent = `Istanbul: ${temp}°C`;
            })
            .catch(() => {
                widget.querySelector('#weather span').textContent = 'Weather unavailable';
            });
    

    // Sidebar toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'sidebarToggle';
    toggleBtn.textContent = '☰ Menu';
    document.body.appendChild(toggleBtn);

    // Sidebar structure
    const sidebar = document.createElement('div');
    sidebar.id = 'customSidebar';
    sidebar.innerHTML = `
         <button id="closeSidebar" class="close-btn" title="Close Menu">
          <i class="bi bi-x-lg"></i>
        </button>
        <div class="menu-title">Main menu</div>
        <input type="text" id="searchMenu" placeholder="🔍 search" />

        <div class="sidebar-group">Academic 📚</div>
        <div class="sidebar-links">
            <a href="?Pointer=Main&">Home</a>
            <a href="?Pointer=Ogrenci&Page=YazildigimDersler&">My Courses</a>
            <a href="?Pointer=Ogrenci&Page=DersProgramim&">Course Program</a>
            <a href="?Pointer=Ogrenci&Page=DevamsizlikCizelgem&">Attendance Timetable</a>
            <a href="?Pointer=Ogrenci&Page=DersNotlarim&">Course Notes</a>
            <a href="?Pointer=Ogrenci&Page=Odevler&">Homeworks</a>
            <a href="?Pointer=Ogrenci&Page=BolumDerslerim&">Course Structure</a>
            <a href="?Pointer=Ogrenci&Page=OnKosulluDersler&">Prerequisites</a>
        </div>

        <div class="sidebar-group">Exams 📝</div>
        <div class="sidebar-links">
            <a href="?Pointer=Ogrenci&Page=ElektronikSinavSistemi&">Electronic Exam System</a>
            <a href="?Pointer=Ogrenci&Page=SinavProgramim&">Exam Program</a>
            <a href="?Pointer=Ogrenci&Page=SinavSonuclarim&">My Exam Results</a>
            <a href="?Pointer=Ogrenci&Page=MazeretSinaviBasvuru&">Mazeret Başvurusu</a>
            <a href="?Pointer=Ogrenci&Page=OeSinavRedirect&">UZEM Exams</a>
        </div>

        <div class="sidebar-group">Administration 🛠️</div>
        <div class="sidebar-links">
            <a href="?Pointer=Ogrenci&Page=KayitBilgilerim&">Registration Info</a>
            <a href="?Pointer=Ogrenci&Page=StajBilgilerim&">Internship</a>
            <a href="?Pointer=Ogrenci&Page=YerindeUygulama&">Work Placement (YUM)</a>
            <a href="?Pointer=Ogrenci&Page=FinansBilgilerim&">Finance</a>
            <a href="?Pointer=Ogrenci&Page=MuafiyetBasvuru&SubPage=SP">Exemption Exam</a>
        </div>

        <div class="sidebar-group">Tools & Services 🧰</div>
        <div class="sidebar-links">
            <a href="?Pointer=Ogrenci&Page=OnlineDerslerim&">My Online Courses</a>
            <a href="?Pointer=User&Page=MoodleUzepRedirect&" target="_blank">Moodle</a>
            <a href="?Pointer=Ogrenci&Page=Transkript&">Transcription</a>
            <a href="?Pointer=Library&">Library</a>
            <a href="?Pointer=KGS&">Smart Card System</a>
        </div>
    `;
    document.body.appendChild(sidebar);

    // Toggle sidebar
    toggleBtn.onclick = () => {
        sidebar.classList.toggle('show');
        if (!sidebar.classList.contains('show')) {
            document.getElementById('searchMenu').value = '';
            Array.from(sidebar.querySelectorAll('.sidebar-links')).forEach(el => el.style.display = 'none');
        }
    };
     //close button sidebar
    document.getElementById('closeSidebar').onclick = () => {
    sidebar.classList.remove('show');
    document.getElementById('searchMenu').value = '';
    Array.from(sidebar.querySelectorAll('.sidebar-links')).forEach(el => el.style.display = 'none');
};


    document.addEventListener('click', function (e) {
        if (!sidebar.contains(e.target) && e.target !== toggleBtn) {
            sidebar.classList.remove('show');
            document.getElementById('searchMenu').value = '';
            Array.from(sidebar.querySelectorAll('.sidebar-links')).forEach(el => el.style.display = 'none');
        }
    });

    document.getElementById('searchMenu').addEventListener('input', function () {
        const val = this.value.toLowerCase();
        const allLinks = sidebar.querySelectorAll('.sidebar-links a');
        allLinks.forEach(link => {
            const match = link.textContent.toLowerCase().includes(val);
            link.style.display = match ? 'block' : 'none';
        });
        sidebar.querySelectorAll('.sidebar-links').forEach(group => {
            const anyVisible = [...group.querySelectorAll('a')].some(a => a.style.display !== 'none');
            group.style.display = val ? (anyVisible ? 'block' : 'none') : 'none';
        });
    });

    sidebar.querySelectorAll('.sidebar-group').forEach((group, index) => {
        const links = sidebar.querySelectorAll('.sidebar-links')[index];
        group.addEventListener('click', () => {
            links.style.display = links.style.display === 'block' ? 'none' : 'block';
        });
    });

    const container = document.querySelector('#contentContainer');
    if (container) {
        const quickAccess = document.createElement('div');
        quickAccess.innerHTML = `
        <div class="section-box">
            <h2>Quick access</h2>
            <div class="quick-buttons">
                <a class="quick-button" href="?Pointer=Ogrenci&Page=DersNotlarim&"><i class="bi bi-journal-text"></i>Course Notes</a>
                <a class="quick-button" href="?Pointer=Ogrenci&Page=Odevler&"><i class="bi bi-pencil"></i>Homeworks</a>
                <a class="quick-button" href="?Pointer=Ogrenci&Page=DersProgramim&"><i class="bi bi-calendar3"></i>Course Program</a>
                <a class="quick-button" href="?Pointer=Ogrenci&Page=DevamsizlikCizelgem&"><i class="bi bi-person-x"></i>Attendance</a>
                <a class="quick-button" href="?Pointer=Ogrenci&Page=OnlineDerslerim&"><i class="bi bi-laptop"></i>My online courses</a>
                <a class="quick-button" href="?Pointer=Ogrenci&Page=Transkript&"><i class="bi bi-mortarboard"></i>Transcription</a>
            </div>
        </div>`;
        container.prepend(quickAccess);
    }

    const footer = document.querySelector('.nl2-header-cont');
    if (footer && !document.querySelector('.custom-credit')) {
        const credit = document.createElement('div');
        credit.className = 'custom-credit';
        credit.innerHTML = `
         #Free_Palestine  <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Flag_of_Palestine.png" alt="palestine flag"/>
              `;
        footer.appendChild(credit);
    }
})();

})();
