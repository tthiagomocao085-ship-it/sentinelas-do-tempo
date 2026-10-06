/* =========================================================
   SENTINELAS DO TEMPO
   FORTE COIMBRA — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
       ===================================================== */

    const loader = document.getElementById("forteLoader");

    if (loader) {

        // Mantém a introdução por um pequeno período
        // e depois libera a página.

        setTimeout(() => {

            loader.classList.add("hide");

            document.body.classList.add("forte-loaded");

            setTimeout(() => {

                loader.remove();

            }, 1000);

        }, 1800);

    }


    /* =====================================================
       HEADER
       ===================================================== */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();

    }


    /* =====================================================
       REVELAÇÃO DOS ELEMENTOS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        `
        .fc-history-intro-title,
        .fc-history-intro-text,
        .fc-image-reveal-caption,
        .fc-event,
        .fc-main-image,
        .fc-record-image,
        .fc-record-text,
        .fc-war-heading,
        .fc-war-story,
        .fc-timeline-item,
        .fc-territory-text,
        .fc-territory-image,
        .fc-heritage-heading,
        .fc-heritage-grid,
        .fc-memory-content,
        .fc-conclusion .fc-container
        `
    );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        // Fallback para navegadores sem IntersectionObserver

        revealElements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       PARALLAX CINEMATOGRÁFICO
       ===================================================== */

    const parallaxElements = [

        {
            element:
                document.querySelector(
                    ".fc-hero-background"
                ),
            strength: 0.035
        },

        {
            element:
                document.querySelector(
                    ".fc-image-reveal-background"
                ),
            strength: 0.025
        },

        {
            element:
                document.querySelector(
                    ".fc-war-background"
                ),
            strength: 0.018
        },

        {
            element:
                document.querySelector(
                    ".fc-memory-background"
                ),
            strength: 0.025
        }

    ].filter(
        item => item.element
    );


    let ticking = false;


    const updateParallax = () => {

        const scrollY =
            window.scrollY;

        parallaxElements.forEach(
            item => {

                const rect =
                    item.element.getBoundingClientRect();

                const center =
                    rect.top +
                    rect.height / 2;

                const distance =
                    center -
                    window.innerHeight / 2;

                const movement =
                    distance *
                    item.strength;

                item.element.style.transform =
                    `translate3d(0, ${movement}px, 0) scale(1.06)`;

            }
        );

        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    /* =====================================================
       LINKS INTERNOS
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       IMAGENS
       ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Sentinelas do Tempo: imagem não encontrada:",
                    image.src
                );

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       TIMELINE — PEQUENO EFEITO DE ATRASO
       ===================================================== */

    document.querySelectorAll(
        ".fc-timeline-item"
    ).forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 0.08}s`;

        }
    );


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log(
        "%c SENTINELAS DO TEMPO ",
        "background:#050505;color:#c8a45d;padding:8px;font-family:serif;"
    );

    console.log(
        "Forte Coimbra — exposição digital carregada."
    );

});