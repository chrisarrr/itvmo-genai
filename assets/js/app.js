// Add your custom javascript here
// console.log("Hi from Federalist");

/** Run functions **/

let baseUrl = window.location.origin;
//If detected that it is the sanbox url, change the base url. Change the baseurl to sanbox directory that able to obtain images.
if(baseUrl.includes("federalist"))
{
  baseUrl = `/preview/gsa/itvmo/main-itvmo-redesign-up-to-date`;
}
//Highlights section Variables
let curSlide = 0; 
let slideCount, slides, timer, dots;//Slide count in the highlight
//Run Home page 
if(document.getElementById('dynamic-panel') != null)
{
  populateHighlight();
  initHighlightButtons();
  runHighlight();
  document.addEventListener("DOMContentLoaded", () => 
  {
    positionHighlight();
  });
}
//Run Events page
let nav = 0;
let clicked = null;
// let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const eventList = [], pastEventList = [], futureEventList = [], pastEventHighlight = [];
const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const queryString = window.location.search;
let dateDisplay;
if( document.getElementById('events-page') != null)
{
  retriveEventsData();
  //Retrive the keys and their value from the URL.
  // localStorage.clear();
  const urlParams = new URLSearchParams(queryString);
  const d = urlParams.get('day'), m = urlParams.get('month')-1, y = urlParams.get('year');
  dateDisplay = document.getElementById("calendar-date-display");
  initEventButtons(d,m,y);
  runCalendar(d,m,y);
  displayEvents(document.getElementsByClassName('nav-list')[0],'upcoming-events', futureEventList);
  displayEvents(document.getElementsByClassName('nav-list')[1],'past-events', pastEventList);
  
}
//Run Resources page
//Faceted Navigation Variables
let filteredResults, facets, resources, searchInput;
const filterMap = new Map([["p-filter", "Policy"],["acquisition-best-practices", "Acquisition Best Practices"],["small-business", "Small Business"],["market-intelligence", "Market Intelligence"],["technology", "Technology"],["contract-solutions", "Contract Solutions"],["itvmo-general", "ITVMO General"]]);
const filterColorMap = new Map([["p-filter", "#f2938c"],["acquisition-best-practices", "#59b9de"],["small-business", "#abace5"],["market-intelligence", "#3e4ded"],["technology", "#ddaa01"],["contract-solutions", "#5abf95"],["itvmo-general", "#b04abd"]]);
const bOfferingMap = new Map([["acquisition-policy-it-category","Acquisition Policy &  IT Category"],["it-buyers-training-support", "IT Buyers Training & Support"],["market-it-data-intelligence","Market & IT Data Intelligence"],["small-business-support","Small Business Support"],["oem-acquisition-initiatives","OEM-Acquisition Initiatives"]]);
const audienceMap = new Map([["contracts-acquisitions","Contracts/Acquisitions"],["program-operations","Program/Operations"],["security-compliance","Security/Compliance"],["industry-all-businesses","Industry (All Businesses)"]]);
let clearAllButton, facetNav, resourceOverlay, facetList, facetButton, closeButton;
if(document.getElementById('resources') != null)
{
  //Display all the resource cards right away.
  document.addEventListener("DOMContentLoaded", () => {
    updateResults();
  });
  retriveResourceData();
  initalizeSearch();
  initalizeClearAll();
  initalizeFacets();
  initalizeOverlay();
  initalizeWindow();
}

