"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Wilma Johansson
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Kontrollera formulärets obligatoriska fält
    errors = [];

    if (fullnameInput.value === "") {
        errors.push("Du måste ange ditt namn.");
    }

    if (emailInput.value === "") {
        errors.push("Du måste ange din e-postadress.");
    }

    if (phoneInput.value === "") {
        errors.push("Du måste ange ditt telefonnummer.");
    }


    // Visa eventuella felmeddelanden
    displayErrors ();

    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(function (error) {
        const li = document.createElement("li");
        li.textContent = error;
        errorList.appendChild(li);
    });
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const fullname = fullnameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const font = fontSelect.value;

    // Uppdatera studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;



    // Lägg till studentkortet i historiken
    const student = {
        fullname: fullname,
        email: email,
        phone: phone,
        font: font
    };

    history.unshift(student);
    saveHistory();


    // Spara och uppdatera historiken
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("StudentHistory", JSON.stringify(history));

}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("studentHistory");


    // Uppdatera history
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(function (student) {
        const card = document.createElement("div");
        card.classList.add("card");

        const name = document.createElement("div");
        name.classList.add("card-info");
        name.textContent = student.fullname;

        const email = document.createElement("div");
        email.classList.add("card-info");
        email.textContent = student.email;

        const phone = document.createElement("div");
        phone.classList.add("card-info");
        phone.textContent = student.phone;

        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(phone);

        historySection.appendChild(card);

    });
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();

    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    // Rensa eventuella felmeddelanden
    errors = [];
    displayErrors();
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("studentHistory");

    // Uppdatera history och visningen på sidan
    history = [];
    renderHistory ();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateForm()) {
        createStudentCard();
    }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function () {
    clearForm();
});


// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function () {
    deleteHistory();
});


// När sidan laddas:

// - läs in och visa eventuell tidigare historik
loadHistory();
renderHistory();