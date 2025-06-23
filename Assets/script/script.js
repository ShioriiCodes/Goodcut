document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in-start");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-animate");
        observer.unobserve(entry.target); // Optional: remove to re-trigger on scroll
      }
    });
  }, {
    threshold: 0.1
  });

  faders.forEach(el => observer.observe(el));
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Function to scroll to the top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll effect
  });
}

// Category filter functionality
// This script handles the category filtering for work items and toggles the Z-CREATURE section
// It also manages the active state of the category buttons
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.category-button');
  const workItemsContainer = document.querySelector('#work-items');
  const contactSection = document.querySelector('#contact-section');

  // Map category names to their section IDs
  const categorySections = {
    'NFT COLLECTION': 'z-creature-section',
    'ILLUSTRATION': 'illustration-section',
    'CONCEPT ART': 'concept-art-section',
    'BRANDING/GRAPHIC DESIGN': 'branding-section',
    'LOGO': 'logo-section',
    'MERCH/TOY DESIGN': 'merch-section',
    'NARRATIVE': 'narrative-section',
    'GAME DEVELOPMENT': 'game-section'
  };

  const allCategorySectionIds = Object.values(categorySections);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-category');

      // Reset button states
      buttons.forEach(btn => {
        btn.classList.remove('bg-white', 'text-black', 'border-white');
        btn.removeAttribute('data-active');
      });
      button.classList.add('bg-white', 'text-black', 'border-white');
      button.setAttribute('data-active', 'true');

      // Hide all custom sections
      allCategorySectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) section.classList.add('hidden');
      });

      // Handle default ALL category
      if (selectedCategory === 'ALL') {
        workItemsContainer.classList.remove('hidden');
        if (contactSection) contactSection.classList.remove('hidden');
      } else if (categorySections[selectedCategory]) {
        // Show the matching section
        const targetSection = document.getElementById(categorySections[selectedCategory]);
        if (targetSection) targetSection.classList.remove('hidden');
        workItemsContainer.classList.add('hidden');
        if (contactSection) contactSection.classList.add('hidden');
      }

      // Filter main work items only if no dedicated section
      if (!categorySections[selectedCategory]) {
        const items = workItemsContainer.querySelectorAll('.item');
        items.forEach(item => {
          const label = item.querySelector('span')?.textContent?.toUpperCase() || '';
          if (selectedCategory === 'ALL' || label.includes(selectedCategory)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });

  // Trigger the default category (ALL)
  buttons[0].click();
});


// Category filter functionality
// This script handles the category filtering for work items and toggles the Z-CREATURE section
// It also manages the active state of the category buttons
// This script is designed to work with the HTML structure provided in the original code
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.category-button');
  const workItemsContainer = document.querySelector('#work-items');
  const contactSection = document.querySelector('#contact-section');
  const workItems = document.querySelectorAll('.item');

  const categorySections = {
    'NFT COLLECTION': 'z-creature-section',
    'ILLUSTRATION': 'illustration-section',
    'CONCEPT ART': 'concept-art-section',
    'BRANDING/GRAPHIC DESIGN': 'branding-section',
    'LOGO': 'logo-section',
    'MERCH/TOY DESIGN': 'merch-section',
    'NARRATIVE': 'narrative-section',
    'GAME DEVELOPMENT': 'game-section'
  };

  const allCategorySectionIds = Object.values(categorySections);

  function activateCategory(selectedCategory) {
    // Reset button states
    buttons.forEach(btn => {
      btn.classList.remove('bg-white', 'text-black', 'border-white');
      btn.removeAttribute('data-active');
    });

    // Highlight the matching button
    buttons.forEach(btn => {
      if (btn.getAttribute('data-category') === selectedCategory) {
        btn.classList.add('bg-white', 'text-black', 'border-white');
        btn.setAttribute('data-active', 'true');
      }
    });

    // Hide all category-specific sections
    allCategorySectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) section.classList.add('hidden');
    });

    // Show the correct section or ALL
    if (selectedCategory === 'ALL') {
      workItemsContainer.classList.remove('hidden');
      if (contactSection) contactSection.classList.remove('hidden');
    } else if (categorySections[selectedCategory]) {
      const targetSection = document.getElementById(categorySections[selectedCategory]);
      if (targetSection) targetSection.classList.remove('hidden');
      workItemsContainer.classList.add('hidden');
      if (contactSection) contactSection.classList.add('hidden');
    }

    // Filter inside main grid if it's visible
    if (!categorySections[selectedCategory]) {
      const items = workItemsContainer.querySelectorAll('.item');
      items.forEach(item => {
        const label = item.querySelector('span')?.textContent?.toUpperCase() || '';
        item.style.display = (selectedCategory === 'ALL' || label.includes(selectedCategory)) ? '' : 'none';
      });
    }
  }

  // Button click → trigger section
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-category');
      activateCategory(selectedCategory);
    });
  });

  // Work item click → trigger same behavior
  workItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category')?.toUpperCase();
      if (category) activateCategory(category);
    });
  });

  // Auto-select category from URL or default to ALL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromURL = urlParams.get('category');
  if (categoryFromURL) {
    activateCategory(categoryFromURL.toUpperCase());
  } else {
    buttons[0].click();
  }
  
});











// Function to toggle the Lets cut section
function openModal() {
  document.getElementById('contactModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('contactModal').classList.add('hidden');
}

// Function active navigation section
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath === '/' && linkPath.endsWith('/index.html'))) {
      link.classList.add('underline', 'underline-offset-8', 'decoration-4', 'decoration-[#b4e205]');
    }
  });
});
// Event listener for the Z-CREATURE trigger button
  document.getElementById('zCreaturesTrigger').addEventListener('click', function() {
    // Navigate to z-creature.html when clicked
    window.location.href = 'z-creature.html';
  });