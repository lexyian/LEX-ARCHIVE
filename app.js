/* ===== EDIT THESE BEFORE YOU UPLOAD ===== */
const SITE='NOIR',SITE2='Cinema'; // site name shown in the top bar, tab title and footer
const ADMIN={name:'Admin',email:'admin@luma.ph',pass:'admin123'}; // admin account: change the password!
/* ========================================= */
const $=s=>document.querySelector(s),cl=(v,a,b)=>Math.min(b,Math.max(a,v)),P=n=>'₱'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const MV=[
  {
    t:'The Hunger Games: Sunrise on the Reaping',
    g:['Action','Adventure'],
    l:158,
    r:'R-13',
    s:'now',
    p:'',
    d:'',
    c:['#243b35','#71836b','#c9b98e']
  },
  {
    t:'The Body',
    g:['Drama','Thriller','Romance'],
    l:160,
    r:'R-18',
    s:'now',
    p:'',
    d:'',
    c:['#2a1718','#8e5849','#c59b83']
  },
  {
    t:'Obsession',
    g:['Horror','Thriller'],
    l:108,
    r:'R-16',
    s:'now',
    p:'',
    d:'',
    c:['#240707','#b30016','#f02020']
  },
  {
    t:'Paper Moon',
    g:['Romance','Drama'],
    l:154,
    r:'PG',
    s:'now',
    p:'',
    d:'',
    c:['#e8dfc8','#8ba8c1','#f4ead7']
  },
  {
    t:'Avengers: Doomsday',
    g:['Action','Adventure'],
    l:165,
    r:'PG',
    s:'soon',
    p:'',
    d:'',
    c:['#071b13','#17623a','#07110c']
  }
];

const GN=['Action','Adventure','Animation','Comedy','Crime','Drama','Fantasy','Horror','Musical','Romance','Sci-Fi','Thriller'],
RT=['G','PG','R-13','R-16','R-18'];

const meta=m=>m.g.join(' · ')+' · '+m.l+' min · '+m.r,
rb=r=>`<span class="rt rt${r.replace(/\W/g,'')}">${r}</span>`;

