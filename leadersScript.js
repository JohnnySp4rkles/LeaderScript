// A class to store an object reference to the leaders
class Leader{
//constructor
	constructor(name, country, yearsInReign, imgPath){
		this.name=name;
		this.country=country;
		this.yearsInReign=yearsInReign;
		this.imgPath=imgPath;
		}
}
// dummy data to start
var putin = new Leader("Vladimir Putin", "Russia", 9, "images/putin.jpg");
var jinping = new Leader("Xi Jinping", "China", 4, "images/jinping.jpg");
var merkel = new Leader("Angela Merkel", "Germany", 12, "images/merkel.jpg");
var trump = new Leader("Donald Trump", "America", 1, "images/trump.jpg");
//array to store the leader objects
var leadersArray = [putin, jinping, merkel, trump];
// when the DOM loads....
window.onload = function(){
	createLeaderImages();
	initButtons();
}
/*
	Starting method to get all the leaders from the dunny data array
	Adds a listener to the image passing the Leader object
*/
function createLeaderImages(){
	for(var i = 0; i < leadersArray.length; i++){
		var leaderImg = document.createElement("img");
		var thisLeader = leadersArray[i];
		leaderImg.addEventListener("mouseenter", createDetails(thisLeader));
		leaderImg.addEventListener("mouseleave", clearDetails);
		
		//intiialise and format
		leaderImg.className = "leaderImg";
		leaderImg.src = leadersArray[i].imgPath;
		leaderImg.style.width="150px";
		leaderImg.style.height="240px";
		
		document.getElementById("imgDiv").appendChild(leaderImg);
	}
}
//the function that hovering over the image will do.
function createDetails(Leader){
	return function(){
		document.getElementById("nameOfLeader").innerHTML = Leader.name;
		document.getElementById("countryOfLeader").innerHTML = Leader.country;
		document.getElementById("yearsOfLeader").innerHTML = Leader.yearsInReign;
	}
}
//Function to clear text display
function clearDetails(){
		document.getElementById("nameOfLeader").innerHTML = "";
		document.getElementById("countryOfLeader").innerHTML = "";
		document.getElementById("yearsOfLeader").innerHTML = "";
}
// Method to create the buttons and add listeners.
function initButtons(){
	var leaderForm = document.getElementById("addLeader");
	leaderForm.addEventListener("click", toggleForm);
	
	var addLeaderButton = document.getElementById("leaderSubmit");
	addLeaderButton.addEventListener("click", addLeader);
	
	var swapButton = document.getElementById("swapLeader");
	swapButton.addEventListener("click", swapLeaders);
	
	var deleteButton = document.getElementById("deleteLeader");
	deleteButton.addEventListener("click", deleteLeader);
	
	var clearButton = document.getElementById("clearForm");
	clearButton.addEventListener("click", clearForm);
	
	var arrayButton = document.getElementById("leaderArray");
	arrayButton.addEventListener("click", arrayStats);
}
// Function to add leaders.
function addLeader(){
//get values from the form
	var nameIn = document.getElementById("nameInForm").value;
	var countryIn = document.getElementById("countryInForm").value;
	var yearIn = document.getElementById("yearInForm").value;
	var pathIn = document.getElementById("pathInForm").value;
// Method will return false if the fields are blank	
	if(checkFields(nameIn, countryIn, yearIn, pathIn)){
	//parse the url to get rid of C:fakepath. add images/ to extension
		pathIn = "images/" + basename(pathIn);
		alert(pathIn);
		
	//create a new leader	
		var newLeader = new Leader(nameIn, countryIn, yearIn, pathIn);
		leadersArray.push(newLeader);
		
	//create new image node and add an event listener.
		var leaderImg = document.createElement("img");
		leaderImg.addEventListener("mouseenter", createDetails(newLeader));
		leaderImg.addEventListener("mouseleave", clearDetails);
		
	//get the image and set node
		leaderImg.className = "leaderImg";
		leaderImg.src = pathIn;
		leaderImg.style.width = "150px";
		leaderImg.style.height = "240px";
		
	//append image to the div
		imgDiv.appendChild(leaderImg);
		
	//clear and toggle form visibility
		clearForm();
	}
	else{
		alert("There was an error processing the request. Make sure none of the fields are empty");
	}
}
// Function to swap the leaders
function swapLeaders(){
	var imageElements = document.getElementsByClassName("leaderImg");
	
	if(imageElements.length > 1){
		var parent = imageElements[0].parentNode;
	// Swapping nodes in the DOM
		var firstElem = imageElements[0];
		var lastElem = imageElements[imageElements.length-1];

		parent.insertBefore(firstElem, lastElem);
		parent.insertBefore(lastElem, imageElements[0]);
	// Swapping nodes in the Array
		var toMoveToEnd = leadersArray[0];
		var toMoveToStart = leadersArray[leadersArray.length-1];
		
		leadersArray[0] = toMoveToStart;
		leadersArray[leadersArray.length-1]=toMoveToEnd;
	}
}
// Delete the first leader on the DOM
function deleteLeader(){
	var toRemove = document.getElementsByClassName("leaderImg");
// Will only be triggered if there are images elements in the DOM
	if(toRemove.length > 0){
		toRemove[0].parentNode.removeChild(toRemove[0]);
		leadersArray.splice(0,1);
	}
}
//clear the values in the forms
function clearForm(){
	document.getElementById("nameInForm").value="";
	document.getElementById("countryInForm").value="";
	document.getElementById("yearInForm").value="";
	document.getElementById("pathInForm").value="";
}
//method to toggle the visibility of the input form. hidden by default
function toggleForm(){
	var form = document.getElementById("leaderInputForm");
	
	if (form.style.display === "none") {
		this.innerText  = "Close form";
        form.style.display = "block";
    }
	else {
		this.innerText  = "Add new Leader";
        form.style.display = "none";
    }
}
//returns the path from '\\' removed and changed to '/'
function basename(path) {
	//this is a change
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}
// Checking the input fields for blank messages and number.
function checkFields(nameIn, countryIn, yearIn, pathIn){	
	if((nameIn === null || nameIn === "") ||
		(countryIn === null || countryIn === "") ||
			(yearIn === null || yearIn === "") ||
				(pathIn === null || pathIn === "")){
					return false;
	}
	else{
		return true;
	}
}
// This will create a pop-up of all the elements in the array.
function arrayStats(){
	var resp = "";
	
	resp += "Number of elements: " + leadersArray.length + "\n\n";
	resp += "Name | Country | Years | ImgPath\n\n";
	
	for(var i=0; i<leadersArray.length; i++){
		resp += leadersArray[i].name + " | " +
			leadersArray[i].country + " | " +
				leadersArray[i].yearsInReign + " | " +
					leadersArray[i].imgPath +"\n";
	}
	
	alert(resp);
}
