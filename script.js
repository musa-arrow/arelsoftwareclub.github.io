// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', body.getAttribute('data-theme'));
    updateDarkModeIcon();
    saveUserData(); // Tüm site verilerini kaydet
});

// Mobil Menü
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
});

// Sayfa yüklendiğinde tema kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateDarkModeIcon();
    }

    // Ana Sayfa Butonları
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    if (heroButtons.length >= 2) {
        // Hemen Katıl butonu
        heroButtons[0].addEventListener('click', () => {
            const registerModal = document.getElementById('registerModal');
            if (registerModal) {
                openModal(registerModal);
            }
        });

        // Daha Fazla Bilgi butonu
        heroButtons[1].addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Mobil menü linklerine tıklandığında menüyü kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            authButtons.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Sayfa dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            authButtons.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Smooth Scroll için tüm navigasyon linkleri
    document.querySelectorAll('.nav-links a, .footer-section a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Mobil menüyü kapat
                    navLinks.classList.remove('active');
                    authButtons.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Etkinlik Filtreleme
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            filterEvents(filter);
        });
    });

    // Bülten Aboneliği
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                saveUserData(); // Tüm site verilerini kaydet
                showNotification('Bülten aboneliğiniz başarıyla gerçekleşti!', 'success');
                newsletterForm.reset();
            } else {
                showNotification('Lütfen geçerli bir e-posta adresi giriniz.', 'error');
            }
        });
    }

    // Şifremi Unuttum
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = prompt('E-posta adresinizi giriniz:');
            if (email && validateEmail(email)) {
                showNotification('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.', 'success');
            } else {
                showNotification('Lütfen geçerli bir e-posta adresi giriniz.', 'error');
            }
        });
    }

    // Üyelik Sözleşmesi
    const termsLink = document.querySelector('.terms-link');
    if (termsLink) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            showTermsModal();
        });
    }

    // Tüm butonlara hover efekti ekle
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Etkinlik Filtreleme
const filterButtons = document.querySelectorAll('.filter-btn');
const eventsGrid = document.querySelector('.events-grid');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Aktif buton stilini güncelle
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        // Burada etkinlikleri filtreleme işlemi yapılacak
    });
});

// Form Gönderimi
const membershipForm = document.getElementById('membership-form');
if (membershipForm) {
    membershipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Form verilerini al
        const formData = new FormData(membershipForm);
        // Burada form verilerini işleme veya API'ye gönderme işlemi yapılacak
        alert('Başvurunuz alınmıştır. En kısa sürede size dönüş yapacağız.');
        membershipForm.reset();
    });
}

// Hero Slider
let currentSlide = 0;
const slides = [
    {
        title: 'Yazılım Kulübüne Hoş Geldiniz',
        description: 'Teknoloji, inovasyon ve yazılım dünyasına adım atın',
        image: 'images/slide1.jpg'
    },
    {
        title: 'Etkinliklerimiz',
        description: 'Workshoplar, seminerler ve hackathonlar',
        image: 'images/slide2.jpg'
    },
    {
        title: 'Projelerimiz',
        description: 'Yenilikçi çözümler ve açık kaynak projeler',
        image: 'images/slide3.jpg'
    }
];

function updateSlider() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.innerHTML = `
            <h1>${slides[currentSlide].title}</h1>
            <p>${slides[currentSlide].description}</p>
            <div class="hero-buttons">
                <button class="primary-btn">Hemen Katıl</button>
                <button class="secondary-btn">Daha Fazla Bilgi</button>
            </div>
        `;
    }
    currentSlide = (currentSlide + 1) % slides.length;
}

// Slider'ı başlat
setInterval(updateSlider, 5000);

// Duyurular
const announcements = [
    {
        title: 'Yeni Workshop',
        date: '15 Mart 2024',
        description: 'Python ile Veri Analizi Workshop\'u'
    },
    {
        title: 'Hackathon',
        date: '20 Mart 2024',
        description: '24 Saatlik Yazılım Maratonu'
    },
    {
        title: 'Seminer',
        date: '25 Mart 2024',
        description: 'Yapay Zeka ve Gelecek'
    }
];

function loadAnnouncements() {
    const announcementGrid = document.querySelector('.announcement-grid');
    if (announcementGrid) {
        announcementGrid.innerHTML = announcements.map(announcement => `
            <div class="announcement-card">
                <h3>${announcement.title}</h3>
                <p class="date">${announcement.date}</p>
                <p>${announcement.description}</p>
            </div>
        `).join('');
    }
}

// Duyuruları yükle
loadAnnouncements();

