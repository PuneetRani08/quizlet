// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });
    
    // Smooth scrolling for navigation links
    implementSmoothScrolling();
    
    // Initialize animated counters
    initCounters();
    
    // Add responsive navigation toggle
    setupMobileNavigation();
    
    // Implement parallax scrolling effect
    implementParallaxEffect();
    
    // Add typing animation to hero text
    initTypingAnimation();
    
    // Add scroll-triggered animations to sections
    animateSectionsOnScroll();
    
    // Initialize quiz preview functionality
    setupQuizPreviews();
    
    // Add interactive card flipping
    setupCardFlipping();
    
    // Initialize advanced search functionality
    setupAdvancedSearch();
});

/**
 * Implements smooth scrolling for navigation links
 */
function implementSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the href is not just "#"
            if(this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Sets up mobile responsive navigation
 */
function setupMobileNavigation() {
    // Create mobile menu toggle button
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fa fa-bars"></i>';
    header.insertBefore(menuToggle, navbar);
    
    // Add toggle functionality
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.classList.toggle('active');
        
        // Change icon based on state
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fa fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fa fa-bars"></i>';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                navbar.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa fa-bars"></i>';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && !menuToggle.contains(event.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fa fa-bars"></i>';
        }
    });
    
    // Update on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fa fa-bars"></i>';
        }
    });
}

/**
 * Implements parallax scrolling effect for hero section
 */
function implementParallaxEffect() {
    const heroItems = document.querySelectorAll('.carousel-item');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        heroItems.forEach(item => {
            // Only apply parallax if the element is visible
            const itemRect = item.getBoundingClientRect();
            
            if (itemRect.bottom > 0 && itemRect.top < window.innerHeight) {
                // Create parallax effect by moving the background position
                const translateY = scrollPosition * 0.3;
                item.style.backgroundPosition = `center ${-translateY}px`;
            }
        });
    });
}

/**
 * Initialize animated counters for statistics
 */
