// Complete fix for dropdowns and settings panel
export function initializeFixes() {
  console.log('Initializing fixes...');
  
  // Wait for DOM to be fully ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFixes);
  } else {
    setupFixes();
  }
}

function setupFixes() {
  console.log('Setting up fixes...');
  
  // Fix 1: Dropdown functionality for notification icons
  fixDropdowns();
  
  // Fix 2: Settings panel toggle
  fixSettingsPanel();
}

function fixDropdowns() {
  // Handle clicks on dropdown toggle icons
  document.addEventListener('click', function(e) {
    // Check if we clicked on a dropdown toggle icon or its children
    const dropdownIcon = e.target.closest('.notification-area .dropdown > i.dropdown-toggle');
    
    if (dropdownIcon) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Dropdown icon clicked');
      
      const dropdownLi = dropdownIcon.closest('.dropdown');
      const dropdownMenu = dropdownLi.querySelector('.dropdown-menu');
      
      if (dropdownMenu) {
        // Close all other dropdown menus first
        document.querySelectorAll('.notification-area .dropdown-menu.show').forEach(menu => {
          if (menu !== dropdownMenu) {
            menu.classList.remove('show');
            menu.style.display = '';
          }
        });
        
        // Toggle this dropdown
        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.remove('show');
          dropdownMenu.style.display = '';
        } else {
          dropdownMenu.classList.add('show');
          dropdownMenu.style.display = 'block';
          
          // Position the dropdown
          const rect = dropdownIcon.getBoundingClientRect();
          dropdownMenu.style.position = 'absolute';
          dropdownMenu.style.top = '100%';
          dropdownMenu.style.right = '0';
          dropdownMenu.style.left = 'auto';
        }
      }
    }
    
    // Close dropdowns when clicking outside
    if (!e.target.closest('.notification-area .dropdown')) {
      document.querySelectorAll('.notification-area .dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
        menu.style.display = '';
      });
    }
  });
  
  // Prevent dropdown menu clicks from closing the dropdown
  document.querySelectorAll('.notification-area .dropdown-menu').forEach(menu => {
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
}

function fixSettingsPanel() {
  // Get elements
  const settingsBtn = document.querySelector('.settings-btn');
  const offsetArea = document.querySelector('.offset-area');
  const closeBtn = document.querySelector('.offset-btn-close');
  
  console.log('Settings elements found:', {
    settingsBtn: !!settingsBtn,
    offsetArea: !!offsetArea,
    closeBtn: !!closeBtn
  });
  
  // Settings button click
  if (settingsBtn) {
    // Remove any existing listeners
    const newSettingsBtn = settingsBtn.cloneNode(true);
    settingsBtn.parentNode.replaceChild(newSettingsBtn, settingsBtn);
    
    newSettingsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Settings button clicked');
      
      if (offsetArea) {
        offsetArea.classList.toggle('show_hide');
        newSettingsBtn.classList.toggle('active');
        console.log('Offset area toggled, has show_hide:', offsetArea.classList.contains('show_hide'));
      }
    });
    
    // Also handle click on the icon inside
    const settingsIcon = newSettingsBtn.querySelector('i');
    if (settingsIcon) {
      settingsIcon.style.cursor = 'pointer';
    }
  }
  
  // Close button click
  if (closeBtn && offsetArea) {
    // Remove any existing listeners
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    
    newCloseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Close button clicked');
      
      offsetArea.classList.remove('show_hide');
      
      const settingsBtn = document.querySelector('.settings-btn');
      if (settingsBtn) {
        settingsBtn.classList.remove('active');
      }
    });
    
    // Make the close button more clickable
    newCloseBtn.style.cursor = 'pointer';
    const closeIcon = newCloseBtn.querySelector('i');
    if (closeIcon) {
      closeIcon.style.cursor = 'pointer';
      closeIcon.style.pointerEvents = 'none'; // Let parent handle the click
    }
  }
}

// Auto-initialize when imported
initializeFixes();