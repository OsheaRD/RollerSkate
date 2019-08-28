var songArray = []

document.addEventListener('DOMContentLoaded', function(){
    let modals = document.querySelectorAll('.modal')
    M.Modal.init(modals)
    searchSongs()
   
    })


function searchSongs(){
    document.getElementById('searchButton').addEventListener('click', function(e){
    e.preventDefault()
    let userSearchString = document.getElementById('textInput').value
    let URLencoded = encodeURIComponent(userSearchString)
    let baseQuery =  'https://api.happi.dev/v1/music?q='
    let apiKey = '&limit=&apikey=5a5b0fqDJyMbS7foYe8e1HlTIy8Y4r2P0yEZT6YyonWp2XkFGYdNpJL9'
    fetch(baseQuery+URLencoded+apiKey)
    .then(extractInfo) 
    .then(apiResponse)

    function extractInfo(response){return response.json()}
    function apiResponse (content){
    returnArray = content.result


        var musicSearchHTML = returnArray.map(function (musicContent){
   
  
            return `<div class = col-sm-4>
            <div class = movie card style = width: 18rem;>
            <img class = card-img-top src = ${musicContent.cover} alt = 'Picture Unavailable'>
            <div class = card-body>
            <div class = movieInfo>
            <div class = card-title><h5> ${musicContent.track} </h5></div>
            <div class = card-subtitle year><h5> ${musicContent.artist} </h5></div>
            </div>
            <button type ='button' class="btn btn-primary" id='addSongButton' onclick = 'saveToSonglist("${musicContent.id_track}")'>Add To Song List</a>
            </div> </div> </div>`
           
        }) 
        document.getElementById('steve').innerHTML = '<div class = row>' +musicSearchHTML.join('') + '</div>' 
    }
})
}

function saveToSonglist(trackID){
    let song = returnArray.find(function (song){ 
       return trackID == song.id_track
    })
    songArray.push(song)
    let user = auth.currentUser.uid
     db.collection('songs').doc(user).get().then((docSnapshot) =>{
        if(docSnapshot.exists){
            db.collection('songs').doc(user).get().then(stuffs)
        }
        else{db.collection('songs').doc(user).set({
            song: songArray
            } ,{ merge: true })}
    }
    )
    function stuffs(data)
    {
        existingData = data.data().song
        songArray = songArray.concat(existingData)
        db.collection('songs').doc(user).set({
            song: songArray
            } ,{ merge: true })
        songArray = []
    }

  
}


    

