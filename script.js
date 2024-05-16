


const searchPlayers = async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById("search-box").value;

    if (searchTerm) {
        try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchTerm}`);
            const data = await response.json();
            displayPlayers(data.player);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        alert("Please enter a search term.");
    }
};






const loadAllPlayers = async () => {
    try {
        const response = await fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=");
        const data = await response.json();
        displayPlayers(data.player);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

loadAllPlayers();







const displayPlayers = (players) => {
    const showPlayers = document.getElementById("player-container");
    showPlayers.innerHTML = ""; // Clear previous results

    if (players) {
        players.forEach(player => {
            const playerDiv = document.createElement("div");
            playerDiv.className = "player";
            playerDiv.innerHTML = `

            <div class="card" style="width: 18rem;">
            <img src="${player.strCutout}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Name: ${player.strPlayer}</h5>
            <h5 class="card-title">Nationality: ${player.strNationality}</h5>
            <h5 class="card-title">Date of Birth: ${player.dateBorn}</h5>
            <h5 class="card-title">Height: ${player.strHeight}</h5>
            <h5 class="card-title">Position: ${player.strPosition}</h5>
            <h5 class="card-title">Sports: ${player.strSport}</h5>
            <a href=${player.strTwitter}><i class="fa-brands fa-twitter"></i></a>
            <a href=${player.strInstagram}><i class="fa-brands fa-instagram"></i></a>
            <br>
            <button onclick="playerDetails(${player.idPlayer})" class="btn btn-primary" type="submit">Details</button>
            <button onclick="handleAddToCart('${player.strPlayer}')" class="btn btn-primary" type="submit">Add to Cart</button>
            </div>
            </div>

            `;
            showPlayers.appendChild(playerDiv);
        });
    } else {
        showPlayers.innerHTML = "<p>No players found. Try a different search term.</p>";
    }
};








const handleAddToCart = (name) => {
    const cartCount = document.getElementById("count").innerText;
    let convertedCOunt = parseInt(cartCount);

    if (convertedCOunt < 11) {
        convertedCOunt = convertedCOunt + 1;
        document.getElementById("count").innerText = convertedCOunt;


        const container = document.getElementById("cart-main-container");
        const div = document.createElement("div")

        div.classList.add("card-info");
        div.innerHTML = `
    <p>${name}</p>`;

        container.appendChild(div)
    }

    else{
        alert("11 player has been added!!");
    }

}







const playerDetails = async (id) => {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`);
        const data = await response.json();
        console.log(data);

        const info = data.players[0];

        const showPlayerDetails = document.getElementById("modal-container");
        showPlayerDetails.innerHTML = "";

        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `
        <div class="modal" tabindex="-1" id="playerModal">
            <div class="modal-dialog">
                <div class="modal-content">
                <img src="${info.strCutout}" class="card-img-top" alt="...">
                    <div class="modal-header">
                    <h5 class="modal-title">${info.strPlayer}</h5>
                    </div>
                    <div class="modal-body">
                        <p>${info.strDescriptionEN}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        showPlayerDetails.appendChild(modalDiv);

        const modal = new bootstrap.Modal(document.getElementById('playerModal'));
        modal.show();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

