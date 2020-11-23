(function lazyLoad () {
    const imageToLazy = document.querySelectorAll('img[data-src]');
    const loadImage = function (image) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.addEventListener('load', function () {
            image.removeAttribute("data-src");
        })
    }


    const intersectionObserver = new IntersectionObserver(function (items, observer) {
        console.log(items)
        items.forEach(function (item) {
            if (item.isIntersecting) {
                loadImage(item.target);
                observer.unobserve(item.target);
            }
        });
    });

    imageToLazy.forEach(function (image) {
        intersectionObserver.observe(image);
    })
})()
