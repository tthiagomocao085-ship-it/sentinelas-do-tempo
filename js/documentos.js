document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SENTINELAS DO TEMPO
       ACERVO DIGITAL
    ====================================================== */


    /* =====================================================
       DOCUMENTOS
    ====================================================== */

    const documents = [

        {
            title: "A Guerra de Sessenta Anos",
            file: "guerra-de-sessenta-anos.pdf"
        },

        {
            title: "Guerra do Paraguai: história e polêmica",
            file: "guerra-do-paraguai-historia-e-polemica.pdf"
        },

        {
            title: "Guerra do Paraguai: Visões da História",
            file: "razoes-e-interpretacoes-da-guerra-do-paraguai.pdf"
        },

        {
            title: "O Forte de Coimbra nos nossos dias",
            file: "forte-de-coimbra-nos-nossos-dias.pdf"
        },

        {
            title: "As consequências da Guerra do Paraguai",
            file: "consequencias-da-guerra-para-o-exercito-brasileiro.pdf"
        },

        {
            title: "Fortaleza imaginária",
            file: "fortaleza-imaginaria-forte-de-coimbra-e-patrimonio.pdf"
        },

        {
            title: "Potencial Agroecológico de Forte Coimbra",
            file: "potencial-agroecologico-de-forte-coimbra.pdf"
        }

    ];


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const loader =
        document.getElementById("archiveLoader");

    const modal =
        document.getElementById("pdfModal");

    const backdrop =
        document.querySelector(".pdf-backdrop");

    const viewer =
        document.getElementById("pdfViewer");

    const title =
        document.getElementById("pdfTitle");

    const counter =
        document.getElementById("pdfCounter");

    const previousButton =
        document.getElementById("previousDocument");

    const nextButton =
        document.getElementById("nextDocument");

    const closeButton =
        document.getElementById("closePdf");

    const documentButtons =
        document.querySelectorAll(".document-button");

    const documentCards =
        document.querySelectorAll(".document-card");

    const header =
        document.querySelector(".site-header");

    const hero =
        document.querySelector(".archive-hero");


    /* =====================================================
       ESTADO
    ====================================================== */

    let currentDocument = 0;

    let isModalOpen = false;

    let modalCloseTimer = null;


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* =====================================================
       LOADER
    ====================================================== */

    if (loader) {

        const hideLoader = () => {

            setTimeout(() => {

                loader.classList.add("hidden");

            }, reducedMotion.matches ? 300 : 1500);

        };


        if (document.readyState === "complete") {

            hideLoader();

        } else {

            window.addEventListener(
                "load",
                hideLoader,
                { once: true }
            );

        }

    }


    /* =====================================================
       UTILITÁRIOS
    ====================================================== */

    function formatNumber(number) {

        return String(number).padStart(2, "0");

    }


    function getDocumentPath(file) {

        return `documentos/${encodeURIComponent(file)}`;

    }


    /* =====================================================
       ATUALIZAR CONTROLES
    ====================================================== */

    function updateNavigationButtons(index) {

        if (previousButton) {

            previousButton.disabled =
                index <= 0;

        }


        if (nextButton) {

            nextButton.disabled =
                index >= documents.length - 1;

        }

    }


    /* =====================================================
       ATUALIZAR DOCUMENTO
    ====================================================== */

    function updateDocument(index) {

        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= documents.length
        ) {

            return;

        }


        const documentData =
            documents[index];


        currentDocument = index;


        /* -------------------------------------------------
           TÍTULO
        ------------------------------------------------- */

        if (title) {

            title.textContent =
                documentData.title;

        }


        /* -------------------------------------------------
           CONTADOR
        ------------------------------------------------- */

        if (counter) {

            counter.textContent =
                `${formatNumber(index + 1)} / ${formatNumber(documents.length)}`;

        }


        /* -------------------------------------------------
           PDF
        ------------------------------------------------- */

        if (viewer) {

            viewer.setAttribute(
                "aria-label",
                `Visualização do documento ${index + 1}: ${documentData.title}`
            );


            viewer.src =
                getDocumentPath(
                    documentData.file
                );

        }


        /* -------------------------------------------------
           BOTÕES
        ------------------------------------------------- */

        updateNavigationButtons(index);

    }


    /* =====================================================
       ABRIR DOCUMENTO
    ====================================================== */

    function openDocument(index) {

        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= documents.length
        ) {

            return;

        }


        if (!modal) {

            return;

        }


        if (modalCloseTimer) {

            clearTimeout(modalCloseTimer);

            modalCloseTimer = null;

        }


        updateDocument(index);


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "archive-modal-open"
        );


        isModalOpen = true;


        /*
         * Move o foco para o botão de fechar.
         * Isso melhora a navegação por teclado.
         */

        if (closeButton) {

            setTimeout(() => {

                closeButton.focus();

            }, reducedMotion.matches ? 0 : 100);

        }

    }


    /* =====================================================
       FECHAR DOCUMENTO
    ====================================================== */

    function closeDocument() {

        if (
            !modal ||
            !isModalOpen
        ) {

            return;

        }


        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "archive-modal-open"
        );


        isModalOpen = false;


        /*
         * Espera a animação terminar antes
         * de limpar o iframe.
         */

        modalCloseTimer =
            setTimeout(() => {

                if (viewer) {

                    viewer.src =
                        "about:blank";

                }

                modalCloseTimer = null;

            }, reducedMotion.matches ? 0 : 350);

    }


    /* =====================================================
       ABRIR PELOS BOTÕES
    ====================================================== */

    documentButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.document
                    );


                if (
                    Number.isInteger(index)
                ) {

                    openDocument(index);

                }

            }
        );

    });


    /* =====================================================
       ANTERIOR
    ====================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                if (
                    currentDocument > 0
                ) {

                    updateDocument(
                        currentDocument - 1
                    );

                }

            }
        );

    }


    /* =====================================================
       PRÓXIMO
    ====================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    currentDocument <
                    documents.length - 1
                ) {

                    updateDocument(
                        currentDocument + 1
                    );

                }

            }
        );

    }


    /* =====================================================
       FECHAR PELO BOTÃO
    ====================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeDocument
        );

    }


    /* =====================================================
       FECHAR PELO BACKDROP
    ====================================================== */

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeDocument
        );

    }


    /* =====================================================
       TECLADO
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !modal ||
                !isModalOpen
            ) {

                return;

            }


            /* ---------------------------------------------
               ESC
            --------------------------------------------- */

            if (
                event.key === "Escape"
            ) {

                event.preventDefault();

                closeDocument();

                return;

            }


            /* ---------------------------------------------
               SETA ESQUERDA
            --------------------------------------------- */

            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();


                if (
                    currentDocument > 0
                ) {

                    updateDocument(
                        currentDocument - 1
                    );

                }

                return;

            }


            /* ---------------------------------------------
               SETA DIREITA
            --------------------------------------------- */

            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();


                if (
                    currentDocument <
                    documents.length - 1
                ) {

                    updateDocument(
                        currentDocument + 1
                    );

                }

            }

        }
    );


    /* =====================================================
       REVEAL DOS CARDS
    ====================================================== */

    if (
        reducedMotion.matches
    ) {

        documentCards.forEach(
            (card) => {

                card.classList.add(
                    "document-visible"
                );

            }
        );

    } else if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "document-visible"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        documentCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${Math.min(index * 0.08, 0.45)}s`;


                observer.observe(card);

            }
        );

    } else {

        documentCards.forEach(
            (card) => {

                card.classList.add(
                    "document-visible"
                );

            }
        );

    }


    /* =====================================================
       HEADER
    ====================================================== */

    function updateHeader() {

        if (!header) {

            return;

        }


        if (
            window.scrollY > 60
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

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
       PARALLAX DO HERO
    ====================================================== */

    if (
        hero &&
        !reducedMotion.matches
    ) {

        let ticking = false;


        function updateHeroParallax() {

            if (ticking) {

                return;

            }


            ticking = true;


            window.requestAnimationFrame(
                () => {

                    const scroll =
                        window.scrollY;


                    if (
                        scroll <
                        window.innerHeight
                    ) {

                        hero.style.backgroundPosition =
                            `center calc(50% + ${scroll * 0.08}px)`;

                    }


                    ticking = false;

                }
            );

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
       BLOQUEIO DE SCROLL
    ====================================================== */

    if (
        !document.getElementById(
            "archiveModalStyles"
        )
    ) {

        const modalStyle =
            document.createElement("style");


        modalStyle.id =
            "archiveModalStyles";


        modalStyle.textContent = `
            body.archive-modal-open {
                overflow: hidden;
            }
        `;


        document.head.appendChild(
            modalStyle
        );

    }


    /* =====================================================
       ERRO DE PDF
    ====================================================== */

    if (viewer) {

        viewer.addEventListener(
            "error",
            () => {

                console.warn(
                    "Não foi possível carregar o documento:",
                    documents[currentDocument]?.file
                );

            }
        );

    }


    /* =====================================================
       LINKS INTERNOS
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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
                        behavior:
                            reducedMotion.matches
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        });


    /* =====================================================
       REDUCED MOTION GLOBAL
    ====================================================== */

    if (
        reducedMotion.matches
    ) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       LOG
    ====================================================== */

    console.log(
        "Sentinelas do Tempo — Acervo Digital carregado.",
        `${documents.length} documentos disponíveis.`
    );

});