// Login Modal İşlevselliği
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const heroJoinBtn = document.getElementById('heroJoinBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const ideaModal = document.getElementById('ideaModal');
const ideaButton = document.getElementById('ideaButton');

// Form Seçicileri
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const ideaForm = document.getElementById('ideaForm');

// Modal Açma/Kapama Fonksiyonları
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Buton Event Listener'ları
loginBtn.addEventListener('click', () => openModal(loginModal));
registerBtn.addEventListener('click', () => openModal(registerModal));
heroJoinBtn.addEventListener('click', () => openModal(registerModal));
ideaButton.addEventListener('click', () => openModal(ideaModal));

// Modal Kapatma Event Listener'ları
document.querySelectorAll('.modal').forEach(modal => {
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(modal));
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// ESC tuşu ile modal kapatma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal);
        });
    }
});

// Form Geçiş Linkleri
document.querySelector('.register-link').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(registerModal);
});

document.querySelector('.login-link').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(registerModal);
    openModal(loginModal);
});

// Giriş Formu İşlemi
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const remember = document.querySelector('input[name="remember"]').checked;

    // Burada gerçek bir API çağrısı yapılacak
    console.log('Giriş bilgileri:', { email, password, remember });

    // Başarılı giriş simülasyonu
    showNotification('Giriş başarılı!', 'success');
    closeModal(loginModal);
    loginForm.reset();

    // Giriş yapıldıktan sonra butonları güncelle
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = `
        <span class="user-welcome">Hoş geldiniz, ${email.split('@')[0]}</span>
        <button class="logout-btn">Çıkış Yap</button>
    `;

    // Çıkış yapma işlevi
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
        authButtons.innerHTML = `
            <button id="loginBtn" class="login-btn">Giriş Yap</button>
            <button id="registerBtn" class="join-btn">Üye Ol</button>
        `;
        // Yeni eklenen butonlara event listener'ları tekrar ekle
        document.getElementById('loginBtn').addEventListener('click', () => openModal(loginModal));
        document.getElementById('registerBtn').addEventListener('click', () => openModal(registerModal));
    });
});

// Takım üyelerini yönetmek için fonksiyonlar
function addTeamMember(memberData) {
    const teamGrid = document.querySelector('#team .team-grid');
    const memberElement = document.createElement('div');
    memberElement.className = 'team-member';
    
    // İsimden baş harfleri al
    const initials = memberData.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    
    // Rastgele renk oluştur
    const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Fotoğraf URL'sini oluştur
    let photoContent = '';
    if (memberData.photo) {
        photoContent = `<img src="${URL.createObjectURL(memberData.photo)}" alt="${memberData.name}">`;
    } else {
        photoContent = `
            <div class="initials-avatar" style="background-color: ${randomColor}">
                ${initials}
            </div>
        `;
    }
    
    memberElement.innerHTML = `
        ${photoContent}
        <h4>${memberData.name}</h4>
        <p>${memberData.department}</p>
        <p class="member-role">Üye</p>
    `;
    
    teamGrid.appendChild(memberElement);

    // Takım üyelerini localStorage'a kaydet
    saveTeamMembers();
}

// Takım üyelerini localStorage'a kaydet
function saveTeamMembers() {
    const teamMembers = [];
    document.querySelectorAll('.team-member').forEach(member => {
        teamMembers.push({
            name: member.querySelector('h4').textContent,
            department: member.querySelector('p:not(.member-role)').textContent,
            role: member.querySelector('.member-role').textContent,
            photo: member.querySelector('img') ? member.querySelector('img').src : null
        });
    });
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
}

// Takım üyelerini localStorage'dan yükle
function loadTeamMembers() {
    const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
    const teamGrid = document.querySelector('#team .team-grid');
    
    if (teamGrid) {
        teamGrid.innerHTML = ''; // Mevcut üyeleri temizle
        
        teamMembers.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            
            // İsimden baş harfleri al
            const initials = member.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase();
            
            // Rastgele renk oluştur
            const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Fotoğraf veya baş harfler
            const photoContent = member.photo 
                ? `<img src="${member.photo}" alt="${member.name}">`
                : `<div class="initials-avatar" style="background-color: ${randomColor}">${initials}</div>`;
            
            memberElement.innerHTML = `
                ${photoContent}
                <h4>${member.name}</h4>
                <p>${member.department}</p>
                <p class="member-role">${member.role}</p>
            `;
            
            teamGrid.appendChild(memberElement);
        });
    }
}

