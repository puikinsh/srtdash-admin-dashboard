// Bootstrap 5 and core dependencies
import * as bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
  // Initialize popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  
  // Initialize toasts
  const toastElList = document.querySelectorAll('.toast');
  [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
  
  // Sidebar toggle functionality
  const sidebarToggle = document.querySelector('.nav-btn');
  const pageContainer = document.querySelector('.page-container');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      pageContainer.classList.toggle('sbar_collapsed');
    });
  }
  
  // Mobile sidebar overlay
  const sidebarMenu = document.querySelector('.sidebar-menu');
  const sidebarOverlay = document.createElement('div');
  sidebarOverlay.className = 'sidebar-overlay';
  document.body.appendChild(sidebarOverlay);
  
  sidebarOverlay.addEventListener('click', function() {
    pageContainer.classList.remove('sidebar-mobile-open');
    sidebarOverlay.classList.remove('show');
  });
  
  // Mobile menu toggle
  if (window.innerWidth < 768 && sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      pageContainer.classList.toggle('sidebar-mobile-open');
      sidebarOverlay.classList.toggle('show');
    });
  }
  
  // Fullscreen toggle
  const fullViewBtn = document.getElementById('full-view');
  const fullViewExitBtn = document.getElementById('full-view-exit');
  
  if (fullViewBtn) {
    fullViewBtn.addEventListener('click', function() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullViewBtn.style.display = 'none';
        if (fullViewExitBtn) fullViewExitBtn.style.display = 'block';
      }
    });
  }
  
  if (fullViewExitBtn) {
    fullViewExitBtn.addEventListener('click', function() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        fullViewExitBtn.style.display = 'none';
        if (fullViewBtn) fullViewBtn.style.display = 'block';
      }
    });
  }
  
  // Settings panel toggle
  const settingsBtn = document.querySelector('.settings-btn');
  const offsetArea = document.querySelector('.offset-area');
  const offsetClose = document.querySelector('.offset-btn-close');
  
  if (settingsBtn && offsetArea) {
    settingsBtn.addEventListener('click', function() {
      offsetArea.classList.add('show_hide');
    });
  }
  
  if (offsetClose && offsetArea) {
    offsetClose.addEventListener('click', function() {
      offsetArea.classList.remove('show_hide');
    });
  }
  
  // Search box functionality
  const searchBox = document.querySelector('.search-box input');
  if (searchBox) {
    searchBox.addEventListener('focus', function() {
      this.parentElement.classList.add('active');
    });
    
    searchBox.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('active');
      }
    });
  }
  
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      preloader.style.transition = 'opacity 0.5s';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }
  
  // MetisMenu initialization (if available)
  if (typeof MetisMenu !== 'undefined') {
    new MetisMenu('#menu');
  } else {
    // Fallback accordion menu without MetisMenu
    const menuItems = document.querySelectorAll('.metismenu > li > a');
    menuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        const submenu = this.nextElementSibling;
        if (submenu && submenu.tagName === 'UL') {
          e.preventDefault();
          submenu.classList.toggle('show');
          this.setAttribute('aria-expanded', submenu.classList.contains('show'));
        }
      });
    });
  }
  
  // Form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Dynamic year in footer
  const yearElements = document.querySelectorAll('.current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

// Export bootstrap for use in other modules
window.bootstrap = bootstrap;

// Helper functions
export function showNotification(message, type = 'info') {
  const toastHtml = `
    <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  const toastContainer = document.querySelector('.toast-container') || createToastContainer();
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  
  const toastElement = toastContainer.lastElementChild;
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
  
  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
  document.body.appendChild(container);
  return container;
}

// Utility function for API calls
export async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    showNotification('An error occurred. Please try again.', 'danger');
    throw error;
  }
}