MV.forEach(m=>m.m=meta(m));
const TM=['1:00 PM','4:15 PM','7:30 PM','10:00 PM'],CN=['Cinema 1','Cinema 2'];
const SN=[['Classic Popcorn (L)',180],['Cheese Popcorn (L)',200],['Soda (Large)',110],['Hotdog Sandwich',150],['Nachos with Dip',190],['Combo: Popcorn + 2 Sodas',360]];
let PRICE=350,FEE=20;const MAX=10,ROWS=8,COLS=12,HOLD=300;
const DL=[...Array(5)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()+i);return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})});
let DB=[];try{DB=JSON.parse(localStorage.getItem('luma')||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem('luma',JSON.stringify(DB))}catch(e){}};
let CFG={price:350,fee:20,off:[],sn:{},mv:[]};try{CFG={...CFG,...JSON.parse(localStorage.getItem('lumacfg')||'{}')}}catch(e){}
const savec=()=>{try{localStorage.setItem('lumacfg',JSON.stringify(CFG))}catch(e){}};
PRICE=CFG.price;FEE=CFG.fee;Object.keys(CFG.sn).forEach(i=>SN[i][1]=CFG.sn[i]);
try{const x=JSON.parse(localStorage.getItem('lumamv')||'[]');if(x.length)MV.splice(0,MV.length,...x)}catch(e){}
const savem=()=>{try{const slim=MV.map(m=>({...m,p:typeof m.p==='string'&&m.p.startsWith('data:')?'':m.p}));localStorage.setItem('lumamv',JSON.stringify(slim))}catch(e){toast('Could not cache movies in this browser.')}};
let USERS=[],U=null;try{USERS=JSON.parse(localStorage.getItem('lumausers')||'[]');U=USERS.find(u=>u.email==localStorage.getItem('lumases'))||null}catch(e){}
const saveu=()=>{try{localStorage.setItem('lumausers',JSON.stringify(USERS))}catch(e){}},setU=()=>{try{localStorage.setItem('lumases',U?U.email:'')}catch(e){}};
const hp=async p=>{try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('luma:'+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return'f'+hash('luma:'+p)}};
const S={ei:-1,tab:'over',q:'',cf:'',ng:[],np:'',mt:'now',am:'in',ret:'movies',v:'movies',step:1,mi:0,di:0,ti:2,ci:0,flat:false,z:1,sel:new Set(),sn:{},pay:'GCash',end:0,hov:-1,last:-1,f:{n:'',e:'',p:'',a:''},done:null,saving:false};
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const K=()=>[S.mi,S.di,S.ti,S.ci].join('|'),rw=i=>i/COLS|0,lab=i=>String.fromCharCode(65+rw(i))+(i%COLS+1);
const bk=()=>DB.filter(b=>b.k==K()&&!b.x);
function stat(i){if(bk().some(b=>b.s.includes(i)))return't';const h=hash(K()+'s'+i)%100;return h<26?'t':h<31?'h':S.sel.has(i)?'p':'a'}
const tot=()=>{const n=S.sel.size,sn=SN.reduce((s,x,i)=>s+x[1]*(S.sn[i]||0),0);return{n,t:n*PRICE,f:n*FEE,all:n*(PRICE+FEE)+sn}};
const hl=()=>{const s=Math.max(0,Math.ceil((S.end-Date.now())/1000));return 'Seats held for '+(s/60|0)+':'+String(s%60).padStart(2,'0')};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),2000)};
/* seat map element (kept alive between steps) */
const E=document.createElement('div'),q=s=>E.querySelector(s);
E.innerHTML=`<h2>Pick your seats</h2><p class="mut">Tap a seat to select it. You can pick up to ${MAX} seats. Hover or tap to preview your view of the screen.</p><div class="map" style="margin-top:12px"><div class="bar"><div class="seg"><button class="on" data-a="md" data-p="3d">3D</button><button data-a="md" data-p="flat">Flat</button></div><span id="tag" class="mono"></span><div class="zm"><button data-a="zm" data-p="-1">−</button><b id="zl">100%</b><button data-a="zm" data-p="1">+</button></div></div><div class="vp"><canvas id="c"></canvas><div id="flat" hidden></div></div><div class="lg"><span><i style="background:#8a8a86"></i>Available</span><span><i style="background:#e03a2f"></i>Your pick</span><span><i style="background:#2b2b2b;border:1px solid #555"></i>Taken</span><span><i style="background:#b58a2a"></i>On hold</span></div></div><div class="mono lab">Selected seats</div><div id="sl"></div>`;
const PVE=document.createElement('div');PVE.className='pv';PVE.innerHTML='<div class="mono lab">View from your seat</div><canvas id="pvc"></canvas><small id="pvt" class="mono"></small>';
/* 3D */
const cv=q('#c'),pvc=PVE.querySelector('#pvc'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true}),PV=new THREE.WebGLRenderer({canvas:pvc,antialias:true}),S3=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1.6,.1,100),pcam=new THREE.PerspectiveCamera(62,2,.1,100);
[R,PV].forEach(r=>r.setPixelRatio(Math.min(devicePixelRatio,2)));PV.setClearColor(0x111111);S3.background=new THREE.Color(0x0b0b0c);S3.fog=new THREE.Fog(0x0b0b0c,28,60);
S3.add(new THREE.HemisphereLight(0xb5b0c8,0x1a1a1e,.95));const L=new THREE.PointLight(0xffffff,1.4,45);L.position.set(0,3.4,-8.5);S3.add(L);
const mt=(c,e=0)=>new THREE.MeshStandardMaterial({color:c,roughness:.75,emissive:c,emissiveIntensity:e});
const add=(g,m,x,y,z,rx=0,ry=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.rotation.set(rx,ry,0);S3.add(o);return o};
const B=THREE.BoxGeometry,PL=THREE.PlaneGeometry,wall=mt(0x1d1d20),carpet=mt(0x2a2a2e),strip=new THREE.MeshBasicMaterial({color:0xe03a2f});
const pos=(r,c)=>({x:(c-5.5)*.95+(c<3?-.55:c>8?.55:0),y:r*.4,z:-3+r*1.4});
add(new B(14.4,.2,7.3),carpet,0,-.1,-7.35);
for(let r=0;r<ROWS;r++){const p=pos(r,0);add(new B(14.4,p.y+.2,1.4),carpet,0,(p.y-.2)/2,p.z);add(new B(14.4,.05,.05),strip,0,p.y+.03,p.z-.7)}
add(new PL(18.5,8.8),wall,-7.2,4.2,-1.75,0,Math.PI/2);add(new PL(18.5,8.8),wall,7.2,4.2,-1.75,0,-Math.PI/2);
add(new PL(14.4,8.8),wall,0,4.2,7.5,0,Math.PI);add(new PL(14.4,8.8),wall,0,4.2,-11);add(new PL(14.4,18.5),mt(0x101012),0,8.6,-1.75,Math.PI/2);
const sc=document.createElement('canvas');sc.width=1024;sc.height=448;const tex=new THREE.CanvasTexture(sc);
add(new PL(13,5.7),new THREE.MeshBasicMaterial({map:tex}),0,3.45,-10.88);add(new PL(13.6,6.3),mt(0),0,3.45,-10.95);
const MT={a:mt(0x8a8a86,.05),p:mt(0xe03a2f,.55),t:mt(0x2b2b2b),h:mt(0xb58a2a,.2)};
const seats=[],heads=[],hm=mt(0x3a3a3e),sg=new B(.8,.3,.75),bg=new B(.8,.75,.16),hg=new THREE.SphereGeometry(.17,10,8);
for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){const p=pos(r,c),i=r*COLS+c,a=add(sg,MT.a,p.x,p.y+.42,p.z),b=add(bg,MT.a,p.x,p.y+.85,p.z+.33,.18);a.userData.i=b.userData.i=i;seats.push([a,b]);heads.push(add(hg,hm,p.x,p.y+1.05,p.z+.12))}
const PK=seats.flat();
function paint(){const m=MV[S.mi],x=sc.getContext('2d'),g=x.createLinearGradient(0,0,1024,448);m.c.forEach((c,i)=>g.addColorStop(i/2,c));x.fillStyle=g;x.fillRect(0,0,1024,448);
x.fillStyle='rgba(0,0,0,.28)';x.fillRect(0,300,1024,148);x.fillStyle='#fff';x.textAlign='center';x.font='800 96px Inter,system-ui,sans-serif';x.fillText(m.t,512,240,940);
x.font='32px Inter,system-ui,sans-serif';x.fillStyle='rgba(255,255,255,.85)';x.fillText(m.m.split(' · ').slice(0,2).join(' · ')+' · '+TM[S.ti],512,360);tex.needsUpdate=true;L.color.set(m.c[1])}
const tg=new THREE.Vector3(0,1.6,-2),cP=new THREE.Vector3(0,14,20);let th=0,ph=.95;
function rs(){const v=q('.vp');if(!v.clientWidth)return;R.setSize(v.clientWidth,v.clientHeight,false);cam.aspect=v.clientWidth/v.clientHeight;PV.setSize(pvc.clientWidth,pvc.clientHeight,false)}
new ResizeObserver(rs).observe(E);
let t0=performance.now();
function loop(t){requestAnimationFrame(loop);const dt=Math.min((t-t0)/1000,.1);t0=t;if(!E.isConnected)return;
const rad=19/S.z,k=1-Math.exp(-dt*5);cP.lerp(new THREE.Vector3(tg.x+rad*Math.sin(th)*Math.sin(ph),tg.y+rad*Math.cos(ph),tg.z+rad*Math.cos(th)*Math.sin(ph)),k);
cam.position.copy(cP);cam.lookAt(tg);cam.fov=cl(2*Math.atan(Math.tan(.5)/cam.aspect)*180/Math.PI,45,72);cam.updateProjectionMatrix();L.intensity=1.3+Math.sin(t/300)*.15;
if(!S.flat)R.render(S3,cam);const pi=S.hov>=0?S.hov:S.last;
if(pi>=0&&pvc.isConnected){const p=pos(rw(pi),pi%COLS);pcam.position.set(p.x,p.y+1.3,p.z+.05);pcam.lookAt(0,3.45,-10.9);pcam.aspect=pvc.clientWidth/pvc.clientHeight||2;pcam.updateProjectionMatrix();PV.render(S3,pcam)}else PV.clear()}
/* input */
const ptr=new Map(),RC=new THREE.Raycaster();let dn=null,pd=0;
const pdist=()=>{const[a,b]=[...ptr.values()];return Math.hypot(a[0]-b[0],a[1]-b[1])};
function ray(e){const r=cv.getBoundingClientRect();RC.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),cam);const h=RC.intersectObjects(PK)[0];return h?h.object.userData.i:-1}
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,[e.clientX,e.clientY]);if(ptr.size==1)dn={t:performance.now(),m:0};else{if(dn)dn.m=99;pd=pdist()}};
cv.onpointermove=e=>{const o=ptr.get(e.pointerId);if(!o){if(e.pointerType=='mouse'){const i=ray(e);if(i!=S.hov){S.hov=i;cap()}}return}
const dx=e.clientX-o[0],dy=e.clientY-o[1];ptr.set(e.pointerId,[e.clientX,e.clientY]);
if(ptr.size==2){const d=pdist();S.z=cl(S.z*d/pd,.5,2);pd=d;zl();return}
if(dn)dn.m+=Math.abs(dx)+Math.abs(dy);th-=dx*.006;ph=cl(ph-dy*.005,.2,1.45)};
cv.onpointerup=cv.onpointercancel=e=>{ptr.delete(e.pointerId);if(dn&&!ptr.size&&dn.m<10&&performance.now()-dn.t<600&&e.type=='pointerup'){const i=ray(e);if(i>=0)pick(i)}if(!ptr.size)dn=null};
cv.onmouseleave=()=>{S.hov=-1;cap()};cv.onwheel=e=>{e.preventDefault();S.z=cl(S.z*(1-e.deltaY*.001),.5,2);zl()};
const fl=q('#flat');fl.onmouseover=e=>{const b=e.target.closest('.fsb');if(b){S.hov=+b.dataset.p;cap()}};fl.onmouseleave=()=>{S.hov=-1;cap()};
/* seat logic */
function pick(i){S.last=i;const s=stat(i);if(s=='t')toast('Seat '+lab(i)+' is taken');else if(s=='h')toast('Seat '+lab(i)+' is on hold by another guest');
else if(S.sel.has(i)){S.sel.delete(i);if(!S.sel.size)S.end=0}else if(S.sel.size<MAX){S.sel.add(i);if(S.sel.size==1)S.end=Date.now()+HOLD*1e3}else toast('You can pick up to '+MAX+' seats');upd()}
function cap(){const i=S.hov>=0?S.hov:S.last;PVE.querySelector('#pvt').textContent=i<0?'Hover over or select a seat.':'Seat '+lab(i)+' · '+(stat(i)=='t'?'taken':P(PRICE))}
function zl(){q('#zl').textContent=Math.round(S.z*100)+'%';if(S.flat)flatR()}
function flatR(){let h=`<div id="fi" style="transform:scale(${S.z})"><div class="fs">SCREEN</div>`;for(let r=0;r<ROWS;r++){h+=`<div class="fr"><i>${String.fromCharCode(65+r)}</i>`;for(let c=0;c<COLS;c++){const i=r*COLS+c;h+=(c==3||c==9?'<u></u>':'')+`<button class="fsb s-${stat(i)}" data-a="st" data-p="${i}" aria-label="Seat ${lab(i)}"></button>`}h+='</div>'}fl.innerHTML=h+'</div>'}
function flip(){fl.hidden=!S.flat;cv.hidden=S.flat;E.querySelectorAll('.seg button').forEach(b=>b.classList.toggle('on',(b.dataset.p=='flat')==S.flat));zl()}
function upd(){seats.forEach(([a,b],i)=>{const s=stat(i);a.material=b.material=MT[s];heads[i].visible=s=='t'});if(S.flat)flatR();
const a=[...S.sel].sort((x,y)=>x-y);q('#sl').innerHTML=a.length?a.map(i=>`<b class="tg">${lab(i)}</b>`).join(''):'<span class="mut">None yet</span>';
q('#tag').textContent=`${CN[S.ci]} · ${DL[S.di]} · ${TM[S.ti]}`;cap();side();const n=$('#nx');if(n&&S.step==2)n.disabled=!S.sel.size}
function side(){const s=tot(),a=[...S.sel].sort((x,y)=>x-y),r=(k,v)=>`<div class="r"><span class="mut">${k}</span><span>${v}</span></div>`;
$('#side').innerHTML=`<div class="box sb"><div class="mono" style="margin-bottom:6px">Your booking</div>${r('Movie',MV[S.mi].t)}${r('Date',DL[S.di])}${r('Time',TM[S.ti])}${r('Cinema',CN[S.ci])}${r('Seats',a.length?a.map(lab).join(', '):'—')}<hr>`+
(s.n?r(s.n+' × Ticket',P(s.t))+SN.map((x,i)=>S.sn[i]?r(S.sn[i]+' × '+x[0],P(x[1]*S.sn[i])):'').join('')+r('Booking fee',P(s.f)):'<div class="mut">Nothing selected yet.</div>')+
`<hr><div class="r tt"><span>Total</span><b>${P(s.all)}</b></div>${S.end?`<div id="hold" class="amb mono">${hl()}</div>`:''}</div>`;
if(S.v=='book'&&S.step==2){const preview=document.createElement('div');preview.className='box seat-preview-box';preview.appendChild(PVE);$('#side').appendChild(preview);rs()}}
/* pages */
const po=m=>m.p?`<img class="po" src="${m.p}" alt="${m.t}">`:`<div class="po" style="background:linear-gradient(160deg,${m.c[0]},${m.c[1]})">${m.t}</div>`;
const qr=c=>{const g=c.getContext('2d');let h=hash(c.dataset.s);g.fillStyle='#fff';g.fillRect(0,0,25,25);g.fillStyle='#111';
for(let y=0;y<25;y++)for(let x=0;x<25;x++){let on;const fx=x<7?x:x-18,fy=y<7?y:y-18;
if((x<7||x>17)&&(y<7||y>17)&&!(x>17&&y>17))on=Math.max(Math.abs(fx-3),Math.abs(fy-3))!=2;else{h=(Math.imul(h,1103515245)+12345)>>>0;on=(h>>>16)&1}if(on)g.fillRect(x,y,1,1)}};
const tk=b=>`<div class="tk"><div class="tl"><div class="mono">${b.id} · ${b.d} · ${b.t} · ${b.c}${b.x?' · Cancelled':''}</div><h3>${MV[b.mi].t}</h3><div class="g"><span>Seats<b>${b.s.map(lab).join(', ')}</b></span><span>Tickets<b>${b.s.length}</b></span><span>Paid<b>${P(b.total)}</b></span></div>${b.sn.length?`<small class="mut">Snacks: ${b.sn.map(x=>x[1]+'× '+x[0]).join(', ')}</small>`:''}</div><canvas class="qr" width="25" height="25" data-s="${b.id}"></canvas></div>`;
const qrs=()=>document.querySelectorAll('canvas.qr').forEach(qr);
const chip=(k,i,t,c)=>`<button class="chip${i==c?' on':''}" data-a="sh" data-p="${k}:${i}">${t}</button>`;
const nav=(l,a)=>`<div class="nav">${S.step>1?'<button class="btn" data-a="b">Back</button>':'<span></span>'}<button id="nx" class="btn pri" data-a="${a}">${l}</button></div>`;
function render(){hdr();document.querySelectorAll('.top nav button').forEach(b=>b.classList.toggle('on',b.dataset.p==S.v));
const Bd=$('#body'),m=MV[S.mi],bookv=S.v=='book'&&S.step<5;$('#side').hidden=!bookv;$('.grid').classList.toggle('one',!bookv);
if(S.v=='movies'){const ls=MV.map((x,i)=>[x,i]).filter(a=>!a[0].h&&(a[0].s||'now')==S.mt);
Bd.innerHTML=`<div class="tabs">${[['now','Now showing'],['soon','Coming soon']].map(t=>`<button class="tab${S.mt==t[0]?' on':''}" data-a="mt" data-p="${t[0]}">${t[1]}</button>`).join('')}</div><div class="pg">${ls.map(a=>{const x=a[0],i=a[1];return`<div class="pc"><button class="pi" data-a="mv" data-p="${i}" aria-label="${x.t}">${po(x)}</button><div class="pt"><b>${x.t}</b>${rb(x.r)}</div><div class="mono">${x.g.join(' · ')} · ${x.l} min</div>${x.s=='soon'?'<span class="mut">Coming soon</span>':`<button class="btn pri" data-a="mv" data-p="${i}">Get tickets</button>`}</div>`}).join('')||'<p class="mut">Nothing here yet.</p>'}</div>`;return}
if(S.v=='auth'){authR(Bd);return}
if(S.v=='tickets'){const my=U?DB.filter(b=>b.u==U.email):[];Bd.innerHTML='<h2>My tickets</h2>'+(!U?'<p class="mut" style="margin:6px 0 12px">Sign in to see your tickets.</p><button class="btn pri" data-a="si">Sign in</button>':my.length?my.slice().reverse().map(tk).join(''):'<p class="mut">No tickets yet. Book a movie and your tickets will show up here.</p>');qrs();return}
if(S.v=='admin'){adm(Bd);return}
const hd=`<div class="mh">${po(m)}<div><div class="mono">${m.m}</div><h1>${m.t}</h1><p class="mut">${m.d}</p></div></div>`;
if(S.step==5){Bd.innerHTML=hd+`<h2 style="margin-top:16px">You’re booked</h2><p class="mut">Show this ticket at the entrance. Pick up snacks at the counter.</p>${tk(S.done)}<div class="nav"><button class="btn" data-a="v" data-p="tickets">My tickets</button><button class="btn pri" data-a="again">Book another</button></div>`;qrs();return}
const stp='<div class="steps">'+['Showtime','Seats','Snacks','Payment'].map((n,i)=>`<button class="stp${S.step==i+1?' on':''}" data-a="s" data-p="${i+1}"><small>${S.step>i+1?'✓':'0'+(i+1)}</small>${n}</button>`).join('')+'</div>',h=S.end?`<div class="amb mono">${hl()}</div>`:'';let b;
if(S.step==1)b=`<h2>Choose a showtime</h2><div class="mono lab">Date</div><div class="chs">${DL.map((d,i)=>chip('d',i,d,S.di)).join('')}</div><div class="mono lab">Time</div><div class="chs">${TM.map((d,i)=>chip('t',i,d,S.ti)).join('')}</div><div class="mono lab">Cinema</div><div class="chs">${CN.map((d,i)=>chip('c',i,d,S.ci)).join('')}</div>`+nav('Continue','n');
else if(S.step==2)b='<div id="mnt"></div>'+nav('Continue','n');
else if(S.step==3)b=`<h2>Add snacks</h2><p class="mut">Optional. Pick them up at the counter by showing your ticket.</p>${h}`+SN.map((x,i)=>`<div class="li"><div><b>${x[0]}</b><div class="mono">${P(x[1])}</div></div><div class="q"><button data-a="sn" data-p="${i}:-1" aria-label="Remove one">−</button><b>${S.sn[i]||0}</b><button data-a="sn" data-p="${i}:1" aria-label="Add one">+</button></div></div>`).join('')+nav('Continue to payment','n');
else b=!U?'<h2>Sign in to pay</h2><p class="mut">You need an account to book tickets. Your seats stay held while you sign in.</p><div class="nav"><button class="btn" data-a="b">Back</button><button class="btn pri" data-a="gate">Sign in or create account</button></div>':`<h2>Your details &amp; payment</h2><p class="mut" style="margin-bottom:6px">We’ll show your ticket right after payment.</p>${h}<div class="f"><label>Full name<input data-f="n" autocomplete="name"></label><div class="two"><label>Email<input data-f="e" type="email" autocomplete="email"></label><label>Mobile number<input data-f="p" type="tel" placeholder="09XX XXX XXXX"></label></div><div class="mono">Payment method</div><div class="pm">${[['GCash','E-wallet'],['Maya','E-wallet'],['Card','Visa / Mastercard']].map(x=>`<button class="chip${S.pay==x[0]?' on':''}" data-a="py" data-p="${x[0]}"><b>${x[0]}</b><small class="mut" style="display:block">${x[1]}</small></button>`).join('')}</div><label>${S.pay=='Card'?'Card number':S.pay+' number'}<input data-f="a" inputmode="numeric" placeholder="${S.pay=='Card'?'0000 0000 0000 0000':'09XX XXX XXXX'}"></label><p class="note">Demo payment — no real money is charged.</p></div><div class="nav"><button class="btn" data-a="b">Back</button><button class="btn pri" data-a="pay">Pay ${P(tot().all)}</button></div>`;
Bd.innerHTML=hd+stp+b;document.querySelectorAll('[data-f]').forEach(i=>i.value=S.f[i.dataset.f]);
if(S.step==2){$('#mnt').appendChild(E);paint();flip();rs();upd()}else side()}
const rst=()=>{S.sel.clear();S.end=0;S.last=S.hov=-1};
/* accounts */
const ed=()=>MV[S.ei]||{};
const hdr=()=>{$('#nu').innerHTML='<button data-a="v" data-p="tickets">My Tickets</button>'+(U?(U.role=='admin'?'<button data-a="v" data-p="admin">Admin</button>':'')+`<button data-a="out">Sign out · ${U.name.split(' ')[0]}</button>`:'<button data-a="si">Sign in</button>')};
function img(f,cb){const r=new FileReader();r.onerror=()=>toast('Could not read that image.');r.onload=()=>{const i=new Image();i.onerror=()=>toast('That file is not a valid image.');i.onload=()=>{const w=300,h=450,c=document.createElement('canvas');c.width=w;c.height=h;const s=Math.max(w/i.width,h/i.height);c.getContext('2d').drawImage(i,(w-i.width*s)/2,(h-i.height*s)/2,i.width*s,i.height*s);cb(c.toDataURL('image/jpeg',.82))};i.src=r.result};r.readAsDataURL(f)}
function readPoster(f,cb){const ok=['image/jpeg','image/png','image/webp','image/gif'];if(!ok.includes(f.type))return toast('Use a JPG, PNG, WEBP, or GIF poster.');if(f.size>8*1024*1024)return toast('Image is too large. Choose a file under 8 MB.');img(f,cb)}
function authR(Bd){const up=S.am=='up';Bd.innerHTML=`<h2>${up?'Create account':'Sign in'}</h2><p class="mut">${up?'Create an account to book tickets and keep them in My Tickets.':'Sign in to book tickets and see your tickets.'}</p><div class="f" style="max-width:340px;margin-top:12px">${up?'<label>Full name<input id="an" autocomplete="name"></label>':''}<label>Email<input id="ae" type="email" autocomplete="email"></label><label>Password<input id="ap" type="password" autocomplete="${up?'new-password':'current-password'}"></label>${up?'<label>Confirm password<input id="ac" type="password" autocomplete="new-password"></label>':''}<button class="btn pri" data-a="auth">${up?'Create account':'Sign in'}</button><p class="mut">${up?'Already have an account?':'New here?'} <button class="lnk" data-a="am" data-p="${up?'in':'up'}">${up?'Sign in':'Create an account'}</button></p></div>`}
async function auth(){await ready;const e=$('#ae').value.trim().toLowerCase(),w=$('#ap').value;if(!/\S+@\S+\.\S+/.test(e))return toast('Enter a valid email');
if(S.am=='up'){const n=cln($('#an').value);if(!n)return toast('Enter your name');if(w.length<6)return toast('Password needs at least 6 characters');if(w!=$('#ac').value)return toast('Passwords do not match');if(USERS.some(u=>u.email==e))return toast('That email already has an account');U={name:n,email:e,pw:await hp(w),role:'user'};USERS.push(U);saveu()}
else{const u=USERS.find(u=>u.email==e);if(!u||u.pw!=await hp(w))return toast('Wrong email or password');U=u}
setU();S.f.n=S.f.n||U.name;S.f.e=S.f.e||U.email;S.v=S.ret;toast('Signed in as '+U.name);render()}
/* admin */
const cln=s=>s.replace(/[<>&"]/g,'').trim();
const arows=()=>{const q=S.q.trim().toLowerCase();return DB.slice().reverse().filter(b=>!q||(b.id+MV[b.mi].t).toLowerCase().includes(q)).map(b=>`<tr><td>${b.id}</td><td>${MV[b.mi].t}</td><td>${b.d} · ${b.t} · ${b.c}</td><td>${b.s.map(lab).join(', ')}</td><td>${P(b.total)}</td><td>${b.x?'<span class="mut">Cancelled</span>':`<button class="btn" data-a="adcx" data-p="${b.id}">${S.cf==b.id?'Confirm cancel':'Cancel'}</button>`}</td></tr>`).join('')||'<tr><td colspan="6" class="mut">No bookings found.</td></tr>'};
function adm(Bd){
if(!U||U.role!='admin'){Bd.innerHTML='<h2>Admin only</h2><p class="mut" style="margin:6px 0 12px">Sign in with an admin account to manage movies, bookings and prices.</p><button class="btn pri" data-a="si">Sign in</button>';return}
const live=DB.filter(b=>!b.x),rev=live.reduce((s,b)=>s+b.total,0),tix=live.reduce((s,b)=>s+b.s.length,0),snk=live.reduce((s,b)=>s+(b.sr||0),0),bx=x=>`<div class="box"><div class="mono">${x[0]}</div><h1>${x[1]}</h1></div>`;let c;
if(S.tab=='over'){const rows=MV.map((m,i)=>{const l=live.filter(b=>b.mi==i);return[m.t,l.reduce((s,b)=>s+b.s.length,0),l.reduce((s,b)=>s+b.total,0)]}),mx=Math.max(1,...rows.map(r=>r[2]));
c=`<div class="stats">${[['Revenue',P(rev)],['Tickets sold',tix],['Snack sales',P(snk)],['Cancelled',DB.length-live.length]].map(bx).join('')}</div><div class="mono lab">Sales by movie</div>`+rows.map(r=>`<div class="li" style="display:grid;grid-template-columns:1fr auto;gap:6px 12px"><b>${r[0]}</b><span>${r[1]} tickets · ${P(r[2])}</span><i style="grid-column:1/3;display:block;height:4px;background:var(--fg);width:${r[2]/mx*100}%"></i></div>`).join('')}
else if(S.tab=='bk')c=`<div class="f" style="margin-bottom:10px"><input id="aq" placeholder="Search by booking ID or movie"></div><div style="overflow-x:auto"><table><tr><th>Booking</th><th>Movie</th><th>Show</th><th>Seats</th><th>Total</th><th></th></tr><tbody id="adt">${arows()}</tbody></table></div>`;
else if(S.tab=='mv')c=MV.map((m,i)=>`<div class="li" style="flex-wrap:wrap;gap:10px"><div style="display:flex;gap:10px;align-items:center">${po(m)}<div><b>${m.t}</b> ${rb(m.r)}<div class="mono">${m.m}</div><div class="mono">${m.s=='soon'?'Coming soon':'Now showing'}${m.h?' · Hidden':''}</div></div></div><div style="display:flex;gap:6px;flex-wrap:wrap"><label class="btn">Poster<input class="ep" data-i="${i}" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden></label><button class="btn" data-a="aded" data-p="${i}">Edit</button><button class="btn" data-a="adst" data-p="${i}">${m.s=='soon'?'Now showing':'Coming soon'}</button><button class="btn" data-a="admv" data-p="${i}">${m.h?'Show':'Hide'}</button></div></div>`).join('')+`<div class="mono lab">${S.ei>=0?'Edit movie':'Add a movie'}</div><div class="f"><label>Title<input id="mt" value="${ed().t||''}"></label><div class="mono">Genre (pick up to 3)</div><div class="chs">${GN.map(g=>`<button class="chip${S.ng.includes(g)?' on':''}" data-a="adg" data-p="${g}">${g}</button>`).join('')}</div><div class="two"><label>Length (minutes)<input id="ml" type="number" min="1" max="400" placeholder="120" value="${ed().l||''}"></label><label>Rating<select id="mr">${RT.map(r=>`<option${ed().r==r?' selected':''}>${r}</option>`).join('')}</select></label></div><div class="two"><label>Status<select id="ms"><option value="now">Now showing</option><option value="soon"${ed().s=='soon'?' selected':''}>Coming soon</option></select></label><div class="poster-field"><div class="poster-label">Poster</div><label class="btn poster-upload">Choose image<input id="mp" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden></label></div></div><img id="pp" class="po" alt="" ${S.np?`src="${S.np}"`:'hidden'}><label>Synopsis<input id="md" value="${ed().d||''}"></label><button class="btn pri" data-a="adadd">${S.ei>=0?'Save changes':'Add movie'}</button>${S.ei>=0?'<button class="btn" data-a="adcan">Cancel</button>':''}</div>`;
else c=`<div class="f" style="max-width:420px"><div class="two"><label>Ticket price (₱)<input id="sp" type="number" min="0" value="${PRICE}"></label><label>Booking fee per ticket (₱)<input id="sf" type="number" min="0" value="${FEE}"></label></div><div class="mono">Snack prices (₱)</div>${SN.map((x,i)=>`<label>${x[0]}<input class="spi" data-i="${i}" type="number" min="0" value="${x[1]}"></label>`).join('')}<button class="btn pri" data-a="adsave">Save settings</button><div class="mono lab">Database</div><div class="two"><button class="btn" data-a="adx">Export JSON</button><label class="btn">Import JSON<input id="dbi" type="file" accept=".json,application/json" hidden></label></div><div class="mono lab">Danger zone</div><button class="btn" data-a="adclr">${S.cf=='reset'?'Confirm: delete all bookings':'Reset all bookings'}</button></div>`;
Bd.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><h2>Admin</h2><span class="mono">${U.email}</span></div><div class="steps">${[['over','Overview'],['bk','Bookings'],['mv','Movies'],['set','Settings']].map(t=>`<button class="stp${S.tab==t[0]?' on':''}" data-a="adtab" data-p="${t[0]}">${t[1]}</button>`).join('')}</div>${c}`;const aq=$('#aq');if(aq)aq.value=S.q}
function admin(a,p){
if(a=='adg'){const i=S.ng.indexOf(p);if(i>=0)S.ng.splice(i,1);else if(S.ng.length<3)S.ng.push(p);else return toast('Pick up to 3 genres');$('[data-a="adg"][data-p="'+p+'"]').classList.toggle('on',S.ng.includes(p));return}
else if(a=='aded'){S.ei=+p;const m=MV[S.ei];S.ng=m.g.slice();S.np=m.p||''}
else if(a=='adcan'){S.ei=-1;S.ng=[];S.np=''}
else if(a=='adst'){const i=+p,m=MV[i];if(!m||!m._id)return toast('Movies are still loading. Try again in a moment.');const prev=m.s;m.s=m.s=='soon'?'now':'soon';m.m=meta(m);api('/api/movies/'+m._id,'PUT',{status:m.s,displayMetadata:m.m}).then(()=>savem()).catch(e=>{m.s=prev;m.m=meta(m);toast(e.message);render()})}
else if(a=='adx'){const u=URL.createObjectURL(new Blob([JSON.stringify({users:USERS,movies:MV,bookings:DB,cfg:CFG},null,1)],{type:'application/json'})),l=document.createElement('a');l.href=u;l.download='noir-cinema-db.json';l.click();URL.revokeObjectURL(u);toast('Exported noir-cinema-db.json')}
else if(a=='adtab'){S.tab=p;S.cf=''}
else if(a=='adcx'){if(S.cf==p){DB.find(b=>b.id==p).x=true;save();S.cf='';toast('Booking cancelled. Seats released.')}else S.cf=p}
else if(a=='admv'){const i=+p,m=MV[i];if(!m||!m._id)return toast('Movies are still loading. Try again in a moment.');const prev=!!m.h;m.h=!m.h;api('/api/movies/'+m._id,'PUT',{hidden:m.h}).then(()=>savem()).catch(e=>{m.h=prev;toast(e.message);render()})}
else if(a=='adadd'){const t=cln($('#mt').value),l=+$('#ml').value;if(!t)return toast('Enter a movie title');if(!S.ng.length)return toast('Pick at least one genre');if(!(l>0))return toast('Enter the length in minutes');if(S.saving)return;
const editing=S.ei>=0,index=S.ei,prev=editing?MV[index]:null;if(editing&&!prev._id)return toast('Movies are still loading. Try again in a moment.');
const poster=S.np,h=hash(t)%360,m={t,g:S.ng.slice(),l,r:$('#mr').value,s:$('#ms').value,d:cln($('#md').value)||'Now showing at '+SITE+' '+SITE2+'.',p:poster,c:[`hsl(${h},55%,16%)`,`hsl(${(h+50)%360},70%,50%)`,`hsl(${(h+100)%360},85%,72%)`]};m.m=meta(m);
if(editing){m.c=prev.c.slice();m.h=prev.h;m._id=prev._id;if(!(typeof poster==='string'&&poster.startsWith('data:')))m.p=prev.p||'';MV[index]=m}else MV.push(m);
const savedIndex=editing?index:MV.length-1,dataUrl=typeof poster==='string'&&poster.startsWith('data:')?poster:'';
S.saving=true;S.ng=[];S.np='';S.ei=-1;saveMovieRecord(savedIndex,prev,dataUrl)}
else if(a=='adsave'){CFG.price=PRICE=Math.max(0,+$('#sp').value||0);CFG.fee=FEE=Math.max(0,+$('#sf').value||0);document.querySelectorAll('.spi').forEach(n=>{const v=Math.max(0,+n.value||0);SN[n.dataset.i][1]=v;CFG.sn[n.dataset.i]=v});savec();toast('Settings saved')}
else if(a=='adclr'){if(S.cf=='reset'){DB=[];save();S.cf='';toast('All bookings deleted')}else S.cf='reset'}
render();if(a=='aded')$('#mt').scrollIntoView({block:'center'})}
function pay(){const f=S.f,d=x=>x.replace(/\D/g,'').length;
if(!U)return toast('Sign in to book tickets');if(!f.n.trim())return toast('Enter your full name');if(!/\S+@\S+\.\S+/.test(f.e))return toast('Enter a valid email');if(d(f.p)<10)return toast('Enter your mobile number');if(d(f.a)<(S.pay=='Card'?13:10))return toast('Enter your '+S.pay+' number');
const t=tot(),id=SITE.slice(0,3).toUpperCase()+'-'+hash(K()+[...S.sel]+Date.now()).toString(36).toUpperCase().slice(0,6);
S.done={id,k:K(),mi:S.mi,d:DL[S.di],t:TM[S.ti],c:CN[S.ci],s:[...S.sel].sort((x,y)=>x-y),sn:SN.map((x,i)=>[x[0],S.sn[i]||0]).filter(x=>x[1]),total:t.all,sr:t.all-t.t-t.f,pay:S.pay,u:U.email};
DB.push(S.done);save();rst();S.sn={};S.step=5;render()}
document.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,p=b.dataset.p||'',[x,y]=p.split(':');
if(a=='md'){S.flat=p=='flat';flip();return}if(a=='zm'){S.z=cl(S.z+.25*+p,.5,2);zl();return}if(a=='st'){pick(+p);return}if(a=='pay'){pay();return}if(a=='auth'){auth();return}if(a.startsWith('ad')){admin(a,p);return}
if(a=='v'){S.v=p;if(S.step==5)S.step=2}else if(a=='mv'){if(MV[+p].s=='soon')return toast('Coming soon. Tickets are not on sale yet.');S.mi=+p;S.v='book';S.step=1;rst()}
else if(a=='si'||a=='gate'){S.ret=a=='gate'?'book':'movies';S.v='auth';S.am='in'}
else if(a=='am')S.am=p;else if(a=='mt')S.mt=p;
else if(a=='out'){U=null;setU();S.v='movies';toast('Signed out')}
else if(a=='s'){if(+p<S.step)S.step=+p}else if(a=='n'){if(S.step==2&&!S.sel.size)return;S.step++}else if(a=='b')S.step--;
else if(a=='sh'){S[{d:'di',t:'ti',c:'ci'}[x]]=+y;rst()}else if(a=='sn')S.sn[x]=Math.max(0,(S.sn[x]||0)+ +y);else if(a=='py')S.pay=p;
else if(a=='again'){S.v='book';S.step=1;rst()}render()};
document.oninput=e=>{const f=e.target.dataset.f;if(f)S.f[f]=e.target.value;if(e.target.id=='aq'){S.q=e.target.value;$('#adt').innerHTML=arows()}};
document.onkeydown=e=>{if(e.key=='Enter'&&['an','ae','ap','ac'].includes(e.target.id))auth()};
document.onchange=e=>{const t=e.target,f=t.files&&t.files[0];if(!f)return;
if(t.id=='mp')readPoster(f,d=>{S.np=d;const p=$('#pp');if(p){p.src=d;p.hidden=false}});
else if(t.classList.contains('ep'))uploadPoster(+t.dataset.i,f);
else if(t.id=='dbi')f.text().then(s=>{try{const x=JSON.parse(s);if(!Array.isArray(x.movies)||!Array.isArray(x.users))throw 0;USERS=x.users;MV.splice(0,MV.length,...x.movies);MV.forEach(m=>m.m=meta(m));DB=x.bookings||[];CFG={...CFG,...(x.cfg||{})};PRICE=CFG.price;FEE=CFG.fee;Object.keys(CFG.sn).forEach(i=>SN[i][1]=CFG.sn[i]);U=null;setU();saveu();savem();save();savec();S.v='movies';render();toast('Database imported. Please sign in again.')}catch(er){toast('That file is not a NOIR Cinema database')}});
if(t.type=='file')t.value=''};
setInterval(()=>{if(!S.end)return;if(Date.now()>S.end){rst();if(S.step>2&&S.step<5)S.step=2;toast('Hold expired. Seats released.');render();return}document.querySelectorAll('.amb').forEach(n=>n.textContent=hl())},1000);
const ready=(async()=>{const a=USERS.find(u=>u.email==ADMIN.email),pw=await hp(ADMIN.pass);if(a){a.pw=pw;a.role='admin'}else USERS.push({name:ADMIN.name,email:ADMIN.email,pw,role:'admin'});saveu()})();
document.title=SITE+' '+SITE2+' · Ticketing';$('.logo').innerHTML=SITE+'<small>'+SITE2+'</small>';$('footer span').textContent=SITE+' '+SITE2+' — Ticketing System';
// Load movies from MongoDB
function convertMovie(movie) {
    let id = movie._id;
    if (id && typeof id === 'object') id = id.$oid || String(id);

    const converted = {
        ...movie,
        _id: id,
        t: movie.title,
        g: movie.genres || [],
        l: movie.lengthMinutes || 0,
        r: movie.rating || 'PG',
        s: movie.status || 'now',
        p: movie.poster || '',
        d: movie.synopsis || '',
        c: movie.posterColors || ['#243b35', '#71836b', '#c9b98e'],
        h: !!movie.hidden
    };

    converted.m = meta(converted);
    return converted;
}

function movieDoc(m) {
    return {
        title: m.t,
        genres: m.g,
        lengthMinutes: m.l,
        rating: m.r,
        status: m.s,
        synopsis: m.d,
        posterColors: m.c,
        hidden: !!m.h,
        displayMetadata: m.m
    };
}

async function api(url, method, body) {
    let response;

    try {
        response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body == null ? undefined : JSON.stringify(body)
        });
    } catch (error) {
        throw new Error('Could not reach the server.');
    }

    let data = {};
    try { data = await response.json(); } catch (error) {}

    if (!response.ok) throw new Error(data.message || 'Request failed.');
    return data;
}

function uploadPoster(i, file) {
    const movie = MV[i];
    if (!movie || !movie._id) return toast('Movies are still loading. Try again in a moment.');

    readPoster(file, async dataUrl => {
        const previous = movie.p;
        movie.p = dataUrl;
        render();

        try {
            const saved = await api('/api/movies/' + movie._id + '/poster', 'POST', { image: dataUrl });
            const at = MV.findIndex(item => String(item._id) === String(saved.movie._id));
            if (at >= 0) MV[at] = convertMovie(saved.movie);
            savem();
            toast('Poster saved');
            render();
        } catch (error) {
            movie.p = previous;
            render();
            toast(error.message || 'Poster upload failed.');
        }
    });
}

function saveMovieRecord(index, previous, dataUrl) {
    const current = MV[index];
    const request = previous
        ? api('/api/movies/' + previous._id, 'PUT', movieDoc(current))
        : api('/api/movies', 'POST', movieDoc(current));

    request.then(async result => {
        let movie = result.movie;

        if (dataUrl) {
            try {
                const uploaded = await api('/api/movies/' + movie._id + '/poster', 'POST', { image: dataUrl });
                movie = uploaded.movie;
            } catch (error) {
                MV[index] = convertMovie(movie);
                savem();
                toast('Movie saved, but the poster could not be uploaded. ' + error.message);
                render();
                return;
            }
        }

        MV[index] = convertMovie(movie);
        savem();
        toast(previous ? 'Movie updated' : 'Movie added');
        render();
    }).catch(error => {
        if (previous) MV[index] = previous;
        else MV.splice(index, 1);
        toast(error.message || 'Could not save the movie.');
        render();
    }).finally(() => { S.saving = false; });
}

async function loadMoviesFromAPI() {
    try {
        const response = await fetch('/api/movies');

        if (!response.ok) {
            throw new Error('Could not retrieve movies from the server.');
        }

        const movies = await response.json();
        movies.sort((a, b) => String(a._id && a._id.$oid || a._id).localeCompare(String(b._id && b._id.$oid || b._id)));

        MV.splice(
            0,
            MV.length,
            ...movies.map(convertMovie)
        );

        savem();
        render();
    } catch (error) {
        console.error('Movie loading failed:', error);
        toast('Could not load movies from the database.');
    }
}
document.fonts?.ready.then(paint);

render();
loadMoviesFromAPI();
requestAnimationFrame(loop);