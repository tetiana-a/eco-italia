const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors());
app.use(express.json());

// ── EMAIL via Resend ──
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kotolup24@gmail.com';
const FROM_EMAIL = 'Eco Italia <noreply@housefixbrno.cz>';

async function sendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) { console.log('No RESEND_API_KEY, skipping email'); return; }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: FROM_EMAIL, to: Array.isArray(to) ? to : [to], subject, html }),
    });
    const d = await r.json();
    console.log('Email sent:', d.id || d.message);
  } catch(e) { console.error('Email error:', e.message); }
}

let products = [
  { id:'1', name:'Extra Virgin Olive Oil Siciliano', nameCs:'Extra panenský olivový olej Siciliano', price:490, category:'oils', image:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=85', origin:'Sicílie', eco:5, desc:'Lisovaný za studena z prastarých sicilských olivovníků. Bohatý na polyfenoly a antioxidanty. Certifikace EU Organic.', featured:true },
  { id:'2', name:'Tuscan Rosemary Olive Oil', nameCs:'Toskánský olivový olej s rozmarýnem', price:420, category:'oils', image:'https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=600&q=85', origin:'Toskánsko', eco:5, desc:'Extra panenský olivový olej infuzovaný čerstvým toskánským rozmarýnem. Ideální na salátové dresinky a grilování.', featured:false },
  { id:'3', name:'Sardinian Lemon Olive Oil', nameCs:'Sardinský citronový olivový olej', price:460, category:'oils', image:'https://images.unsplash.com/photo-1559181567-c3190bded457?w=600&q=85', origin:'Sardinie', eco:5, desc:'Olivový olej lisovaný společně s čerstvými sardinskými citrony. Jemná citrusová vůně, perfektní na ryby.', featured:false },
  { id:'4', name:'Tuscan Lavender Body Oil', nameCs:'Toskánský levandulový tělový olej', price:380, category:'cosmetics', image:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=85', origin:'Toskánsko', eco:5, desc:'Čistý levandulový esenciální olej z toskánských kopců. Uklidňující a vyživující pro citlivou pokožku.', featured:true },
  { id:'5', name:'Calabrian Bergamot Perfume', nameCs:'Kalábrijský bergamotový parfém', price:890, category:'cosmetics', image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=85', origin:'Kalábrie', eco:5, desc:'Přírodní eau de parfum s autentickým kalábrijským bergamotem. Certifikovaný organic a cruelty-free.', featured:false },
  { id:'6', name:'Sicilian Rose Face Serum', nameCs:'Sicilské růžové sérum na obličej', price:680, category:'cosmetics', image:'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=85', origin:'Sicílie', eco:5, desc:'Luxusní sérum z sicilského růžového oleje a výtažků z granátového jablka. Anti-aging efekt, přírodní složení.', featured:false },
  { id:'7', name:'Truffle Sea Salt', nameCs:'Lanýžová mořská sůl', price:320, category:'food', image:'https://images.unsplash.com/photo-1571069411715-0dd10f9f47ab?w=600&q=85', origin:'Sicílie', eco:4, desc:'Sicilská mořská sůl s černým lanýžem, ručně sklizená ze středozemního moře.', featured:true },
  { id:'8', name:'Sardinian Rosemary Honey', nameCs:'Sardinský rozmarýnový med', price:280, category:'food', image:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=85', origin:'Sardinie', eco:5, desc:'Surový rozmarýnový med z Sardinských vysočin. Nefiltrovaný a přirozeně konzervovaný.', featured:false },
  { id:'9', name:'Piedmont Hazelnut Spread', nameCs:'Piemontský lískooříškový krém', price:350, category:'food', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85', origin:'Piemont', eco:4, desc:'Řemeslný lískooříškový krém z certifikovaných bio lískoořechů z Piemontu. Bez palmového oleje.', featured:false },
  { id:'10', name:'Sicilian Capers in Sea Salt', nameCs:'Sicilské kapary v mořské soli', price:180, category:'food', image:'https://images.unsplash.com/photo-1506368083636-6defb67639a7?w=600&q=85', origin:'Sicílie', eco:4, desc:'Ručně sbírané kapary z ostrova Salina, konzervované v mořské soli. Autentická chuť Sicílie.', featured:false },
  { id:'11', name:'Calabrian Nduja Spread', nameCs:'Kalábrijská nduja pomazánka', price:240, category:'food', image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85', origin:'Kalábrie', eco:3, desc:'Tradiční kalábrijská pikantní pomazánka z vepřového masa a paprik. Ručně vyráběná podle rodinného receptu.', featured:false },
  { id:'12', name:'Venetian Murano Diffuser', nameCs:'Benátský difuzér z Murana', price:1290, category:'home', image:'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=85', origin:'Benátky', eco:4, desc:'Ručně foukaný skleněný difuzér s organickými rákosovými tyčinkami a italskou botanickou esencí.', featured:false },
  { id:'13', name:'Tuscan Lavender Candle', nameCs:'Toskánská levandulová svíčka', price:380, category:'home', image:'https://images.unsplash.com/photo-1603905938777-2d748a5aafa3?w=600&q=85', origin:'Toskánsko', eco:5, desc:'Sójová svíčka s esenciálním olejem z toskánské levandule. Čistý plamen bez toxických výparů, 45 hodin hoření.', featured:false },
  { id:'14', name:'Sicilian Lemon Room Spray', nameCs:'Sicilský citronový sprej do místnosti', price:290, category:'home', image:'https://images.unsplash.com/photo-1596704017254-9b4e4e7d8ba3?w=600&q=85', origin:'Sicílie', eco:5, desc:'Přírodní osvěžovač vzduchu z extraktů sicilského citronu. Žádné syntetické vůně ani škodlivé látky.', featured:false },
  { id:'15', name:'Amalfi Lemon Body Scrub', nameCs:'Tělový peeling Amalfi citron', price:420, category:'wellness', image:'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=85', origin:'Amalfi', eco:5, desc:'Luxusní tělový peeling s organickými citrony z Amalfi a krystaly středozemní mořské soli.', featured:false },
  { id:'16', name:'Thermal Spring Bath Salts', nameCs:'Koupelové soli z termálních pramenů', price:310, category:'wellness', image:'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=85', origin:'Toskánsko', eco:5, desc:'Minerálně bohaté koupelové soli z toskánských termálních pramenů. Uvolňují svaly a regenerují pokožku.', featured:true },
  { id:'17', name:'Calabrian Bergamot Body Lotion', nameCs:'Kalábrijské tělové mléko bergamot', price:360, category:'wellness', image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=85', origin:'Kalábrie', eco:5, desc:'Hydratační tělové mléko s bergamotovým extraktem z Kalábrie. Lehká textura, rychle se vstřebává.', featured:false },
  { id:'18', name:'Organic Almond Massage Oil', nameCs:'Bio mandlový masážní olej', price:290, category:'wellness', image:'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&q=85', origin:'Sicílie', eco:5, desc:'Čistý bio mandlový olej lisovaný za studena ze sicilských mandlí. Ideální pro masáže a péči o suchou pokožku.', featured:false },
];

let orders = [];
let nextId = 1;

app.get('/api/products', (req, res) => {
  let r = [...products];
  const { category, featured, search, sort } = req.query;
  if (category) r = r.filter(p => p.category === category);
  if (featured) r = r.filter(p => p.featured);
  if (search) r = r.filter(p => p.nameCs.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'price_asc') r.sort((a,b) => a.price - b.price);
  if (sort === 'price_desc') r.sort((a,b) => b.price - a.price);
  res.json(r);
});
app.get('/api/products/:id', (req, res) => {
  const p = products.find(p => p.id === req.params.id);
  p ? res.json(p) : res.status(404).json({ error:'Not found' });
});
app.post('/api/products', (req, res) => { const p = { ...req.body, id: Date.now().toString() }; products.push(p); res.status(201).json(p); });
app.put('/api/products/:id', (req, res) => { const i = products.findIndex(p => p.id === req.params.id); if(i===-1) return res.status(404).json({}); products[i] = { ...products[i], ...req.body }; res.json(products[i]); });
app.delete('/api/products/:id', (req, res) => { products = products.filter(p => p.id !== req.params.id); res.json({ ok:true }); });

app.post('/api/orders', async (req, res) => {
  const order = { ...req.body, id: nextId++, status:'pending', createdAt: new Date().toISOString() };
  orders.push(order);
  console.log('Order:', order.customer?.name, order.total+'Kč');

  const itemsHtml = (order.items||[]).map(i =>
    `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">×${i.qty}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${(i.price*i.qty).toLocaleString()} Kč</td></tr>`
  ).join('');

  // Email zákazníkovi
  if (order.customer?.email) {
    await sendEmail({
      to: order.customer.email,
      subject: `Eco Italia — Objednávka #${order.id} přijata`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#333">
          <div style="background:#04040A;padding:24px;text-align:center">
            <h1 style="color:#C4A96B;font-size:22px;margin:0;letter-spacing:0.1em">ECO · ITALIA</h1>
          </div>
          <div style="padding:32px">
            <h2 style="color:#04040A">Děkujeme za vaši objednávku!</h2>
            <p>Dobrý den, <strong>${order.customer.name}</strong>,</p>
            <p>Vaše objednávka č. <strong>#${order.id}</strong> byla úspěšně přijata. Brzy vás kontaktujeme ohledně doručení.</p>
            <table style="width:100%;border-collapse:collapse;margin:24px 0">
              <thead><tr style="background:#f5f5f5"><th style="padding:10px;text-align:left">Produkt</th><th style="padding:10px;text-align:center">Ks</th><th style="padding:10px;text-align:right">Cena</th></tr></thead>
              <tbody>${itemsHtml}</tbody>
            </table>
            <div style="text-align:right;font-size:18px;color:#C4A96B;font-weight:bold">Celkem: ${order.total?.toLocaleString()} Kč</div>
            <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
            <p style="color:#666;font-size:13px">Doručovací adresa: ${order.customer.address}, ${order.customer.zip} ${order.customer.city}</p>
            <p style="color:#999;font-size:12px">V případě dotazů nás kontaktujte na <a href="mailto:eddigood2020@gmail.com">eddigood2020@gmail.com</a> nebo +420 732 995 210</p>
          </div>
          <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:11px;color:#999">
            © 2025–2026 Eco Italia · Eduard Korolov · Brno-Řečkovice
          </div>
        </div>
      `
    });
  }

  // Notifikace adminovi
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🛒 Nová objednávka #${order.id} — ${order.total?.toLocaleString()} Kč`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2>Nová objednávka #${order.id}</h2>
        <p><strong>Zákazník:</strong> ${order.customer?.name} (${order.customer?.email})<br/>
        <strong>Telefon:</strong> ${order.customer?.phone || '—'}<br/>
        <strong>Adresa:</strong> ${order.customer?.address}, ${order.customer?.zip} ${order.customer?.city}</p>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Produkt</th><th style="padding:8px;text-align:center">Ks</th><th style="padding:8px;text-align:right">Cena</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <p style="font-size:18px;color:#C4A96B"><strong>Celkem: ${order.total?.toLocaleString()} Kč</strong></p>
      </div>
    `
  });

  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => res.json(orders.slice().reverse()));
app.put('/api/orders/:id/status', (req, res) => {
  const o = orders.find(o => o.id === Number(req.params.id));
  if(!o) return res.status(404).json({});
  o.status = req.body.status; res.json(o);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === (process.env.ADMIN_EMAIL||'admin@eco-italia.cz') && password === (process.env.ADMIN_PASSWORD||'admin123'))
    res.json({ token:'eco-admin-token', ok:true });
  else res.status(401).json({ error:'Nesprávné údaje' });
});

app.post('/api/consult', async (req, res) => {
  console.log('Consult:', req.body);
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `💬 Nová konzultace od ${req.body.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px">
        <h2>Nová žádost o konzultaci</h2>
        <p><strong>Jméno:</strong> ${req.body.name}<br/>
        <strong>Email:</strong> ${req.body.email}<br/>
        <strong>Telefon:</strong> ${req.body.phone || '—'}</p>
        <p><strong>Dotaz:</strong><br/>${req.body.message || '—'}</p>
      </div>
    `
  });
  res.json({ ok:true });
});

app.get('/api/health', (req,res) => res.json({ ok:true, products:products.length, orders:orders.length }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Eco Italia — http://localhost:${PORT} · ${products.length} produktů`));
