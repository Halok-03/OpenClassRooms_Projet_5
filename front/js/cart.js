let produitPaniers = JSON.parse(localStorage.getItem('produitPanier'))// Recupere le localstorage et le met en tableau d'objet //

 for (produitPanier of produitPaniers) {
    fetch(`http://localhost:3000/api/products/${produitPanier.id}`)
    .then(function(response){
        return response.json();
    })
    .then (function(canape){
        affichagePanier(canape)
        totalArticle(canape)
        totalPrix(canape)
        additionTotal()
    })
 }

let affichagePanier = function(canape) {
    let bonProduit = produitPaniers.find(p => p.id == canape._id)  ;

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

    supprimerProduit()
}

// Fonction pour calculer et afficher le nombre total d'article dans le panier // 

let totalArticle = function(canape) {
    let somme = 0
    for (canape of produitPaniers){
       var nbrQuantite = parseInt(canape.quantité);
       somme += nbrQuantite
    }
    document.querySelector('#totalQuantity').innerHTML = somme;
}

// Création d'un array pour stocker tout les prix totaux de chaque produit //

let prixTotal = [];

//Fonction pour calculer le prix Total de chaque produit et l'ajouter au array prixTotal // 

let totalPrix = function(canape) {
    let bonProduit = produitPaniers.find(p => p.id == canape._id)  ;
    let prix = parseInt(canape.price);
    let quantite = parseInt(bonProduit.quantité);
    let totalPrix = prix*quantite;
    prixTotal.push(totalPrix);
    
}

// Fonction qui ajoute toutes les valeurs du array totalPrix et qui l'affiche ensuite//
let additionTotal = function(){
    let prixFinal = 0;
    for (chaquePrix of prixTotal){
        prixFinal += chaquePrix
    }
    document.querySelector('#totalPrice').innerHTML = prixFinal;
}

// Fonction qui sauvegarde un canapé dans localstorage en JSON //
let saveCanape = function(canape){
    localStorage.setItem("produitPanier", JSON.stringify(canape));
}

// Fonction qui supprime l'élément du localstorage // 
let supprimerProduit = function(deleteItemId, color){ 
    let produitPaniers = JSON.parse(localStorage.getItem('produitPanier'))
    const deleteButton = document.querySelectorAll(".deleteItem");
    console.log(deleteButton)
    for (click of deleteButton){
        click.addEventListener('click', function(){
        console.log('ok sa marche')
    })}
}