// Üyelik formunu dinle
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const memberData = {
        name: document.getElementById('regName').value,
        department: document.getElementById('regDepartment').value,
        email: document.getElementById('regEmail').value,
        studentNo: document.getElementById('regStudentNo').value,
        photo: document.getElementById('regPhoto').files[0]
    };
    
    // Takıma ekle
    addTeamMember(memberData);
    
    // Formu sıfırla
    this.reset();
    
    // Modal'ı kapat
    const registerModal = document.getElementById('registerModal');
    registerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Başarılı mesajı göster
    showNotification('Üyeliğiniz başarıyla oluşturuldu!', 'success');
});

// Fikir Formu İşlemi
ideaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm(ideaForm)) {
        return;
    }

    const formData = {
        title: document.getElementById('ideaTitle').value,
        category: document.getElementById('ideaCategory').value,
        description: document.getElementById('ideaDescription').value,
        benefits: document.getElementById('ideaBenefits').value,
        resources: document.getElementById('ideaResources').value,
        contact: document.getElementById('ideaContact').value,
        date: new Date().toLocaleDateString('tr-TR')
    };

    // Fikir önerilerini kaydet
    const submissions = JSON.parse(localStorage.getItem('ideaSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('ideaSubmissions', JSON.stringify(submissions));
    saveUserData(); // Tüm site verilerini kaydet

    // E-posta gönderme fonksiyonu
    const mailtoLink = `mailto:yazilimkulubu@istanbularel.edu.tr?subject=Fikir Önerisi: ${encodeURIComponent(formData.title)}&body=
Kategori: ${encodeURIComponent(formData.category)}
%0D%0A%0D%0A
Fikir Açıklaması:%0D%0A
${encodeURIComponent(formData.description)}
%0D%0A%0D%0A
Faydaları:%0D%0A
${encodeURIComponent(formData.benefits)}
%0D%0A%0D%0A
Gerekli Kaynaklar:%0D%0A
${encodeURIComponent(formData.resources)}
%0D%0A%0D%0A
İletişim: ${encodeURIComponent(formData.contact)}`;

    window.location.href = mailtoLink;
    
    // Formu temizle ve modalı kapat
    ideaForm.reset();
    closeModal(ideaModal);
    showNotification('Fikriniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
});

// Validasyon Fonksiyonları
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Bu alan zorunludur';
            input.parentNode.appendChild(errorMsg);
        } else {
            input.classList.remove('error');
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        }
    });

    return isValid;
}

