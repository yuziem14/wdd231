const currentYearDOM = document.querySelector('#currentyear');
const lastModifiedDOM = document.querySelector('#lastModified');

const currentDate = new Date();
currentYearDOM.textContent = currentDate.getFullYear();
lastModifiedDOM.textContent = `Last Modified: ${document.lastModified.toLocaleString().replace(',', '')}`;