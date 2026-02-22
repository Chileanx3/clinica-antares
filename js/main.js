document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables globales
    const body = document.body;
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    const closeSidebar = document.getElementById('close-sidebar');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const featureBoxes = document.querySelectorAll('.feature-box');
    const specialtyItems = document.querySelectorAll('.specialty-item');
    const specialtyPopup = document.getElementById('specialty-popup');
    const teamMembers = document.querySelectorAll('.team-member');
    const professionalPopup = document.getElementById('professional-popup');
    const contactForm = document.getElementById('contactForm');
    const teamFilters = document.querySelectorAll('.team-filter');
    const teamGrid = document.querySelector('.team-grid');
    
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll to top button visibility
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // Activar links de navegación según la sección visible
        updateActiveNavOnScroll();
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM cargado, inicializando menú móvil');
        
        // Obtener referencias a los elementos del DOM
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-sidebar');
        const nav = document.getElementById('nav');
        const body = document.body;
        
        // Verificar que los elementos existen
        console.log('Botón de menú:', menuBtn);
        console.log('Botón de cierre:', closeBtn);
        console.log('Navegación:', nav);
        
        // Función de apertura de menú
        function openMenu(e) {
            console.log('Abriendo menú');
            if (e) e.preventDefault();
            nav.classList.add('active');
            body.classList.add('menu-open');
        }
        
        // Función de cierre de menú
        function closeMenu(e) {
            console.log('Cerrando menú');
            if (e) e.preventDefault();
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
        
        // Evento para abrir el menú
        if (menuBtn) {
            menuBtn.addEventListener('click', openMenu);
            console.log('Evento de clic asignado al botón de menú');
        }
        
        // Evento para cerrar el menú
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
            console.log('Evento de clic asignado al botón de cierre');
        }
        
        // Cerrar el menú al hacer clic en enlaces
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open') && 
                !nav.contains(e.target) && 
                e.target !== menuBtn) {
                closeMenu();
            }
        });
        
        // Evitar cierre al hacer clic dentro del menú
        nav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Smooth Scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar el menú móvil si está abierto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Scroll suave a la sección
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar el estado activo en la navegación
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Actualizar navegación activa al hacer scroll
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 200;
        
        // Obtener todas las secciones
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover active de todos los links
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                
                // Añadir active al link correspondiente
                document.querySelector('nav a[href="#' + sectionId + '"]')?.classList.add('active');
            }
        });
    }

    // Scroll to top button
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hero Carousel
    let currentSlide = 0;
    const slideCount = heroSlides.length;
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Feature boxes animation
    function animateFeatureBoxes() {
        featureBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('animate');
            }, 200 * index);
        });
    }
    
    // Initialize animations
    window.addEventListener('load', function() {
        // Remove preloader after page loads
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
        
        // Start feature box animations
        animateFeatureBoxes();
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remover clases activas
        heroSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Añadir clase activa al slide e indicador correspondiente
        heroSlides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    // Eventos para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval); // Detener intervalo automático
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 5000); // Reiniciar intervalo
        });
    });

    // Specialty Pop-up
    const specialtiesData = {
        'ortodoncia': {
            img: './images/ortodoncia-01.png',
            title: 'Ortodoncia',
            description: 'Corrección de la posición de los dientes y los huesos para una sonrisa más estética. Utilizamos técnicas avanzadas como brackets tradicionales, estéticos e Invisalign para garantizar resultados óptimos.'
        },
        'estetica-facial': {
            img: './images/estetica-facial.png',
            title: 'Estética Facial',
            description: 'Tratamientos para armonizar el rostro y la sonrisa, incluyendo procedimientos como botox, ácido hialurónico y armonización orofacial para realzar tu belleza natural.'
        },
        'implantologia': {
            img: './images/implantologia-01.png',
            title: 'Implantología',
            description: 'Implantes dentales de titanio para reponer piezas perdidas. Ofrecemos soluciones personalizadas con tecnología de punta para devolver la funcionalidad y estética a tu sonrisa.'
        },
        'odontopediatria': {
            img: './images/odontopediatria-01.png',
            title: 'Odontopediatría',
            description: 'Diagnóstico y tratamiento dental en niños, incluyendo eliminación de malos hábitos. Creamos un ambiente amigable para que los más pequeños se sientan cómodos.'
        },
        'endodoncia': {
            img: './images/endodoncia-01.png',
            title: 'Endodoncia',
            description: 'Tratamiento de conductos para salvar dientes dañados. Utilizamos técnicas modernas para garantizar un procedimiento cómodo y efectivo.'
        },
        'periodoncia': {
            img: './images/periodoncia-01.png',
            title: 'Periodoncia',
            description: 'Tratamiento de enfermedades de las encías y tejidos de soporte dental. Nos especializamos en gingivitis y periodontitis para mantener tu salud bucal.'
        },
        'cirugia': {
            img: './images/cirugia-01.png',
            title: 'Cirugía',
            description: 'Procedimientos quirúrgicos para resolver problemas dentales complejos, como extracciones de muelas del juicio, injertos óseos y cirugía maxilofacial.'
        },
        'rehabilitacion': {
            img: './images/rehabilitacion-01.png',
            title: 'Rehabilitación Oral',
            description: 'Combina prótesis, operatoria e implantología para pacientes de alta complejidad. Restauramos la funcionalidad y estética de tu sonrisa de manera integral.'
        },
        'odontologia': {
            img: './images/odontologia-01.png',
            title: 'Odontología Estética',
            description: 'Mejoramos la belleza de tu sonrisa corrigiendo defectos rápidamente con carillas, blanqueamiento y diseño de sonrisa personalizado.'
        },
        'oclusion': {
            img: './images/oclusion-01.png',
            title: 'Oclusión',
            description: 'Corrección de la relación entre dientes y mandíbula para una mordida saludable. Tratamos problemas de ATM y bruxismo con un enfoque integral.'
        },
        'blanqueamiento': {
            img: './images/blanqueamiento-01.png',
            title: 'Blanqueamiento',
            description: 'Procedimientos para aclarar el color de los dientes de forma segura. Ofrecemos blanqueamiento en clínica y kits para casa con resultados visibles.'
        },
        'protesis': {
            img: './images/protesis-fija-01.png',
            title: 'Prótesis Fija',
            description: 'Restauraciones no removibles para reemplazar dientes perdidos, como coronas y puentes, diseñadas para integrarse perfectamente con tu sonrisa.'
        }
    };

    // Installation Category Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            // Show/hide gallery items based on category
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Modal
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.gallery-modal-content');
    const modalCaption = document.querySelector('.gallery-modal-caption');
    const modalClose = document.querySelector('.gallery-modal-close');
    const modalPrev = document.querySelector('.gallery-modal-prev');
    const modalNext = document.querySelector('.gallery-modal-next');
    const viewMoreBtns = document.querySelectorAll('.btn-view-more');
    
    let currentImageIndex = 0;
    const galleryImages = [];
    
    // Collect all gallery images and their captions
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-img');
        const caption = item.querySelector('.gallery-caption h4').textContent;
        const description = item.querySelector('.gallery-caption p').textContent;
        
        galleryImages.push({
            src: img.src,
            caption: caption,
            description: description
        });
        
        // Add click event to view more buttons
        const viewMoreBtn = item.querySelector('.btn-view-more');
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(index);
            });
        }
        
        // Also allow clicking on the image itself
        img.addEventListener('click', () => {
            openModal(index);
        });
    });
    
    function openModal(index) {
        currentImageIndex = index;
        updateModalImage();
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function updateModalImage() {
        modalImg.src = galleryImages[currentImageIndex].src;
        modalCaption.innerHTML = `<h4>${galleryImages[currentImageIndex].caption}</h4><p>${galleryImages[currentImageIndex].description}</p>`;
    }
    
    // Close modal
    modalClose.addEventListener('click', () => {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Navigate to previous image
    modalPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage();
    });
    
    // Navigate to next image
    modalNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateModalImage();
    });
    
    // Close when clicking outside the image
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (galleryModal.style.display === 'block') {
            if (e.key === 'Escape') {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateModalImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateModalImage();
            }
        }
    });
    
    // Virtual Tour Play Button
    const tourPlayBtn = document.querySelector('.tour-play-btn');
    if (tourPlayBtn) {
        tourPlayBtn.addEventListener('click', () => {
            // Here you would typically initialize a 360 viewer or redirect to a virtual tour
            // For now, let's just show an alert
            alert('¡Recorrido virtual en desarrollo! Próximamente podrás explorar nuestras instalaciones en 360°.');
        });
    }
    
    // Technology Categories
    const techCategories = document.querySelectorAll('.tech-category');
    const techItems = document.querySelectorAll('.tech-item');
    
    techCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            techCategories.forEach(c => c.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');
            
            const techCategory = category.getAttribute('data-category');
            
            // Show/hide tech items based on category
            techItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category')?.split(' ') || [];
                if (techCategory === 'all' || itemCategories.includes(techCategory)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Popup functions
    specialtyItems.forEach(item => {
        item.addEventListener('click', function() {
            const specialtyId = this.getAttribute('data-specialty');
            const data = specialtiesData[specialtyId];
            
            if (data) {
                const popupImg = specialtyPopup.querySelector('.specialty-popup-img');
                const popupTitle = specialtyPopup.querySelector('.specialty-popup-title');
                const popupDescription = specialtyPopup.querySelector('.specialty-popup-description');
                
                popupImg.src = data.img;
                popupTitle.textContent = data.title;
                popupDescription.textContent = data.description;
                
                specialtyPopup.style.display = 'flex';
                setTimeout(() => specialtyPopup.classList.add('active'), 10);
            }
        });
    });

    // Cerrar specialty popup
    const specialtyPopupClose = specialtyPopup.querySelector('.specialty-popup-close');
    specialtyPopupClose.addEventListener('click', () => {
        specialtyPopup.classList.remove('active');
        setTimeout(() => specialtyPopup.style.display = 'none', 500);
    });
    specialtyPopup.addEventListener('click', (e) => {
        if (e.target === specialtyPopup) {
            specialtyPopup.classList.remove('active');
            setTimeout(() => specialtyPopup.style.display = 'none', 500);
        }
    });

    // Professional Pop-up Data
    const professionalsData = {
        'jorge-vega': {
            img: './images/clinicantares-jorgevegacomanato.jpg',
            name: 'Dr. Jorge Vega Comanato',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral e Implantología',
            bio: 'Con más de 15 años de experiencia, el Dr. Vega se especializa en rehabilitación oral avanzada y técnicas de implantología moderna. Su enfoque centrado en el paciente y su dedicación a la excelencia clínica lo han convertido en uno de los profesionales más reconocidos de nuestra clínica. Ha realizado múltiples capacitaciones en el extranjero en el área de estética e implantología.'
        },
        'jose-avaria': {
            img: './images/clinicantares-joseavariagarcia.jpg',
            name: 'Dr. Jose Avaria Garcia',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral e Implantología',
            bio: 'Especialista en rehabilitación oral, con un enfoque en restauraciones complejas para mejorar la funcionalidad y estética dental. El Dr. Avaria ha realizado numerosos casos de reconstrucción total, devolviendo la confianza a sus pacientes mediante soluciones personalizadas. Es miembro activo de la Sociedad de Implantología Oral de Chile.'
        },
        'carolina-weason': {
            img: './images/clinicantares-carolinaweason.jpg',
            name: 'Dra. Carolina Weason Cornejo',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral e Implantología',
            bio: 'La Dra. Weason combina técnicas avanzadas de implantología con un enfoque personalizado para cada paciente. Su formación constante y dedicación a la atención de calidad la han posicionado como una especialista de referencia en reconstrucción oral compleja. Certificada en sistemas de implantes de última generación.'
        },
        'paola-munoz': {
            img: './images/clinicantares-paolamunoz.jpg',
            name: 'Dra. Paola Muñoz Arias',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral e Implantología',
            bio: 'Con una trayectoria destacada, la Dra. Muñoz se dedica a devolver la sonrisa a sus pacientes mediante tratamientos innovadores. Su especialización en técnicas mínimamente invasivas permite resultados naturales con la menor molestia posible para el paciente. Experta en rehabilitación sobre implantes y prótesis fija.'
        },
        'vladimir-dedic': {
            img: './images/clinicantares-vladimirdedic.jpg',
            name: 'Dr. Vladimir Dedic Morales',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral e Implantología',
            bio: 'El Dr. Dedic es un experto en rehabilitación oral, con un enfoque en soluciones estéticas y funcionales. Su pasión por la odontología restauradora lo ha llevado a perfeccionar técnicas que combinan precisión y belleza natural. Cuenta con formación avanzada en biomateriales y tecnología CAD/CAM.'
        },
        'christopher-lawrence': {
            img: './images/clinicantares-christopherlawrence.jpg',
            name: 'Dr. Christopher Lawrence Yañez',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral, Adhesiva y Biomimética',
            bio: 'Especialista en técnicas biomiméticas que imitan la estructura natural de los dientes para resultados duraderos. El Dr. Lawrence es pionero en nuestra clínica en tratamientos restauradores mínimamente invasivos, preservando al máximo la estructura dental. Certificado en odontología adhesiva por instituciones internacionales.'
        },
        'rodrigo-garcia': {
            img: './images/clinicantares-rodrigogarciaastete.jpg',
            name: 'Dr. Rodrigo Garcia Astete',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral',
            bio: 'Con amplia experiencia en rehabilitación oral, el Dr. Garcia se enfoca en restauraciones de alta calidad. Su meticulosa atención al detalle garantiza resultados estéticos y funcionales para casos complejos. Ha participado en numerosos cursos internacionales de actualización en prótesis fija y removible.'
        },
        'nicolas-frossini': {
            img: './images/clinicantares-nicolasfrossini.jpg',
            name: 'Dr. Nicolas Frossini Careaga',
            position: 'Cirujano Dentista',
            specialty: 'Rehabilitación Oral, Estética y Adhesiva',
            bio: 'El Dr. Frossini combina estética y funcionalidad en sus tratamientos de rehabilitación oral. Su formación en odontología estética y adhesiva le permite ofrecer soluciones naturales y conservadoras. Especialista en restauraciones cerámicas y diseño digital de sonrisa (DSD).'
        },
        'ximena-crovetto': {
            img: './images/clinicantares-ximenacrovetto.jpg',
            name: 'Dra. Ximena Crovetto Merino',
            position: 'Cirujano Dentista',
            specialty: 'Odontopediatría, Odontología Infanto-Juvenil',
            bio: 'Especialista en el cuidado dental de niños y adolescentes, creando experiencias positivas en el consultorio. La Dra. Crovetto posee un don especial para tratar a los pacientes más pequeños, eliminando miedos y fomentando buenos hábitos de higiene oral desde temprana edad. Certificada en manejo conductual pediátrico.'
        },
        'marcela-frossini': {
            img: './images/clinicantares-marcelafrossini.jpg',
            name: 'Dra. Marcela Frossini Careaga',
            position: 'Cirujano Dentista',
            specialty: 'Ortodoncia y Ortopedia Dentomaxilofacial',
            bio: 'La Dra. Frossini es experta en corregir la alineación dental y maxilar para lograr sonrisas perfectas. Su enfoque interdisciplinario permite abordar casos complejos que requieren combinación de tratamientos. Certificada en sistemas Invisalign y brackets estéticos de última generación.'
        },
        'gonzalo-rozas': {
            img: './images/clinicantares-gonzalorozas.jpg',
            name: 'Dr. Gonzalo Rozas Muñoz',
            position: 'Cirujano Dentista',
            specialty: 'Ortodoncia y Ortopedia Dentomaxilofacial',
            bio: 'Con un enfoque en ortodoncia avanzada, el Dr. Rozas mejora la estética y funcionalidad de la sonrisa. Su especialización en tratamientos tempranos permite corregir problemas maxilofaciales desde la infancia. Experto en técnicas de ortodoncia lingual y sistemas auto-ligables.'
        },
        'maria-paz-diaz': {
            img: './images/clinicantares-mariapazdiaz.jpg',
            name: 'Dra. Maria Paz Diaz',
            position: 'Cirujano Dentista',
            specialty: 'Ortodoncia y Ortopedia Bucomaxilofacial',
            bio: 'Especialista en ortodoncia para niños y adultos, con un enfoque en tratamientos personalizados. La Dra. Diaz se destaca por su dedicación a la planificación detallada de cada caso, utilizando tecnología 3D para visualizar resultados. Miembro activo de la Sociedad de Ortodoncia de Chile.'
        },
        'constanza-munoz': {
            img: './images/clinicantares-constanzamunozsaez.jpg',
            name: 'Dra. Constanza Muñoz Sáez',
            position: 'Cirujano Dentista',
            specialty: 'Ortodoncia y Ortopedia Bucomaxilofacial',
            bio: 'La Dra. Muñoz se especializa en corregir problemas de mordida y alineación dental. Su formación continua en nuevas tecnologías le permite ofrecer tratamientos más rápidos y confortables. Certificada en sistemas de ortodoncia acelerada y alineadores transparentes.'
        },
        'josefina-caceres': {
            img: './images/clinicantares-josefinacacerescrovetto.jpg',
            name: 'Dra. Josefina Caceres Crovetto',
            position: 'Cirujano Dentista',
            specialty: 'Odontología General',
            bio: 'Con un enfoque en odontología general, la Dra. Caceres ofrece cuidados integrales para toda la familia. Su trato cercano y empático la han convertido en una de las dentistas favoritas de nuestros pacientes. Especializada en prevención y educación para la salud oral.'
        },
        'carlos-caceres': {
            img: './images/clinicantares-carloscaceres.jpg',
            name: 'Dr. Carlos Caceres Collao',
            position: 'Cirujano Dentista',
            specialty: 'Endodoncia',
            bio: 'Especialista en endodoncia, el Dr. Caceres se dedica a salvar dientes mediante tratamientos de conductos. Su precisión y uso de tecnología avanzada permiten procedimientos más rápidos y cómodos. Experto en microcirugía endodóntica y tratamiento de casos complejos.'
        },
        'natalia-ponce': {
            img: './images/natalia.png',
            name: 'Dra. Natalia Ponce Oliva',
            position: 'Cirujano Dentista',
            specialty: 'Endodoncia y Rehabilitación Oral',
            bio: 'La Dra. Ponce combina endodoncia y rehabilitación oral para ofrecer soluciones completas a sus pacientes. Su formación dual le permite abordar casos que requieren tratamiento de conductos y posterior restauración. Certificada en técnicas endodónticas mecanizadas y sistemas rotatorios.'
        },
        'jorge-beltran': {
            img: './images/clinicantares-jorgebeltran.jpg',
            name: 'Dr. Jorge Beltran Quezada',
            position: 'Cirujano Dentista',
            specialty: 'Cirugía Maxilofacial, Ortognática, ATM',
            bio: 'Experto en cirugía maxilofacial, el Dr. Beltran trata problemas complejos de mandíbula y ATM. Su formación quirúrgica avanzada le permite realizar procedimientos de alto nivel de complejidad. Especialista en cirugía ortognática y reconstrucción facial post-traumática.'
        },
        'belen-valenzuela': {
            img: './images/clinicantares-belenvalenzuela.jpg',
            name: 'Dra. Belen Valenzuela Molinet',
            position: 'Cirujano Dentista',
            specialty: 'Armonización Orofacial',
            bio: 'La Dra. Valenzuela se especializa en armonización orofacial para mejorar la estética facial. Sus tratamientos combinan odontología estética con procedimientos no invasivos para realzar la belleza natural. Certificada en aplicación de toxina botulínica y ácido hialurónico para fines terapéuticos y estéticos.'
        },
        'erick-vargas': {
            img: './images/erick.png',
            name: 'Dr. Erick Vargas Sanhueza',
            position: 'Cirujano Dentista',
            specialty: 'Cirugía Maxilofacial',
            bio: 'Con experiencia en cirugía maxilofacial, el Dr. Vargas ofrece soluciones avanzadas para problemas dentales complejos. Su especialización en cirugía de implantes y regeneración ósea permite tratar casos de atrofia maxilar severa. Miembro de la Sociedad Chilena de Cirugía Bucal y Maxilofacial.'
        },
        'nataly-silva': {
            img: './images/clinicantares-natalysilva.jpg',
            name: 'Dra. Nataly Silva Arriagada',
            position: 'Cirujano Dentista',
            specialty: 'Periodoncia',
            bio: 'Especialista en periodoncia, la Dra. Silva trata enfermedades de las encías con técnicas modernas. Su enfoque preventivo y terapéutico ayuda a mantener la salud periodontal a largo plazo. Experta en cirugía plástica periodontal y tratamiento de periimplantitis.'
        },
        'claudia-guajardo': {
            img: './images/clinicantares-claudiaguajardo.jpg',
            name: 'Dra. Claudia Guajardo Pinto',
            position: 'Cirujano Dentista',
            specialty: 'Armonización Orofacial',
            bio: 'La Dra. Guajardo se enfoca en armonización orofacial para mejorar la estética facial de sus pacientes. Su visión integral de la estética le permite combinar tratamientos dentales y faciales para resultados armónicos. Certificada en diseño de sonrisa y rejuvenecimiento facial mínimamente invasivo.'
        },
        'jorge-vasquez': {
            img: './images/clinicantares-jorgevasquez.jpg',
            name: 'Dr. Jorge Vasquez Garrido',
            position: 'Cirujano Dentista',
            specialty: 'Kinesiología, Rehabilitación Temporomandibular',
            bio: 'Especialista en kinesiología y rehabilitación temporomandibular, el Dr. Vasquez trata problemas de ATM. Su enfoque multidisciplinario combina odontología y fisioterapia para aliviar dolores crónicos. Experto en terapia manual, ejercicios terapéuticos y tratamiento del bruxismo.'
        }
    };

    // Código de funcionalidad para la sección de profesionales
    console.log("Profesionales script initializing...");

    const teamMembersAll = document.querySelectorAll('#equipo .team-member');
    const teamCarouselTrack = document.querySelector('#equipo .team-carousel-track');
    const searchInput = document.getElementById('specialist-search-input');
    const searchBtn = document.getElementById('search-btn');
    const filterBtns = document.querySelectorAll('#equipo .filter-btn');
    const prevArrow = document.querySelector('#equipo .prev-arrow');
    const nextArrow = document.querySelector('#equipo .next-arrow');
    const teamCarouselContainer = document.querySelector('#equipo .team-carousel-container');

    if (!teamCarouselTrack) {
        console.error("Team Carousel Track not found!");
        return;
    }
    if (!teamCarouselContainer) {
        console.error("Team Carousel Container not found!");
        return;
    }
    if (teamMembersAll.length === 0) {
        console.warn("No team members found on the page.");
        // return; // Allow to continue if track exists, might be populated later or empty message shown by CSS
    }

    let currentPosition = 0;
    let itemWidth = 255; // Default: 240px width + 15px margin-right
    let visibleItemsPerPage = 5;
    let autoScrollInterval = null;
    let isMouseOverCarousel = false;

    function calculateCarouselDimensions() {
        console.log("Calculating dimensions...");
        const firstVisibleMember = teamCarouselTrack.querySelector('.team-member:not(.hidden)');
        
        if (firstVisibleMember) {
            const computedStyle = window.getComputedStyle(firstVisibleMember);
            const marginRight = parseInt(computedStyle.marginRight) || 0;
            itemWidth = firstVisibleMember.offsetWidth + marginRight;
        } else if (teamMembersAll.length > 0) {
             // Fallback to first team member if no one is visible currently (e.g. during init before filter)
            const firstMember = teamMembersAll[0];
            const computedStyle = window.getComputedStyle(firstMember);
            const marginRight = parseInt(computedStyle.marginRight) || 0;
            itemWidth = firstMember.offsetWidth + marginRight;
        } else {
            // No members at all, use default, though carousel will be empty
            itemWidth = 255;
        }

        if (itemWidth <= 0) {
            console.warn("itemWidth is 0 or less, defaulting to 255.");
            itemWidth = 255;
        }

        const containerWidth = teamCarouselContainer.offsetWidth;
        if (containerWidth > 0 && itemWidth > 0) {
            visibleItemsPerPage = Math.max(1, Math.floor(containerWidth / itemWidth));
        } else {
            visibleItemsPerPage = Math.max(1, Math.floor(1100 / itemWidth)); // Fallback to max container width
            console.warn("Container width is 0. Using fallback for visibleItemsPerPage.");
        }
        console.log(`Dimensions: itemWidth=${itemWidth}, visibleItemsPerPage=${visibleItemsPerPage}, containerWidth=${containerWidth}`);
    }

    function updateCarouselPosition(immediate = false) {
        if (!teamCarouselTrack) return;
        const positionX = -currentPosition * itemWidth;
        
        console.log(`Updating position: currentPosition=${currentPosition}, positionX=${positionX}`);

        if (immediate) {
            teamCarouselTrack.style.transition = 'none';
        } else {
            teamCarouselTrack.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        }
        teamCarouselTrack.style.transform = `translateX(${positionX}px)`;
        
        if (immediate) {
            // Force reflow to apply transform immediately before re-enabling transition
            teamCarouselTrack.offsetHeight;
            teamCarouselTrack.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        }
    }
    
    function getVisibleMembersInTrack() {
        return Array.from(teamCarouselTrack.children).filter(member => 
            !member.classList.contains('hidden') && getComputedStyle(member).display !== 'none'
        );
    }

    function moveCarousel(direction) {
        if (!teamCarouselTrack) return;
        console.log(`moveCarousel called with direction: ${direction}`);
        stopAutoScroll();

        const currentVisibleMembers = getVisibleMembersInTrack();
        if (currentVisibleMembers.length === 0) {
            console.warn("No visible members to scroll.");
            return;
        }

        const maxPosition = Math.max(0, currentVisibleMembers.length - visibleItemsPerPage);
        console.log(`CurrentPos: ${currentPosition}, MaxPos: ${maxPosition}, VisibleInTrack: ${currentVisibleMembers.length}, PerPage: ${visibleItemsPerPage}`);

        if (direction === 'prev') {
            currentPosition = Math.max(0, currentPosition - 1);
        } else if (direction === 'next') {
            currentPosition = Math.min(maxPosition, currentPosition + 1);
        }
        updateCarouselPosition();
        setTimeout(startAutoScroll, 5000); // Restart auto-scroll after 5s of inactivity
    }

    function startAutoScroll() {
        if (autoScrollInterval !== null || isMouseOverCarousel) {
            // console.log("Auto-scroll start condition not met (already running or mouse over).");
            return;
        }
        console.log("Starting auto-scroll");
        autoScrollInterval = setInterval(() => {
            const currentVisibleMembers = getVisibleMembersInTrack();
            if (currentVisibleMembers.length <= visibleItemsPerPage) {
                // console.log("Not enough items to auto-scroll. Stopping.");
                stopAutoScroll();
                return;
            }
            const maxPosition = Math.max(0, currentVisibleMembers.length - visibleItemsPerPage);
            if (currentPosition >= maxPosition) {
                currentPosition = 0;
                 // updateCarouselPosition(true); // Optional: jump to start without animation for loop
            } else {
                currentPosition++;
            }
            updateCarouselPosition();
        }, 4000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval !== null) {
            console.log("Stopping auto-scroll");
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    function filterSpecialists(searchValue, category) {
        if (!teamCarouselTrack) return;
        console.log(`Filtering: search='${searchValue}', category='${category}'`);
        stopAutoScroll();
        currentPosition = 0;

        let hasVisibleMembers = false;
        Array.from(teamCarouselTrack.children).forEach(member => {
            const memberName = member.querySelector('.team-name')?.textContent.toLowerCase() || '';
            // Buscar el párrafo que contiene la especialidad y no la posición.
            // La estructura esperada es <p><strong>Especialidad:</strong> NombreEspecialidad</p>
            // Por ello buscamos el <strong> y luego accedemos a su elemento padre.
            let specParagraph = null;
            const specStrong = member.querySelector('.team-info p strong');
            if (specStrong) {
                specParagraph = specStrong.parentElement;
            }
            // Si por algún motivo no encontramos el párrafo mediante <strong>,
            // tomamos el segundo <p> dentro de .team-info como fallback.
            if (!specParagraph) {
                const allParas = member.querySelectorAll('.team-info p');
                if (allParas.length > 1) {
                    specParagraph = allParas[1];
                }
            }
            const memberSpecialtyText = specParagraph ? specParagraph.textContent.replace('Especialidad:','').toLowerCase().trim() : '';
            const memberDataCategory = member.getAttribute('data-category') || '';

            const searchHaystack = `${memberName} ${memberSpecialtyText}`;
            const matchesSearch = !searchValue || searchHaystack.includes(searchValue);
            const matchesCategory = category === 'all' || memberDataCategory === category;

            if (matchesSearch && matchesCategory) {
                member.classList.remove('hidden');
                member.style.display = '';
                hasVisibleMembers = true;
            } else {
                member.classList.add('hidden');
                member.style.display = 'none';
            }
        });
        
        calculateCarouselDimensions(); // Recalculate based on new visibility of items
        updateCarouselPosition(true); // Update immediately, no animation for the filter reset

        if (hasVisibleMembers) {
            setTimeout(startAutoScroll, 3000); // Restart auto-scroll if items are visible
        } else {
            console.log("No specialists match filter, auto-scroll not restarted.");
        }
    }

    function initCarousel() {
        console.log("Initializing carousel...");
        if (!teamCarouselTrack) {
            console.error("Carousel track not found during init.");
            return;
        }
        
        calculateCarouselDimensions();
        // Ensure all items are initially visible before first filter or scroll action
        Array.from(teamCarouselTrack.children).forEach(member => {
            member.classList.remove('hidden');
            member.style.display = '';
        });
        updateCarouselPosition(true); // Set initial position without animation
        startAutoScroll();

        // Event Listeners
        if (prevArrow) {
            prevArrow.addEventListener('click', () => moveCarousel('prev'));
        } else { console.error("Prev arrow not found"); }

        if (nextArrow) {
            nextArrow.addEventListener('click', () => moveCarousel('next'));
        } else { console.error("Next arrow not found"); }

        if (teamCarouselContainer) {
            teamCarouselContainer.addEventListener('mouseenter', () => { isMouseOverCarousel = true; stopAutoScroll(); });
            teamCarouselContainer.addEventListener('mouseleave', () => { isMouseOverCarousel = false; startAutoScroll(); });
        }

        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => {
                const activeCategory = document.querySelector('#equipo .filter-btn.active')?.getAttribute('data-category') || 'all';
                filterSpecialists(searchInput.value.toLowerCase().trim(), activeCategory);
            });
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const activeCategory = document.querySelector('#equipo .filter-btn.active')?.getAttribute('data-category') || 'all';
                    filterSpecialists(searchInput.value.toLowerCase().trim(), activeCategory);
                }
            });
        } else { console.error("Search input or button not found"); }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-category') || 'all';
                filterSpecialists(searchInput ? searchInput.value.toLowerCase().trim() : '', category);
            });
        });

        if (teamCarouselTrack) {
            teamCarouselTrack.addEventListener('click', function(e) {
                const memberCard = e.target.closest('.team-member');
                if (memberCard && !memberCard.classList.contains('hidden')) {
                    const professionalId = memberCard.getAttribute('data-professional');
                    const data = professionalsData[professionalId]; // Make sure professionalsData is defined and populated
                    if (data && professionalPopup) {
                        // Populate and show popup (existing logic here)
                        const popupImg = professionalPopup.querySelector('.popup-img');
                        const popupName = professionalPopup.querySelector('.popup-name');
                        // ... (rest of popup population) ...
                        if (popupImg) popupImg.src = data.img;
                        if (popupName) popupName.textContent = data.name;
                        professionalPopup.style.display = 'flex';
                    } else if (!data) {
                        console.warn(`No data found for professional ID: ${professionalId}`);
                    }
                }
            });
        }
        
        if (professionalPopup) {
            const popupClose = professionalPopup.querySelector('.popup-close');
            if (popupClose) {
                popupClose.addEventListener('click', () => professionalPopup.style.display = 'none');
            }
            professionalPopup.addEventListener('click', (e) => {
                if (e.target === professionalPopup) professionalPopup.style.display = 'none';
            });
        }

        window.addEventListener('resize', () => {
            console.log("Window resizing...");
            calculateCarouselDimensions();
            updateCarouselPosition(true); // Recalculate and update position immediately
            // Consider restarting autoscroll logic if it was running
            stopAutoScroll();
            startAutoScroll();
        });
        console.log("Carousel event listeners attached.");
    }

    // Ensure professionalsData is defined before initCarousel if it's used inside
    // Assuming professionalsData is globally available or passed appropriately
    // For this context, it seems professionalsData is defined elsewhere in the file or globally.
    initCarousel(); 

    // Testimonial slider
    const testimonialsData = [
        {
            content: "La atención es excelente, el personal muy amable y los doctores muy profesionales. Me realizaron un tratamiento de ortodoncia y quedé muy satisfecha.",
            name: "Ana Martínez",
            position: "Paciente de Ortodoncia",
            image: "./images/antares-08.png",
            rating: 5
        },
        {
            content: "Increíble experiencia en Antares. El Dr. Rodríguez es un experto en implantología, me realizó 3 implantes y el resultado es perfecto.",
            name: "Carlos Fernández",
            position: "Paciente de Implantología",
            image: "./images/antares-08.png",
            rating: 5
        },
        {
            content: "Mi hijo tenía miedo al dentista, pero en Antares lo trataron tan bien que ahora quiere volver. La Dra. González tiene un don con los niños.",
            name: "Patricia Soto",
            position: "Madre de Paciente",
            image: "./images/antares-08.png",
            rating: 5
        }
    ];

    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector('.testimonial');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');

    if (testimonialContainer && prevTestimonialBtn && nextTestimonialBtn) {
        const updateTestimonial = (index) => {
            const t = testimonialsData[index];
            testimonialContainer.style.opacity = '0';
            testimonialContainer.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                testimonialContainer.querySelector('.testimonial-content p').textContent = t.content;
                testimonialContainer.querySelector('.testimonial-name').textContent = t.name;
                testimonialContainer.querySelector('.testimonial-position').textContent = t.position;
                testimonialContainer.querySelector('.testimonial-img').src = t.image;
                
                const ratingContainer = testimonialContainer.querySelector('.testimonial-rating');
                ratingContainer.innerHTML = '';
                for (let i = 0; i < t.rating; i++) {
                    ratingContainer.innerHTML += '<i class="fas fa-star"></i>';
                }
                
                testimonialContainer.style.opacity = '1';
                testimonialContainer.style.transform = 'translateX(0)';
            }, 300);
        };
        
        prevTestimonialBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
            updateTestimonial(currentTestimonial);
        });
        
        nextTestimonialBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
            updateTestimonial(currentTestimonial);
        });
        
        // Auto-cambio de testimonios
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
            updateTestimonial(currentTestimonial);
        }, 7000);
    }

    // Contador animado para estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    let current = 0;
                    const increment = Math.ceil(count / 50);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current > count) current = count;
                        target.textContent = current;
                        if (current === count) clearInterval(timer);
                    }, 30);
                    statObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => statObserver.observe(stat));
    }

    // Glow hover effect
    const glowElements = document.querySelectorAll('.glow-effect');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => element.classList.add('glow-active'));
        element.addEventListener('mouseleave', () => element.classList.remove('glow-active'));
    });

    // Validación y envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validación básica de campos
            ['name', 'email', 'phone', 'specialty', 'message'].forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff0000';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Simulación de envío
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
                    
                    // Resetear formulario
                    const formElements = contactForm.querySelectorAll('input, textarea, select');
                    formElements.forEach(el => {
                        el.value = '';
                        el.style.borderColor = '#5cb85c';
                        setTimeout(() => el.style.borderColor = '', 3000);
                    });
                    
                    // Mostrar mensaje de éxito
                    const successMsg = document.createElement('div');
                    successMsg.classList.add('success-message');
                    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Su mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.';
                    contactForm.appendChild(successMsg);
                    
                    // Restaurar botón después de un tiempo
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        successMsg.style.opacity = '0';
                        setTimeout(() => successMsg.remove(), 500);
                    }, 3000);
                }, 2000);
            } else {
                // Mostrar mensaje de error
                alert('Por favor, complete todos los campos requeridos.');
            }
        });
    }

    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Specialty Categories Filter
    const specialtyCategories = document.querySelectorAll('.specialty-category');
    const specialtyCards = document.querySelectorAll('.specialty-card');
    
    specialtyCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all buttons
            specialtyCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to current button
            category.classList.add('active');
            
            const filter = category.getAttribute('data-filter');
            
            // Show/hide specialties based on filter
            specialtyCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-specialty') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // About Tabs
    const aboutTabBtns = document.querySelectorAll('.about-tab-btn');
    const aboutTabPanes = document.querySelectorAll('.about-tab-pane');
    
    aboutTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            aboutTabBtns.forEach(b => b.classList.remove('active'));
            aboutTabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current button and corresponding pane
            btn.classList.add('active');
            const tab = btn.getAttribute('data-tab');
            document.querySelector(`.about-tab-pane[data-tab="${tab}"]`).classList.add('active');
        });
    });

    // Installation Tabs

    // Reemplazar iconos por especialidad
    teamMembersAll.forEach(member => {
        const socialDiv = member.querySelector('.team-social');
        if(socialDiv){
            // Obtener texto de especialidad de la info inferior
            let specParagraph = null;
            const specStrong = member.querySelector('.team-info p strong');
            if (specStrong) {
                specParagraph = specStrong.parentElement;
            }
            // Si por algún motivo no encontramos el párrafo mediante <strong>,
            // tomamos el segundo <p> dentro de .team-info como fallback.
            if (!specParagraph) {
                const allParas = member.querySelectorAll('.team-info p');
                if (allParas.length > 1) {
                    specParagraph = allParas[1];
                }
            }
            if (specParagraph) {
                const specText = specParagraph.textContent.replace('Especialidad:','').trim();
                // Solo mostrar la especialidad en el overlay
                let hoverHTML = `<span class="specialty-hover">${specText}</span>`;
                socialDiv.innerHTML = hoverHTML;
                specParagraph.style.display = 'none';
            }
        }
    });
});