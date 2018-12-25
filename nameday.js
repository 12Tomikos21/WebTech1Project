function getNameday(date, div_area) {
    var xobj = new XMLHttpRequest();
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
             getNamedayXML(this, date, div_area);
        }
    };
    xobj.open('GET', 'meniny.xml', true);
    xobj.send();
}
function getNamedayXML(xml, date, div_area) {
    var xmlDoc = xml.responseXML;
    var records = xmlDoc.getElementsByTagName("zaznam");
    console.log("getNamedayXML: " + date + " " + div_area );
    for (let i = 0; i< records.length; i++) {
        let den = records[i].getElementsByTagName("den");

        if (den[0].childNodes[0].nodeValue === date) {
            let skNameday = records[i].getElementsByTagName("SK")[0];
            if (skNameday != null) {
                document.getElementById(div_area).innerHTML = "Meniny má <b>" + skNameday.childNodes[0].nodeValue;+"</b>";
            } else {
                document.getElementById(div_area).innerHTML =  records[i].getElementsByTagName("SKsviatky")[0].childNodes[0].nodeValue;
            }
            return;
        }
    }
    alert("Nenašiel sa dátum: " + date);
    document.getElementById(div_area).innerHTML = "Nenašiel sa dátum";
}
function addzero(number) {
    if (number < 10 && number.toString().indexOf("0") === -1) {
        console.log("Add zero: "+ number);
        number = "0" + number;
    }
    return number;
}
function setTodayNameday(){
    let todayDay = addzero(new Date().getDate());
    let todayMonth = addzero(new Date().getMonth() + 1);
    let today = todayMonth.toString() + todayDay.toString();
    getNameday(today, "nameday_area");
}
function setNamedayFromInput(){
    let date = document.getElementById('dateText').value;
    console.log("setNamedayFromInput: " + date);
    let array = date.match(/[0-9]+/g);
    date = "";
    for(let i = array.length - 1; i >= 0; i--){
        date += addzero(array[i])
    }
    getNameday(date,"nameday_output");
}

document.getElementById("nameday_area").innerHTML = "Meniny má ";
setTodayNameday();