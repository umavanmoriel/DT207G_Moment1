//Header meny animation
document.addEventListener('DOMContentLoaded', function() {
    // Hämta alla navigationslänkar
    const links = document.querySelectorAll('nav a');
    
    // Ta reda på vilken sida man är
    const currentPath = window.location.pathname;

    links.forEach(link => {
      link.classList.remove('active');
      const linkPath = link.getAttribute('href');
    
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
});