
const cards = [
    {
        "id": "1",
        "name": "soda",
        "image": "./images/rsz_1cocacola.jpg",
        "category": "Drink",
        "title": "Coca Cola", 
        "description": "The Coca-Cola logo works well because its flowing script feels friendly, energetic, and timeless. Its distinctive red-and-white color combination is eye-catching, easy to recognize, and strongly associated with the brand.",
        "read more": "The Coca-Cola logo was first introduced in 1886 by Frank Mason Robinson, the bookkeeper of Atlanta pharmacist John Stith Pemberton, who created the beverage. Initially, the logo was a simple serif wordmark, functional but unremarkable. Robinson soon designed the Spencerian script, a flowing, elegant handwriting style popular in the 19th century, giving the logo its distinctive, fluid appearance. By 1893, the logo was officially registered as a trademark, with the phrase 'TRADE MARK' incorporated into the long tail of the first 'C'",
        "key designs": "Typography: Spencerian script, flowing and elegant, has remained the core of the logo since the 1880s. Color: Red symbolizes strength, passion, and energy; white represents purity and youth. Bottle Shape: The contoured bottle, introduced in 1915, became a registered trademark and a symbol of quality. Ribbon/Wave: Added in 1969, it conveys motion, fluidity, and refreshment."

    },

    {
        "id": "2",
        "name": "chips",
        "image": "./images/chips.jpg",
        "category": "Snack",
        "title": "Doritos", 
        "description": "The Doritos logo works well because its bold, vibrant design stands out on shelves and appeals to a wide audience. The distinctive orange color and playful font create a sense of fun and excitement.",
        "read more": "Over nearly six decades, the Doritos logo has evolved through nine major redesigns, transitioning from colorful rectangles with serif lettering to a modern triangular emblem that visually represents the product and its bold flavors. Each redesign reflects the brand’s effort to stay contemporary while maintaining a recognizable identity", 
        "key designs":"Typography: Bold, angular lettering creates an energetic and youthful appearance. Triangle Shape: The design reflects the triangular shape of a tortilla chip. Colors: Red, orange, yellow, and black suggest bold flavor, excitement, and energy. History: Since Doritos launched in 1966, its logo has evolved from a simple colorful design into the sharp, modern logo recognized today."
    },

    {
        "id": "3",
        "name": "skincare",
        "image": "./images/makeup.jpg",
        "category": "beauty",
        "title": "NARS beauty", 
        "description": "The NARS beauty logo works well because its sleek, modern design conveys sophistication and high-quality. The bold typography and distinctive color scheme make it stand out in a crowded market." ,
        "read more": "",
        "key designs": ""  
    }, 

    {
        "id": "4",
        "name": "clothing brand",
        "image": "./images/vans.jpg",
        "category": "clothing brand",
        "title": "Vans", 
        "description": "The Vans logo works well because its simple, bold design is instantly recognizable. The distinctive checkerboard pattern and straightforward typography create a strong visual identity that resonates with the brand's culture of being 'off the wall'.", 
        "read more": "",
        "key designs": ""  
    }, 

    {
        "id": "5",
        "name": "company",
        "image": "./images/fedex.jpg",
        "category": "company",
        "title": "Fed Ex", 
        "description": "The FedEx logo works well because its clean, bold lettering looks professional and trustworthy. The hidden arrow between the “E” and “x” cleverly represents speed, movement, and delivery.", 
        "read more": "",
        "key designs": ""  
    }, 

    {
        "id": "6",
        "name": "waterbottle",
        "image": "./images/owala.jpeg",
        "category": "waterbottle",
        "title": "Owala", 
        "description": "The Owala logo works well because its minimalist design is both modern and functional. The clean typography and simple color scheme convey a sense of purity and sustainability.", 
        "read more": "",
        "key designs": ""  
    }, 

    {
         "id": "7",
        "name": "cars",
        "image": "./images/jeep.jpg",
        "category": "car",
        "title": "Jeep", 
        "description": "The Jeep logo works well because its bold, rugged design reflects the brand's heritage and off-road capabilities. The distinctive styling and strong visual identity make it easily recognizable.", 
        "read more": "",
        "key designs": ""  
    }

]

const cardContainer = document.querySelector("#card-container");

cards.forEach(function(card) {
    const article = document.createElement("article");
    article.classList.add("design-card");
    article.dataset.category = card.category.toLowerCase();

    article.innerHTML = `
        <div class="card-image">
            <img 
                class="cardphotos" 
                src="${card.image}" alt="${card.title} packaging design"
            >
        </div>

        <div class="card-content">
            <p class="category">${card.category}</p>
            <h3>${card.title}</h3>
            <p class="description">${card.description}</p>
        </div>
    `;

    cardContainer.appendChild(article);
});