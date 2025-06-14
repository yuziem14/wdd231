window.addEventListener("load", (e) => {
  const data = new URLSearchParams(window.location.search.replace(/^\?/, ""));
  populateEntries(data);
});

const TIMESTAMP_FIELD_NAME = 'formLoadedTimestamp';
const dataSection = document.querySelector('.submission-data');

const inputs = {
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'email': 'E-mail',
    'phoneNumber': 'Mobile Number',
    'organizationName': 'Business Name',
    [TIMESTAMP_FIELD_NAME]: 'Submitted At'
}

function populateEntries(data = new URLSearchParams()) {
    dataSection.innerHTML = '';
    Object.keys(inputs).forEach(inputName => {
        const label = inputs[inputName];
        const value = data.get(inputName);

        dataSection.innerHTML += `<p data-field="${inputName}"><span>${label}: </span><span>${value}</span></p>`;
    });

    const timestampDOM = dataSection.querySelector(`p[data-field="${TIMESTAMP_FIELD_NAME}"]`);
    const date = new Date(Number(data.get(TIMESTAMP_FIELD_NAME)));
    timestampDOM.innerHTML = `<span>${inputs[TIMESTAMP_FIELD_NAME]}: </span><span>${date.toLocaleString().replace(', ', ' ')}</span>`;
} 
