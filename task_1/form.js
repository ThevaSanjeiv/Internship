const form=document.getElementById('credentials'), nameI=document.getElementById('name'), ageI=document.getElementById('age')
const mailI=document.getElementById('mail'), tbody=document.querySelector('#Table tbody'), submit=document.getElementById('submit'), cancel=document.getElementById('cancel')
let details=[]
let index=-1
function render(){
  tbody.innerHTML=''
  for(let i=0;i<details.length;i++){
    const it=details[i]
    const tr=document.createElement('tr')
    tr.dataset.i=i
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
form.addEventListener('submit',e=>{
  e.preventDefault()
  const name=nameI.value.trim(), age=ageI.value.trim(), mail=mailI.value.trim()
  if(!name||!age||!mail) return
  if(index===-1) details.push({name,age,mail})
  else details[index]={name,age,mail}
  render()
  reset()
})
tbody.addEventListener('click',e=>{
  const btn=e.target.closest('button'); 
  if(!btn) return
  const tr=btn.closest('tr'); 
  const i=Number(tr.dataset.i)
  if(btn.classList.contains('edit-btn')){
        const it=details[i]; 
        nameI.value=it.name; 
        ageI.value=it.age; 
        mailI.value=it.mail; index=i;
        submit.textContent='UPDATE'; 
        cancel.style.display=''
    }
  else if(btn.classList.contains('delete-btn')){
         details.splice(i,1); 
         render(); 
         reset() 
        }
})
cancel.addEventListener('click',reset); render()