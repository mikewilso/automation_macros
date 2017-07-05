//Adds URL list to list of Tag ID Zones

var zones;
var nums;

var zoneIdArray;
var numsArray;

var zoneIdArraylength;
var numsArrayLength;

var confirmNumbers;
var i, j;
var report;

zones = prompt("Paste Column of Zone IDs Here: ");
nums = prompt("Paste Column of Category Reference #s Here: ");

if(!zones || !nums) {
	alert("Blank value submitted, please try again.");
	throw new Error("Invalid Entry");
}

zoneIdArray = zones.split(" ");
numsArray = nums.split(" ");

zoneIdArrayLength = zoneIdArray.length;
numsArrayLength = numsArray.length;

confirmNumbers = confirm("Number of Zones: " + zoneIdArrayLength + "\n" + 
			 "Number of Categories: " + numsArrayLength + "\n" +
			 "Is this correct? Cancel if not correct.");
if (!confirmNumbers) {
	alert("Check yo'self before you wreck yo'self!\n\n" + 
	"-I assume you are copying and pasting from a spreadsheet\n" + 
	"-Literally paste the spreadsheet column into textbox\n" +
	"-Check your cells for spaces\n" + 
	"-Data should be space delimited when pasted\n\n" + 
	"Please Try Again!");
	throw new Error("Something went badly wrong!");
}
alert("Let's Begin!");
iimDisplay("Lets-a Go!");
for (i = 0; i < zoneIdArrayLength; i++) {

	var macro = "CODE:";
	macro += "URL GOTO=http://adcenter.lijit.com/admin_zonertbblocking/index/0/" + zoneIdArray[i] + "/-1";
	macro += "\n";
	macro += "TAG POS=1 TYPE=A ATTR=TXT:Categories";
	iimPlay(macro);
	
	var macro2 = "CODE:";
	for (j = 0; j <= numsArrayLength; j++) {
		iimDisplay("Category Blocking Progress:" + "\n" + 
		"Currently on zone " + (i + 1) + " of " + zoneIdArrayLength + ".\n");
		macro2 += "TAG POS=" + numsArray[j] + " TYPE=INPUT:CHECKBOX FORM=ID:block_bcat ATTR=ID:is_blocked CONTENT=YES" + "\n"
		};
	iimPlay(macro2);
	
	var macro3 = "CODE:";
	macro3 += "TAG POS=1 TYPE=BUTTON FORM=ID:block_bcat ATTR=ID:submit_button_bcat" + "\n"
	iimPlay(macro3);
}

iimDisplay("Successfully blacklisted " + numsArrayLength + " URLs across " + zoneIdArrayLength + " zones.");

report  =  "Status Report:\n\n" + numsArrayLength + " categories successfully blocked across " + zoneIdArrayLength + " zones!";
alert (report);

//Author: Michael Wilson