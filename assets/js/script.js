'use strict';

// element toggle function
const elementToggleFunc = function (elem)
{ elem.classList.toggle("active");
  console.log('Toggled active class on:', elem, 'New state:', elem.classList.contains("active"));
 }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarBtnSpan = sidebarBtn.querySelector("span"); // Get the span inside the button

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
  // Toggle the text content of the button based on sidebar's active state
  if (sidebar.classList.contains("active")) {
    sidebarBtnSpan.textContent = "Hide Contacts";
  } else {
    sidebarBtnSpan.textContent = "Show Contacts";
  }
});

// Profile picture toggle
const avatarBox = document.getElementById('avatar-box');
const avatarImg = document.getElementById('avatar-img');
const avatarToggleText = document.getElementById('avatar-toggle-text');

const avatarOriginalSrc = "https://ik.imagekit.io/wirawibisana/my-avatar.png?updatedAt=1751000956490"; // Your original avatar
const avatarOriginalAlt = "Wira Wibisana Avatar";
const avatarAlternateSrc = "https://ik.imagekit.io/wirawibisana/my-avatar-2.png"; // Your "real me" photo - UPDATED URL
const avatarAlternateAlt = "Wira Wibisana Photo";

let isAvatarOriginal = true; // State to track which image is currently displayed

avatarBox.addEventListener('click', function() {
    // Add flip animation class
    avatarImg.classList.add('avatar-img-flipped');

    // After half of the animation duration, change the image source
    // This creates a smoother flip effect where the image changes mid-rotation
    setTimeout(() => {
        if (isAvatarOriginal) {
            avatarImg.src = avatarAlternateSrc;
            avatarImg.alt = avatarAlternateAlt;
            avatarToggleText.textContent = "Click picture to see my avatar";
        } else {
            avatarImg.src = avatarOriginalSrc;
            avatarImg.alt = avatarOriginalAlt;
            avatarToggleText.textContent = "Click picture to see the real me";
        }
        isAvatarOriginal = !isAvatarOriginal;
    }, 300); // Half of 0.6s transition

    // Remove the flip animation class after the full animation duration
    // This prepares the image for the next click
    setTimeout(() => {
        avatarImg.classList.remove('avatar-img-flipped');
    }, 600); // Full 0.6s transition
});


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]"); // This is ONLY for testimonials modal now
const modalCloseBtn = document.querySelector("[data-modal-close-btn]"); // This is ONLY for testimonials modal now
const overlay = document.querySelector("[data-overlay]"); // This is ONLY for testimonials modal now

// modal variable (for testimonials only)
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (for testimonials only)
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  // Control body overflow for full-screen dimming effect
  document.body.style.overflow = modalContainer.classList.contains("active") ? "hidden" : "auto";
}

// add click event to all modal items (testimonials only)
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button (testimonials only)
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables for Portfolio filters
const select = document.querySelector("[data-select]"); // The div.filter-select-box element (mobile dropdown button)
const selectList = document.querySelector("[data-select-list]"); // The ul dropdown list (mobile dropdown content)
const selectValue = document.querySelector("[data-selecct-value]"); // The span that shows selected value
const filterBtn = document.querySelectorAll("[data-filter-btn]"); // Desktop filter buttons

// Get relevant elements for dropdown behavior and layout adjustment
const portfolioArticle = document.querySelector('article[data-page="portfolio"]');
const mainContent = document.querySelector('.main-content'); // Get the main content wrapper

// CRITICAL FIX: Ensure the dropdown and parent article start in a clean, non-active state.
// This prevents the "already active" issue observed in the console.
document.addEventListener('DOMContentLoaded', () => {
    if (select) {
        select.classList.remove('active');
        console.log("On DOMContentLoaded: Removed 'active' class from filter-select-box.");
    }
    if (portfolioArticle) {
        portfolioArticle.classList.remove('dropdown-active-parent');
        console.log("On DOMContentLoaded: Removed 'dropdown-active-parent' class from portfolio article.");
    }
    if (mainContent) {
        mainContent.classList.remove('dropdown-open-padding'); // Ensure it's off initially
    }
});


// Event listener for the mobile filter dropdown button
select.addEventListener("click", function () {
  console.log("Dropdown click detected! Select element active state before toggle:", select.classList.contains("active"));
  elementToggleFunc(select); // Toggle 'active' on the dropdown button itself
  console.log("Select element active state after toggle:", select.classList.contains("active"));

  // Toggle 'dropdown-active-parent' class on the portfolio article (for overflow)
  if (portfolioArticle) {
    if (select.classList.contains("active")) {
      portfolioArticle.classList.add("dropdown-active-parent");
      console.log("Added dropdown-active-parent to portfolio article.");
      // Add padding to main-content to push down content below the dropdown
      if (mainContent) {
          mainContent.classList.add('dropdown-open-padding');
          console.log("Added dropdown-open-padding to main-content.");
      }
      // Scroll the page to ensure the dropdown is visible
      select.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      portfolioArticle.classList.remove("dropdown-active-parent");
      console.log("Removed dropdown-active-parent from portfolio article.");
      // Remove padding when dropdown closes
      if (mainContent) {
          mainContent.classList.remove('dropdown-open-padding');
          console.log("Removed dropdown-open-padding from main-content.");
      }
    }
  }
});

