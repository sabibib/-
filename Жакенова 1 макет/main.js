 // Цены за м² и сроки (дни) для каждого типа ремонта и недвижимости
 const baseData = {
  cosmetic: {
    apartment: { pricePerM2: 1500, baseDays: 7 },
    house: { pricePerM2: 1400, baseDays: 9 }
  },
  capital: {
    apartment: { pricePerM2: 3000, baseDays: 14 },
    house: { pricePerM2: 2800, baseDays: 18 }
  },
  euro: {
    apartment: { pricePerM2: 4500, baseDays: 21 },
    house: { pricePerM2: 4200, baseDays: 25 }
  },
  designer: {
    apartment: { pricePerM2: 7000, baseDays: 30 },
    house: { pricePerM2: 6500, baseDays: 35 }
  }
};

// Множитель по количеству комнат (прибавляет % к цене и времени)
const roomsMultiplier = {
  1: 1,
  2: 1.15,
  3: 1.3,
  4: 1.5
};

// Дополнительное время за площадь (каждые 10 м² +1 день)
function extraDays(area) {
  return Math.floor(area / 10);
}

// Форматирование цены с пробелами и рублем
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

// Обновление отображения площади
const areaSlider = document.getElementById("area");
const areaValue = document.getElementById("areaValue");
areaSlider.addEventListener("input", () => {
  areaValue.textContent = areaSlider.value + " м²";
});

// Основная функция расчета
function calculate() {
  const form = document.getElementById("repairCalc");
  const repairType = form.repairType.value;
  const propertyType = form.propertyType.value;
  const rooms = form.rooms.value;
  const area = +form.area.value;

  const base = baseData[repairType][propertyType];
  if (!base) return;

  // Расчет стоимости
  let price = base.pricePerM2 * area * roomsMultiplier[rooms];
  price = Math.round(price);

  // Расчет срока
  let days = base.baseDays * roomsMultiplier[rooms] + extraDays(area);
  days = Math.round(days);

  const results = document.getElementById("results");
  results.innerHTML =
    `Период ремонта: <strong>${days} ${pluralizeDays(days)}</strong><br />` +
    `Полная стоимость: <strong>${formatPrice(price)}</strong>`;
}

// Правильное склонение слова "день"
function pluralizeDays(number) {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return "дней";
  if (n1 > 1 && n1 < 5) return "дня";
  if (n1 === 1) return "день";
  return "дней";
}

// Инициализация начального расчета
calculate();

// Обработка отправки формы
document.getElementById("repairCalc").addEventListener("submit", e => {
  e.preventDefault();
  alert("Спасибо! Ваш заказ принят.");
});


// Найти кнопку и калькулятор
const openCalcBtn = document.getElementById("openCalcBtn");
const calculator = document.querySelector(".calculator");

// При клике на кнопку — показать калькулятор
openCalcBtn.addEventListener("click", () => {
  calculator.classList.toggle("active");
  // Прокрутить к калькулятору, если он открылся
  if (calculator.classList.contains("active")) {
    calculator.scrollIntoView({ behavior: "smooth" });
  }
});
