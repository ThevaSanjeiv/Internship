const form=document.getElementById('credentials'), nameI=document.getElementById('name'), ageI=document.getElementById('age')
const mailI=document.getElementById('mail'), tbody=document.querySelector('#Table tbody'), submit=document.getElementById('submit'), cancel=document.getElementById('cancel')
let details=[]
let index=-1
let stored = localStorage.getItem('details')
if(stored){
  details = JSON.parse(stored)
  render()
}
function save(){
  localStorage.setItem('details', JSON.stringify(details))
}

function render(){
  tbody.innerHTML=''
  for(let i=0;i<details.length;i++){
    const it=details[i]
    const tr=document.createElement('tr')
    tr.myIndex = i
    tr.innerHTML='<td>'+it.name+'</td><td>'+it.age+'</td><td>'+it.mail+'</td><td><div class="actions"><button class="table-btn edit-btn">Edit</button><button class="table-btn delete-btn">Delete</button></div></td>'
    tbody.appendChild(tr)
  }
}
function reset(){
  form.reset()
  index=-1
  submit.textContent='SUBMIT'
  cancel.style.display='none'
}
// form.addEventListener('submit',e=>{
//   e.preventDefault()
//   const name=nameI.value.trim()
//   const age=ageI.value.trim()
//   const mail=mailI.value.trim()
//   if(!name){
//     nameI.setCustomValidity("Please enter your Name");
//     name.reportValidity();
//     name.preventDefault();
//   } 
// //   if(!name||!age||!mail) return
//   if(index===-1) details.push({name,age,mail})
//   else details[index]={name,age,mail}
//     save()
//   render()
//   reset()
// })
form.addEventListener('submit', e => {
  e.preventDefault()
  nameI.setCustomValidity("")
  ageI.setCustomValidity("")
  mailI.setCustomValidity("")
  if(nameI.value.trim() === ""){
    nameI.setCustomValidity("Please enter your Name")
    nameI.reportValidity()
    return
  }
  if(ageI.value.trim() === ""){
    ageI.setCustomValidity("Please enter your Age")
    ageI.reportValidity()
    return
  }
  if(mailI.value.trim() === ""){
    mailI.setCustomValidity("Please enter your Email")
    mailI.reportValidity()
    return
  }
  if(index === -1)
    details.push({ name: nameI.value.trim(), age: ageI.value.trim(), mail: mailI.value.trim() })
  else
    details[index] = { name: nameI.value.trim(), age: ageI.value.trim(), mail: mailI.value.trim() }
  save()
  render()
  reset()
})

tbody.addEventListener('click',e=>{
  const btn=e.target.closest('button'); 
  if(!btn) return
  const tr=btn.closest('tr'); 
  const i=tr.myIndex;
  if(btn.classList.contains('edit-btn')){
        const it=details[i]; 
        nameI.value=it.name; 
        ageI.value=it.age; 
        mailI.value=it.mail; index=i;
        submit.textContent='UPDATE'; 
        cancel.style.display='';
    }
  else if(btn.classList.contains('delete-btn')){
         details.splice(i,1); 
         render()
         save()
         reset() 
        }
})
cancel.addEventListener('click',reset); render()