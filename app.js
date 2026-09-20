const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;
const initialCars = [
 {id:'porsche',make:'Porsche',model:'911 Carrera',trim:'3.0 PDK · A modern icon',year:2022,price:98500,mileage:18400,body:'Coupe',fuel:'Petrol',transmission:'Automatic',condition:'Used',image:photo('photo-1503376780353-7e6692767b70')},
 {id:'mercedes',make:'Mercedes-Benz',model:'C-Class',trim:'C 200 AMG Line · Effortlessly refined',year:2023,price:42900,mileage:22600,body:'Sedan',fuel:'Hybrid',transmission:'Automatic',condition:'Used',image:photo('photo-1618843479313-40f8afb4b4d8')},
 {id:'bmw',make:'BMW',model:'3 Series',trim:'320i M Sport · Made for the driver',year:2022,price:34750,mileage:38200,body:'Sedan',fuel:'Petrol',transmission:'Automatic',condition:'Used',image:photo('photo-1555215695-3004980ad54e')},
 {id:'audi',make:'Audi',model:'Q8',trim:'55 TFSI quattro · Room to explore',year:2024,price:78900,mileage:50,body:'SUV',fuel:'Hybrid',transmission:'Automatic',condition:'New',image:photo('photo-1655284615415-b52cb3c2f8aa')},
 {id:'volvo',make:'Volvo',model:'XC60',trim:'B5 Plus · Scandinavian simplicity',year:2023,price:46500,mileage:27900,body:'SUV',fuel:'Hybrid',transmission:'Automatic',condition:'Used',image:photo('photo-1653637067868-25f861281cca')},
 {id:'vw',make:'Volkswagen',model:'Golf GTI',trim:'2.0 TSI · Everyday, elevated',year:2024,price:36900,mileage:80,body:'Hatchback',fuel:'Petrol',transmission:'Automatic',condition:'New',image:photo('photo-1751079038497-0de0540a4546')}
];
const $ = (s) => document.querySelector(s);
const money = (n) => new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const number = (n) => new Intl.NumberFormat('en-IE').format(n);
const escapeHTML = (v) => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const placeholder = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600"><rect width="900" height="600" fill="#e5e7de"/><path d="M180 350l38-72 93-25 72-76h159l83 81 61 24 34 68v52H180z" fill="#a0a89a"/><path d="m334 253 59-58h137l60 58z" fill="#d7ddd0"/><circle cx="287" cy="390" r="48" fill="#414a3c"/><circle cx="612" cy="390" r="48" fill="#414a3c"/><text x="450" y="500" text-anchor="middle" font-family="sans-serif" font-size="17" letter-spacing="6" fill="#67715f">AUTOIMPERIA</text></svg>');
function safeImage(url){try{const u=new URL(url);return u.protocol==='https:'?u.href:placeholder;}catch{return placeholder;}}
let cars = initialCars.map(c=>({...c})), saved = [], removed = [], condition='All';
let editingId = null, listingFromGarage = false;
try {const state=JSON.parse(localStorage.getItem('autoimperia-v1'));if(state && Array.isArray(state.cars) && state.cars.every(c=>c && typeof c.id==='string' && typeof c.make==='string' && typeof c.model==='string' && Number.isFinite(c.price) && Number.isFinite(c.year) && Number.isFinite(c.mileage))){cars=state.cars;removed=Array.isArray(state.removed)?state.removed.filter(entry=>entry && entry.car && typeof entry.car.id==='string' && typeof entry.car.make==='string' && typeof entry.car.model==='string' && Number.isFinite(entry.car.price) && Number.isFinite(entry.car.year) && Number.isFinite(entry.car.mileage) && Number.isInteger(entry.index)):[];saved=Array.isArray(state.saved)?state.saved.filter(id=>typeof id==='string'):[];}} catch {}
// Refresh the original demo photo without discarding saved cars or garage changes.
const golf = cars.find(c => c.id === 'vw');
if (golf && golf.image === photo('photo-1625231334168-35067f8853ed')) {
 golf.image = initialCars.find(c => c.id === 'vw').image;
}
const audi = cars.find(c => c.id === 'audi');
if (audi && audi.image === photo('photo-1606664515524-ed2f786a0bd6')) {
 audi.image = initialCars.find(c => c.id === 'audi').image;
}
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
function persist(){try{localStorage.setItem('autoimperia-v1',JSON.stringify({cars,saved,removed}));return true;}catch{toast('Browser storage is unavailable. Changes will last for this session.');return false;}}
function imageFallback(root=document){root.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{img.src=placeholder;},{once:true});});}
function updateMakes(){const selected=$('#make').value;$('#make').innerHTML='<option value="">All makes</option>'+[...new Set(cars.map(c=>c.make))].sort().map(m=>`<option>${escapeHTML(m)}</option>`).join('');$('#make').value=[...new Set(cars.map(c=>c.make))].includes(selected)?selected:'';}
function render(){
 const query=$('#search').value.trim().toLowerCase(),make=$('#make').value,body=$('#body').value,budget=Number($('#budget').value);
 let results=cars.filter(c=>(condition==='All'||condition==='Saved'&&saved.includes(c.id)||c.condition===condition)&&(!query||`${c.make} ${c.model} ${c.year}`.toLowerCase().includes(query))&&(!make||c.make===make)&&(!body||c.body===body)&&(!budget||c.price<=budget));
 const sort=$('#sort').value;if(sort==='low')results.sort((a,b)=>a.price-b.price);if(sort==='high')results.sort((a,b)=>b.price-a.price);if(sort==='newest')results.sort((a,b)=>b.year-a.year);
 $('#total-count').textContent=cars.length;$('#saved-count').textContent=saved.filter(id=>cars.some(c=>c.id===id)).length;
 $('#result-count').textContent=`${results.length} ${results.length===1?'car':'cars'} to discover`;
 $('#empty').hidden=results.length>0;
 $('#cars').innerHTML=results.map((c,i)=>`<article class="car-card" style="animation-delay:${Math.min(i,8)*45}ms"><div class="car-image"><img src="${escapeHTML(safeImage(c.image))}" alt="${escapeHTML(c.make+' '+c.model)} — illustrative photo" loading="lazy"><span class="badge ${c.sold?'sold':''}">${c.sold?'SOLD':c.condition==='New'?'NEW ARRIVAL':'PRE-OWNED'}</span><button class="save ${saved.includes(c.id)?'selected':''}" data-save="${escapeHTML(c.id)}" aria-label="Save ${escapeHTML(c.make+' '+c.model)}" aria-pressed="${saved.includes(c.id)}">${saved.includes(c.id)?'♥':'♡'}</button></div><div class="car-info"><div class="car-title"><h3>${escapeHTML(c.make==='Mercedes-Benz'?'Mercedes-Benz':c.make)} ${escapeHTML(c.model)}</h3></div><p>${escapeHTML(c.trim||c.body+' · '+c.condition)}</p><div class="specs"><span>${c.year}</span><span>${number(c.mileage)} km</span><span>${escapeHTML(c.fuel)}</span><span>${escapeHTML(c.transmission)}</span></div><div class="car-bottom"><strong class="price">${money(c.price)}</strong><button class="detail-link" data-detail="${escapeHTML(c.id)}">View car <span>↗</span></button></div></div></article>`).join('');imageFallback($('#cars'));
}
function toggleSaved(id){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];const ok=persist();render();if(ok)toast(saved.includes(id)?'Added to your shortlist.':'Removed from your shortlist.');}
function showDetails(id){const c=cars.find(x=>x.id===id);if(!c)return;$('#detail-content').innerHTML=`<img class="detail-photo" src="${escapeHTML(safeImage(c.image))}" alt="${escapeHTML(c.make+' '+c.model)} — illustrative photo"><div class="dialog-pad"><p class="eyebrow">${c.sold?'SOLD':escapeHTML(c.condition==='New'?'NEW ARRIVAL':'PRE-OWNED')} · ${escapeHTML(c.body)}</p><h2 id="detail-title">${escapeHTML(c.make+' '+c.model)}</h2><strong class="price">${money(c.price)}</strong><div class="detail-facts">${[['Year',c.year],['Mileage',number(c.mileage)+' km'],['Fuel',c.fuel],['Transmission',c.transmission],['Body style',c.body],['Availability',c.sold?'Sold':'Available']].map(([k,v])=>`<div><span>${k}</span><strong>${escapeHTML(v)}</strong></div>`).join('')}</div><p class="detail-description">${escapeHTML(c.description||'A car for the journey ahead. Explore the key specifications and save this car to your shortlist to compare it with your favourites.')}</p><div class="detail-actions"><button class="button dark" id="detail-save">${saved.includes(c.id)?'Remove from shortlist':'Save to shortlist'} <span>♡</span></button><button class="button outline" id="detail-garage">Manage in garage ↗</button></div><p class="muted" style="margin-top:20px;margin-bottom:0">Demo listing. Photos are illustrative; specifications and prices are sample data. No purchase or reservation is made here.</p></div>`;$('#detail-save').onclick=()=>{toggleSaved(id);$('#detail-save').innerHTML=`${saved.includes(id)?'Remove from shortlist':'Save to shortlist'} <span>♡</span>`;};$('#detail-garage').onclick=()=>{$('#details').close();openGarage();};imageFallback($('#details'));$('#details').showModal();}
function renderGarage(){
 $('#garage-list').innerHTML=cars.length?cars.map(c=>`<div class="garage-row"><div><strong>${escapeHTML(c.make+' '+c.model)}</strong><p>${money(c.price)} · ${c.sold?'Sold':'Available'} · ${c.year}</p></div><div class="garage-actions"><button data-edit="${escapeHTML(c.id)}" aria-label="Edit ${escapeHTML(c.make+' '+c.model)}">Edit</button><button data-status="${escapeHTML(c.id)}">${c.sold?'Mark available':'Mark as sold'}</button><button class="remove-car" data-remove="${escapeHTML(c.id)}" aria-label="Remove ${escapeHTML(c.make+' '+c.model)}">Remove</button></div></div>`).join(''):'<p class="muted">Your garage is empty. Add a car to get started.</p>';
 $('#garage-undo').hidden=!removed.length;
 $('#removed-message').textContent=removed.length?`${removed.at(-1).car.make} ${removed.at(-1).car.model} removed.`:'';
}
function openGarage(){renderGarage();$('#garage').showModal();}
function openListing(id=null){
 const c=typeof id==='string'?cars.find(c=>c.id===id):null;
 editingId=c?c.id:null;
 listingFromGarage=$('#garage').open;
 $('#garage').close();
 const form=$('#listing-form');form.reset();
 $('#form-error').textContent='';
 $('#listing-title').innerHTML=(c?'Edit your car':'List your car')+'<span class="orange">.</span>';
 $('#listing-description').textContent=c?'Update the details of your local listing.':'Create a local demo listing. No personal details needed.';
 $('#listing-submit').innerHTML=c?'Save changes <span>✓</span>':'Add to my garage <span>↗</span>';
 if(c){for(const name of ['make','model','year','price','mileage','body','fuel','transmission','condition','image','description','trim']){form.elements.namedItem(name).value=c[name]??'';}}
 $('#listing').showModal();
}
$('#listing').addEventListener('close',()=>{
 if(listingFromGarage){listingFromGarage=false;openGarage();}
 editingId=null;
});
$('#undo-remove').onclick=()=>{
 const entry=removed.pop();if(!entry)return;
 cars.splice(Math.min(entry.index,cars.length),0,entry.car);
 if(entry.wasSaved&&!saved.includes(entry.car.id))saved.push(entry.car.id);
 persist();updateMakes();render();renderGarage();
};
function resetFilters(){condition='All';$('#search').value='';$('#make').value='';$('#body').value='';$('#budget').value='';$('#sort').value='featured';updateTabs();render();}
function updateTabs(){document.querySelectorAll('.tab').forEach(b=>{b.classList.toggle('active',b.dataset.condition===condition);b.setAttribute('aria-pressed',String(b.dataset.condition===condition));});}
$('#cars').addEventListener('click',e=>{const save=e.target.closest('[data-save]'),detail=e.target.closest('[data-detail]');if(save)toggleSaved(save.dataset.save);if(detail)showDetails(detail.dataset.detail);});
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{condition=b.dataset.condition;updateTabs();render();});
['search','make','body','budget','sort'].forEach(id=>$('#'+id).addEventListener(id==='search'?'input':'change',render));
$('#reset').onclick=resetFilters;$('#clear-empty').onclick=resetFilters;$('#manage').onclick=openGarage;$('#garage-footer').onclick=openGarage;$('#sell-car').onclick=openListing;$('#add-car').onclick=openListing;
$('#spotlight').onclick=()=>{resetFilters();$('#make').value='Porsche';render();$('#collection').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
$('#garage-list').addEventListener('click',e=>{
 const edit=e.target.closest('[data-edit]');if(edit){openListing(edit.dataset.edit);return;}
 const remove=e.target.closest('[data-remove]');
 if(remove){
  const index=cars.findIndex(c=>c.id===remove.dataset.remove);if(index<0)return;
  const [car]=cars.splice(index,1);removed.push({car,index,wasSaved:saved.includes(car.id)});
  saved=saved.filter(id=>id!==car.id);
  persist();updateMakes();render();renderGarage();$('#undo-remove').focus();return;
 }
 const b=e.target.closest('[data-status]');if(!b)return;
 const c=cars.find(c=>c.id===b.dataset.status);if(!c)return;
 c.sold=!c.sold;const ok=persist();render();renderGarage();if(ok)toast(c.sold?'Marked as sold. You can undo this in your garage.':'Car is available again.');
});
$('#listing-form').onsubmit=e=>{
 e.preventDefault();const f=new FormData(e.target);
 const make=f.get('make').trim(),model=f.get('model').trim();
 if(!make||!model){$('#form-error').textContent='Please enter a make and model.';return;}
 const image=f.get('image').trim();
 if(image && safeImage(image)===placeholder){$('#form-error').textContent='Please use an https:// photo URL.';return;}
 const existing=editingId?cars.find(c=>c.id===editingId):null;
 if(editingId&&!existing){$('#form-error').textContent='This car is no longer in your garage.';return;}
 const values={make,model,year:Number(f.get('year')),price:Number(f.get('price')),mileage:Number(f.get('mileage')),body:f.get('body'),fuel:f.get('fuel'),transmission:f.get('transmission'),condition:f.get('condition'),image,description:f.get('description').trim(),trim:f.get('trim').trim()};
 if(existing){Object.assign(existing,values);}else{cars.unshift({id:crypto.randomUUID(),...values});}
 const ok=persist();updateMakes();resetFilters();e.target.reset();$('#listing').close();
 if(!listingFromGarage)$('#collection').scrollIntoView();
 if(ok)toast(existing?'Your changes have been saved.':'Your car is now in your local collection.');
};
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
$('#year').textContent=new Date().getFullYear();updateMakes();render();imageFallback();
