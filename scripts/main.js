// scripts/main.js

document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button, .videos-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Toggle the active class for the clicked button
            this.classList.toggle('active');

            // Get the associated content div
            const content = this.nextElementSibling;

            // Toggle the display of the content
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }

            // Close other accordion panels
            accordionButtons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                    btn.nextElementSibling.style.display = 'none';
                }
            });
        });


    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullSizeImage = item.getAttribute('data-full');
            modalImage.src = fullSizeImage;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


