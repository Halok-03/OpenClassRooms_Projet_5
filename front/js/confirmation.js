let url = new URL (window.location.href); // Récupération de l'URL //
let id = url.searchParams.get("order_id") // Récupération de l'id dans l'URL // 

// Création de la fonction pour afficher l'order_id //
let afficherId = function (orderId){
    document.querySelector('#orderId').innerHTML = "<br>" + orderId;
}

// Appel de la fonction avec l'id en parametre //
afficherId(id)