function initCounters() {
    // Add counter section HTML if it doesn't exist
    if (!document.querySelector('#counter-section')) {
        const counterSection = createCounterSection();
        const featuresSection = document.querySelector('.contain2');
        featuresSection.parentNode.insertBefore(counterSection, featuresSection);
    }
    
    const counters = document.querySelectorAll('.counter-value');
    let hasAnimated = false;
    
    // Function to animate counters
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const counterTimer = setInterval(() => {
                current += step;
                
                if (current >= target) {
                    current = target;
                    clearInterval(counterTimer);
                }
                
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
        
        hasAnimated = true;
    }
    
    // Run animation when counter section is in view
    const counterSection = document.querySelector('#counter-section');
    
    function checkIfInView() {
        if (!hasAnimated && isElementInViewport(counterSection)) {
            animateCounters();
        }
    }
    
    // Check on scroll and on page load
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
}

/**
 * Creates the counter section
 */
function createCounterSection() {
    const section = document.createElement('section');
    section.id = 'counter-section';
    section.className = 'py-5 counter-section';
    section.setAttribute('data-aos', 'fade-up');
    
    const html = `
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3 col-6 mb-4">
                    <div class="counter-box">
                        <i class="fa fa-users fa-3x mb-3"></i>
                        <h3 class="counter-value" data-count="15000">0</h3>
                        <p>Active Users</p>
                    </div>
                </div>
                <div class="col-md-3 col-6 mb-4">
                    <div class="counter-box">
                        <i class="fa fa-book fa-3x mb-3"></i>
                        <h3 class="counter-value" data-count="1200">0</h3>
                        <p>Quizzes Created</p>
                    </div>
                </div>
                <div class="col-md-3 col-6 mb-4">
                    <div class="counter-box">
                        <i class="fa fa-trophy fa-3x mb-3"></i>
                        <h3 class="counter-value" data-count="500">0</h3>
                        <p>Competitions</p>
                    </div>
                </div>
                <div class="col-md-3 col-6 mb-4">
                    <div class="counter-box">
                        <i class="fa fa-globe fa-3x mb-3"></i>
                        <h3 class="counter-value" data-count="25">0</h3>
                        <p>Countries</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    section.innerHTML = html;
    return section;
}

/**
 * Initialize typing animation
 */
function initTypingAnimation() {
    // Check if hero section has caption with typing animation class
    const heroCaption = document.querySelector('.carousel-item.active .carousel-caption h5');
    
    if (heroCaption) {
        // Add typing animation to first slide title
        const originalText = heroCaption.textContent;
        heroCaption.textContent = "";
        heroCaption.classList.add('typing-animation');
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroCaption.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Wait a bit before starting typing animation
        setTimeout(typeWriter, 500);
        
        // Add typing animation on carousel slide change
        const carousel = document.querySelector('#heroCarousel');
        carousel.addEventListener('slid.bs.carousel', function() {
            const activeCaption = document.querySelector('.carousel-item.active .carousel-caption h5');
            if (activeCaption) {
                const text = activeCaption.textContent;
                activeCaption.textContent = "";
                activeCaption.classList.add('typing-animation');
                
                let j = 0;
                const typeText = () => {
                    if (j < text.length) {
                        activeCaption.textContent += text.charAt(j);
                        j++;
                        setTimeout(typeText, 100);
                    }
                };
                
                setTimeout(typeText, 200);
            }
        });
    }
}

/**
 * Add animation to sections when scrolled into view
 */
function animateSectionsOnScroll() {
    // Add data-aos attributes to sections
    const sections = [
        { selector: '#card-section h1', animation: 'fade-down' },
        { selector: '.child-classquiz', animation: 'zoom-in' },
        { selector: '#testimonials h2', animation: 'fade-up' },
        { selector: '.blockquote', animation: 'fade-in' },
        { selector: '#features h2', animation: 'fade-down' },
        { selector: '#features .col-md-4', animation: 'flip-up' },
        { selector: '#blog h2', animation: 'fade-down' },
        { selector: '.card1', animation: 'fade-up' }
    ];
    
    sections.forEach(section => {
        const elements = document.querySelectorAll(section.selector);
        elements.forEach((el, index) => {
            el.setAttribute('data-aos', section.animation);
            el.setAttribute('data-aos-delay', index * 100);
        });
    });
}

/**
 * Utility function to check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

/**
 * Initialize quiz preview functionality
 */
function setupQuizPreviews() {
    // Create preview modal if it doesn't exist
    if (!document.getElementById('quizPreviewModal')) {
        const modalHTML = `
            <div class="modal fade" id="quizPreviewModal" tabindex="-1" aria-labelledby="quizPreviewModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="quizPreviewModalLabel">Quiz Preview</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="quiz-preview-content">
                                <div class="quiz-question">
                                    <h4 id="previewQuestion">Sample Question</h4>
                                    <div class="options-container">
                                        <div class="option"><input type="radio" name="quiz-option" id="option1"><label for="option1">Option 1</label></div>
                                        <div class="option"><input type="radio" name="quiz-option" id="option2"><label for="option2">Option 2</label></div>
                                        <div class="option"><input type="radio" name="quiz-option" id="option3"><label for="option3">Option 3</label></div>
                                        <div class="option"><input type="radio" name="quiz-option" id="option4"><label for="option4">Option 4</label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="startFullQuiz">Start Full Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Add preview buttons to event cards
    const eventCards = document.querySelectorAll('.child-classquiz');
    eventCards.forEach((card, index) => {
        const previewButton = document.createElement('button');
        previewButton.className = 'preview-button btn btn-outline-primary mt-3';
        previewButton.textContent = 'Preview Quiz';
        previewButton.setAttribute('data-toggle', 'modal');
        previewButton.setAttribute('data-target', '#quizPreviewModal');
        previewButton.setAttribute('data-quiz-id', index + 1);
        
        const cardBody = card.querySelector('.card-body');
        cardBody.appendChild(previewButton);
        
        // Add hover effect
        card.classList.add('quiz-card-hover');
    });
    
    // Handle preview button clicks
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('preview-button')) {
            const quizId = e.target.getAttribute('data-quiz-id');
            updateQuizPreview(quizId);
        }
    });
    
    // Sample quiz data
    const quizSamples = {
        '1': {
            question: 'Which planet is known as the Red Planet?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn']
        },
        '2': {
            question: 'Who wrote "Romeo and Juliet"?',
            options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain']
        },
        '3': {
            question: 'What is the capital of Japan?',
            options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok']
        }
    };
    
    // Update quiz preview content
    function updateQuizPreview(quizId) {
        const previewQuestion = document.getElementById('previewQuestion');
        const optionLabels = document.querySelectorAll('.option label');
        
        const quizData = quizSamples[quizId] || quizSamples['1'];
        
        previewQuestion.textContent = quizData.question;
        
        optionLabels.forEach((label, index) => {
            label.textContent = quizData.options[index] || `Option ${index + 1}`;
        });
    }
}

