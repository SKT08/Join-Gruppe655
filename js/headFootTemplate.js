async function init(){
    await includeHTML();
    document.getElementById('userIntials').innerText = initials(); //add global var for login
}

function initials(login) {
    if (login) {
        return 'AS' // here add function for getting initials
    } else { return 'G'}
    
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}