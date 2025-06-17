'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

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


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    // filterFunc(selectedValue); // This will be handled by the new portfolio filter logic
  });
}

// filter variables - Filter logic will be updated to use the allPortfolioItems array
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  // This function will be updated to filter allPortfolioItems
  // Instead of directly toggling class on filterItems, we'll re-render based on data
  if (allPortfolioItems.length > 0) { // Ensure data is loaded
    const filtered = selectedValue === "all"
        ? allPortfolioItems
        : allPortfolioItems.filter(item => item.category.toLowerCase() === selectedValue);
    renderPortfolioItems(filtered);
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    // selectValue.innerText = this.innerText; // This is for mobile select, not desktop buttons
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
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
        // Reset filter button to 'All'
        document.querySelector('.filter-list .active')?.classList.remove('active');
        document.querySelector('[data-filter-btn][data-category="all"]').classList.add('active');
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
}

// Function to close the portfolio detail (in-page)
const closePortfolioDetail = function () {
  portfolioList.style.display = 'grid'; // Show the project list (as a grid)
  portfolioDetailContent.style.display = 'none'; // Hide the detail content
  window.scrollTo(0, 0); // Scroll to top of the list
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

    // Now, let's update the filter functionality to use the new data-driven approach
    const portfolioFilterBtns = document.querySelectorAll('[data-filter-btn]');
    portfolioFilterBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' from previous filter button
            document.querySelector('.filter-list .active')?.classList.remove('active');
            // Add 'active' to current filter button
            this.classList.add('active');

            const category = this.dataset.category;
            const filteredItems = category === 'all'
                ? allPortfolioItems
                : allPortfolioItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
            renderPortfolioItems(filteredItems);
        });
    });

    const portfolioSelectItems = document.querySelectorAll('[data-select-item]');
    portfolioSelectItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            const filteredItems = category === 'all'
                ? allPortfolioItems
                : allPortfolioItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
            renderPortfolioItems(filteredItems);
            // Update select value for mobile
            selectValue.textContent = this.textContent;
            elementToggleFunc(select); // Close the select dropdown
        });
    });

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