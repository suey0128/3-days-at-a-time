window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded and parsed');
    // var date = new Date();
    // var year = date.getFullYear();
    // var month = date.getMonth()+1;
    // var todayDate = String(date.getDate()).padStart(2,'0');
    // var datePattern = year + '-' + month + '-' + todayDate;
    // document.querySelector('#date-picker').value = datePattern;
    // console.log()
    // getData ()
});



// console.log(document.querySelector('#date-picker'))
let datePicker = document.querySelector('#date-picker')

// console.log(datePicker.value);
//console.log(datePicker.value); => 2021-06-14 => is the format we want to use

datePicker.addEventListener('change', (e) =>{
    console.log(datePicker.value)    
    getData ()
})

const apiKey = 'SutcuqvSUtfX12wwW5bWhHEd9tnMxItrzcSbLvYm'

function getData () {
    return fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${datePicker.value}`)
    .then((data) => {
        console.log(data)
        displayData (data)
    })
    .catch(error => console.error('Error:', error))
}

function displayData (data) {
    //grab and change the content of the elements
    // const photeOneImg = document.querySelector('#photoContainer').firstChild.nextSibling.firstElementChild
    const photeOneImg = document.querySelector('#photoOneImg')
    // const photeTwoImg = document.querySelector('#photeTwoImg') 
    // const photeThreeImg = document.querySelector('#photeThreeImg') 

    const photoOneTitle = document.querySelector('#photoOneTitle') 
    // const photoTwoTitle = document.querySelector('#photoTwoTitle') 
    // const photoThreeTitle = document.querySelector('#photoThreeTitle') 

    const photoOneDate = document.querySelector('#photoOneDate') 
    // const photoTwoDate = document.querySelector('#photoTwoDate') 
    // const photoThreeDate = document.querySelector('#photoThreeDate') 

    photeOneImg.src = data.url
    // photeTwoImg.src = data[1].url
    // photeThreeImg .src = data[2].url

    photoOneTitle.textContent = data.title
    // photoTwoTitle.textContent = data[1].title
    // photoThreeTitle.textContent = data[2].title

    photoOneDate.textContent = data.date
    // photoTwoDate.textContent = data[1].date
    // photoThreeDate.textContent = data[2].date
}
