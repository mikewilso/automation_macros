//--------------------------------------------------------------------------------------------------------------

//                                                 IAS MACRO  

//                                            THE FINAL SOLUTION

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

// CONFIGURE MACRO SETTINGS BELOW

//--------------------------------------------------------------------------------------------------------------

//ENABLE DOWNLOADING OUTPUT FILE TO YOUR DESKTOP BY ADDING YOUR ALIAS BELOW BETWEEN QUOTES
var alias = "miwilson";


//CONFIGURE OUTPUT: IF YOU WANT ONLY NUMBERS (1000) IN OUTPUT INSTEAD OF TEXT AND NUMBERS ("vio":1000), SET only_numbers = true;
var only_numbers = false;


//API Client ID
var client_id = [client ID goes here];


//CONFIGURE WHAT DATA YOU WANT, COMMENT OUT THE DATA YOU DO NOT WANT USING "//" AT THE BEGINNING OF THE LINE, THE SAME WAY THIS COMMENT IS COMMENTED
violence = "VIOLENCE"; //vio
illegal_drugs = "ILLEGAL_DRUGS"; //drg
alcohol = "ALCOHOL"; //alc
offensive_language = "OFFENSIVE_LANGUAGE"; //off
illegal_downloads = "ILLEGAL_DOWNLOADS"; //dlm
adult_content = "ADULT_CONTENT"; //adt
suspicious_activity = "SUSPICIOUS_ACTIVITY"; //SAM score
hate_content = "HATE_CONTENT"; //hat
cluttered = "CLUTTERED"; //clu
iab1_categories = "IAB1_CATEGORIES"; //iab1
iab2_categories = "IAB2_CATEGORIES"; //iab2
language = "LANGUAGE"; //lang
traq = "TRAQ"; //traq - True Ad Quality Score
ivt = "IVT"; //ivt - The average time an advertisement is in view on a page.
ivp = "IVP"; //ivp - The probability of an ad being in view for more than 5 seconds. A higher score indicates a higher probability that the ad will be viewable by the user.
niv = "NIV"; //niv - The probability that an ad will not be viewed by a user. A higher score indicates a higher probability that the ad will NOT be viewed by the user.
ivl = "IVL"; //ivl - The probability of an ad being in view when the user opens the page. (0-100)
ivu = "IVU"; //ivu - Probability that at least 50% of the ad will be viewable when the user leaves the page.
iviab = "IVIAB"; //iviab - Takes the minimum value of all the iviab placement probabilities (e.g. iviab_160x600, iviab300x250, etc.)
average_time_on_page = "AVERAGE_TIME_ON_PAGE"; //top - Average time a user spends on a page.
visibility = "VISIBILITY"; //vis - Ad visibility score overall.


//--------------------------------------------------------------------------------------------------------------

//BOILERPLATE BELOW -- DO NOT CHANGE IT OR YOU WILL PAY THE ULTIMATE PRICE

//--------------------------------------------------------------------------------------------------------------

var i, j, k, l, sites, confirmed, siteArray, siteArrayLength, outputFileName, output;
var violence, illegal_drugs, alcohol, offensive_language, illegal_downloads, adult_content, suspicious_activity, hate_content, cluttered, iab1_categories, iab2_categories, language, traq, ivt, ivp, niv, ivl, ivu, iviab, average_time_on_page, visibility;
var rawCategoryArray = [violence, illegal_drugs, alcohol, offensive_language, illegal_downloads, adult_content, suspicious_activity, hate_content, 
			cluttered, iab1_categories, iab2_categories, language, traq, ivt, ivp, niv, ivl, ivu, iviab, average_time_on_page, visibility];
var approvedCategoriesArray = [];

for (i = 0; i < rawCategoryArray.length; i++){
	if(rawCategoryArray[i]){
		approvedCategoriesArray.push(rawCategoryArray[i]);
	}
}
function pasteTheSites() {
	sites = prompt("Paste column of URLs here: ");
	if (sites.length === 0){
		alert("You need at least one site, dawg.  You're giving me nothing.")
		pasteTheSites();
	}
}

pasteTheSites();

siteArray = sites.split(" ");
siteArrayLength = siteArray.length;

function nameTheFile(){
	outputFileName = prompt("Create file name: ");
	if (outputFileName.length === 0){
		alert("Name of file must be a least one character, c'mon.");
		nameTheFile();
	}
}

nameTheFile();

outputFileName += ".csv";

confirmed = confirm("Number of sites: " + siteArrayLength + "\n" + "Output file name: " + outputFileName + "\n\n" + "Is this correct?");

if (!confirmed) {
	alert("Troubleshooting Tips:" + "\n\n" + "-Make sure there are no spaces in the URL excel cells" + "\n" + "-Literally just copy and paste the excel column into the text box" + "\n" + "-No special characters in the csv file name" + "\n" + "-For anything else, grab Michael")
	throw new Error("Please try again! Thanks!");
}

var headerMacro = "CODE:";
headerMacro += "ADD !EXTRACT SITE" + "\n";
headerMacro += "ADD !EXTRACT RAW_DATA" + "\n";
for (j = 0; j < approvedCategoriesArray.length; j++) {
	var category = approvedCategoriesArray[j];
	headerMacro += "ADD !EXTRACT " + category + "\n";
}
headerMacro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + alias + "/Desktop FILE=" + outputFileName + "\n";

iimPlay(headerMacro);

if (only_numbers){
	output = 1;
}
else {output = 0;}

