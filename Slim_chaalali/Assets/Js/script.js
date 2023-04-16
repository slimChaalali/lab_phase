
let coachBoxes = document.querySelectorAll('.coach-box');
let subscribeBtns = document.querySelectorAll('.subscribe-btn');
let cartBtn = document.querySelector('#cart');
let heartBtn = document.querySelector('#heart');
let myslide = document.querySelectorAll('.myslide'),
    dot = document.querySelectorAll('.dot');
let emailInput = document.getElementById("email");
let emailError = document.getElementById("email-error");

coachBoxes.forEach(function (coachBox) {
    coachBox.addEventListener('click', function () {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        const coachImg = coachBox.querySelector('img').cloneNode(true);
        popupContent.appendChild(coachImg);
        const coachDetail = coachBox.querySelector('.coach-detail h2').cloneNode(true);
        popupContent.appendChild(coachDetail);
        const coachAge = coachBox.querySelector('.coach-detail p').cloneNode(true);
        coachAge.removeAttribute('hidden');
        popupContent.appendChild(coachAge);
        const coachBotton = document.createElement("button");
        coachBotton.textContent = 'Add to Favorite'
        popupContent.appendChild(coachBotton);

        let coachName = null;
        let listCreated = false;

        coachBotton.addEventListener('click', function () {
            coachName = coachDetail.textContent;
        })
        heartBtn.addEventListener('click', function () {
            if (coachName) {
                if (!listCreated) {
                    droplist = document.createElement('div');
                    const option1 = document.createElement('h4');
                    const remove1 = document.createElement('button');
                    remove1.textContent = 'Remove';
                    remove1.addEventListener('click', function () {
                        droplist.remove();
                        coachName = false;
                        listCreated = false;
                    });
                    droplist.appendChild(remove1);
                    option1.textContent = coachName + ' reserved';
                    droplist.appendChild(option1);
                    heartBtn.parentNode.appendChild(droplist);
                    listCreated = true;
                    droplist.classList.add('dropdown');
                } else {
                    droplist.style.display = droplist.style.display === 'none' ? 'flex' : 'none';
                }
            }

        })
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
        popup.addEventListener('click', function (event) {
            if (event.target === popup) {
                popup.remove();
            }
        });
    });
});
window.addEventListener('load', function () {
    for (var i = 0; i < coachBoxes.length; i++) {
        coachBoxes[i].classList.add('slide-in');
    }
});

let selectedOffer = null;
let dropdownCreated = false;
subscribeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        selectedOffer = btn.parentNode.querySelector('h3').textContent;
    });
});

cartBtn.addEventListener('click', function () {
    if (selectedOffer) {
        if (!dropdownCreated) {
            dropdown = document.createElement('div');
            const option = document.createElement('h4');
            const remove = document.createElement('button');
            remove.textContent = 'Remove';
            remove.addEventListener('click', function () {
                dropdown.remove();
                selectedOffer = false;
                dropdownCreated = false;
            });
            dropdown.appendChild(remove);
            option.textContent = selectedOffer;
            dropdown.appendChild(option);
            cartBtn.parentNode.appendChild(dropdown);
            dropdownCreated = true;
            dropdown.classList.add('dropdown');
        } else {
            dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
        }
    }
})
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
    counter += 1;
    slidefun(counter);
}
function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
    if (myslide.length === 0 || dot.length === 0) {
        return;
    }

    let i;
    for (i = 0; i < myslide.length; i++) {
        myslide[i].style.display = "none";
    }
    for (i = 0; i < dot.length; i++) {
        dot[i].className = dot[i].className.replace(' active', '');
    }
    if (n > myslide.length) {
        counter = 1;
    }
    if (n < 1) {
        counter = myslide.length;
    }
    myslide[counter - 1].style.display = "block";
    dot[counter - 1].className += " active";
}

function validateEmail() {
    const email = emailInput.value.trim();
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= email.length || email.slice(dotIndex + 1) !== "com") {
        emailInput.classList.add("invalid");
        emailError.textContent = "Please enter a valid email address";
    } else {
        emailInput.classList.remove("invalid");
        emailError.textContent = "";
    }
}

emailInput.addEventListener("input", validateEmail);