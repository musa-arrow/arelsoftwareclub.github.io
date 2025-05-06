// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', body.getAttribute('data-theme'));
    updateDarkModeIcon();
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

// Google Maps Entegrasyonu
function initMap() {
    const arelLocation = { lat: 41.05533, lng: 28.50024 }; // İstanbul Arel Üniversitesi Tepekent Kampüsü koordinatları
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: arelLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#e9e9e9"}]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: arelLocation,
        map: map,
        title: 'İstanbul Arel Üniversitesi Tepekent Kampüsü'
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info-window">
                <h3>İstanbul Arel Üniversitesi</h3>
                <p>Tepekent Kampüsü</p>
                <p>Tepekent Mah. Erguvan Sok. No:26</p>
                <p>Küçükçekmece/İstanbul</p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Harita stilleri
const lightMapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#7c93a3"},{"lightness": "-10"}]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#444444"}]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{"color": "#f2f2f2"}]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{"saturation": "-100"},{"lightness": "45"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#46bcec"},{"visibility": "on"}]
    }
];

const darkMapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#ffffff"}]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"},{"lightness": 20}]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"},{"lightness": 20}]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"},{"lightness": 21}]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"},{"lightness": 17}]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"},{"lightness": 18}]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"},{"lightness": 16}]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"},{"lightness": 19}]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"},{"lightness": 17}]
    }
];

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
        contact: document.getElementById('ideaContact').value
    };

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