var site_scores;
function getData(category){
	switch(category){
		case "VIOLENCE":
			if (site_scores.includes("vio")){
				return site_scores.match(/\"vio\":(\d+)/)[output];
			}
			else {return 0}
		case "ILLEGAL_DRUGS":
			if (site_scores.includes("drg")){
				return site_scores.match(/\"drg\":(\d+)/)[output];
			}
			else {return 0}
		case "ALCOHOL":
			if (site_scores.includes("alc")){
				return site_scores.match(/\"alc\":(\d+)/)[output];
			}
			else {return 0}
		case "OFFENSIVE_LANGUAGE":
			if (site_scores.includes("off")){
				return site_scores.match(/\"off\":(\d+)/)[output];
			}
			else {return 0}
		case "ILLEGAL_DOWNLOADS":
			if (site_scores.includes("dlm")){
				return site_scores.match(/\"dlm\":(\d+)/)[output];
			}
			else {return 0}
		case "ADULT_CONTENT":
			if (site_scores.includes("adt")){
				return site_scores.match(/\"adt\":(\d+)/)[output];
			}
			else {return 0}
		case "SUSPICIOUS_ACTIVITY":
			if (site_scores.includes("sam")){
				return site_scores.match(/\"sam\":(\d+)/)[output];
			}
			else {return 0}
		case "HATE_CONTENT":
			if (site_scores.includes("hat")){
				return site_scores.match(/\"hat\":(\d+)/)[output];
			}
			else {return 0}
		case "CLUTTERED":
			if (site_scores.includes("clu")){
				if(site_scores.includes("\"clu\":null")){
					return 0;
				}
				else {return site_scores.match(/\"clu\":(\d+)/)[output];}
			}
			else {return 0}
		case "IAB1_CATEGORIES":
			if (site_scores.includes("iab1")){
				return site_scores.match(/\"iab1\":\[(.*?)\]/)[0];
			}
			else {return 0}
		case "IAB2_CATEGORIES":
			if (site_scores.includes("iab2")){
				return site_scores.match(/\"iab2\":\[(.*?)\]/)[0];
			}
			else {return 0}
		case "LANGUAGE":
			if (site_scores.includes("lang")){
				return site_scores.match(/\"lang\":\"(.*?)\"/)[0];
			}
			else {return 0}
		case "TRAQ":
			if (site_scores.includes("traq")){
				if(site_scores.includes("\"traq\":null")){
					return 0;
				}
				else {return site_scores.match(/\"traq\":(\d+)/)[output];}
			}
			else {return 0}
		case "IVT":
			if (site_scores.includes("ivt")){
				return site_scores.match(/\"ivt\":(\d+)/)[output];
			}
			else {return 0}
		case "IVP":
			if (site_scores.includes("ivp")){
				return site_scores.match(/\"ivp\":(\d+)/)[output];
			}
			else {return 0}
		case "NIV":
			if (site_scores.includes("niv")){
				return site_scores.match(/\"niv\":(\d+)/)[output];
			}
			else {return 0}
		case "IVL":
			if (site_scores.includes("ivl")){
				return site_scores.match(/\"ivl\":(\d+)/)[output];
			}
			else {return 0}
		case "IVU":
			if (site_scores.includes("ivu")){
				return site_scores.match(/\"ivu\":(\d+)/)[output];
			}
			else {return 0}
		case "IVIAB":
			if (site_scores.includes("iviab")){
				return site_scores.match(/\"iviab\":(\d+)/)[output];
			}
			else {return 0}
		case "AVERAGE_TIME_ON_PAGE":
			if (site_scores.includes("top")){
				return site_scores.match(/\"top\":(\d+)/)[output];
			}
			else {return 0}
		case "VISIBILITY":
			if (site_scores.includes("vis")){
				if(site_scores.includes("\"vis\":null")){
					return 0;
				}
				else {return site_scores.match(/\"vis\":(\d+)/)[output];}
			}
			else {return 0}
		default: 
			alert("WHAT DID YOU DO, I CANNOT FIND CATEGORY IN SWITCH");
			throw new error("Something went wrong, did you mess with the boilerplate code? I TOLD YOU NOT TO DO THAT.");
	}
}

for (k = 0; k < siteArrayLength; k++) {
	var currentSite = siteArray[k];
	var macro = "CODE:";
	macro += "URL GOTO=https://api.adsafeprotected.com/db2/client/" + client_id + "/itgrl?adsafe_url=" + currentSite + "\n";
	macro += "TAG POS=1 TYPE=HTML ATTR=* EXTRACT=TXT" + " \n";
	iimPlay(macro);
	site_scores = iimGetExtract();

	var printDataMacro = "CODE:";
	printDataMacro += "ADD !EXTRACT " + currentSite + "\n";
	printDataMacro += "ADD !EXTRACT " + site_scores + "\n";
	for (l = 0; l < approvedCategoriesArray.length; l++){
		printDataMacro += "ADD !EXTRACT " + getData(approvedCategoriesArray[l]) + "\n";
	}
	printDataMacro += "SAVEAS TYPE=EXTRACT FOLDER=/Users/" + alias + "/Desktop FILE=" + outputFileName + "\n";
	iimDisplay("Currently grabbing the goodies.\n\nCurrently on site " + k + " of " + siteArrayLength + "\n\nSite: " + currentSite);
	iimPlay(printDataMacro);
}


iimDisplay("All done!\n\nOutput file named " + outputFileName + " downloaded to " + alias + "\'s desktop.");


//                                        Author: Michael Wilson