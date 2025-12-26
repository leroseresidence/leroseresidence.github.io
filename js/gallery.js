let currentImages = []; // Holds images for the currently active gallery
let currentIndex = 0;

const overlay = document.getElementById('galleryOverlay');
const galleryImg = document.getElementById('galleryImg');

// 1. Initialize all gallery triggers
document.querySelectorAll('.gallery-wrapper').forEach(wrapper => {
    const triggerElements = wrapper.querySelectorAll('.trigger-img, .trigger-link');
    
    triggerElements.forEach(el => {
        el.addEventListener('click', () => {
            // Get the string from data-images and turn it into an array
            const imageString = wrapper.getAttribute('data-images');
            currentImages = imageString.split(',').map(src => src.trim());
            
            currentIndex = 0;
            openGallery();
        });
    });
});

function openGallery() {
    overlay.style.display = "block";
    updateImage();
}

function updateImage() {
    galleryImg.src = currentImages[currentIndex];
}

// 2. Navigation Logic
document.getElementById('nextBtn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
};

document.getElementById('prevBtn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
};

// 3. Close Logic
document.querySelector('.close-btn').onclick = () => overlay.style.display = "none";

// Close if clicking the dark background
overlay.onclick = (e) => {
    if (e.target === overlay || e.target.className === 'gallery-content') {
        overlay.style.display = "none";
    }
};