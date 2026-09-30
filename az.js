document.addEventListener('DOMContentLoaded', () => {

    const atmContainer = document.querySelector('.atm-container');

    if (!atmContainer) return;

    atmContainer.addEventListener('click', () => {
        atmContainer.classList.toggle('attivo');
    });


    const membri = document.querySelectorAll('.membro');

    let membroArmato = null;

    membri.forEach(membro => {

        membro.addEventListener('click', () => {

            if (membroArmato !== membro) {

                if (membroArmato) {
                    membroArmato.classList.remove('selected');
                }

                membroArmato = membro;
                membro.classList.add('selected');

                return;
            }

            const nickname =
                membro.querySelector('h3')
                .dataset.surname;

            window.location.href =
                `/pagine-persone/${nickname}.html`;
        });

    });



    const tecnologie = document.querySelectorAll('.tecnologie span');
    const tecnologiaCard =
        document.querySelector('.tecnologia-card');

    const datiTecnologie = {

        HTML:{
            testo:"Il linguaggio che utilizziamo per costruire la struttura dei nostri siti web.",
            chi:["Thomas"],
            percentuale:"85%"
        },

        CSS:{
            testo:"Serve per rendere belli, leggibili e responsive i nostri progetti.",
            chi:["Thomas"],
            percentuale:"75%"
        },

        JavaScript:{
            testo:"Dà vita alle pagine con animazioni, logica e interattività.",
            chi:["Thomas"],
            percentuale:"45%"
        },

        Python:{
            testo:"Utilizzato per automazioni, test e piccoli strumenti.",
            chi:["Thomas"],
            percentuale:"10%"
        },

        "VS Code":{
            testo:"L'editor principale che utilizziamo per sviluppare.",
            chi:["Thomas"],
            percentuale:"100%"
        },

        Arduino:{
            testo:"Usato per progetti elettronici e sperimentazioni hardware.",
            chi:["<br>"],
            percentuale:"3%"
        },

        Scratch:{
            testo:"Lo usiamo come base per creare belle cose quanto vogliamo sbrigarci.",
            chi:["<br>"],
            percentuale:"1%"
        },

        DocumentAtm:{
            testo:"Lo usiamo per documentazioni ufficiali",
            chi:["Thomas"],
            percentuale:"20%"
        }
    };

    tecnologie.forEach(btn => {

        btn.addEventListener('click', () => {

            tecnologie.forEach(t =>
                t.classList.remove('active')
            );

            btn.classList.add('active');

            const dati =
                datiTecnologie[btn.textContent];

            tecnologiaCard.innerHTML = `
                <p>${dati.testo}</p>

                <h4>Chi:</h4>

                <ul>
                    ${dati.chi.map(x => `<li>${x}</li>`).join('')}
                </ul>

                <h4>Percentuale:</h4>

                <span>${dati.percentuale} Del Totale</span>
            `;
        });

    });

    tecnologie[0].click();




    const formATM = document.querySelector('#atm-contact-form');
    const motivoAltro = document.querySelector('#motivo-altro');
    const motivi = document.querySelectorAll('input[name="motivo"]');

    motivi.forEach(motivo => {
        motivo.addEventListener('change', () => {
            motivoAltro.style.display =
                motivo.value === 'Altro' && motivo.checked
                    ? 'block'
                    : 'none';
        });
    });

    formATM.addEventListener('submit', e => {
        e.preventDefault();

        const motivoSelezionato = document.querySelector('input[name="motivo"]:checked').value;
        const motivo =
            motivoSelezionato === 'Altro'
                ? motivoAltro.value
                : motivoSelezionato;

        const destinatari = [...document.querySelectorAll('input[name="destinatari"]:checked')]
            .map(x => x.value)
            .join(', ');

        const argomento = document.querySelector('#argomento').value;
        const messaggio = document.querySelector('#messaggio').value;
        const nome = document.querySelector('#nome').value;
        const email = document.querySelector('#email').value;
        const azienda = document.querySelector('#azienda').value;
        const urgenza = document.querySelector('#urgenza').value;
        const comeTrovati = document.querySelector('#come-trovati').value || 'Non specificato';

        const corpoMail =
    `Motivo: ${motivo}

    Destinatari: ${destinatari}

    Argomento:
    ${argomento}

    Messaggio:
    ${messaggio}

    Nome: ${nome}
    Email: ${email}
    Azienda / Organizzazione: ${azienda || 'Non specificata'}
    Urgenza: ${urgenza}
    Come ci ha trovati: ${comeTrovati}`;

        const subject = encodeURIComponent(`Contatto ATM - ${argomento || motivo}`);
        const body = encodeURIComponent(corpoMail);

        window.location.href = `mailto:batthommy@gmail.it?subject=${subject}&body=${body}`;
    });
});