/**
 * Setup card flipping animation
 */
function setupCardFlipping() {
    // Add flip container class to card1 elements
    const blogCards = document.querySelectorAll('.card1');
    
    blogCards.forEach(card => {
        // Create wrapper for flip effect
        const cardContainer = document.createElement('div');
        cardContainer.className = 'flip-container';
        
        const flipper = document.createElement('div');
        flipper.className = 'flipper';
        
        const front = document.createElement('div');
        front.className = 'front';
        
        const back = document.createElement('div');
        back.className = 'back';
        
        // Clone the card for front side
        const cardClone = card.cloneNode(true);
        front.appendChild(cardClone);
        
        // Create back side content
        back.innerHTML = `
            <div class="card-body text-center d-flex flex-column justify-content-center">
                <h5 class="card-title">Quiz Highlights</h5>
                <ul class="list-unstyled">
                    <li>✓ Interactive questions</li>
                    <li>✓ Real-time feedback</li>
                    <li>✓ Score tracking</li>
                    <li>✓ Challenge friends</li>
                </ul>
                <button class="btn btn-primary mt-3">Join Now</button>
            </div>
        `;
        
        // Assemble the flip container
        flipper.appendChild(front);
        flipper.appendChild(back);
        cardContainer.appendChild(flipper);
        
        // Replace original card with flip container
        card.parentNode.replaceChild(cardContainer, card);
        
        // Add hover class to trigger flip
        cardContainer.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        cardContainer.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

/**
 * Setup advanced search functionality
 */
function setupAdvancedSearch() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-icon">
            <i class="fa fa-search"></i>
        </div>
        <div class="search-input-container">
            <input type="text" class="search-input" placeholder="Search for quizzes...">
            <div class="search-dropdown">
                <div class="search-filters">
                    <h4>Filter by Category</h4>
                    <div class="filter-options">
                        <label><input type="checkbox" value="science"> Science</label>
                        <label><input type="checkbox" value="history"> History</label>
                        <label><input type="checkbox" value="math"> Mathematics</label>
                        <label><input type="checkbox" value="literature"> Literature</label>
                    </div>
                    <h4>Difficulty Level</h4>
                    <div class="filter-options">
                        <label><input type="radio" name="difficulty" value="beginner"> Beginner</label>
                        <label><input type="radio" name="difficulty" value="intermediate"> Intermediate</label>
                        <label><input type="radio" name="difficulty" value="advanced"> Advanced</label>
                    </div>
                    <button class="btn btn-primary btn-sm mt-3">Apply Filters</button>
                </div>
                <div class="quick-results">
                    <h4>Popular Searches</h4>
                    <ul>
                        <li><a href="#">Science Quiz: Solar System</a></li>
                        <li><a href="#">History: World War II</a></li>
                        <li><a href="#">Math Challenge: Calculus</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Add search container to header
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    header.insertBefore(searchContainer, navbar.nextSibling);
    
    // Handle search icon click
    const searchIcon = document.querySelector('.search-icon');
    const searchInputContainer = document.querySelector('.search-input-container');
    
    searchIcon.addEventListener('click', function() {
        searchInputContainer.classList.toggle('active');
        this.classList.toggle('active');
        
        if (searchInputContainer.classList.contains('active')) {
            document.querySelector('.search-input').focus();
        }
    });
    
    // Close search dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchContainer.contains(event.target)) {
            searchInputContainer.classList.remove('active');
            searchIcon.classList.remove('active');
        }
    });
    
    // Handle search input
    const searchInput = document.querySelector('.search-input');
    const searchDropdown = document.querySelector('.search-dropdown');
    
    searchInput.addEventListener('focus', function() {
        searchDropdown.classList.add('active');
    });
    
    // Don't close dropdown when clicking inside it
    searchDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Setup search functionality
    searchInput.addEventListener('input', function() {
        // Simulate search results (would be replaced with actual search)
        if (this.value.length > 2) {
            // Show quick results with animated appearance
            const quickResults = document.querySelector('.quick-results');
            quickResults.style.display = 'block';
            
            // Add animation to each result
            const resultItems = quickResults.querySelectorAll('li');
            resultItems.forEach((item, index) => {
                item.style.animation = `fadeIn 0.3s ${index * 0.1}s forwards`;
            });
        }
    });
}