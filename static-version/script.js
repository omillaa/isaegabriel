/* ========================================
   WEDDING WEBSITE - JAVASCRIPT
   ======================================== */

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initCountdown();
    initGifts();
    initMessages();
    initGallery();
    initTouchGallery();
    initLazyLoading();
    updateActiveNavOnScroll();
    
    // Initial check for animations
    handleScrollAnimations();
});

/* ========================================
   NAVIGATION
   ======================================== */
let isMenuOpen = false;

// Handle scroll for navigation background
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navigation');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Toggle mobile menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    
    if (isMenuOpen) {
        mobileMenu.classList.add('active');
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.classList.remove('active');
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
}

// Smooth scroll to section
function smoothScroll(event, sectionId) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
}

// Scroll to top
function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================
   COUNTDOWN
   ======================================== */
function initCountdown() {
    const weddingDate = new Date('2026-08-24T16:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ========================================
   GIFTS - LISTA DE PRESENTES
   ======================================== */
const gifts = [
    {
        id: 1,
        name: 'Jogo 6 Xícaras C/ Pires Ryo Maresia Oxford',
        description: 'Chá Cor Branco e Marrom - Jogo completo com 6 xícaras e pires',
        price: 189.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB46425373?pdp_filters=item_id:MLB5645877838&attributes=PIECES_NUMBER:12_vpp&matt_tool=38524122#origin=share&sid=share&wid=MLB5645877838&action=whatsapp'
    },
    {
        id: 2,
        name: 'Robô Aspirador De Pó Inteligente S40c Xiaomi',
        description: 'Aspirador robô com mapeamento inteligente, cor Branco',
        price: 1299.90,
        category: 'sala',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB54458534?pdp_filters=item_id:MLB6091294998&attributes=COLOR:Branco_vpp#origin=share&sid=share&wid=MLB6091294998&action=whatsapp'
    },
    {
        id: 3,
        name: 'Rack Móvebrinque Flip 180cm Para Sala',
        description: 'Rack para sala com 3 opções de cor',
        price: 899.90,
        category: 'sala',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://produto.mercadolivre.com.br/MLB-4150769247?attributes=CORES_vpp:T2ZmIFdoaXRl#origin=share&sid=share&action=whatsapp'
    },
    {
        id: 4,
        name: 'Duas Mesinhas Laterais Canto Sofa',
        description: 'Mesas redondas com tripé, acabamento brilhante',
        price: 459.90,
        category: 'sala',
        image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://produto.mercadolivre.com.br/MLB-4311429090?attributes=FINISH:QnJpbGhhbnRl,COLOR_SECONDARY_COLOR:T2ZmIHdoaXRlL0ZyZWlqw7M=#origin=share&sid=share&action=whatsapp'
    },
    {
        id: 5,
        name: 'Kit 02 Mesa De Cabeceira 40cm',
        description: 'Criado suspenso com gaveta, cor cinza',
        price: 389.90,
        category: 'quarto',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB64181581?pdp_filters=item_id:MLB6171145864#origin=share&sid=share&wid=MLB6171145864&action=whatsapp'
    },
    {
        id: 6,
        name: 'Circulador de Ar Britânia C50',
        description: 'Oscillation 200W Cor Prata 3 Pás - 127V',
        price: 199.90,
        category: 'sala',
        image: 'https://images.unsplash.com/photo-1622484211149-152f0c4dd5dc?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB15307381?pdp_filters=item_id:MLB4423613687&attributes=VOLTAGE:127V_vpp#origin=share&sid=share&wid=MLB4423613687&action=whatsapp'
    },
    {
        id: 7,
        name: 'Mixer Arno Turbomix Pro 3 Em 1',
        description: 'Processador multifuncional, cor Preto, 127V',
        price: 279.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB15138036?pdp_filters=item_id:MLB5257443218&attributes=COLOR:Preto_vpp,VOLTAGE:127V_vpp#origin=share&sid=share&wid=MLB5257443218&action=whatsapp'
    },
    {
        id: 8,
        name: 'Garrafa térmica Termolar Lúmina',
        description: 'Bomba de Pressão 1L, mantém temperatura por horas',
        price: 129.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB9989931?pdp_filters=item_id:MLB3945237597#origin=share&sid=share&wid=MLB3945237597&action=whatsapp'
    },
    {
        id: 9,
        name: 'Chaleira Elétrica Electrolux EEK10',
        description: '1200W de Potência, 1,8 Litros, Cor Inox',
        price: 159.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB23011904?pdp_filters=item_id:MLB4090410131#origin=share&sid=share&wid=MLB4090410131&action=whatsapp'
    },
    {
        id: 10,
        name: 'Ferro de Passar 2 em 1 Sem Fio Oster',
        description: 'Modelo GCSTCC5000, praticidade e eficiência',
        price: 349.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1612392117010-8937d619d1c6?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB24459571?pdp_filters=item_id:MLB5538126788#origin=share&sid=share&wid=MLB5538126788&action=whatsapp'
    },
    {
        id: 11,
        name: 'Jogo De 6 Pratos Rasos Oxford Ryo Maresia',
        description: '27,5cm, Cor Branco e Marrom',
        price: 159.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB23544122?pdp_filters=item_id:MLB3611193395&attributes=COLOR:Multicolor_vpp#origin=share&sid=share&wid=MLB3611193395&action=whatsapp'
    },
    {
        id: 12,
        name: 'Marinex Conjunto De Assadeiras Oval Opaline',
        description: 'Conjunto com 3 peças em vidro temperado, cor Branco',
        price: 199.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/up/MLBU3090898036?pdp_filters=item_id:MLB4013155977#origin=share&sid=share&wid=MLB4013155977&action=whatsapp'
    },
    {
        id: 13,
        name: 'Jogo Talheres Faqueiro Búzios Aço Inox 24 Peças',
        description: 'Faqueiro Tramontina com 24 peças em aço inox',
        price: 259.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1584348172185-9a525044fcd8?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB35092029?pdp_filters=item_id:MLB4081469927&attributes=PACKAGING_TYPE:Caixa_vpp#origin=share&sid=share&wid=MLB4081469927&action=whatsapp'
    },
    {
        id: 14,
        name: 'Sanduicheira Elétrica Cadence Click Grill',
        description: 'Chapa Misteira, Omeleteira, Crepeira, Tostex, Cor Preto, 127V',
        price: 179.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/p/MLB44174995?pdp_filters=item_id:MLB3605137523#origin=share&sid=share&wid=MLB3605137523&action=whatsapp'
    },
    {
        id: 15,
        name: 'Jogo Facas Inox Cabo Preto 6 Pçs C/ Suporte Plenus',
        description: 'Jogo de facas Tramontina com suporte, cor Preto',
        price: 219.90,
        category: 'cozinha',
        image: 'https://images.unsplash.com/photo-1593612493543-7b0ceb3013b8?w=400&q=80',
        purchased: false,
        mercadoLivreUrl: 'https://www.mercadolivre.com.br/up/MLBU3146435989?pdp_filters=item_id:MLB4046063305#origin=share&sid=share&wid=MLB4046063305&action=whatsapp'
    }
];

let currentCategory = 'all';

function initGifts() {
    console.log('=== INICIALIZANDO GIFTS ===');
    
    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    console.log('Botões de categoria encontrados:', categoryButtons.length);
    
    if (categoryButtons.length === 0) {
        console.error('ERRO: Nenhum botão .category-btn encontrado no HTML!');
        return;
    }
    
    // Remove any existing listeners and add new ones
    categoryButtons.forEach((btn, index) => {
        const category = btn.getAttribute('data-category');
        console.log(`Botão ${index}:`, btn.textContent.trim(), '| data-category:', category);
        
        // Clone e substitui o botão para remover todos os listeners antigos
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Adiciona novo listener
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const category = this.getAttribute('data-category');
            console.log('🔵 BOTÃO CLICADO:', category);
            filterGifts(category, this);
        });
    });
    
    // Render gifts initially
    renderGifts();
    console.log('=== FIM INICIALIZAÇÃO ===');
}

