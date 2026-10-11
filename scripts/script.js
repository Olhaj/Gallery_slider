const root = document.querySelector("#root");

let sliderIndex = 0;

const images = [
  "https://i.pinimg.com/736x/5c/b0/fc/5cb0fc49626bc4809cd076a785f6fc28.jpg",
  "https://i.pinimg.com/1200x/af/87/2f/af872ff31a84e805f1607553cef61303.jpg",
  "https://i.pinimg.com/736x/39/a8/66/39a866debc862355a86b39c5730994f8.jpg",
  "https://i.pinimg.com/736x/72/98/87/7298877ea6c1473d818a38d396c831fe.jpg",
  "https://i.pinimg.com/736x/b2/5d/27/b25d27b55e80a022c90877af0cbfcd8e.jpg",
  "https://i.pinimg.com/736x/88/70/f0/8870f082ef80e63a626f16da42f5a279.jpg",
  "https://i.pinimg.com/736x/5d/1b/0e/5d1b0e1d5d33fc30c789baf39b0c3165.jpg",
  "https://i.pinimg.com/736x/68/b4/ce/68b4ce680bbae7b429561f584713908a.jpg",
  "https://i.pinimg.com/736x/65/f7/a2/65f7a2d4c8a0ae103d8bfe708e740b9d.jpg",
  "https://i.pinimg.com/originals/05/23/1e/05231e922b6d9497a60ab88d74f88061.gif",
];

const frame = document.createElement("div");
const cards = document.createElement("div");
const triggers = document.createElement("div");

const leftBtn = document.createElement("button");
const rightBtn = document.createElement("button");

leftBtn.textContent = "<";
rightBtn.textContent = ">";

triggers.append(leftBtn, rightBtn);
frame.append(cards, triggers);
root.append(frame);

frame.classList.add("frame");
cards.classList.add("cards");
triggers.classList.add("triggers");

images.forEach((image) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url("${image} ")`;
  cards.append(card);
});

// ── ИСПРАВЛЕНИЕ БАГА ──────────────────────────────────────────────
// Функция синхронизирует подсветку кнопок rounds с текущим слайдом.
// Вызывается из ВСЕХ обработчиков навигации, поэтому подсветка
// больше не «застревает», при переключении стрелками.
function updateRounds() {
  const allButtons = frame.querySelectorAll(".rounds button");

  allButtons.forEach((button, index) => {
    button.classList.toggle("active", index === sliderIndex);
  });
}
// ──────────────────────────────────────────────────────────────────

// Карусель идёт по кругу: стрелки работают без ограничений,
// индекс считается по модулю длины массива.
leftBtn.addEventListener("click", () => {
  sliderIndex = (sliderIndex - 1 + images.length) % images.length;
  cards.style.left = `${-500 * sliderIndex}px`;
  updateRounds();
});

rightBtn.addEventListener("click", () => {
  sliderIndex = (sliderIndex + 1) % images.length;
  cards.style.left = `${-500 * sliderIndex}px`;
  updateRounds();
});

function createRounds() {
  const container = document.createElement("div");
  container.classList.add("rounds");
  frame.append(container);

  // без цикла for: перебираем массив через forEach,
  // второй аргумент колбэка — индекс текущего элемента
  images.forEach((_, i) => {
    const button = document.createElement("button");
    container.append(button);

    button.addEventListener("click", () => {
      sliderIndex = i;
      cards.style.left = `${-500 * sliderIndex}px`;
      updateRounds();
    });
  });
}

createRounds();
updateRounds(); // подсветить первый round при загрузке

// ======== С багом ======
// leftBtn.addEventListener("click", () => {
//   if (sliderIndex > 0) {
//     sliderIndex--;
//     cards.style.left = `${-500 * sliderIndex}px`;
//   }
// });

// rightBtn.addEventListener("click", () => {
//   if (sliderIndex < images.length - 1) {
//     sliderIndex++;
//     cards.style.left = `${-500 * sliderIndex}px`;
//   }
// });

// function createRounds() {
//   const container = document.createElement("div");
//   container.classList.add("rounds");
//   frame.append(container);

//   for (let i = 0; i < images.length; i++) {
//     const button = document.createElement("button");
//     container.append(button);

//     button.addEventListener("click", () => {
//       sliderIndex = i;
//       cards.style.left = `${-500 * sliderIndex}px`;

//       const allButtons = button.parentElement.children;

//       for (let j = 0; j < allButtons.length; j++) {
//         allButtons[j].classList.remove("active");
//       }

//       button.classList.add("active");
//     });
//   }
// }

// createRounds();