function validateUsername(username) {
    const minLength = 3;
    const maxLength = 20;
    const validChars = /^[a-zA-Z0-9_]+$/;
    return username.length >= minLength && 
           username.length <= maxLength && 
           validChars.test(username);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateStudentNo(studentNo) {
    return /^\d{8,10}$/.test(studentNo);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
}

// Bildirim Fonksiyonu
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Etkinlik Filtreleme Fonksiyonu
function filterEvents(filter) {
    const events = document.querySelectorAll('.events-grid > div');
    events.forEach(event => {
        if (filter === 'all' || event.getAttribute('data-category') === filter) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
}

// Üyelik Sözleşmesi Modalı
function showTermsModal() {
    const termsModal = document.createElement('div');
    termsModal.className = 'modal';
    termsModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Üyelik Sözleşmesi</h2>
            <div class="terms-content">
                <h3>1. Üyelik Koşulları</h3>
                <p>Yazılım Kulübü üyeliği, İstanbul Arel Üniversitesi öğrencilerine açıktır.</p>
                
                <h3>2. Üye Hakları</h3>
                <p>Üyeler, kulüp etkinliklerine katılma, projelere dahil olma ve eğitim içeriklerine erişim hakkına sahiptir.</p>
                
                <h3>3. Üye Sorumlulukları</h3>
                <p>Üyeler, kulüp kurallarına uymak ve etkinliklere aktif katılım göstermekle yükümlüdür.</p>
                
                <h3>4. Gizlilik</h3>
                <p>Üye bilgileri gizli tutulacak ve üçüncü taraflarla paylaşılmayacaktır.</p>
            </div>
            <button class="terms-close-btn">Kapat</button>
        </div>
    `;

    document.body.appendChild(termsModal);
    setTimeout(() => termsModal.classList.add('active'), 100);

    const closeBtn = termsModal.querySelector('.close-modal');
    const closeButton = termsModal.querySelector('.terms-close-btn');

    function closeTermsModal() {
        termsModal.classList.remove('active');
        setTimeout(() => termsModal.remove(), 300);
    }

    closeBtn.addEventListener('click', closeTermsModal);
    closeButton.addEventListener('click', closeTermsModal);
    termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) closeTermsModal();
    });
}

// Dark Mode İkon Güncelleme
function updateDarkModeIcon() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (document.body.getAttribute('data-theme') === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Profil Bölümü İşlevselliği
const profileTabs = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const avatarInput = document.getElementById('avatarInput');
const profileImage = document.getElementById('profileImage');
const profileSettingsForm = document.getElementById('profileSettingsForm');

// Tab değiştirme
profileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Aktif tab'ı güncelle
        profileTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // İlgili içeriği göster
        const tabId = tab.getAttribute('data-tab');
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === tabId) {
                pane.classList.add('active');
            }
        });
    });
});

// Profil fotoğrafı yükleme
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
            // Burada fotoğrafı sunucuya yükleme işlemi yapılabilir
        };
        reader.readAsDataURL(file);
    }
});

// Profil ayarları formu
profileSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('settingsName').value,
        email: document.getElementById('settingsEmail').value,
        department: document.getElementById('settingsDepartment').value,
        bio: document.getElementById('settingsBio').value,
        skills: document.getElementById('settingsSkills').value
    };

    // Burada form verilerini sunucuya gönderme işlemi yapılabilir
    console.log('Profil güncelleme:', formData);
    showNotification('Profil başarıyla güncellendi!', 'success');
});

// Örnek aktivite verileri
const activities = [
    {
        type: 'workshop',
        title: 'Python ile Veri Analizi',
        date: '15 Mart 2024',
        status: 'completed'
    },
    {
        type: 'project',
        title: 'Web Sitesi Geliştirme',
        date: '10 Mart 2024',
        status: 'in-progress'
    }
];

// Aktiviteleri yükle
function loadActivities() {
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-${activity.type === 'workshop' ? 'chalkboard-teacher' : 'code'}"></i>
                </div>
                <div class="activity-info">
                    <h4>${activity.title}</h4>
                    <p>${activity.date}</p>
                    <span class="status ${activity.status}">${activity.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}</span>
                </div>
            </div>
        `).join('');
    }
}

// Sayfa yüklendiğinde aktiviteleri yükle
document.addEventListener('DOMContentLoaded', () => {
    loadActivities();
    loadTeamMembers();
    setActiveNavItem();
    loadProjects(); // Projeleri yükle
    
    // Profil fotoğrafı yükleme
    const avatarInput = document.getElementById('avatarInput');
    const profileImage = document.getElementById('profileImage');
    
    if (avatarInput && profileImage) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Profil ayarları formu
    const settingsForm = document.getElementById('profileSettingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Form verilerini işle
            const formData = new FormData(settingsForm);
            const settings = Object.fromEntries(formData.entries());
            
            // Profil bilgilerini güncelle
            document.getElementById('profileName').textContent = settings.name;
            document.getElementById('profileDepartment').textContent = settings.department;
            document.getElementById('profileEmail').textContent = settings.email;
            
            // Başarı mesajı göster
            alert('Profil ayarlarınız başarıyla güncellendi!');
        });
    }
});

// Aktif menü öğesini işaretle
function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Projeler
let projects = [];

// Proje ekleme fonksiyonu
function addProject(projectData) {
    projects.push(projectData);
    saveUserData();
    displayProjects();
}

// Projeleri görüntüleme fonksiyonu
function displayProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-meta">
                <span class="project-language">${project.language}</span>
                <span class="project-date">${project.date}</span>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Proje formu gönderimi
const projectForm = document.getElementById('projectForm');
if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(projectForm);
        const projectData = {
            title: formData.get('title'),
            description: formData.get('description'),
            language: formData.get('language'),
            date: new Date().toLocaleDateString('tr-TR')
        };
        addProject(projectData);
        projectForm.reset();
        showNotification('Proje başarıyla eklendi!', 'success');
    });
}

// Tüm site verilerini kaydet
function saveUserData() {
    const siteData = {
        profile: {
            name: document.getElementById('profileName')?.textContent || '',
            department: document.getElementById('profileDepartment')?.textContent || '',
            email: document.getElementById('profileEmail')?.textContent || '',
            photo: document.getElementById('profileImage')?.src || ''
        },
        activities: activities,
        projects: projects,
        teamMembers: JSON.parse(localStorage.getItem('teamMembers')) || [],
        announcements: announcements,
        events: Array.from(document.querySelectorAll('.events-grid > div')).map(event => ({
            title: event.querySelector('h3')?.textContent || '',
            date: event.querySelector('.date')?.textContent || '',
            description: event.querySelector('p')?.textContent || '',
            category: event.getAttribute('data-category') || 'all'
        })),
        theme: document.body.getAttribute('data-theme') || 'light',
        newsletterSubscribers: JSON.parse(localStorage.getItem('newsletterSubscribers')) || [],
        ideaSubmissions: JSON.parse(localStorage.getItem('ideaSubmissions')) || []
    };
    localStorage.setItem('siteData', JSON.stringify(siteData));
}

