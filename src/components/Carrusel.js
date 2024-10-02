import '../assets/css/carrusel.css';

const Carrousel = () => {

    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
       showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    return (
        <div class="slideshow-container">
    
          <div class="mySlides fade">
            <div class="numbertext">1 / 3</div>
            <img src="../assets/img/reloj-valkur.png" alt=''/>
            <div class="text">Caption Text</div>
          </div>
        
          <div class="mySlides fade">
            <div class="numbertext">2 / 3</div>
            <img src="img2.jpg" alt=''/>
            <div class="text">Caption Two</div>
          </div>
        
          <div class="mySlides fade">
            <div class="numbertext">3 / 3</div>
            <img src="img3.jpg" alt=''/>
            <div class="text">Caption Three</div>
          </div>
        
          <a class="prev" onclick={plusSlides(-1)}>&#10094;</a>
          <a class="next" onclick={plusSlides(1)}>&#10095;</a>
        </div>
    )
}

export default Carrousel;