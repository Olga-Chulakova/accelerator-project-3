const inputSelect = document.querySelector('.form-request__select');
const dropDownList = document.querySelector('.form-request__dropdown-list');
const dropDownItems = dropDownList.querySelectorAll('.form-request__dropdown-item');

// Переменная для отслеживания текущего выбранного элемента
let currentSelectedIndex = -1;

// 1. Обработчик клика по инпуту - открываем/закрываем список
inputSelect.addEventListener('click', () => {
  // Переключаем видимость списка
  const isOpen = dropDownList.classList.contains('form-request__dropdown-list--visible');

  if (isOpen) {
    dropDownList.classList.remove('form-request__dropdown-list--visible');
    inputSelect.classList.remove('form-request__select--active');
  } else {
    dropDownList.classList.add('form-request__dropdown-list--visible');
    inputSelect.classList.add('form-request__select--active');

    // Сбрасываем выделение при открытии
    currentSelectedIndex = -1;
    removeAllActiveClasses();
  }
});

// 2. Обработчики для элементов списка
dropDownItems.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();

    // Устанавливаем выбранное значение в инпут
    inputSelect.value = item.textContent;
    inputSelect.dataset.selectedValue = item.dataset.value;

    // Запоминаем выбранный индекс
    currentSelectedIndex = index;

    // Закрываем список
    dropDownList.classList.remove('form-request__dropdown-list--visible');
    inputSelect.classList.remove('form-request__select--active');
    inputSelect.focus();
  });
});

// 3. Закрытие при клике в любом месте документа
document.addEventListener('click', (e) => {
  if (e.target !== inputSelect && !dropDownList.contains(e.target)) {
    inputSelect.classList.remove('form-request__select--active');
    dropDownList.classList.remove('form-request__dropdown-list--visible');
  }
});

// 4. Обработка клавиш Tab и Escape
inputSelect.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' || e.key === 'Escape') {
    inputSelect.classList.remove('form-request__select--active');
    dropDownList.classList.remove('form-request__dropdown-list--visible');
  }
});

// 5. Обработка клавиши Enter
inputSelect.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    // Если список закрыт - открываем
    if (!dropDownList.classList.contains('form-request__dropdown-list--visible')) {
      dropDownList.classList.add('form-request__dropdown-list--visible');
      inputSelect.classList.add('form-request__select--active');
      currentSelectedIndex = -1;
      removeAllActiveClasses();
    }
    // Если список открыт и есть выбранный элемент - применяем его
    else if (currentSelectedIndex >= 0) {
      dropDownItems[currentSelectedIndex].click();
    }
  }
});

// 6. Обработка стрелок Вверх/Вниз
inputSelect.addEventListener('keydown', (e) => {
  // Работаем только когда список открыт
  if (!dropDownList.classList.contains('form-request__dropdown-list--visible')) {
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    moveSelection(1); // Вниз
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    moveSelection(-1); // Вверх
  }
});

// Функция для перемещения выбора
function moveSelection(direction) {
  // Удаляем все активные классы
  removeAllActiveClasses();

  // Рассчитываем новый индекс
  if (direction === 1) { // Стрелка вниз
    currentSelectedIndex++;
    if (currentSelectedIndex >= dropDownItems.length) {
      currentSelectedIndex = 0; // Переход к первому элементу
    }
  } else { // Стрелка вверх
    currentSelectedIndex--;
    if (currentSelectedIndex < 0) {
      currentSelectedIndex = dropDownItems.length - 1; // Переход к последнему элементу
    }
  }

  // Добавляем активный класс новому элементу
  dropDownItems[currentSelectedIndex].classList.add('form-request__dropdown-item--active');

  // Прокручиваем к выбранному элементу
  dropDownItems[currentSelectedIndex].scrollIntoView({ block: 'nearest' });
}

// Функция для удаления активных классов со всех элементов
function removeAllActiveClasses() {
  dropDownItems.forEach((item) => {
    item.classList.remove('form-request__dropdown-item--active');
  });
}
