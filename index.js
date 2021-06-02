window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    setDateMinMax ()
    document.querySelector('#lazyMsgOne').style.display = 'none'
    document.querySelector('#lazyMsgTwo').style.display = 'none'
    document.querySelector('#lazyMsgThree').style.display = 'none'
});

// how to get the next date https://flaviocopes.com/how-to-get-tomorrow-date-javascript/#:~:text=getDate()%20%2B%201%20%2C%20you',year%2C%20if%20it's%2031%20December.&text=tomorrow%20is%20now%20a%20Date%20object%20representing%20tomorrow's%20date.

let datePicker = document.querySelector('#date-picker')
// datePicker.min= "1995-6-16"
// datePicker.min= `${endDateYear}-${endDateMonth}-${endDateDate}`
// $(document).ready(function() {
//     console.log(datePicker)
//     datePicker.datePicker()
    // .datePicker({
    // minDate: new Date(1995, 6,16),
    // maxDate: -2
// })
// });


// set timepicker min and max date
function setDateMinMax () {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate()-2);
    console.log(maxDate)
    const maxDateYear = maxDate.getFullYear(); // number type
    let maxDateMonth = maxDate.getMonth() +1; 
    if (maxDateMonth < 10) {maxDateMonth = '0' + maxDateMonth.toString()}
    let maxDateDate = maxDate.getDate();
    if (maxDateDate < 10) {maxDateDate = '0' + maxDateDate.toString()}

    datePicker.setAttribute('min','1995-06-16')
    datePicker.setAttribute('max',`${maxDateYear}-${maxDateMonth}-${maxDateDate}`)
}

datePicker.addEventListener('change', (e) =>{
    const startDate = new Date(`${datePicker.value}`); // date type 
    const endDate = new Date(startDate); //date type
    endDate.setDate(endDate.getDate() + 3);
    const endDateYear = endDate.getFullYear(); // number type
    const endDateMonth = endDate.getMonth() +1; 
    const endDateDate = endDate.getDate();
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

//function display data when after data is fetched
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

    
 
    if (data[0] === undefined) {
        document.querySelector('#lazyMsgOne').style.display = '';
        document.querySelector('#photoOneInfoContainer').style.display='none';
    } else {
        document.querySelector('#photoOneInfoContainer').style.display='';
        document.querySelector('#lazyMsgOne').style.display = 'none'
        if (data[0].media_type === 'image') {
            const photeOneImg = document.createElement('img')
            photeOneImg.src = data[0].url
            photoOneMediaWrapper.append(photeOneImg)
        } else {
            const photeOneVideo = document.createElement('iframe')
            photeOneVideo.src = data[0].url
            photoOneMediaWrapper.append(photeOneVideo)
        }
        photoOneTitle.textContent = data[0].title
        photoOneDate.textContent = data[0].date
    }   

    if (data[1] === undefined) {
        document.querySelector('#lazyMsgTwo').style.display = ''
        document.querySelector('#photoTwoInfoContainer').style.display='none';
    } else {
        console.log('else')
        document.querySelector('#photoTwoInfoContainer').style.display='';
        document.querySelector('#lazyMsgTwo').style.display = 'none'
        console.log(document.querySelector('#lazyMsgTwo'))
        if (data[1].media_type === 'image') {
            const photeTwoImg = document.createElement('img')
            photeTwoImg.src = data[1].url
            photoTwoMediaWrapper.append(photeTwoImg)
        } else {
            const photeTwoVideo = document.createElement('iframe')
            photeTwoVideo.src = data[1].url
            photoTwoMediaWrapper.append(photeTwoVideo)
        }
        photoTwoTitle.textContent = data[1].title
        photoTwoDate.textContent = data[1].date
    }

    if (data[2] === undefined) {
        document.querySelector('#lazyMsgThree').style.display = ''
        document.querySelector('#photoThreeInfoContainer').style.display='none';
    } else {
        document.querySelector('#photoThreeInfoContainer').style.display='';
        document.querySelector('#lazyMsgThree').style.display = 'none'
        if (data[2].media_type === 'image') {
            const photeThreeImg = document.createElement('img')
            photeThreeImg.src = data[2].url
            photoThreeMediaWrapper.append(photeThreeImg)
        } else {
            const photeThreeVideo = document.createElement('iframe')
            photeThreeVideo.src = data[2].url
            photoThreeMediaWrapper.append(photeThreeVideo)
        }
        photoThreeTitle.textContent = data[2].title
        photoThreeDate.textContent = data[2].date
    }
 
}




// //like button event listener (red heart)
// const likeBtns = document.querySelectorAll('.like');
// for (likeBtn of likeBtns) {
//     likeBtn.addEventListener('click', (e) => {
//     if (e.target.textContent === 'Like ♡') {
//         e.target.textContent = '❤️';
//         e.target.style.color = 'red';
//     } else {
//         e.target.textContent = 'Like ♡'
//         e.target.style.color = '';
//     } 
//     })
// }



//like button event listener (count likes)
const likeBtns = document.querySelectorAll('.like');
for (likeBtn of likeBtns) {
    likeBtn.textContent = '❤️';
    let likeNum = 0;
    likeBtn.addEventListener('click', (e) => {

        const likeP = document.querySelector('.likeP')
        likeNum += 1
        if (likeNum === 1) {
            likeP.textContent = '1 like'
        } else {
            likeP.textContent = `${likeNum} likes`
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
    alert('★ The universe thanks you for sharing ☆');
})


//Can't decide button event listener
document.querySelector('#random').addEventListener('click', (e) => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=3`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        displayData (data)
    })
})