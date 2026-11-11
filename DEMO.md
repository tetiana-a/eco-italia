# Ukázkový (výukový) projekt — Eco Italia

Eco Italia je výukový a portfoliový projekt webové vývojářky Tetiany Kotolup (React, Node.js).
Nejde o skutečný e-shop: zboží nelze objednat ani koupit, nikdo zde nic neprodává a produkty, ceny a popisy jsou pouze ilustrativní.

## Historie úprav

### 12. 11. 2026 — zřetelné označení jako ukázkový projekt

Stav před úpravou: commit `ea3042d` (9. 9. 2026), zůstává v historii repozitáře.
Snímky obrazovky před úpravou a po ní archivuje autorka mimo repozitář (obsahují odstraněné údaje, proto se znovu nezveřejňují).

- Na každé stránce je trvalý pruh „UKÁZKOVÝ PROJEKT — nejedná se o skutečný e-shop…“; stejné upozornění je v patičce, na stránce „O projektu“ a u každého produktu.
- Odstraněn košík, pokladna, objednávkový formulář a automatický potvrzovací e-mail (`/kosik` a `/pokladna` přesměrují na úvodní stránku).
- Server nepřijímá objednávky ani žádosti o konzultaci: odstraněny `/api/orders`, `/api/consult` a odesílání e-mailů. Odstraněna administrace a nechráněné zápisové API produktů.
- Odstraněny jméno, telefon, e-mail a adresa Eduarda Korolova a sekce „Zakladatel / Ředitel“ a „Bezplatná konzultace“.
- Odstraněna neověřená tvrzení: „100% bio certifikace“, „48h doručení do ČR“, „EU Organic ✓“, certifikace v popisech produktů, „Přímí výrobci“, „Transparentní ceny“, „Udržitelné balení“.
- Fotografie převzatá z cizího e-shopu nahrazena fotografií z Unsplash.
- Vyhledávačům zakázána indexace (`noindex, nofollow`).
