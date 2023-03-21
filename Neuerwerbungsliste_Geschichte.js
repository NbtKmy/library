// mon = 1 bedeutet letzter Monat, mon = 2 bedeutet vorvorletzter Monat usw.
// lang = ISO 639-1 Code entweder de oder en...
function Neuerwerbung_Geschichte(mon, lang, ddc) {
    
    // Sucheinstellung 
    // Prefix von Suchstring für den UB-Bestand. Das Prefix für die UB ist obligatorisch
    var SuchstringUB1 = "UHS-";
    var SuchstringUB2 = "UFSW-";
    // Prefix für den ZB-Bestand ist faklutativ
    // Wenn ZB-Bestand aufgelistet werden soll
    var SuchstringZB = "Z01SE";
    var SuchstringDDC = ddc; 
    
    // Datum heute
    const d = new Date(Date.now());
    const Datum = d.toISOString();
    // ISO-String z.B. "2022-02-18T13:38:17.783Z"
    let Jahr = Datum.slice(0,4);
    //console.log(Jahr);
    const Monat = Datum.slice(5,7);
    
    // Letztes Jahr
    const ynum = Number(Jahr); 
    const lynum = ynum - 1;
    const LetztesJahr = String(lynum);
    
    //  Letzter Monat
    const mnum = Number(Monat);
    const lm = mnum -1
    const LetzterMonat = ("0" + lm).slice(-2);
    
    // Monat festlegen
    if (lang === "en"){
        var monate = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var fach = ["History", "History of the ancient world", "History of Europe", "History of Asia", "History of Africa", "History of North America", "History of South America"];
        var linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=41SLSP_UZB_DN_and_CI&search_scope=DN_and_CI&vid=41SLSP_UZB:UZB&lang=en&offset=0&query=any,contains,";
        var ancContents = '<li><a href="https://www.ub.uzh.ch/en/contact/anschaffungsvorschlag.html" target="_blank" rel="noopener noreferrer">Acquisition proposal</a></li>';
        
    } else {
        var monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        var fach = ["Geschichtswissenschaft", "Alte Geschichte", "Geschichte Europas", "Geschichte Asiens", "Geschichte Afrikas", "Geschichte Nordamerikas", "Geschichte Südamerikas"];
        var linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=41SLSP_UZB_DN_and_CI&search_scope=DN_and_CI&vid=41SLSP_UZB:UZB&offset=0&query=any,contains,";
        var ancContents = '<li><a href="https://www.ub.uzh.ch/de/contact/anschaffungsvorschlag.html" target="_blank" rel="noopener noreferrer">Acquisition proposal</a></li>';
        
    }
    
    
    let xm = mnum - mon;
    
    if (xm < 1){
        xm = 12 + xm;
        Jahr = LetztesJahr;
    }
    let ym = xm - 1; 
    let monatString = monate[ym];

    let xm_string;
    
    xm_string = ("0" + xm).slice(-2);
    let SuchstringUB1Monat = SuchstringUB1 + Jahr + xm_string + "*,OR&query=any,contains,";
    let SuchstringUB2Monat = SuchstringUB2 + Jahr + xm_string + "*,AND&query=lds56,contains," + SuchstringDDC;
    let SuchstringZBMonat = SuchstringZB + Jahr + xm_string + "*,AND&query=lds56,contains," + SuchstringDDC + ",OR&query=any,contains,";
    let linkMonat = linkPart1 + SuchstringZBMonat + SuchstringUB1Monat + SuchstringUB2Monat + "&mode=advanced";

    // Liste für das Jahr
    let SuchstringUB1Jahr = SuchstringUB1 + Jahr + "*,OR&query=any,contains,";
    let SuchstringUB2Jahr = SuchstringUB2 + Jahr + "*,AND&query=lds56,contains," + SuchstringDDC;
    let SuchstringZBJahr = SuchstringZB + Jahr + "*,AND&query=lds56,contains," + SuchstringDDC + ",OR&query=any,contains,";
    let linkJahr = linkPart1 + SuchstringZBJahr + SuchstringUB1Jahr + SuchstringUB2Jahr + "&mode=advanced";

    let Bereichsbezeichnung;
    switch(ddc){
        case "900":
            Bereichsbezeichnung = fach[0];
            break;
        case "930":
            Bereichsbezeichnung = fach[1];
            break;
        case "940":
            Bereichsbezeichnung = fach[2];
            break;
        case "950":
            Bereichsbezeichnung = fach[3];
            break;
        case "960":
            Bereichsbezeichnung = fach[4];
            break;
        case "970":
            Bereichsbezeichnung = fach[5];
            break;
        case "980":
            Bereichsbezeichnung = fach[6];
            break;
    }
    
    return_arr = [linkMonat, monatString, ancContents, linkJahr, Bereichsbezeichnung, Jahr];
    return return_arr;
}

// Linkliste erstellen und DOM in HTML hineinschieben
$(function(){
    let anchor = $('#erwerbungsListe_Geschichte'); 
    let ancElments = $('#erwerbungsListe_Geschichte .link');
    let lang = document.documentElement.lang;

    let contentsListeMonth, contentsListeYear, contentsAll, headlineMonth, headlineYear;
    $.each(ancElments,function(){
        
        let mon = Number($(this).attr('class').split(" ")[1]);
        let ddc = String($(this).attr('class').split(" ")[2]);
        let return_arr = Neuerwerbung_Geschichte(mon, lang, ddc);

        headlineMonth = "Neuerwerbung in " + return_arr[1];
        headlineYear = "Neuerwerbung in Jahr " + return_arr[5];

        let text1 = return_arr[4];
        //let text2 = return_arr[4] + ": " + return_arr[5];

        if (contentsListeMonth === undefined){
            contentsListeMonth = '<li><a href=' + return_arr[0] + ' target="_blank" rel="noopener noreferrer">' + text1 + '</a></li>';
        } else {
            contentsListeMonth += '<li><a href=' + return_arr[0] + ' target="_blank" rel="noopener noreferrer">' + text1 + '</a></li>';
        }

        if (contentsListeYear === undefined){
            contentsListeYear = '<li><a href=' + return_arr[3] + ' target="_blank" rel="noopener noreferrer">' + text1 + '</a></li>';
        } else {
            contentsListeYear += '<li><a href=' + return_arr[3] + ' target="_blank" rel="noopener noreferrer">' + text1 + '</a></li>';
        }
    });
    
    contentsListeMonth = '<h2>' + headlineMonth + '</h2><ul>' + contentsListeMonth + '</ul><br>';
    contentsListeYear = '<h2>' + headlineYear + '</h2><ul>' + contentsListeYear + '</ul>';
    contentsAll = contentsListeMonth + contentsListeYear;
    anchor.empty().append(contentsAll);
    
});