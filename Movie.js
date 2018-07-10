//global variables
var getLatestMovieUrl ="https://api.themoviedb.org/3/movie/latest?api_key=396d01716a6019bdf6cfc72cf79ac7b9&language=en-US&callback=getLatestMovies";
var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=396d01716a6019bdf6cfc72cf79ac7b9&language=en-US&page=1&include_adult=false&callback=getSearchMovies&query="
// start executing when page load 
window.onload = function(){
	// the below code gets executes when browser load first
	var script = document.createElement('script');
	script.src = getLatestMovieUrl;
	document.body.appendChild(script);
}
//once you got the movies from server the below function gets executes
function getLatestMovies(responseJson){
	generateMovieDivsFromJson(responseJson); 
  }

  //iterate over all the response movies and create dynamic divs
function generateMovieDivsFromJson(resultMovies){
	var movieul = document.getElementById("list");
	movieul.innerHTML =""; // clean the div first
	//iterate the response and add then
	if(resultMovies.length){ //for multiple 
	for (var i = resultMovies.length - 1; i >= 0; i--) {
	 	 var currentObj = resultMovies[i];
	 	 var div = document.createElement('div');
	 	 div.innerHTML ='<div class="moviediv"><a href="MovieDetails.html?movieId='+currentObj.id+'" ><img src="https://image.tmdb.org/t/p/w92' + currentObj.poster_path + '" width="250" height="200"></a><p>'+currentObj.original_title+'</p></div>';
         movieul.appendChild(div.firstChild);
	 };
	}else{ //for one
		var currentObj = resultMovies;
		var div = document.createElement('div');
		div.innerHTML ='<div class="moviediv"><a href="MovieDetails.html?movieId='+currentObj.id+'" ><img src="https://image.tmdb.org/t/p/w92' + currentObj.poster_path + '" width="250" height="200"></a><p>'+currentObj.original_title+'</p></div>';
	    movieul.appendChild(div.firstChild);
	}
}

//this function executes when the user clicks on search icon and the response comes back
function getSearchMovies(responseJson){
	$('#error').hide();
	if(responseJson.results.length>0){
		var keyword_name = document.getElementById('searchbox').value;
	 	 document.getElementById('latestMovies_title').textContent = 'Results for "'+keyword_name+'"';
 		generateMovieDivsFromJson(responseJson.results);
    }else{
    	addErrorMessage("Sorry, we couldn't find any movies matching.");
    }
}

 

//this code gets execute when the user clicks on the  search icon
//gives a error message when there is no text in the textbox
function searchMovies(){
	var keyword = document.getElementById("searchbox").value;

	if(keyword.length >0){
	//the below code gets executes when  user click on search
	var script = document.createElement('script');
	script.src = searchUrl+keyword;
	document.body.appendChild(script);
	}else{
		addErrorMessage("Enter a word or phrase to search on.");
	}
}



//this is a generic function to show an error message
function addErrorMessage(msg){
	document.getElementById("error").textContent = msg;
	$('#error').show();
	setTimeout(function(){
	$('#success').hide();
	$('#error').hide();
	},3000); // disappear error after 3 sec

}