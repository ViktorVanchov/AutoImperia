// Presentation features: no contact data is uploaded or stored.
const articles = {
 viewing: {title:'Five things to check before a viewing', paragraphs:[
 ['1. Vehicle history','Ask for service records, the number of previous owners, and any known accident or repair history. Note gaps so you can ask about them at the viewing.'],
 ['2. Condition','Inspect the bodywork, tyres, glass, and interior in daylight. Compare wear with the advertised mileage and ask about anything unusual.'],
 ['3. Specifications','Check that the engine, transmission, equipment, and documents match the listing. A photo alone cannot confirm a specification.'],
 ['4. Test drive','Arrange a suitable route and ask what documents are needed. Pay attention to steering, braking, unusual sounds, and how the car feels.'],
 ['5. Independent inspection','For a real purchase, consider an independent inspection before making a decision. This demo does not certify the condition of any vehicle.']]},
 selling: {title:'Getting your car ready to sell', paragraphs:[
 ['Start with the facts','Gather the registration details, service history, mileage, and a clear description of the car’s condition. Include known faults as well as its strengths.'],
 ['Let the photos help','Photograph the front, rear, both sides, interior, and any visible damage in good light. Use your own photos of the actual car.'],
 ['Build a useful listing','Use a clear model name, price, and specification. In My garage, you can edit a listing, mark it sold, or remove it and undo the removal.']]},
 welcome: {title:'Welcome to AutoImperia', paragraphs:[
 ['A showroom with a simpler idea','AutoImperia is a student project exploring how an independent dealership could present its cars and services online.'],
 ['Explore at your own pace','Search the collection, compare key details, and save your favourites. The garage lets you try adding, editing, and removing cars on your own device.'],
 ['A presentation, not a marketplace','The team and contact details are fictional. The enquiry form downloads a text file for demonstration; it does not contact a dealer or make a booking.']]}
};
document.querySelectorAll('[data-article]').forEach(button=>button.addEventListener('click',()=>{
 const article=articles[button.dataset.article];
 $('#article-title').textContent=article.title;
 $('#article-body').replaceChildren(...article.paragraphs.flatMap(([heading,text])=>{
  const h=document.createElement('h3'),p=document.createElement('p');h.textContent=heading;p.textContent=text;return [h,p];
 }));
 $('#article-dialog').showModal();
}));
$('#privacy-open').onclick=()=>$('#privacy-dialog').showModal();
// Remove the retired language setting; garage data is left intact.
try{localStorage.removeItem('autoimperia-language');}catch{}
let cookieChoice=null;
try{cookieChoice=JSON.parse(localStorage.getItem('autoimperia-preferences'));}catch{}
$('#cookie-banner').hidden=!!cookieChoice;
function openCookieSettings(){ $('#cookie-dialog').showModal(); }
$('#cookie-settings').onclick=openCookieSettings;
$('#banner-preferences').onclick=openCookieSettings;
function saveCookieChoice(){
 cookieChoice={essentialOnly:true};
 try{localStorage.setItem('autoimperia-preferences',JSON.stringify(cookieChoice));}catch{}
 $('#cookie-banner').hidden=true;$('#cookie-dialog').close();
}
$('#cookies-essential').onclick=saveCookieChoice;
$('#banner-essential').onclick=saveCookieChoice;
let enquiryUrl=null;
$('#contact-form').addEventListener('input',()=>{ $('#enquiry-result').hidden=true;$('#contact-status').textContent='';if(enquiryUrl){URL.revokeObjectURL(enquiryUrl);enquiryUrl=null;} });
$('#contact-form').onsubmit=e=>{
 e.preventDefault();const f=new FormData(e.target);
 if(!f.get('name').trim()||f.get('message').trim().length<10){$('#contact-status').textContent='Please enter your name and a message of at least 10 characters.';return;}
 const labels=['AutoImperia — demo enquiry (not sent)','Name: ','Email: ','Subject: ','Message:'];
 const text=[labels[0],labels[1]+f.get('name').trim(),labels[2]+f.get('email').trim(),labels[3]+f.get('subject'),'',labels[4],f.get('message').trim()].join('\n');
 if(enquiryUrl)URL.revokeObjectURL(enquiryUrl);
 enquiryUrl=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
 $('#enquiry-preview').value=text;$('#enquiry-download').href=enquiryUrl;$('#enquiry-result').hidden=false;
 $('#contact-status').textContent='Your enquiry is ready. Review it below, then download a copy. Nothing has been sent.';
};
