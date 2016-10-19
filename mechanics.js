var title = document.getElementById("title");
var line1 = document.getElementById("line1");
var line2 = document.getElementById("line2");
var line3 = document.getElementById("line3");
var button = document.getElementById("reloadButton");
var share = document.getElementById("twitter-share-button"); 

var firstChoice;
	
line2.style.visibility='hidden';
line3.style.visibility='hidden';
button.style.visibility='hidden';
share.style.visibility='hidden';

var request = new XMLHttpRequest();
request.open("GET", "poems.xml", false);
request.send(null);

var poemDoc = request.responseXML;
var poems = poemDoc.getElementsByTagName ("poem");
var numPoems = poems.length;
// Get This Poem
var poemID = Math.floor(Math.random()*numPoems);	            
var poem = poems[poemID];

var t = poem.childNodes[1].childNodes[0].nodeValue;
var lines = poem.childNodes[3];
var line = [];
for(i=1; i<lines.childNodes.length; i+=2){
	line[i] = lines.childNodes[i].childNodes[0].nodeValue;
}
var choice = [];
var choices = poem.childNodes[5];
for(i=1; i<choices.childNodes.length; i+=2){
	choice[i] = choices.childNodes[i].childNodes[0].nodeValue;
}

function hideMe(element){
	element.style.display='none';
}

function new_line(i){
	var num = (i * 2) + 1;
	var text
	text = line[num].replace("CHOICE",
		" <a href='#' onClick='return new_line("+num+");'>" + choice[num*2-1] + "</a> | " + 
		" <a href='#' onClick='return new_line("+(num+1)+");'>" + choice[num*2+1] + "</a> "
	);
	if(i<3){
		firstChoice = num;
		line1.innerHTML = line[1].replace("CHOICE", choice[i*2-1]);
		line2.innerHTML = text;
		line2.style.visibility='visible';
	} else {
		line2.innerHTML = line[firstChoice].replace("CHOICE", choice[i*2-1]);
		line3.innerHTML = text;
		line3.style.visibility='visible';
		reloadButton.style.visibility='visible';
		share.style.visibility='visible';
		share.href = "https://twitter.com/intent/tweet?text=" + 
			line1.innerHTML + "%0d" + 
			line2.innerHTML + "%0d" + 
			line3.innerHTML + "%0d%0d" + 
			"an interactive branching haiku via: www.kuhai.us";
	}	
}

title.innerHTML = t;
line1.innerHTML = line[1].replace("CHOICE", 
	" <a href='#' onClick='return new_line(1);'>" + choice[1] + "</a> | " + 
	" <a href='#' onClick='return new_line(2);'>" + choice[3] + "</a> "
);


$('#reloadButton a').click( function() {
	window.location.reload();
} );


