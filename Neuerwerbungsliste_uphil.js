// mon = 1 bedeutet letzter Monat, mon = 2 bedeutet vorvorletzter Monat usw.
function Neuerwerbung_UPHIL(mon) {
    console.log(mon);
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
    
    // Bsp für Suchstring
    //Suchstring1 = Z01SE202204*
    //Suchstring2 = UPHIL-202204
    let Suchstring1 = "Z01SE";
    let Suchstring2 = "UPHIL-";

    // Monat festlegen
    const monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let xm = mnum - mon;
    
    if (xm < 1){
        xm = 12 + xm;
        Jahr = LetztesJahr;
    }
    let ym = xm - 1; 
    let monatString = monate[ym];

    let xm_string;
    
    xm_string = ("0" + xm).slice(-2);
    Suchstring1 += Jahr + xm_string + "*";
    Suchstring2 += Jahr + xm_string;
    
    const linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?query=any,contains,";
    const linkPart2 = ",AND&query=lds56,contains,100,OR&query=any,contains,";
    const linkPart3 = ",AND&tab=LibraryCatalog&search_scope=MyInstitution&vid=41SLSP_UZB:UZB&mode=advanced&offset=0";
    
    let link = linkPart1 + Suchstring1 + linkPart2 + Suchstring2 + linkPart3;
    let return_arr = [link, monatString];
    
    return return_arr;

}

// Linkliste erstellen
$(function(){
    let anchor = $('#uphil'); 
    let ancElments = $('#uphil .link');
    

    // Entweder
    //ancContents = '';
    // oder
    ancContents = '<li><a href="https://www.ub.uzh.ch/de/contact/anschaffungsvorschlag.html" target="_blank">Anschaffungsvorschlag</a></li>'
    
    $.each(ancElments,function(){
        
        let mon = Number($(this).attr('class').split(" ")[1]);
        let return_arr = Neuerwerbung_UPHIL(mon);
        //console.log(return_arr);
        let text = "Neuerwerbungen: " + return_arr[1];
    

        ancContents += '<li><a href=' + return_arr[0] + ' target="_blank" >' + text + '</a></li>';
    });
    
    const philLink = '<ul><li><a href="https://www.philosophie.uzh.ch/de.html" target="_blank">Philosophisches Seminar</a></li></ul>';

    anchor.empty().append('<ul>' + ancContents + '</ul>' + philLink);
    
});