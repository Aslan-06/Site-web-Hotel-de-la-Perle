let chambres_double = ["img/chambre_double_1.jpg", "img/chambre_double_2.jpg", "img/chambre_double_3.jpg", "img/chambre_double_4.jpg", "img/chambre_double_5.jpg", "img/chambre_double_6.jpg"];
let nb_photos_ch_double = chambres_double.length;

//let chambres_triple = ["chambre_triple_1", "chambre_triple_2", "chambre_triple_3", "chambre_triple_4", "chambre_triple_5"];
//let nb_photos_ch_triple = chambres_triple.length;
//let chambres_quadruple = ["chambre_quadruple_1", "chambre_quadruple_2", "chambre_quadruple_3", "chambre_quadruple_4", "chambre_quadruple_5"];
//let nb_photos_ch_quadruple = chambres_quadruple.length;
let imageIndisponible = "img/image_indisponible.png";

let image_sequence = 0;
let chambre_type_courant = 2;

let image_blocks = [document.getElementById('photo_chambre_1'), document.getElementById('photo_chambre_2'), document.getElementById('photo_chambre_3')];
let occupation_textes = [["Occupation double", "70\u20AC"], ["Occupation triple", "80\u20AC"], ["Occupation quadruple", "100\u20AC"]];
let affichage_prix_div1 = document.querySelector('.affichage_prix').firstElementChild;
let affichage_prix_div2 = document.querySelector('.affichage_prix').lastElementChild;

changer_forme_boutons();
document.querySelectorAll(".bouton_choix_chambre").forEach(bouton => bouton.addEventListener("click", bouton_choix_chambre, false));

function bouton_choix_chambre(){
    let bouton_choisi = document.querySelector(".bouton_choisi");
    let bouton_courant_div = this.parentElement;
    if( bouton_courant_div !== bouton_choisi){
        bouton_choisi.parentElement.previousElementSibling.children[0].classList.remove("bouton_precedent_de_choisi");
        bouton_choisi.parentElement.nextElementSibling.children[0].classList.remove("bouton_suivant_de_choisi");
        bouton_choisi.classList.remove("bouton_choisi");
        bouton_choisi.parentElement.classList.remove("conteneur_bouton_choisi");
        bouton_choisi.classList.add("bouton_pas_choisi");
        bouton_choisi.parentElement.classList.add("conteneur_bouton_pas_choisi");
        bouton_choisi.children[1].classList.toggle("cachee");
        bouton_choisi.children[0].style.display = "";

        bouton_courant_div.parentElement.previousElementSibling.children[0].classList.add("bouton_precedent_de_choisi");
        bouton_courant_div.parentElement.nextElementSibling.children[0].classList.add("bouton_suivant_de_choisi");
        bouton_courant_div.classList.remove("bouton_pas_choisi");
        bouton_courant_div.parentElement.classList.remove("conteneur_bouton_pas_choisi");
        bouton_courant_div.classList.add("bouton_choisi");
        bouton_courant_div.parentElement.classList.add("conteneur_bouton_choisi");

        this.style.display = "none";
        bouton_courant_div.children[1].classList.toggle("cachee");

        chambre_type_courant = parseInt(bouton_courant_div.parentElement.classList[1].match(/\d+/)[0]);
        if(chambre_type_courant < 2)
            chambre_type_courant = 2;
        else if(chambre_type_courant > 4)
            chambre_type_courant = 4;

        if(window.innerWidth < 725){
            changer_forme_boutons();
            
            enleverPhotosSlide();
        }

        changer_photos(chambre_type_courant);

        if(chambre_type_courant == 2){
            affichage_prix_div1.style.display = "";
        }
        else{
            affichage_prix_div1.style.display = "none";
        }
        affichage_prix_div2.firstElementChild.textContent = occupation_textes[chambre_type_courant - 2][0];
        affichage_prix_div2.lastElementChild.textContent = occupation_textes[chambre_type_courant - 2][1];
    }
}

function changer_forme_boutons(){
    document.querySelectorAll(".bouton_choix_chambre").forEach(changer_forme);
}
function changer_forme(bouton, index){
    index += 2;
    
    if(index < chambre_type_courant){
        bouton.classList.remove("bouton_direction_droite");
        bouton.classList.add("bouton_direction_gauche");
    }
    else if( index > chambre_type_courant){
        bouton.classList.remove("bouton_direction_gauche");
        bouton.classList.add("bouton_direction_droite");
    }
}

