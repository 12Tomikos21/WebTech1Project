var visit_number = window.localStorage.getItem("visit_number");

if (visit_number === null) {
    visit_number = 0;
}
visit_number++;
window.localStorage.setItem("visit_number", visit_number);
console.log("Visit n."+visit_number);
numbers = visit_number.toString().split('').map(Number);
document.getElementById('visit_counter').innerHTML = '';
for (let i of numbers) {
    document.getElementById('visit_counter').innerHTML += '<span class="counter_number p-2 mr-1">' + i + '</span>';
}