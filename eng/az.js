document.addEventListener('DOMContentLoaded', () => {

    const atmContainer = document.querySelector('.atm-container');

    if (!atmContainer) return;

    atmContainer.addEventListener('click', () => {
        atmContainer.classList.toggle('active');
    });


    document.querySelectorAll('#current-year').forEach(el => el.textContent = new Date().getFullYear());

    const members = document.querySelectorAll('.membro');

    let selectedMember = null;

    members.forEach(member => {

        member.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); member.click(); } });
        member.addEventListener('click', (e) => {

            if (selectedMember !== member) {

                if (selectedMember) {
                    selectedMember.classList.remove('selected');
                }

                selectedMember = member;
                member.classList.add('selected');

                return;
            }

            const nickname = member.querySelector('h3')?.dataset.surname;
            if (!nickname) return;

            window.location.href =
                `people-pages/${nickname}.html`;
        });

    });


    const technologies = document.querySelectorAll('.tecnologie span');
    const technologyCard =
        document.querySelector('.tecnologia-card');

    const technologyData = {

        HTML: {
            text: "The language we use to build the structure of our websites.",
            people: ["Thomas", "Krishiv Joshi", "Niraj Gundecha", "n1tr0xx"],
            percentage: "70%"
        },

        CSS: {
            text: "Used to make our projects beautiful, readable, and responsive.",
            people: ["Thomas", "Krishiv Joshi", "Niraj Gundecha", "n1tr0xx", "Faraj Ziad"],
            percentage: "60%"
        },

        JavaScript: {
            text: "Brings pages to life with animations, logic, and interactivity.",
            people: ["Faraj Ziad", "Krishiv Joshi", "n1tr0xx"],
            percentage: "45%"
        },

        Python: {
            text: "Used for automation, testing, and small tools.",
            people: ["Thomas", "Krishiv Joshi", "Niraj Gundecha", "Faraj Ziad", "n1tr0xx"],
            percentage: "15%"
        },

        VSCode: {
            text: "The main editor we use for development.",
            people: ["Thomas"],
            percentage: "100%"
        },

        Arduino: {
            text: "Used for electronic projects and hardware experiments.",
            people: ["Faraj Ziad", "Niraj Gundecha"],
            percentage: "3%"
        },

        Scratch: {
            text: "We use it as a base for creating things when we want to work quickly.",
            people: [],
            percentage: "10%"
        },

        DocumentAtm: {
            text: "We use it for official documentation.",
            people: ["Thomas"],
            percentage: "2%"
        },
        "C++": {
            text: "used to create high-performance algorithms and video games.",
            people: ["Faraj Ziad", "Niraj Gundecha"],
            percentage: "15%"
        },
        "C#": {
            text: "used primarily for creating video games",
            people: ["n1tr0xx"],
            percentage: "10%"
        },
        C: {
            text: "Low-level language, rarely used, video games too",
            people: ["Faraj Ziad"],
            percentage: "2%"
        }
    };


    technologies.forEach(button => {

        button.addEventListener('click', () => {

            technologies.forEach(tech =>
                tech.classList.remove('active')
            );

            button.classList.add('active');

            const data =
                technologyData[button.textContent.trim().replace(/\s+/g, '')];

            if (!data || !technologyCard) return;
            technologyCard.innerHTML = `
                <p>${data.text}</p>

                <h4>Who:</h4>

                <ul>
                    ${data.people.map(x => `<li>${x}</li>`).join('')}
                </ul>

                <h4>Percentage:</h4>

                <span>${data.percentage} Of Total</span>
            `;
        });

    });


    if (technologies.length) technologies[0].click();


    const contactForm =
        document.querySelector('#atm-contact-form');

    const otherReason =
        document.querySelector('#motivo-altro');

    const reasons =
        document.querySelectorAll('input[name="motivo"]');


    reasons.forEach(reason => {

        reason.addEventListener('change', () => {

            if (otherReason) otherReason.style.display =
                (reason.value === 'Other' || reason.value === 'Altro') && reason.checked
                    ? 'block'
                    : 'none';

        });

    });


    if (contactForm) contactForm.addEventListener('submit', e => {

        e.preventDefault();


        const selectedReason = document.querySelector('input[name="motivo"]:checked')?.value || 'Not specified';


        const reason =
            (selectedReason === 'Other' || selectedReason === 'Altro')
                ? otherReason.value
                : selectedReason;


        const recipients =
            [...document.querySelectorAll(
                'input[name="destinatari"]:checked'
            )]
                .map(x => x.value)
                .join(', ');


        const topic =
            document.querySelector('#argomento').value;

        const message =
            document.querySelector('#messaggio').value;

        const name =
            document.querySelector('#nome').value;

        const email =
            document.querySelector('#email').value;

        const company =
            document.querySelector('#azienda').value;

        const urgency =
            document.querySelector('#urgenza').value;

        const howFoundUs =
            document.querySelector('#come-trovati').value ||
            'Not specified';


        const emailBody =
`Reason: ${reason}

Recipients: ${recipients}

Topic:
${topic}

Message:
${message}

Name: ${name}
Email: ${email}
Company / Organization: ${company || 'Not specified'}
Urgency: ${urgency}
How you found us: ${howFoundUs}`;


        const subject =
            encodeURIComponent(
                `ATM Contact - ${topic || reason}`
            );

        const body =
            encodeURIComponent(emailBody);


        window.location.href =
            `mailto:ATM@thobttl.it?subject=${subject}&body=${body}`;

    });

    document.querySelectorAll('.progetto-card[data-project-url]').forEach(card => {
        const status = card.querySelector('.stato.finito a');
        if (!status) return;
        const original = status.textContent;
        const show = () => { status.textContent = 'Click to visit →'; };
        const hide = () => { status.textContent = original; };
        card.addEventListener('mouseenter', show);
        card.addEventListener('mouseleave', hide);
        card.addEventListener('focusin', show);
        card.addEventListener('focusout', hide);
        card.addEventListener('click', e => { if (!e.target.closest('a')) window.location.href = card.dataset.projectUrl; });
        card.addEventListener('keydown', e => { if (e.key === 'Enter') window.location.href = card.dataset.projectUrl; });
    });

});