const categories = () => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
};

const displayCategories = (data)=>{
    const categoryContainer = document.getElementById('categories')
   
    data.forEach(item => {
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML =`
        <button id="btn-${item.category_id}" onclick = "loadCategoryVideos(${item.category_id})" class="btn  category-btn"> ${item.category}
        </button>        `
        categoryContainer.append(buttonContainer)
    });
}

const allVideos = (search = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then(res => res.json())
    .then(data => displayAllVideos(data.videos))
}
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const buttonActive = document.getElementById(`btn-${id}`);
        buttonActive.classList.add(`active`);
        displayAllVideos(data.category)
    })
}
const removeActive = () => {
    const buttons = document.getElementsByClassName("category-btn")
    for (let button of buttons) {
        button.classList.remove("active")        
    }

}
const displayAllVideos = (videos) => {
    const videoContainer = document.getElementById('allvideos');
    videoContainer.innerHTML = "";
    if (videos.length === 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="h-60 flex justify-center items-center">
        <img src="./assets/Icon.png" alt="">
        
        </div>
        <h2 class="font-bold text-2xl text-center"> No Videos Here </h2>
  
        `;
        return;
        
    }
    else{
        videoContainer.classList.add("grid")
    }
    videos.forEach(video => {
        const div = document.createElement('div');
        div.classList = "card card-compact shadow-xl"
        div.innerHTML=`
        <figure class = "h-52 relative">
            <img
            class = "object-cover w-full h-full"
            src= ${video.thumbnail}
            alt="${video.description}" />
            ${video.others.posted_date?.length === 0? "" : `<span class="absolute right-4 bottom-2 bg-black text-white rounded-xl p-2">${convertTime(video.others.posted_date)}</span>`}            
        </figure>
        <div class="px-0 py-2">
            <div class = "flex gap-5">
                <div class = "w-1/12 rounded-full">
                    <img
                        class = "object-cover rounded-full"
                        src= ${video.authors[0].profile_picture}
                        alt="${video.authors[0].profile_name}" />                                    
                </div>
                <div class = "">
                    <h4 class = " text-2xl font-bold"> ${video.title}</h4>
                    <div class = "flex items-center gap-3 ">
                        <p class = "text-gray-500"> ${video.authors[0].profile_name}</p>
                        <p>
                        ${video.authors[0].verified ? `<img
                            class = "w-5"
                            src= " https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"
                            alt="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ""}                            
                        </p>    
                    </div>
                    <p> ${video.others.views}</p> 
                    <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error"> Details </button> </P                   
                </div>
            </div>
        </div>
    `
    videoContainer.append(div)    
    });
}


const loadDetails = async (videoDetails) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoDetails}`
    const res = await fetch(url)
    const data = await res.json();
    displayDetails(data.video)
}
const displayDetails = (video) => {

    const modal = document.getElementById("modal-content")
    modal.innerHTML =`
    <img src="${video.thumbnail}" alt="">
    <p> ${video.description}
    </p>
    `
    document.getElementById("showModalData").click();
}



const search = document.getElementById("search-input")
search.addEventListener("keyup" , (e) => {
    allVideos(e.target.value)
})

categories();
allVideos();

function convertTime(seconds) {
    const secondsInYear = 31536000  //365 * 24 * 60 * 60;
    const secondsInMonth = 2592000    //30 * 24 * 60 * 60;
    const secondsInDay = 86400     //24 * 60 * 60;
    const secondsInHour = 3600   //60 * 60;
    const secondsInMinute = 60;

    // if (seconds >= ) {
        
    // }
    
    const years = Math.floor(seconds / secondsInYear);
    const remainYears = seconds % secondsInYear;



    const months = Math.floor(remainYears / secondsInMonth);
    const remainMonth = remainYears % secondsInMonth;
    
    
    const days = Math.floor(remainMonth / secondsInDay);
    const remainDays = remainMonth % secondsInDay;


    const hours = Math.floor(remainDays / secondsInHour);
    const remainHours = remainDays % secondsInHour;

    const minutes = Math.floor(remainHours / secondsInMinute);
    const remainMinutes = remainHours % secondsInMinute;

    // console.log("result" ,years, months, days, hours, minutes, seconds, "remain",  remainYears, remainMonth ,remainDays, remainHours,remainMinutes ) 

    // if (seconds <= secondsInYear) {
    //     console.log("result year" ,years, months, days, hours, minutes,  "remain", remainYears, remainMonth ,remainDays, remainHours,remainMinutes ) 
    // }
    if (seconds >= secondsInYear) {
        return `${years} years ago`
        // console.log("result year" ,years, months, days, hours, minutes,  "remain", remainYears, remainMonth ,remainDays, remainHours,remainMinutes ) 
    }
    if (seconds <= secondsInYear && seconds > secondsInMonth) {
        return `${months} months ago`
        console.log("result month" ,years, months, days, hours, minutes,  "remain", remainYears, remainMonth ,remainDays, remainHours,remainMinutes ) 
    }
    if (seconds <= secondsInMonth  && seconds > secondsInDay) {
         return `${days} days ago`
        console.log("result day" ,years, months, days, hours, minutes,  "remain", remainYears, remainMonth ,remainDays, remainHours,remainMinutes ) 
    }
    if (seconds <=  secondsInDay && seconds > secondsInHour) {
        return `${hours} hours ${minutes} minutes ago`
        console.log("result hr" ,years, months, days, hours, minutes,  "remain", remainYears, remainMonth ,remainDays, remainHours,remainMinutes ) 
    }
    if (seconds <= secondsInHour && seconds > secondsInMinute) {
        return `${minutes} minutes ${seconds} seconds ago`
        console.log("result mins" ,years, months, days, hours, minutes,  "remain", remainYears, remainMonth ,remainDays, remainHours,remainMinutes ) 
    }
    else{
        return `${seconds} seconds ago` ; 
    }

    

    
}

