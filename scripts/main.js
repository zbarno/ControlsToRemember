// scripts/main.js
const games = [
    //["Suggestion Text","Article Name"]
    ["Minecraft", "minecraft"],

];




document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search); // Get URLSearchParams object from the query string
    const gameParam = params.get('game'); // Get the value of 'user' parameter

    if (gameParam) {
        get_article_content(gameParam, document.getElementById("main_content")).then(() => {
            active_controls();
        });
    }
    else {
        active_controls();
    }

});

function active_controls() {
    const accordionButtons = document.querySelectorAll('.accordion-button, .videos-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Toggle the active class for the clicked button
            this.classList.toggle('active');

            // Get the associated content div
            const content = this.nextElementSibling;

            // Toggle the display of the content
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }

            // Close other accordion panels
            accordionButtons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                    btn.nextElementSibling.style.display = 'none';
                }
            });
        });


    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullSizeImage = item.getAttribute('data-full');
            modalImage.src = fullSizeImage;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function autocomplete(input, suggestions) {
    let currentFocus;

    input.addEventListener("input", function () {
        let val = this.value;
        closeAllLists();
        if (!val) return false;
        currentFocus = -1;

        const listContainer = document.createElement("div");
        listContainer.setAttribute("id", this.id + "-autocomplete-list");
        listContainer.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(listContainer);

        suggestions.forEach(game => {
            if (game[0].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                const suggestionItem = document.createElement("div");
                suggestionItem.innerHTML = "<strong>" + game[0].substr(0, val.length) + "</strong>" + game[0].substr(val.length);
                suggestionItem.innerHTML += "<input type='hidden' value='" + game[0] + "'>";

                suggestionItem.addEventListener("click", function () {
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();

                    get_article_content(game[1], document.getElementById("main_content")).then(() => {
                        active_controls();
                    });
                });

                listContainer.appendChild(suggestionItem);
            }
        });
    });

    input.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "-autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(items) {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        const items = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < items.length; i++) {
            if (elmnt !== items[i] && elmnt !== input) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

const searchInput = document.querySelector('header input[type="text"]');
autocomplete(searchInput, games);
