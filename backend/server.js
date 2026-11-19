// Ukázkový (výukový) projekt: API pouze vrací ukázková data produktů.
// Příjem objednávek, konzultací, e-maily a administrace byly odstraněny 12. 11. 2026.
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*', methods: ['GET','OPTIONS'] }));

// Fiktivní produkty a smyšlené značky; ceny jsou vymyšlené. Fotografie: Unsplash (ilustrační).
let products = [
  {"id": "1", "name": "Olio Extra Vergine „Sole di Trinacria“", "nameCs": "Extra panenský olivový olej „Sole di Trinacria“", "price": 389, "category": "oils", "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80&auto=format&fit=crop", "origin": "Sicílie", "eco": 5, "desc": "Smyšlená značka. Za studena lisovaný olej s tónem zeleného rajčete a mandle, láhev 500 ml.", "featured": true},
  {"id": "2", "name": "Olio al Rosmarino „Colle Verde“", "nameCs": "Olivový olej s rozmarýnem „Colle Verde“", "price": 329, "category": "oils", "image": "https://images.unsplash.com/photo-1765118527220-da9c7a560b13?w=800&q=80&auto=format&fit=crop", "origin": "Toskánsko", "eco": 5, "desc": "Smyšlená značka. Olej macerovaný s čerstvým rozmarýnem — na grilovanou zeleninu a focacciu.", "featured": false},
  {"id": "3", "name": "Olio al Limone „Luce d’Amalfi“", "nameCs": "Citronový olivový olej „Luce d’Amalfi“", "price": 349, "category": "oils", "image": "https://images.unsplash.com/photo-1707827914998-0d56ee13c161?w=800&q=80&auto=format&fit=crop", "origin": "Amalfi", "eco": 5, "desc": "Smyšlená značka. Olivy lisované společně s citrony, svěží vůně ideální k rybám a salátům.", "featured": false},
  {"id": "4", "name": "Lavender Body Oil „Lavanda Serena“", "nameCs": "Levandulový tělový olej „Lavanda Serena“", "price": 459, "category": "cosmetics", "image": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80&auto=format&fit=crop", "origin": "Toskánsko", "eco": 5, "desc": "Smyšlená značka. Lehký tělový olej s levandulí, v lahvičce z jantarového skla.", "featured": false},
  {"id": "5", "name": "Eau de Parfum „Brezza di Reggio“", "nameCs": "Parfém s bergamotem „Brezza di Reggio“", "price": 1190, "category": "cosmetics", "image": "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?w=800&q=80&auto=format&fit=crop", "origin": "Kalábrie", "eco": 4, "desc": "Smyšlená značka. Svěží citrusová vůně bergamotu s dřevitým závěrem, 50 ml.", "featured": true},
  {"id": "6", "name": "Face Serum „Rosa di Ibla“", "nameCs": "Pleťové sérum „Rosa di Ibla“", "price": 649, "category": "cosmetics", "image": "https://images.unsplash.com/photo-1713768704571-6aeb0d0e5105?w=800&q=80&auto=format&fit=crop", "origin": "Sicílie", "eco": 5, "desc": "Smyšlená značka. Sérum s olejem z opuncie a růže, s kapátkem, 30 ml.", "featured": false},
  {"id": "7", "name": "Aceto Balsamico „Nero di Modena“", "nameCs": "Balzamikový ocet „Nero di Modena“", "price": 279, "category": "food", "image": "https://images.unsplash.com/photo-1499126167718-c87f5c1387e8?w=800&q=80&auto=format&fit=crop", "origin": "Emilia-Romagna", "eco": 4, "desc": "Smyšlená značka. Hustý zrající ocet s tóny fíku a třešně, 250 ml.", "featured": false},
  {"id": "8", "name": "Chestnut Honey „Ape d’Oro“", "nameCs": "Kaštanový med „Ape d’Oro“", "price": 239, "category": "food", "image": "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&q=80&auto=format&fit=crop", "origin": "Piemont", "eco": 5, "desc": "Smyšlená značka. Tmavý med s jemně nahořklou chutí, sklenice 250 g.", "featured": true},
  {"id": "9", "name": "Roasted Hazelnuts „Langhe Dorate“", "nameCs": "Pražené lískové ořechy „Langhe Dorate“", "price": 219, "category": "food", "image": "https://images.unsplash.com/photo-1761591470313-003c5a243356?w=800&q=80&auto=format&fit=crop", "origin": "Piemont", "eco": 4, "desc": "Smyšlená značka. Lískové ořechy pražené do zlatova, balení 200 g.", "featured": false},
  {"id": "10", "name": "Bronze-cut Pasta „Grano Antico“", "nameCs": "Těstoviny tažené bronzem „Grano Antico“", "price": 149, "category": "food", "image": "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&q=80&auto=format&fit=crop", "origin": "Apulie", "eco": 4, "desc": "Smyšlená značka. Tagliatelle z tvrdé pšenice s drsným povrchem, který drží omáčku, 500 g.", "featured": false},
  {"id": "11", "name": "Tomato Passata „Rosso Vesuvio“", "nameCs": "Rajčatová passata „Rosso Vesuvio“", "price": 129, "category": "food", "image": "https://images.unsplash.com/photo-1598103466091-d1e35f5822c7?w=800&q=80&auto=format&fit=crop", "origin": "Kampánie", "eco": 4, "desc": "Smyšlená značka. Hladká passata ze zralých rajčat, sklenice 680 g.", "featured": false},
  {"id": "12", "name": "Reed Diffuser „Notte a Venezia“", "nameCs": "Aroma difuzér „Notte a Venezia“", "price": 890, "category": "home", "image": "https://images.unsplash.com/photo-1766984702326-1340e8dd38f0?w=800&q=80&auto=format&fit=crop", "origin": "Benátky", "eco": 4, "desc": "Smyšlená značka. Difuzér s tyčinkami a vůní fíku a cedru, 200 ml.", "featured": true},
  {"id": "13", "name": "Lavender Candle „Valle d’Orcia“", "nameCs": "Levandulová svíčka „Valle d’Orcia“", "price": 429, "category": "home", "image": "https://images.unsplash.com/photo-1777107857518-151355201542?w=800&q=80&auto=format&fit=crop", "origin": "Toskánsko", "eco": 5, "desc": "Smyšlená značka. Sójová svíčka s vůní levandule, doba hoření cca 40 hodin.", "featured": false},
  {"id": "14", "name": "Citrus Room Spray „Limonaia“", "nameCs": "Citrusový sprej do bytu „Limonaia“", "price": 259, "category": "home", "image": "https://images.unsplash.com/photo-1583907659441-addbe699e921?w=800&q=80&auto=format&fit=crop", "origin": "Sicílie", "eco": 5, "desc": "Smyšlená značka. Osvěžovač vzduchu s vůní citronu a pomeranče, 100 ml.", "featured": false},
  {"id": "15", "name": "Body Scrub „Sale e Limone“", "nameCs": "Tělový peeling „Sale e Limone“", "price": 389, "category": "wellness", "image": "https://images.unsplash.com/photo-1683944433023-027a3f443ae4?w=800&q=80&auto=format&fit=crop", "origin": "Amalfi", "eco": 5, "desc": "Smyšlená značka. Peeling s mořskou solí a citronovou kůrou, 250 g.", "featured": false},
  {"id": "16", "name": "Bath Salts „Terme di Toscana“", "nameCs": "Koupelová sůl „Terme di Toscana“", "price": 299, "category": "wellness", "image": "https://images.unsplash.com/photo-1550623685-2227f7bbef18?w=800&q=80&auto=format&fit=crop", "origin": "Toskánsko", "eco": 5, "desc": "Smyšlená značka. Koupelová sůl s květy levandule, sklenice 400 g.", "featured": false},
  {"id": "17", "name": "Body Cream „Latte di Mandorla“", "nameCs": "Tělový krém „Latte di Mandorla“", "price": 419, "category": "wellness", "image": "https://images.unsplash.com/photo-1763503839418-2b45c3d7a3c3?w=800&q=80&auto=format&fit=crop", "origin": "Sicílie", "eco": 5, "desc": "Smyšlená značka. Výživný krém s mandlovým mlékem, 200 ml.", "featured": false},
  {"id": "18", "name": "Almond Oil „Mandorla di Noto“", "nameCs": "Mandlový olej „Mandorla di Noto“", "price": 279, "category": "wellness", "image": "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&q=80&auto=format&fit=crop", "origin": "Sicílie", "eco": 5, "desc": "Smyšlená značka. Za studena lisovaný mandlový olej na masáže a suchou pokožku, 100 ml.", "featured": false},
];

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

app.get('/api/health', (req,res) => res.json({ ok:true, demo:true, products:products.length }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Eco Italia (demo) — http://localhost:${PORT} · ${products.length} produktů`));
