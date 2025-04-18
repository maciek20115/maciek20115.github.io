// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
})// ===== INTERSECTION OBSERVER =====
const observerOptions = {
  threshold: 0.25,
  rootMargin: "0px"
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      AOS.refresh(); // Refresh animations if needed
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.content-section').forEach(section => {
  sectionObserver.observe(section);
});

// ===== LAZY LOAD IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('.lazy-load').forEach(img => {
  imageObserver.observe(img);
});;

// Add scroll animation for sections
window.addEventListener('scroll', () => {
    document.querySelectorAll('.content-section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});