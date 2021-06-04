window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    setDateMinMax ()
    document.querySelector('#lazyMsgOne').style.display = 'none'
    document.querySelector('#lazyMsgTwo').style.display = 'none'
    document.querySelector('#lazyMsgThree').style.display = 'none'
    
    disPlayComment();



});

// how to get the next date https://flaviocopes.com/how-to-get-tomorrow-date-javascript/#:~:text=getDate()%20%2B%201%20%2C%20you',year%2C%20if%20it's%2031%20December.&text=tomorrow%20is%20now%20a%20Date%20object%20representing%20tomorrow's%20date.

let datePicker = document.querySelector('#date-picker')


// set timepicker min and max date
function setDateMinMax () {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate()-2);
    const maxDateYear = maxDate.getFullYear(); // number type
    let maxDateMonth = maxDate.getMonth() +1; 
    if (maxDateMonth < 10) {maxDateMonth = '0' + maxDateMonth.toString()}
    let maxDateDate = maxDate.getDate();
    if (maxDateDate < 10) {maxDateDate = '0' + maxDateDate.toString()}

    datePicker.setAttribute('min','1995-06-16')
    datePicker.setAttribute('max',`${maxDateYear}-${maxDateMonth}-${maxDateDate}`)

    initPage (maxDateYear,maxDateMonth,maxDateDate)

}

const apiKey = 'SutcuqvSUtfX12wwW5bWhHEd9tnMxItrzcSbLvYm'

function initPage (maxDateYear,maxDateMonth,maxDateDate) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${maxDateYear}-${maxDateMonth}-${maxDateDate}`)
    .then(res => res.json())
    .then((data) => {
        displayData (data)
    })
    .catch(error => console.error('Error:', error))
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
            photeOneImg.className = 'url'
            photeOneImg.id = 'photeOneImg'
            photeOneImg.src = data[0].url
            photoOneMediaWrapper.append(photeOneImg)
        } else {
            const photeOneVideo = document.createElement('iframe')
            photeOneVideo.className = 'url'
            photeOneVideo.id = 'photeOneVideo'
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
        document.querySelector('#photoTwoInfoContainer').style.display='';
        document.querySelector('#lazyMsgTwo').style.display = 'none'
        if (data[1].media_type === 'image') {
            const photeTwoImg = document.createElement('img')
            photeTwoImg.className = 'url'
            photeTwoImg.src = data[1].url
            photoTwoMediaWrapper.append(photeTwoImg)
        } else {
            const photeTwoVideo = document.createElement('iframe')
            photeTwoVideo.className = 'url'
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
            photeThreeImg.className = 'url'
            photeThreeImg.id = 'photeThreeImg'
            photeThreeImg.src = data[2].url
            photoThreeMediaWrapper.append(photeThreeImg)
        } else {
            const photeThreeVideo = document.createElement('iframe')
            photeThreeVideo.className = 'url'
            photeThreeVideo.src = data[2].url
            photeThreeVideo.id = 'photeThreeVideo'
            photoThreeMediaWrapper.append(photeThreeVideo)
        }
        photoThreeTitle.textContent = data[2].title
        photoThreeDate.textContent = data[2].date
    }
 
    displayLike()
    console.log('displayData')
}



const likeBtnClick = (item) => {
    document.querySelector('.like').addEventListener('click', (e) => {
        console.log(e.target)
        // console.log(e.target.parentNode.parentNode.children[3]) => date.date
        const likeP = e.target.parentNode.children[1]
        let likeDate = e.target.parentNode.parentNode.children[3].textContent
        let likeNum;


            if (likeDate === item.date) {
                let likeNumInDataBase = parseInt(item.like)
                console.log(likeNumInDataBase)
                likeNum = likeNumInDataBase +1;
                console.log(likeNum)
                likeP.textContent = `${likeNum} likes`;
                console.log(likeP)
                let itemId = item.id;
                console.log(itemId)
                patchDatabase(itemId,likeDate,likeNum)
                console.log('here')
                
            } 




            })
   


}


// //like button event listener (count likes)
// const likeBtnClick = (item) => {
//     const likeBtns = document.querySelectorAll('.like');
//     for (likeBtn of likeBtns) {
//         likeBtn.textContent = '❤️';
//         // console.log('dateonpage:',likeBtn.parentNode.nextElementSibling.nextElementSibling)
       
//         likeBtn.addEventListener('click', (e) => {
//             console.log(e.target)
//             // console.log(e.target.parentNode.parentNode.children[3]) => date.date
//             const likeP = e.target.parentNode.children[1]
//             let likeDate = e.target.parentNode.parentNode.children[3].textContent
//             let likeNum;

//             if (likeDate === item.date) {
//                 let likeNumInDataBase = parseInt(item.like)
//                 console.log(likeNumInDataBase)
//                 likeNum = likeNumInDataBase +1;
//                 console.log(likeNum)
//                 likeP.textContent = `${likeNum} likes`;
//                 console.log(likeP)
//                 let itemId = item.id;
//                 console.log(itemId)
//                 patchDatabase(itemId,likeDate,likeNum)
//             } else {
//                 likeNum = 1;
//                 likeP.textContent = `1 like`;
//                 console.log(console.log(e.target))
//                 // postDatabase(likeDate,likeNum)
//             }

//         })
//     }
// }


//comment form event listener
// document.querySelector('#comments').innerHTML = '';
document.querySelector('#commentForm').addEventListener('submit',(e) => {
    e.preventDefault();
    let commentLi = document.createElement('li')
    commentLi.textContent =  document.querySelector('#commentBox').value;
    commentLi.className = "comment"
    document.querySelector('#comments').append(commentLi);
    alert('★ The universe thanks you for sharing ☆');

    createComment(commentLi)
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



//function to create new item for the local database
const postDatabase = (likeDate,likeNum) => {
    fetch(`http://localhost:3000/item`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: likeDate,
            like: likeNum
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('POST Error: ', error))
}