function renderGifts() {
    const grid = document.getElementById('giftGrid');
    if (!grid) {
        console.error('ERRO: Elemento giftGrid não encontrado!');
        return;
    }
    
    console.log('=== RENDERIZANDO GIFTS ===');
    console.log('Categoria atual:', currentCategory);
    console.log('Total de gifts:', gifts.length);
    
    // Filtrar gifts
    let filteredGifts;
    if (currentCategory === 'all') {
        filteredGifts = gifts;
        console.log('Mostrando todos os gifts');
    } else {
        filteredGifts = gifts.filter(gift => {
            const match = gift.category === currentCategory;
            console.log(`Gift: "${gift.name}" | Categoria do gift: "${gift.category}" | Categoria filtro: "${currentCategory}" | Match: ${match}`);
            return match;
        });
    }
    
    console.log('Gifts filtrados:', filteredGifts.length);
    
    if (filteredGifts.length === 0) {
        console.log('Nenhum gift encontrado para categoria:', currentCategory);
        grid.innerHTML = `
            <div class="no-gifts-message">
                <i data-lucide="package-open"></i>
                <p>Nenhum presente encontrado nesta categoria.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    // Render gifts
    grid.innerHTML = filteredGifts.map(gift => {
        console.log(`Renderizando gift: ${gift.name}`);
        return `
        <div class="gift-card ${gift.purchased ? 'purchased' : ''}" data-category="${gift.category}">
            <div class="gift-image">
                <img src="${gift.image}" alt="${gift.name}" loading="lazy">
                <span class="gift-badge ${gift.purchased ? 'purchased' : 'available'}">
                    ${gift.purchased ? 'Comprado' : 'Disponível'}
                </span>
            </div>
            <div class="gift-info">
                <span class="gift-category">${formatCategory(gift.category)}</span>
                <h3 class="gift-name">${gift.name}</h3>
                <p class="gift-description">${gift.description}</p>
                <p class="gift-price">R$ ${gift.price.toFixed(2).replace('.', ',')}</p>
                
                <div class="gift-buttons">
                    <button 
                        class="btn btn-gold btn-full"
                        onclick="confirmGift(${gift.id})"
                        ${gift.purchased ? 'disabled' : ''}
                    >
                        <i data-lucide="check-circle"></i>
                        Quero Presentear
                    </button>
                    
                    ${gift.mercadoLivreUrl ? `
                        <a 
                            href="${gift.mercadoLivreUrl}" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="btn btn-outline-gold btn-full mercado-link"
                            ${gift.purchased ? 'style="opacity: 0.5; pointer-events: none;"' : ''}
                        >
                            <i data-lucide="shopping-cart"></i>
                            Comprar no Mercado Livre
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `}).join('');
    
    // Recreate Lucide icons
    lucide.createIcons();
    console.log('=== FIM RENDERIZAÇÃO ===');
}

