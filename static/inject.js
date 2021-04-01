    function runInject() {
        un();
        //trois();
        connect();
    }
    function un() {
        var l;
        console.log("1");
        l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        l.setAttribute('href', 'http://localhost:5000/mycss.css');
        document.body.appendChild(l);
    }
    function deux() {
        var i;
        console.log("2");
        i = document.createElement('iframe');
        i.setAttribute('width', '210');
        i.setAttribute('height', '70');
        i.setAttribute('id', 'myFrame');

        i.setAttribute('src', 'http://localhost:5000/');
        document.body.appendChild(i);
    }
    function trois() {
        var d, i;
        console.log("3");
        d = document.createElement('div');
        d.setAttribute('width', '210');
        d.setAttribute('height', '70');
        d.setAttribute('id', 'myDiv');

        i = document.createElement('input');
        i.setAttribute('type', 'text');
        i.setAttribute('name', 'message');
        i.setAttribute('id', 'toDesign');
        
        d.appendChild(i);
        document.body.appendChild(d);
    }
    
    function connect() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    alert("1");
                    i = document.getElementById('innerContent');
                    f = i.contentDocument || i.contentWindow.document;
                    e = f.getElementById('toDesign');
                } catch (err) {
                    try {
                        alert("2");
                        e = document.getElementById('warningMess').parentElement.parentElement.children[2].children[0];
                    } catch (err) {
                        try {
                            alert("3");
                            e = document.getElementById('designId_FRME_POWER_WIZARD');
                            iH = e.innerHTML;
                        } catch (err) {
                            try {
                                alert("4");
                                e = document.getElementById('toDesign');
                                iH = e.innerHTML;
                            } catch (err) {
                                alert("5");
                                d = document.createElement('div');
                                d.setAttribute('width', '210');
                                d.setAttribute('height', '70');
                                d.setAttribute('id', 'myDiv');
                                d.setAttribute('z-index', '2147483637');

                                i = document.createElement('input');
                                i.setAttribute('type', 'submit');
                                i.setAttribute('value', 'Transmettre');
                                
                                d.appendChild(i);
                                e.parentElement.appendChild(i);
                            }
                        }
                    }
                }
                if (e !== null) e.value = this.responseText;
            }
        };
        xhttp.open("GET", "http://localhost:5000/nb?d="+Date.now(), true);
        xhttp.send();
    }