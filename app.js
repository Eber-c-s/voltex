(async () => {
  const config = window.VOLTEX_CONFIG || {};
  const products = await fetch('./products.json').then(r => r.json()).catch(() => []);
  const address = document.querySelector('#store-address');
  const hours = document.querySelector('#store-hours');
  if (address && config.address) address.textContent = config.address;
  if (hours && config.hours) hours.textContent = config.hours;
  const grid = document.querySelector('#products-grid');
  if (!grid) {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) initializeContactForm(contactForm, config);
    return;
  }
  function initializeContactForm(form, config) {
    const waUrl = message => config.whatsappNumber ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}` : '';
    form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.querySelector('#contact-name')?.value,email=form.querySelector('#contact-email')?.value,message=form.querySelector('#contact-message')?.value,topic=form.querySelector('#contact-topic')?.value;if(!config.whatsappNumber){document.querySelector('#form-status').textContent='Falta configurar WhatsApp en config.js. No se envió.';return;}document.querySelector('#form-status').textContent='Se abrirá WhatsApp para que revises y envíes tu consulta.';window.open(waUrl(`Consulta desde VOLTEX\nTipo: ${topic}\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`),'_blank','noopener,noreferrer')});
  }
  const money = n => '$' + new Intl.NumberFormat('es-CL').format(n) + ' CLP';
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const waUrl = message => config.whatsappNumber
    ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message + ' (Configurar el número de VOLTEX en config.js)')}`;
  function render() {
    const term = normalize(document.querySelector('#hero-search')?.value || new URLSearchParams(location.search).get('q') || '');
    const cat = document.querySelector('#filter-categoria')?.value || '';
    const brand = document.querySelector('#filter-marca')?.value || '';
    const states = [...document.querySelectorAll('.availability-filter:checked')].map(x => x.dataset.status);
    const shown = products.filter(p => (!term || normalize(p.name+' '+p.brand).includes(term)) && (!cat || p.category===cat) && (!brand || p.brand===brand) && (!states.length || states.includes(p.status)));
    grid.innerHTML = shown.map(p => `<article class="bg-white rounded-xl border border-gray-200 p-4 flex flex-col justify-between hover:shadow-lg transition-shadow min-w-0">
      <div><div class="flex items-center justify-between gap-2 mb-3"><span class="text-xs font-semibold ${p.status==='Agotado'?'text-red-700 bg-red-50':p.status==='Poco stock'?'text-amber-800 bg-amber-50':'text-emerald-700 bg-emerald-50'} px-2 py-1 rounded-full">${p.status} · ejemplo</span><span class="text-[10px] font-bold text-gray-500 uppercase">${p.brand}</span></div>
      <div class="h-36 w-full flex items-center justify-center p-2 mb-3 bg-gray-50 rounded-lg"><img loading="lazy" alt="${p.name} — ${p.brand}" class="max-h-full max-w-full object-contain" src="${p.image}"></div><h3 class="text-sm font-semibold text-gray-800 min-h-10">${p.name}</h3><p class="text-lg font-extrabold text-gray-900 mt-2 mb-3">${money(p.price)} <small class="text-xs font-normal text-gray-500">referencial</small></p></div>
      <a class="w-full bg-[#FFD400] hover:bg-[#e6bf00] text-black font-bold text-xs min-h-11 rounded-md flex items-center justify-center gap-2 ${p.status==='Agotado'?'opacity-70':''}" href="${waUrl(`Hola, quisiera consultar la disponibilidad y el precio actualizado de ${p.name}. Precio de referencia: ${money(p.price)}.`)}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i> Consultar por WhatsApp</a></article>`).join('');
    document.querySelector('#empty-state')?.classList.toggle('hidden', shown.length>0);
  }
  document.querySelectorAll('#hero-search,#filter-categoria,#filter-marca,.availability-filter').forEach(el=>el.addEventListener('input',render));
  document.querySelector('#clear-filters')?.addEventListener('click',()=>{document.querySelector('#hero-search').value='';document.querySelector('#filter-categoria').value='';document.querySelector('#filter-marca').value='';document.querySelectorAll('.availability-filter').forEach(x=>x.checked=false);render()});
  const queryCategory = new URLSearchParams(location.search).get('categoria');
  if (queryCategory) { const sel=document.querySelector('#filter-categoria'); const opt=[...sel.options].find(o=>normalize(o.value||o.textContent)===normalize(queryCategory)); if(opt) sel.value=opt.value||opt.textContent; }
  document.querySelectorAll('[data-category]').forEach(a=>{a.href='catalogo.html?categoria='+encodeURIComponent(a.dataset.category)});
  const homeSearch=document.querySelector('#hero-search');
  if(homeSearch){const link=homeSearch.parentElement.querySelector('a[href="catalogo.html"]');link?.addEventListener('click',()=>{if(homeSearch.value.trim())link.href='catalogo.html?q='+encodeURIComponent(homeSearch.value.trim())});}
  document.querySelectorAll('a[href="https://wa.me/"]').forEach(a=>{a.href=waUrl('Hola, quisiera consultar productos y servicios de VOLTEX.');a.rel='noopener noreferrer';a.target='_blank'});
  document.querySelectorAll('a[aria-label="Instagram"]').forEach(a=>{if(config.instagramUrl){a.href=config.instagramUrl;a.target='_blank';a.rel='noopener noreferrer'}else{a.href='#contacto';a.title='Instagram pendiente de configurar'}});

  render();
})();

