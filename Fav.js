//global variables
var getpopularMoviesUrl ="http://api.themoviedb.org/3/movie/popular?api_key=396d01716a6019bdf6cfc72cf79ac7b9&language=en-US&page=1&callback=getPopularMovies"
var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=396d01716a6019bdf6cfc72cf79ac7b9&language=en-US&page=1&include_adult=false&callback=getSearchMovies&query="
//start executing when page load 
window.onload = function(){
	//the below code gets executes when browser load first
	var fav  = localStorage.getItem("fav");
	if(fav){
	var ids = fav.split(",");
	if(ids.length>0){
		//iterating over all the favorite ids and getting the details
		for(var i=0; i< ids.length; i++){
			var getDetailsURL = "https://api.themoviedb.org/3/movie/"+ids[i]+"?api_key=396d01716a6019bdf6cfc72cf79ac7b9&language=en-US&callback=getOneMOvieDetails"
			var script = document.createElement('script');
			script.src = getDetailsURL;
			document.body.appendChild(script);
       }
    }
  }
}

//this function execute once the response for one movie comes
//it creates a div dynamically
function getOneMOvieDetails(currentObj){
		 var list = document.getElementById("list");
	 	 var div = document.createElement('div');
	 	 div.innerHTML ='<div class="moviediv"><a href="MovieDetails.html?movieId='+currentObj.id+'" ><img src="https://image.tmdb.org/t/p/w92' + currentObj.poster_path + '" width="250" height="200"></a><p>'+currentObj.original_title+'</p><img class="del" src="http://cdn.onlinewebfonts.com/svg/img_416864.png" onclick="deleteFav('+currentObj.id+')" height="20" width="20"></img></div>';
         list.appendChild(div.firstChild);

}

//this function executes when user click on trash icon.
function deleteFav(idTODel){
var ok = confirm("Are you sure you want to delete this movie from your favorites?");
var fav = localStorage.getItem("fav");
if (ok == true) {
	//get ids from local storage
	var favIds = localStorage.getItem("fav").split(",");
	var index  = favIds.indexOf(idTODel);
	//delete it
	favIds.splice(index, 1);
	var joinIds = favIds.join(",");
	//set back again
	localStorage.setItem("fav",joinIds);

$('#success').html('Movie deleted from favorites.').show();

	setTimeout(function(){
			location.reload();
	},3000); //disappear error after 3 second 

  }
}



 