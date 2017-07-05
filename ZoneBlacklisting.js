//Adds URL list to list of Tag ID Zones

var zones;
var urls;

var zoneIdArray;
var urlArray;

var zoneIdArraylength;
var urlArrayLength;

var confirmNumbers;
var i, j;
var report;

zones = prompt("Paste Column of Zone IDs Here: ");
urls = prompt("Paste Column of URLs Here: ");

if(!zones || !urls) {
	alert("Blank value submitted, please try again.");
	throw new Error("Invalid Entry");
}

zoneIdArray = zones.split(" ");
urlArray = urls.split(" ");

zoneIdArrayLength = zoneIdArray.length;
urlArrayLength = urlArray.length;

confirmNumbers = confirm("Number of Zones: " + zoneIdArrayLength + "\n" + 
			 "Number of URLs: " + urlArrayLength + "\n" +
			 "Is this correct? Cancel if not correct.");
if (!confirmNumbers) {
	alert("Check yo'self before you wreck yo'self!\n\n" + 
	"-I assume you are copying and pasting from a spreadsheet\n" + 
	"-Literally paste the spreadsheet column into textbox\n" +
	"-Check your cells for spaces\n" + 
	"-Data should be space delimited when pasted\n\n" + 
	"Please Try Again!");
	throw new Error("Something went badly wrong!  You messed up, didn't you");
}
alert("Let's Begin!");
iimDisplay("Lets-a Go!");
for (i = 0; i < zoneIdArrayLength; i++) {

	var macro = "CODE:";
	macro += "URL GOTO=http://adcenter.lijit.com/admin_zonertbblocking/index/0/" + zoneIdArray[i] + "/-1";
	macro += "\n";
	macro += "TAG POS=1 TYPE=A ATTR=TXT:Advertiser<SP>Domain<SP>Blacklist";
	iimPlay(macro);
	
	var macro2 = "CODE:";
	for (j = 1; j <= urlArrayLength; j++) {
		iimDisplay("Blacklisting Progress:" + "\n" + 
		"Currently on zone " + (i + 1) + " of " + zoneIdArrayLength + ".\n" + 
		urlArrayLength + " URLs being added to zone's blacklist.");
		macro2 += "TAG POS=1 TYPE=INPUT:BUTTON FORM=ID:block_badv_response ATTR=ID:add-badv-response";
		macro2 += "\n";
		macro2 += "TAG POS=" + j + " TYPE=INPUT:TEXT FORM=ID:block_badv_response ATTR=NAME:badvText[] CONTENT=" + urlArray[j - 1];
		macro2 += "\n";
		};
	iimPlay(macro2);
	
	var macro3 = "CODE:";
	macro3 += "TAG POS=1 TYPE=BUTTON FORM=ID:block_badv_response ATTR=ID:submit_button_badv";
	iimPlay(macro3);
}

iimDisplay("Successfully blacklisted " + urlArrayLength + " URLs across " + zoneIdArrayLength + " zones.");

report  =  "Status Report:\n\n" + urlArrayLength + " URLs successfully blocked across " + zoneIdArrayLength + " zones!";
alert (report);

//Author: Michael Wilson