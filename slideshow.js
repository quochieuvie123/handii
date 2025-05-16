const track = document.querySelector('.track');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.nav-btn.left');
const nextBtn = document.querySelector('.nav-btn.right');
const slider = document.querySelector('.slider');

let currentIndex = 0;
let autoPlayInterval;

function updateSliderAndDot() {
  const slideWidth = items[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle('selected', idx === currentIndex);
  });
}

function handleBtnClick(direc) {
  if (direc === "next") {
    currentIndex = (currentIndex + 1) % items.length;
  } else if (direc === "prev") {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
  }
  updateSliderAndDot();
}

function goTo(idx) {
  currentIndex = idx;
  updateSliderAndDot();
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    handleBtnClick('next');
  }, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Sự kiện cho dot và nút điều hướng
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => goTo(idx));
});

nextBtn.addEventListener('click', () => handleBtnClick('next'));
prevBtn.addEventListener('click', () => handleBtnClick('prev'));

// Tạm dừng khi hover
slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);

// Khởi tạo
updateSliderAndDot();
startAutoPlay();
