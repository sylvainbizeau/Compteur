    function connect() {
        function H(e) { //isHidden
            return !( e.offsetWidth || e.offsetHeight )
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    i = document.getElementById('innerContent');
                    f = i.contentDocument || i.contentWindow.document;
                    e = f.getElementById('toDesign');
                    n = 1;
                } catch (err) {
                    try {
                        e = document.getElementById('warningMess').parentElement.parentElement.children[2].children[0];
                        n = 2;
                    } catch (err) {
                        try {
                            e = document.getElementById('designId_FRME_POWER_WIZARD');
                            iH = e.innerHTML;
                            n = 3;
                        } catch (err) {

                        }
                    }
                }
                if (e !== null) {
                    e.value = this.responseText;
                    if (n==1) checkDesignSingle('toDesign');
                    if (n==2) checkDesignExists(this.responseText);
                    if (n==3) checkDesign('designId_FRME_POWER_WIZARD');
                }
                document.body.style.cursor = "default";
            }
        };
        c = false;
        try {
            //alert("1");
            i = document.getElementById('innerContent');
            f = i.contentDocument || i.contentWindow.document;
            e = f.getElementById('toDesign');
            c = true;
        } catch (err) {
            try {
                //alert("2");
                e = document.getElementById('warningMess').parentElement.parentElement.children[2].children[0];
                v = H(e);
                if (v) throw 0;
                c = true;
            } catch (err) {
                try {
                    //alert("3");
                    e = document.getElementById('designId_FRME_POWER_WIZARD');
                    iH = e.innerHTML;
                    c = true;
                } catch (err) {
                    alert("Aucune zone texte compatible n%27a été trouvé");
                    const tab = window.open("http://cb-compteur.herokuapp.com/", "_blank");
                }
            }
        }
        if (c == false) return;
        xhttp.open("GET", "http://cb-compteur.herokuapp.com/nb?d="+Date.now(), true);
        xhttp.send();
        document.body.style.cursor = "wait";
    }