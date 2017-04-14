function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function send_request() {
	songID = getParameterByName("songid")
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = getVals
	xhr.open("GET", "php/player.php?songID=" + songID, true)
	xhr.send();	
}

function getVals(){
	if (this.readyState == 4 && this.status == 200){

	data = JSON.parse(this.responseText)	
		artistInfo = data['username']
		albumTitle = data[0]['album']
		titleInfo = data[0]['title'].split('-')[0]
		year = data[0]['release_date'].split('-')[0]
		attInfo = data[0]['title']
		songName = data[0]['audio_url']

		console.log(songName)

		labelInfo = "RoadRunner Records"

		songString = '<source src="'+ songName +'" type="audio/mpeg">'

		$('audio').prop('innerHTML',songString)
		console.log($('audio').prop('innerHTML'))

		songDetails = $('td')
		songDetails[0].innerHTML = artistInfo
		songDetails[1].innerHTML = titleInfo
		songDetails[2].innerHTML = albumTitle
		songDetails[3].innerHTML = labelInfo
		songDetails[4].innerHTML = year
		$("div.row.col-sm-10.col-sm-offset-1").prop('innerHTML', attInfo)	
	}
}