function formatCategory(category) {
    const categories = {
        'cozinha': 'Cozinha',
        'quarto': 'Quarto',
        'sala': 'Sala',
        'banheiro': 'Banheiro',
        'experiencias': 'Experiências'
    };
    return categories[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function filterGifts(category, clickedElement) {
    console.log('=== FILTRANDO GIFTS ===');
    console.log('Nova categoria:', category);
    console.log('Categoria anterior:', currentCategory);
    
    // Update current category
    currentCategory = category;
    
    // Update active button
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    if (clickedElement) {
        if (clickedElement.classList) {
            clickedElement.classList.add('active');
        } else if (clickedElement.target) {
            // If it's an event object
            const btn = clickedElement.target.closest('.category-btn');
            if (btn) btn.classList.add('active');
        }
    }
    
    // Re-render gifts
    renderGifts();
    console.log('=== FIM FILTRO ===');
}

function confirmGift(giftId) {
    const gift = gifts.find(g => g.id === giftId);
    if (gift && !gift.purchased) {
        // WhatsApp number format: +55 35 98713-0720
        const phoneNumber = '5535987130720';
        const message = encodeURIComponent(
            `💝 Olá! Quero presentear vocês com:\n\n` +
            `*${gift.name}*\n` +
            `💰 Valor: R$ ${gift.price.toFixed(2).replace('.', ',')}\n\n` +
            `Link do presente: ${gift.mercadoLivreUrl || 'Disponível na lista'}\n\n` +
            `Confirmo meu interesse em presentear! 🎁`
        );
        
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        
        showToast(`Você selecionou "${gift.name}" para presentear! 💝`, 'success');
    }
}

function buyGift(giftId) {
    confirmGift(giftId);
}

function copyPix() {
    const pixKeyElement = document.getElementById('pixKey');
    if (!pixKeyElement) return;
    
    const pixKey = pixKeyElement.textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
        showToast('Chave PIX copiada!', 'success');
    }).catch(() => {
        showToast('Erro ao copiar', 'error');
    });
}

/* ========================================
   MESSAGES
   ======================================== */
const messages = [
    {
        id: 1,
        name: 'Maria Silva',
        relation: 'Madrinha',
        message: 'Que essa união seja repleta de amor, cumplicidade e muitas risadas! Vocês merecem toda a felicidade do mundo. Amo vocês!'
    },
    {
        id: 2,
        name: 'João Santos',
        relation: 'Primo do noivo',
        message: 'Desde crianças eu sabia que o Pedro encontraria alguém especial. Ana, bem-vinda à família! Que sejam muito felizes!'
    },
    {
        id: 3,
        name: 'Carla Oliveira',
        relation: 'Amiga da noiva',
        message: 'Ana, você merece todo o amor do mundo! Pedro, cuide bem da minha amiga. Desejo uma vida linda para vocês dois!'
    }
];

function initMessages() {
    renderMessages();
}