function changer_photos(type){
    image_sequence = 0;
    chambre_type_courant = type;

    const largeurPage = window.innerWidth;
    switch(type){
        case 2 : image_blocks[0].src = chambres_double[0];
                if(largeurPage >= 885){
                    image_blocks[1].src = chambres_double[nb_photos_ch_double-1];
                    image_blocks[2].src = chambres_double[nb_photos_ch_double-2];
                }
                else if(largeurPage < 725){
                    ajouterPhotosSlide(chambres_double);
                }
            break;
        case 3 : image_blocks[0].src = imageIndisponible;
                if(largeurPage >= 885){
                    image_blocks[1].src = imageIndisponible;
                    image_blocks[2].src = imageIndisponible;
                }
            break;
        case 4 : image_blocks[0].src = imageIndisponible;
                if(largeurPage >= 885){
                    image_blocks[1].src = imageIndisponible;
                    image_blocks[2].src = imageIndisponible;
                }
            break;
    }
}

const conteneurPhotos = document.querySelector(".galerie_photo_principale");
let slider = null;
let posXSlider;
let limDroiteTranslate;
function ajouterPhotosSlide(photos){
    const nbPhotos = photos.length;
    for(let ind = 1; ind < nbPhotos; ind++){
        let conteneurImage = document.createElement("div");
        conteneurImage.setAttribute("class", "photo_principale");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        img.setAttribute("src", photos[ind]);
        img.setAttribute("class", "photo_chambre");
        figure.append(img);
        conteneurImage.append(figure)
        conteneurPhotos.append(conteneurImage);
    }
    
    const largeurConteneurSlider = parseInt(getComputedStyle(document.querySelector(".presentation_principale")).width.match(/\d+/)[0]);
    const largeurParfaiteImg = largeurConteneurSlider*80/100;
    const distanceEntreImages = (largeurConteneurSlider-largeurParfaiteImg) / 2;
    conteneurPhotos.style.width = (largeurParfaiteImg*nbPhotos + nbPhotos*(distanceEntreImages-10))*(80/largeurParfaiteImg) + "%";
    conteneurPhotos.style.paddingLeft = distanceEntreImages * 100/largeurConteneurSlider + "%";
    
    document.querySelectorAll(".galerie_photo_principale .photo_principale").forEach(divPhoto => {
        divPhoto.style.marginRight = (distanceEntreImages-10) * 100/(largeurParfaiteImg*nbPhotos + nbPhotos*(distanceEntreImages-10)) + "%";

        divPhoto.addEventListener("touchmove", bouger_slide);
        divPhoto.addEventListener("touchend", doit_pas_bouger);
    });

    slider = conteneurPhotos;
    posXSlider = 0;
    let limDroiteTranslate;

    let conteneurPoints = document.createElement("div");
    conteneurPoints.setAttribute("class", "conteneur_slider_points");
    for(let compteur = 1; compteur <= nbPhotos; compteur++){
        let point = document.createElement("div");
        point.setAttribute("class", "slider_point");
        if(compteur === 1)
            point.classList.add("active");
        conteneurPoints.append(point);
    }
    slider.parentNode.insertBefore(conteneurPoints, document.querySelector(".affichage_prix"));
}
let previousTouch = null;
let touch;
let largeurUneSlide;
let numSlidePrecedent = 0;
let numSlide;
function bouger_slide(event){
    touch = event.touches[0];
    
    if(previousTouch !== undefined && previousTouch !== null){
        event.movementX = touch.pageX - previousTouch.pageX;
    }
    previousTouch = touch;
    if(event.movementX !== undefined && slider != null){
        posXSlider += event.movementX;
        if(posXSlider < 0 && posXSlider > limDroiteTranslate){
            slider.style.transform = `translateX(${posXSlider}px)`;
            updateSlideValues();
            if(numSlide !== numSlidePrecedent){
                document.querySelectorAll(".slider_point")[numSlide].classList.add("active");
                document.querySelectorAll(".slider_point")[numSlidePrecedent].classList.remove("active");
                numSlidePrecedent = numSlide;
            }
        }
        else{
            if(posXSlider > 0)
                posXSlider = 0;
            else if(posXSlider < limDroiteTranslate)
                posXSlider = limDroiteTranslate;
        }
    }
}
function enleverPhotosSlide(){
    const photos = document.querySelectorAll(".galerie_photo_principale .photo_principale");
    for(let ind = 1; ind < photos.length; ind++)
        photos[ind].remove();
    conteneurPhotos.removeAttribute("style");
    document.querySelector(".galerie_photo_principale .photo_principale").removeAttribute("style");
    if( document.querySelector(".conteneur_slider_points"))
        document.querySelector(".conteneur_slider_points").remove();
    slider = null;
}
function updateSlideValues(){
    limDroiteTranslate = -(parseInt(getComputedStyle(conteneurPhotos).width.match(/\d+/)[0]) - parseInt(getComputedStyle(conteneurPhotos).paddingLeft.match(/\d+/)[0]) - document.querySelector(".photo_principale").offsetWidth + 10);
    largeurUneSlide = document.querySelector(".photo_principale").offsetWidth + parseInt(getComputedStyle(document.querySelector(".photo_principale")).marginRight.match(/\d+/)[0]) ;
    numSlide = Math.floor((-posXSlider) / largeurUneSlide + 0.5);
}

