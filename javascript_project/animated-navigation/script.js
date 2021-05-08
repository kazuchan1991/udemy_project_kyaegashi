const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

const navItems = [nav1, nav2, nav3, nav4, nav5];


const navAnimation = (direction1, direction2) => {
    navItems.forEach((nav, ind) => {
        console.log(`slide-${direction1}-${ind+1}`);
        nav.classList.replace(`slide-${direction1}-${ind+1}`, `slide-${direction2}-${ind+1}`);
    })
}

const toggleNav = () => {
    // toggle: menu bars open/close
    menuBars.classList.toggle('change');
    // toggle: menu active
    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')) {
        // animate in - overlay
        //overlay.classList.remove('overlay-slide-left');
        //overlay.classList.add('overlay-slide-right');
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        // animate in - nav items
        navAnimation('out', 'in');
    } else {
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        navAnimation('in', 'out');
    }
}

// event listener
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
    nav.addEventListener('click', toggleNav);
});