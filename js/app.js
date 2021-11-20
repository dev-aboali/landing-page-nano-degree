/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let sections = document.querySelectorAll('section')
let sectionList  = Array.from(sections)
let navBarList = document.querySelector('#navbar__list')
let menuLinks = document.getElementsByClassName('menu__link')


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav() {
    let fragment = new DocumentFragment()
    sectionList.forEach(section => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.classList.add('menu__link')
        a.href=`#${section.id}`
        a.textContent = `${section.dataset.nav}`
        li.appendChild(a)
        fragment.appendChild(li)
    })
    navBarList.appendChild(fragment)    
    
}

// Add class 'active' to section when near top of viewport

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            entry.target.classList.remove('your-active-class')
            return;
        }
        // add active class to menu liks whenever we scroll to another section
         Array.from(menuLinks).map((link) => {
            let href = link.href.split('#')[1]
            if(entry.target.id === href) {
                link.classList.add('active')
            } else {
                link.classList.remove('active')
            }
        })
        entry.target.classList.toggle('your-active-class')
    })
}, { threshold: 0.25, });

// add your-active-class to observable section in the page
function toggleActiveClass() {
    
    for (const section of sectionList) {
        section.classList.remove('your-active-class')
        observer.observe(section)
    }

}

// Scroll to anchor ID using scrollIntoView event using smooth behavior
navBarList.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.classList.contains('menu__link')) {
        let href = e.target.href.split('#')[1]
        let el = document.getElementById(href)
        el.scrollIntoView({
            behavior: "smooth"
        }); 
    }
})

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav()

// Set sections as active
toggleActiveClass()
