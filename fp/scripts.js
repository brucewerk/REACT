const prev = document.getElementById("prev");
const next = document.getElementById("next");
const items = document.querySelectorAll(".list .item");
const dots = document.querySelectorAll(".indicators ul li");
const numberDiv = document.querySelector(".indicators .number");

let active = 0;
const last = items.length - 1;

function update(index) {
  items.forEach(i => i.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  items[index].classList.add("active");
  dots[index].classList.add("active");
  numberDiv.textContent = String(index + 1).padStart(2, "0");
}

function goNext() {
  active = active === last ? 0 : active + 1;
  update(active);
}
function goPrev() {
  active = active === 0 ? last : active - 1;
  update(active);
}

prev.onclick = goPrev;
next.onclick = goNext;
dots.forEach((dot, i) => { dot.onclick = () => { active = i; update(active); }; });

// Swipe
let startX = 0;
document.querySelector(".list").addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].screenX;
});
document.querySelector(".list").addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].screenX;
  const diff = endX - startX;
  if (Math.abs(diff) < 50) return;
  diff > 0 ? goPrev() : goNext();
});

// Teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goPrev();
  if (e.key === "ArrowRight") goNext();
});