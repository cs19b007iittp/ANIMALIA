const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if(window.pageYOffset > 100) {
  toTop.classList.add("active");
  }
  else {
    toTop.classList.remove("active");
  }
})
//common reveal options to create reveal animations
ScrollReveal({
  //reset: true,
  distance: '60px',
  duration: 2500,
  delay: 400
});

//target elements, and specify options to create reveal animations
ScrollReveal().reveal('.main-title, .section-title', { delay: 500, origin: 'left' });
ScrollReveal().reveal('.sec-01 .image, .info', { delay: 600, origin: 'bottom' });
ScrollReveal().reveal('.text-box', { delay: 700, origin: 'right' });
ScrollReveal().reveal('.sec-02 .image, .sec-03 .image', { delay: 500, origin: 'top' });
ScrollReveal().reveal('.sec-03 .image, .sec-04 .image', { delay: 500, origin: 'top' });



      // Get modal element
var modal = document.getElementById('simpleModal');
// Get open modal button
var modalBtn = document.getElementById('modalBtn');
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);

// Function to open modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  modal.style.display = 'none';
}

// Function to close modal if outside clicked
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}




 // Get modal element
 var modal1 = document.getElementById('simpleModal1');
 // Get open modal button
 var modalBtn1 = document.getElementById('modalBtn1');
 // Get close button
 var closeBtn1 = document.getElementsByClassName('closeBtn1')[0];

 // Listen for open click
 modalBtn1.addEventListener('click', openModal1);
 // Listen for close click
 closeBtn1.addEventListener('click', closeModal1);
 // Listen for outside click
 window.addEventListener('click', outsideClick1);

 // Function to open modal
 function openModal1() {
   modal1.style.display = 'block';
 }

 // Function to close modal
 function closeModal1() {
   modal1.style.display = 'none';
 }

 // Function to close modal if outside clicked
 function outsideClick1(e) {
   if (e.target == modal1) {
     modal1.style.display = 'none';
   }
 }


 // Get modal element
 var modal2 = document.getElementById('simpleModal2');
 // Get open modal button
 var modalBtn2 = document.getElementById('modalBtn2');
 // Get close button
 var closeBtn2 = document.getElementsByClassName('closeBtn2')[0];

 // Listen for open click
 modalBtn2.addEventListener('click', openModal2);
 // Listen for close click
 closeBtn2.addEventListener('click', closeModal2);
 // Listen for outside click
 window.addEventListener('click', outsideClick2);

 // Function to open modal
 function openModal2() {
   modal2.style.display = 'block';
 }

 // Function to close modal
 function closeModal2() {
   modal2.style.display = 'none';
 }

 // Function to close modal if outside clicked
 function outsideClick2(e) {
   if (e.target == modal2) {
     modal2.style.display = 'none';
   }
 }




 // Get modal element
 var modal3 = document.getElementById('simpleModal3');
 // Get open modal button
 var modalBtn3 = document.getElementById('modalBtn3');
 // Get close button
 var closeBtn3 = document.getElementsByClassName('closeBtn3')[0];

 // Listen for open click
 modalBtn3.addEventListener('click', openModal3);
 // Listen for close click
 closeBtn3.addEventListener('click', closeModal3);
 // Listen for outside click
 window.addEventListener('click', outsideClick3);

 // Function to open modal
 function openModal3() {
   modal3.style.display = 'block';
 }

 // Function to close modal
 function closeModal3() {
   modal3.style.display = 'none';
 }

 // Function to close modal if outside clicked
 function outsideClick3(e) {
   if (e.target == modal3) {
     modal3.style.display = 'none';
   }
 }
 
