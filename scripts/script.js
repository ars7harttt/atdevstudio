// Generate Ultra Smooth Skyfall
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const numberOfStars = 35;
    const sizes = ['small', 'medium', 'large'];
    
    function createStar() {
        const star = document.createElement('div');
        star.className = `star ${sizes[Math.floor(Math.random() * sizes.length)]}`;
        
        // Random starting position across the top (ensure it stays within viewport)
        const maxLeft = 95; // Keep stars within 95% to prevent overflow
        star.style.left = Math.random() * maxLeft + '%';
        star.style.top = '0';
        
        // Variable duration for different speeds - smoother range
        const duration = Math.random() * 2.5 + 3; // 3-5.5 seconds for smoother motion
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = '0s';
        star.style.animationTimingFunction = 'linear';
        
        // Ensure stars don't overflow horizontally
        star.style.maxWidth = '4px';
        star.style.maxHeight = '4px';
        
        starsContainer.appendChild(star);
        
        // Remove star after animation completes
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, duration * 1000 + 100);
    }
    
    // Create initial stars with staggered timing
    for (let i = 0; i < numberOfStars; i++) {
        setTimeout(() => createStar(), i * 150);
    }
    
    // Continuously create new stars for seamless skyfall effect
    const createInterval = setInterval(() => {
        createStar();
    }, 180);
    
    // Keep generating stars continuously
    return createInterval;
}

// Initialize stars on page load
createStars();

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll for Anchor Links - Extra smooth on mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            // Use requestAnimationFrame for smoother scrolling on mobile
            if (window.innerWidth <= 768) {
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 800; // milliseconds
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Easing function for smooth deceleration
                    const ease = 1 - Math.pow(1 - percentage, 3);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < duration) {
                        requestAnimationFrame(step);
                    }
                }
                
                requestAnimationFrame(step);
            } else {
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .testimonial-card, .pricing-card, .process-step');

animatedElements.forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Task List Animation (stagger effect)
const taskLists = document.querySelectorAll('.task-list');
taskLists.forEach(list => {
    const items = list.querySelectorAll('.task-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Analyzing Animation Loop
const analyzingItems = document.querySelectorAll('.analyzing-item');
if (analyzingItems.length > 0) {
    setInterval(() => {
        analyzingItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0.5';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 200);
            }, index * 100);
        });
    }, 3000);
}

// Contact List Animation (carousel effect)
const contactsLists = document.querySelectorAll('.contacts-list');
contactsLists.forEach(list => {
    const contacts = list.querySelectorAll('.contact-item');
    if (contacts.length > 2) {
        let currentIndex = 0;
        setInterval(() => {
            contacts.forEach((contact, index) => {
                if (index >= currentIndex && index < currentIndex + 2) {
                    contact.style.display = 'block';
                    contact.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    contact.style.display = 'none';
                }
            });
            currentIndex = (currentIndex + 1) % (contacts.length - 1);
        }, 4000);
    }
});

// Pricing Toggle
const pricingToggles = document.querySelectorAll('.toggle-btn');
pricingToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const container = toggle.closest('.pricing-toggle');
        container.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        toggle.classList.add('active');
        
        // Update pricing amounts (example - you can customize this)
        const amountElements = document.querySelectorAll('.price .amount');
        const isAnnual = toggle.textContent === 'Annually';
        
        amountElements.forEach(amountEl => {
            const currentAmount = parseFloat(amountEl.textContent);
            if (!isNaN(currentAmount)) {
                if (isAnnual) {
                    amountEl.textContent = Math.round(currentAmount * 10); // 10 months price
                } else {
                    amountEl.textContent = Math.round(currentAmount / 10 * 1.2); // Back to monthly
                }
            }
        });
    });
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress-fill');
progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
        bar.style.transition = 'width 2s ease-out';
        bar.style.width = width;
    }, 500);
});

