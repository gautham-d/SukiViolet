import gsap from "gsap";

gsap.set(".follower", { xPercent: -50, yPercent: -50 });
gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

let follow = document.querySelector(".follower");
let cur = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  gsap.to(cur, { duration: 0.2, x: e.clientX, y: e.clientY });
  gsap.to(follow, { duration: 0.8, x: e.clientX, y: e.clientY });
});

/*--------------------
Vars
--------------------*/
const $menu = document.querySelector(".menu");
const $items = document.querySelectorAll(".menu--item");

let menuHeight = $menu.clientHeight;
let itemHeight = $items[0].clientHeight;
let wrapHeight = $items.length * itemHeight;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;

/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  console.log(`the lerp values are ${v0} , ${v1} , ${t}`);
  console.log(`the expression value is ${v0 * (1 - t) + v1 * t}`);
  return v0 * (1 - t) + v1 * t;
};

/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  gsap.set($items, {
    y: (i) => {
      return i * itemHeight + scroll;
    },
    modifiers: {
      y: (y) => {
        const s = gsap.utils.wrap(
          -itemHeight,
          wrapHeight - itemHeight,
          parseInt(y)
        );
        return `${s}px`;
      },
    },
  });
};

dispose(0);

/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY;
};

/*--------------------
Touch
--------------------*/
let touchStart = 0;
let touchY = 0;
let isDragging = false;

const handleTouchStart = (e) => {
  console.log(e);
  touchStart = e.clientY || e.touches[0].clientY;
  isDragging = true;
  $menu.classList.add("is-dragging");
};
const handleTouchMove = (e) => {
  if (!isDragging) return;
  touchY = e.clientY || e.touches[0].clientY;
  scrollY += (touchY - touchStart) * 2.5;
  touchStart = touchY;
};
const handleTouchEnd = () => {
  isDragging = false;
  $menu.classList.remove("is-dragging");
};

/*--------------------
Listeners
--------------------*/
$menu.addEventListener("mousewheel", handleMouseWheel);

$menu.addEventListener("touchstart", handleTouchStart);
$menu.addEventListener("touchmove", handleTouchMove);
$menu.addEventListener("touchend", handleTouchEnd);

$menu.addEventListener("mousedown", handleTouchStart);
$menu.addEventListener("mousemove", handleTouchMove);
$menu.addEventListener("mouseleave", handleTouchEnd);
$menu.addEventListener("mouseup", handleTouchEnd);

$menu.addEventListener("selectstart", () => {
  return false;
});

/*--------------------
Resize
--------------------*/
window.addEventListener("resize", () => {
  menuHeight = $menu.clientHeight;
  itemHeight = $items[0].clientHeight;
  wrapHeight = $items.length * itemHeight;
});

/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  gsap.to($items, {
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.005,
    rotate: scrollSpeed * 0.2,
  });
};
render();

// document.addEventListener("mousemove", parallax);

// function parallax(e) {
//   // console.log("e is:");
//   // console.log(e.pageX, e.pageY);
//   const elements = document.querySelectorAll(".move");

//   elements.forEach((layer) => {
//     const speed = 2;

//     const x = window.innerWidth - (e.pageX * speed) / 2;
//     const y = window.innerHeight - (e.pageY * speed) / 2;

//     console.log(`x is ${x}`);
//     console.log(`y is ${y}`);

//     // layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
//     gsap.set(".move", { x: `${x}`, y: `${y}` });
//   });
// }
