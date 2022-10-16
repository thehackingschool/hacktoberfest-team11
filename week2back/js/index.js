const listOfVideos = [{
    video: '../assets/videos/selfconfidence.mp4'
},
{
    video: '../assets/videos/stagefear.mp4'
},
{
    video: '../assets/videos/CommunicationSkills.mp4'
},
{
    video: '../assets/videos/DecisionMaking.mp4'
},
{
    video: '../assets/videos/Teamwork.mp4'
},
{
    video: '../assets/videos/1:1.mp4'
},
]

const listOfItems = [
{
    title: 'Self Confidence',
    link: '#',
thumbnail: 'assets/image/selfconfidence.png',
},
{
    title: 'Stage Fear',
    link: '#',
    thumbnail: 'assets/image/stagefear.png',
},
{
    title: 'Communication',
    link: '#',
    thumbnail: 'assets/image/CommunicationSkills.png',
},
{
    title: 'Decision Making',
    link: '#',
    thumbnail: 'assets/image/DecisionMaking.png',
},
{
    title: 'Team Work',
    link: '#',
    thumbnail: 'assets/image/Teamwork.png',
},
{
    title: '1:1 With Meraj Faheem',
    link: '#',
    thumbnail: 'assets/image/1:1.png',
}
];

// Home page elements
const boxLine = document.getElementById('box__line');
const exploreBtn = document.getElementById('explore');
const boxContainer = document.getElementById('box__container');
const containerLine = document.getElementById('box__container--line');
const box = document.getElementById('box');
const title = document.getElementById('title');
const wrapper = document.getElementById('wrapper');

//all footer links
const footerLinks = document.querySelectorAll('.footer__social--item');

//the scrolling line over footer links
const footerLine = document.querySelector('.footer__social--line');

const linkTypes = new Map([
['FB', 'translate(0px, 0px) scale(0.3, 1)'],
['TW', 'translate(52.994px, 0px) scale(0.3, 1)'],
['YT', 'translate(105.989px, 0px) scale(0.3, 1)'],
['default', 'translate(0px, 0px) scale(0.2, 1)']
])

footerLinks.forEach(e => {
e.addEventListener('mouseover', (item) => {
    footerLine.style.transform = linkTypes.get(item.target.innerHTML);
    item.target.classList.add('highlight');
})
e.addEventListener('mouseout', (item) => {
    footerLine.style.transform = linkTypes.get('default');
    item.target.classList.remove('highlight');
})
});

const videoModal = (item) => {

const body = document.querySelector('body');

let html = `<div class="videoModal" id="videoModal">
    <div class="videoModal__head">
        <div class="videoModal__head--close" id="close"></div>
    </div>
    <div class="videoModal__body">
        <video class="video__player" autoplay controls playsinline>
            <source src=${item.video} type="video/mp4">
        </video>
    </div>
</div>`;
body.insertAdjacentHTML('beforeend', html);

const closeModal = document.getElementById('close');
const videoModalComponent = document.getElementById('videoModal');

videoModalComponent? 
closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target){
        videoModalComponent.innerHTML = "";
        videoModalComponent.remove();
    }
}): null;

}

const mapVideos = (id) => {
// 1 is the id 
//0 is where the link is
listOfVideos.map((item, index) => {
    if(index === id - 1){
        videoModal(item)
    }
})
}

// thumbnails functionality below
let count = 0;

const renderThumbnails = (item) => {
item? count++ : count;
count = count.toString();
const typeNumWord = new Map([
    ['1', 'one'],
    ['2', 'two'],
    ['3', 'three'],
    ['4', 'four'],
    ['5', 'five'],
    ['6', 'six']
]);

let html = `<div class="wrapper__container--box ${typeNumWord.get(count)}" id=${count}>
        <div class="thumbnail">
            <a class="thumbnail__img" href=${item.link}>
                <span class="thumbnail__img--overlay"></span>
                <img src=${item.thumbnail}>
            </a>
            <h2>${count}. ${item.title}</h2>
        </div>
    </div>`;

document.getElementById('wrapper__container').insertAdjacentHTML('beforeend', html);

// ************************************CAROUSEL************************************

const listOfThumbnails = document.querySelectorAll('.wrapper__container--box');
const classesOfTheThumbnails = ['two', 'three', 'four', 'five', 'six'];

const overlays = document.querySelectorAll('.thumbnail__img--overlay');

overlays.forEach(e => e.addEventListener('click', evt => {
evt.preventDefault();
evt.stopImmediatePropagation();
mapVideos(evt.target.parentNode.parentNode.parentNode.id);
}))

const mapFlow = new Map([
['1', ['2', '3', '4', '5', '6']],
['2', ['3', '4', '5', '6', '1']],
['3', ['4', '5', '6', '1', '2']],
['4', ['5', '6', '1', '2', '3']],
['5', ['6', '1', '2', '3', '4']],
['6', ['1', '2', '3', '4', '5']]
]);

const useId = (e) => {
//3. take id
//if id = 1
//create an arr - take mapFlow to create an array of id
//loop through and add classes in sequence
if(e){
    let arr = mapFlow.get(e); //e is the hovered element - if there is an id there is a value

    if(arr.length > 0){

        //1. into all thumbnails
        for(let x = 0; x < listOfThumbnails.length; x++){

            for(let a = 0; a < classesOfTheThumbnails.length; a++){
                if(listOfThumbnails[x].classList.contains(classesOfTheThumbnails[a])){
                    listOfThumbnails[x].classList.remove(classesOfTheThumbnails[a]);
                }
                else if(listOfThumbnails[x].classList.contains('one')){
                    listOfThumbnails[x].classList.remove('one')
                }
            }
        }

        //our custom array of path based on id
        for(let i = 0; i < arr.length; i++){

            //number of classes
            for(let j = 0; j < classesOfTheThumbnails.length; j++){
                
                //add classes
                document.getElementById(arr[i]).classList.add(classesOfTheThumbnails[i]);
            }
        }

        //2. assign e class one
        document.getElementById(e).classList.add('one');
    }

}
}

const mouseOverFunc = (item) => {
useId(item.currentTarget.id);
}

listOfThumbnails?
listOfThumbnails.forEach(e => {
    //e is the element with the id numbers
        if(e.hasAttribute('id')){
            e.addEventListener('mouseover', item => setInterval(mouseOverFunc(item), 500));
        }
}): null;
//************************************END OF CAROUSEL Functionality************************************
}

const addWrapperContainer = () => {
let wrapperContainer = `<div class="wrapper__container" id="wrapper__container"></div>`;
wrapper.insertAdjacentHTML('beforeend', wrapperContainer);

listOfItems.map(e => renderThumbnails(e));
}

exploreBtn? exploreBtn.addEventListener('click', (e) => {
e.preventDefault();
//paragraph - first page
boxLine.style.transform = 'scale(0, 1)';

//para container - first page
boxContainer.style.transform = 'translate(100%, 0)';

//para scoll line -fi
containerLine.style.transform = 'scale(0, 1)';
const body=document.querySelector('body');
setTimeout(()=>{
    body.style.background='radial-gradient(circle at center, var(--color-primary-light) 0, var(--color-primary-light) 0, var(--color-primary-dark))'
    boxContainer.style.display = 'none';
    box.style.display = 'none';
}, 200);

setTimeout(() => {
    //remove title
    boxLine.style.transform = 'scale(0, 1)';
    title.style.display = 'none';

    //clear container
    wrapper.innerHTML = '';

    //add list of videos
    addWrapperContainer();
}, 300)
}): null;





