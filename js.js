// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = [];
for(let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * -100);
}

// Drawing the characters
function draw() {
    // Black BG for the canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    
    for(let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 35);

// Easter egg functionality
const button = document.querySelector('.matrix-btn');

button.addEventListener('click', function() {
    // Create Matrix-style notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #00ff41;
        border: 1px solid #00ff41;
        padding: 15px 25px;
        font-family: 'Share Tech Mono', monospace;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
        z-index: 1000;
        animation: matrixNotification 0.5s ease;
    `;
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixNotification {
            from { 
                transform: translateX(100%); 
                opacity: 0; 
                filter: blur(10px);
            }
            to { 
                transform: translateX(0); 
                opacity: 1;
                filter: blur(0);
            }
        }
        @keyframes matrixNotificationOut {
            from { 
                transform: translateX(0); 
                opacity: 1;
                filter: blur(0);
            }
            to { 
                transform: translateX(100%); 
                opacity: 0;
                filter: blur(10px);
            }
        }
    `;
    document.head.appendChild(style);
    
    notification.innerHTML = `
        <div style="margin-bottom: 10px;">SYSTEM ACCESS GRANTED</div>
        <div style="font-size: 0.9em; opacity: 0.8;">🎉 Спасибо, что ознакомились с моей визиткой! 🎉</div>
    `;
    document.body.appendChild(notification);
    
    // Create Matrix rain effect on notification
    let notificationCount = 0;
    const notificationMatrix = setInterval(() => {
        if (notificationCount > 20) {
            clearInterval(notificationMatrix);
            return;
        }
        
        const matrixChar = document.createElement('div');
        matrixChar.textContent = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        matrixChar.style.cssText = `
            position: absolute;
            top: ${Math.random() * notification.offsetHeight}px;
            left: ${Math.random() * notification.offsetWidth}px;
            color: #00ff41;
            font-size: 10px;
            opacity: 0.7;
            pointer-events: none;
            animation: fadeOut 1s ease forwards;
        `;
        notification.appendChild(matrixChar);
        
        setTimeout(() => {
            if (notification.contains(matrixChar)) {
                notification.removeChild(matrixChar);
            }
        }, 1000);
        
        notificationCount++;
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'matrixNotificationOut 0.5s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 500);
    }, 5000);
});

// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to terminal cards
    const terminals = document.querySelectorAll('.terminal');
    terminals.forEach(terminal => {
        terminal.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 25px rgba(0, 255, 65, 0.5)';
            this.style.transition = 'all 0.3s ease';
        });
        
        terminal.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3)';
        });
    });
    
    // Add typing effect to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const originalText = title.textContent;
        title.textContent = '';
        let charIndex = 0;
        
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                title.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(title);
    });
    
    // Add random glitch effect to profile name
    const glitchElement = document.querySelector('.glitch');
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = '';
            }, 200);
        }
    }, 3000);
    
    // Add cursor blink effect to terminal prompts
    const prompts = document.querySelectorAll('.prompt');
    prompts.forEach(prompt => {
        setInterval(() => {
            prompt.style.opacity = prompt.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 0.7; }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(fadeOutStyle);