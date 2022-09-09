let produitPaniers = JSON.parse(localStorage.getItem('produitPanier'))// Recupere le localstorage et le met en tableau d'objet //

for (let i = 0 ; i < produitPaniers.length ; i++) {
    fetch(`http://localhost:3000/api/products/${produitPaniers[i].id}`)
    .then(function(response){
        return response.json();
    })
    .then (function(canape){
        

    })
    .catch(erreur => console.log('erreur', erreur));
}



// Fonction ajoutant le visuel de chaque canapé contenu dans le panier // 

function affichagePanier(canape) {
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
    couleurHtml.innerHTML = `${produitPaniers[j].couleur}`;
    prixHtml = document.createElement('p');
    prixHtml.innerHTML = `${canape.price} €`;
    divDescriptionHtml = document.createElement('div'); // Création de la div contenant nom,couleur et quantité //
    divDescriptionHtml.classList.add('cart__item__content__description');
    divDescriptionHtml.appendChild(nomHtml);
    divDescriptionHtml.appendChild(couleurHtml);
    divDescriptionHtml.appendChild(prixHtml);

    // Création de la partie affichant la quantité // 

    quantiteHtml = document.createElement('p');
    quantiteHtml.innerHTML = `Qté : ${produitPaniers[j].quantité}`;
    inputQuantiteHtml = document.createElement('input');
    inputQuantiteHtml.setAttribute("type", "number");
    inputQuantiteHtml.setAttribute("name", "itemQuantity");
    inputQuantiteHtml.setAttribute("min", "1");
    inputQuantiteHtml.setAttribute("max", "100");
    inputQuantiteHtml.setAttribute("value", `${produitPaniers[j].quantite}`);
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
    articleHtml.setAttribute('data-id', `${produitPaniers [j].id}`);
    articleHtml.setAttribute('data-color', `${produitPaniers[j].couleur}`)
    articleHtml.appendChild(divImgHtml);
    articleHtml.appendChild(divContenuHtml);

    // Mettre l'article dans l'id cart__items // 

    document.querySelector('#cart__items').appendChild(articleHtml);
    
}



// Fonction pour calculer et afficher le nombre total d'article dans le panier // 

let totalArticle = function(canape) {
    let somme = 0
    for (canape of canapesJSON){
       var nbrQuantite = parseInt(canape.quantité);
       somme += nbrQuantite
    }
    document.querySelector('#totalQuantity').innerHTML = somme;
}

//Fonction pour calculer et afficher le prix total des articles // 


let totalPrix = function(canape) {
    let sommePrix = 0
    for (canape of canapesJSON){
       var prix = parseInt(canape.prix);
       var quantite = parseInt(canape.quantité);
       var totalPrix = prix*quantite;
       sommePrix += totalPrix
    }
    document.querySelector('#totalPrice').innerHTML = sommePrix;
}

