
$(".shopping-cart-nav").click(function () {
    $(".cart-body").slideToggle("slow");
});

$(".open-modal").click(function () {
    $(".modal").css("display", "block");
});

$(".close").click(function () {
    $(".modal").css("display", "none");
});

var interval;
var image = $(".slider-inner img");
var imageArray = [];

image.each(function () {
    imageArray.push($(this).attr("src"));
});

var imagePosition = 0;
image.attr("src", imageArray[imagePosition]);

function imageSlide(counter) {
    interval = setInterval(function () {
        image.attr("src", imageArray[counter]);
        imagePosition = counter;
        counter++;

        if (counter > imageArray.length - 1) {
            counter = 0;
        }
    }, 3000);
}

imageSlide(imagePosition);

function nextAndPrev() {
    $(".prev").click(function () {
        clearInterval(interval);
        imagePosition = imagePosition -1;

        if (imagePosition < 0) {
            imagePosition = imageArray.length - 1;
        }
        image.attr("src", imageArray[imagePosition]);
        imageSlide(imagePosition);
    })

    $(".next").click(function () {
        clearInterval(interval);

        imagePosition = imagePosition + 1;

        if (imagePosition > imageArray.length - 1) {
            imagePosition = 0;
        }
        image.attr("src", imageArray[imagePosition]);
        imageSlide(imagePosition);
    })
}
nextAndPrev();



var quantity = 0;
function addToCart() {

    $(".plus").click(function () {

        quantity++;
        $(".product-quantity").text(quantity);
    })

    $(".minus").click(function () {

        quantity--;
        $(".product-quantity").text(quantity);
    })
}
addToCart();


var price = 125;
$(".cart-btn").click(function () {
    $(".cart-detail").text(price + " * " + quantity + " = " + "$" + price * quantity);
    $(".checkout").html("<button>CheckOut</button>");
})

//$(".next").click(function () {
//    var currentImg = $(".active");
//    var nextImg = currentImg.next();

//    if (nextImg.length) {
//        currentImg.removeClass(".active");
//        nextImg.addClass(".active");
//    }
//})