$('#page1').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#page2').on('pageinit', function(){

		var myForm = $('#registerNow');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
		//getElementById Function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
		//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our HTML pages.
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
	 
};

var getData = function(){
		//Write Data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage.
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

};

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

	};

	function storeData(){
		var id 					= Math.floor(Math.random()*100000001);
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input values.
//		getSelectedRadio();
//		getCheckboxValue();
		var item 				= {};
			item.group 			=["Hair Color:", ge('groups').value];
			item.studentid		=["Student ID:", ge('studentid').value];
			item.firstname		=["First Name:", ge('firstname').value];
			item.lastname	 	=["Last Name:", ge('lastname').value];
			item.parentemail 	=["Parent Email:", ge('parentemail').value];
			item.addAssistance 	=["Additional Assistance Required (Min Per Week):", ge('addAssistance').value];
			item.peanutButter 	=["Allergies:", ge('peanutButter').value];
			item.sex 			=["Gender:", sexValue];
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Registration Submitted!");
	};

var	deleteItem = function (){
		var ask = confirm("Are you sure you want to delete this registration?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Registration has been deleted.");
			window.location.reload();
		}else{
			alert("Registration was NOT deleted.")
		}
			
};
					
var clearLocal = function(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All registrations are deleted!");
			window.location.reload();
			return false;
		}

};

