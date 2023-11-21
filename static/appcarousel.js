$(document).ready(() => {
    // setting owl carousel

    let navText = ["<i class='bx bx=chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

    $('#hero-carousel').owlCarousel({
        items:1,
        dots:false,
        loop:true,
        nav:true,
        navText: navText,
        autoplay:true,
        autoplayHoverPause: true,
    })
    $('#top-games-slide').owlCarousel({
        items:5,
        dots:false,
        loop:true,
        autoplay:false,
        autoplayHoverPause:true,
        responsive:{
            500: {
                items: 3
            },
            1280: {
                items:4
            },
            1600: {
                items: 5
            }
        }
    })

    $('.game-slide').owlCarousel({
        items : 5,
        dots:false,
        nav:true,
        navText:navText,
        margin:15,
        responsive: {
            500: {
                items: 3
            },
            1280: {
                items:4
            },
            1600: {
                items: 5
            }
            
        }

    })
})