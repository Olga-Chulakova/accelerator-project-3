const inputSelect = document.querySelector('.form-popap__select');
const dropDownList = document.querySelector('.form-popap__dropdown-list');
const dropDownItems = dropDownList.querySelectorAll('.form-popap__dropdown-item');

let currentSelectedIndex = -1;

inputSelect.addEventListener('click', () => {
  const isOpen = dropDownList.classList.contains('form-popap__dropdown-list--visible');

  if (isOpen) {
    dropDownList.classList.remove('form-popap__dropdown-list--visible');
    inputSelect.classList.remove('form-popap__select--active');
  } else {
    dropDownList.classList.add('form-popap__dropdown-list--visible');
    inputSelect.classList.add('form-popap__select--active');

    currentSelectedIndex = -1;
    removeAllActiveClasses();
  }
});

dropDownItems.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();

    inputSelect.value = item.textContent;
    inputSelect.dataset.selectedValue = item.dataset.value;

    const event = new Event('input', { bubbles: true });
    inputSelect.dispatchEvent(event);

    currentSelectedIndex = index;

    dropDownList.classList.remove('form-popap__dropdown-list--visible');
    inputSelect.classList.remove('form-popap__select--active');
    inputSelect.focus();
  });
});

document.addEventListener('click', (e) => {
  if (e.target !== inputSelect && !dropDownList.contains(e.target)) {
    inputSelect.classList.remove('form-popap__select--active');
    dropDownList.classList.remove('form-popap__dropdown-list--visible');
  }
});

inputSelect.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' || e.key === 'Escape') {
    inputSelect.classList.remove('form-popap__select--active');
    dropDownList.classList.remove('form-popap__dropdown-list--visible');
  }
});

inputSelect.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    if (!dropDownList.classList.contains('form-popap__dropdown-list--visible')) {
      dropDownList.classList.add('form-popap__dropdown-list--visible');
      inputSelect.classList.add('form-popap__select--active');
      currentSelectedIndex = -1;
      removeAllActiveClasses();
    } else if (currentSelectedIndex >= 0) {
      dropDownItems[currentSelectedIndex].click();
    }
  }
});

inputSelect.addEventListener('keydown', (e) => {
  if (!dropDownList.classList.contains('form-popap__dropdown-list--visible')) {
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    moveSelection(1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    moveSelection(-1);
  }
});

function moveSelection(direction) {
  removeAllActiveClasses();

  if (direction === 1) {
    currentSelectedIndex++;
    if (currentSelectedIndex >= dropDownItems.length) {
      currentSelectedIndex = 0;
    }
  } else {
    currentSelectedIndex--;
    if (currentSelectedIndex < 0) {
      currentSelectedIndex = dropDownItems.length - 1;
    }
  }

  dropDownItems[currentSelectedIndex].classList.add('form-popap__dropdown-item--active');

  dropDownItems[currentSelectedIndex].scrollIntoView({ block: 'nearest' });
}

function removeAllActiveClasses() {
  dropDownItems.forEach((item) => {
    item.classList.remove('form-popap__dropdown-item--active');
  });
}
