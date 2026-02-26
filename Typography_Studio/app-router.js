/**
 * Typography Studio - SPA Router & Controller
 * Handles routing, content loading, and state management
 */

class TypographyStudioApp {
    constructor() {
        this.contentContainer = document.getElementById('content-container');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.nav = document.getElementById('nav');
        this.currentRoute = null;
        this.heroScene = null;
        
        // Route configuration
        this.routes = {
            '/': {
                title: 'Typography Studio — Master the Art of Type',
                template: 'views/home.html',
                showHero: true
            },
            '/anatomy': {
                title: 'Typography Anatomy — Typography Studio',
                template: 'part1/anatomy.html',
                showHero: false
            },
            '/anatomy-quiz': {
                title: 'Typography Anatomy Quiz — Typography Studio',
                template: 'part1/anatomy-quiz.html',
                showHero: false
            },
            '/classification': {
                title: 'Typeface Classification — Typography Studio',
                template: 'part1/classification.html',
                showHero: false
            },
            '/classification-quiz': {
                title: 'Classification Quiz — Typography Studio',
                template: 'part1/classification-quiz.html',
                showHero: false
            },
            '/comparison': {
                title: 'Serif vs Sans-serif — Typography Studio',
                template: 'part1/comparison.html',
                showHero: false
            },
            '/comparison-quiz': {
                title: 'Comparison Quiz — Typography Studio',
                template: 'part1/comparison-quiz.html',
                showHero: false
            },
            '/psychology': {
                title: 'Psychology of Fonts — Typography Studio',
                template: 'part1/psychology.html',
                showHero: false
            },
            '/psychology-quiz': {
                title: 'Psychology Quiz — Typography Studio',
                template: 'part1/psychology-quiz.html',
                showHero: false
            },
            '/poster': {
                title: 'Poster Showcase — Typography Studio',
                template: 'part2/poster.html',
                showHero: false
            },
            '/brand': {
                title: 'Brand Typography Analysis — Typography Studio',
                template: 'part2/brand.html',
                showHero: false,
                initScript: true
            },
            '/brand-quiz': {
                title: 'Brand Quiz — Typography Studio',
                template: 'part2/brand-quiz.html',
                showHero: false
            },
            '/expressive': {
                title: 'Expressive Typography — Typography Studio',
                template: 'part2/expressive.html',
                showHero: false
            }
        };
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupNavigation();
        this.setupScrollBehavior();
        
        // Handle initial route
        this.handleRoute();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Listen for popstate (browser back/forward)
        window.addEventListener('popstate', () => this.handleRoute());
    }
    
