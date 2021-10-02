window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    setDateMinMax ()
    document.querySelector('#lazyMsgOne').style.display = 'none'
    document.querySelector('#lazyMsgTwo').style.display = 'none'
    document.querySelector('#lazyMsgThree').style.display = 'none'
    
    disPlayComment();
    fetchLocalJson();
});

let LOCAL_DB = [];
let SAVE_DB = [];

// set timepicker min and max date
let datePicker = document.querySelector('#date-picker')
function setDateMinMax () {
    const today = new Date();
    const maxDate = new Date(today);
    console.log(today);
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
        workflow(data);
        fetchLocalJson();
        displayLike();
    })
    .catch(error => console.error('Error:', error))
}

// fetch from nasa
const apiKey = 'SutcuqvSUtfX12wwW5bWhHEd9tnMxItrzcSbLvYm'

function initPage (maxDateYear,maxDateMonth,maxDateDate) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${maxDateYear}-${maxDateMonth}-${maxDateDate}`)
    .then(res => res.json())
    .then((data) => {
        workflow(data);
        displayLike();
    })
    .catch(error => console.error('Error:', error))
}


//fetch from local json
const fetchLocalJson = () => {
    fetch(`http://localhost:3000/likes`)
    .then(res => res.json())
    .then((data) => {
         data.forEach( (item) => LOCAL_DB.push({"id": item.id,
                                                "date": item.date,
                                                "like": item.like}))
    })
    .catch(error => console.error('Error:', error))
}


//Can't decide button event listener
document.querySelector('#random').addEventListener('click', (e) => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=3`)
    .then(res => res.json())
    .then((data) => {
        workflow(data);
        fetchLocalJson();
        displayLike();
    })
})

//all the work require to post to local json
function workflow(data){
    displayData (data);
    ListAllToStore(data);
    postLocalJson();
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
 
    // displayLike()
    // console.log('displayData')
}


const ListAllToStore = (data) => {
    let flag = false;
    data.forEach((elem) => {
        LOCAL_DB.forEach((item) => {
            if (item.date === elem.date){
                flag = true;
            }
        })
        if (!flag){
            SAVE_DB.push(elem.date);
        }
        else{
            flag = false;
        }
    })
    
}

const postLocalJson = () => {
    // console.log(SAVE_DB);
    SAVE_DB.forEach((item) => {
            fetch(`http://localhost:3000/likes`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: item,
                like: 0
            })
        })
        .then(res => res.json())
        .then(data => {
            SAVE_DB = [];
        })
        .catch(error => console.error('POST Error: ', error))   
    })
}


document.querySelector('.like1').addEventListener('click', (e) => {
    // console.log(e.target.parentNode.parentNode.children[3]) => date.date
    getlikes(e);
})

document.querySelector('.like2').addEventListener('click', (e) => {
    // console.log(e.target.parentNode.parentNode.children[3]) => date.date
    getlikes(e);

})

document.querySelector('.like3').addEventListener('click', (e) => {
    // console.log(e.target.parentNode.parentNode.children[3]) => date.date
    getlikes(e);

})
function getlikes(e){
    const likeP = e.target.parentNode.children[1]
    let likeDate = e.target.parentNode.parentNode.children[3].textContent
    let likeNum;
    console.log(LOCAL_DB);
    LOCAL_DB.forEach((item)=> {
        if(item.date === likeDate){
            patchDatabase(item.id, item.date, ++item.like)
        }
    })
    displayLike();
}


function patchDatabase(itemId,likeDate,likeNum){
    console.log(itemId,likeDate,likeNum)
    fetch(`http://localhost:3000/likes/${itemId}`,{
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


//Fetch likes
const displayLike = () => {
    fetch(`http://localhost:3000/likes`)
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


//comment form event listener
// document.querySelector('#comments').innerHTML = '';
document.querySelector('#commentForm').addEventListener('submit',(e) => {
    e.preventDefault();
    let commentLi = document.createElement('li')
    commentLi.textContent =  document.querySelector('#commentBox').value;
    commentLi.className = "comment"
    document.querySelector('#comments').append(commentLi);
    alert('★ The universe thanks you for sharing ☆');

    postDatabase(commentLi)
})



//function to create new item for the local database
const postDatabase = (commentLi) => {
    fetch(`http://localhost:3000/comments`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment:commentLi.textContent
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('POST Error: ', error))
}

document.querySelectorAll('.photoMediaWrapper').forEach((mediaWrapper) => {
    mediaWrapper.addEventListener('click', (e) => {
        let large = e.target.cloneNode(true);
        large.className='';
        large.id ='';
        console.log(large)


    })




})