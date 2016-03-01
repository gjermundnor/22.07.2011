// Mats - Hannah - Gjermund

var TIMELINEMODULE = (function(){

    // JSON-object-liste
    var messageListJSON = { "messages" : [
        {
            //15:58
            "event": "Meldingene om bombene i regjeringskvartalet spres til Utøya,",
            "message": "",
            "person": ""
        },
        {
            //16:04
            "event": "",
            "message": "«Vi er jo på Utøya, en øde øy... Vi er trygge, vi!»",
            "person": ""
        },
        {
            //16:30
            "event": "Samling i Storsalen. Orientering om eksplosjonen.",
            "message": "",
            "person": ""
        },
        {
            //16:57
            "event": "",
            "message": "«Faktisk er vi veldig heldige som er på øya, for båten ligger på vår side, og nå skal den over og hente politiet, som skal sikre øya. Han skal hjelpe oss.»",
            "person": "SMS til mamma fra Marta Svendsen (16)"
        },
        {
            //17:21
            "event": "Skudd blir avfyrt for første gang. Tre personer dør nede ved brygga.",
            "message": "«Oi! Ka e det slags lyder?! Det hørtes nesten ut som skudd!»",
            "person": "- Martha Svendsen "
        },
        {
            //17:23
            "event": "Tre personer ved hovedinngangen til Kafébygget blir skutt og drept.",
            "message": "«...så kjente jeg lukten. Kruttlukt... Herregud!»",
            "person": "- Emilie Bersaas (19)"
        },
        {
            //17:24
            "event": "",
            "message": "«Det er noen som skyter på Utøya!! Mange er døde! SEND POLITIET!!»",
            "person": ""
        },
        {
            //17:25
            "event": "Elleve personer blir skutt ved teltene. To dør umuddelbart.",
            "message": "«Å, politi! Vi er berget! Jeg så en kar gå bort til politimannen, som da løftet pistolen og skjøt ham ned. Han ble skutt tre ganger liggende. Jeg snudde meg. Alle hadde løpt.»",
            "person": "- Pavel Jenssen (17)"
        },
        {
            //17:28
            "event": "I løpet av 2 minuttter er 13 personer skutt inne i Kafébygget.",
            "message": "«...og da faller jeg ned og ser kun gulvet under meg, som blir farget rødt.»",
            "person": "- Hanne Hestø Nedd (20)"
        },
        {
            //17:35
            "event": "",
            "message": "«Våpendesperado løs på Utøya, flere skutt!»",
            "person": "SMS til Gry Larsen fra Eskil Pedersen (27), Auf leder"
        },
        {
            //17:35
            "event": "Andre prøver å komme seg ned til det kalde vannet for å gjemme seg eller forsøke og svømme mot land",
            "message": "«Alle løper i forskjellige retninger. Vi løper opp skrenten og ned på Kjærlighetsstien. Etterhvert kommer han. Først hører jeg skudd komme nærmere, så skritt ved hodet mitt. Han skyter én etter én, og treffer meg i hodet. Alt blir svart.»",
            "person": "- Marte Fevang Smith (17)"
        },
        {
            //17:37
            "event": "",
            "message": "«Folk gjemmer seg i alle sprekkene i berget langs kysten. Nede ved vannet er det folk og bak store og små steiner er det folk. Det er fult av folk. Overalt. Når han kommer og begynner å skyte kan man høre at folk både hopper og detter ned. Noen landet i vannet, men de fleste landet rett på steinene.»",
            "person": "– Tonje Brenna (23)",
        },
        {
            //17:42
            "event": "",
            "message": "«Mamma, si til politiet at de må skynte seg. Folk dør her!»",
            "person": "SMS til mamma fra Julie Bremnes (16)",
        },
        {
            //17:43
            "event": "",
            "message": "«Politiet må sende helikopter!!!!!!»",
            "person": "SMS til pappa fra Håvard Vederhus (21)",
        },
        {
            //17:44
            "event": "",
            "message": "«Jeg hører han tar i dørhåndtaket, så krabber jeg litt unna døra og da smeller det. 2 skudd.»",
            "person": "- Even Kleppen (32)",
        },
        {
            //17:45
            "event": "",
            "message": "«Jeg sitter i skolestua! Han har nettopp skutt 2 skudd utenifra, men ingen truffet. Tror han har gått»",
            "person": "SMS fra Aud Helen W. Øyen (23)",
        },
         {
            //17:48
            "event": "",
            "message": "«Vi greide å ro båten Reiulf ut fra brygga, ca 100 meter, før han kom ned til brygga og skøyt direkte mot oss. Ingen ble truf et, så han ga opp og gikk tilbake mot øya»",
            "person": "- Eivind Rindal (23)",
        },
        {
        //17:51
            "event": "Politiet gir beskjed til de som kommer gjennom på telefon fra øya at de er på vei på alle mulige måter. Land, vann og luft.",
            "message": "«Jeg hører at skuddene kommer nærmere. Jeg tenker det er nå eller aldri, nå må jeg bare svømme. Så la vi på svøm. Hele øya lyste opp i et oransje skjær, så kom det skudd mot oss i vannet.»",
            "person": "- Mari Aaby West (25)",
        },
        {
        //18:02
            "event": "På norspissen av øya ved Bolsjevika og Stoltenberget blir 8 mennesker drept.",
            "message": "",
            "person": "",
        },
        {

        //18:04
            "event": "Den første sivile båten har startet redningsarbeidet og plukker opp flere av de som har lagt ut på svøm",
            "message": "",
            "person": "",
        },
        {

        //18:09
            "event": "",
            "message": "«Vi som var rundt Pumpehuset var blitt enige om at det ikke lenger var lov å ringe til noen, bare sende meldinger – og bare hviske. Vi skulle ikke lage lyd.»",
            "person": "– Prableen Kaur (18)",
        },
        {

        //18:11
            "event": "",
            "message": "«Etter en stund ser vi en mann som kommer ruslende bort fra siden. Da legger alle seg ned.Han stopper ved Pumpehuset og ser ned og sier “Hei, jeg er fra politiet. Jeg er her for å evakuere dere. Vi har en båt der borte.” Da en jente spør om han har legitimasjon begynner han å skyte.»",
            "person": "– Dana Barzingi (21)",
        },
        {

        //18:14
            "event": "",
            "message": "«Så ble det stille. Jeg hørte bare vannet som traf steinene, og regndråper»",
            "person": "– Prableen Kaur (18)",
        },
        {

        //18:27
            "event": "På sørspissen er nå 5 drept og 5 hardt skadde.",
            "message": "",
            "person": "",
        },
        {

        //18:34

            "event": "«Gjerningsmannen blir nå tatt, men ikke alle på øya vet det. Og den neste timen er det mye usikkerhet og redsel fremdeles.»",
            "message": "",
            "person": "",
        }

    ]};

    var getMessage = function(x){
        return messageListJSON.messages[x];
    };

    return{
        getMessage: getMessage
    }

}()); // END TIMELINEMODULE