// Email Status Animation
const emailStatusTexts = document.querySelectorAll('.email-status-text');
emailStatusTexts.forEach(text => {
    const dots = ['', '.', '..', '...'];
    let dotIndex = 0;
    const baseText = text.textContent.replace(/\.+$/, '');
    
    setInterval(() => {
        text.textContent = baseText + dots[dotIndex % dots.length];
        dotIndex++;
    }, 500);
});

// Calendar Day Animation
const calendarDays = document.querySelectorAll('.calendar-day');
calendarDays.forEach((day, index) => {
    day.style.animationDelay = `${index * 0.05}s`;
    day.style.animation = 'fadeIn 0.3s ease-out';
    day.style.animationFillMode = 'both';
});

// Chat Action Buttons Hover Effect
const chatActionButtons = document.querySelectorAll('.chat-action-btn');
chatActionButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Filter Button Active State
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const container = this.closest('.email-filters');
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Tab Button Active State
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const container = this.closest('.email-tabs');
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Add fade-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', () => {
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
    
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Code Block Typing Animation (optional enhancement)
const codeBlocks = document.querySelectorAll('.code-block code');
codeBlocks.forEach(block => {
    const originalText = block.textContent;
    block.textContent = '';
    let index = 0;
    
    const typeCode = () => {
        if (index < originalText.length) {
            block.textContent += originalText[index];
            index++;
            setTimeout(typeCode, 30);
        }
    };
    
    // Start typing when element is in view
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && block.textContent === '') {
                typeCode();
                codeObserver.unobserve(block);
            }
        });
    });
    
    codeObserver.observe(block.parentElement);
});

// Newsletter Form Handling
const newsletterForms = document.querySelectorAll('.newsletter');
newsletterForms.forEach(form => {
    const button = form.querySelector('button');
    const input = form.querySelector('input');
    
    if (button && input) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (input.value) {
                alert('Thank you for subscribing!');
                input.value = '';
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                button.click();
            }
        });
    }
});

console.log('AT Dev Studio Website Loaded Successfully! 🚀');

// AI Assistant Widget
const aiAssistantButton = document.getElementById('aiAssistantButton');
const aiAssistantChat = document.getElementById('aiAssistantChat');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatSend = document.getElementById('aiChatSend');
const aiChatMessages = document.getElementById('aiChatMessages');

