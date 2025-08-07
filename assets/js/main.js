const container = document.querySelector(".rain-container");

// Danh sách hình ảnh SVG
const iconList = [
  "html.svg",
  "css.svg", 
  "github.svg",
  "redux.svg",
  "reactjs.svg",
  "js.svg",
  "tailwind.svg"
];

function createIcon() {
  const icon = document.createElement("img");
  icon.classList.add("icon-drop");
  
  // Chọn ngẫu nhiên một icon từ danh sách
  const selectedIcon = iconList[Math.floor(Math.random() * iconList.length)];
  icon.src = `../assets/images/${selectedIcon}`;
  
  // Thêm alt text cho accessibility
  icon.alt = selectedIcon.replace('.svg', '');
  
  // Tính toán vị trí ngẫu nhiên
  const containerWidth = container.offsetWidth;
  icon.style.left = Math.random() * containerWidth + "px";
  
  // Kích thước ngẫu nhiên từ 20px đến 40px
  const size = 20 + Math.random() * 20;
  icon.style.width = size + "px";
  icon.style.height = size + "px"; // Đảm bảo tỷ lệ 1:1
  
  // Thời gian rơi ngẫu nhiên
  icon.style.animationDuration = 2 + Math.random() * 3 + "s";
  
  // Thêm một chút độ trễ ngẫu nhiên
  icon.style.animationDelay = Math.random() * 0.5 + "s";
  
  container.appendChild(icon);
  
  // Xóa icon sau khi animation hoàn thành
  setTimeout(() => {
    if (icon.parentNode) {
      icon.remove();
    }
  }, 6000); // Tăng thời gian để đảm bảo animation hoàn thành
}

// Error handling cho hình ảnh không load được
function handleImageError(icon) {
  // Thay thế bằng một fallback icon hoặc xóa element
  icon.style.display = 'none';
  setTimeout(() => {
    if (icon.parentNode) {
      icon.remove();
    }
  }, 100);
}

// Cải thiện function tạo icon với error handling
function createIconWithErrorHandling() {
  const icon = document.createElement("img");
  icon.classList.add("icon-drop");
  
  const selectedIcon = iconList[Math.floor(Math.random() * iconList.length)];
  icon.src = `../assets/images/${selectedIcon}`;
  icon.alt = selectedIcon.replace('.svg', '');
  
  // Xử lý lỗi khi không load được hình ảnh
  icon.onerror = () => handleImageError(icon);
  
  const containerWidth = container.offsetWidth;
  icon.style.left = Math.random() * containerWidth + "px";
  
  const size = 20 + Math.random() * 20;
  icon.style.width = size + "px";
  icon.style.height = size + "px";
  
  icon.style.animationDuration = 2 + Math.random() * 3 + "s";
  icon.style.animationDelay = Math.random() * 0.5 + "s";
  
  container.appendChild(icon);
  
  setTimeout(() => {
    if (icon.parentNode) {
      icon.remove();
    }
  }, 6000);
}

// Kiểm tra element có trong viewport không
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

const experienceSection = document.querySelector('.experience');
let rainInterval;

function startRain() {
  if (!rainInterval) {
    rainInterval = setInterval(createIconWithErrorHandling, 300); // Giảm tần suất một chút để tránh quá tải
  }
}

function stopRain() {
  if (rainInterval) {
    clearInterval(rainInterval);
    rainInterval = null;
  }
}

// Kiểm tra khi scroll để bắt đầu/dừng mưa
function handleScroll() {
  if (isElementInViewport(experienceSection)) {
    startRain();
  } else {
    stopRain();
  }
}

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
window.addEventListener('beforeunload', stopRain);

// Preload images để tối ưu performance
function preloadImages() {
  iconList.forEach(iconName => {
    const img = new Image();
    img.src = `../assets/images/${iconName}`;
  });
}

// Gọi preload khi trang load
window.addEventListener('load', preloadImages);