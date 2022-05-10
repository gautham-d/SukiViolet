var content = document.getElementById('content');
var popup = document.querySelector('.popup')
var close = document.querySelector('.close')
var bdy = document.body

// bdy.addEventListener('dragend',function(e){
//     content.log(e)
// })

// document.getElementsByClassName('customers').scrollTop = 10;
console.log(document.getElementById('content').scrollTop)
// console.log('d')

document.addEventListener("mousemove", parallax);

function parallax(e) {
  // console.log("e is:");
  // console.log(e.pageX, e.pageY);
  const elements = document.querySelectorAll(".move");

  elements.forEach((layer) => {
    const speed = 2;

    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}
