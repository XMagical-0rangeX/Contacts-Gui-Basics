// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

//contact array
let Contacts = loadContacts();
// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === "Search-by-Email") {
    findByEmail();
  }
}
displayContacts();
// MENU FUNCTIONS
function displayContacts() {
  outputEl.innerHTML = "";
  for (i=0;i<Contacts.length;i++){
   outputEl.innerHTML += `
  <div>
    ${i}: ${Contacts[i].name}<br>
    ${Contacts[i].email}<br>
    ${Contacts[i].phonenum}(${Contacts[i].country})
  </div>
  ` 
  }
  
}

function addContact() {
  index = checkEmail();
  if (index){
   Contacts.push({
    email: index,
    name: prompt("Name of Contact:"),
    phonenum: prompt("Phone Number of Contact:"),
    country: prompt("Country of Contact:")
  })
  saveContacts();
  outputEl.innerHTML = `New Contact Succesfully Added` ;
  } else {
  outputEl.innerHTML = `Contact Addition Prosess Failed`; 
  }
  
}

function removeContact() {
  let index = prompt("What Contacts Number/Email do you want to remove: ");
  if (index >=0 && index<Contacts.length){
    Contacts.splice(index,1);
    saveContacts();
    outputEl.innerHTML = "Contact Successfully Deleted";
  }
  for (i=0;i<Contacts.length;i++){
    if (index === Contacts[i].email){
      Contacts.splice(i,1);
      saveContacts();
    outputEl.innerHTML = "Contact Successfully Deleted";
    }
  }
}

function displayByName() {
  let index = prompt("Input Nmae:").toLowerCase();
  resetOutput();
  for(i=0;i<Contacts.length;i++){
    if (Contacts[i].name.toLowerCase().includes(index)){
      outputEl.innerHTML += displayOneContact(i);
  }
  }
}

function displayByCountry() {
  resetOutput();
  let index = prompt("Insert the country you are searchin for:");
  for (i=0;i<Contacts.length;i++){
    if (Contacts[i].country === index){
      outputEl.innerHTML += displayOneContact(i);
    }
  }
}
function findByEmail () {
  let index = prompt("Insert Email: ")
  resetOutput();
  for(i=0;i<Contacts.length;i++){
    if (Contacts[i].email.toLowerCase().includes(index)){
      outputEl.innerHTML += displayOneContact(i);
    }
  }
}
//Helper Functions
function loadContacts(){
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
  
}
function saveContacts(){
  localStorage.setItem("contacts", JSON.stringify(Contacts));
}
function displayOneContact(i){
  return `
  <div>
    ${i}: ${Contacts[i].name}<br>
    ${Contacts[i].email}<br>
    ${Contacts[i].phonenum}(${Contacts[i].country})
  </div>
  ` 
}
function resetOutput(){
  outputEl.innerHTML = "";
}
function checkEmail (email) {
  for (i=0;i<Contacts.length;i++){
    if (email === Contacts[i].email){
      return -1;
    } 
  }
}
function checkEmail() {
  index = prompt("Email of Contact: ");
  for (i=0;i<Contacts.length;i++){
    if (index.toLowerCase() === Contacts[i].email.toLowerCase()){
      alert("Email already in use!");
      return false;
      
    }
  }
    return index;
  
}