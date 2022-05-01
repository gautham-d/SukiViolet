import i0 from "../images/0.jpg";
import i1 from "../images/1.jpg";
import i2 from "../images/2.jpg";
import i3 from "../images/3.jpg";
import i4 from "../images/4.jpg";


var images = [i0,i1,i2,i3,i4]
var content = document.getElementById('content');
var popup = document.querySelector('.popup')
var close = document.querySelector('.close')

for(let i=0;i<50;i++){
    let story = document.createElement("div");
    // let marquee = document.createElement("marquee")
    // marquee.innerText("This is basic example of marquee")
    // story.appendChild(marquee)
    story.id = `c${i}`
    story.innerHTML=`<marquee direction="${i%2?'left':'right'}" class="no-select">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore totam aliquam ex a voluptatem sit quae, quaerat, numquam incidunt voluptates, ut accusamus! Inventore, soluta est?                                                                             </marquee>`
    story.classList.add("story")
    story.classList.add(`w${i%5}`)
    content.appendChild(story)
}

content.addEventListener("click",function(e){
    if (e.path[0].id[1]==='o'){
        return;
    }
    popup.classList.remove("hide")
    popup.classList.add("show");
    console.log(e.path[0].id[1])
    popup.querySelector('img').setAttribute('src',`${images[e.path[0].id.slice(1)%5]}.jpg`)
    // console.log(popup.querySelector('img'))
})

close.addEventListener("click",function(e){
    popup.classList.remove("show");
    popup.classList.add("hide")
})

// console.log('d')
