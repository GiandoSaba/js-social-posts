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
        date: 
        {
            year: 2021,
            month: 12,
            day: 10
        },
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 171,
        likes: 80
    },
    {
        userName: 'Sofia Perlari',
        profilePic: 10,
        date: 
        {
            year: 2021,
            month: 7,
            day: 13
        },
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 160,
        likes: 90
    },
    {
        userName: 'Carlo Verdone',
        profilePic: 80,
        date:
        {
            year: 2021,
            month: 5,
            day: 11
        },
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 1020,
        likes: 200
    },
    {
        userName: 'Giando Sabato',
        profilePic: 180,
        date:
        {
            year: 2020,
            month: 12,
            day: 25
        },
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        likes: 10000
    },
    {
        userName: 'Torquato Tasso',
        profilePic: '',
        date:
        {
            year: 2021,
            month: 01,
            day: 01
        },
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 200,
        likes: 2
    },
    {
        userName: 'Sabrina Ferilli',
        profilePic: 20,
        date:
        {
            year: 2019,
            month: 2,
            day: 3
        },
        text: 'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
        img: 181,
        likes: 20
    }
]

function getInitials(userName) {
    const fullName = userName.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

function getMonthPost(dateObj) {
    const today = new Date();
    const datePost = new Date(dateObj.year, dateObj.month, dateObj.day);
    
    if (
        today.getDate() == datePost.getDate()
        ) {
        return 'Oggi';
    } else {
        const yearToMonth = (today.getFullYear() - datePost.getFullYear())*12;
        const month = today.getMonth() - datePost.getMonth(); 
        const months = yearToMonth + month;
        
        if (months > 12) {
            return datePost.toLocaleDateString('it-IT');
        } else {
            return months + ' mesi fa';
        }
    }

}


function createPost(obj) {
    
    let profilePic = `<img class="profile-pic" src="https://unsplash.it/300/300?image=${obj.profilePic}" alt="${obj.userName}">`
    if(obj.profilePic == ''){
        const initials = getInitials(obj.userName);
        profilePic = `<div class="profile-pic-default"><span>${initials}</span></div>`
    }

    const monthPost = getMonthPost(obj.date);
    
    const template  = `
        <div class="post">
                <div class="post__header">
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            ${profilePic}                  
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${obj.userName}</div>
                            <div class="post-meta__time">${monthPost}</div>
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
    likeButton.addEventListener('click', function(event) {
        event.preventDefault();
        if(!clicked){
            this.classList.add('like-button--liked');
            likes++;
            clicked = true;
        } else {
            this.classList.remove('like-button--liked');
            likes--;
            clicked = false;
        }
        likeCounterContainer.innerText = likes;
    });
}






