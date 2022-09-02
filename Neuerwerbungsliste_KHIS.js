// mon = 1 bedeutet letzter Monat, mon = 2 bedeutet vorvorletzter Monat usw.
// lang = ISO 639-1 Code entweder de oder en...
function Neuerwerbung_KHIS(mon, lang) {
    
    // Sucheinstellung 
    // Prefix von Suchstring für den UB-Bestand. Das Prefix für die UB ist obligatorisch
    let Suchstring = "UKHIS-";
    
    let SuchstringZB = "Z01SE";
    const SuchstringZBDDC = "7?0"; 
    
    
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
    

    // Texte und Link je nach der Sprache (en oder de) erstellen
    let monate, linkPart1, ancContents, stringPrefix;
    if (lang === "en"){
        monate = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=LibraryCatalog&search_scope=MyInstitution&vid=41SLSP_UZB:UZB&lang=en&offset=0&query=any,contains,";
        ancContents = '<li><a href="https://www.ub.uzh.ch/en/contact/anschaffungsvorschlag.html" target="_blank" rel="noopener noreferrer">Acquisition proposal</a></li>';
        stringPrefix = "New acquisitions: "; 
    } else {
        monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=LibraryCatalog&search_scope=MyInstitution&vid=41SLSP_UZB:UZB&offset=0&query=any,contains,";
        ancContents = '<li><a href="https://www.ub.uzh.ch/de/contact/anschaffungsvorschlag.html" target="_blank" rel="noopener noreferrer">Anschaffungsvorschlag</a></li>';
        stringPrefix = "Neuerwerbungen: ";
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
    Suchstring += Jahr + xm_string + "*";
    
    let link, ZB_query;
    if (SuchstringZB === undefined) {
        link = linkPart1 + Suchstring;
    } else {     
        SuchstringZB += Jahr + xm_string + "*,AND&query=lds56,contains," + SuchstringZBDDC + ",NOT&query=lds56,contains,770,NOT&query=lds56,contains,780,NOT&query=lds56,contains,790,OR&query=any,contains,";
        link = linkPart1 + SuchstringZB + Suchstring + "&mode=advanced";
        console.log(link);
    }
    
    return_arr = [link, monatString, ancContents, stringPrefix];
    return return_arr;
}

// Linkliste erstellen und DOM in HTML hineinschieben
$(function(){
    let anchor = $('#erwerbungsListe_KHIS'); 
    let ancElments = $('#erwerbungsListe_KHIS .link');
    let lang = document.documentElement.lang;

    let contentsListe;
    $.each(ancElments,function(){
        
        let mon = Number($(this).attr('class').split(" ")[1]);
        let return_arr = Neuerwerbung_KHIS(mon, lang);

        let text = return_arr[3] + return_arr[1];

        if (contentsListe === undefined){
            contentsListe = return_arr[2] + '<li><a href=' + return_arr[0] + ' target="_blank" rel="noopener noreferrer">' + text + '</a></li>';
        } else {
            contentsListe += '<li><a href=' + return_arr[0] + ' target="_blank" rel="noopener noreferrer">' + text + '</a></li>';
        }
    });
    
    anchor.empty().append('<ul>' + contentsListe + '</ul>');
    
});