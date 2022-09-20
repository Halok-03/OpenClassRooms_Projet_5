let produitPaniers = JSON.parse(localStorage.getItem('produitPanier'))// Recupere le localstorage et le met en tableau d'objet //

// Récupère l'API et renvoi la réponse en JSON //
fetch('http://localhost:3000/api/products')
.then(function(response){
    return response.json();
})
.then (function(produits){
      // Pour chaque produit dans l'API Produits on créer la fonction carteHtml //
      for(produit of produits){
        carteHtml(produit);
        totalArticle()
      }
})

// Création d'une fonction ajoutant chaque ligne de la carte pour chaque produit de l'API//
let carteHtml = function(produit) {

// Contenu dans <article> //

pHtml = document.createElement('p');
imgHtml = document.createElement('img');
titleHtml = document.createElement('h3');
imgHtml.setAttribute("src", `${produit.imageUrl}`)
imgHtml.setAttribute("alt", `${produit.altTxt}`)
titleHtml.innerHTML = `${produit.name}`
titleHtml.classList.add('productName')
pHtml.innerHTML= `${produit.description}`
pHtml.classList.add('productDescription')

// Création de <article> et ajout de p,img et h3 //

articleHtml = document.createElement('article');
articleHtml.appendChild(imgHtml);
articleHtml.appendChild(titleHtml);
articleHtml.appendChild(pHtml);


// création du <a> , modifciation du href puis ajout du <article> //
aHtml = document.createElement('a');
aHtml.setAttribute("href", `./product.html?id=${produit._id}`)
aHtml.appendChild(articleHtml);

// Ajout d'un enfant A a l'id items // 
document.querySelector('#items').appendChild(aHtml)
}

// Fonction pour calculer et afficher le nombre total d'article dans le panier // 
let totalArticle = function() {
  let somme = 0
  for (canape of produitPaniers){
      var nbrQuantite = parseInt(canape.quantité);
      somme += nbrQuantite
  }
  let panier = document.querySelectorAll('nav a li')
  panier[1].innerHTML = "panier " + '(' + somme + ')';
}