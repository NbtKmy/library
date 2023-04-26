// Das Variabel YoderM soll "y (dieses Jahr)", "m (dieser Monat)", "ly (letztes Jahr)", "lm (letzter Monat)" oder "l3m (letzte 3 Monate)" eingegeben werden
function Neuerwerbung(Prefix, YoderM) {
    
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
    

    let Suchstring = "";

    switch (YoderM){
        case "y":
            Suchstring = Prefix + Jahr + "*";
            break;
        
        case "m":
            Suchstring = Prefix + Jahr + Monat + "*";
            break;
        
        case "ly":
            Suchstring = Prefix + LetztesJahr + "*";
            break;
        
        case "lm":
            if (Monat == "01"){
                Suchstring = Prefix + LetztesJahr + "12" + "*";
            } else {
                Suchstring = Prefix + Jahr + LetzterMonat + "*";
            }
            break;
        
        case "l3m":
            for (let i = 1; i < 4 ; i++) {
                let xm = mnum - i;
                console.log(xm);
                if (xm < 1){
                    xm = 12 + xm;
                    Jahr = LetztesJahr;
                }

                let xm_string;

                if (i == 3){
                    xm_string = ("0" + xm).slice(-2);
                    Suchstring += Prefix + Jahr + xm_string + "*";
                    break;
                }
                xm_string = ("0" + xm).slice(-2);
                Suchstring += Prefix + Jahr + xm_string + "*" + " OR ";
            }
            break;
    }
    
    const linkPart1 = "https://uzb.swisscovery.slsp.ch/discovery/search?tab=41SLSP_UZB_DN_and_CI&search_scope=DN_and_CI&vid=41SLSP_UZB:UZB&offset=0&query=any,contains,";
    let link = linkPart1 + Suchstring;
    return link;

}



// Linkliste erstellen
window.addEventListener('DOMContentLoaded', function() {
    let anchor = document.getElementById('test');
    let ancElements = anchor.getElementsByClassName('link');
    
    let ancContents = '';
    
    for (let i = 0; i < ancElements.length; i++) {
      let prefix = ancElements[i].className.split(" ")[1];
      let text = ancElements[i].getAttribute('id');
      let url = Neuerwerbung(prefix, 'lm');
      
      ancContents += '<li><a href=' + url + ' target="_blank" rel="noopener noreferrer">' + text + '</a></li>';
    }
    
    anchor.innerHTML = '<ul>' + ancContents + '</ul>';
  });
  
