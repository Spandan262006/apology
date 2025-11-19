// This script helps configure the website for GitHub Pages deployment
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    // Get the repository name from the URL
    const pathSegments = window.location.pathname.split('/');
    const repoName = pathSegments[1]; // The first segment after the domain
    
    // Update all internal links to include the repository name
    if (repoName && repoName.length > 0) {
      const links = document.querySelectorAll('a[href]');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Only update internal links that don't already include the repo name
        if (href && href.startsWith('/') && !href.startsWith(`/${repoName}`)) {
          link.setAttribute('href', `/${repoName}${href}`);
        } else if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith(`/${repoName}`)) {
          // For relative links like "index.html"
          const currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
          if (!href.includes(repoName)) {
            link.setAttribute('href', `${currentPath}/${href}`);
          }
        }
      });
      
      // Update form action if it exists
      const form = document.querySelector('form#contactForm');
      if (form) {
        const nextInput = form.querySelector('input[name="_next"]');
        if (nextInput) {
          const nextValue = nextInput.getAttribute('value');
          if (nextValue && nextValue.includes('YOUR_REPO_NAME')) {
            const updatedValue = nextValue.replace('YOUR_REPO_NAME', repoName);
            nextInput.setAttribute('value', updatedValue);
          }
        }
      }
    }
  }
  
  // Display a warning if Formspree endpoint hasn't been configured
  const form = document.querySelector('form#contactForm');
  if (form) {
    const action = form.getAttribute('action');
    if (action && action.includes('YOUR_FORMSPREE_ENDPOINT')) {
      const warningDiv = document.createElement('div');
      warningDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
      warningDiv.style.color = 'white';
      warningDiv.style.padding = '10px';
      warningDiv.style.borderRadius = '5px';
      warningDiv.style.marginBottom = '20px';
      warningDiv.innerHTML = '<strong>Warning:</strong> Please configure your Formspree endpoint in message.html. See README.md for instructions.';
      
      form.parentNode.insertBefore(warningDiv, form);
    }
  }
}); 