function init(){
		
		xhr = new XMLHttpRequest();	
        if(xhr)
        {
            xhr.onreadystatechange = getAboutMe;
            xhr.open("GET", "http://localhost/wt2/WT%202%20Project/Project2.0/php/myprofile.php?g=aboutMe", true);
            xhr.send(null);
        }	
		}
		function getAboutMe(){
		
            if(xhr.readyState=="4" && xhr.status==200){
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
		
			xhr.open("GET", "http://localhost/wt2/WT%202%20Project/Project2.0/php/myprofile.php?g=profilePic", true);
			xhr.onreadystatechange = showImg;
			xhr.send(null);
		
		
		}
		function showImg()
		{
			if(xhr.readyState == 4 && xhr.status == 200)
			{
				document.getElementsByClassName("profilePic").src = xhr.responseText;	
			}
			setTimeout(getSongs,2000);
			
		}
		function getSongs(){
		
				xhr.onreadystatechange=showSongs;
				xhr.open("GET","http://localhost/wt2/WT%202%20Project/Project2.0/php/myprofile.php?g=songList",true);
				xhr.send();
		}
		function showSongs(){
		
				if(xhr.readyState==4 && xhr.status==200){
					var list=JSON.parse(xhr.responseText);
                    for(var i=0;i<list.length;i++){
                        var s = list[i].split("-");
                        var div_main = document.createElement("div");
                        div_main.class = "col-md-4 col-sm-4 w3threespecialityw3ls-grid grid4";
                        
                        var fig = document.createElement("figure");
                        
                        var div_img = document.createElement("div");
                        div_img.class = "w3threespecialityw3ls-info";
                        var img = document.createElement("img");
                        img.src = s[1];
                        div_img.appendChild(img);
                        
                        var figcap = document.createElement("figcaption");
                        var h3 = document.createElement("h3");
                        h3.innerHTML = s[0];
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