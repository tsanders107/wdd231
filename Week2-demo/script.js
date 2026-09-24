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