function renderMessages() {
    const grid = document.getElementById('messagesGrid');
    if (!grid) return;
    
    grid.innerHTML = messages.map(msg => `
        <div class="message-card">
            <div class="message-header">
                <div class="message-avatar">${getInitials(msg.name)}</div>
                <div class="message-author">
                    <h4>${msg.name}</h4>
                    <span>${msg.relation}</span>
                </div>
            </div>
            <p class="message-text">${msg.message}</p>
        </div>
    `).join('');
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function submitMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('msgName')?.value;
    const relation = document.getElementById('msgRelation')?.value || 'Convidado';
    const message = document.getElementById('msgText')?.value;
    
    if (!name || !message) {
        showToast('Por favor, preencha seu nome e mensagem', 'error');
        return;
    }
    
    const newMessage = {
        id: messages.length + 1,
        name,
        relation,
        message
    };
    
    messages.unshift(newMessage);
    renderMessages();
    
    // Reset form
    event.target.reset();
    
    showToast('Mensagem enviada com sucesso!', 'success');
}

/* ========================================
   RSVP
   ======================================== */
function submitRSVP(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        guests: formData.get('guests'),
        dietary: formData.get('dietary'),
        attending: formData.get('attending')
    };
    
    console.log('RSVP Data:', data);
    
    if (data.attending === 'yes') {
        showToast('Confirmação recebida! Aguardamos você!', 'success');
    } else {
        showToast('Que pena que não poderá comparecer. Obrigado por avisar!', 'success');
    }
    
    // Reset form
    event.target.reset();
}

/* ========================================
   UTILITIES
   ======================================== */
function openMaps(address) {
    if (!address) return;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
}

function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.timeline-item, .event-card, .gift-card, .message-card');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Add initial styles for animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.timeline-item, .event-card, .gift-card, .message-card');
    elements.forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
    
    // Initial check
    handleScrollAnimations();
});

window.addEventListener('scroll', handleScrollAnimations);

/* ========================================
   IMAGE GALLERY
   ======================================== */
const galleryImages = [
    {
        url: './foto1.jpeg',
        alt: 'Noivos no parque'
    },
    {
        url: './foto2.jpeg',
        alt: 'Casal viajando'
    },
    {
        url: './foto3.jpeg',
        alt: 'Momento especial'
    },
    {
        url: './foto4.jpeg',
        alt: 'Celebração do amor'
    },
    {
        url: './foto5.jpeg',
        alt: 'Risadas e alegria'
    },
    {
        url: './foto6.jpeg',
        alt: 'Mais um momento especial'
    }
];

let currentSlide = 0;
let slideInterval;

function initGallery() {
    const slider = document.getElementById('gallerySlider');
    const dotsContainer = document.getElementById('galleryDots');
    
    if (!slider || !dotsContainer) return;
    
    // Clear existing content
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Create slides
    galleryImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `gallery-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image.url}" alt="${image.alt}" loading="lazy">`;
        slider.appendChild(slide);
        
        // Create dots
        const dot = document.createElement('div');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('onclick', `goToSlide(${index})`);
        dotsContainer.appendChild(dot);
    });
    
    // Start auto slide
    startAutoSlide();
}

function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (!slides.length || !dots.length) return;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
    resetAutoSlide();
}

function nextSlide() {
    if (!galleryImages.length) return;
    currentSlide = (currentSlide + 1) % galleryImages.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    if (!galleryImages.length) return;
    currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
    goToSlide(currentSlide);
}

// Pause auto slide on hover
document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.getElementById('gallerySlider');
    if (gallerySlider) {
        gallerySlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        gallerySlider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});

/* ========================================
   TOUCH SUPPORT FOR GALLERY
   ======================================== */
function initTouchGallery() {
    const slider = document.getElementById('gallerySlider');
    if (!slider) return;
    
    let startX = 0;
    let endX = 0;
    const threshold = 50;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

/* ========================================
   ACTIVE NAVIGATION ON SCROLL
   ======================================== */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   FORM VALIDATION ENHANCEMENTS
   ======================================== */
function validatePhoneNumber(phone) {
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhance RSVP form validation
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            const phone = document.getElementById('phone')?.value;
            const email = document.getElementById('email')?.value;
            
            if (phone && !validatePhoneNumber(phone)) {
                e.preventDefault();
                showToast('Por favor, insira um número de telefone válido.', 'error');
                return;
            }
            
            if (email && !validateEmail(email)) {
                e.preventDefault();
                showToast('Por favor, insira um e-mail válido.', 'error');
                return;
            }
        });
    }
});

/* ========================================
   LAZY LOADING FOR IMAGES
   ======================================== */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}