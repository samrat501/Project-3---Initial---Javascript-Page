const watherAPIKey = "c3335c3dd04607f452a11d54438d4dcd"
const WatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`
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
document.querySelector("#greeting").innerHTML = greetingText;
 
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

function watherhendlear(){
    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = WatherAPIURL
        .replace("{lat}", latitude)
        .replace("{lon}", longitude)
        .replace("{API key}", watherAPIKey);

        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const Condition = data.weather[0].description;
            const Location = data.name;
            let tempature = data.main.temp;


            let CelsiusText = `The weather is ${Condition} in ${Location } and it's ${tempature}°C outside.`;
            let fahrText = `The weather is ${Condition} in ${Location } and it's ${celsiusToFahr(tempature)}°F outside.`;


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
        }).catch((err => {
            document.querySelector("p#weather").innerHTML = "unable to get the weather info. Try again later,";
        }));
    
    });
};

//prodact

function populateProducts(productsList){

    let prodSec = document.querySelector(".products-area");
    prodSec.textContent = "";

    productsList.forEach(function(products, index){
        //creat product-item div
        let prodElm = document.createElement("div");
        prodElm.classList.add("product-item");

        //creat  image hild element for product-item 
        let prodImg = document.createElement("img");
        prodImg.src = products.image;
        prodImg.alt = "Image for " + products.title;

        //creat product-detils div

        let proddet = document.createElement("div");
        proddet.classList.add("product-details");

        //creat all element under producy-detils

        let prodtitle = document.createElement("h3");
        prodtitle.classList.add("product-title");
        prodtitle.textContent = products.title;

        let prodauthor = document.createElement("p");
        prodauthor.classList.add("product-author");
        prodauthor.textContent = products.author;

        let pricetitle = document.createElement("p");
        pricetitle.classList.add("price-title");
        pricetitle.textContent = "Price";

        let prodprice = document.createElement("p");
        prodprice.classList.add("product-price");
        prodprice.textContent = products.price > 0 ? "$" + products.price.toFixed(2) : "free";

        prodElm.append(prodImg);
        prodElm.append(proddet);

        prodSec.append(prodElm);

        proddet.append(prodtitle);
        proddet.append(prodauthor);
        proddet.append(pricetitle);
        proddet.append(prodprice);

    });
};


function productsHandler(){    

    let totleprod = products.length;
    let freeprod = products.filter(function(item){
        return  !item.price || item.price <= 0;
    });
     let paidprod = products.filter(function(item){
        return  item.price > 0;
    });

    populateProducts(products);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = totleprod;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidprod.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeprod.length;

    let prodFilter = document.querySelector(".products-filter");

    prodFilter.addEventListener("click", function(e){
        
        if (e.target.id === "all") {
            populateProducts(products);
        }
        else if (e.target.id === "paid") {
            populateProducts(paidprod);
        }
        else if (e.target.id === "free") {
            populateProducts(freeprod);
        }
    });
}

function footerHandler(){
    let currentyear = new Date().getFullYear();
    document.querySelector("footer").textContent = `Ⓒ ${currentyear} - All rights reserved`;
};



//pagrload
menuHandler();

Greetinghendelear();
watherhendlear();

clockHandler();

setInterval(function(){
    clockHandler();
},1000);

gallryHendler();
productsHandler();
footerHandler();