//Run News page
if(document.getElementById('news') != null)
{
  //Collect Artcles data here
  let articles;
  let prevButton, nextButton, startButton, endButton, totalPages;
  const buttonMap = new Map();
  const publisherMap = new Map();
  const itemsPerPage = 9; // Number of items to display per page
  const pageMax = 5; // Max page button that going to be display on the page.
  const pageMaxHalf = Math.floor(pageMax / 2); // Half page count from the pageMax.
  let currentPage = 1;

  retriveArticlesData();
  retrivePublisher();
  initPagination();

  //This function get all the Articles data.
  function retriveArticlesData()
  {
    articles = ["Item 1", "Item 2", "Item 3","Item 4","Item 5","Item 6","Item 7","Item 8","Item 9","Item 10","Item 11","Item 12","Item 13","Item 14","Item 15","Item 16","Item 17","Item 18","Item 19","Item 20","Item 21","Item 22","Item 23","Item 24","Item 25","Item 26","Item 27","Item 28","Item 29","Item 30"];  
    articlesData = document.getElementsByClassName("raw-article-data");
    let finalArticles = [];
    for( a of articlesData)
    {
      finalArticles.push(
        {
        "publisher":a.getAttribute("data-publisher"),
        "title":a.getAttribute("data-title"),
        "description":a.getAttribute("data-description"), 
        "link":a.getAttribute("data-url"),
        "date":a.getAttribute("data-publication-date"),
        "synopsis":a.getAttribute("data-synopsis")
      });

      
      // let currArticle =
      // {
      //   "publisher":resource.getAttribute("data-publisher"),
      //   "title":resource.getAttribute("data-title"),
      //   "description":resource.getAttribute("data-description"), 
      //   "link":resource.getAttribute("data-url"),
      //   "date":resource.getAttribute("data-publication-date"),
      //   "synopsis":resource.getAttribute("data-synopsis"),
      // };
      // finalArticles.set(currArticle.name)
    }
    articles = finalArticles;
    console.log(articles);
  }

 //This function get all the Publisher data.
  function retrivePublisher()
  {
    publisherData = document.getElementsByClassName("raw-publisher-data");
    for( publisher of publisherData)
    {
      let currPublisher =
      {
        "name":publisher.getAttribute("data-publisher"),
        "link":publisher.getAttribute("data-url"),
        "logo":publisher.getAttribute("data-logo")
      };
      publisherMap.set(currPublisher.name, currPublisher);
    }
    console.log(publisherMap);
  }

  //This function initalize Pagination.
  function initPagination() 
  {
    totalPages = Math.ceil(articles.length / itemsPerPage);
    createPaginationButtons(totalPages);
    displayArticles(currentPage);
  }

  //This function display the articles according to the page number.
  function displayArticles(page) 
  {
    if(page == 1) 
    {
      startButton.style.display = "none";
      prevButton.style.display = "none";
    }
    else
    {
      startButton.style.display = "block";
      prevButton.style.display = "block";
    }

    if(page == totalPages)
    {
      nextButton.style.display = "none";
      endButton.style.display = "none";
    }
    else
    {
      nextButton.style.display = "block";
      endButton.style.display = "block";
    }
    

    const articleList = document.getElementById('articles-container');
    articleList.innerHTML = ''; // Clear previous content
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let dispalyArticles = "";
    articleList.innerHTML = "";
    for (let i = startIndex; i < endIndex && i < articles.length; i++) 
    {
      let publisher = publisherMap.get(articles[i].publisher);
      console.log(articles[i].synopsis != "");
      let articleLink = articles[i].link;
      if(articles[i].synopsis != "")
      {
        articleLink = baseUrl; //!!File slug
      }
      dispalyArticles +=     
      `
        <a target="_blank" rel="noreferrer" href="${articleLink}" class="article">
          ${articles[i].publisher}
          ${articles[i].title}
          ${articles[i].description}
          ${articles[i].link}
          ${articles[i].date}

          ${publisher.name}
          ${publisher.link}
          <img src="${baseUrl}/${publisher.logo}" alt="${publisher.name} logo">
        </a>
      `;
    }
    articleList.innerHTML = dispalyArticles;
  }

  //This function populate Pagination on the News page.
  function createPaginationButtons(totalPages) 
  {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    //Populate Start button
    startButton = document.createElement('button');
    startButton.innerHTML = `<img class="image-flip img-border-right" alt="right arrow icon" src="${baseUrl}/assets/images/arrows/end-arrow.svg">`;
    startButton.ariaLabel = 'This button direct to the first page of the articles';
    startButton.addEventListener('click', () => {
      if (currentPage > 1) 
      {
        currentPage = 1;
        buttonMap.get(currentPage.toString()).click();
      }
    });

    //Populate Previous button
    prevButton = document.createElement('button');
    prevButton.innerHTML = `<img class="image-flip" alt="right arrow icon" src="${baseUrl}/assets/images/arrows/right-arrow-news.svg">`;
    prevButton.ariaLabel = 'This button will direct to the previous page articles';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) 
      {
        currentPage--;
        buttonMap.get(currentPage.toString()).click();
      }
    });
  ;
    //Populate Pagination number button, and store it in the buttonMap.
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      if(i == 1) button.classList.add("articles-page-active");
      button.classList.add("articles-page");
      button.textContent = i;
      button.ariaLabel = `Article page ${i}`;
      button.addEventListener('click', () => 
      {
        currentPage = i;
        let acActive = document.getElementsByClassName("articles-page-active")
        if(acActive[0] != null) acActive[0].classList.remove("articles-page-active");
        setPagination();  
        button.classList.add("articles-page-active");    
        displayArticles(currentPage);
        document.getElementById("article-heading").scrollIntoView({ behavior: "smooth"});  
      });
      buttonMap.set(button.textContent, button);
    }
    //Populate Next button
    nextButton = document.createElement('button');
    nextButton.innerHTML = `<img alt="right arrow icon" src="${baseUrl}/assets/images/arrows/right-arrow-news.svg">`;
    nextButton.ariaLabel = 'This button will direct to the next page articles';
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) 
      {
        currentPage++;
        buttonMap.get(currentPage.toString()).click();
      }
    });

    //Populate End button
    endButton = document.createElement('button');
    endButton.innerHTML = `<img class="img-border-right" alt="right arrow icon" src="${baseUrl}/assets/images/arrows/end-arrow.svg">`;
    endButton.ariaLabel = 'This button direct to the last page of the articles';
    endButton.addEventListener('click', () => {
      if (currentPage < totalPages) 
      {
        currentPage = totalPages;
        buttonMap.get(currentPage.toString()).click();
      }
    });
    setPagination();
  }

  //This function set Pagination page buttons according to the array that return from getFromToButton().
  function setPagination()
  {
    pagination.innerHTML = '';
    pagination.appendChild(startButton);
    pagination.appendChild(prevButton);
    const buttonDisplayList = getFromToButton(); //use the value in the array to get buttons from the map to display on the pagenation.
    for( buttonKey of buttonDisplayList)
    {
      pagination.appendChild(buttonMap.get(buttonKey.toString()));
    }
    pagination.appendChild(nextButton);
    pagination.appendChild(endButton);
  }

  //This function return array of page number that going to be display on Pagination.
  function getFromToButton()
  {
      let to = pageMax;
      
      if(currentPage + pageMaxHalf >= totalPages) {
        to = totalPages;
      } else if(currentPage > pageMaxHalf) {
        to = currentPage + pageMaxHalf ;
      }
      
      let from = Math.max(to - pageMax, 0);
    
      return Array.from({length: Math.min(totalPages, pageMax)}, (_, i) => (i + 1) + from);
  }

}

//Run Inner page

let pageHeadingHeight; //Use to calculate whether when the side nav bar should start moving.

//If Main page.
try {
  pageHeadingHeight = document.getElementById('main-page-heading').offsetHeight;
  //If Events page there are Announcement as well that need tp be add to pageHeadingheight.
  if(document.getElementById('page-announcements') != null)
  {
    pageHeadingHeight += document.getElementById('page-announcements').offsetHeight;
  }
} 
//If Inner page
catch (error) {
  pageHeadingHeight = document.getElementById('inner-page-heading').offsetHeight;
}

if(document.getElementById('page-directory') != null) //Other page beside homepage contain page-directory.
{
  populateDirectory();
  initalizeTabIndex();
  initalizePageNav();
}

/** Resources page **/

/** Resource page Faceted Navigation **/
//This function initalize Overlay on the Resources page. 
//While Faceted Navigation displayed (Mobile Version), if user click on the overlay the Faceted Navigation and overlay will be hidden.
function initalizeOverlay()
{
  resourceOverlay = document.getElementById("custom-overlay");
  resourceOverlay.addEventListener("click", closeFacetedNav);
}
//This function add evenlistener to the window.
function initalizeWindow()
{
  // Call the checkScreenWidth function when the window is resized
  window.addEventListener("resize", checkScreenWidth);
  // Call the checkScreenWidth function initially to handle the initial window width
  checkScreenWidth();
}

