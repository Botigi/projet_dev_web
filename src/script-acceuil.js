const trashContainer = document.querySelector(".trash-container")
const moneyElem = document.querySelector(".money")
const currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})
const trashFormatter = new Intl.NumberFormat("en-us", {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false,
})

const MAX_MONEY_RAISED = 30000000

setupTrash()

function setupTrash() {
  // Functionality removed
}

// Helper function kept in case needed elsewhere
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Boat functionality
document.addEventListener('DOMContentLoaded', function() {
  const addBoatBtn = document.getElementById('add-boat-btn');
  const boatContainer = document.querySelector('.boat-container');
  
  // Boat configurations with default directions
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
    // Create boat element
    const boat = document.createElement('img');
    boat.classList.add('boat');
    
    // Select random boat type
    const randomBoatType = boatTypes[randomNumberBetween(0, boatTypes.length - 1)];
    boat.src = `src/imgs/${randomBoatType.image}`;
    
    // Add error handling for image loading issues
    boat.onerror = function() {
      console.error(`Failed to load boat image: ${randomBoatType.image}`);
      boat.style.content = "'⛵'";
      boat.style.fontSize = "30px";
      boat.alt = "Boat";
    };
    
    // Random boat size
    const size = randomNumberBetween(30, 60);
    boat.style.width = `${size}px`;
    boat.style.height = `${size * 0.8}px`;
    
    // Increased height range for boat appearance (35-45vh instead of 25-40vh)
    // This ensures boats appear higher in the water without being in the air
    boat.style.bottom = `${randomNumberBetween(20, 47)}vh`;
    
    // Random direction for movement
    const isRightToLeft = Math.random() > 0.5;
    
    // Determine if the boat needs to be flipped based on its default direction and travel direction
    const needsFlip = (randomBoatType.defaultDirection === 'right' && isRightToLeft) ||
                     (randomBoatType.defaultDirection === 'left' && !isRightToLeft);
    
    if (needsFlip) {
      boat.classList.add('flipped');
    }
    
    // Set animation based on travel direction
    if (isRightToLeft) {
      boat.style.animation = `sail-right-to-left ${randomNumberBetween(15, 30)}s linear`;
    } else {
      boat.style.animation = `sail-left-to-right ${randomNumberBetween(15, 30)}s linear`;
    }
    
    // Add to container
    boatContainer.appendChild(boat);
    
    // Remove after animation completes
    boat.addEventListener('animationend', function() {
      boat.remove();
    });
  }
  
  // New cruise boat functionality: always ensure one cruise boat is on the water
  function addCruiseBoat() {
    const boat = document.createElement('img');
    boat.classList.add('boat');
    const cruiseType = { image: 'cruise.png', defaultDirection: 'right' };
    boat.src = `src/imgs/${cruiseType.image}`;
    boat.dataset.type = "cruise"; // mark as cruise boat
    // Error handling same as other boats
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
    if (isRightToLeft) {
      boat.style.animation = `sail-right-to-left ${randomNumberBetween(15, 30)}s linear`;
    } else {
      boat.style.animation = `sail-left-to-right ${randomNumberBetween(15, 30)}s linear`;
    }
    boatContainer.appendChild(boat);
    boat.addEventListener('animationend', function() {
      boat.remove();
      // Re-add cruise boat if it disappears
      setTimeout(addCruiseBoat, 1000);
    });
  }
  
  // Initial call to ensure a cruise boat is present
  addCruiseBoat();
  
  // Add a console message to help debugging
  console.log("Boat script loaded. Make sure boat images exist in the imgs folder.");
});

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const menuContent = document.querySelector('.menu-content');

  menuButton.addEventListener('click', () => {
    menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !menuContent.contains(e.target)) {
      menuContent.style.display = 'none';
    }
  });
});

const menuButton = document.getElementById('menuButton');
if (menuButton) {
  menuButton.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  });
}
