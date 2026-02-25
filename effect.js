// --- THREE.JS SCENE SETUP ---
        // Declare variables for the scene, camera, renderer, stars, and the new moon
        let scene, camera, renderer, stars, moon;

        function init3D() {
            // --- Scene and Camera ---
            scene = new THREE.Scene();
            // Set up the camera. We're pulling it back on the Z-axis to see the moon.
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 30;

            // --- Renderer ---
            // The renderer draws the scene onto the canvas
            renderer = new THREE.WebGLRenderer({
                canvas: document.querySelector('#bg-canvas'),
                alpha: true // Allows for a transparent background
            });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // --- Starfield ---
            // Create a geometry for the stars
            const starGeo = new THREE.BufferGeometry();
            const starCount = 6000;
            const positions = new Float32Array(starCount * 3);
            for (let i = 0; i < starCount * 3; i++) {
                // Assign random positions to each star
                positions[i] = (Math.random() - 0.5) * 600;
            }
            starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            // Create the material for the stars
            let starMaterial = new THREE.PointsMaterial({
                color: 0xaaaaaa,
                size: 0.7,
                transparent: true
            });

            stars = new THREE.Points(starGeo, starMaterial);
            scene.add(stars);

            // --- Moon ---
            // Use a texture loader to load images for the moon's surface
            const textureLoader = new THREE.TextureLoader();
            const moonTexture = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg');
            const displacementTexture = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg');

            // Create the moon's geometry (a sphere)
            const moonGeometry = new THREE.SphereGeometry(8, 64, 64);
            // Create the moon's material, which determines its appearance
            const moonMaterial = new THREE.MeshPhongMaterial({
                map: moonTexture, // The main color texture
                displacementMap: displacementTexture, // Creates the bumps and craters
                displacementScale: 0.1, // How pronounced the craters are
                color: 0xffffff,
                shininess: 5 // How much it shines
            });
            moon = new THREE.Mesh(moonGeometry, moonMaterial);
            scene.add(moon);

            // --- Lighting ---
            // Add an ambient light to softly illuminate the whole scene
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
            scene.add(ambientLight);

            // Add a point light to cast light on the moon, creating highlights and shadows
            const pointLight = new THREE.PointLight(0xffffff, 1.5);
            pointLight.position.set(20, 10, 40);
            scene.add(pointLight);

            // --- Event Listeners ---
            window.addEventListener('resize', onWindowResize, false);
            // Add mouse move for desktop
            document.addEventListener('mousemove', onMouseMove, false);
            // Add device orientation for mobile
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', onDeviceOrientation, false);
            }
            
            // Start the animation loop
            animate();
        }

        // --- Handle Window Resizing ---
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        // --- Handle Mouse Movement for Parallax Effect ---
        function onMouseMove(event) {
            // Calculate mouse position relative to the center of the screen
            const mouseX = (event.clientX - window.innerWidth / 2) / 100;
            const mouseY = (event.clientY - window.innerHeight / 2) / 100;
            
            // Move the camera slightly based on mouse position
            // This creates a subtle parallax effect
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            
            // Make the camera always look at the center of the scene
            camera.lookAt(scene.position);
        }

        // --- Handle Device Orientation for Mobile 3D Motion ---
        function onDeviceOrientation(event) {
            // event.gamma: left-to-right tilt (-90 to 90)
            // event.beta: front-to-back tilt (-180 to 180)
            if (event.gamma === null || event.beta === null) {
                return; // Exit if data is not available
            }

            // Normalize the values for smoother control
            const gamma = event.gamma / 90; // range: -1 to 1
            const beta = event.beta / 180;  // range: -1 to 1
            
            // Define the maximum camera movement range
            const moveRange = 5;

            // Calculate target camera position based on tilt
            const targetX = gamma * moveRange;
            const targetY = beta * moveRange;

            // Smoothly move the camera towards the target position
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (targetY - camera.position.y) * 0.05;

            // Make the camera always look at the center of the scene
            camera.lookAt(scene.position);
        }


        // --- Animation Loop ---
        function animate() {
            // Rotate the stars and moon in each frame
            stars.rotation.y -= 0.0001;
            moon.rotation.y += 0.0005;
            moon.rotation.x += 0.0001;

            // Render the scene from the camera's perspective
            renderer.render(scene, camera);
            
            // Request the next frame to create a smooth animation
            requestAnimationFrame(animate);
        }

        // --- Page Navigation Logic ---
        const startBtn = document.getElementById('start-btn');
        const landingPage = document.getElementById('landing-page');
        const mainContent = document.getElementById('main-content');
        const pages = document.querySelectorAll('.content-page');
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        // Event listener for the mobile menu button
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Removed touch events for mobile navigation (sliding) as per request

        function showPage(pageId, clickedLink) {
            pages.forEach(page => {
                page.style.display = 'none';
            });
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.style.display = 'block';
            }

            // Close mobile menu if it's open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            // Update active link state for both menus
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to all links pointing to the current page
            document.querySelectorAll(`a[href="#${pageId}"]`).forEach(link => {
                link.classList.add('active');
            });
        }
        
        function showLandingPage() {
            mainContent.style.display = 'none';
            landingPage.style.display = 'flex';
        }

        startBtn.addEventListener('click', () => {
            document.getElementById('background-music').play();
            landingPage.style.display = 'none';
            mainContent.style.display = 'block';
            showPage('about-me', document.querySelector('a[href="#about-me"]'));
        });

        // --- Scroll-in Animation Logic ---
        function initScrollAnimation() {
            const lazyElements = document.querySelectorAll('.lazy-animate');

            // Check if IntersectionObserver is supported
            if ("IntersectionObserver" in window) {
                // Create an observer
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        // If the element is in the viewport
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            // Stop observing it once it's animated
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    root: null, // Observes intersections relative to the viewport
                    threshold: 0.1 // Triggers when 10% of the element is visible
                });

                // Observe each lazy-animate element
                lazyElements.forEach(el => {
                    observer.observe(el);
                });
                
            } else {
                // Fallback for older browsers (just show all elements)
                lazyElements.forEach(el => {
                    el.classList.add('is-visible');
                });
            }
        }

        // Initialize the 3D scene when the script loads
        init3D();
        
        // Initialize the scroll-in animations
        initScrollAnimation();


        const routes = {
        'about-me': 'about-me.html',};

        document.getElementById("menu-btn").addEventListener("click", function() {
            const icon = document.getElementById("theme-icon");
            // Check if the current icon is the moon
            if (icon.classList.contains("fa-moon")) {
                // If it is, change it to the sun icon
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
                icon.style.color = "#ffcc00"; // A brighter yellow for the sun
                // Update the glow effect for the sun
                icon.style.textShadow = "0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 30px #ffcc00";
            } else {
                // If it's not the moon (i.e., it's the sun), change it back to the moon
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
                icon.style.color = "#f3da35"; // The original softer yellow for the moon
                // Restore the original glow effect
                icon.style.textShadow = "0 0 10px #f3da35, 0 0 20px #f3da35, 0 0 30px #f3da35";
            }
        });