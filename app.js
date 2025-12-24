// app.js - Minimal JavaScript for UI simulation only
// Active navigation highlighting, pill/toggle state feedback, fake progress bars, non-functional button visual responses
// No data persistence or real uploads

(function() {
    'use strict';

    // ============================================================================
    // NAVIGATION HIGHLIGHTING
    // ============================================================================
    
    function setActiveNavigation() {
        const navLinks = document.querySelectorAll('[data-nav-link]');

        const normalizeRoute = (pathname) => {
            if (!pathname) return 'index';
            const cleanPath = pathname.split('#')[0].split('?')[0];
            const segments = cleanPath.split('/').filter(Boolean);
            let last = segments.pop() || '';

            if (!last) return 'index';
            if (last === 'index.html') return 'index';
            if (last.endsWith('.html')) return last.replace('.html', '');
            return last;
        };

        const currentRoute = normalizeRoute(window.location.pathname);

        navLinks.forEach(link => {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');

            const linkRoute = normalizeRoute(new URL(link.getAttribute('href'), window.location.href).pathname);

            if (linkRoute === currentRoute) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // ============================================================================
    // PILL SELECTOR TOGGLES (Genre buttons)
    // ============================================================================
    
    function initializePillToggles() {
        const pillContainers = document.querySelectorAll('[data-genre-pill]');
        
        pillContainers.forEach(pill => {
            pill.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove selected from all pills in the same group
                const pillGroup = this.closest('.pill-group, .genre-grid');
                if (pillGroup) {
                    pillGroup.querySelectorAll('[data-genre-pill]').forEach(p => {
                        p.classList.remove('selected');
                    });
                }
                
                // Add selected to this pill
                this.classList.add('selected');
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
                
                console.log(`Genre pill toggled: ${this.textContent.trim()}, Selected: ${this.classList.contains('selected')}`);
            });
        });
    }

    // ============================================================================
    // LIGHTING & MOOD SWITCHES
    // ============================================================================
    
    function initializeMoodToggles() {
        const moodSwitches = document.querySelectorAll('[data-mood-toggle]');
        
        moodSwitches.forEach(switchBtn => {
            switchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove 'on' from all mood toggles in the same group
                const moodGroup = this.closest('.pill-group, .mood-switcher');
                if (moodGroup) {
                    moodGroup.querySelectorAll('[data-mood-toggle]').forEach(m => {
                        m.classList.remove('on');
                    });
                }
                
                // Add 'on' to this mood toggle
                this.classList.add('on');
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
                
                console.log(`Mood/Lighting toggled: ${this.textContent.trim()}, On: ${this.classList.contains('on')}`);
            });
        });
    }

    // ============================================================================
    // RESOLUTION & FORMAT OPTION TOGGLES
    // ============================================================================
    
    function initializeResolutionOptions() {
        const resolutionOptions = document.querySelectorAll('[data-resolution-option]');
        
        resolutionOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle chosen state
                this.classList.toggle('chosen');
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
                
                console.log(`Resolution option toggled: ${this.textContent.trim()}, Chosen: ${this.classList.contains('chosen')}`);
            });
        });
    }
    
    function initializeFormatSelects() {
        const formatOptions = document.querySelectorAll('[data-format-select]');
        
        formatOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle chosen state
                this.classList.toggle('chosen');
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
                
                console.log(`Format option toggled: ${this.textContent.trim()}, Chosen: ${this.classList.contains('chosen')}`);
            });
        });
    }

    // ============================================================================
    // FAKE PROGRESS INDICATOR ANIMATION
    // ============================================================================
    
    function animateProgressBar(progressContainer) {
        const progressBar = progressContainer.querySelector('[data-progress-fill], .progress-fill, .progress-bar-fill');
        const progressText = progressContainer.querySelector('.progress-text, .progress-label');
        const progressSegments = progressContainer.querySelectorAll('.progress-segment');
        
        let progress = 0;
        const duration = 1200; // 1.2 seconds as per contract
        const intervalTime = 30;
        const increment = (100 / duration) * intervalTime;
        
        progressContainer.style.display = 'block';
        progressContainer.style.opacity = '1';
        
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        const interval = setInterval(() => {
            progress += increment;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Hide after completion
                setTimeout(() => {
                    progressContainer.style.opacity = '0';
                    setTimeout(() => {
                        progressContainer.style.display = 'none';
                        if (progressBar) progressBar.style.width = '0%';
                    }, 300);
                }, 500);
            }
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${Math.round(progress)}%`;
            }
            
            // Animate segments if they exist
            if (progressSegments.length > 0) {
                const activeSegments = Math.floor((progress / 100) * progressSegments.length);
                progressSegments.forEach((segment, index) => {
                    if (index < activeSegments) {
                        segment.classList.add('complete');
                        segment.classList.remove('active');
                    } else if (index === activeSegments) {
                        segment.classList.add('active');
                    } else {
                        segment.classList.remove('active', 'complete');
                    }
                });
            }
        }, intervalTime);
        
        console.log('Progress animation started');
    }

    // ============================================================================
    // LOADING SPINNER
    // ============================================================================
    
    function showLoadingSpinner(button) {
        const spinner = document.querySelector('[data-loading-spinner], .loading-spinner, .spinner-overlay');
        
        if (spinner) {
            spinner.style.display = 'flex';
            spinner.style.opacity = '1';
            
            // Hide after 1.2 seconds
            setTimeout(() => {
                spinner.style.opacity = '0';
                setTimeout(() => {
                    spinner.style.display = 'none';
                }, 300);
            }, 1200);
        } else {
            // Create inline spinner if none exists
            const inlineSpinner = document.createElement('span');
            inlineSpinner.className = 'inline-spinner';
            inlineSpinner.innerHTML = '?';
            inlineSpinner.style.display = 'inline-block';
            inlineSpinner.style.marginLeft = '8px';
            inlineSpinner.style.animation = 'spin 1s linear infinite';
            
            button.appendChild(inlineSpinner);
            
            setTimeout(() => {
                inlineSpinner.remove();
            }, 1200);
        }
    }

    // ============================================================================
    // GENERATE / REGENERATE BUTTON HANDLERS
    // ============================================================================
    
    function initializeGenerateButtons() {
        const generateButtons = document.querySelectorAll('[data-action="simulate"]');
        
        generateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Visual feedback
                this.style.transform = 'scale(0.96)';
                this.disabled = true;
                this.classList.add('loading');
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Show loading spinner
                showLoadingSpinner(this);
                
                // Trigger progress bar if it exists
                const progressContainer = document.querySelector('[data-progress-container]');
                if (progressContainer) {
                    animateProgressBar(progressContainer);
                }
                
                // Re-enable button after animation
                setTimeout(() => {
                    this.disabled = false;
                    this.classList.remove('loading');
                }, 1200);
                
                console.log(`Generate button clicked: ${this.textContent.trim()}`);
            });
        });
    }

    // ============================================================================
    // SLIDER STATE FEEDBACK (if sliders exist)
    // ============================================================================
    
    function initializeSliders() {
        const sliders = document.querySelectorAll('input[type="range"]');
        
        sliders.forEach(slider => {
            const updateValue = () => {
                const value = slider.value;
                const max = slider.max || 100;
                const percentage = (value / max) * 100;
                
                // Update visual feedback using CSS variables
                slider.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%, rgba(255, 255, 255, 0.1) 100%)`;
                
                // Update associated label if exists
                const label = slider.parentElement.querySelector('.slider-value, .range-value, [data-slider-value]');
                if (label) {
                    label.textContent = value;
                }
                
                console.log(`Slider adjusted: ${slider.name || slider.id}, Value: ${value}`);
            };
            
            slider.addEventListener('input', updateValue);
            slider.addEventListener('change', updateValue);
            
            // Initialize
            updateValue();
        });
    }

    // ============================================================================
    // UPLOAD AREA INTERACTION (visual only)
    // ============================================================================
    
    function initializeUploadAreas() {
        const uploadAreas = document.querySelectorAll('.upload-area, [class*="upload"]');
        
        uploadAreas.forEach(area => {
            const fileInput = area.querySelector('input[type="file"]');
            
            if (fileInput) {
                // Click to upload
                area.addEventListener('click', function(e) {
                    if (e.target !== fileInput) {
                        fileInput.click();
                    }
                });
                
                // Drag and drop visual feedback
                area.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'var(--color-primary)';
                    this.style.background = 'rgba(255, 0, 255, 0.1)';
                });
                
                area.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.style.borderColor = '';
                    this.style.background = '';
                });
                
                area.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.style.borderColor = '';
                    this.style.background = '';
                    
                    console.log('File drop detected (no actual upload)');
                    
                    // Visual feedback only
                    const feedback = document.createElement('div');
                    feedback.textContent = '? File selected';
                    feedback.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--color-primary); font-weight: 600; z-index: 10;';
                    this.style.position = 'relative';
                    this.appendChild(feedback);
                    
                    setTimeout(() => {
                        feedback.remove();
                    }, 2000);
                });
                
                // File input change (visual feedback only)
                fileInput.addEventListener('change', function(e) {
                    if (this.files && this.files[0]) {
                        console.log('File selected (no actual upload):', this.files[0].name);
                        
                        const feedback = document.createElement('div');
                        feedback.textContent = `? ${this.files[0].name}`;
                        feedback.style.cssText = 'margin-top: 8px; color: var(--color-accent); font-size: 14px; text-align: center;';
                        
                        const existingFeedback = area.querySelector('.file-feedback');
                        if (existingFeedback) {
                            existingFeedback.remove();
                        }
                        
                        feedback.className = 'file-feedback';
                        area.appendChild(feedback);
                    }
                });
            }
        });
    }

    // ============================================================================
    // GENERAL BUTTON VISUAL FEEDBACK
    // ============================================================================
    
    function initializeButtonFeedback() {
        const allButtons = document.querySelectorAll('button, .btn, [role="button"]');
        
        allButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Skip if already handled by other handlers
                if (this.hasAttribute('data-genre-pill') || 
                    this.hasAttribute('data-mood-toggle') ||
                    this.hasAttribute('data-resolution-option') ||
                    this.hasAttribute('data-format-select') ||
                    this.hasAttribute('data-action')) {
                    return;
                }
                
                // Generic button feedback
                this.style.transform = 'scale(0.96)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // ============================================================================
    // KEYBOARD ACCESSIBILITY ENHANCEMENTS
    // ============================================================================
    
    function enhanceKeyboardNavigation() {
        const interactiveElements = document.querySelectorAll('[data-genre-pill], [data-mood-toggle], [data-resolution-option], [data-format-select], .upload-area');
        
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
            
            element.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // ============================================================================
    // ADD SPINNER ANIMATION STYLES IF NOT PRESENT
    // ============================================================================
    
    function injectSpinnerStyles() {
        if (!document.querySelector('#app-spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'app-spinner-styles';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .inline-spinner {
                    display: inline-block;
                    animation: spin 1s linear infinite;
                }
                
                .progress-segment {
                    transition: all 0.3s ease;
                }
                
                .progress-segment.active {
                    background: var(--gradient-primary);
                }
                
                .progress-segment.complete {
                    background: var(--color-cyan);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================
    
    function init() {
        console.log('RockMeAI app.js initialized');
        
        // Inject required styles
        injectSpinnerStyles();
        
        // Integrity check
        if (!document.getElementById('rockstar-preview')) {
            console.warn('Missing required element: #rockstar-preview');
        }
        if (!document.querySelector('[role="navigation"]')) {
            console.warn('Missing required element: navigation with role="navigation"');
        }
        
        // Set active navigation on page load
        setActiveNavigation();
        
        // Initialize all interactive components
        initializePillToggles();
        initializeMoodToggles();
        initializeResolutionOptions();
        initializeFormatSelects();
        initializeGenerateButtons();
        initializeSliders();
        initializeUploadAreas();
        initializeButtonFeedback();
        enhanceKeyboardNavigation();
        
        console.log('All UI interactions initialized (stateless)');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-run navigation highlighting on history change (for SPAs)
    window.addEventListener('popstate', setActiveNavigation);
    
})();
