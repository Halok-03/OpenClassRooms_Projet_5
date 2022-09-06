let url = new URL (window.location.href); // Récupération de l'URL //
let id = url.searchParams.get("id") // Récupération de l'id dans l'URL // 

// Appel à l'API en spécifiant l'id de l'URL //

fetch(`http://localhost:3000/api/products/${id}`)
.then(function(response){
    return response.json();
})
.then (function(produit){
    affichageProduit(produit);
})

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