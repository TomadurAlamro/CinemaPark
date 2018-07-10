//start executing when page load 
window.onload = function(){
	//the below code gets executes when browser load first
	var movieId = window.location.href.split("=")[1];
	var getDetailsURL = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key=396d01716a6019bdf6cfc72cf79ac7b9&language=en-US&callback=getMOvieDetails"
	var script = document.createElement('script');
	script.src = getDetailsURL;
	document.body.appendChild(script);
}

//this function is callback for once the response comes back from get movie details call
function getMOvieDetails(currentObj){
	 console.log(currentObj);
	 // setting up all the properties
	 document.getElementById("movieimg").src= 'https://image.tmdb.org/t/p/w92' + currentObj.poster_path;
	 document.getElementById("moviename").textContent=currentObj.original_title;
	 document.getElementById("description").innerHTML= "<b>Description: </b>" + "<span>" +currentObj.overview+"</span>";
	 var generes =[];
	 for (var i =0; i< currentObj.genres.length; i++) {
	 	generes.push(currentObj.genres[i].name);
	 };
	 document.getElementById("genrename").innerHTML= "<b>Genres: </b>" + "<span>" +generes.join(",")+"</span>";
	 document.getElementById("releasedate").innerHTML= "<b>Release Date: </b>" + "<span>" +currentObj.release_date+"</span>";
	 document.getElementById("rating").innerHTML= "<b>Rating: </b>" + "<span>" +currentObj.vote_average+"</span>";

}

//when user click on the Add to Favorite button, this code gets execute
//it checks if it is already added or not before adding
function addToFav(){
	var fav = localStorage.getItem("fav");
	var movieId = window.location.href.split("=")[1];

	if(fav){
		var currentFavMovie = fav.split(",");
		if(currentFavMovie.indexOf(movieId) > -1){
			addErrorMessage("Movie already added to favorites");
			return;
		}
		localStorage.setItem("fav",fav+","+movieId);
		addSuccessMessage("Movie added to favorites");
	}else{
		localStorage.setItem("fav",movieId);
		addSuccessMessage("Movie added to favorites");
	}

}

// This is a generic function to show an error message.
function addErrorMessage(msg){
	$('#error').show();
	document.getElementById("error").textContent = msg;
	setTimeout(function(){
	$('#success').hide();
	$('#error').hide();
	},3000); // disappear error after 3 sec
} 

function addSuccessMessage(msg){
	$('#success').show();
	document.getElementById("success").textContent = msg;
	setTimeout(function(){
	$('#success').hide();
	$('#error').hide();
	},3000); // disappear error after 3 sec
}