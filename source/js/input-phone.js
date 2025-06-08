document.getElementById('phone-user').addEventListener('input', (e) => {
  const input = e.target;
  let value = input.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

  // Обработка начала номера (7 или 8 заменяем на +7)
  if (value.startsWith('7') || value.startsWith('8')) {
    value = `7${ value.substring(1)}`; // Преобразуем в формат 7XXXXXXXXXX
  }

  // Форматируем номер, если цифр достаточно
  let formattedValue = '+7';
  if (value.length > 1) {
    const number = value.substring(1); // Убираем первую 7 (остаётся XXXXXXXXX)

    // Добавляем форматирование: (XXX) XXX-XX-XX
    formattedValue += ` (${ number.substring(0, 3)}`;

    if (number.length > 3) {
      formattedValue += `) ${ number.substring(3, 6)}`;
    }
    if (number.length > 6) {
      formattedValue += `-${ number.substring(6, 8)}`;
    }
    if (number.length > 8) {
      formattedValue += `-${ number.substring(8, 10)}`;
    }
  }

  input.value = formattedValue;
});
