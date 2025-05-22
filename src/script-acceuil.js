const trashContainer = document.querySelector(".trash-container");
const moneyElem = document.querySelector(".money");
const currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const trashFormatter = new Intl.NumberFormat("en-us", {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false,
});

const MAX_MONEY_RAISED = 30000000;

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener('DOMContentLoaded', function() {
  const addBoatBtn = document.getElementById('add-boat-btn');
  const boatContainer = document.querySelector('.boat-container');

  const boatTypes = [
    { image: 'boat.png', defaultDirection: 'right' },
    { image: 'ship2.png', defaultDirection: 'left' },
    { image: 'cruise.png', defaultDirection: 'right' },
    { image: 'ship1.png', defaultDirection: 'right' }
  ];

  addBoatBtn.addEventListener('click', function() {
    addRandomBoat();
  });

  function addRandomBoat() {
    const boat = document.createElement('img');
    boat.classList.add('boat');
    const randomBoatType = boatTypes[randomNumberBetween(0, boatTypes.length - 1)];
    boat.src = `src/imgs/${randomBoatType.image}`;

    boat.onerror = function() {
      console.error(`Failed to load boat image: ${randomBoatType.image}`);
      boat.style.content = "'⛵'";
      boat.style.fontSize = "30px";
      boat.alt = "Boat";
    };

    const size = randomNumberBetween(30, 60);
    boat.style.width = `${size}px`;
    boat.style.height = `${size * 0.8}px`;
    boat.style.bottom = `${randomNumberBetween(20, 47)}vh`;

    const isRightToLeft = Math.random() > 0.5;
    const needsFlip = (randomBoatType.defaultDirection === 'right' && isRightToLeft) ||
                      (randomBoatType.defaultDirection === 'left' && !isRightToLeft);

    if (needsFlip) {
      boat.classList.add('flipped');
    }

    boat.style.animation = isRightToLeft
      ? `sail-right-to-left ${randomNumberBetween(15, 30)}s linear`
      : `sail-left-to-right ${randomNumberBetween(15, 30)}s linear`;

    boatContainer.appendChild(boat);

    boat.addEventListener('animationend', function() {
      boat.remove();
    });
  }

  function addCruiseBoat() {
    const boat = document.createElement('img');
    boat.classList.add('boat');
    const cruiseType = { image: 'cruise.png', defaultDirection: 'right' };
    boat.src = `src/imgs/${cruiseType.image}`;
    boat.dataset.type = "cruise";

    boat.onerror = function() {
      console.error(`Failed to load boat image: ${cruiseType.image}`);
      boat.style.content = "'⛵'";
      boat.style.fontSize = "30px";
      boat.alt = "Boat";
    };

    const size = randomNumberBetween(30, 60);
    boat.style.width = `${size}px`;
    boat.style.height = `${size * 0.8}px`;
    boat.style.bottom = `${randomNumberBetween(20, 47)}vh`;

    const isRightToLeft = Math.random() > 0.5;
    const needsFlip = (cruiseType.defaultDirection === 'right' && isRightToLeft) ||
                      (cruiseType.defaultDirection === 'left' && !isRightToLeft);

    if (needsFlip) {
      boat.classList.add('flipped');
    }

    boat.style.animation = isRightToLeft
      ? `sail-right-to-left ${randomNumberBetween(15, 30)}s linear`
      : `sail-left-to-right ${randomNumberBetween(15, 30)}s linear`;

    boatContainer.appendChild(boat);

    boat.addEventListener('animationend', function() {
      boat.remove();
      setTimeout(addCruiseBoat, 1000);
    });
  }

  addCruiseBoat();
});

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const menuContent = document.querySelector('.menu-content');

  if (menuButton && menuContent) {
    menuButton.addEventListener('click', () => {
      menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!menuButton.contains(e.target) && !menuContent.contains(e.target)) {
        menuContent.style.display = 'none';
      }
    });
  }
});
