/* =========================================================
   SENTINELAS DO TEMPO
   SCRIPT PRINCIPAL — GUERRA DO PARAGUAI
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ===================================================== */

    const body = document.body;
    const loader = document.getElementById("warLoader");

    const hero = document.querySelector(".war-hero");
    const heroBackground = document.querySelector(".hero-background");

    const navigationLinks =
        document.querySelectorAll(".war-nav a");

    const scrollLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    /* =====================================================
       1. LOADER
    ===================================================== */

    function hideLoader() {

        if (!loader) return;

        loader.classList.add("hidden");

        body.classList.add("page-loaded");

        setTimeout(() => {

            loader.style.display = "none";

        }, 900);
    }


    /*
     * Normalmente o navegador espera todas as imagens
     * carregarem antes de esconder o loader.
     */

    window.addEventListener("load", () => {

        setTimeout(() => {

            hideLoader();

        }, 500);

    });


    /*
     * Segurança:
     * se alguma imagem ou recurso demorar demais,
     * o usuário não fica preso na tela inicial.
     */

    setTimeout(() => {

        hideLoader();

    }, 3200);



    /* =====================================================
       2. NAVEGAÇÃO SUAVE
    ===================================================== */

    scrollLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            /*
             * Ignora links normais como:
             * forte-coimbra.html
             */

            if (
                !targetId ||
                targetId === "#" ||
                !targetId.startsWith("#")
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const header =
                document.querySelector(".war-header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       3. ELEMENTOS QUE APARECEM DURANTE O SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-top,
            .context-grid,
            .timeline-header,
            .timeline-card,
            .memory-content,
            .chapter-label,
            .territory-image,
            .territory-text,
            .next-content,
            .war-footer
            `
        );


    /*
     * Adiciona uma classe inicial.
     */

    revealElements.forEach(element => {

        element.classList.add(
            "scroll-reveal"
        );

    });


    /*
     * IntersectionObserver é muito mais leve
     * que ficar calculando tudo a cada frame.
     */

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "revealed"
                    );


                    /*
                     * Depois que apareceu uma vez,
                     * não precisamos observar novamente.
                     */

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       4. ENTRADA DOS ITENS DA TIMELINE
    ===================================================== */

    const timelineCards =
        document.querySelectorAll(
            ".timeline-card"
        );


    timelineCards.forEach(
        (card, index) => {

            card.style.setProperty(
                "--delay",
                `${index * 100}ms`
            );

        }
    );



    /* =====================================================
       5. BARRA DE PROGRESSO DA PÁGINA
    ===================================================== */

    const progressBar =
        document.createElement("div");


    progressBar.className =
        "page-progress";


    document.body.appendChild(
        progressBar
    );


    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const progress =
            (scrollTop / documentHeight) *
            100;


        progressBar.style.width =
            `${Math.min(progress, 100)}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();



    /* =====================================================
       6. HEADER DINÂMICO
    ===================================================== */

    const header =
        document.querySelector(
            ".war-header"
        );


    let lastScroll = 0;


    function updateHeader() {

        if (!header) return;


        const currentScroll =
            window.scrollY;


        /*
         * No topo:
         * header mais discreto.
         */

        if (currentScroll <= 30) {

            header.classList.remove(
                "header-scrolled"
            );

        } else {

            header.classList.add(
                "header-scrolled"
            );

        }


        lastScroll =
            currentScroll;

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();



    /* =====================================================
       7. PARALLAX DO HERO
    ===================================================== */

    /*
     * Não executamos em celulares.
     * Isso deixa o efeito mais cinematográfico
     * sem prejudicar desempenho.
     */

    const canUseParallax =
        window.matchMedia(
            "(min-width: 801px)"
        ).matches;


    if (
        canUseParallax &&
        hero &&
        heroBackground
    ) {

        let ticking = false;


        function updateHeroParallax() {

            if (ticking) return;


            ticking = true;


            requestAnimationFrame(() => {

                const scroll =
                    window.scrollY;


                /*
                 * Quando a pessoa começa a sair
                 * do hero, a imagem se move
                 * suavemente.
                 */

                if (scroll <= hero.offsetHeight) {

                    heroBackground.style.transform =
                        `translateY(${scroll * 0.12}px) scale(1.02)`;

                }


                ticking = false;

            });

        }


        window.addEventListener(
            "scroll",
            updateHeroParallax,
            {
                passive: true
            }
        );

    }



    /* =====================================================
       8. INDICADOR DE SEÇÃO
    ===================================================== */

    const sections = [

        {
            element:
                document.querySelector(
                    "#contexto"
                ),

            link:
                document.querySelector(
                    '.war-nav a[href="guerra.html"]'
                )

        },

        {
            element:
                document.querySelector(
                    ".timeline-section"
                ),

            link: null

        },

        {
            element:
                document.querySelector(
                    ".territory-section"
                ),

            link:
                document.querySelector(
                    '.war-nav a[href="forte-coimbra.html"]'
                )

        }

    ];


    /*
     * Mantém apenas os elementos existentes.
     */

    const validSections =
        sections.filter(
            section =>
                section.element
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentSection =
                        validSections.find(
                            section =>
                                section.element ===
                                entry.target
                        );


                    if (!currentSection) {
                        return;
                    }


                    /*
                     * Futuramente podemos usar isso
                     * para criar uma navegação muito
                     * mais avançada.
                     */

                    document.body.dataset.section =
                        currentSection.element.id ||
                        currentSection.element.className;

                });

            },
            {
                threshold: 0.45
            }
        );


    validSections.forEach(section => {

        sectionObserver.observe(
            section.element
        );

    });



    /* =====================================================
       9. BOTÃO "INICIAR LEITURA"
    ===================================================== */

    const heroButton =
        document.querySelector(
            ".hero-button"
        );


    if (heroButton) {

        heroButton.addEventListener(
            "click",
            () => {

                body.classList.add(
                    "reading-mode"
                );

            }
        );

    }



    /* =====================================================
       10. HOVER CINEMATOGRÁFICO NOS BOTÕES
    ===================================================== */

    const museumButtons =
        document.querySelectorAll(
            ".museum-button"
        );


    museumButtons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.classList.add(
                    "button-hover"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.classList.remove(
                    "button-hover"
                );

            }
        );

    });



    /* =====================================================
       11. ANIMAÇÃO DO NÚMERO DA TIMELINE
    ===================================================== */

    const timelineObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const marker =
                        entry.target.querySelector(
                            ".timeline-marker"
                        );


                    if (marker) {

                        marker.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                threshold: 0.45
            }
        );


    timelineCards.forEach(card => {

        timelineObserver.observe(card);

    });



    /* =====================================================
       12. TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * Home
             */

            if (
                event.key === "Home" &&
                !event.ctrlKey
            ) {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }


            /*
             * End
             */

            if (
                event.key === "End" &&
                !event.ctrlKey
            ) {

                event.preventDefault();


                window.scrollTo({

                    top:
                        document.documentElement
                            .scrollHeight,

                    behavior: "smooth"

                });

            }

        }
    );



    /* =====================================================
       13. CONSOLE DE DESENVOLVIMENTO
    ===================================================== */

    console.log(
        "%c SENTINELAS DO TEMPO ",
        `
        background:#050505;
        color:#c9a45c;
        padding:8px 14px;
        font-family:serif;
        font-size:14px;
        `
    );

    console.log(
        "Capítulo I — A Guerra do Paraguai"
    );

});