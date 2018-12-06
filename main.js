function loadXML() {
    var xobj = new XMLHttpRequest();
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            getNameday(this);
        }
    };
    xobj.open('GET', 'meniny.xml', true);
    xobj.send(null);
}

function getNameday(xml) {
    var x, xmlDoc;
    xmlDoc = xml.responseXML;

    var todaydd = new Date().getDate();
    if(todaydd<10) {
        todaydd = '0' + todaydd;
    }
    console.log(new Date().getDay());
    var todaymm = new Date().getMonth()+1;
    if(todaymm<10) {
        todaymm = '0' + todaymm;
    }
    var today = todaymm + todaydd;

    x = xmlDoc.getElementsByTagName("den");
    for (let i = 0; i< x.length; i++) {
        console.log(x[i].childNodes[0].nodeValue+ " " + xmlDoc.getElementsByTagName("SK")[i].childNodes[0].nodeValue);
        if (x[i].childNodes[0].nodeValue === today) {
            document.getElementById("nameday_area").innerHTML = "Meniny má "+xmlDoc.getElementsByTagName("SK")[i-3].childNodes[0].nodeValue;
            break;
        }
    }
}
loadXML();