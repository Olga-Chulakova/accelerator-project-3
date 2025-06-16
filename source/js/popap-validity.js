import './form-select.js';

const form = document.querySelector('.form-popap');
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const inputSelect = document.getElementById('city');
const dropDownItems = document.querySelectorAll('.form-popap__dropdown-item');
const checkbox = document.querySelector('.form-popap__control-input');

form.setAttribute('novalidate', true);

let formTriedSubmit = false;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formTriedSubmit = true;

  const isNameValid = validateName(inputName);
  const isPhoneValid = validatePhone(inputPhone);
  const isSelectValid = validateSelect(inputSelect);
  const isCheckboxValid = validateCheckbox(checkbox);

  if (isNameValid && isPhoneValid && isSelectValid && isCheckboxValid) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        showResultMessage('success', 'Данные успешно отправлены!');

        form.reset();
      } else {
        showResultMessage('error', `Ошибка сервера: ${ response.status}`);
      }
    } catch (error) {
      showResultMessage('error', `Сетевая ошибка: ${ error.message}`);
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  } else {
    validateName(inputName);
    validatePhone(inputPhone);
    validateSelect(inputSelect);
    validateCheckbox(checkbox);
  }
});

function showResultMessage(type, message) {
  const existingMessages = document.querySelectorAll('.form-result-message');
  existingMessages.forEach((msg) => msg.remove());

  const messageElement = document.createElement('div');
  messageElement.className = `form-result-message form-result-${type}`;
  messageElement.textContent = message;

  form.parentNode.insertBefore(messageElement, form);

  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}

inputPhone.addEventListener('input', (e) => {
  const input = e.target;
  let value = input.value.replace(/\D/g, '');

  if (value.startsWith('7') || value.startsWith('8')) {
    value = `7${value.substring(1)}`;
  } else if (value) {
    value = `7${value}`;
  }

  if (value.length > 11) {
    value = value.substring(0, 11);
  }

  let formattedValue = '+7';
  if (value.length > 1) {
    const number = value.substring(1);
    formattedValue += ` (${number.substring(0, 3)}`;

    if (number.length > 3) {
      formattedValue += `) ${number.substring(3, 6)}`;
    }
    if (number.length > 6) {
      formattedValue += `-${number.substring(6, 8)}`;
    }
    if (number.length > 8) {
      formattedValue += `-${number.substring(8, 10)}`;
    }
  }

  input.value = formattedValue;
});

function validateName(inputElement) {
  clearError(inputElement);

  const value = inputElement.value.trim();
  const minLength = parseInt(inputElement.minLength, 10);
  let isValid = true;

  if (value === '') {
    showError(inputElement, inputElement.dataset.required || 'Заполните поле');
    isValid = false;
  } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
    showError(inputElement, inputElement.dataset.patternMismatch || 'Введите только буквы и пробелы');
    isValid = false;
  } else if (value.length < minLength) {
    showError(inputElement, inputElement.dataset.minlength || 'Введите букв не меньше 2');
    isValid = false;
  }

  return isValid;
}

inputName.addEventListener('input', function() {
  validateName(this);

  if (this.validity.valid) {
    this.setCustomValidity('');
  }
});

inputName.addEventListener('blur', function() {
  if (!this.validity.valid) {
    validateName(this);
  }
});

function validatePhone(inputElement) {
  clearError(inputElement);

  const value = inputElement.value.trim();
  const pattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
  let isValid = true;

  if (value === '') {
    showError(inputElement, inputElement.dataset.required || 'Заполните поле');
    isValid = false;
  } else if (!pattern.test(value)) {
    showError(inputElement, inputElement.dataset.patternMismatch || 'Введите телефон в формате +7 (000) 000-00-00');
    isValid = false;
  }

  return isValid;
}

inputPhone.addEventListener('input', function() {
  validatePhone(this);

  if (this.validity.valid) {
    this.setCustomValidity('');
  }
});

function validateSelect(inputElement) {
  clearError(inputElement);

  const value = inputElement.value.trim();
  let isValid = true;

  if (value === '') {
    showError(inputElement, inputElement.dataset.required || 'Выберите или введите свой город');
    isValid = false;
  } else {
    const validCities = Array.from(dropDownItems).map((item) => item.textContent.trim());
    if (!validCities.includes(value)) {
      showError(inputElement, 'Выберите город из списка');
      isValid = false;
    }
  }

  return isValid;
}

inputSelect.addEventListener('input', function() {
  validateSelect(this);
});

inputSelect.addEventListener('change', function() {
  validateSelect(this);
});

function validateCheckbox(checkboxElement) {
  clearError(checkboxElement);

  if (!checkboxElement.checked) {
    showError(checkboxElement, 'Необходимо ваше согласие');
    return false;
  }
  return true;
}

checkbox.addEventListener('change', function() {
  validateCheckbox(this);
});

checkbox.addEventListener('keydown', function(e) {
  if (e.key === ' ') {
    e.preventDefault();
    this.checked = !this.checked;
    validateCheckbox(this);
  }
});

function clearError(inputElement) {
  const formGroup = inputElement.closest('.form-popap__form-group');
  formGroup.classList.remove('invalid');
  inputElement.setCustomValidity('');
}

function showError(inputElement, message) {
  const formGroup = inputElement.closest('.form-popap__form-group');
  formGroup.classList.add('invalid');
  inputElement.setCustomValidity(message);

  if (formTriedSubmit || document.activeElement === inputElement) {
    inputElement.reportValidity();
  }
}
