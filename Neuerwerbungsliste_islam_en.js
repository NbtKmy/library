// mon = 1 bedeutet letzter Monat, mon = 2 bedeutet vorvorletzter Monat usw.
// lang = ISO 639-1 Code entweder de oder en...
function Neuerwerbung_UAOII_EN(mon, lang) {
    //console.log(mon);
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
    let Suchstring = "UAOII-";

    // Monat festlegen
    if (lang === "en"){
        var monate = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=41SLSP_UZB_DN_and_CI&search_scope=DN_and_CI&vid=41SLSP_UZB:UZB&lang=en&offset=0&query=any,contains,";
    } else {
        var monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        var linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=41SLSP_UZB_DN_and_CI&search_scope=DN_and_CI&vid=41SLSP_UZB:UZB&offset=0&query=any,contains,";
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

    
    
    
    let link = linkPart1 + Suchstring;
    let return_arr = [link, monatString];
    
    return return_arr;

}

// Linkliste erstellen
document.addEventListener("DOMContentLoaded", function() {
    let anchor = document.querySelector('#uaoii_en');
    let ancElments = document.querySelectorAll('#uaoii_en .link');
    let lang = document.documentElement.lang;
    console.log(lang);
  
    let ancContents = '<li><a href="https://www.ub.uzh.ch/en/contact/anschaffungsvorschlag.html" target="_blank" rel="noopener noreferrer">Acquisition proposal</a></li>';
  
    ancElments.forEach(function(el) {
      let mon = Number(el.classList[1]);
      let return_arr = Neuerwerbung_UAOII_EN(mon, lang);
      console.log(return_arr);
      let text = "New acquisitions: " + return_arr[1];
  
      ancContents += '<li><a href=' + return_arr[0] + ' target="_blank" rel="noopener noreferrer">' + text + '</a></li>';
    });
    
    const islLink = '<ul><li><a href="https://www.aoi.uzh.ch/en/islamwissenschaft.html" target="_blank" rel="noopener noreferrer">Islamic Studies</a></li></ul>';
  
    anchor.innerHTML = '<ul>' + ancContents + '</ul>' + islLink;
  });
  