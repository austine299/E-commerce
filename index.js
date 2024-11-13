
$(".shopping-cart-nav").click(function () {
    $(".cart-body").slideToggle("slow");
});

$(".close-cart").click(function () {
    $(".cart-body").slideUp("slow");
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

//var removeCartItemButton = document.getElementsByClassName("cart-items");

//for (var i = 0; i < removeCartItemButton.length; i++) {
//    var button = removeCartItemButton[i];
//    button.addEventListener("click", function (event) {
//        var buttonclicked = event.target;
//        buttonclicked.parentElement.parentElement.remove();
//        updateCart();
       
//    })
//}


$("#cart-add").click(function (e) {
    console.log("hi", e)
    e.preventDefault();
    var image = $(this).attr("src");
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    addItem(image, name, price, 1);
    updateCart();
    $(".checkout").css("display", "none");
    $("#btn-check-out").css("display", "block");
})


function updateCart() {
    var cart = loadCart();
    console.log("hello")
    var html = "";
    totalCount = 0;
    totalPrice = 0;
    for (var i in cart) {
        console.log("for Loop", cart[i])
        var image = cart[i].image;
        var name = cart[i].name;
        var price = cart[i].price;
        var count = cart[i].count;
        totalCount = + count;
        totalPrice = price * count;
       
        html +=` <div class="col-sm-12 col-lg-12 row mt-5 mb-3 cart-row" style="">
                    <div class="col-sm-4 col-lg-3 ">
                        <img src="${image}" alt="Alternate Text" class="open-modal cursor" />
                        
                    </div>
                    <div class="col-sm-7 col-lg-8 row >
                        <span class=""  style="
color: hsl(219, 9%, 45%);font-size:20px;font-weight:bold;">${name}</span>
                        <span class=" amount" style="
color: hsl(219, 9%, 45%);font-size:20px;font-weight:bold;">$${price} X ${count}
<span style="color:black; margin-left:30px;"> $${totalPrice}</span> 
                            </span>
                    </div>
                    <img src="images/icon-delete.svg"
style="width:50px; height:50px; margin-left:90%; margin-top:-15%;"
data-name="${name}"
class="col-sm-1 col-lg-1 btn delete cursor" />
                    
        </div>`
    }
    $(".product-quantity").text(count);
    $(".cart-items").html(html);
   
}

$(".cart-items").on("click", ".delete", function (event) {
    var name = $(this).attr("data-name");
    removeItemFromCartAll(name);
    updateCart();
})


$(".minus").click(function (event) {
    var name = $(this).attr("data-name");
    removeItemFromCart(name);
    updateCart();
})

$(".plus").click(function (event) {
    var name = $(this).attr("data-name");
    addItemToCart(name, 0, 1);
    updateCart();
})

//var cart = [];


function addItem(image, name, price, count) {
    var carts = loadCart();
    console.log(carts);
    var currentCart = carts.find((c) => c.name === name)
    count = count + (currentCart?.count || 0);
    carts = carts.filter((c) => c.name !== name)
    var item = { image: image, name: name, price: price, count: count };
    carts.push(item);  

    saveCart(carts);
}


function removeItemFromCart(name) {
    var cart = loadCart();
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;

        }
    }
    saveCart();
}

function addItemToCart(name, price, count) {
    var cart = loadCart();
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            
            break;

        }
    }
    saveCart();
}

function removeItemFromCartAll(name) {
    var cart = loadCart();
    for (var i in cart) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;

        }
    }
    saveCart();
}

function clearCart() {
    localStorage.removeItem("shoppingCart");
}


function saveCart(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}


function loadCart() {
    if (!["undefined", null, "null", undefined].includes(localStorage.getItem("shoppingCart"))) {
        console.log(localStorage.getItem("shoppingCart"));
    return JSON.parse(localStorage.getItem("shoppingCart"));
    }
    return []
}
//function updateCartTotal() {
//    var cartContainer = document.getElementsByClassName("cart-items")[0];
//    var cartRows = cartContainer.getElementsByClassName("cart-row");
//    for (var i = 0; i < cartRows.length; i++) {
//        var cartRow = cartRows[i];
//        console.log(82, cartRow);
//        var cartPrice = cartRow.getElementsByClassName("amount")[0];
//        var cartQty = cartRow.getElementsByClassName("cart-qty-input").attr;
//        console.log(85, cartQty);


//        var price = parseFloat(cartPrice.innerText.replace("#", ""));
//        var Qty = cartQty.value
//        console.log(price, Qty);
//    }
//}





//var price = 125;
//$(".cart-btn").click(function () {
//    $(".cart-detail").text(price + " * " + quantity + " = " + "$" + price * quantity);
//    $(".checkout").html("<button>CheckOut</button>");
//})

//$(".next").click(function () {
//    var currentImg = $(".active");
//    var nextImg = currentImg.next();

//    if (nextImg.length) {
//        currentImg.removeClass(".active");
//        nextImg.addClass(".active");
//    }
//})