document.querySelector(".fleche_gauche").addEventListener("click", image_precedente, false);
function image_precedente(){
    image_sequence--;
    if(image_sequence < 0){
        /*
        switch(images_chambre_type){
            case 2 : image_sequence = nb_photos_ch_double - 1;
                break;
            case 3 : image_sequence = nb_photos_ch_triple - 1;
                break;
            case 4 : image_sequence = nb_photos_ch_quadruple - 1;
                break;
        }
        image_sequence--;
        */
        image_sequence = nb_photos_ch_double - 1;
    }

    if(chambre_type_courant === 2){
        for(let ind = 0; ind < 3; ind++)
            image_blocks[ind].src = chambres_double[(image_sequence - ind) >= 0 ? image_sequence - ind : nb_photos_ch_double + (image_sequence - ind)]; // + à la fin car le (image_sequence - ind) est négative, donc en effet on a -(image_sequence - ind)
    }
}

document.querySelector(".fleche_droite").addEventListener("click", image_suivante, false);
function image_suivante(){
    image_sequence++;
    //if(image_sequence >= chambre_type_courant === 2 ? nb_photos_ch_double : chambre_type_courant === 3 ? nb_photos_ch_triple : nb_photos_ch_quadruple){
    if(image_sequence >= chambres_double.length){
        image_sequence = 0;
    }

    if(chambre_type_courant === 2){
        for(let ind = 0; ind < 3; ind++)
            image_blocks[ind].src = chambres_double[(image_sequence - ind) >= 0 ? image_sequence - ind : nb_photos_ch_double + (image_sequence - ind)];
    }
}

let largeur_carte_img = 700;
let hauteur_carte_img = 881;
let largeur_conteneur_carte = 244;
let hauteur_conteneur_carte = 354;
let carte = document.getElementById('carte_localisation');
let carte_posX = -260;
let carte_posY = -215;
let bouger = false;

['mousemove','touchmove'].forEach( evt => 
    document.addEventListener(evt, bouger_carte, false)
);
//document.addEventListener("mousemove", bouger_carte);

function bouger_carte(event){
    if(bouger){
        if(event.type === "touchmove"){
            touch = event.touches[0];
            
            if(previousTouch !== undefined && previousTouch !== null){
                event.movementX = touch.pageX - previousTouch.pageX;
                event.movementY = touch.pageY - previousTouch.pageY;
            }
            previousTouch = touch;
        }
        
        if(event.movementX !== undefined && event.movementY !== undefined){
            carte_posX += event.movementX;
            if(carte_posX > 0)
                carte_posX = 0;
            if(carte_posX < -(largeur_carte_img - largeur_conteneur_carte))
                carte_posX = -(largeur_carte_img - largeur_conteneur_carte);
            carte.style.left = carte_posX + "px";
    
            carte_posY += event.movementY;
            if(carte_posY > 0)
                carte_posY = 0;
            if(carte_posY < -(hauteur_carte_img - hauteur_conteneur_carte))
                carte_posY = -(hauteur_carte_img - hauteur_conteneur_carte);
            carte.style.top = carte_posY + "px";
        }
    }
}