if (aiAssistantButton && aiAssistantChat) {
    // Toggle chat window
    aiAssistantButton.addEventListener('click', () => {
        aiAssistantChat.classList.toggle('active');
        if (aiAssistantChat.classList.contains('active')) {
            aiChatInput.focus();
        }
    });

    // Close chat
    if (aiChatClose) {
        aiChatClose.addEventListener('click', () => {
            aiAssistantChat.classList.remove('active');
        });
    }

    // Send message function
    const sendMessage = () => {
        const message = aiChatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        aiChatInput.value = '';

        // Simulate AI response (you can replace this with actual API call)
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response, 'bot');
        }, 500);
    };

    // Add message to chat
    const addMessage = (text, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${type}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'ai-message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        
        contentDiv.appendChild(p);
        messageDiv.appendChild(contentDiv);
        aiChatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    };

    // Generate AI response (placeholder - replace with actual AI integration)
    const generateAIResponse = (userMessage) => {
        const message = userMessage.toLowerCase();
        
        // Simple keyword-based responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm here to help you learn more about AT Dev Studio's website development services. We create custom websites that look sharp, load fast, and bring results. What would you like to know?";
        }
        
        if (message.includes('service') || message.includes('what do you do') || message.includes('what services')) {
            return "We offer three main services: 1) Custom Website Development - building modern, fast websites from landing pages to full business sites, 2) UI/UX Design - creating user-friendly designs with responsive layouts and strong visual hierarchy, and 3) Performance & Optimization - ensuring your site loads fast, is SEO-ready, and has clean code. Would you like to know more about any specific service?";
        }
        
        if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('how much')) {
            return "We provide custom quotes based on your specific needs and project scope. The best way to get an accurate price is to book a call with us or fill out our contact form. We'll discuss your requirements and provide a clear plan with pricing. Would you like to schedule a call?";
        }
        
        if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
            return "You can reach us at team.atdevstudio@gmail.com or call us at +1 (818) 691-6536 or +1 (747) 252-3084. You can also fill out the contact form on our website to get a quote or book a call!";
        }
        
        if (message.includes('website') || message.includes('web development') || message.includes('build')) {
            return "We build custom websites tailored to your business needs. Our process starts with planning and discovery to understand your goals, then we design and develop a modern, fast-loading website optimized for performance and SEO. Every site is built to grow with your business. Would you like to learn more about our process?";
        }
        
        if (message.includes('process') || message.includes('how do you work') || message.includes('workflow')) {
            return "Our process is simple and clear: Step 1 - Planning & Discovery where we understand your business, goals, target audience, and website structure. Step 2 - Design & Development where we create a modern, clean design and build it with optimized code. We keep you informed throughout and ensure your site is ready to launch. Want to know more details?";
        }
        
        if (message.includes('design') || message.includes('ui') || message.includes('ux')) {
            return "We create modern, user-friendly designs that guide visitors naturally toward action. Our designs feature clean layouts, strong visual hierarchy, and mobile-first responsive design. We also help with brand identity and user experience optimization. Is there a specific design aspect you're interested in?";
        }
        
        if (message.includes('speed') || message.includes('performance') || message.includes('optimization') || message.includes('fast')) {
            return "Performance is a priority for us. We optimize your website for speed, SEO basics, and performance from day one. This includes lightweight code, optimized images, responsive layouts, and clean markup. Your site will load fast and perform well across all devices. Would you like to know more about our optimization approach?";
        }
        
        if (message.includes('quote') || message.includes('estimate') || message.includes('book a call')) {
            return "Great! You can get a quote by filling out our contact form or booking a call with us. Just let us know about your business and what you need, and we'll provide a clear plan and pricing. You can reach us at team.atdevstudio@gmail.com or call +1 (818) 691-6536 or +1 (747) 252-3084.";
        }
        
        // Default response
        return "That's a great question! I'd be happy to help you learn more about AT Dev Studio. We create custom websites that look sharp, load fast, and bring results. You can ask me about our services (website development, UI/UX design, performance optimization), our process, pricing, or how to get started. Feel free to contact us directly for more detailed information!";
    };

    // Send on button click
    if (aiChatSend) {
        aiChatSend.addEventListener('click', sendMessage);
    }

    // Send on Enter key
    if (aiChatInput) {
        aiChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (aiAssistantChat.classList.contains('active')) {
            if (!aiAssistantChat.contains(e.target) && !aiAssistantButton.contains(e.target)) {
                aiAssistantChat.classList.remove('active');
            }
        }
    });
}

