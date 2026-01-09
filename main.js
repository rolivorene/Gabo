// Set the date we're counting down to: Jan 31, 2026 1:00 PM
const countDownDate = new Date("Jan 31, 2026 13:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the elements
    document.getElementById("days").innerHTML = String(days).padStart(2, '0');
    document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "¡ES HOY!";
    }
}, 1000);

// Audio Player Logic
const audioBtn = document.getElementById('audio-control');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

audioBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        audioBtn.innerHTML = '<span>🎵</span>'; // Play icon
        audioBtn.style.animation = 'btn-pulse 2s infinite';
    } else {
        bgMusic.play().catch(error => {
            console.log("Audio play failed:", error);
            alert("Toque la pantalla para permitir la reproducción de audio");
        });
        audioBtn.innerHTML = '<span>⏸️</span>'; // Pause icon
        audioBtn.style.animation = 'none';
    }
    isPlaying = !isPlaying;
});

// Try to handle autoplay state on load
document.addEventListener('DOMContentLoaded', () => {
    // Check if audio is actually playing (browsers might block autoplay)
    bgMusic.play().then(() => {
        isPlaying = true;
        audioBtn.innerHTML = '<span>⏸️</span>';
        audioBtn.style.animation = 'none';
    }).catch(() => {
        // Autoplay was blocked
        isPlaying = false;
        audioBtn.innerHTML = '<span>🎵</span>';
        // Animation continues to encourage interaction
    });
});

// Auto-play attempt (often blocked by browsers, but worth a try with muted check usually, but here we strictly use button as primary)
// We can add a subtle bounce to the button to encourage clicking
