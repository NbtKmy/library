// Das Variabel YoderM soll "y (dieses Jahr)", "m (dieser Monat)", "ly (letztes Jahr)" oder "lm (letzter Monat)" eingegeben werden
function Neuerwerbung(Prefix, YoderM) {
    
    // Datum heute
    const d = new Date(Date.now());
    const Datum = d.toISOString();
    // ISO-String z.B. "2022-02-18T13:38:17.783Z"
    const Jahr = Datum.slice(0,4);
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
    

    let Suchstring;

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
    }
    
    
    
	window.open("https://uzb.swisscovery.slsp.ch/discovery/search?tab=41SLSP_UZB_DN_and_CI&search_scope=DN_and_CI&vid=41SLSP_UZB:UZB&offset=0&query=any,contains," + Suchstring);
}
