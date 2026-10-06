/* =========================================================
   SENTINELAS DO TEMPO
   GALERIA — CINEMATIC JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const loader = document.getElementById("museumLoader");

    const filters = document.querySelectorAll(".gallery-filter");

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const galleryButtons = Array.from(
        document.querySelectorAll(".gallery-image")
    );

    const lightbox = document.getElementById("imageLightbox");

    const lightboxImage = document.getElementById("lightboxImage");

    const lightboxTitle = document.getElementById("lightboxTitle");

    const lightboxCategory = document.getElementById("lightboxCategory");

    const closeLightboxButton =
        document.getElementById("closeLightbox");

    const previousButton =
        document.getElementById("previousImage");

    const nextButton =
        document.getElementById("nextImage");


    /* =====================================================
       LOADER
    ====================================================== */

    function hideLoader() {

        if (!loader) {
            return;
        }

        setTimeout(() => {

            loader.classList.add("loaded");

            document.body.classList.add("gallery-ready");

        }, 900);

    }


    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            {
                once: true
            }
        );

    }


    /* =====================================================
       FILTROS
    ====================================================== */

    let currentFilter = "all";


    function applyFilter(filter) {

        currentFilter = filter;

        galleryItems.forEach((item, index) => {

            const category =
                item.dataset.category;

            const shouldShow =
                filter === "all" ||
                category === filter;


            if (shouldShow) {

                item.style.display = "";

                item.classList.remove(
                    "gallery-hidden"
                );

                /*
                 * Pequeno atraso para permitir
                 * a animação de entrada.
                 */

                setTimeout(() => {

                    item.classList.add(
                        "gallery-visible"
                    );

                }, index * 35);

            } else {

                item.classList.remove(
                    "gallery-visible"
                );

                item.classList.add(
                    "gallery-hidden"
                );

                setTimeout(() => {

                    if (
                        item.classList.contains(
                            "gallery-hidden"
                        )
                    ) {

                        item.style.display = "none";

                    }

                }, 350);

            }

        });

    }


    filters.forEach(filterButton => {

        filterButton.addEventListener(
            "click",
            () => {

                const filter =
                    filterButton.dataset.filter;

                filters.forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });

                filterButton.classList.add(
                    "active"
                );

                applyFilter(filter);

            }
        );

    });


    /* =====================================================
       LISTA DE IMAGENS VISÍVEIS
    ====================================================== */

    let currentImageIndex = 0;


    function getVisibleImages() {

        return galleryButtons.filter(button => {

            const item =
                button.closest(".gallery-item");

            if (!item) {
                return false;
            }

            return (
                item.style.display !== "none"
            );

        });

    }


    /* =====================================================
       ABRIR LIGHTBOX
    ====================================================== */

    function openLightbox(button) {

        if (!lightbox || !lightboxImage) {
            return;
        }


        const visibleImages =
            getVisibleImages();

        currentImageIndex =
            visibleImages.indexOf(button);


        if (currentImageIndex < 0) {

            currentImageIndex = 0;

        }


        showImage();


        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );


        /*
         * Evita que a página continue
         * rolando enquanto a imagem está aberta.
         */

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       MOSTRAR IMAGEM
    ====================================================== */

    function showImage() {

        const visibleImages =
            getVisibleImages();


        if (!visibleImages.length) {
            return;
        }


        if (
            currentImageIndex < 0
        ) {

            currentImageIndex =
                visibleImages.length - 1;

        }


        if (
            currentImageIndex >=
            visibleImages.length
        ) {

            currentImageIndex = 0;

        }


        const button =
            visibleImages[currentImageIndex];


        const imageSource =
            button.dataset.image;

        const title =
            button.dataset.title ||
            "Registro";


        /*
         * Descobre automaticamente
         * a categoria da fotografia.
         */

        const item =
            button.closest(".gallery-item");


        let category =
            "GALERIA";


        if (item) {

            const itemCategory =
                item.dataset.category;


            if (itemCategory === "campo") {

                category =
                    "AULA DE CAMPO";

            }


            if (itemCategory === "paisagem") {

                category =
                    "PAISAGEM";

            }

        }


        /*
         * Pequeno efeito antes da troca.
         */

        lightboxImage.style.opacity = "0";


        setTimeout(() => {

            lightboxImage.src =
                imageSource;

            lightboxImage.alt =
                title;

            lightboxTitle.textContent =
                title;

            lightboxCategory.textContent =
                category;


            lightboxImage.onload = () => {

                lightboxImage.style.opacity =
                    "1";

            };

        }, 120);

    }


    /* =====================================================
       EVENTOS DAS IMAGENS
    ====================================================== */

    galleryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openLightbox(button);

            }
        );

    });


    /* =====================================================
       FECHAR LIGHTBOX
    ====================================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        document.body.style.overflow = "";


        /*
         * Limpa a imagem depois da animação.
         */

        setTimeout(() => {

            if (!lightbox.classList.contains("active")) {

                lightboxImage.src = "";

            }

        }, 350);

    }


    if (closeLightboxButton) {

        closeLightboxButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       CLIQUE NO FUNDO
    ====================================================== */

    const lightboxBackdrop =
        document.querySelector(
            ".lightbox-backdrop"
        );


    if (lightboxBackdrop) {

        lightboxBackdrop.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       PRÓXIMA IMAGEM
    ====================================================== */

    function nextImage() {

        const visibleImages =
            getVisibleImages();


        if (!visibleImages.length) {
            return;
        }


        currentImageIndex++;


        if (
            currentImageIndex >=
            visibleImages.length
        ) {

            currentImageIndex = 0;

        }


        showImage();

    }


    /* =====================================================
       IMAGEM ANTERIOR
    ====================================================== */

    function previousImage() {

        const visibleImages =
            getVisibleImages();


        if (!visibleImages.length) {
            return;
        }


        currentImageIndex--;


        if (currentImageIndex < 0) {

            currentImageIndex =
                visibleImages.length - 1;

        }


        showImage();

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextImage
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousImage
        );

    }


    /* =====================================================
       TECLADO
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * ESC
             */

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

                return;

            }


            /*
             * SETA DIREITA
             */

            if (
                event.key === "ArrowRight" &&
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                nextImage();

                return;

            }


            /*
             * SETA ESQUERDA
             */

            if (
                event.key === "ArrowLeft" &&
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                previousImage();

            }

        }
    );


    /* =====================================================
       SWIPE NO CELULAR
    ====================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;


                const distance =
                    touchEndX -
                    touchStartX;


                /*
                 * Swipe para esquerda
                 */

                if (distance < -60) {

                    nextImage();

                }


                /*
                 * Swipe para direita
                 */

                if (distance > 60) {

                    previousImage();

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       REVELAÇÃO DAS IMAGENS AO ROLAR
    ====================================================== */

    const revealItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const galleryObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "gallery-visible"
                                );

                                galleryObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach(item => {

            galleryObserver.observe(item);

        });

    } else {

        revealItems.forEach(item => {

            item.classList.add(
                "gallery-visible"
            );

        });

    }


    /* =====================================================
       PARALLAX DO HERO
    ====================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (
        heroImage &&
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                if (scroll < window.innerHeight) {

                    heroImage.style.transform =
                        `scale(1.04) translateY(${scroll * 0.12}px)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       PARALLAX DO INTERLÚDIO
    ====================================================== */

    const interludeImage =
        document.querySelector(
            ".interlude-image"
        );


    if (
        interludeImage &&
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const rect =
                    interludeImage
                        .parentElement
                        .getBoundingClientRect();


                const viewportHeight =
                    window.innerHeight;


                if (
                    rect.top < viewportHeight &&
                    rect.bottom > 0
                ) {

                    const progress =
                        (
                            viewportHeight -
                            rect.top
                        ) /
                        (
                            viewportHeight +
                            rect.height
                        );


                    const movement =
                        (progress - .5) * 80;


                    interludeImage.style.transform =
                        `scale(1.08) translateY(${movement}px)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       PARALLAX DO FINAL
    ====================================================== */

    const finalBackground =
        document.querySelector(
            ".final-background"
        );


    if (
        finalBackground &&
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const section =
                    finalBackground
                        .parentElement;


                const rect =
                    section.getBoundingClientRect();


                const viewport =
                    window.innerHeight;


                if (
                    rect.top < viewport &&
                    rect.bottom > 0
                ) {

                    const progress =
                        (
                            viewport -
                            rect.top
                        ) /
                        (
                            viewport +
                            rect.height
                        );


                    const movement =
                        (progress - .5) * 60;


                    finalBackground.style.transform =
                        `scale(1.08) translateY(${movement}px)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       BOTÕES CINEMATOGRÁFICOS
    ====================================================== */

    const cinemaButtons =
        document.querySelectorAll(
            ".cinema-button"
        );


    cinemaButtons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.classList.add(
                    "cinema-hover"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.classList.remove(
                    "cinema-hover"
                );

            }
        );

    });


    /* =====================================================
       CONTROLE DE IMAGENS QUEBRADAS
    ====================================================== */

    galleryButtons.forEach(button => {

        const image =
            button.querySelector("img");


        if (!image) {
            return;
        }


        image.addEventListener(
            "error",
            () => {

                button.classList.add(
                    "image-error"
                );

                console.warn(
                    "Imagem não encontrada:",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       PREVENÇÃO DE CLIQUE DUPLO
    ====================================================== */

    let openingImage = false;


    galleryButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                if (openingImage) {

                    event.preventDefault();

                    return;

                }


                openingImage = true;


                setTimeout(() => {

                    openingImage = false;

                }, 400);

            },
            true
        );

    });


    /* =====================================================
       INICIALIZAÇÃO
    ====================================================== */

    applyFilter("all");


    console.log(
        "%c SENTINELAS DO TEMPO ",
        "background:#080807;color:#c8a96b;padding:8px;font-family:serif;font-size:14px;"
    );

    console.log(
        "%c Galeria Cinematic Edition ",
        "color:#aaa;padding:4px;"
    );

});