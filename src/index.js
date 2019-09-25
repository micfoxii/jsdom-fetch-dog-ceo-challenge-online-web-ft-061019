// console.log('%c HI', 'color: firebrick')

// Challenge 1 - fetch images from dog.ceo/api , parse response JSON, add image elements

function fetchImages(){
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    fetch(imgUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            addImages(json)
        })
}

function addImages(json){
    const dogImgLinks = json.message
    const dogDiv = document.querySelector("#dog-image-container")

    dogImgLinks.forEach(link => {
        let dImg = document.createElement("img")
        dImg.src = link
        dImg.alt = "breed image"
        dogDiv.appendChild(dImg)
    })
}

// Challenge 2

function fetchBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(json){
            addBreeds(json)
        })
}

// need to list sub breeds
function addBreeds(json) {
    const breeds = Object.entries(json.message);
    const breedsUl = document.querySelector("#dog-breeds");

        breeds.forEach(breed => {
            const breedName = breed[0]
            
            if(breed[1].length == 0) {
                let li = document.createElement("li")
                li.innerText = breedName; 
                li.setAttribute('id', `${breedName}`)
                li.addEventListener("click", changeColor)
                breedsUl.appendChild(li);
            } else {
               const subBreeds = breed[1]

               subBreeds.forEach(subBreed => {
                subBreedName = `${subBreed} ${breedName}`
                let li = document.createElement("li")
                li.textContent = subBreedName
                li.setAttribute('id', `${breedName}`)
                li.addEventListener("click", changeColor)
                breedsUl.appendChild(li);
               })
            }
         })

}

function changeColor(event) {
    event.currentTarget.style.color = "blue"
}

// function breedDropDown(){
//     let dropDown = document.querySelector("#breed-dropdown")
    
//     dropDown.addEventListener("change", function(event){
//         let index = dropDown.selectedIndex
//         let allBreeds = document.querySelectorAll("li")

//         allBreeds.forEach(
//             function(currentIndex){
//                 if (event.target.value != currentIndex.innerText[0]){
//                     currentIndex.style.display = "none"
//                 }
//                 else {
//                     currentIndex.style.display = "block"
//                 }
//             }
//         )
//     })
// }

document.addEventListener("DOMContentLoaded", function() {
    fetchImages()
    fetchBreeds()
    addBreeds()
    // breedDropDown()
});