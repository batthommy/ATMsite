document.addEventListener('DOMContentLoaded', () => {

    const atmContainer = document.querySelector('.atm-container');

    if (!atmContainer) return;

    atmContainer.addEventListener('click', () => {
        atmContainer.classList.toggle('active');
    });


    const members = document.querySelectorAll('.member');

    let selectedMember = null;

    members.forEach(member => {

        member.addEventListener('click', () => {

            if (selectedMember !== member) {

                if (selectedMember) {
                    selectedMember.classList.remove('selected');
                }

                selectedMember = member;
                member.classList.add('selected');

                return;
            }

            const nickname =
                member.querySelector('h3')
                .dataset.surname;

            window.location.href =
                `/people-pages/${nickname}.html`;
        });

    });


    const technologies = document.querySelectorAll('.technologies span');
    const technologyCard =
        document.querySelector('.technology-card');

    const technologyData = {

        HTML: {
            text: "The language we use to build the structure of our websites.",
            people: ["Thomas"],
            percentage: "85%"
        },

        CSS: {
            text: "Used to make our projects beautiful, readable, and responsive.",
            people: ["Thomas"],
            percentage: "75%"
        },

        JavaScript: {
            text: "Brings pages to life with animations, logic, and interactivity.",
            people: ["Thomas"],
            percentage: "45%"
        },

        Python: {
            text: "Used for automation, testing, and small tools.",
            people: ["Thomas"],
            percentage: "10%"
        },

        "VS Code": {
            text: "The main editor we use for development.",
            people: ["Thomas"],
            percentage: "100%"
        },

        Arduino: {
            text: "Used for electronic projects and hardware experiments.",
            people: ["<br>"],
            percentage: "3%"
        },

        Scratch: {
            text: "We use it as a base for creating things when we want to work quickly.",
            people: ["<br>"],
            percentage: "1%"
        },

        DocumentAtm: {
            text: "We use it for official documentation.",
            people: ["Thomas"],
            percentage: "20%"
        }
    };


    technologies.forEach(button => {

        button.addEventListener('click', () => {

            technologies.forEach(tech =>
                tech.classList.remove('active')
            );

            button.classList.add('active');

            const data =
                technologyData[button.textContent];

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


    technologies[0].click();


    const contactForm =
        document.querySelector('#atm-contact-form');

    const otherReason =
        document.querySelector('#other-reason');

    const reasons =
        document.querySelectorAll('input[name="reason"]');


    reasons.forEach(reason => {

        reason.addEventListener('change', () => {

            otherReason.style.display =
                reason.value === 'Other' && reason.checked
                    ? 'block'
                    : 'none';

        });

    });


    contactForm.addEventListener('submit', e => {

        e.preventDefault();


        const selectedReason =
            document.querySelector(
                'input[name="reason"]:checked'
            ).value;


        const reason =
            selectedReason === 'Other'
                ? otherReason.value
                : selectedReason;


        const recipients =
            [...document.querySelectorAll(
                'input[name="recipients"]:checked'
            )]
                .map(x => x.value)
                .join(', ');


        const topic =
            document.querySelector('#topic').value;

        const message =
            document.querySelector('#message').value;

        const name =
            document.querySelector('#name').value;

        const email =
            document.querySelector('#email').value;

        const company =
            document.querySelector('#company').value;

        const urgency =
            document.querySelector('#urgency').value;

        const howFoundUs =
            document.querySelector('#how-found-us').value ||
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

});