const form=document.querySelector('#requestForm');
const message=document.querySelector('#formMessage');
const value=name=>{const field=form.elements[name];return field instanceof RadioNodeList?field.value.trim():(field?.value||'').trim()};

form.addEventListener('submit',event=>{
  event.preventDefault();
  const labels={service:'Leistung',address:'Straße',postal:'PLZ',city:'Ort',property:'Objekt',rooms:'Zimmer',floor:'Etage',elevator:'Aufzug',sqm:'Fläche in m²',date:'Wunschtermin',details:'Beschreibung',name:'Name',phone:'Telefon',email:'E-Mail'};
  const entries=Object.entries(labels).map(([key,label])=>[label,value(key)]).filter(([,entry])=>entry);
  if(!entries.length){
    message.textContent='Bitte tragen Sie mindestens eine kurze Information ein.';
    message.className='form-message error';
    message.hidden=false;
    message.scrollIntoView({behavior:'smooth',block:'nearest'});
    return;
  }
  const lines=['Hallo RäumPartner, ich möchte unverbindlich anfragen.',...entries.map(([label,entry])=>`${label}: ${entry}`)];
  window.open(`https://wa.me/491754083624?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
  message.textContent='Ihre Anfrage wurde an WhatsApp weitergeleitet. Bitte tippen Sie dort noch auf „Senden“.';
  message.className='form-message success';
  message.hidden=false;
});

const serviceMap={"reinigung": "Reinigung", "fensterreinigung": "Fensterreinigung", "umzug": "Umzug und Transport", "gartenpflege": "Gartenreinigung und Gartenpflege", "entruempelung": "Entrümpelung", "haushaltsaufloesung": "Haushaltsauflösung"};
const requested=new URLSearchParams(location.search).get('service');
if(requested && serviceMap[requested]){const field=form.elements.service;const option=[...field.options].find(x=>x.value===serviceMap[requested]);if(option)field.value=option.value;}
