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
    var x, xmlDoc = xml.responseXML;

    let todaydd = new Date().getDate();
    if(todaydd<10)
        todaydd = '0' + todaydd;
    let todaymm = new Date().getMonth()+1;
    if(todaymm<10) {
        todaymm = '0' + todaymm;
    }
    let today = todaymm.toString() + todaydd.toString();

    x = xmlDoc.getElementsByTagName("zaznam");
    for (let i = 0; i< x.length; i++) {
        let den = x[i].getElementsByTagName("den");
        if (den[0].childNodes[0].nodeValue === today) {
            console.log("HURA");
            let skNarodeniny =  x[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
            document.getElementById("nameday_area").innerHTML ="Meniny má "+skNarodeniny;
            break;
        }
    }
}
loadXML();