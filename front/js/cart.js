const produitPaniersStorage = JSON.parse(localStorage.getItem('produitPanier'));// Recupere le localstorage et le met en tableau d'objet //
let productsWithPrice = []; // Créer un tableau vide pour stocker id , quantité et prix des produits //

if (produitPaniersStorage != null && produitPaniersStorage != undefined){
    for (let produitPanier of produitPaniersStorage) {
        fetch(`http://localhost:3000/api/products/${produitPanier.id}`)
        .then(function(response){
            return response.json();
        })
        .then (function(canape){
            productsWithPrice.push({id: produitPanier.id, quantite: produitPanier.quantité, price: canape.price, couleur : produitPanier.couleur});
            affichagePanier(canape, produitPanier);
        })
        .catch((err) => {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + err);
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

    // Appel du total quantité , total prix , de la fonction pour supprimer et de la fonction pour modifier la quantité//
    totalArticle();
    additionTotal()
    supprimerProduit(supprimerHtml)
    modifQuantite(inputQuantiteHtml)
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
    panier[1].innerHTML = "Panier " + '(' + somme + ')';
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
                    let panier = document.querySelectorAll('nav a li')
                    panier[1].innerHTML = "Panier";
                    localStorage.clear();
                }

    }})
}

let modifQuantite = function(elementHTML){
    elementHTML.addEventListener('change', function(){
        // On récupère l'id et la couleur du produit qu'on modifie //
        let idElement = elementHTML.closest("article").dataset.id
        let couleurElement = elementHTML.closest("article").dataset.color
        // Si la quantité qu'on rentre n'est pas comprise entre 1 et 100 alors //
        if (elementHTML.value < 1 || elementHTML.value > 100){
            alert("Veuillez saisir une quantité comprise entre 1 et 100")  // On créer une alerte pour averir //
            // Et on assigne a elementHTML l'ancienne value //
            for (let i = 0 ; i < productsWithPrice.length ; i++){
                if (productsWithPrice[i].id == idElement && couleurElement == productsWithPrice[i].couleur){
                    elementHTML.value = productsWithPrice[i].quantite
                }
            }
            // Si la quantité saisie est bonne alors on assigne au localStorage et au tableau productsWithPrice la nouvelle quantité //
        } else {
            for (let i = 0 ; i < productsWithPrice.length ; i++){
                if (productsWithPrice[i].id == idElement && couleurElement == productsWithPrice[i].couleur && produitPaniersStorage[i].id == idElement && produitPaniersStorage[i].couleur == couleurElement){
                    productsWithPrice[i].quantite = elementHTML.value
                    produitPaniersStorage[i].quantité = elementHTML.value
                    localStorage.setItem("produitPanier", JSON.stringify(produitPaniersStorage));
                }
            }
            // On refait appel au fonction pour calculer la nouvelle quantité et le nouveau prix afin de ne pas avoir a réactualiser la page // 
            totalArticle()
            additionTotal()
        }
    })
}
    
// Envoi du formulaire et commande //

// Mettre dans une variable le formulaire //
let form = document.querySelector('.cart__order__form');

// Stocker si les inputs sont valides //
let inputIsValid = {
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    email: false,
}

// Ecoute Prénom //
form.firstName.addEventListener('change', function() {
  validFirstName(this);
});

// Ecoute Nom de famille // 
form.lastName.addEventListener('change', function () {
  validLastName(this);
});

// Ecoute Adresse //
form.address.addEventListener('change', function () {
  validAddress(this);
})

// Ecoute Ville //
form.city.addEventListener('change', function () {
  validCity(this);
})

// Ecoute Email //
form.email.addEventListener('change', function() {
    validEmail(this);
});

// Validation prénom // 
let validFirstName = function(inputFirstName){
    let firstNameRegExp =new RegExp('^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0123456789]{2,30}$')
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    let firstNameMsg = document.querySelector('#firstNameErrorMsg');
    if (testFirstName == true){
        firstNameMsg.innerHTML ='Prénom Valide';
        firstNameMsg.style.color = '#96ffa7';
        inputIsValid.firstName = true
        return true;
    }else {
        firstNameMsg.innerHTML ='Le prénom n\'est pas Valide';
        firstNameMsg.style.color = "#fbbcbc"
        inputIsValid.firstName = false
        return false;
    }
}

