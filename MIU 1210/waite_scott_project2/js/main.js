// Scott Waite
// MIU 1210
// Week 2 Project 2


//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
		selectLi = $('hairColor'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
	for(var i=0, j=hairColor.length; i<j; i++){
		var makeOption = document.createElement('option');
		var optText = hairColor[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}
	selectLi.appendChild(makeSelect);
}
	//Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].sex
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}	
	}
	function getCheckboxValue(){
		if($('peanutButter').checked){
			allergicValue = $('peanutButter').value;
		}else{
			allergicValue = "No"
		}
		
	}

	function toggleControls(n){
		switch(n){
			case "on":
			$('registrationForm').style.display = "none";
			$('clear').style.display = "inline";
			$('displayLink').style.display = "none";
			break;
		case "off":
			$('registrationForm').style.display = "block";
			$('clearLocal').style.display = "inline";
			$('displayLink').style.display = "inline";
			$('addNew').style.display = "none";
			$('items').style.display = "none";
			break;
		default:
			return false;
		}
	}

	function storeData(){
		var id 					= Math.floor(Math.random()*100000001);
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input values.
		getSelectedRadio();
		getCheckboxValue();
		var item 				= {};
			item.group 			=["Hair Color:", $('groups').value];
			item.studentid		=["Student ID:", $('studentid').value];
			item.firstname		=["First Name:", $('firstname').value];
			item.lastname	 	=["Last Name:", $('lastname').value];
			item.parentemail 	=["Parent Email:", $('parentemail').value];
			item.addAssistance 	=["Additional Assistance Required (Min Per Week):", $('addAssistance').value];
			item.peanutButter 	=["Allergies:", $('peanutButter').value];
			item.sex 			=["Gender:", sexValue];
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Registration Submitted!");
	}

	function getData(){
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		} else {
			toggleControls("on");
		//Write Data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			//getImage(obj.group[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
}
makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete links for each item in local storage.
}
}
}

	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our HTML pages.
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Registration";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

	//Get the Image for the right category
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}

		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);

		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Registration"
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//Show the form
		toggleControls("off");

		//populate the form fields with current localStorage values.
		$('groups').value = item.group[1];
		$('studentid').value = item.studentid[1];
		$('firstname').value = item.firstname[1];
		$('lastname').value = item.lastname[1];
		$('parentemail').value = item.parentemail[1];
		$('addAssistance').value = item.addAssistance[1];
		$('peanutButter').value = item.peanutButter[1];
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}

		}
		if(item.peanutButter[1] == "Yes"){
			$('peanutButter').setAttribute("checked", "checked");
	}
		$('peanutButter').value = item.peanutButter[1];

		//Remove the initial listener from the input 'save contact' button.
		save.removeEventListener("click", storeData);
		//Change Submit Button Value to Edit Button
		$('submit').value = "Edit Contact";
		var editSubmit =$('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this registration?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Registration has been deleted.");
			window.location.reload();
		}else{
			alert("Registration was NOT deleted.")
		}
	}

	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All registrations are deleted!");
			window.location.reload();
			return false;
		}
	}

	function validate(){
		//Define the elements we want to check
		var getGroup = $('groups');
		var getStudentid = $('studentid');
		var getFirstname = $('firstname');
		var getLastname = $('lastname');
		var getParentemail = $('parentemail');

		//Get Error Messages
		var messageAry = [];
		//Group Validation
		if(getGroup=="--Choose A Group--"){
			var groupError = "Please choose a group.";
			getGroup.syle.border = "1px solid red";
			messageAry.push(groupError);
		}

		// First Name Validation
		if(getFirstname.value === ""){
			var firstNameError = "Please enter a first name."
			getFirstname.style.border = "1px solid red";
			messageAry.push(firstNameError);
		}

		// Last Name Validation
		if(getLastname.value === ""){
			var lastNameError = "Please enter a last name."
			getLastname.style.border = "1px solid red";
			messageAry.push(lastNameError);
		}

		// Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(.\w{2,3})+$/;
		if(!re.exec(getParentemail.value)){
			var emailError = "Please enter a valid email address.";
			getParentemail.style.border = "1px solid red";
			messageAry.push(emailError);
		}

		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
		}else{
			storeData(this.key);
		}

	}

	//Variable defaults
	var sexValue,
		allergicValue = "No",
		errMsg = $('errors'),
		hairColor = ["Blond", "Brown", "Black", "Red", "Gray", "Bald"]
	;
	makeCats();


	//Set Link & Submit Click Events
	var displayLink = $('displayLink');
    displayLink.addEventListener("click", getData);
	
	
	var clearMyData = $('clear');
    clearMyData.addEventListener("click", clearLocal);
	
	var save = $('submit');
	save.addEventListener("click", validate);

	


	

    


    
});