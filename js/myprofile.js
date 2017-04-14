function init(){		
		xhr = new XMLHttpRequest();	
        if(xhr) {
            xhr.onreadystatechange = getAboutMe;
            xhr.open("GET", "php/myprofile.php?g=aboutMe", true);
            xhr.send(null);
        }	
}

function getAboutMe(){

    if(xhr.readyState==4 && xhr.status==200){
            //var address=(xhr.responseText).split(";");
            var text = xhr.responseText;
            var p = document.createElement("p");
            var t = document.createTextNode(text);
            p.appendChild(t);
            document.getElementById("about_me").appendChild(p);
            setTimeout(getPic, 4000);	
      }


}
function getPic(){
    xhr.open("GET", "php/myprofile.php?g=profilePic", true);
    xhr.onreadystatechange = showImg;
    xhr.send(null);
}

function showImg()
{
    if(xhr.readyState == 4 && xhr.status == 200)
    {

        im = document.createElement("img");
        im.id="profilePhoto";
        im.setAttribute("src", xhr.responseText);
        im.style = "width:100%;height:100%";
       
        var pic = document.getElementById('myProfilePic');
        pic.appendChild(im);
//                document.getElementById("myProfilePic").appendChild(im);       
        //$('#myProfilePic').attr("src","images/Disha-Patani.jpg");
        //document.getElementsByClassName("profilePic").src = xhr.responseText;	
    }
    setTimeout(getSongs,2000);

}
function getSongs(){

        xhr.onreadystatechange=showSongs;
        xhr.open("GET","php/myprofile.php?g=songList",true);
        xhr.send();
}

function showSongs(){

        if(xhr.readyState==4 && xhr.status==200){
            var list=JSON.parse(xhr.responseText);
            for(var i=0;i<list.length;i++){
                var div_main = document.createElement("div");
                div_main.class = "col-md-4 col-sm-4 w3threespecialityw3ls-grid grid4";

                var fig = document.createElement("figure");

                var div_img = document.createElement("div");
                div_img.class = "w3threespecialityw3ls-info";
                var img = document.createElement("img");
                img.src = list[i]['coverpic'];
                div_img.appendChild(img);

                var figcap = document.createElement("figcaption");
                var h3 = document.createElement("h3");
                h3.innerHTML = list[i]['title'];
				h3.data = list[i]['songid']
				h3.onclick = player
				h3.style.cursor = 'pointer';
                figcap.appendChild(h3);

                fig.appendChild(div_img);
                fig.appendChild(figcap);

                div_main.appendChild(fig)
                document.getElementById("song_list").appendChild(div_main);
            }
            //TODO:
            //setTimeout(getAudio,4000);
        }


}

function player(e) {
	window.location.href = 'player.html?songid=' + e.target.data;
}

function feedback(){
    var sub = document.getElementById("feedback-subject").value;
    var mess = document.getElementById("feedback-message").value;
    xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = feedbacksent;
    xhr2.open("GET", "php/feedback.php?subject=" + sub + "&message=" + mess, true);
    xhr2.send();
}

function feedbacksent(){
    if(xhr2.readyState==4 && xhr2.status==200){
        alert("feedback sent");
        document.getElementById('feedback-subject').value = '';
        document.getElementById('feedback-message').value = '';
    }
}

jQuery("#feedback-form").submit(function (e){
	alert('Submitted!');
	e.preventDefault();
	feedback();
});

function upload() {
	var song = document.getElementById('upload_song_url');
	var coverpic = document.getElementById('upload_song_cover');

	var formData = new FormData();

	var songElements = jQuery('input[id ^= upload_song_]');

	for (var i = 0; i < songElements.length; i++) {
		if (songElements[i].id != 'upload_song_url' && songElements[i].id != 'upload_song_cover') {
			formData.append(songElements[i].id, songElements[i].value);
		}
	}
	
	formData.append("song", song.files[0]);
	formData.append("cover", coverpic.files[0]);

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response);
			window.location.href('myprofile.html');
		}
	}

	xhr.open("POST", "php/upload_song.php", true);
	xhr.send(formData);
}

jQuery("#upload-form").submit(function (e){
	alert('Submitted!');
	e.preventDefault();
	upload();
});

function upload_pro_pic() {
	var pro_pic = document.getElementById('upload_profile_pic');
	
	var formData = new FormData();

	formData.append("upload_profile_pic", pro_pic.files[0]);

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response);
			window.location.href = "myprofile.html";
		}
	}

	xhr.open("POST", "php/upload_pic.php", true);
	xhr.send(formData);
}

jQuery("#upload-propic-form").submit(function (e){
	alert('Submitted!');
	e.preventDefault();
	upload_pro_pic();
});


