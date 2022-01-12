var iframes = document.querySelectorAll('iframe');

var elementsActionRefresh = document.querySelectorAll('.action-refresh');
var elementsActionNewPage = document.querySelectorAll('.action-new-page');
var elementsActionVisibility = document.querySelectorAll('.action-visibility');
var elementsActionScreenshot = document.querySelectorAll('.action-screenshot');
var filterDropdownArray = document.querySelectorAll('.filter');

for (let index = 0; index < elementsActionRefresh.length; index++) {
  (function() {
    iframes[index].addEventListener('load', function() {
      iframes[index].parentElement.querySelector('.loader').classList.add('paused', 'hide');
    });

    var actionRefresh = elementsActionRefresh[index];
    if (actionRefresh) {
      actionRefresh.addEventListener('click', function() {
        var el = this;
        iframes[index].src = iframes[index].src;
      });
    }

    var actionNewPage = elementsActionNewPage[index];
    if (actionNewPage) {
      actionNewPage.addEventListener('click', function() {
        var el = this;
        window.open(iframes[index].src);
      });
    }

    var actionVisibility0 = elementsActionVisibility[index * 2];
    var actionVisibility1 = elementsActionVisibility[index * 2 + 1];
    var action = function() {
      if (iframes[index].style.display === 'none') {
        iframes[index].style.display = 'block';
        actionVisibility0.style.display = 'none';
        actionVisibility1.style.display = 'inline-block';
      } else {
        iframes[index].style.display = 'none';
        actionVisibility0.style.display = 'inline-block';
        actionVisibility1.style.display = 'none';
      }
    };

    if (actionVisibility0) {
      actionVisibility0.addEventListener('click', action);
    }

    if (actionVisibility1) {
      actionVisibility1.addEventListener('click', action);
    }
  })();
}

/**************/
/* INITIALIZE */
/**************/
this.counter = 0;

const bannerSizeDropdown = document.querySelector('.banner-size-dropdown');
removeDuplicateFromSelect(bannerSizeDropdown);
setBannerSizeSelectValue('banner-size-dropdown', 'banner-size-dropdown');
setDynamicFilterValue();
refreshCardsVisibility();

/**************/
/* CODE LOGIC */
/**************/

/*
Load the value of a GET parameter in a filter
*/
function setBannerSizeSelectValue(paramName, selectName) {
  const valueGetParam = getParameterValue(paramName);
  const select = document.getElementsByName(selectName)[0];
  selectItemByValue(select, valueGetParam);
}

/*
Load the value of a GET parameter in a filter
*/
function setDynamicFilterValue() {
  let i = 1;
  while (getParameterValue(`filter-${i}`)) {
    const valueGetParam = getParameterValue(`filter-${i}`);
    const select = createFilter();
    selectItemByValue(select, valueGetParam);
    i++;
  }
}

/*
Remove duplicate <option></option> from a select
*/
function removeDuplicateFromSelect(select) {
  [].slice.call(select.options).map(function(option) {
    if (this[option.value]) {
      select.removeChild(option);
    } else {
      this[option.value] = 1;
    }
  }, {});
}

/*
Slide Up + Fade In animation for cards that are currently visible
*/
function staggerCardAnimation() {
  if (this.staggerCardTL && this.staggerCardTL.progress() !== 1) {
    this.staggerCardTL.progress(1);
  }
  const visibleCards = Array.from(document.querySelectorAll('.mdl-card:not(.hide)'));
  this.staggerCardTL = gsap.fromTo(visibleCards, {
    y: 40,
    opacity: 0,
  }, {
    duration: 0.5,
    y: 0,
    opacity: 1,
    stagger: 0.05,
  });
}

/*
Change the selected item of a <select></select> based on the value passed as parameter
*/
function selectItemByValue(select, value) {
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].value === value) {
      select.selectedIndex = i;
    }
  }
}

function refreshCardsVisibility() {
  const cards = Array.from(document.querySelectorAll('.mdl-card'));

  cards.forEach(card => {
    if (isCardVisible(card)) {
      card.classList.remove('hide');
    } else {
      card.classList.add('hide');
    }
  });

  staggerCardAnimation();
}

