//TAGINATOR 2.0
//Author: Michael Wilson


//Make alias variable equal to your own alias
var alias = "miwilson";

//--------------------------------------------------------------------------------------------------------
var affiliateId, tagNames, priceFloor;
var tagNamesArray;
var efpToggle;
var fileName;
var efp;
var newLine = "\n";

function getFileName(){
	fileName = prompt("Please input a name for the output file: ");
	if(fileName.indexOf(" ") != -1){
		alert("Please do not use spaces in the name, thanks!  Rename file without spaces.");
		getFileName();
	}
	else return;
}

//Asks user for affiliate ID, validates that it is a number
function getAffiliateId(){
	affiliateId = prompt("Please input publisher's Affiliate ID: ");
	if(isNaN(affiliateId)){
		alert("Something isn\'t right about that, please input valid Affiliate ID.");
		getAffiliateId();
	}
	else return;
}


//Asks for space delimited string of tag names from user and validates through tag size existence/validity
function getAndVerifyTagNames(){
	var invalidNamesArray = [], invalidSizeArray = [];
	tagNames = prompt("Copy and paste column of tag names here: ");
	tagNamesArray = tagNames.split(" ");
	
	function allNamesContainSize(arr){
		var arrLength = arr.length;
		for(var i = 0; i < arrLength; i++){
			if(!arr[i].match(/\d+[xX]\d+/)){
				invalidNamesArray.push(arr[i] + " -- needs size in name");
			}
			else if(!getSizeId(arr[i].match(/\d+[xX]\d+/)[0].toLowerCase())){
				invalidNamesArray.push(arr[i] + " -- invalid size detected");
			}
			else continue;
	}
		return(invalidNamesArray.length == 0);
	}
	if(allNamesContainSize(tagNamesArray)){
		alert("All tag names valid! Yay!");
		return;
		}
	else {
		var badNameString = "";
		for(var j = 0; j < invalidNamesArray.length; j++){
			badNameString += "• " + invalidNamesArray[j] + newLine;
		}
		alert("These names seem to be missing sizes or the sizes are invalid: " + newLine + newLine + "INVALID TAG NAMES" + newLine +
			badNameString + newLine + "Please add the correct size to the name(s) and try again!");
		getAndVerifyTagNames();
	}
}

//Asks user for price floor, must be between 0 - 10
function getPriceFloor(){
	priceFloor = prompt("Please input starting price floor: ");
	if(isNaN(priceFloor) || priceFloor == ""){
		alert("That is not a number, please try again.");
		getPriceFloor();
	}
	else if(priceFloor < 0){
		alert("Hmmm... " + priceFloor + "seems pretty low, please use a positive number.");
		getPriceFloor();
	}
	else if(priceFloor > 10){
		alert("That seems a little high(above $10), did you mean to set a price floor that high?" + newLine + newLine + 
			"Please try again");
		getPriceFloor();
	}
	else return;
}

function getSizeId(size){
	var standardizedSize = size.toLowerCase();
	var sizeIdKey = {
		"120x600": 42,
		"160x90": 45,
		"768x640": 44,
		"468x60": 38,
		"970x250": 33,
		"300x600": 22,
		"338x280": 40,
		"728x90": 20,
		"300x250": 9,
		"300x1050": 39,
		"250x250": 37,
		"970x90": 34,
		"160x600": 8,
		"320x100": 35,
		"320x50": 25,
		"300x50": 36,
		"320x480": 43
	};
	return sizeIdKey[standardizedSize];
}

function mobileOrDesktop(size){
	var sizeId = getSizeId(size);
	if(sizeId == 25 || sizeId == 35 || sizeId == 36 || sizeId == 43){
		return 6;
	}
	else return 0;
}

function getEFP(){
	efp = confirm("Do you want EFP enabled on these tags?" + "\n\n" + "Click \"OK\" for YES" + "\n\n" + "Click \"Cancel\" for NO");
}

