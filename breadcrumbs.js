function getPageName(page) {
    var name = "";
    if (page === "/WebTech1Project/index.html")
        name = "Domov";
    else if(page === "/WebTech1Project/articles.html")
        name = "Články";
    else if(page === "/WebTech1Project/Zabava/index.html")
        name = "Zábava";
    else if(page === "/WebTech1Project/Zabava/Hry/index.html")
        name = "Hry";
    else if(page === "/WebTech1Project/Zabava/Hry/Macko/index.html")
        name = "Hra Macko";
    else if(page === "/WebTech1Project/Zabava/Hry/Rener/index.html")
        name = "Hra Rener";
    else if(page === "/WebTech1Project/Zabava/Hry/Hodor/index.html")
        name = "Hra Hodor";
    return name;
}
var pages_array = JSON.parse(window.localStorage.getItem("pages"));
if (pages_array == null)
    pages_array = [];
var page = window.location.pathname;
if (pages_array.length === 5){
    pages_array.shift();
}
pages_array.push(page);

window.localStorage.setItem("pages", JSON.stringify(pages_array));
document.getElementById("breadcrumbs").innerHTML = "";
for (let i = pages_array.length - 1; i >= 0 ; i--) {
    let name = getPageName(pages_array[i]);
    document.getElementById('breadcrumbs').innerHTML += ' \< <a href=\"' + pages_array[i]+ '\">'+ name +'</a>';
}