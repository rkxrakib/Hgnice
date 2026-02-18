document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search__input');
    const searchBtn = document.querySelector('.btn--search');
    const domainList = document.getElementById('domain-list');
    const officialLinkAnchor = document.getElementById('official-link');
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal__close');

    // ১. অফিসিয়াল লিঙ্ক সেট করা
    officialLinkAnchor.href = CONFIG.officialLink;
    officialLinkAnchor.textContent = CONFIG.officialLink.replace('https://', '');

    // ২. ডোমেইন লিস্ট রেন্ডার করা
    CONFIG.officialDomains.forEach(domain => {
        const div = document.createElement('div');
        div.className = 'domain-item';
        div.innerHTML = `<span>${domain}</span> <span style="color:green">✔ Verified</span>`;
        domainList.appendChild(div);
    });

    // ৩. ডোমেইন ভেরিফিকেশন সার্চ
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return alert("Please enter a domain");

        const isVerified = CONFIG.officialDomains.some(d => query.includes(d));
        
        showModal(
            isVerified ? "Verified Official Domain" : "Unverified Domain",
            query,
            isVerified ? "This domain is safe and managed by AmarClub." : "Warning: This domain is not recognized by us."
        );
    });

    // ৪. মোডাল ফাংশন
    function showModal(title, url, desc) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-url').textContent = url;
        document.getElementById('modal-desc').textContent = desc;
        modal.classList.remove('hidden');
    }

    modalClose.addEventListener('click', () => modal.classList.add('hidden'));

    // ৫. ফ্লোটিং বাটন অ্যাকশন
    document.querySelector('.float--telegram').onclick = () => window.open(CONFIG.telegramLink, '_blank');
    document.querySelector('.float--service').onclick = () => window.open(CONFIG.serviceLink, '_blank');

    // ৬. PWA Install Logic
    let deferredPrompt;
    const installBtn = document.getElementById('install-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.classList.remove('hidden');
    });

    installBtn.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => {
                deferredPrompt = null;
                installBtn.classList.add('hidden');
            });
        }
    });
});
