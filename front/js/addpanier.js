// Fonction qui sauvegarde un canapé dans localstorage en JSON //
let saveCanape = function(canape){
    localStorage.setItem("produitPanier", JSON.stringify(canape));
}


// Fonction qui récupère un canapé en chaine de caractère //
let getCanape = function(){
    let canape = localStorage.getItem("produitPanier");
    if (canape == null) {
        return [];
    } else {
        return JSON.parse(canape)
    }
}

// Fonction qui ajoute un canapé dans localStorage en JSON //
let addCanape = function(canape){
    let newcanape = getCanape();
    newcanape.push(canape); 
    saveCanape(newcanape);
}

// Variable qui indique les infos qu'on rentre //

// Fonction qui ajoute tout au clic //

let ajouterPanier = function (produit){
    document.querySelector("#addToCart").addEventListener('click', function(){
        let canape = {
            id : `${produit._id}`,
            couleur : document.getElementById("colors").value,
            quantité : document.getElementById("quantity").value
        }
        addCanape(canape)
    })
    }