//function to create new comment to the local database
const createComment = (commentLi) => {
    let comment = 
                {
                    comment: commentLi.textContent
                };
    let keyName = 'comments';
    // console.log(keyName,comment)
    postDatabase(keyName,comment);
}


//PATCH to the local database
function patchDatabase(itemId,likeDate,likeNum){
    fetch(`http://localhost:3000/item/${itemId}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: likeDate,
            like: likeNum
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('POST Error: ', error))
}

//del item on database base on id
function deleteData(keyName,id){
    fetch(`http://localhost:3000/${keyName}/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    .catch(error => console.error('Error:', error))
}

//Fetch likes
const displayLike = () => {
    fetch(`http://localhost:3000/item`)
    .then(res => res.json())
    .then((data) => {
        data.forEach(item => {
            // console.log('elem:',elem)
            // console.log('elem.date:', elem.date, 'dateonpage:',  document.querySelector('#photoOneDate').textContent)
            if (item.date === document.querySelector('#photoOneDate').textContent) {
                document.querySelector('#photoOneDate').parentNode.children[1].children[1].textContent = `${item.like} like`;
            } else if (item.date === document.querySelector('#photoTwoDate').textContent) {
                document.querySelector('#photoTwoDate').parentNode.children[1].children[1].textContent = `${item.like} like`;
            } else if (item.date === document.querySelector('#photoThreeDate').textContent){
                document.querySelector('#photoThreeDate').parentNode.children[1].children[1].textContent = `${item.like} like`;
            } else {
            }
            likeBtnClick(item)
            // console.log('item')
        })
    })

}




//display comment when it first load
const disPlayComment = () => {
    document.querySelector('#comments').innerHTML = '';
    
    fetch(`http://localhost:3000/comments`)
    .then(res => res.json())
    .then((data) => {
        data.forEach(elem => {
            let commentLi = document.createElement('li');
            commentLi.textContent = elem.comment;
            commentLi.className = 'comment'
            document.querySelector('#comments').appendChild(commentLi);
        })
    })
}










// deleteData('comments','FtvJQRF')