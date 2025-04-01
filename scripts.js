// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800,
    offset: 20,
    once: false
});

// Modal functionality
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalImg = document.querySelector('.modal-img');

// Open modal when QR code is clicked
document.querySelectorAll('.qrcode-single').forEach(qrcode => {
    qrcode.addEventListener('click', () => {
        modalImg.src = qrcode.querySelector('img').src;
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            modalContent.classList.add('show');
            AOS.refresh();
        }, 10);
    });
});

// Close modal function
function closeModal() {
    modal.classList.remove('show');
    modalContent.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Close modal when clicking outside or on close button
modal.addEventListener('click', e => e.target === modal && closeModal());
document.querySelector('.close-btn').addEventListener('click', closeModal);

// Copy cryptocurrency address functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const container = this.closest('.crypto-address-container');
        const address = container.querySelector('.crypto-address').textContent;
        const successMsg = container.querySelector('.copy-success');
        
        // Copy to clipboard
        navigator.clipboard.writeText(address).then(() => {
            // Show success message
            this.style.opacity = '0';
            successMsg.style.opacity = '1';
            
            // Reset after 1.5 seconds
            setTimeout(() => {
                successMsg.style.opacity = '0';
                // Only show copy button again if mouse is still hovering over container
                if (container.matches(':hover')) {
                    this.style.opacity = '1';
                }
            }, 1500);
        }).catch(err => {
            console.error('复制失败: ', err);
            // Fallback copy method for mobile devices
            if (navigator.userAgent.match(/ipad|iphone/i)) {
                // Create temporary textarea
                const textArea = document.createElement('textarea');
                textArea.value = address;
                document.body.appendChild(textArea);
                textArea.select();
                textArea.setSelectionRange(0, 99999);
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show success message
                this.style.opacity = '0';
                successMsg.style.opacity = '1';
                
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    if (container.matches(':hover')) {
                        this.style.opacity = '1';
                    }
                }, 1500);
            }
        });
    });
});
