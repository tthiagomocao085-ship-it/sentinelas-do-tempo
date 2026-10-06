document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("trajectoryLoader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 2300);

    }


    /* =====================================================
       REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".trajectory-intro, " +
        ".trajectory-section, " +
        ".territory-content, " +
        ".facepan-content, " +
        ".present-content, " +
        ".timeline-item, " +
        ".manifesto-content, " +
        ".trajectory-final"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       NAVEGAÇÃO INTERNA
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       PARALLAX DO HERO
    ===================================================== */

    const hero = document.querySelector(".trajectory-hero");


    if (hero) {

        let ticking = false;


        window.addEventListener("scroll", () => {

            if (ticking) {
                return;
            }


            window.requestAnimationFrame(() => {

                const scrollY = window.scrollY;


                if (scrollY < window.innerHeight) {

                    hero.style.backgroundPosition =
                        `center ${scrollY * 0.35}px`;

                }


                ticking = false;

            });


            ticking = true;

        });

    }


    /* =====================================================
       TIMELINE
    ===================================================== */

    const timelineItems = document.querySelectorAll(
        ".timeline-item"
    );


    timelineItems.forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 100}ms`;

    });


    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.querySelector(".site-header");


    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 80) {

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
       VERIFICAÇÃO DAS IMAGENS
    ===================================================== */

    const images = document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener("error", () => {

            console.warn(
                "Imagem não encontrada:",
                image.src
            );

            image.classList.add("image-error");

        });

    });


    /* =====================================================
       FINAL
    ===================================================== */

    console.log(
        "Sentinelas do Tempo — Trajetória carregada com sucesso."
    );

});