// Function to populate the mobile filter dropdown
const populateMobileFilterDropdown = function () {
    console.log("populateMobileFilterDropdown called.");
    console.log("Number of filter buttons found:", filterBtn.length);

    // Ensure filterBtn is not empty before populating
    // This is important because the desktop filter buttons must be in the DOM
    // for categories to be extracted for the mobile dropdown.
    if (filterBtn.length === 0) {
        console.warn("No desktop filter buttons ([data-filter-btn]) found to populate mobile dropdown. Please ensure they are present in index.html and loaded before this function runs.");
        return; // Exit if no buttons found
    }

    selectList.innerHTML = ''; // Clear existing items

    // Get categories from the desktop filter buttons
    filterBtn.forEach(button => {
        const category = button.dataset.category;
        const text = button.innerText;

        const listItem = document.createElement('li');
        listItem.classList.add('select-item');
        listItem.innerHTML = `<button data-select-item data-category="${category}">${text}</button>`;
        selectList.appendChild(listItem);
    });

    console.log("Mobile filter dropdown populated with items. Total items:", selectList.children.length);
    // Log the actual HTML content of the selectList to verify items are there
    console.log("selectList innerHTML:", selectList.innerHTML);


    // Add event listeners to the newly created select items
    const mobileSelectItems = selectList.querySelectorAll('[data-select-item]');
    mobileSelectItems.forEach(item => {
        item.addEventListener("click", function () {
            let selectedValue = this.dataset.category; // Use dataset.category directly
            selectValue.innerText = this.innerText;
            filterFunc(selectedValue); // Filter based on the selected category
            
            // Close the dropdown after selection by toggling 'active' on the parent div
            elementToggleFunc(select); // This closes the dropdown
            // Ensure the dropdown-active-parent class is removed from the article after selection
            if (portfolioArticle) {
                portfolioArticle.classList.remove("dropdown-active-parent");
                console.log("Removed dropdown-active-parent after selection.");
            }
            // Remove padding after selection
            if (mainContent) {
                mainContent.classList.remove('dropdown-open-padding');
                console.log("Removed dropdown-open-padding from main-content after selection.");
            }
        });
    });
}


const filterFunc = function (selectedValue) {
  if (allPortfolioItems.length > 0) {
    const filtered = selectedValue === "all"
        ? allPortfolioItems
        : allPortfolioItems.filter(item => item.category.toLowerCase() === selectedValue.toLowerCase()); // Ensure case-insensitive match
    renderPortfolioItems(filtered);
  }
}

// add event in all filter button items for large screen
// Initialise lastClickedBtn to the first filter button if available,
// otherwise defer its assignment until it's actually used.
let lastClickedBtn; 
if (filterBtn.length > 0) {
    lastClickedBtn = filterBtn[0]; // Initialize with the 'All' button
}

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.dataset.category; // Use dataset.category
    filterFunc(selectedValue);
    if (lastClickedBtn) { // Ensure lastClickedBtn exists before attempting to remove class
        lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
    // If navigating to the 'Blog' page, ensure the blog list is shown, not an article
    if (this.innerHTML.toLowerCase() === 'blog') {
      document.getElementById('blog-list-container').style.display = 'block'; // Show list
      document.getElementById('blog-article-content').style.display = 'none'; // Hide article
    }
    // If navigating to 'Portfolio' page, ensure all items are shown & detail is hidden
    if (this.innerHTML.toLowerCase() === 'portfolio') {
        renderPortfolioItems(allPortfolioItems); // Show all portfolio items
        document.getElementById('portfolio-detail-content').style.display = 'none'; // Hide detail
        // Show the entire filter section for portfolio page
        document.querySelector('.portfolio .projects').style.display = 'block';

        // Reset filter button to 'All' on desktop
        const desktopAllButton = document.querySelector('.filter-list [data-filter-btn][data-category="all"]');
        if (lastClickedBtn) {
            lastClickedBtn.classList.remove('active');
        }
        if (desktopAllButton) {
            desktopAllButton.classList.add('active');
            lastClickedBtn = desktopAllButton;
        }

        // Reset mobile select dropdown text to "Select category"
        selectValue.innerText = "Select category";
        // Also ensure the mobile dropdown itself is closed when navigating to portfolio
        select.classList.remove('active');
        // Also remove the dropdown-active-parent class from the article
        if (portfolioArticle) {
            portfolioArticle.classList.remove("dropdown-active-parent");
        }
        // Ensure padding is removed when navigating away from or closing portfolio
        if (mainContent) {
            mainContent.classList.remove('dropdown-open-padding');
        }
    }
     // If navigating to 'Resume' page, load resume data
     if (this.innerHTML.toLowerCase() === 'resume') {
        loadResumeData();
    }
  });
}


