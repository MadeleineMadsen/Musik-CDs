// Metode 4 fra foodrepo (HTML template & content.cloneNode)

// Lytter efter en "submit"-begivenhed på formularen med id="frmMusic"
document.querySelector('#frmMusic').addEventListener('submit', (e) => {
    e.preventDefault(); // Forhindrer standardformularindsendelsen, så siden ikke genindlæses

    try {
        // Der oprettes et DocumentFragment for at optimere DOM-manipulation
        const fragment = document.createDocumentFragment();

        // Henter værdier fra inputfelterne i formularen
        const author = e.target.txtAuthor.value;
        const title = e.target.txtTitle.value;
        const year = parseInt(e.target.txtYear.value); // Der bruges parseInt, da år gør brug af tal

        // Finder og kloner skabelonen til en ny tabelrække
        const row = document.querySelector('#table-template').content.cloneNode(true);

        // Indsætter brugerens input i de relevante tabelceller
        row.querySelector('.Author').innerText = author;
        row.querySelector('.Title').innerText = title;
        row.querySelector('.Year').innerText = year;

        // Close knap fra contact.js - Food repo
        // Tilføjer en event listener til sletteknappen, så rækken kan fjernes ved klik
        row.querySelector('.Delete').addEventListener('click', function() {
            this.parentElement.parentElement.remove();
        })

        // Tilføjer den oprettede række til DocumentFragmentet
        fragment.append(row);

        // Tilføjer den færdige række til tabellen i DOM'en
        document.querySelector('#table').append(fragment);
    } 
    
    catch (error) {
        console.log(error);  // Hvis der opstår en fejl, logges den i konsollen
    }
});