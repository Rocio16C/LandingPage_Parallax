const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0, 
yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
        
        let isInLeft = 
          parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `perspective(2300px) translateZ(${zValue * speedz}px) 
        rotateY(${rotateDegree * rotateSpeed}deg)
        translateX(calc(-50% + ${-xValue * speedx}px)) 
        translateY(calc(-50% + ${yValue * speedy}px))`;
    });
}

update(0);


window.addEventListener("mousemove", (e) => {
    const activeAnimations = timelines.some(timeline => timeline.isActive());
    if (activeAnimations) return;
    if(timeline1.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
});

if(window.innerWidth >= 725){
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

//GSAP ANIMATION
let timeline1 = gsap.timeline();

const parallax_el_array = Array.from(parallax_el);

// Array de timelines
const timelines = parallax_el_array.map(el => {
    // Creamos una nueva línea de tiempo para cada elemento
    const timeline = gsap.timeline();
    
    const distancia = parseFloat(el.dataset.distance);
    const suma = el.offsetHeight / 3 + distancia;
    
    timeline.from(el, {
        top: `${suma}px`,
        duration: 3.5,
        ease: "power3.out",
    });

    return timeline;
});

timeline1.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 150,
    duration: 2,
},
"2.5"
)
.from(".text h2", {
    y: -100,
    opacity: 0,
    duration: 1.5,
}, "3")
.from(".hide", {
    opacity: 0,
    duration: 1.5,

}, "3")
