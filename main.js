
// menu section
const galleryImg = [
     {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
]

function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    }); 

    document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });   
}
// Greeting section

function celsiusToFahr(tempature){
    let tempfr = (tempature * 9/5) + 32;
    return (tempfr.toFixed(1));
}
function Greetinghendelear(){
 const greetingText = "Good morning!";
const watherCondition = "sunny"
const usereLocation = "London"
let tempature = 25;
let CelsiusText = `The weather is ${watherCondition} in ${usereLocation } and it's ${tempature}°C outside.`;
let fahrText = `The weather is ${watherCondition} in ${usereLocation } and it's ${celsiusToFahr(tempature)}°F outside.`;

document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("p#weather").innerHTML = CelsiusText;  

document.querySelector(".weather-group").addEventListener("click", function(e){
    //celsius
    //fahr

    if (e.target.id == "celsius") {
        document.querySelector("p#weather").innerHTML = CelsiusText;
    }
    else if (e.target.id == "fahr") {
        document.querySelector("p#weather").innerHTML = fahrText;
    }
    });   
}

function clockHandler(){
    let locolTime = new Date();
    document.querySelector("span[data-time=hours]").textContent = locolTime.getHours().toString().padStart(2,"0");
    document.querySelector("span[data-time=minutes]").textContent = locolTime.getMinutes().toString().padStart(2,"0");
    document.querySelector("span[data-time=seconds]").textContent = locolTime.getSeconds().toString().padStart(2,"0");
}

function gallryHendler(){
    // for(let i in galleryImg){
    //     console.log(galleryImg[i]);
    // }

    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");


    mainImage.src = galleryImg[0].src;
    mainImage.alt = galleryImg[0].alt;

    //<img src="./assets/gallery/image1.jpg" 
    // alt="Thumbnail Image 1" 
    // data-array-index="0" data-selected="true"></img>

    galleryImg.forEach(function(image, index){
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;

        thumb.addEventListener("click", function(e){
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImg[selectedIndex];

            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;

            thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            });

            e.target.dataset.selected = true;
        });


        thumbnails.appendChild(thumb);
    });
}

//prodact

/* <div class="product-item">
             <img src="./assets/products/img6.png" alt="AstroFiction">
             <div class="product-details">
                <h3 class="product-title">AstroFiction</h3>
                <p class="product-author">John Doe</p>
                <p class="price-title">Price</p>
                <p class="product-price">$ 49.90</p>
             </div> 
</div> */

function productsHandler(){
    let prodSec = document.querySelector(".products-area");
    products.forEach(function(prod, index){
        let prodElm = document.createElement("div");
        prodElm.classList.add("product-item");

        let prodImg = document.createElement("img");
        prodImg.src = products.image;
        prodImg.alt = "Image for " + products.title;

        prodElm.append(prodImg);
        prodSec.append(prodElm);
    });
}



//pagrload
menuHandler();

Greetinghendelear();

clockHandler();

setInterval(function(){
    clockHandler();
},1000);

gallryHendler();
productsHandler();