//This function if the width of the screen is lesser than 1230 (Mobile version of the Faceted Navigation), all the Facets on the Faceted Navigation will be unhide.
function checkScreenWidth() {
  const thresholdWidth = 1230; // Adjust this value as needed

  // Get the current width of the browser window
  const screenWidth = window.innerWidth;
  if (screenWidth < thresholdWidth) 
  {
    hideFacets();
  }
  else
  {
    unhideFacets();
    // const facetList = document.getElementsByClassName("facet-list");
    for(let i=1; i< facetList.length; i++)
    {
      facetList[i].classList.remove("facet-list-active");
      setCheckboxesTabIndex(facetList[i],-1);
    }
  }
}
//This function make all the facets display their dropdown list.
function unhideFacets()
{
  closeButton[0].tabIndex = 0;
  for(let i=0; i< facetButton.length; i++)
  {
    facetButton[i].tabIndex = 0;
  }
  for(let i=0; i< facetList.length; i++)
  {
    if(!facetList[i].classList.contains("facet-list-active"))
    {
      facetList[i].classList.add("facet-list-active");
      setCheckboxesTabIndex(facetList[i],0);
    }
  }
}
//This function make all the facets hide their dropdown list, except the very first facet.
function hideFacets()
{
  closeButton[0].tabIndex = -1;
  for(let i=0; i< facetButton.length; i++)
  {
    facetButton[i].tabIndex = -1;
  }
  for(let i=0; i< facetList.length; i++)
  {
    facetList[i].classList.remove("facet-list-active");
    setCheckboxesTabIndex(facetList[i],-1);
  }
}
//This function unhide the Faceted navigation (mobile version of the page).
function openFacetedNav() 
{
  resourceOverlay.classList.add("overlay-active");
  facetNav.classList.add("faceted-display-mobile");
  unhideFacets();

}
//This function hide tabs and display the tab that press enter or spacebar.
function openFacetedNavKey(e)
{
  if((e.keyCode === 32)||(e.keyCode === 13))
  {
    openFacetedNav();
  }
}
//This function hide the Faceted navigation (mobile version of the page).
function closeFacetedNav() 
{
  resourceOverlay.classList.remove("overlay-active");
  facetNav.classList.remove("faceted-display-mobile");
  hideFacets();
}
//This function will update resource cards according to both search and facets
function updateResultsSearch() 
{
  const selectedFacets = facets.map(facet =>
    Array.from(facet.querySelectorAll("input:checked")).map(input => input.value)
  );
  const filteredResources = getFilteredRecources(selectedFacets); 
  const searchTerm = searchInput.value;
  const searchData = filterBySearch(filteredResources, searchTerm);
  displayResults(searchData);
}

//This function return the filter resources that also match the search input that user inserted.
function filterBySearch(filteredResources, searchTerm) 
{
  if (!searchTerm) 
  {
    return filteredResources;
  }
  searchTerm = searchTerm.toLowerCase();
  return filteredResources.filter(item => { return item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);});
}

//This function dropdown the facet list when click on it heading button.
function displayDropdownContent(aButton)
{
  const ariaControlsValue = aButton.getAttribute("aria-controls");
  const aButtonArrow = aButton.children[1];
  const currA = document.getElementById(ariaControlsValue);
  if(currA.classList.contains("facet-list-active") == false)
  { 
    aButtonArrow.classList.add("dropdown-arrow-active");
    currA.classList.add("facet-list-active");
    setCheckboxesTabIndex(currA, 0);
  }
  else 
  {
    aButtonArrow.classList.remove("dropdown-arrow-active");
    currA.classList.remove("facet-list-active");
    setCheckboxesTabIndex(currA, -1);
  }
}
//This function set all the checkboxes inside the facet tabindex according to the parameter that passing through.
function setCheckboxesTabIndex(currFacetList,tabI)
{
  const checkboxList = currFacetList.children[0].children;
  for(let i = 0; i < checkboxList.length; i++)
  {
    checkboxList[i].children[0].tabIndex = tabI;
  }
}
//This function initalize the search on the Resoruces page
function initalizeSearch()
{
  searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", updateResultsSearch);
}
//This function initalize the Clear All button on the page
function initalizeClearAll()
{
  clearAllButton = document.getElementById("clear-all");
  clearAllButton.addEventListener("click", clearAllFacets);
}
//This function initalize all the Facets on the page
function initalizeFacets()
{
  facetList = document.getElementsByClassName("facet-list");
  facetButton = document.getElementsByClassName("facet-dropdown");
  closeButton = document.getElementsByClassName("closebtn");
  filteredResults = document.getElementById("filtered-results");
  facetNav= document.getElementById("faceted-nav");
  facets = [document.getElementById("topic-area"), document.getElementById("audience"), document.getElementById("resource-type"), document.getElementById("resource-source"), document.getElementById("filtered-results")];
  for (const facet of facets) {
    facet.addEventListener("change", updateResults);
  }
}

//This function retrive the Resource Data from Resource page to prepare to display.
function retriveResourceData()
{
  resources = document.getElementsByClassName("raw-resource-data");
  let finalResources = [];
  for( resource of resources)
  {
    finalResources.push(
      {
      "title":resource.getAttribute("data-title"),
      "description":resource.getAttribute("data-description"), 
      "link":resource.getAttribute("data-url"),
      "type":resource.getAttribute("data-type"),
      "govOnly":resource.getAttribute("data-gov-only"),
      "isExternal":resource.getAttribute("data-is-external"),
      "filter":resource.getAttribute("data-filter"),
      "brandOffering":resource.getAttribute("data-branded-offerings"),
      "audience":resource.getAttribute("data-audience"),
      "date":resource.getAttribute("data-publication-date"),
      "readTime":resource.getAttribute("data-reading-time"),
      "resourceType":resource.getAttribute("data-resource-type"),
    })
  }
  resources = finalResources;
}

//This function will update the result according to the input on all of the facets
function updateResults() 
{
  //Each facet in facets create a  array of input that checked by the user.
  const selectedFacets = facets.map(facet =>
    Array.from(facet.querySelectorAll("input:checked")).map(input => input.value)
  );
  updateFacetsListChecked(selectedFacets);
  const filteredResources = getFilteredRecources(selectedFacets); 
  displayResults(filteredResources);
}
//This function display checked count on for each facet, 
//if total checked of all facets combine is greater than 0 display clear all button.
function updateFacetsListChecked(selectedFacets)
{
  let checkedCountList = document.getElementsByClassName("checked-count");
  let totalCheckedCount = 0;

  for(let i = 0; i < checkedCountList.length; i++)
  {
    if(selectedFacets[i].length != 0)
    {
      checkedCountList[i].innerHTML = `(${selectedFacets[i].length})`;
      totalCheckedCount++;
    }
    else
    {
      checkedCountList[i].innerHTML = "";
    }
  }
  if(totalCheckedCount > 0)
  {
    clearAllButton.style.display = "block";
  }
  else
  {
    clearAllButton.style.display = "none";
  }
}

//This function retrive resources that match facets requirement.
function getFilteredRecources(selectedFacets) 
{
  const filteredResources = resources.filter(resource => {

    const [selectedTotalArea, selectedAudience, selectedResourceType, selectedSource] = selectedFacets;
    const totalAreaMatch = selectedTotalArea.length === 0 || selectedTotalArea.includes(resource.filter);
    const audienceMatch = selectedAudience.length === 0 || selectedAudience.includes(resource.audience);
    const resourceTypeMatch = selectedResourceType.length === 0 || selectedResourceType.includes(resource.resourceType);
    const sourceMatch = selectedSource.length === 0 || selectedSource.includes(resource.govOnly);
    return totalAreaMatch && audienceMatch && resourceTypeMatch && sourceMatch;
  });

  return filteredResources;
}

//This function reset all the Facets.
function clearAllFacets() 
{
  const checkboxes = document.querySelectorAll(".facet-options input[type='checkbox']");

  for (const checkbox of checkboxes) {
    checkbox.checked = false;
  }

  updateResults();
}

