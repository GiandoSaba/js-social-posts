// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro javascript in cui:
// - Creiamo il nostro array di oggetti che rappresentano ciascun post.Ogni post dovrà avere le informazioni necessarie per stampare la relativa card: nome autore, foto profilo, data in formato americano, testo del post, immagine(non tutti i post devono avere una immagine), numero di likes.

// Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es.Unsplash(https://unsplash.it/300/300?image=<id>)
// - Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.
// - Rendiamo il tasto “Mi Piace” cliccabile con incremento del counter dei likes.
    
// BONUS
// 1. Formattare le date in formato italiano(gg / mm / aaaa)
// 2. Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente(es.Luca Formicola > LF).
// 3. Al click su un pulsante “Mi Piace” di un post, incrementare il contatore di like al post e cambiare colore al testo del bottone.

const posts = [
    
    {
        userName: 'Phil Mangione',
        profilePic: 15,
        date: '4 mesi fa',
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 171,
        likes: 80
    },
    {
        userName: 'Sofia Perlari',
        profilePic: 10,
        date: '5 mesi fa',
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 160,
        likes: 90
    },
    {
        userName: 'Carlo Verdone',
        profilePic: 80,
        date: '7 mesi fa',
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 1020,
        likes: 200
    },
    {
        userName: 'Sabrina Ferilli',
        profilePic: 79,
        date: '8 mesi fa',
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 181,
        likes: 20
    }
]

function createPost(obj) {
    const template  = `
        <div class="post">
                <div class="post__header">
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            <img class="profile-pic" src="https://unsplash.it/300/300?image=${obj.profilePic}" alt="${obj.userName}">                    
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${obj.userName}</div>
                            <div class="post-meta__time">${obj.date}</div>
                        </div>                    
                    </div>
                </div>
                <div class="post__text">${obj.text}</div>
                <div class="post__image">
                    <img src="https://unsplash.it/600/300?image=${obj.img}" alt="">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button  js-like-button" href="#" data-postid="1">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-1" class="js-likes-counter">${obj.likes}</b> persone
                        </div>
                    </div> 
                </div>            
            </div>`;
    return template;
}

const container = document.getElementById('container');

for (let i = 0; i < posts.length; i++) {
    container.innerHTML += createPost(posts[i]);
}

const footerPosts = document.querySelectorAll('.post__footer');

for (let j = 0; j < footerPosts.length; j++) {
    const footerPost = footerPosts[j];
    const likeButton = footerPost.querySelector('.like-button');
    const likeCounterContainer = footerPost.querySelector('.js-likes-counter');
    let likes = likeCounterContainer.innerText;

    let clicked = false;
    likeButton.addEventListener('click', function() {
        if(!clicked){
            likes++;
            clicked = true;
        } else {
            likes--;
            clicked = false;
        }
        likeCounterContainer.innerText = likes;
    });
}