// Validation nom // 
let validLastName = function (inputLastName){
    let lastNameRegExp = new RegExp('^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0123456789]{2,30}$');
    let testLastName = lastNameRegExp.test(inputLastName.value);
    let lastNameMsg = document.querySelector('#lastNameErrorMsg');
    if (testLastName == true){
        lastNameMsg.innerHTML ='Nom Valide';
        lastNameMsg.style.color = '#96ffa7';
        inputIsValid.lastName = true
        return true;
    }else {
        lastNameMsg.innerHTML ='Le nom n\'est pas Valide';
        lastNameMsg.style.color = "#fbbcbc"
        inputIsValid.lastName = false
        return false;
    }
}

// Validation adresse //
let validAddress = function(inputAdress){
    let addressRegExp = new RegExp("(^[a-zA-Zéè 0-9,-]{4,50}$)");
    let testAddress = addressRegExp.test(inputAdress.value);
    let adressMsg = document.querySelector('#addressErrorMsg');
    if (testAddress == true){
        adressMsg.innerHTML ='Adresse Valide';
        adressMsg.style.color = '#96ffa7';
        inputIsValid.address = true
        return true;
    }else {
        adressMsg.innerHTML ='Adresse Non Valide';
        adressMsg.style.color = "#fbbcbc"
        inputIsValid.address = false
        return false;
    }
}

// Validation ville // 
let validCity = function(inputCity){
    let cityRegExp = new RegExp(`^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`);
    let testCity = cityRegExp.test(inputCity.value);
    let cityMsg = document.querySelector('#cityErrorMsg');
    if (testCity == true){
        cityMsg.innerHTML ='Ville Valide';
        cityMsg.style.color = '#96ffa7';
        inputIsValid.city = true
        return true;
    }else {
        cityMsg.innerHTML ='Ville Non Valide';
        cityMsg.style.color = "#fbbcbc"
        inputIsValid.city = false
        return false;
    }
}

// Validation mail // 
let validEmail = function(inputEmail){
    let mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testMail = mailRegExp.test(inputEmail.value);
    let emailMsg = document.querySelector('#emailErrorMsg');
    if (testMail == true){
        emailMsg.innerHTML ='Adresse Mail Valide';
        emailMsg.style.color = '#96ffa7';
        inputIsValid.email = true
        return true;
    }else {
        emailMsg.innerHTML ='Adresse Mail Non Valide';
        emailMsg.style.color = "#fbbcbc"
        inputIsValid.email = false
        return false;
    }
}

form.addEventListener('submit',function(e){
    e.preventDefault();

// Si le panier contient au moins un produit et que les informations saisies sont correctes alors on exécute //
if (produitPaniersStorage != null && produitPaniersStorage != undefined && inputIsValid.firstName == true && inputIsValid.lastName == true && inputIsValid.address == true && inputIsValid.city == true && inputIsValid.email == true){
    getPost()
}
// Si le panier est vide alors l'envoi ne se fait pas et on affiche un message d'erreur //
else if (produitPaniersStorage == null || produitPaniersStorage == undefined){
    alert('Votre panier est vide')
}
// Si les informations saisies ne sont pas valides alors l'envoi ne se fait pas et on affiche un message d'erreur //
else if (inputIsValid.firstName == true || inputIsValid.lastName == true || inputIsValid.address == true || inputIsValid.city == true || inputIsValid.email == true){
    alert("Vos informations saisies ne sont pas correctes")
}
})

let getPost = function(){

    // Création du tableau product-ID contenant les id de tout nos produits //
    let productID = [];

    //Pour chaque produit dans mon panier on ajoute l'id au tableau productID // 
    for(let produitPanier of produitPaniersStorage){
        productID.push(produitPanier.id)
    }

    // Création objet contact //
    let contact = {
        firstName : firstName.value,
        lastName : lastName.value, 
        address : address.value,
        city : city.value, 
        email : email.value,
    }
    
    // On créer un objet order que nous envoyons à la soumission du formulaire contenant les données du contact et les ID des produits //
    let data = {
        contact : contact,
        products : productID
    }

    // On envoie le order en methode post //
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status == 201) {
                alert("Votre commande a bien été validée");
                return res.json();
            } else if (res.status !== 201) {
                alert(
                    "une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer"
                );
            }
        })
        .then((res) => {
            // Vide le localStorage
            localStorage.clear();
            // Ouvre la page de confirmation avec le numéro de commande dans l'URL
            window.location.href = `../html/confirmation.html?order_id=${res.orderId}`;
        })
        .catch((error) => console.log("Erreur : " + error));
}
