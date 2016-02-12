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
            "message": "«Vi er jo på en øde øy... Vi er trygge, vi!»",
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
            "message": "«Faktisk er vi veldig heldige som er på øya, for båten ligger på vår side, og nå skal den over og hente og hente Politiet som skal sikre øya. Han skal hjelpe oss.»",
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
            "person": "- SMS til Gry Larsen fra Eskil Pedersen (27), Auf leder"
        },
        {
            "event": "",
            "message": "«...det er skyting her! Jeg vet ikke om vi sees igjen...»",
            "person": "- Telefon mellom mamma og Prableen Kaur (18)"
        },
        {
            //17:35
            "event": "Andre prøver å komme seg ned til det kalde vannet for å gjemme seg eller forsøke og svømme mot land",
            "message": "«Alle løper i forskjellige retninger. Vi løper opp skrenten og ned på Kjærlighetsstien. Etterhvert kommer han. Først hører jeg skudd komme nærmere, så skritt ved hodet mitt. Han skyter én etter én, og tref er meg i hodet. Alt blir svart.»",
            "person": "- Marte Fevang Smith (17)"
        }
    ]};

    var getMessage = function(x){
        return messageListJSON.messages[x];
    };

    return{
        getMessage: getMessage
    }

}()); // END TIMELINEMODULE