['mousedown','touchstart'].forEach( evt => 
    carte.addEventListener(evt, doit_bouger)
);
//carte.addEventListener("mousedown", doit_bouger);
function doit_bouger(){
    bouger = true;
}

['mouseup','touchend'].forEach( evt => 
    document.addEventListener(evt, doit_pas_bouger)
);
//document.addEventListener("mouseup", doit_pas_bouger);
function doit_pas_bouger(event){
    if(bouger)
        bouger = false;
    if(event.type === "touchend"){
        previousTouch = null;
        posXSlider = Math.round(posXSlider / largeurUneSlide) * largeurUneSlide;
        slider.style.transform = `translateX(${posXSlider}px)`;
    }
}


const hotel_options = document.querySelectorAll(".option");
document.addEventListener("scroll", anim_on_scroll);
function anim_on_scroll(){
    hotel_options.forEach(element => {
        if(element.getBoundingClientRect().top < window.innerHeight)
            if(!element.classList.contains("reprendre_position"))
                element.classList.add("reprendre_position");
    });
}
anim_on_scroll();

let conteneurCarte = document.getElementById('conteneur_carte');
let bordureCarte = document.getElementById('bordure_carte');
let hauteur_bordure_carte;
let carteEstGrande = true;
let largeurInf885 = false;
let slideExiste = false;
effectuerChangements();
window.addEventListener("resize", effectuerChangements);
function effectuerChangements(){
    const largeurPage = window.innerWidth;
    if(carteEstGrande && largeurPage < 1195){
        hauteur_conteneur_carte = 225;
        hauteur_bordure_carte = 229;
        conteneurCarte.style.height = hauteur_conteneur_carte + "px";
        bordureCarte.style.height = hauteur_bordure_carte + "px";
        
        carte_posY -= 354/2 - 225/2;
        carte.style.top = carte_posY + "px";
        carteEstGrande = false;
    }
    else if(!carteEstGrande && largeurPage >= 1195){
        hauteur_conteneur_carte = 354;
        hauteur_bordure_carte = 358;
        conteneurCarte.style.height = hauteur_conteneur_carte + "px";
        bordureCarte.style.height = hauteur_bordure_carte + "px";
        
        carte_posY -= 225/2 - 354/2;
        if(carte_posY > 0)
            carte_posY = 0;
        if(carte_posY < -(hauteur_carte_img - hauteur_conteneur_carte))
            carte_posY = -(hauteur_carte_img - hauteur_conteneur_carte);
        carte.style.top = carte_posY + "px";
        carteEstGrande = true;
    }
    
    if(largeurPage < 885 && !largeurInf885){
        document.getElementById('img_pour_fleche_droite').setAttribute("src", "img/fleche_gauche.png");
        
        largeurInf885 = true;
    }
    else if(largeurPage >= 885 && largeurInf885){
        document.getElementById('img_pour_fleche_droite').setAttribute("src", "img/fleche_droite.png");
        
        switch(chambre_type_courant){
        case 2 : image_blocks[1].src = chambres_double[nb_photos_ch_double-1];
                image_blocks[2].src = chambres_double[nb_photos_ch_double-2];
            break;
        case 3 : image_blocks[1].src = imageIndisponible;
                image_blocks[2].src = imageIndisponible;
            break;
        case 4 : image_blocks[1].src = imageIndisponible;
                image_blocks[2].src = imageIndisponible;
            break;
        }
        
        largeurInf885 = false;
    }
    
    if(largeurPage >= 725 && slideExiste){
        enleverPhotosSlide();

        slideExiste = false;
    }else if(largeurPage < 725){
        updateSlideValues();

        if(!slideExiste){
            changer_forme_boutons();
            
            switch(chambre_type_courant){
                case 2: ajouterPhotosSlide(chambres_double);
                    break;
                /*
                case 3:
                    break;
                case 4: 
                    break;
                */
            }
            
            slideExiste = true;
        }
    }
}