//This function will display each resources into resource cards according to the filterResources that pass through, 
//This function also update the Resoruce cards count on the page.
function displayResults(filterResources) 
{
  filteredResults.innerHTML = "";

  if (filterResources.length === 0) {
    filteredResults.innerHTML = `<p class="no-results">No results found.</p>`;
  } 
  else 
  {
    let resourceCardList = ``;
    let resourcesCount = 0;
    for (const resource of filterResources) 
    {
      let viewCount = 30; //!!Query and insert the view counts here
      let resourceF = filterMap.get(resource.filter);
      let resourceBO = bOfferingMap.get(resource.brandOffering);
      let resourceA = audienceMap.get(resource.audience);
      let resourceColor = filterColorMap.get(resource.filter);
      let resultItem = 
      `
        <div class="resource-card" style="border-color: ${resourceColor};">
          <a target="_blank" rel="noreferrer" href="${resource.link}" >
              <div class="resource-content">
                <div aria-label="Filter: ${resourceF}" class="resource-filter"><span>${resourceF}</span></div>
                <div aria-label="Title: ${resource.title}" class="resource-name"><p class="two-line-max">${resource.title}</p>
                `
                if(resource.isExternal == 'true')
                {resultItem +=`<img alt="External icon" src="${baseUrl}/assets/images/icons/external.svg">`;}
                
                resultItem +=`</div>
                <div aria-label="Description: ${resource.description}" class="resource-description" aria-details="description"><p class="">${resource.description}</p></div>
                <div class="resource-detail">
                  <div class="file-type">
                    <p>${resource.type}</p>
                  </div>`;

                  if(resource.govOnly == 'true')
                  {
                    resultItem +=`<div class="govmil">
                      <img alt="Lock icon" src="${baseUrl}/assets/images/icons/lock.svg">
                    </div>`
                  }
                  
                  resultItem +=`<div class="audience">
                    <p>${resourceA}</p>
                  </div>
                  <div class="branded-offerings">
                    <p>${resourceBO}</p>
                  </div>
                </div>
              </div>

            <div class="resource-line"></div>

            <div class="resource-info">
              <div class="resource-date">
                <img alt="Calendar icon" src="${baseUrl}/assets/images/icons/calendar.svg">
                <div class="resource-logo"><span>${resource.date}</span></div>
              </div>
              <div class="resource-rtime">
                <img alt="Stop watch icon" src="${baseUrl}/assets/images/icons/stop-watch.svg">
                <div class="resource-logo"><span>${resource.readTime} minute read</span></div>
              </div>
              <div class="resource-view">
                <img alt="Eye icon" src="${baseUrl}/assets/images/icons/eye.svg">
                <div class="resource-logo"><span>${viewCount} View</span></div>
              </div>
            </div>
          </a>
        </div>
      `;
      resourceCardList += resultItem;
      resourcesCount++;
    }
    filteredResults.innerHTML = `<p id="resources-count">${resourcesCount} Items </p>` + resourceCardList;
  }
}



/** Populate Inner page **/

//This function initalize all the page-nav click functionality.
function initalizePageNav()
{
  //Each nav-list have it own page-nav and their page-nav are not associate to each other.
  var navList = document.getElementsByClassName('nav-list');
  for(let i = 0; i < navList.length; i++)
  {
    var pageNavs = navList[i].getElementsByClassName('page-nav')
    for(let j=0; j< pageNavs.length; j++)
    {
      pageNavs[j].addEventListener('click', function()
      {
        removePageActive(navList[i]);
        setPageActive(this)
        navOpenTabContent(this);
      });
    }
  }
}
//This function remove the page-nav-active from page-nav in the current inner tab, 
//and not associate with the page-nav in other inner tab of the same page.
function removePageActive(nav)
{
  let pageActive = nav.getElementsByClassName("page-nav-active");
  if(pageActive[0] != undefined)
  {
    pageActive[0].classList.remove("page-nav-active");
  }
}
//This function add the page-nav-active to specific page nav (event).
function setPageActive(event)
{
  event.classList.add("page-nav-active");
}
$(function(){    
  function updateNavPosition($navList, scrollTop, contentNavHeight, totalHeightAbove) {
      if(scrollTop >= 0 && scrollTop < totalHeightAbove && scrollTop < (contentNavHeight - $navList.height())) {            
          $navList.removeClass('fixed').addClass('absolute').css('top', 0);
      } 
      else if(scrollTop >= totalHeightAbove && scrollTop < contentNavHeight) {            
          $navList.removeClass('absolute').addClass('fixed').css('top', 5); //Need to be change accordingly
      } 
      else {
          $navList.removeClass('fixed').addClass('absolute').css('top', contentNavHeight - $navList.height());
      } 
  }

  $(window).scroll(function(){ 

      $('.content-nav').each(function() {
          var $contentNav = $(this);
          var $navList = $contentNav.find('.nav-list');
          var contentNavHeight = $contentNav.height();
          var scrollTop = $(window).scrollTop();
          var totalHeightAbove = 360 + pageHeadingHeight;

          updateNavPosition($navList, scrollTop, contentNavHeight, totalHeightAbove);
      });
  });
});
//This function hide all accordion content and display the correct one, and then scroll to that specific accordion.
function navOpenTabContent(pageNav)
{
  let aButton;
  if(pageNav.classList.contains("accordion-nav") == true)
  {
    aButton = document.getElementById(pageNav.getAttribute("aria-controls"));
    displayTabContent(aButton);//Hide all accordion content and display the correct one
    setTimeout(function(){ aButton.scrollIntoView({ behavior: "smooth" });}, 500);//Wait until the displayTabContent animation is over before scroll to the section.
  }
}
//This function display accordion content according to accordion Id that accordion button have.
function displayTabContent(aButton)
{
  //If there is accordion-active class exist remove it.
  let aActive = document.getElementsByClassName("accordion-active");
  if(aActive[0] !== undefined)
  {
    aActive[0].classList.remove("accordion-active");
  }

  const ariaControlsValue = aButton.getAttribute("aria-controls");
  let tabArrow = aButton.getElementsByClassName("tab-arrow");
  const currA = document.getElementById(ariaControlsValue);
  //If the Accordion content that retrive from aButton is not open, therefore open the Accordion content.
  if(currA.classList.contains("accordion-content-display") == false)
  {
    //Add accordion-active style to the Accordion that clicked (aButton)
    aButton.classList.add("accordion-active"); 
    let aContent = document.getElementsByClassName("accordion-content-display");
    //Hide all other Accordion content, and also reset tab arrow to default rotation.
    if(aContent[0] !== undefined)
    {
      assignTabIndex(aContent[0], -1);
      let tabArrowActive = document.getElementsByClassName("tab-arrow-active")
      tabArrowActive[0].classList.remove("tab-arrow-active");
      aContent[0].classList.remove("accordion-content-display");
    }
    //Display new Accordion content according to aButton, and also rotate the arrow.
      tabArrow[0].classList.add("tab-arrow-active");
      currA.classList.add("accordion-content-display");
      assignTabIndex(currA, 0);
  }
  //If the Accordion content that retrive from aButton is open, therefore close the content.
  else
  {
    tabArrow[0].classList.remove("tab-arrow-active");
    currA.classList.remove("accordion-content-display");
    assignTabIndex(currA, -1);
  }
}
//This function assign all the Anchor elements that are children of any accordion-content class to tabindex=-1.
function initalizeTabIndex()
{
  const accordionContentList = document.querySelectorAll('.accordion-content');
  accordionContentList.forEach(accordionContent => 
  {
    assignTabIndex(accordionContent, -1);
  });
}
//This function assignTabIndex assign new tabindex value to all Anchor elements that are children of the "e", according to "index".
function assignTabIndex(e, index)
{
  let aList = e.querySelectorAll('a');
  aList.forEach((anchor) => {anchor.setAttribute('tabindex', index);});
}

