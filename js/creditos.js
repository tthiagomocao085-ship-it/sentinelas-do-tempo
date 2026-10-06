document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ====================================================== */

    const loader = document.getElementById("creditsLoader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("hidden");

            }, 1900);

        });

    }


    /* =====================================================
       HEADER
    ====================================================== */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       REVEAL DAS SEÇÕES
    ====================================================== */

    const revealElements = document.querySelectorAll(
        ".credits-reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "credits-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 0.08, 0.4)}s`;

            revealObserver.observe(element);

        });

    } else {

        /* Fallback para navegadores sem IntersectionObserver */

        revealElements.forEach((element) => {

            element.classList.add(
                "credits-visible"
            );

        });

    }


    /* =====================================================
       PARALLAX DO HERO
    ====================================================== */

    const hero = document.querySelector(".credits-hero");

    if (hero && !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {

        window.addEventListener("scroll", () => {

            const scrollPosition = window.scrollY;

            if (scrollPosition < window.innerHeight) {

                const movement =
                    scrollPosition * 0.12;

                hero.style.backgroundPosition =
                    `center calc(50% + ${movement}px)`;

            }

        });

    }


    /* =====================================================
       LINKS INTERNOS SUAVES
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       VERIFICAÇÃO DE IMAGENS
    ====================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            console.warn(
                "Imagem não encontrada:",
                image.src
            );

            image.classList.add(
                "image-error"
            );

        });

    });


    /* =====================================================
       ACESSIBILIDADE — REDUCED MOTION
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       LOG DE DESENVOLVIMENTO
    ====================================================== */

    console.log(
        "Sentinelas do Tempo — Página de Créditos carregada."
    );

});