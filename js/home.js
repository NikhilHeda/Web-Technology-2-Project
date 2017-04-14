var Suggest=function(){
    //alert("hello");
    temp=this;
    this.timer=null;
    this.search=null;
    this.container=null;
    this.xhr=new XMLHttpRequest();
    this.getFood=function(){
            //alert("1");
            if(this.timer){
                //clear timeout
                clearTimeout(this.timer);
            }
            this.timer=setTimeout(this.sendTerm, 1000)

    }
    this.sendTerm=function(){  

            temp.search=document.getElementById("search");
            temp.container=document.getElementById("search_result");
            temp.container.innerHTML="";
            console.log(temp.search.value);
            if(temp.search.value==""){
                console.log("empty")
            }
            else{
				temp.container.style.display="block";
                url="php/suggest_c.php?term="+temp.search.value;
                if(localStorage.getItem(url)){
                //fetch from cache
                    var r=JSON.parse((localStorage.getItem(url)))
                    temp.populateFood(r);
                }

                else{
                    temp.xhr.onreadystatechange=temp.fetchFood;
                    temp.xhr.open("GET",url,true);
                    temp.xhr.send();
                }
            }

            //console.log(this);

    }

    this.fetchFood=function(){

        if(this.readyState==4 && this.status==200){
            console.log(this.responseText);
            localStorage.setItem(this.responseURL,this.responseText);
            var res=JSON.parse(this.responseText);
            temp.populateFood(res);

        }			
            //console.log(this);
    }
    this.populateFood=function (r){
        temp.container=document.getElementById("search_result");
        for(var i=0;i<r.length;i++){
                var d=document.createElement("div")
                d.innerHTML=r[i]
                d.className="result"
                d.onclick=temp.setFood;
                temp.container.appendChild(d);

        }


    }

    this.setFood=function(e){

            temp.search.value=e.target.innerHTML;
            temp.container.style.display="none";


    }


}	

obj=new Suggest();



// Creating an event stream
ev = new EventSource('php/posts_updates.php');

ev.addEventListener('newpost', updateContent, false);

function updateContent(event) {
    console.log(event.data);
    //alert("hii");
    feedUpdate(JSON.parse(event.data));
}

function feedUpdate(arr){
    var d8 = document.createElement("div");
    d8.className = "feeditem";
        var d0 = document.createElement("div");
        d0.className = "feeds-single";
            var d1 = document.createElement("div")
            d1.className = "user";
                var m1 = document.createElement("img");
                m1.className = "image img-circle";
                m1.setAttribute("src", arr['profile_pic']);
                d1.appendChild(m1);
                var d2 = document.createElement("div")
                d2.className = "user-name";
                d2.setAttribute("style","display:inline-block; margin-right:5%;");
                d2.innerHTML = arr['username'] + "&nbsp;";
                d1.appendChild(d2);
                var d3 = document.createElement("div")
                d3.className = "action";
                d3.setAttribute("style", "display:inline-block;margin-left: 5%;");
                d3.innerHTML = " has posted ";
                d1.appendChild(d3);
                var d4 = document.createElement("div")
                d4.className = "song";
                d4.setAttribute("style","display:block;text-align:center;");
                    var hil1 = document.createElement("h4");
                    hil1.innerHTML = arr['title'] + " ";
                d4.appendChild(hil1)
                //d4.innerHTML = 
                d1.appendChild(d4);
        d0.appendChild(d1);
                var d5 = document.createElement("div")	// like
                d5.className = "like btn-group";
                    var b1 = document.createElement("button");
                    b1.type = "button";
                    b1.className = "btn-xs btn btn-warning";
					b1.onclick = function (e) {
						var x = new XMLHttpRequest();
						x.onreadystatechange = function () {
							if (this.readyState == 4 && this.status == 200) {
								if (this.response == 'Success') {
									var val = document.getElementById('like_count');
									val.innerHTML = parseInt(val.innerHTML) + 1;
								} else {
									alert(this.response);
								}
							}
						}
						x.open('GET', 'php/like.php?songid=' + arr['song_id'], true);
						x.send(null);
					};
	
                    b1.innerHTML = "Like";
                    d5.appendChild(b1);
                    var b2 = document.createElement("button");
                    b2.type = "button";
                    b2.className = "btn-xs btn btn-warning";
                    b2.innerHTML = "Share";
                    d5.appendChild(b2);
                d0.appendChild(d5);
                var d6 = document.createElement("div")	// count
                d6.className = "count";
				d6.id = "like_count";
                d6.innerHTML = arr['like_count'];
                d0.appendChild(d6);
                var d7 = document.createElement("div") // play
                d7.className = "play";
                    var b3 = document.createElement("button");
                    b3.type = "button";
                    b3.className = "btn btn-warning btn-circle btn-lg";
                        var i = document.createElement("i");
                        i.className = "glyphicon glyphicon-play";
					b3.onclick = function () {
						window.location.href = 'player.html?songid=' + arr['song_id'];
					}
                    b3.appendChild(i);
                d7.appendChild(b3);
            d0.appendChild(d7);
    d8.appendChild(d0);
    $(".feeds").prepend(d8);
}

//Periodic Refresh
function getSongs(){

    xhr=new XMLHttpRequest();
    xhr.onreadystatechange=showSongs;

    xhr.open("GET","php/get_top_songs.php",true);
    xhr.send();  

  }

function showSongs(){

    if(xhr.readyState==4 && xhr.status==200){
        var res=JSON.parse(xhr.responseText);
        
        if(res.length<10){
            n = res.length;
        }
        else{
            n = 10;
        }
        
        for(i=1;i<=n;i++){
            console.log(res[i-1]['title']);
            $('#top'+i).html(res[i-1]['title']);
        }
        
        setTimeout(getSongs, 10000);

    }

}

getSongs();


function clear_session_song() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response);
		}
	}
	xhr.open('GET', 'php/reset_session_song.php', true);
	xhr.send(null);
}