//This function populate the directory of the current page that trace back to root (homepage).
function populateDirectory()
{
  let currentUrl = window.location.href;
  let urlSplit = currentUrl.replace("http://","")
  urlSplit = urlSplit.split("/")
  urlSplit.pop();
  let newElements = ``;
  for(let i = urlSplit.length-1; i >= 0; i--)
  {
    let currentPage = urlToString(urlSplit[i]);
    currentUrl = currentUrl.replace(`${urlSplit[i+1]}/`,'');

    //If specific page need specific name on the Directory, insert here
    currentPage = currentPage.replace(/oem/gi, "OEM Support");
    // currentPage = currentPage.replace(//gi, "");
    

    //This using for the sandbox, delete this later!!
    if(currentUrl == "https://federalist-ce2ad52a-cc88-456b-a4c1-74c6e5887c73.sites.pages.cloud.gov/preview/gsa/itvmo/main-itvmo-redesign-up-to-date/")
    {
      newElements+= `<a href="${currentUrl}">Home</a>`
      break;
    }
    if(i == urlSplit.length-1) //The page that the user currently on, make it not a link.
    {
      newElements+= `<p>${currentPage}</p><img src="${baseUrl}/assets/images/icons/directory-arrow.svg">`
    }
    else if(i > 0)
    {
      newElements+= `<a href="${currentUrl}">${currentPage}</a><img src="${baseUrl}/assets/images/icons/directory-arrow.svg">`
    }
    else //"Home" for baseurl
    {
      newElements+= `<a href="${currentUrl}">Home</a>`
    }
  }
  document.getElementById('page-directory').innerHTML = newElements;
}
//This function capitalize first letter and letter after hyphen (-)
function urlToString(str) {
  let capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
  capitalizedStr = capitalizedStr.replace(/-(\w)/g, (match, letter) => ' ' + letter.toUpperCase());
  return capitalizedStr;
}

//This function hide all tabs and display the tab that clicked.
function openTab(e, tabId) 
{
  //Reset all the tabs and all the tab contents.
  let tabcontent = document.getElementsByClassName("tabcontent");
  let tabList = document.getElementsByClassName("tab");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabList[i].className = tabList[i].className.replace(" active-tab", "");
  }
  document.getElementById(tabId).style.display = "flex"; //Display the content of the correct tabId.
  e.currentTarget.className += " active-tab"; 

  //Update the dropdown value for the mobile version of the inner tabs well.
  document.getElementById('tabs-mobile').value = e.currentTarget.id;
}
//This function hide tabs and display the tab that press enter or spacebar.
function openTabKey(e, tabId)
{
  if((e.keyCode === 32)||(e.keyCode === 13))
  {
    openTab(e, tabId);
  }
}
function openTabDropdown()
{
  document.getElementById(document.getElementById('tabs-mobile').value).click();
}

/** Events page**/

//This function retrive all events data from Events page to prepare to display.
function retriveEventsData()
{
  const rawEventList = document.getElementsByClassName("raw-event-data");
  const rawPastHighlights = document.getElementsByClassName("raw-past-event-highlight-data");
  const currentDate = new Date(); //use to determine if events will be store in pastEventList or futureEventList
  currentDate.setHours(0, 0, 0, 0); //So all the event that the same date as current date but the time is lesser than the current date will be count as futureEventList as well.
  for( ev of rawEventList)
  {
    const startTime = new Date((ev.getAttribute("data-st").replace(" ","T")).replace(" +","+"));
    const endTime = new Date((ev.getAttribute("data-et").replace(" ","T")).replace(" +","+"));
    const eventTime = `${getDateTime(startTime)} - ${getDateTime(endTime)} EST`;
    const currEvent =       
    {
      "organizer":ev.getAttribute("data-organizer"),
      "title":ev.getAttribute("data-title"),
      "description":ev.getAttribute("data-description"), 
      "link":ev.getAttribute("data-url"),
      "date":startTime,
      "day":weekdaysShort[startTime.getDay()],
      "dateNumber":startTime.getDate(),
      "month":startTime.getMonth(),
      "fromTo":eventTime,
      "eventType":ev.getAttribute("data-event-type"),
      "govOnly":ev.getAttribute("data-gov-only"),
      "isExternal":ev.getAttribute("data-is-external"),
    }
     eventList.push(currEvent);
     if(startTime < currentDate)
     {
      pastEventList.push(currEvent);
     }
     else
     {
      futureEventList.push(currEvent)
     }

  }
  //Sort futureEventList in ascending order of date.
  futureEventList.sort((a,b) => a.date - b.date);
  //Sort pastEventList in descending of date.
  pastEventList.sort((a,b) => b.date - a.date);
  for( ev of rawPastHighlights)
  {
    const currEvent =       
    {
      "title":ev.getAttribute("data-title"),
      "description":ev.getAttribute("data-description"), 
      "link":ev.getAttribute("data-url"),
      "image":ev.getAttribute("data-image")
    }
    pastEventHighlight.push(currEvent);
  }
  console.log(pastEventHighlight);

}

//This function extract the time from the date, and assign AM or PM depend on the time.
function getDateTime(date) 
{
  const hours = date.getUTCHours(); //Eventhough it UTC but we will treat it as EST.
  const minutes = date.getUTCMinutes();
 
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = String(minutes).padStart(2, "0");

  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedTime;
}

/** Event page calendar **/