// Luxury Smooth Motion Enhancements (non-invasive)
(() => {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Elements to reveal on scroll (keeps existing layout/content intact)
  const revealTargets = document.querySelectorAll(
    '.hero-title, .hero-subtitle, .hero-buttons, .section-title, .section-subtitle,' +
    ' .service-card, .benefit-card, .pricing-card, .testimonial-card, .process-step, .faq-item'
  );

  revealTargets.forEach(el => {
    el.classList.add('lux-reveal');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Stagger within the same parent for a premium feel
      const parent = el.parentElement;
      let idx = 0;
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll('.lux-reveal'));
        idx = Math.max(0, siblings.indexOf(el));
      }
      const delay = Math.min(idx * 90, 360);
      el.style.transitionDelay = `${delay}ms`;

      requestAnimationFrame(() => el.classList.add('lux-in'));

      // Reset transition-delay after the reveal finishes.
      // If we leave transition-delay on the element, it also delays hover
      // transitions (borders/shadows), which can look like animations are
      // "on hold" for about a second.
      const revealDuration = 900; // matches CSS --dur-lux
      window.setTimeout(() => {
        el.style.transitionDelay = '0ms';
      }, delay + revealDuration + 50);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  revealTargets.forEach(el => io.observe(el));

  // Cursor-follow glow on cards (subtle)
  const glowCards = document.querySelectorAll('.service-card, .benefit-card, .pricing-card, .testimonial-card');
  glowCards.forEach(card => card.classList.add('lux-glow'));

  let rafPending = false;
  let lastEvt = null;

  const updateGlow = () => {
    rafPending = false;
    if (!lastEvt) return;

    const card = lastEvt.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((lastEvt.clientX - rect.left) / rect.width) * 100;
    const y = ((lastEvt.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      lastEvt = e;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(updateGlow);
    }, { passive: true });
  });

  // Ultra-subtle hero parallax (luxury, not gimmicky)
  // Disabled on mobile for better performance and smoothness
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && window.innerWidth > 768) {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const offset = Math.min(y * 0.06, 18); // subtle
        heroContent.style.transform = `translate3d(0, ${offset}px, 0)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

// Initialize Intl-Tel-Input if available
let phoneInputInstance = null;
if (typeof intlTelInput !== 'undefined') {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInputInstance = intlTelInput(phoneInput, {
      initialCountry: 'us',
      separateDialCode: true,
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js',
    });
  }
}

// Contact Form Submission Handler with Resend
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('.contact-submit');
    const originalText = submitButton.textContent;
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';
    submitButton.style.cursor = 'not-allowed';
    
    // Get form data
    let phoneValue = '';
    if (phoneInputInstance) {
      // Get full international number from intl-tel-input
      phoneValue = phoneInputInstance.getNumber();
    } else {
      phoneValue = document.getElementById('phone')?.value.trim() || '';
    }
    
    const formData = {
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: phoneValue,
      message: document.getElementById('message').value.trim(),
    };
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      showNotification('Please fill in all required fields.', 'error');
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      submitButton.style.opacity = '1';
      submitButton.style.cursor = 'pointer';
      return;
    }
    
    try {
      // Determine API URL (use relative path for Vercel, or localhost for development)
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/contact'
        : '/api/contact';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Show success message
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.background = 'var(--light-green)';
        submitButton.style.color = 'var(--black)';
        submitButton.style.borderColor = 'var(--light-green)';
        
        // Reset form
        contactForm.reset();
        
        // Show success notification
        showNotification(data.message || 'Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          submitButton.style.opacity = '1';
          submitButton.style.cursor = 'pointer';
          submitButton.style.background = '';
          submitButton.style.color = '';
          submitButton.style.borderColor = '';
        }, 3000);
      } else {
        // Show error message
        submitButton.textContent = 'Error - Try Again';
        submitButton.style.background = '#ef4444';
        submitButton.style.color = 'var(--white)';
        submitButton.style.borderColor = '#ef4444';
        
        showNotification(data.message || 'Failed to send message. Please try again.', 'error');
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          submitButton.style.opacity = '1';
          submitButton.style.cursor = 'pointer';
          submitButton.style.background = '';
          submitButton.style.color = '';
          submitButton.style.borderColor = '';
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      submitButton.textContent = 'Error - Try Again';
      submitButton.style.background = '#ef4444';
      submitButton.style.color = 'var(--white)';
      submitButton.style.borderColor = '#ef4444';
      
      showNotification('Network error. Please check your connection and try again.', 'error');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
        submitButton.style.background = '';
        submitButton.style.color = '';
        submitButton.style.borderColor = '';
      }, 3000);
    }
  });
}

// Notification function
function showNotification(message, type = 'success') {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.form-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `form-notification form-notification--${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'var(--light-green)' : '#ef4444'};
    color: ${type === 'success' ? 'var(--black)' : 'var(--white)'};
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 600;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
  `;
  
  // Add animation keyframes if not already added
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}