// Tüm site verilerini yükle
function loadUserData() {
    const siteData = JSON.parse(localStorage.getItem('siteData')) || {
        profile: {
            name: 'Kullanıcı Adı',
            department: 'Bölüm',
            email: 'E-posta',
            photo: 'images/default-avatar.png'
        },
        activities: [],
        projects: [],
        teamMembers: [],
        announcements: [],
        events: [],
        theme: 'light',
        newsletterSubscribers: [],
        ideaSubmissions: []
    };

    // Profil bilgilerini güncelle
    if (document.getElementById('profileName')) {
        document.getElementById('profileName').textContent = siteData.profile.name;
    }
    if (document.getElementById('profileDepartment')) {
        document.getElementById('profileDepartment').textContent = siteData.profile.department;
    }
    if (document.getElementById('profileEmail')) {
        document.getElementById('profileEmail').textContent = siteData.profile.email;
    }
    if (document.getElementById('profileImage')) {
        document.getElementById('profileImage').src = siteData.profile.photo;
    }

    // Aktiviteleri güncelle
    activities = siteData.activities;
    loadActivities();

    // Projeleri güncelle
    projects = siteData.projects;
    loadProjects();

    // Takım üyelerini güncelle
    localStorage.setItem('teamMembers', JSON.stringify(siteData.teamMembers));
    loadTeamMembers();

    // Duyuruları güncelle
    announcements = siteData.announcements;
    loadAnnouncements();

    // Etkinlikleri güncelle
    const eventsGrid = document.querySelector('.events-grid');
    if (eventsGrid) {
        eventsGrid.innerHTML = siteData.events.map(event => `
            <div class="event-card" data-category="${event.category}">
                <h3>${event.title}</h3>
                <p class="date">${event.date}</p>
                <p>${event.description}</p>
            </div>
        `).join('');
    }

    // Temayı güncelle
    document.body.setAttribute('data-theme', siteData.theme);
    updateDarkModeIcon();

    // Bülten abonelerini güncelle
    localStorage.setItem('newsletterSubscribers', JSON.stringify(siteData.newsletterSubscribers));

    // Fikir önerilerini güncelle
    localStorage.setItem('ideaSubmissions', JSON.stringify(siteData.ideaSubmissions));
}

// Profil ayarları formu
const settingsForm = document.getElementById('profileSettingsForm');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Form verilerini işle
        const formData = new FormData(settingsForm);
        const settings = Object.fromEntries(formData.entries());
        
        // Profil bilgilerini güncelle
        document.getElementById('profileName').textContent = settings.name;
        document.getElementById('profileDepartment').textContent = settings.department;
        document.getElementById('profileEmail').textContent = settings.email;
        
        // Verileri kaydet
        saveUserData();
        
        // Başarı mesajı göster
        showNotification('Profil ayarlarınız başarıyla güncellendi!', 'success');
    });
}

// Profil fotoğrafı yükleme
const avatarInput = document.getElementById('avatarInput');
const profileImage = document.getElementById('profileImage');

if (avatarInput && profileImage) {
    avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
                // Fotoğraf değiştiğinde verileri kaydet
                saveUserData();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Üyelik formunu dinle
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const memberData = {
        name: document.getElementById('regName').value,
        department: document.getElementById('regDepartment').value,
        email: document.getElementById('regEmail').value,
        studentNo: document.getElementById('regStudentNo').value,
        photo: document.getElementById('regPhoto').files[0]
    };
    
    // Takıma ekle
    addTeamMember(memberData);
    
    // Yeni aktivite ekle
    const newActivity = {
        type: 'join',
        title: 'Kulübe Katılım',
        date: new Date().toLocaleDateString('tr-TR'),
        status: 'completed'
    };
    activities.push(newActivity);
    
    // Verileri kaydet
    saveUserData();
    
    // Formu sıfırla
    this.reset();
    
    // Modal'ı kapat
    const registerModal = document.getElementById('registerModal');
    registerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Başarılı mesajı göster
    showNotification('Üyeliğiniz başarıyla oluşturuldu!', 'success');
});

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadUserData(); // Tüm kullanıcı verilerini yükle
    setActiveNavItem();
}); 