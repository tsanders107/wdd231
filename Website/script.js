// // CATEGORY FILTERS

// const filterButtons = document.querySelectorAll(".filter-btn");
// const cards = document.querySelectorAll(".design-card");
// const itemCount = document.querySelector("#itemCount");

// filterButtons.forEach(function(button) {

//     button.addEventListener("click", function() {

//         // Remove active class from every button
//         filterButtons.forEach(function(btn) {
//             btn.classList.remove("active");
//         });

//         // Add active class to clicked button
//         button.classList.add("active");

//         const selectedCategory = button.dataset.category;

//         let visibleCards = 0;

//         cards.forEach(function(card) {

//             const cardCategory = card.dataset.category;

//             if (
//                 selectedCategory === "all" ||
//                 selectedCategory === cardCategory
//             ) {
//                 card.style.display = "block";
//                 visibleCards++;
//             } else {
//                 card.style.display = "none";
//             }

//         });

//         itemCount.textContent = visibleCards;

//     });

// });


// // DESIGN ANALYSIS POPUP

// const modal = document.querySelector("#designModal");
// const modalTitle = document.querySelector("#modalTitle");
// const modalText = document.querySelector("#modalText");
// const closeModal = document.querySelector("#closeModal");

// const analysisButtons = document.querySelectorAll(".learn-more");

// analysisButtons.forEach(function(button) {

//     button.addEventListener("click", function() {

//         const title = button.dataset.title;
//         const text = button.dataset.text;

//         modalTitle.textContent = title;
//         modalText.textContent = text;

//         modal.classList.add("show");

//     });

// });


// // CLOSE BUTTON

// closeModal.addEventListener("click", function() {
//     modal.classList.remove("show");
// });


// // CLOSE WHEN CLICKING OUTSIDE POPUP

// modal.addEventListener("click", function(event) {

//     if (event.target === modal) {
//         modal.classList.remove("show");
//     }

// });


const cards = [
    {
        "id": "1",
        "name": "soda",
        "image": "./images/rsz_1cocacola.jpg",
        "category": "Drink",
        "title": "Some type of Soda", 
        "description": "aisjdhlksdhjlkajsldkj"

    },

    {
        "id": "2",
        "name": "chips",
        "image": "./images/chips.jpg",
        "category": "Snack",
        "title": "Chip", 
        "description": "aisjdhlksdhjlkajsldkj"   
    },

    {
        "id": "3",
        "name": "skincare",
        "image": "./images/makeup.jpg",
        "category": "beauty",
        "title": "skincare", 
        "description": "aisjdhlksdhjlkajsldkj"   
    }, 

    {
        "id": "4",
        "name": "clothing brand",
        "image": "./images/vans.jpg",
        "category": "clothing brand",
        "title": "brand", 
        "description": "aisjdhlksdhjlkajsldkj"   
    }, 

    {
        "id": "5",
        "name": "company",
        "image": "./images/fedex.jpg",
        "category": "company",
        "title": "Fed Ex", 
        "description": "aisjdhlksdhjlkajsldkj"   
    }, 

    {
        "id": "6",
        "name": "waterbottle",
        "image": "./images/owala.jpeg",
        "category": "waterbottle",
        "title": "Owala", 
        "description": "aisjdhlksdhjlkajsldkj"   
    }, 

    {
         "id": "7",
        "name": "cars",
        "image": "./images/jeep.jpg",
        "category": "car",
        "title": "Jeep", 
        "description": "aisjdhlksdhjlkajsldkj"   
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