//This function generate Upcoming Events tab or Past Events tab depend on the arguments.
async function displayEvents(navList, tabId ,currEventList)
{
  let eventContainer = document.getElementById(tabId).children[0];
  let currMonth = "";
  let monthEventCount = 0;
  let active = true; //Allow the first month on the side nav to be active.
  let currMonthDiv;
  navList.innerHTML = 
  ` 
    <h3>On this Page</h3>    
  `
  //If the tab is Past Events tab
  if(tabId == 'past-events')
  {
    navList.innerHTML += 
    `
    <a aria-label="Side navigation direct to Past Event Highlights" class="page-nav page-nav-active" href="#past-event-highlights">Past Event Highlights</a>
    `;
    eventContainer.innerHTML = 
    `
      <div id="past-event-highlights">
      </div>
    `;
    // console.log(eventContainer.children[0]);
    //
    eventContainer.children[0].innerHTML = 
    `
    <h3 class="topic-heading">Past Event Highlights</h3>
    <div id="event-highlights-container"><div>
    `;
    // console.log(eventContainer.children[0].children[1]);
    eventContainer.children[0].children[1].innerHTML = ""
    for(ev of pastEventHighlight)
    {
      console.log(ev.title.length);
      console.log(ev.title.length > 25);

      let currHighlight = '';
      //If the Past Event Highlight have image file that is not SVG, display change the style of the image.
      if(!ev.image.includes('.svg'))
      {
        currHighlight += 
        `
        <a href="${ev.link}" class="event-highlight bg-img">
        `
      }
      else
      {
        currHighlight += 
        `
        <a href="${ev.link}" class="event-highlight">
        `
      }
      currHighlight += 
      `
        <img alt="Highlight background image" src="${baseUrl}/${ev.image}">
        <div class="highlight-description">
          <h2 class="two-line-max" title="Event highlight title:">${ev.title}</h2>
      `
      if(ev.title.length > 25)
      {
        currHighlight += 
        `
            <p class="past-event-highlight-shorten">
            ${ev.description}
            </p>
          </div>
        </a>
        `
      }
      else 
      {
        currHighlight += 
        `
            <p class="past-event-highlight">
            ${ev.description}
            </p>
          </div>
        </a>
        `
      }
      eventContainer.children[0].children[1].innerHTML += currHighlight;
    }
    active = false; //Since Past Event Hightlights already active.
  }
  for(let i = 0; i < currEventList.length; i++)
  {
    let currEventMonth = `${currEventList[i].date.getMonth()+1}${currEventList[i].date.getFullYear()}`;
    if(currMonth == "")
    {
      //Create Unique ID for the div (month + year + the container of the ID ). Since Past event can have a same month as the Upcoming, this will eliminate the issue.
      currMonth = currEventMonth+tabId;
      currMonthDiv = setMonthDiv(eventContainer, currMonth, months[currEventList[i].date.getMonth()], currEventList[i].date.getFullYear());
    }
    //If detect that currEventMonth is no longer equal to currMonth, therefore change the currMonth to currEventMonth and reset the monthEventCount to 1.
    if(currMonth != currEventMonth+tabId)
    {
      setPageNav(navList, currMonth, monthEventCount, months[currEventList[i-1].date.getMonth()], currEventList[i].date.getFullYear(), active); //i-1 because the current futureEventList[i] already the different month.
      currMonth = currEventMonth+tabId;
      monthEventCount = 1;
      active = false;
      currMonthDiv = setMonthDiv(eventContainer, currMonth, months[currEventList[i].date.getMonth()], currEventList[i].date.getFullYear());
    }
    else
    {
      monthEventCount++;
    }
    if(i == (currEventList.length-1))
    {
      setPageNav(navList, currMonth, monthEventCount, months[currEventList[i].date.getMonth()], currEventList[i].date.getFullYear(), active);
      // setMonthDiv(currMonth);
    }
    setEventDiv(currMonthDiv, currEventList[i], `${months[currEventList[i].month]} ${currEventList[i].dateNumber}, ${currEventList[i].date.getFullYear()}`)
  }
}
//This function intalize the page-nav in nav-list.
function setPageNav(navList, monthId, monthCount, fullMonth, fullYear, active)
{
  if(active == true)
  {
    navList.innerHTML += `<a aria-label="Side navigation direct to ${fullMonth} ${fullYear} have the event count of ${monthCount}" class="page-nav page-nav-active" href="#${monthId}">${fullMonth} ${fullYear} <span>(${monthCount})</span></a>`
  }
  else
  {
    navList.innerHTML += `<a aria-label="Side navigation direct to ${fullMonth} ${fullYear} have the event count of ${monthCount}" class="page-nav" href="#${monthId}">${fullMonth} ${fullYear} <span>(${monthCount})</span></a>`
  }
}
//This function create div that have the id set to monthId.
function setMonthDiv(eventContainer, monthId, fullMonth, fullYear)
{
  eventContainer.innerHTML += `
  <div id="${monthId}" class="event-cards">
    <h3 class="topic-heading">
      ${fullMonth} ${fullYear}
    </h3>
  </div>
  `;
  return document.getElementById(monthId);
}
function setEventDiv(monthDiv, currEvent, currDate)
{
  let gOnly = `<div class="event-card-gov-line"></div>`
  let gLogo = ``;
  if(currEvent.govOnly == 'true')
  {
    gOnly = 
    `
      <div class="event-card-gov-lock">
        <img aria-label="This is Gov only event" src="${baseUrl}/assets/images/icons/lock-blue.svg" alt="Lock icon">
      </div>
    `
    gLogo =`<img aria-label="This is Gov only event" src="${baseUrl}/assets/images/icons/lock-blue.svg" alt="Lock icon">`;
  }
  let isEx = `ITVMO Event`;
  let exLogo = ``;
  if(currEvent.isExternal == 'true')
  {
    isEx = `Non-ITVMO Event`;
    exLogo = `<img src="${baseUrl}/assets/images/icons/external.svg" alt="External icon">`;
  }
  monthDiv.innerHTML += 
  `
      <a href="${currEvent.link}" class="event-card">
      <div aria-hidden="true" class="event-card-day">
        <div class="card-day">
            ${currEvent.day}
        </div>
        <div class="card-date-num">
          ${currEvent.dateNumber}
        </div>
      </div>
      <div class="event-card-gov">
        ${gOnly}
      </div>
      <div class="event-card-content">
        <h3 aria-label="Organizer: ${currEvent.organizer}" class="event-org">${currEvent.organizer}</h3>
        <h2 aria-label="Title: ${currEvent.title}" class="event-title">${currEvent.title}</h2>
        <p class="event-description four-line-max">
        ${currEvent.description}
        </p>
      </div>
      <div class="event-card-info">
        <div class="event">
            <p aria-label="Event time: ${currEvent.fromTo}"><img alt="clock icon" src="${baseUrl}/assets/images/icons/clock-icon-grey.svg">${currEvent.fromTo}</p>
            <p aria-label="Event type: ${currEvent.eventType}"><img alt="location icon" src="${baseUrl}/assets/images/icons/location-icon-grey.svg">${currEvent.eventType}</p>
            <p aria-label="Event is: ${isEx}"><img alt="compass icon" src="${baseUrl}/assets/images/icons/compass-icon-grey.svg">${isEx}</p>
            <p aria-label="Event Date: ${currDate}"><img alt="calendar icon" src="${baseUrl}/assets/images/icons/calendar-grey.svg">${currDate}</p>
        </div>
      </div>
    </a>
  `;
  monthDiv.innerHTML += 
  `
    <a href="${currEvent.link}" class="event-card-mobile">
    <div class="event-card-day">
      <p>${gLogo}${currDate}</p>
      <p aria-label="Event type: ${currEvent.eventType}"><img alt="location icon" src="${baseUrl}/assets/images/icons/location-icon-grey.svg">${currEvent.eventType}</p>
    </div>
    <div class="event-card-content">
      <h3 aria-label="Organizer: ${currEvent.organizer}" class="event-org">${currEvent.organizer}</h3>
      <h2 aria-label="Title: ${currEvent.title}" class="event-title">${currEvent.title}${exLogo}</h2>
      <p class="event-description">
        ${currEvent.description}
      </p>
    </div>
    <div class="event-card-info">
      <div class="event">
          <p aria-label="Event time: ${currEvent.fromTo}" ><img alt="clock icon" src="${baseUrl}/assets/images/icons/clock-icon-grey.svg">${currEvent.fromTo}</p>
          <p aria-label="Event is: ${isEx}"><img alt="compass icon" src="${baseUrl}/assets/images/icons/compass-icon-grey.svg">${isEx}</p>
      </div>
    </div>
  </a>
  `;
}


