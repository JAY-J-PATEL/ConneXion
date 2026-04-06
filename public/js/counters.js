// --------------------------bootstrap validation for form starts-----------------

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()




// __________________________bootstrap validation for form ends___________________



const counters = document.querySelectorAll(".counters span");
const container = document.querySelector(".counters");


let activated = false;

window.addEventListener("scroll", () => {

    if(
        pageYOffset > container.offsetTop - container.offsetHeight - 200
        && activated === false

    ){
        counters.forEach(counter => {
            counter.innerText = 0;
            let count = 0;
            function updatecount(){
                const target = parseInt(counter.dataset.count);
                if(count < target) {
                    count++;
                    counter.innerText = count;
                    setTimeout(updatecount, 10);
                } else {
                    counter.innerText = target;
                }
            }
            updatecount();
            activated = true;
        });
    } else if(
        pageYOffset < container.offsetTop - container.offsetHeight - 500
        || pageYOffset === 0
        && activated === true

    ){
        counters.forEach(counter => {
            counter.innerText = 0;
        });
        activated = false;
    }
});





// -------------------------

document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".res_box");

    function revealBoxes() {
        const triggerBottom = window.innerHeight * 0.85; // 85% of viewport height

        boxes.forEach((box, index) => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                setTimeout(() => {
                    box.classList.add("show");
                }, index * 500); // Delay each box by 500ms
            }
        });
    }

    window.addEventListener("scroll", revealBoxes);
    revealBoxes(); // Run once in case some boxes are already visible
});


// --------------------------- swiper

let btn = document.querySelector(".swiper-button-next");

var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
        delay: 5500
    },
    mousewheel: true,
    keyboard: true,


    breakpoints: {
        0: {
            slidesPerView: 1,
            
        },
        600: {
            slidesPerView:1.5,
            
        },
        750: {
            slidesPerView: 1.5,
            
        },
        850: {
            slidesPerView: 2,
        },
        1100: {
            slidesPerView: 2.5
        },
        1400: {
            slidesPerView: 3
        }
    }
});




let incrBox = document.querySelector(".increasing-number");

incrBox.addEventListener("scroll", () => {
    console.log("you cliked on box!");
});