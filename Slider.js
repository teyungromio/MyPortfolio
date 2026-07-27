class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.track = this.slider.querySelector('.slider-track');
        this.slides=Array.from(this.track.children);
        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');
        this.currentIndex = 0;
        this.autoSliderInterval = null;
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        this.dots = [];
        this.init();
    }
    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlidePosition();
    }
    updateSlidePosition() {
        const offset=-this.currentIndex * this.slider.offsetWidth;
        this.track.style.transform=`translateX(${offset}px)`;
        this.updateDots();
    }
    nextSlide() {
        this.currentIndex=(this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }
    prevSlide() {
        if(this.currentIndex>0){
            this.currentIndex=(this.currentIndex - 1) % this.slides.length;
        }
        else{
            this.currentIndex=this.slides.length - 1;
        }
        this.updateSlidePosition();
    }
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    createDots(){
        this.dotsContainer.innerHTML='';
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                this.currentIndex=index;
                this.updateSlidePosition();
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () =>
new ImageSlider('#slider'));