/*
Utility function
Set name and value as GET Parameter
*/
function setGetParameterValue(name, value) {
  const params = new URLSearchParams(location.search);
  params.set(name, value);
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

/*
Utility function
Get value from GET Parameter
*/
function getParameterValue(name) {
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

/*
Utility function
Delete GET Parameter
*/
function deleteGetParameter(name) {
  const params = new URLSearchParams(location.search);
  params.delete(name);
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

/*
Return true if a card should be visible given the current values for each filter
*/
function isCardVisible(card) {
  const allFilters = Array.from(document.querySelectorAll('.filter'));
  let visible = true;

  allFilters.forEach(filter => {
    const filterValue = filter.value;
    const bannerName = card.querySelector('.banner-name').innerText.split('_').map(element => element.trim());

    if (!bannerName.includes(filterValue) && filterValue.toLowerCase() !== 'all') {
      visible = false;
    }
  });

  return visible;
}

/*
return an array of possible values for a new filter based on the banner currently visible
*/
function getFilterValuesFromBannerNames(bannerNames) {
  const bannerSizeArray = Array.from(document.querySelectorAll('.banner-size-dropdown option')).map(option => option.value);
  filterArray = [];

  bannerNames.forEach(bannerName => {
    const bannerNameSplitResult = bannerName.innerText.split('_').map(element => element.trim());
    bannerNameSplitResult.forEach(bannerWord => {
      if (
        !filterArray.includes(bannerWord) &&
        !bannerSizeArray.includes(bannerWord) &&
        !isBannerWordInEveryBannerName(bannerWord, bannerNames,
        )) {
        filterArray.push(bannerWord);
      }
    });
  });

  return filterArray;
}

function isBannerWordInEveryBannerName(bannerWord, bannerNames) {
  return bannerNames.every((bannerName) => {
    const bannerNameSplitResult = bannerName.innerText.split('_').map(element => element.trim());
    return bannerNameSplitResult.includes(bannerWord);
  });
}

function createFilter() {
  this.counter++;

  let filterContainer = document.querySelector('.filter-container');

  let label = document.createElement('LABEL');
  label.classList.add('dynamic-label');
  label.innerText = `Filter n°${this.counter}:`;
  label.addEventListener('click', removeFilterHandler.bind(this));

  let select = document.createElement('SELECT');
  select.name = `filter-${this.counter}`;
  select.classList.add('filter', select.name);

  select.addEventListener('change', filterChangeHandler);

  let optionAll = document.createElement('OPTION');
  optionAll.value = 'All';
  optionAll.text = 'All';
  select.appendChild(optionAll);

  const bannerNameNodes = Array.from(document.querySelectorAll('.card:not(.hide) .banner-name'));
  const filterValueFromBannerName = getFilterValuesFromBannerNames(bannerNameNodes);

  filterValueFromBannerName.forEach((filterValue) => {
    let option = document.createElement('OPTION');
    option.value = filterValue;
    option.text = filterValue;
    select.appendChild(option);
  });

  let filterWrapper = document.createElement('DIV');
  filterWrapper.classList.add('filter-wrapper', 'dynamic-filter');
  filterWrapper.appendChild(label);
  filterWrapper.appendChild(select);
  filterContainer.appendChild(filterWrapper);

  return select;
}

/******************/
/* Event Listener */
/******************/

/*
List view / massonry button event listener
*/
function toggleClickHandler() {
  toggleLayout();
}

/*
Filter change handler
*/
function filterChangeHandler() {
  if (Array.from(document.querySelectorAll('.dynamic-filter select')).pop() === this) {
    document.querySelector('.add-filter-button').classList.remove('hide');
  }

  setGetParameterValue(event.target.name, event.target.value);
  refreshCardsVisibility();
}

/*
Button add filter handler
*/
function addFilterClickHandler() {
  event.currentTarget.classList.add('hide');
  createFilter();
}

/*
Remove filter after clicking on Label
Update the filter number on remaining filters and GET parameter
*/
function removeFilterHandler() {
  const parent = event.target.parentElement;
  const select = event.target.nextElementSibling;

  if (Array.from(document.querySelectorAll('.dynamic-filter select')).pop() === select) {
    document.querySelector('.add-filter-button').classList.remove('hide');
  }

  deleteGetParameter(`filter-${this.counter}`);

  select.removeEventListener('change', filterChangeHandler);
  parent.remove();

  this.counter = 0;

  const filterWrappers = Array.from(document.querySelectorAll('.dynamic-filter'));

  filterWrappers.forEach(filterWrapper => {
    this.counter++;
    const label = filterWrapper.querySelector('label');
    const select = filterWrapper.querySelector('select');
    const oldClassName = select.name;

    label.htmlFor = select.name;
    label.innerText = `Filter n°${this.counter}:`;

    select.name = `filter-${this.counter}`;
    select.classList.replace(oldClassName, select.name);

    setGetParameterValue(select.name, select.value);
  });

  refreshCardsVisibility();
}

/*
Toggle between Massonry and List layout
*/
function toggleLayout() {
  const buttonList = document.querySelectorAll('.layout-toggle-button');
  buttonList.forEach((button) => {
    button.classList.toggle('active');
  });

  let isListView = document.querySelector('.page-content').classList.toggle('list-view');
  setGetParameterValue('list-view', isListView);

  staggerCardAnimation();
}