    setupNavigation() {
        // Handle all navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route') || link.getAttribute('href').replace('#', '');
                this.navigate(route);
            }
        });
    }
    
    setupScrollBehavior() {
        // Add scrolled class to nav
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        });
    }
    
    navigate(route) {
        // Update URL hash
        window.location.hash = route;
    }
    
    async handleRoute() {
        // Get current route from hash
        let route = window.location.hash.replace('#', '') || '/';
        
        // Check if route exists
        if (!this.routes[route]) {
            route = '/'; // Fallback to home
        }
        
        // Don't reload if already on this route
        if (this.currentRoute === route) {
            return;
        }
        
        this.currentRoute = route;
        const routeConfig = this.routes[route];
        
        // Update page title
        document.title = routeConfig.title;
        
        // Update active nav link
        this.updateActiveNav(route);
        
        // Load content
        await this.loadContent(routeConfig);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    updateActiveNav(route) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current route
        const activeLink = document.querySelector(`[data-route="${route}"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
    }
    
    async loadContent(routeConfig) {
        try {
            // Show loading indicator
            this.showLoading();
            
            // Fetch content
            let content;
            if (routeConfig.template === 'views/home.html') {
                // Home page is special - render inline
                content = this.renderHomePage();
            } else {
                // Fetch external content
                const response = await fetch(routeConfig.template);
                if (!response.ok) {
                    throw new Error(`Failed to load ${routeConfig.template}`);
                }
                const html = await response.text();
                content = this.extractContent(html);
            }
            
            // Update content container
            this.contentContainer.innerHTML = content;
            this.contentContainer.classList.add('page-enter');
            
            // Initialize page-specific scripts
            this.initializePageScripts();
            
            // Initialize hero if needed
            if (routeConfig.showHero) {
                this.initializeHero();
            } else {
                this.destroyHero();
            }
            
            // Hide loading indicator
            this.hideLoading();
            
        } catch (error) {
            console.error('Error loading content:', error);
            this.contentContainer.innerHTML = `
                <div style="padding: var(--space-20); text-align: center;">
                    <h1 style="color: var(--text-primary); margin-bottom: var(--space-4);">Page Not Found</h1>
                    <p style="color: var(--text-secondary); margin-bottom: var(--space-8);">The page you're looking for doesn't exist.</p>
                    <a href="#/" class="btn btn-primary" data-route="/">Go Home</a>
                </div>
            `;
            this.hideLoading();
        }
    }
    
    extractContent(html) {
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Remove navigation (we have global nav)
        const nav = temp.querySelector('nav');
        if (nav) nav.remove();
        
        // Remove footer (we have global footer)
        const footer = temp.querySelector('footer');
        if (footer) footer.remove();
        
        // Extract main content
        const pageWrapper = temp.querySelector('.page-wrapper') || 
                           temp.querySelector('.game-container') ||
                           temp.querySelector('body > *');
        
        if (pageWrapper) {
            return pageWrapper.outerHTML;
        }
        
        // Fallback: return body content
        return temp.innerHTML;
    }
    
    renderHomePage() {
        return `
            <!-- Hero Section -->
            <section id="hero">
                <canvas id="hero-canvas"></canvas>
                <div class="hero-content">
                    <h1>Master the Art<br>of Typography</h1>
                    <p class="subtitle">Interactive learning platform for designers who want to understand type at a professional level</p>
                    <div class="hero-cta">
                        <a href="#/anatomy" class="btn btn-primary" data-route="/anatomy">Start Learning</a>
                        <a href="#/poster" class="btn btn-secondary" data-route="/poster">View Poster Showcase</a>
                    </div>
                </div>
                <div class="scroll-indicator">
                    <span></span>
                </div>
            </section>

            <!-- Typography Anatomy -->
            <section id="anatomy" style="padding: var(--space-32) var(--space-10); max-width: var(--container-2xl); margin: 0 auto;">
                <div class="section-header">
                    <div class="section-label">Fundamentals</div>
                    <h2 class="section-title">Typography Anatomy</h2>
                    <p class="section-description">Understand the building blocks of letterforms through interactive diagrams and visual exploration</p>
                </div>
                <div class="card-grid">
                    <a href="#/anatomy" class="card card-interactive" data-route="/anatomy">
                        <span class="card-icon">Aa</span>
                        <h3 class="card-title">Letterform Structure</h3>
                        <p class="card-description">Master baseline, x-height, ascenders, descenders, and every anatomical element that defines typography</p>
                    </a>
                </div>
            </section>

            <!-- Typeface Classification -->
            <section id="classification" style="padding: var(--space-32) var(--space-10); max-width: var(--container-2xl); margin: 0 auto;">
                <div class="section-header">
                    <div class="section-label">Categories</div>
                    <h2 class="section-title">Typeface Classification</h2>
                    <p class="section-description">Explore the five main typeface categories and learn to identify them instantly</p>
                </div>
                <div class="card-grid card-grid-3">
                    <a href="#/classification" class="card card-interactive" data-route="/classification">
                        <span class="card-icon">Tt</span>
                        <h3 class="card-title">Serif Typefaces</h3>
                        <p class="card-description">Traditional, elegant, and authoritative — perfect for editorial and formal contexts</p>
                    </a>
                    <a href="#/classification" class="card card-interactive" data-route="/classification">
                        <span class="card-icon">Ss</span>
                        <h3 class="card-title">Sans-serif Typefaces</h3>
                        <p class="card-description">Modern, clean, and versatile — the foundation of contemporary digital design</p>
                    </a>
                    <a href="#/classification" class="card card-interactive" data-route="/classification">
                        <span class="card-icon">Dd</span>
                        <h3 class="card-title">Script & Display</h3>
                        <p class="card-description">Expressive and decorative — for headlines, branding, and creative applications</p>
                    </a>
                </div>
            </section>

            <!-- Psychology of Fonts -->
            <section id="psychology" style="padding: var(--space-32) var(--space-10); max-width: var(--container-2xl); margin: 0 auto;">
                <div class="section-header">
                    <div class="section-label">Emotion</div>
                    <h2 class="section-title">Psychology of Fonts</h2>
                    <p class="section-description">Typography communicates emotion before words are even read</p>
                </div>
                <div class="card-grid card-grid-2">
                    <a href="#/psychology" class="card card-interactive" data-route="/psychology">
                        <span class="card-icon">Pp</span>
                        <h3 class="card-title">Font Psychology</h3>
                        <p class="card-description">Learn how fonts shape perception and communicate emotion</p>
                    </a>
                    <a href="#/comparison" class="card card-interactive" data-route="/comparison">
                        <span class="card-icon">Cc</span>
                        <h3 class="card-title">Serif vs Sans-serif</h3>
                        <p class="card-description">Understand the fundamental differences and applications</p>
                    </a>
                </div>
            </section>

            <!-- Poster Showcase -->
            <section id="studio" style="padding: var(--space-32) var(--space-10); max-width: var(--container-2xl); margin: 0 auto;">
                <div class="section-header">
                    <div class="section-label">Showcase</div>
                    <h2 class="section-title">Poster Showcase</h2>
                </div>
                <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: var(--radius-2xl); padding: var(--space-20) var(--space-10); text-align: center;">
                    <h3 style="font-size: var(--text-5xl); font-weight: var(--font-light); margin-bottom: var(--space-6);">Interactive Poster Comparison</h3>
                    <p style="font-size: var(--text-lg); color: var(--text-tertiary); margin-bottom: var(--space-10); max-width: 600px; margin-left: auto; margin-right: auto;">Explore expressive typography designs with interactive flip comparison and comprehensive design analysis</p>
                    <a href="#/poster" class="btn btn-primary btn-large" data-route="/poster">View Showcase →</a>
                </div>
            </section>

            <!-- Brand Typography -->
            <section id="brand" style="padding: var(--space-32) var(--space-10); max-width: var(--container-2xl); margin: 0 auto;">
                <div class="section-header">
                    <div class="section-label">Analysis</div>
                    <h2 class="section-title">Identity Through Typography</h2>
                    <p class="section-description">Analyze how major brands use typography to build identity</p>
                </div>
                <div class="card-grid card-grid-2">
                    <a href="#/brand" class="card card-interactive" data-route="/brand">
                        <span class="card-icon">Bb</span>
                        <h3 class="card-title">Brand Case Studies</h3>
                        <p class="card-description">Explore typography decisions from Apple, Google, Nike, and more</p>
                    </a>
                    <a href="#/expressive" class="card card-interactive" data-route="/expressive">
                        <span class="card-icon">Ee</span>
                        <h3 class="card-title">Expressive Typography</h3>
                        <p class="card-description">Create emotion-driven compositions and understand typographic voice</p>
                    </a>
                </div>
            </section>
        `;
    }
    
    initializePageScripts() {
        // Re-execute any inline scripts in the loaded content
        const scripts = this.contentContainer.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
    
    initializeHero() {
        // Initialize Three.js hero animation
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x0a0a0a, 1);
        
        // Create particles
        const particles = [];
        const particleCount = 60;
        
        for (let i = 0; i < particleCount; i++) {
            const geometries = [
                new THREE.BoxGeometry(0.3, 0.3, 0.05),
                new THREE.TorusGeometry(0.2, 0.05, 8, 16),
                new THREE.ConeGeometry(0.15, 0.4, 4)
            ];
            
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({ 
                color: Math.random() > 0.7 ? 0x6366f1 : 0xffffff,
                shininess: 100,
                transparent: true,
                opacity: 0.6
            });
            const particle = new THREE.Mesh(geometry, material);
            
            particle.position.x = (Math.random() - 0.5) * 40;
            particle.position.y = (Math.random() - 0.5) * 40;
            particle.position.z = (Math.random() - 0.5) * 40;
            
            particle.rotation.x = Math.random() * Math.PI * 2;
            particle.rotation.y = Math.random() * Math.PI * 2;
            
            particle.userData.velocity = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01,
                rotationX: (Math.random() - 0.5) * 0.01,
                rotationY: (Math.random() - 0.5) * 0.01
            };
            
            scene.add(particle);
            particles.push(particle);
        }
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x6366f1, 1.5);
        pointLight1.position.set(15, 15, 15);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
        pointLight2.position.set(-15, -15, -15);
        scene.add(pointLight2);
        
        camera.position.z = 25;
        
        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        
        const mouseMoveHandler = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        document.addEventListener('mousemove', mouseMoveHandler);
        
        // Animation
        const animate = () => {
            if (!this.heroScene) return; // Stop if hero destroyed
            
            requestAnimationFrame(animate);
            
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
            camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;
            camera.lookAt(scene.position);
            
            particles.forEach(particle => {
                particle.rotation.x += particle.userData.velocity.rotationX;
                particle.rotation.y += particle.userData.velocity.rotationY;
                
                particle.position.x += particle.userData.velocity.x;
                particle.position.y += particle.userData.velocity.y;
                particle.position.z += particle.userData.velocity.z;
                
                if (Math.abs(particle.position.x) > 20) particle.position.x *= -1;
                if (Math.abs(particle.position.y) > 20) particle.position.y *= -1;
                if (Math.abs(particle.position.z) > 20) particle.position.z *= -1;
            });
            
            renderer.render(scene, camera);
        };
        
        // Handle resize
        const resizeHandler = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resizeHandler);
        
        // Store scene for cleanup
        this.heroScene = {
            scene,
            renderer,
            cleanup: () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('resize', resizeHandler);
                renderer.dispose();
            }
        };
        
        animate();
    }
    
    destroyHero() {
        if (this.heroScene) {
            this.heroScene.cleanup();
            this.heroScene = null;
        }
    }
    
    showLoading() {
        this.loadingIndicator.classList.add('active');
        this.contentContainer.classList.add('loading');
    }
    
    hideLoading() {
        setTimeout(() => {
            this.loadingIndicator.classList.remove('active');
            this.contentContainer.classList.remove('loading');
        }, 300);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new TypographyStudioApp();
    });
} else {
    window.app = new TypographyStudioApp();
}
