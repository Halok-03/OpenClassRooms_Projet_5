const produitPaniersStorage = JSON.parse(localStorage.getItem('produitPanier'));// Recupere le localstorage et le met en tableau d'objet //
let productsWithPrice = []; // Créer un tableau vide pour stocker id , quantité et prix des produits dans le panier //

if (produitPaniersStorage != null && produitPaniersStorage != undefined){
    for (let produitPanier of produitPaniersStorage) {
        fetch(`http://localhost:3000/api/products/${produitPanier.id}`)
        .then(function(response){
            return response.json();
        })
        .then (function(canape){
            productsWithPrice.push({id: produitPanier.id, quantite: produitPanier.quantité, price: canape.price});
            affichagePanier(canape, produitPanier);
            totalArticle();
            additionTotal()
        })
        .catch((err) => {
            document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
            console.log("erreur 404, sur ressource api:" + err);
        });
    }
} else {
    document.querySelector("h1").innerHTML = "Votre panier est vide"
    document.querySelector("#totalQuantity").innerHTML = "0"
    document.querySelector("#totalPrice").innerHTML = "0"
}

let affichagePanier = function(canape, localStore) {
    let bonProduit = localStore  ;

        // Création de l'image //

    imgHtml = document.createElement('img'); 
    imgHtml.setAttribute("src", `${canape.imageUrl}`)
    imgHtml.setAttribute("alt", `${canape.altTxt}`)
    divImgHtml = document.createElement('div'); // Création de la div qui contiendra l'image //
    divImgHtml.classList.add('cart__item__img');
    divImgHtml.appendChild(imgHtml);

     // Création de la partie décrivant l'article //

    nomHtml = document.createElement('h2');
    nomHtml.innerHTML = `${canape.name}`;
    couleurHtml = document.createElement('p');
    couleurHtml.innerHTML = `${bonProduit.couleur}`;
    prixHtml = document.createElement('p');
    prixHtml.innerHTML = `${canape.price} €`;
    divDescriptionHtml = document.createElement('div'); // Création de la div contenant nom,couleur et quantité //
    divDescriptionHtml.classList.add('cart__item__content__description');
    divDescriptionHtml.appendChild(nomHtml);
    divDescriptionHtml.appendChild(couleurHtml);
    divDescriptionHtml.appendChild(prixHtml);

    // Création de la partie affichant la quantité // 

    quantiteHtml = document.createElement('p');
    quantiteHtml.innerHTML = `Qté : `;
    inputQuantiteHtml = document.createElement('input');
    inputQuantiteHtml.setAttribute("type", "number");
    inputQuantiteHtml.setAttribute("name", "itemQuantity");
    inputQuantiteHtml.setAttribute("min", "1");
    inputQuantiteHtml.setAttribute("max", "100");
    inputQuantiteHtml.setAttribute("value", `${bonProduit.quantité}`);
    inputQuantiteHtml.classList.add('itemQuantity');
    divQuantiteHtml = document.createElement('div'); // Création de la div contenant la quantité et l'input //
    divQuantiteHtml.classList.add('cart__item__content__settings__quantity');
    divQuantiteHtml.appendChild(quantiteHtml);
    divQuantiteHtml.appendChild(inputQuantiteHtml);

    // Création de la partie pour supprimer // 

    supprimerHtml = document.createElement('p');
    supprimerHtml.classList.add('deleteItem');
    supprimerHtml.innerHTML = "Supprimer";
    divSupprimerHtml = document.createElement('div'); // Création de la div contenant le supprimer //
    divSupprimerHtml.classList.add('cart__item__content__settings__delete');
    divSupprimerHtml.appendChild(supprimerHtml);

    // Regroupement quantité et supprimer dans la même div // 

    divQuantiteSupprHtml = document.createElement('div');
    divQuantiteSupprHtml.classList.add('cart__item__content__settings');
    divQuantiteSupprHtml.appendChild(divQuantiteHtml);
    divQuantiteSupprHtml.appendChild(divSupprimerHtml);


    // Regroupement de tout sauf de l'image dans une div //

    divContenuHtml = document.createElement('div');
    divContenuHtml.classList.add('cart__item__content');
    divContenuHtml.appendChild(divDescriptionHtml);
    divContenuHtml.appendChild(divQuantiteSupprHtml);

    // Création d'un article regroupant tout //

    articleHtml = document.createElement('article');
    articleHtml.classList.add('cart__item');
    articleHtml.setAttribute('data-id', `${bonProduit.id}`);
    articleHtml.setAttribute('data-color', `${bonProduit.couleur}`)
    articleHtml.appendChild(divImgHtml);
    articleHtml.appendChild(divContenuHtml);

    // Mettre l'article dans l'id cart__items // 

    document.querySelector('#cart__items').appendChild(articleHtml);

    supprimerProduit(supprimerHtml)
    }


// Fonction pour calculer et afficher le nombre total d'article dans le panier // 

let totalArticle = function() {
    let somme = 0
    for (let canape of produitPaniersStorage){
       var nbrQuantite = parseInt(canape.quantité);
       somme += nbrQuantite
    }
    document.querySelector('#totalQuantity').innerHTML = somme;
    let panier = document.querySelectorAll('nav a li')
    panier[1].innerHTML = "panier " + '(' + somme + ')';
}


// Fonction qui ajoute toutes les prix du array productWithPrice et qui l'affiche ensuite//
let additionTotal = function(){
    let prixFinal = 0;
    for (let productWithPrice of productsWithPrice){
        prixFinal += productWithPrice.price * productWithPrice.quantite;
    }
    document.querySelector('#totalPrice').innerHTML = prixFinal;
}

// Fonction qui sauvegarde un canapé dans localstorage en JSON //
let saveCanape = function(canape){
    localStorage.setItem("produitPanier", JSON.stringify(canape));
}

// Fonction qui supprime l'élément du localstorage // 
let supprimerProduit = function(elementHtml){ 
        elementHtml.addEventListener('click', function(){
            if (window.confirm("Voulez-vous supprimez ?")){
                let article = elementHtml.closest("article");
                let id = article.dataset.id
                let color = article.dataset.color
                //update local storage
                for (let i =0 ; i <produitPaniersStorage.length; i++){
                    if (produitPaniersStorage[i].couleur == color && produitPaniersStorage[i].id == id){
                        produitPaniersStorage.splice(i,1);
                        productsWithPrice.splice(i,1);
                        saveCanape(produitPaniersStorage);
                        break;
                    }
                }
                // Supprime l'article du dom et recalcule la quantité et le prix // 
                article.remove(); 
                totalArticle()
                additionTotal()
                // Si l'élément que nous venons de supprimer était le dernier on affiche que le panier est vide et on supprime intégralement le localStorage afin que quand on actualise la page il s'affiche encore//
                if (produitPaniersStorage.length == 0){
                    document.querySelector("h1").innerHTML = "Votre panier est vide"
                    localStorage.clear();
                }

    }})
}

