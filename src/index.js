document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

function handleSubmit(e){
    e.preventDefault()
    dog = {
        id: selectedDog,
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }
    patchDog(dog)
 }

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => addDogToTable(dog)))
}

function fetchOneDog(id) {
    fetch(`http://localhost:3000/dogs/${id}`)
    .then(resp => resp.json())
    .then(dog => populateForm(dog))
}

function patchDog(dog) {
    configObj = {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        }, 
         body: JSON.stringify(dog)
        }
    table.innerHTML= ''

    fetch(`http://localhost:3000/dogs/${dog.id}`, configObj)
    .then(resp => resp.json())
    .then(dog => fetchDogs())
}

//addDogToTable 
function addDogToTable(dog) {
    table = document.querySelector('#table-body')
    let tr = document.createElement('tr')
    let name = document.createElement('td')
    let breed = document.createElement('td')
    let sex = document.createElement('td')
    let edit = document.createElement('td')
    let btn = document.createElement('button')

    name.innerText = dog.name 
    breed.innerText = dog.breed
    sex.innerText = dog.sex
    btn.innerText = "Edit Doggo"
    btn.id = dog.id
    edit.appendChild(btn)
    btn.addEventListener('click', handleClick)
    

    tr.append(name, breed, sex, edit)
    table.appendChild(tr)
}

function handleClick(e) {
    fetchOneDog(e.target.id)
}

function populateForm(dog) {
    selectedDog = dog.id
    let form = document.querySelector('#dog-form')
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.addEventListener('submit', handleSubmit)
}