function runGoToMacro(){
	var goToPageMacro = "CODE:";
	goToPageMacro += "URL GOTO=http://adcenter.lijit.com/adminpublisher/search/zone/new/" + affiliateId;
	iimPlay(goToPageMacro);
}
//Get user input
getAffiliateId();
getAndVerifyTagNames();
getPriceFloor();
getEFP();
getFileName();

fileName += ".csv";

if(efp){
	efpToggle = "YES";
}
else efpToggle = "NO";

var confirmInput = confirm("PLEASE CONFIRM: " + newLine + newLine +
	"Pub's Affiliate ID: " + affiliateId + newLine +
	"Number of tags being created: " + tagNamesArray.length + newLine +
	"Starting Price Floor: $" + priceFloor + newLine +
	"EFP will be turned: " + (efp ? "ON":"OFF") + newLine +
	"Output file name: " + fileName
	);

if(!confirmInput){
	alert("Please try again, thanks!");
	throw new Error("Taginator cancelled by user due to inadequate input.");
}
function writeHeaders(){
	var headerMacro = "CODE:";
	headerMacro += "ADD !EXTRACT MAIN_EXTRACT" + newLine;
	headerMacro += "ADD !EXTRACT ZONE_ID" + newLine;
	headerMacro += "ADD !EXTRACT TAG_NAME" + newLine;
	headerMacro += "ADD !EXTRACT PRICE_FLOOR" + newLine;
	headerMacro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + alias + "/desktop FILE=" + fileName;
	iimPlay(headerMacro);
}

function createTags(){
	for(var m = 0; m < tagNamesArray.length; m++){
		var size = tagNamesArray[m].match(/\d+[xX]\d+/)[0];
		var formFillMacro = "CODE:";
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:international CONTENT=NO" + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:using_efp CONTENT=" + efpToggle + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:geo_opt_in CONTENT=NO" + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ID:ZoneForm ATTR=ID:chain_optimization CONTENT=NO" + newLine;
		formFillMacro += "TAG POS=1 TYPE=SELECT FORM=ID:ZoneForm ATTR=ID:delivery_type CONTENT=%" + mobileOrDesktop(size) + newLine;
		formFillMacro += "TAG POS=1 TYPE=SELECT FORM=ID:ZoneForm ATTR=ID:ad_type CONTENT=%" + getSizeId(size) + newLine;
		if(mobileOrDesktop(size) == 6){
			formFillMacro += "TAG POS=1 TYPE=INPUT:RADIO FORM=ID:ZoneForm ATTR=ID:mobileWeb" + newLine;
		}
		formFillMacro += "TAG POS=1 TYPE=A ATTR=TXT:Advanced<SP>Options" + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:TEXT FORM=ID:ZoneForm ATTR=ID:userzonename CONTENT=" + tagNamesArray[m] + newLine;
		formFillMacro += "TAG POS=1 TYPE=INPUT:TEXT FORM=ID:ZoneForm ATTR=ID:cpmfloor CONTENT=" + priceFloor + newLine;
		formFillMacro += "TAG POS=1 TYPE=BUTTON FORM=ID:ZoneForm ATTR=NAME:another_button" + newLine;
		formFillMacro += "WAIT SECONDS=1" + newLine;
		formFillMacro += "TAG POS=1 TYPE=LI ATTR=TXT:New<SP>Zone<SP>Created<SP>(*)New<SP>zone<SP>roasted! EXTRACT=TXT" + newLine;
		formFillMacro += "SET !VAR0 EVAL(\"var s='{{!EXTRACT}}'.match(/([0-9])\\d+/); s[0];\")" + newLine;
		formFillMacro += "ADD !EXTRACT {{!VAR0}}" + newLine;
		formFillMacro += "ADD !EXTRACT " + tagNamesArray[m] + newLine;
		formFillMacro += "ADD !EXTRACT " + priceFloor + newLine;
		formFillMacro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + alias + "/desktop FILE=" + fileName;

		iimPlay(formFillMacro);
	}
	
}

//Macro Sequence
runGoToMacro();
writeHeaders();
createTags();

//Author: Michael Wilson 2017