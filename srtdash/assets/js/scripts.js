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
        var sidebar = document.querySelector('.sidebar-menu');
        if (!pageContainer) return;

        if (window.innerWidth <= 1364) {
            pageContainer.classList.add('sbar_collapsed');
        }

        if (navBtn) {
            navBtn.setAttribute('role', 'button');
            navBtn.setAttribute('aria-label', 'Toggle sidebar');
            updateSidebarAria();

            navBtn.addEventListener('click', function() {
                pageContainer.classList.toggle('sbar_collapsed');
                updateSidebarAria();
            });
        }

        function updateSidebarAria() {
            var collapsed = pageContainer.classList.contains('sbar_collapsed');
            if (navBtn) navBtn.setAttribute('aria-expanded', String(!collapsed));
            if (sidebar) sidebar.setAttribute('aria-hidden', String(collapsed));
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

        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    if (window.scrollY > 1) {
                        stickyHeader.classList.add('sticky-menu');
                    } else {
                        stickyHeader.classList.remove('sticky-menu');
                    }
                    ticking = false;
                });
                ticking = true;
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

        function updatePanelAria() {
            var open = offsetArea.classList.contains('show_hide');
            offsetArea.setAttribute('aria-hidden', String(!open));
            if (settingsBtn) settingsBtn.setAttribute('aria-expanded', String(open));
        }

        updatePanelAria();

        if (settingsBtn) {
            settingsBtn.setAttribute('role', 'button');
            settingsBtn.setAttribute('aria-label', 'Toggle settings panel');
            settingsBtn.addEventListener('click', function() {
                offsetArea.classList.toggle('show_hide');
                settingsBtn.classList.toggle('active');
                updatePanelAria();
            });
        }
        if (offsetClose) {
            offsetClose.addEventListener('click', function() {
                offsetArea.classList.toggle('show_hide');
                if (settingsBtn) settingsBtn.classList.toggle('active');
                updatePanelAria();
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

    /*================================
    Toast notifications
    ==================================*/
    initToast();

    /*================================
    Header search
    ==================================*/
    initSearch();

    /*================================
    Function definitions (continued)
    ==================================*/

    function initToast() {
        // Create toast container once
        var container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '1090';
        document.body.appendChild(container);

        // Expose globally: SRTdash.toast('message', 'success')
        window.SRTdash = window.SRTdash || {};
        window.SRTdash.toast = function(message, type) {
            type = type || 'primary';
            var icons = {
                success: 'fa-solid fa-check-circle',
                danger: 'fa-solid fa-exclamation-circle',
                warning: 'fa-solid fa-exclamation-triangle',
                info: 'fa-solid fa-info-circle',
                primary: 'fa-solid fa-bell'
            };
            var icon = icons[type] || icons.primary;

            var toast = document.createElement('div');
            toast.className = 'toast align-items-center text-bg-' + type + ' border-0';
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            toast.innerHTML =
                '<div class="d-flex">' +
                    '<div class="toast-body"><i class="' + icon + ' me-2"></i>' + message + '</div>' +
                    '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
                '</div>';
            container.appendChild(toast);
            var bsToast = new bootstrap.Toast(toast, { delay: 4000 });
            bsToast.show();
            toast.addEventListener('hidden.bs.toast', function() { toast.remove(); });
        };
    }

    function initSearch() {
        var searchForm = document.querySelector('.search-box form');
        var searchInput = document.querySelector('.search-box input');
        if (!searchForm || !searchInput) return;

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            // Collect all sidebar menu links
            var links = document.querySelectorAll('#menu a[href]');
            var results = [];
            links.forEach(function(link) {
                var text = link.textContent.trim().toLowerCase();
                var href = link.getAttribute('href');
                if (href && href !== '#' && href !== 'javascript:void(0)' && text.indexOf(query) > -1) {
                    results.push({ text: link.textContent.trim(), href: href });
                }
            });

            if (results.length === 1) {
                window.location.href = results[0].href;
            } else if (results.length > 1) {
                if (window.SRTdash && window.SRTdash.toast) {
                    window.SRTdash.toast('Found ' + results.length + ' pages matching "' + query + '"', 'info');
                }
                // Highlight matching items in sidebar
                links.forEach(function(link) {
                    link.closest('li') && link.closest('li').classList.remove('search-highlight');
                });
                results.forEach(function(result) {
                    links.forEach(function(link) {
                        if (link.getAttribute('href') === result.href) {
                            var li = link.closest('li');
                            if (li) li.classList.add('search-highlight');
                            // Expand parent menus
                            var parent = link.closest('ul.collapse');
                            if (parent) parent.classList.add('in');
                        }
                    });
                });
            } else {
                if (window.SRTdash && window.SRTdash.toast) {
                    window.SRTdash.toast('No pages found for "' + query + '"', 'warning');
                }
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
