// Dropdown and settings panel fix
import * as bootstrap from 'bootstrap';

export function initializeDropdownsAndPanels() {
  // Fix for notification dropdowns - handle icon clicks properly
  document.addEventListener('click', function(e) {
    // Check if clicked element is a dropdown toggle icon
    const dropdownIcon = e.target.closest('.notification-area .dropdown i.dropdown-toggle');
    
    if (dropdownIcon) {
      e.preventDefault();
      e.stopPropagation();
      
      // Find the parent dropdown element
      const dropdownEl = dropdownIcon.closest('.dropdown');
      const dropdownMenu = dropdownEl.querySelector('.dropdown-menu');
      
      if (dropdownMenu) {
        // Toggle the dropdown menu visibility
        const isShown = dropdownMenu.classList.contains('show');
        
        // Close all other dropdowns first
        document.querySelectorAll('.notification-area .dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });
        
        // Toggle this dropdown
        if (!isShown) {
          dropdownMenu.classList.add('show');
          // Position the dropdown
          dropdownMenu.style.position = 'absolute';
          dropdownMenu.style.inset = '0px auto auto 0px';
          dropdownMenu.style.transform = 'translate(0px, 40px)';
        }
      }
    }
    
    // Close dropdowns when clicking outside
    if (!e.target.closest('.notification-area .dropdown')) {
      document.querySelectorAll('.notification-area .dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
  
  // Settings panel (offset area) toggle
  const settingsBtn = document.querySelector('.settings-btn');
  const offsetArea = document.querySelector('.offset-area');
  const offsetClose = document.querySelector('.offset-btn-close');
  
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (offsetArea) {
        offsetArea.classList.toggle('show_hide');
        settingsBtn.classList.toggle('active');
      }
    });
  }
  
  // Close button for settings panel
  if (offsetClose) {
    offsetClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (offsetArea) {
        offsetArea.classList.remove('show_hide');
      }
      
      if (settingsBtn) {
        settingsBtn.classList.remove('active');
      }
    });
  }
  
  // Also handle clicking on the icon inside the close button
  const closeIcon = document.querySelector('.offset-btn-close i');
  if (closeIcon) {
    closeIcon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (offsetArea) {
        offsetArea.classList.remove('show_hide');
      }
      
      if (settingsBtn) {
        settingsBtn.classList.remove('active');
      }
    });
  }
}