function openModal(eventForDay) {
  if(eventForDay.length > 0)
  {
    // var eventText =
    // `
    // <h3 id="calendar-date-display">${dayString}</h3>
    // <div class="animate fadeInDown">
    // `;
    var eventText =
    `
    <div>
    `;
    for(var i = 0; i < eventForDay.length; i++)
    { 
      let colorLine = "#d36c6c;"
      let inEx = "ITVMO Event"
      //If the event is external the line under the title change to blue
      if(eventForDay[i].isExternal == "true")
      {
        
        colorLine = "#1b2b85";
        inEx = "Non-ITVMO Event"
      }
      if(!eventForDay[i].link.includes('https://'))
      {
        eventForDay[i].link = `https://${eventForDay[i].link}`
      } 
      eventText += 
        `
        <div class="event">
          <h3 class="event-org">${eventForDay[i].organizer}</h3>
          <h2 class="event-title">${eventForDay[i].title}</h2>
          <div class="event-color" style="background-color:${colorLine}"></div>
          <p class="event-description">${eventForDay[i].description}</p>
          <div class="event-info-link">
            <div class="event-info">
              <p><img alt="clock icon" src="${baseUrl}/assets/images/icons/clock-icon-grey.svg">${eventForDay[i].fromTo}</p>
              <p><img alt="location icon" src="${baseUrl}/assets/images/icons/location-icon-grey.svg">${eventForDay[i].eventType}</p>
              <p><img alt="compass icon" src="${baseUrl}/assets/images/icons/compass-icon-grey.svg">${inEx}</p>
            </div>
            <a aria-label="Event link of Organization:${eventForDay[i].organizer}, Title:${eventForDay[i].title}" class="event-link" href="${eventForDay[i].link}" target="_blank" rel="noreferrer noopener"><img src="${baseUrl}/assets/images/icons/external-white.svg"><p>View Event</p></a>
          </div>
        </div>
        `;
    }
    eventText += `</div>`
    document.getElementById('current-day-events').innerHTML = eventText;
  }
  else
  {
    // document.getElementById('current-day-events').innerHTML = 
    // `
    // <h3 id="calendar-date-display">${dayString}</h3>
    // <div class="animate fadeInDown">
    // <p><b>No events planned today.</b></p>
    // </div>
    // `;
    document.getElementById('current-day-events').innerHTML = 
    `
    <div>
    <p><b>There don't appear to be any scheduled events for today.</b></p>
    </div>
    `;
  }
}