// --- PORTFOLIO LOADING LOGIC (Modified for in-page display) ---

const portfolioList = document.getElementById('project-list');
const portfolioDetailContent = document.getElementById('portfolio-detail-content'); // Get the new detail section
const portfolioBackButton = document.getElementById('portfolio-back-button'); // New back button
const portfolioModalImg = document.querySelector('[data-portfolio-modal-img]');
const portfolioModalTitle = document.querySelector('[data-portfolio-modal-title]');
const portfolioModalCategory = document.querySelector('[data-portfolio-modal-category]');
const portfolioModalCaption = document.querySelector('[data-portfolio-modal-caption]');
const portfolioModalDescription = document.querySelector('[data-portfolio-modal-description]');

let allPortfolioItems = []; // To store all fetched portfolio data

// Function to open the portfolio detail (in-page)
const openPortfolioDetail = function (item) {
  portfolioModalImg.src = item.image;
  portfolioModalImg.alt = item.alt;
  portfolioModalTitle.textContent = item.title;
  portfolioModalCategory.textContent = item.category;
  portfolioModalCaption.textContent = item.caption;
  portfolioModalDescription.textContent = item.long_description || '';

  portfolioList.style.display = 'none'; // Hide the project list
  portfolioDetailContent.style.display = 'block'; // Show the detail content
  window.scrollTo(0, 0); // Scroll to top of the detail content

  // Hide the entire filter section when showing detail
  document.querySelector('.portfolio .projects').style.display = 'none';
  select.classList.remove('active'); // Ensure mobile dropdown is closed
  // Also remove the dropdown-active-parent class from the article
  if (portfolioArticle) {
      portfolioArticle.classList.remove("dropdown-active-parent");
  }
  // Remove padding when opening detail page
  if (mainContent) {
      mainContent.classList.remove('dropdown-open-padding');
  }
}

// Function to close the portfolio detail (in-page)
const closePortfolioDetail = function () {
  portfolioList.style.display = 'grid'; // Show the project list (as a grid)
  portfolioDetailContent.style.display = 'none'; // Hide the detail content
  window.scrollTo(0, 0); // Scroll to top of the list

  // Show the entire filter section again when returning to list
  document.querySelector('.portfolio .projects').style.display = 'block';
  select.classList.remove('active'); // Ensure mobile dropdown is closed
  selectValue.innerText = "Select category"; // Reset mobile dropdown text to default
  // Also remove the dropdown-active-parent class from the article
  if (portfolioArticle) {
      portfolioArticle.classList.remove("dropdown-active-parent");
  }
  // Remove padding if it was added
  if (mainContent) {
      mainContent.classList.remove('dropdown-open-padding');
  }
}

// Add event listener for the "Back to Projects" button
if (portfolioBackButton) {
  portfolioBackButton.addEventListener('click', closePortfolioDetail);
}

/**
 * Renders portfolio items to the DOM.
 * @param {Array} itemsToRender - The array of portfolio items to display.
 */
const renderPortfolioItems = function (itemsToRender) {
  portfolioList.innerHTML = ''; // Clear current items
  itemsToRender.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('project-item', 'active'); // Add active class for display

    listItem.innerHTML = `
      <a href="#" data-project-id="${item.id}">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${item.image}" alt="${item.alt}" loading="lazy">
        </figure>
        <h3 class="project-title">${item.title}</h3>
        <p class="project-category">${item.category}</p>
      </a>
    `;
    portfolioList.appendChild(listItem);

    // Add click listener to open detail
    const projectLink = listItem.querySelector('a[data-project-id]');
    if (projectLink) {
      projectLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link navigation
        const clickedItemId = this.dataset.projectId;
        const selectedItem = allPortfolioItems.find(p => p.id === clickedItemId);
        if (selectedItem) {
          openPortfolioDetail(selectedItem);
        }
      });
    }
  });
};

// Initial load of portfolio items
fetch("assets/data/portfolio.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    allPortfolioItems = data; // Store all data
    renderPortfolioItems(allPortfolioItems); // Render all initially
    populateMobileFilterDropdown(); // Populate the mobile dropdown after data is loaded

    // Now, let's update the filter functionality to use the new data-driven approach
    // (This part is already in place and works with the updated filterFunc)
    // The desktop filter buttons are already handled by the 'for' loop above
  })
  .catch(error => console.error("Error loading portfolio data:", error));


// --- END PORTFOLIO LOADING LOGIC ---


