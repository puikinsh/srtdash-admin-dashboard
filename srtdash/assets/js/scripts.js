(function() {
    'use strict';

    /*================================
    Preloader
    ==================================*/
    initPreloader();

    /*================================
    Sidebar collapsing
    ==================================*/
    initSidebar();

    /*================================
    Footer resizer
    ==================================*/
    initFooterResizer();

    /*================================
    Sidebar menu (MetisMenuJS)
    ==================================*/
    initSidebarMenu();

    /*================================
    Sticky Header
    ==================================*/
    initStickyHeader();

    /*================================
    Bootstrap popovers
    ==================================*/
    initPopovers();

    /*================================
    Form validation
    ==================================*/
    initFormValidation();

    /*================================
    Login form focus states
    ==================================*/
    initFormFocus();

    /*================================
    Settings panel toggle
    ==================================*/
    initSettingsPanel();

    /*================================
    Testimonial Carousel (Swiper)
    ==================================*/
    initTestimonialCarousel();

    /*================================
    Fullscreen toggle
    ==================================*/
    initFullscreen();

    /*================================
    Function definitions
    ==================================*/

    function initPreloader() {
        var preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.transition = 'opacity 0.5s';
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.remove();
                }, 500);
            }, 300);
        });
    }

    function initSidebar() {
        var pageContainer = document.querySelector('.page-container');
        var navBtn = document.querySelector('.nav-btn');
        if (!pageContainer) return;

        if (window.innerWidth <= 1364) {
            pageContainer.classList.add('sbar_collapsed');
        }

        if (navBtn) {
            navBtn.addEventListener('click', function() {
                pageContainer.classList.toggle('sbar_collapsed');
            });
        }
    }

    function initFooterResizer() {
        var mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        function resize() {
            var height = (window.innerHeight > 0 ? window.innerHeight : screen.height) - 5;
            height -= 67;
            if (height < 1) height = 1;
            if (height > 67) {
                mainContent.style.minHeight = height + 'px';
            }
        }

        resize();
        window.addEventListener('resize', resize);
    }

    function initSidebarMenu() {
        var menu = document.getElementById('menu');
        if (!menu || typeof MetisMenu === 'undefined') return;
        new MetisMenu('#menu');
    }

    function initStickyHeader() {
        var stickyHeader = document.getElementById('sticky-header');
        if (!stickyHeader) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 1) {
                stickyHeader.classList.add('sticky-menu');
            } else {
                stickyHeader.classList.remove('sticky-menu');
            }
        });
    }

    function initPopovers() {
        var popoverTriggers = document.querySelectorAll('[data-bs-toggle="popover"]');
        popoverTriggers.forEach(function(el) {
            new bootstrap.Popover(el);
        });
    }

    function initFormValidation() {
        window.addEventListener('load', function() {
            var forms = document.querySelectorAll('.needs-validation');
            forms.forEach(function(form) {
                form.addEventListener('submit', function(event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    }

    function initFormFocus() {
        var formInputs = document.querySelectorAll('.form-gp input');
        formInputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                var parent = this.closest('.form-gp');
                if (parent) parent.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                if (this.value.length === 0) {
                    var parent = this.closest('.form-gp');
                    if (parent) parent.classList.remove('focused');
                }
            });
        });
    }

    function initSettingsPanel() {
        var settingsBtn = document.querySelector('.settings-btn');
        var offsetClose = document.querySelector('.offset-close');
        var offsetArea = document.querySelector('.offset-area');
        if (!offsetArea) return;

        if (settingsBtn) {
            settingsBtn.addEventListener('click', function() {
                offsetArea.classList.toggle('show_hide');
                settingsBtn.classList.toggle('active');
            });
        }
        if (offsetClose) {
            offsetClose.addEventListener('click', function() {
                offsetArea.classList.toggle('show_hide');
                if (settingsBtn) settingsBtn.classList.toggle('active');
            });
        }
    }

    function initTestimonialCarousel() {
        var carouselEl = document.querySelector('.testimonial-carousel');
        if (!carouselEl || typeof Swiper === 'undefined') return;

        // Wrap existing slides in swiper-wrapper if not already done
        if (!carouselEl.querySelector('.swiper-wrapper')) {
            var children = Array.from(carouselEl.children);
            var wrapper = document.createElement('div');
            wrapper.className = 'swiper-wrapper';
            children.forEach(function(child) {
                child.classList.add('swiper-slide');
                wrapper.appendChild(child);
            });
            carouselEl.appendChild(wrapper);

            // Add pagination
            var pagination = document.createElement('div');
            pagination.className = 'swiper-pagination';
            carouselEl.appendChild(pagination);
        }

        new Swiper('.testimonial-carousel', {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            autoplay: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1360: { slidesPerView: 1 },
                1600: { slidesPerView: 2 }
            }
        });
    }

    function initFullscreen() {
        var fsDocButton = document.getElementById('full-view');
        var fsExitDocButton = document.getElementById('full-view-exit');
        if (!fsDocButton) return;

        fsDocButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
            document.body.classList.add('expanded');
        });

        if (fsExitDocButton) {
            fsExitDocButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                document.body.classList.remove('expanded');
            });
        }
    }

})();
