// Get references to the DOM elements
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const historyList = document.getElementById('history-list');

// Define the wheel segments and initial data storage
const colors = ['Red', 'Green', 'Purple'];
let winningHistory = [];
let bettingHistory = [];

// Function to spin the wheel
function spinWheel() {
    // Get the user's bet
    const userBet = prompt("Enter your bet (Red, Green, or Purple):");
    if (!colors.includes(userBet)) {
        alert("Invalid bet. Please choose Red, Green, or Purple.");
        return;
    }

    // Calculate a random rotation angle
    const randomAngle = Math.floor(Math.random() * 360);
    const totalSegments = 3; // Number of segments
    const segmentSize = 360 / totalSegments;
    const winningSegment = Math.floor((360 - randomAngle) / segmentSize) % totalSegments;

    // Rotate the wheel
    wheel.style.transition = 'transform 4s ease-out';
    wheel.style.transform = `rotate(${randomAngle + 3600}deg)`; // Adding extra rotations for effect

    // Show result after spin
    setTimeout(() => {
        const winningColor = colors[winningSegment];
        alert(`The wheel landed on: ${winningColor}`);

        // Store the winning and betting data
        storeData(userBet, winningColor);

        // Update the history display
        updateHistory();

    }, 4000);
}

// Function to store the winning and betting data
function storeData(bet, win) {
    // Store in history arrays
    bettingHistory.push(bet);
    winningHistory.push(win);

    // Output result based on bet
    if (bet === win) {
        alert("Congratulations! You won the bet!");
    } else {
        alert("Sorry, you lost the bet. Better luck next time!");
    }
}

// Function to update the history display
function updateHistory() {
    historyList.innerHTML = ''; // Clear current history

    for (let i = 0; i < winningHistory.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `Spin ${i + 1}: Bet - ${bettingHistory[i]}, Result - ${winningHistory[i]}`;
        historyList.appendChild(listItem);
    }
}

// Attach the spin function to the button
spinBtn.addEventListener('click', spinWheel);
