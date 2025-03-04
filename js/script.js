// Metode 4 fra foodrepo (HTML template & content.cloneNode)

// Lytter efter en "submit"-begivenhed på formularen med id="frmMusic"
document.querySelector('#frmMusic').addEventListener('submit', (e) => {
    e.preventDefault(); // Forhindrer standardformularindsendelsen, så siden ikke genindlæses

    try {
        // Der oprettes et DocumentFragment for at optimere DOM-manipulation
        const fragment = document.createDocumentFragment();

        // Henter værdier fra inputfelterne i formularen
        const author = e.target.txtAuthor.value.trim();    //Tilføj evt. trim, så tekstfeltet ikke kan være tomt
        const title = e.target.txtTitle.value.trim();
        const year = parseInt(e.target.txtYear.value); // Der bruges parseInt, da år gør brug af tal

        if (!author || !title || isNaN(year)) {
            alert("Alle felter skal udfyldes korrekt");
            return;
        }

        // Finder og kloner skabelonen til en ny tabelrække
        const row = document.querySelector('#table-template').content.cloneNode(true);

        // Indsætter brugerens input i de relevante tabelceller
        row.querySelector('.Author').innerText = author;
        row.querySelector('.Title').innerText = title;
        row.querySelector('.Year').innerText = year;

        // Close knap fra contact.js - Food repo
        // Tilføjer en event listener til sletteknappen, så rækken kan fjernes ved klik
        row.querySelector('.Delete').addEventListener('click', function() {
            removeCD(author, title, year);  //Brug evt. closest('klasse eller tag').remove
        })

        // Tilføjer den oprettede række til DocumentFragmentet
        fragment.append(row);

        // Tilføjer den færdige række til tabellen i DOM'en
        document.querySelector('#table').append(fragment);

        // Gemmer data i localStorage
        saveCD({ author, title, year });
    } 
    
    catch (error) {
        console.log(error);  // Hvis der opstår en fejl, logges den i konsollen
    }
});

// Funktion til at gemme CD i localStorage
function saveCD(cd) {
    let cds = JSON.parse(localStorage.getItem("musicCDs")) || [];
    cds.push(cd);
    localStorage.setItem("musicCDs", JSON.stringify(cds));
}

// Funktion til at hente CD'er fra localStorage og vise dem
function loadCDs() {
    const cds = JSON.parse(localStorage.getItem("musicCDs")) || [];
    const table = document.querySelector('#table');
    cds.forEach(cd => {
        const fragment = document.createDocumentFragment();
        const row = document.querySelector('#table-template').content.cloneNode(true);
        row.querySelector('.Author').innerText = cd.author;
        row.querySelector('.Title').innerText = cd.title;
        row.querySelector('.Year').innerText = cd.year;
        row.querySelector('.Delete').addEventListener('click', function() {
            removeCD(cd.author, cd.title, cd.year);
        });
        fragment.append(row);
        table.append(fragment);
    });
}

// Funktion til at fjerne en CD fra localStorage og DOM
function removeCD(author, title, year) {
    let cds = JSON.parse(localStorage.getItem("musicCDs")) || [];
    cds = cds.filter(cd => !(cd.author === author && cd.title === title && cd.year === year));
    localStorage.setItem("musicCDs", JSON.stringify(cds));
    document.location.reload();
}

// Indlæser gemte CD'er ved siden start
document.addEventListener("DOMContentLoaded", loadCDs);
