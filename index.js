window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

// how to get the next date https://flaviocopes.com/how-to-get-tomorrow-date-javascript/#:~:text=getDate()%20%2B%201%20%2C%20you',year%2C%20if%20it's%2031%20December.&text=tomorrow%20is%20now%20a%20Date%20object%20representing%20tomorrow's%20date.


// console.log(document.querySelector('#date-picker'))
let datePicker = document.querySelector('#date-picker')
// datePicker.datePicker('getDate')

// console.log(datePicker.value);
//console.log(datePicker.value); => 2021-06-14 => is the format we want to use

datePicker.addEventListener('change', (e) =>{
    // console.log(typeof datePicker.value) => string
    const startDate = new Date(`${datePicker.value}`); // date type 
    const endDate = new Date(startDate); //date type
    endDate.setDate(endDate.getDate() + 3);
    const endDateYear = endDate.getFullYear(); // number type
    const endDateMonth = endDate.getMonth() +1; 
    const endDateDate = endDate.getDate();

    // console.log(
    //     'startDate:', typeof startDate,
    //     'endDateYear', endDateYear,
    //     'endDateMonth',endDateMonth,
    //     'endDateDate',endDateDate,
    //     'endDate',endDate
    // );
    getData (endDateYear,endDateMonth,endDateDate) 
})

const apiKey = 'SutcuqvSUtfX12wwW5bWhHEd9tnMxItrzcSbLvYm'

function getData (endDateYear,endDateMonth,endDateDate) {
    // fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${datePicker.value}`)
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${datePicker.value}&end_date=${endDateYear}-${endDateMonth}-${endDateDate}`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        displayData (data)
    })
    .catch(error => console.error('Error:', error))
}

function displayData (data) {

    const photoOneMediaWrapper = document.querySelector('#photoOneMediaWrapper')
    const photeTwoMediaWrapper = document.querySelector('#photoTwoMediaWrapper') 
    const photeThreeMediaWrapper = document.querySelector('#photoThreeMediaWrapper') 


    const photoOneTitle = document.querySelector('#photoOneTitle') 
    const photoTwoTitle = document.querySelector('#photoTwoTitle') 
    const photoThreeTitle = document.querySelector('#photoThreeTitle') 

    const photoOneDate = document.querySelector('#photoOneDate') 
    const photoTwoDate = document.querySelector('#photoTwoDate') 
    const photoThreeDate = document.querySelector('#photoThreeDate') 


    photoOneMediaWrapper.innerHTML = ''
    photeTwoMediaWrapper.innerHTML = ''
    photeThreeMediaWrapper.innerHTML = ''

    if (data[0].media_type === 'image') {
        const photeOneImg = document.createElement('img')
        photeOneImg.src = data[0].url
        photoOneMediaWrapper.append(photeOneImg)
    } else {
        const photeOneVideo = document.createElement('iframe')
        photeOneVideo.src = data[0].url
        photoOneMediaWrapper.append(photeOneVideo)
    }

    if (data[1].media_type === 'image') {
        const photeTwoImg = document.createElement('img')
        photeTwoImg.src = data[1].url
        photoTwoMediaWrapper.append(photeTwoImg)
    } else {
        const photeTwoVideo = document.createElement('iframe')
        photeTwoVideo.src = data[1].url
        photoTwoMediaWrapper.append(photeTwoVideo)
    }

    if (data[2].media_type === 'image') {
        const photeThreeImg = document.createElement('img')
        photeThreeImg.src = data[2].url
        photoThreeMediaWrapper.append(photeThreeImg)
    } else {
        const photeThreeVideo = document.createElement('iframe')
        photeThreeVideo.src = data[2].url
        photoThreeMediaWrapper.append(photeThreeVideo)
    }


    photoOneTitle.textContent = data[0].title
    photoTwoTitle.textContent = data[1].title
    photoThreeTitle.textContent = data[2].title

    photoOneDate.textContent = data[0].date
    photoTwoDate.textContent = data[1].date
    photoThreeDate.textContent = data[2].date
}




//like button event listener
const likeBtns = document.querySelectorAll('.like');
for (likeBtn of likeBtns) {
    likeBtn.addEventListener('click', (e) => {
    if (e.target.textContent === 'Like ♡') {
        e.target.textContent = '❤️';
        e.target.style.color = 'red';
    } else {
        e.target.textContent = 'Like ♡'
        e.target.style.color = '';
    } 
    })
}

//comment form event listener
// document.querySelector('#comments').innerHTML = '';
document.querySelector('#commentForm').addEventListener('submit',(e) => {
    e.preventDefault();
    let commentLi = document.createElement('li')
    commentLi.textContent =  document.querySelector('#commentBox').value;
    document.querySelector('#comments').append(commentLi);


})