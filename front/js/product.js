let produitPaniers = JSON.parse(localStorage.getItem('produitPanier'))// Recupere le localstorage et le met en tableau d'objet //

let url = new URL (window.location.href); // Récupération de l'URL //
let id = url.searchParams.get("id") // Récupération de l'id dans l'URL // 

// Appel à l'API en spécifiant l'id de l'URL //

fetch(`http://localhost:3000/api/products/${id}`)
.then(function(response){
    return response.json();
})
.then (function(produit){
    affichageProduit(produit);
    ajouterPanier(produit)
    totalArticle()
})
.catch((err) => {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + err);
});

let affichageProduit = function (produit){
    // Création et remplissage balise img //
    imgHtml = document.createElement('img');
    imgHtml.setAttribute('src', `${produit.imageUrl}`)
    imgHtml.setAttribute('alt', `${produit.altTxt}`)
    // Intégrer balise img à la div item__img // 
    document.querySelector('.item__img').appendChild(imgHtml)
    // Affichage bon nom //
    document.querySelector('#title').innerHTML = `${produit.name}`;
    // Affichage bon prix // 
    document.querySelector('#price').innerHTML = `${produit.price}`;
    // Affichage bonne description // 
    document.querySelector('#description').innerHTML = `${produit.description}`;
    // On affiche également le nom du produit présent dans le title d'onglet //
    document.querySelector('title').innerHTML = `${produit.name}`
    // Affichage couleur pour chaque couleur dans l'objet colors de produit //
    for (couleur of produit.colors) {
        choixCouleur(couleur);
    }
}
// Permet de créer des options avec les bonnes informations selon le nombre de couleurs //
let choixCouleur = function (couleur){
    option = document.createElement('option');
    option.setAttribute('value', `${couleur}`);
    option.innerHTML = `${couleur}`;
    document.querySelector('#colors').appendChild(option)
}

/////////////////////////// Partie pour ajouter au panier ///////////////////////////

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
   // Recherche dans le localstorage si un produit a le bon ID + la bonne couleur // 
    let rechercheBonProduit = newcanape.find(p => p.couleur == canape.couleur && p.id == canape.id);
    // Si la quantité saisie n'est pas bonne on n'enregistre pas //
    if  (canape.quantité <= 0 || canape.quantité > 100) {
        alert("La quantité n'est pas bonne, veuillez saisir une quantité comprise entre 1 et 100")
    }else if (canape.couleur == ""){
        alert("Veuillez choisir une couleur")
    // Si la quantité saisie est bonne et que le produit n'est pas deja présent on le rajoute //
    }else if ( rechercheBonProduit == undefined){
        newcanape.push(canape); 
        saveCanape(newcanape);
        alert("Vous avez bien ajouté l'article au panier !")
        location.reload()

    // Si la quantité saisie est bonne et que le produit est deja présent on ajoute la quantité saisie à la quantité deja enregistrer // 
    } else {
        let nbPresent = parseInt(rechercheBonProduit.quantité);  // On doit mettre la quantité saisie et la quantité enregistré en nombre //
        let nbNouveau = parseInt(canape.quantité);
        nbPresent += nbNouveau
        rechercheBonProduit.quantité = nbPresent.toString() // On remet ensuite en chaine de caractere // 
        // Si cette nouvelle quantité dépasse les 100 on n'enregistre pas et on met une alerte //
        if (rechercheBonProduit.quantité > 100){
            alert("Tu ne peux pas commander plus de 100 fois le même article")
        // Si cette nouvelle quantité est comprise entre 1 et 100 on l'actualise // 
        } else {
            saveCanape(newcanape);
            alert("La quantité a bien été mis à jour !")
            location.reload()
        }       
    }
}

// Fonction qui ajoute tout au clic //

let ajouterPanier = function (produit){
    document.querySelector("#addToCart").addEventListener('click', function(){
        let canape = {
            id : `${produit._id}`,
            couleur : document.getElementById("colors").value,
            quantité : document.getElementById("quantity").value,
        }
        addCanape(canape)
    })
    }

// Fonction pour calculer et afficher le nombre total d'article dans le panier // 
let totalArticle = function() {
    let somme = 0
    if (produitPaniers != null){
    for (produit of produitPaniers){
        var nbrQuantite = parseInt(produit.quantité);
        somme += nbrQuantite
    }
    let panier = document.querySelectorAll('nav a li')
    panier[1].innerHTML = "Panier " + '(' + somme + ')';
}
}
    