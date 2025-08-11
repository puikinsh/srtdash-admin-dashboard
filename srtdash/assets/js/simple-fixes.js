// Simple fixes for dropdowns and settings panel
// This works with the existing HTML structure

(function() {
    'use strict';
    
    // Wait for jQuery to be available since the template uses it
    function initFixes() {
        
        // Fix 1: Dropdown functionality for notification icons
        $('.notification-area .dropdown > i.dropdown-toggle').off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var $dropdown = $(this).parent();
            var $menu = $dropdown.find('.dropdown-menu');
            
            // Close all other dropdowns
            $('.notification-area .dropdown-menu').not($menu).removeClass('show').hide();
            
            // Toggle this dropdown
            $menu.toggleClass('show');
            if ($menu.hasClass('show')) {
                $menu.show();
            } else {
                $menu.hide();
            }
        });
        
        // Close dropdowns when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.notification-area .dropdown').length) {
                $('.notification-area .dropdown-menu').removeClass('show').hide();
            }
        });
        
        // Fix 2: Settings panel with close button and overlay
        
        // Add close button if it doesn't exist
        if ($('.offset-area').length && !$('.offset-area .offset-close-btn').length) {
            $('.offset-area').prepend('<div class="offset-close-btn" style="position: absolute; top: 15px; right: 15px; cursor: pointer; font-size: 24px; z-index: 10;"><i class="ti-close"></i></div>');
        }
        
        // Add overlay if it doesn't exist
        if (!$('.offset-overlay').length) {
            $('body').append('<div class="offset-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1040; display: none;"></div>');
        }
        
        // Settings button click
        $('.settings-btn').off('click').on('click', function(e) {
            e.preventDefault();
            $('.offset-area').addClass('show_hide');
            $('.offset-overlay').fadeIn(200);
        });
        
        // Close button click
        $(document).on('click', '.offset-close-btn, .offset-btn-close', function(e) {
            e.preventDefault();
            $('.offset-area').removeClass('show_hide');
            $('.offset-overlay').fadeOut(200);
            $('.settings-btn').removeClass('active');
        });
        
        // Overlay click (close when clicking outside)
        $('.offset-overlay').off('click').on('click', function() {
            $('.offset-area').removeClass('show_hide');
            $(this).fadeOut(200);
            $('.settings-btn').removeClass('active');
        });
        
        // Fix 3: Remove text shadows from icons
        $('.notification-area i').css('text-shadow', 'none');
        
        console.log('Simple fixes applied successfully!');
    }
    
    // Initialize when document is ready
    if (typeof jQuery !== 'undefined') {
        $(document).ready(function() {
            initFixes();
        });
    } else {
        // If jQuery isn't loaded yet, wait a bit
        setTimeout(initFixes, 1000);
    }
    
})();