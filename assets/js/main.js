const bgi = () => {
    document.querySelectorAll(`*[data-bgi]`).forEach(
        block => {
           block.style.backgroundImage = `url(${block.dataset.bgi})`;
           block.style.backgroundPosition = "center";
           block.style.backgroundRepeat = `no-repeat`;
           block.style.backgroundSize = "cover";
        }
    )
}
const lazyLoadImage = () => {
    document.querySelectorAll('img').forEach(image => {
        if(!image.dataset.src) return;
        
        image.setAttribute('src', image.dataset.src);
        image.removeAttribute('data-src');
    })
}
let burgerButton = () => {
    document.querySelector('.burger').onclick = () => {
        document.querySelector('.burger').classList.toggle('burger_active');
        document.querySelector('.menu').classList.toggle('menu_active');
        document.body.classList.toggle('locked');
    }
}

let interSectObserver = (targets, options, callbacks) => {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                callbacks.forEach(callback => callback());
            }
        });
    }, options);
    document.querySelectorAll(targets).forEach(target => {
        observer.observe(target);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    burgerButton();
    interSectObserver(["*[data-bgi]", "img"], {
        root: null,
        rootMargin: "0px",
        threshold: 0
    }, [
        bgi,
        lazyLoadImage
    ])
})
