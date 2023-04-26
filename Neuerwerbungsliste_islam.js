// mon = 1 bedeutet letzter Monat, mon = 2 bedeutet vorvorletzter Monat usw.
function Neuerwerbung_UAOII(mon) {
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
    const monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    //const monate_en = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
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

    
    const linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=41SLSP_UZB_DN_and_CI&search_scope=DN_and_CI&vid=41SLSP_UZB:UZB&offset=0&query=any,contains,";
    
    let link = linkPart1 + Suchstring;
    let return_arr = [link, monatString];
    
    return return_arr;

}

// Linkliste erstellen
window.addEventListener('DOMContentLoaded', function () {
    let anchor = document.getElementById('uaoii');
    let ancElments = document.querySelectorAll('#uaoii .link');
    
    let ancContents = '<li><a href="https://www.ub.uzh.ch/de/contact/anschaffungsvorschlag.html" target="_blank" rel="noopener noreferrer">Anschaffungsvorschlag</a></li>';
    
    ancElments.forEach(function(element) {
      let mon = Number(element.classList[1]);
      let return_arr = Neuerwerbung_UAOII(mon);
      let text = "Neuerwerbungen: " + return_arr[1];
      
      ancContents += '<li><a href=' + return_arr[0] + ' target="_blank" rel="noopener noreferrer">' + text + '</a></li>';
    });
    
    const islLink = '<ul><li><a href="https://www.aoi.uzh.ch/de/islamwissenschaft.html" target="_blank" rel="noopener noreferrer">Islamwissenschaft</a></li></ul>';
    
    anchor.innerHTML = '<ul>' + ancContents + '</ul>' + islLink;
  });
  