// --- BLOG ARTICLE LOADING LOGIC (Modified for in-page display) ---

const blogListContainer = document.getElementById('blog-list-container');
const blogArticleContent = document.getElementById('blog-article-content'); // Get the new blog article section
const articleContentDiv = document.getElementById('article-content');
const blogBackButton = document.getElementById('blog-back-button');

/**
 * Loads an HTML article from the assets/posts directory and displays it in-page.
 * @param {string} filename The name of the HTML file (e.g., "sample-blog.html").
 */
async function loadArticle(filename) {
    const filePath = `assets/posts/${filename}`; // Points to your HTML file now
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load article: ${response.statusText}`);
        }
        const htmlContent = await response.text(); // Get raw HTML content
        articleContentDiv.innerHTML = htmlContent; // Directly inject HTML

        blogListContainer.style.display = 'none'; // Hide the blog list
        blogArticleContent.style.display = 'block'; // Show the article content
        window.scrollTo(0, 0); // Scroll to top of the article content
    } catch (error) {
        console.error("Error loading blog article:", error);
        articleContentDiv.innerHTML = `<p style="color: red;">Error loading article. Please try again later.</p>`;
        blogListContainer.style.display = 'block'; // Show list in case of error
        blogArticleContent.style.display = 'none'; // Hide article on error
        window.scrollTo(0, 0); // Scroll to top of the list
    }
}

// Event listener for the "Back to Blog Posts" button (inside the article)
if (blogBackButton) {
  blogBackButton.addEventListener('click', () => {
    blogArticleContent.style.display = 'none'; // Hide the article content
    blogListContainer.style.display = 'block';  // Show the blog list
    window.scrollTo(0, 0); // Scroll to top of the list
  });
}


// BLOG POST LOADER (No change needed here, it still fetches posts.json)
fetch("assets/data/posts.json")
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById("blog-list");
    container.innerHTML = ''; // Clear existing content before adding
    posts.forEach(post => {
      // Added data-file attribute to the <a> tag
      const listItem = document.createElement('li');
      listItem.classList.add('blog-post-item');
      listItem.innerHTML = `
        <a href="#" data-file="${post.file}">
          <figure class="blog-banner-box">
            <img src="${post.thumbnail}" alt="${post.title}" loading="lazy" />
          </figure>
          <div class="blog-content">
            <div class="blog-meta">
              <p class="blog-category">${post.category}</p>
              <span class="dot"></span>
              <time datetime="${post.date}">${formatDate(post.date)}</time>
            </div>
            <h3 class="h3 blog-item-title">${post.title}</h3>
            <p class="blog-text">${post.preview}</p>
          </div>
        </a>
      `;
      container.appendChild(listItem); // Append the created li element

      // Add event listener to the link within the newly created list item
      const blogLink = listItem.querySelector('a[data-file]');
      if (blogLink) {
        blogLink.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default link navigation
          const filename = this.dataset.file;
          loadArticle(filename); // Load article in-page
        });
      }
    });
  })
  .catch(error => console.error("Failed to load posts:", error));

// Format date from ISO-MM-DD to readable format
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options); // e.g. "Feb 23, 2022"
}


// --- RESUME LOADING LOGIC (New) ---

const educationList = document.getElementById('education-list');
const activitiesList = document.getElementById('activities-list');
const experienceList = document.getElementById('experience-list');

async function loadResumeData() {
    try {
        const response = await fetch('assets/data/resume.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resumeData = await response.json();
        
        // Render sections in the desired order: Experience > Activities > Education
        renderResumeSection(resumeData, 'experience', experienceList);
        renderResumeSection(resumeData, 'activity', activitiesList);
        renderResumeSection(resumeData, 'education', educationList);


    } catch (error) {
        console.error('Error loading resume data:', error);
    }
}

function renderResumeSection(data, type, containerElement) {
    containerElement.innerHTML = ''; // Clear existing content
    const filteredData = data.filter(item => item.type === type);

    filteredData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('timeline-item');

        let detailsHtml = '';
        if (item.details && Array.isArray(item.details)) {
            // For education and activities, which have bullet points
            detailsHtml = `<ul class="timeline-list-details">`;
            item.details.forEach(detail => {
                detailsHtml += `<li>${detail}</li>`;
            });
            detailsHtml += `</ul>`;
        } else if (item.description) {
            // For experience, which has a paragraph description
            // Replace newline characters with <br> for proper rendering
            const formattedDescription = item.description.replace(/\n/g, '<br>');
            detailsHtml = `<p class="timeline-text">${formattedDescription}</p>`;
        }

        listItem.innerHTML = `
            <h4 class="h4 timeline-item-title">${item.title}</h4>
            <span>${item.years}</span>
            ${detailsHtml}
        `;
        containerElement.appendChild(listItem);
    });
}