async function runCalendar(d,m,y) {
  const dt = new Date();
  console.log(dt.getMonth());
  //Nav always start with 0, until user press nextButton or backButton to change the nav value.
  if(nav !== 0)
    dt.setDate(1);
  else if(d !== null)
    dt.setDate(d);

  let day, monthNum, year;
  //If there are no url parameters, use the current month to calculate the previous and next month.
  if (m == -1) 
  {
    const currMonth = new Date().getMonth() + nav;
    dt.setMonth(currMonth);
    day = dt.getDate();
    monthNum = dt.getMonth();
    year = dt.getFullYear();
  }
  //If there are url parameters, use "m" variable to calculate theprevious and next month.
  else
  {
    dt.setMonth(m + nav);
    day = dt.getDate()
    monthNum = dt.getMonth();
    year = dt.getFullYear();
  }
      //This function get the specific month from the calendar.
  const getCurrMonthEvents = () => 
  {
    const currMonthEvents = [];
    for(ev of eventList)
    {
      if((monthNum == ev.date.getMonth()) && (year == ev.date.getFullYear()))
      {
        currMonthEvents.push(ev);
      }
    }
    return currMonthEvents;
  }
      var thisMonthEvents = getCurrMonthEvents();
  //Generate calendar
  const firstDayOfMonth = new Date(year, monthNum, 1);
  const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  const monthString = dt.toLocaleDateString('en-us', { month: 'long' })
  document.getElementById('monthDisplay').innerText = 
    `${monthString} ${year}`;

  calendar.innerHTML = '';
  for(let i = 1; i <= paddingDays + daysInMonth; i++) 
  {
    let itvmoEventCount = 0;
    const daySquare = document.createElement('div');
    daySquare.classList.add('day'); 
    //Round the corner of the specific date to make the calendar corner look round.
    if(i == 1)
    {
      daySquare.classList.add('day-corner-top-left'); 
    }
    else if(i == 7)
    {
      daySquare.classList.add('day-corner-top-right'); 
    }
    else if(((i == 29)&&((daysInMonth + paddingDays) <= 35)) || (i == 36))
    {
      daySquare.classList.add('day-corner-bottom-left'); 
    }
    else if((i == (paddingDays + daysInMonth))&&(((paddingDays + daysInMonth)%7)==0))
    {
      daySquare.classList.add('day-corner-bottom-right'); 
    }

    if (i > paddingDays) 
    {
      daySquare.innerHTML = `<p>${i - paddingDays}</p>`;
      const eventForDay = [];
      for(var a = 0; a < thisMonthEvents.length; a++)
      { 
        if((thisMonthEvents[a].date.getMonth() == monthNum)&&(thisMonthEvents[a].date.getDate() == (i - paddingDays))&&(thisMonthEvents[a].date.getFullYear()==year))
        {
          eventForDay.push(thisMonthEvents[a]);
          if(thisMonthEvents[a].isExternal == "false")
          {
            itvmoEventCount++;
          }
        }
      }
      let nonItvmoCount = eventForDay.length - itvmoEventCount;
      daySquare.ariaLabel = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${i - paddingDays} event count of ${eventForDay.length}`;
      //Display the Events summary for the current day if there is one
      if ((i - paddingDays == day && nav === 0)) {
        dateDisplay.innerHTML = `${monthString} ${i - paddingDays}, ${year}`;
        daySquare.id = 'currentDay';
        daySquare.classList.add('active-day');
        daySquare.tabIndex = 0;
        openModal(eventForDay);
      }
      if (eventForDay.length > 0) 
      {
          //Only let user traverse on the calendar with tab on only the day that have event(s).
          daySquare.tabIndex = 0;
          const eventCountSection = document.createElement('div');
          eventCountSection.classList.add('event-count-section');
          
          if(itvmoEventCount > 0)
          {
            const eventDivM = document.createElement('div');
            eventDivM.classList.add('event-count');
            eventDivM.innerText += itvmoEventCount;
            eventDivM.style.cssText += 'background-color: #d36c6c;';
            eventCountSection.appendChild(eventDivM);
          }
          if(nonItvmoCount > 0)
          {
            const eventDivM = document.createElement('div');
            eventDivM.classList.add('event-count');
            eventDivM.innerText += nonItvmoCount;
            eventDivM.style.cssText += 'background-color: #1b2b85;';
            eventCountSection.appendChild(eventDivM);
          }
          daySquare.appendChild(eventCountSection);
      }
      //add event listener on each day for clicking on the day action
      daySquare.addEventListener('click', () => 
      {
        setActiveDay(daySquare);
        openModal(eventForDay)
      });
      daySquare.onkeydown = 
      function(key) 
      {
        if((key.keyCode === 32)||(key.keyCode === 13))
        {
          setActiveDay(daySquare);
          openModal(eventForDay);
        }
      }
    } 
    else 
    {
      daySquare.classList.add('padding');
    }
    calendar.appendChild(daySquare);    
  }
}
//This function change the background of the day when user click on the day.
function setActiveDay(daySquare)
{
  const activeDay = document.getElementsByClassName('active-day');
  if(activeDay.length > 0)
    {
      activeDay[0].classList.remove('active-day');
    }
  daySquare.classList.add('active-day');
}
//Go to next month
function initEventButtons(d,m,y) {
  
    document.getElementById('nextButton').addEventListener('click', () => {
      nav++;
      //Insert parameters here to intake the data and can display on the calendar
      runCalendar(d,m,y);
    });
  //Go to previous month
    document.getElementById('backButton').addEventListener('click', () => {
      nav--;
      runCalendar(d,m,y);
    });
}
/** The Home page Dropdown menu section **/
function hideDropdown(el)
{
  el.classList.remove("display-content");
  el.classList.add("hide-content");
}

function showDropdown(el)
{
  el.classList.remove("hide-content-start");
  el.classList.remove("hide-content");
  el.classList.add("display-content");
}
/** The Home page Latest Update section **/
function populateHighlight()
{
  let slideContainer = document.getElementsByClassName("slideshow-container");
  let highlightArray = []; //Slides after rearrange.
  let dupOrder = []; //Store Slides that duplicate order dectect.
  dots = document.getElementsByClassName("dot");
  slides = document.getElementsByClassName("mySlides");
  slideCount = slides.length - 1;//Slide count in the highlight
  order = document.getElementsByClassName("order"); //Retrieve all the order of each slide
  dots[0].classList.add("active");
  
  //Arrange slides according to their order number, if duplicate order number detect it the duplication will be store in sperate array (dupOrder).
  for (i = 0; i < slides.length; i++)
  {
    if(highlightArray[parseInt(order[i].textContent)-1] == null)
    {
      highlightArray[parseInt(order[i].textContent)-1] = slides[i].cloneNode(true); 
    }
    else
    {
      dupOrder[parseInt(order[i].textContent)-1] = slides[i].cloneNode(true);
    }
  }

  //Empty out the slideshow-container to prepare for the reorder highlights.
  slideContainer[0].innerHTML = ''; 

  highlightArray.concat(dupOrder);
  
  //Add Order slides into the slideshow-container.
  for (i = 0; i <= slideCount; i++)
  {
    if(highlightArray[i] != null)
    {
      slideContainer[0].appendChild(highlightArray[i]);
    }
    //If duplication order founded add them next to each other.
    if(dupOrder[i] != null)
    {
      slideContainer[0].appendChild(dupOrder[i]);
    }
  }

  //Line up all the sildes together horizontally 
  for (i = 0; i <= slideCount; i++)
  {
    slides[i].style.transform = `translateX(${i * 100}%)`;
  }
}

function initHighlightButtons()
{
  var prev = document.getElementsByClassName('prev')[0];
  var next = document.getElementsByClassName('next')[0];

  prev.addEventListener('click', () => prevSlide());
  next.addEventListener('click', () => showSlides());

  // Allow user to use the next and previous button without the need of the mouse.
  prev.onkeydown = function(key){previousSlide(key)};
  next.onkeydown = function(key){nextSlide(key)};

  function nextSlide(key)
  {
    if((key.keyCode === 32)||(key.keyCode === 13))
      showSlides();
  }
  function previousSlide(key)
  {
    if((key.keyCode === 32)||(key.keyCode === 13))
    prevSlide();
  }
}
function runHighlight() {

    timer = setTimeout("showSlides()", 8000);
}

function prevSlide() 
{
  if (curSlide === 0) 
  {
    curSlide = slideCount;
  } 
  else 
  {
    curSlide--;
  }
  positionHighlight();
  updateDots();
  clearTimeout(timer); //Remove the timer that previously active before click on the previous button
  runHighlight(); 
}

function showSlides() {

  if (curSlide === slideCount) 
  {
    curSlide = 0;
  } 
  else 
  {
    curSlide++;
  }
  positionHighlight();
  updateDots();
  clearTimeout(timer); //Remove the timer that previously active before click on the previous button
  runHighlight();
}

//This function position hightlights and assign tabindex accordingly.
function positionHighlight()
{
  for (i = 0; i < slides.length; i++)
  {
    slides[i].style.transform = `translateX(${100 * (i - curSlide)}%)`;
    var readButton = slides[i].getElementsByClassName("read-more");
    if((100 * (i - curSlide)) !== 0)
    {
      readButton[0].tabIndex = "-1";
    }
    else
    {
      readButton[0].tabIndex = "0";
    }
  }
}
//This function update dot allocation on the highlight page
function updateDots()
{
  for (i = 0; i < slides.length; i++) 
  {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[curSlide].className += " active";
}
//This function run when the user hover the mouse on the highlight card
function stopSlide()
{
  clearTimeout(timer);
}
//This function trigger only after user mouse left the highlight card
function runSlide()
{
  timer = setTimeout("showSlides()", 1700);
}

/*The Back to top button */
$(document).ready(function (e) {

  // When the user scrolls down 20px from the top of the document, show the button.
  window.onscroll = function() {scrollFunction()};
  var topButton= $("#backtotop");
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.css('display','flex');
    } else {
      topButton.css('display','none');
    }
  }
    // When the user clicks on the button, scroll to the top of the document.
    topButton.click(function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  });
