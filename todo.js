showtask()
let addtaskinput = document.getElementById('addtaskinput');

let addtaskbtn = document.getElementById("addtaskbtn");
addtaskbtn.addEventListener("click", function(){

 addtaskinputval = addtaskinput.value;
if(addtaskinputval != ""){
    let webtask = localStorage.getItem("localtask");
if(webtask == null){
    taskobj = [];
}
else{
    taskobj = JSON.parse(webtask);
}
taskobj.push(addtaskinputval);
localStorage.setItem("localtask",JSON.stringify(taskobj));
addtaskinput.value = "";
}

showtask();


})
function showtask() {
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskobj = [];
    }
    else{
        taskobj = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskobj.forEach((item, index) => {
        html += `<tr>
        <th scope="row">${index+1}</th>
        <td>${item}</td>
        <td><button type="button" onclick="edittask(${index})" class="text-success">
            <i class="fa fa-edit"></i>Edit
        </button></td>
        <td><button type="button" onclick = "deleteitem(${index})" 
        class="text-danger">
            <i class="fa fa-trash"></i>Delete
        </button></td>`;
    });
    addedtasklist.innerHTML = html;
}
function edittask(index) {
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    addtaskinput.value = taskobj[index];
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "block";
}
// save content
let savetaskbtn = document.getElementById("savetaskbtn");

savetaskbtn.addEventListener("click", function(){
let addtaskbtn = document.getElementById("addtaskbtn");
let webtask = localStorage.getItem("localtask");
let taskobj = JSON.parse(webtask);
let saveindex = document.getElementById("saveindex").value;
taskobj[saveindex] = addtaskinput.value;
localStorage.setItem("localtask",JSON.stringify(taskobj));
showtask();
addtaskbtn.style.display = "block";
savetaskbtn.style.display = "none";
addtaskinput.value = "";
}
)
// delete item
function deleteitem(index) {
let webtask = localStorage.getItem("localtask");
let taskobj = JSON.parse(webtask);
taskobj.splice(index,1);
taskobj.forEach((item, index, arr)=>{
arr[index] = item + " hurry";
})
localStorage.setItem("localtask",JSON.stringify(taskobj));
showtask();
}
//now delete all
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", () => {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);   
    taskobj = [];
    localStorage.setItem("localtask",JSON.stringify(taskobj));
    showtask();

})

//last one is Search
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", () =>{
    let tolist = document.querySelectorAll("tr");
    Array.from(tolist).forEach((item)=>{
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextval = searchtextbox.value;
        let se = new RegExp(searchtextval,'gi');
        if(searchedtext.match(se)){
            item.style.display = "table-row";
        }
        else {
            item.style.display = "none";
        }

    })
})