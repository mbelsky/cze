/**
 * Czech verb dictionary organized by conjugation group.
 *
 * Each verb has:
 *  - infinitive: the base/infinitive form
 *  - group: conjugation class (-á, -í, -uj, -e)
 *  - forms: conjugated forms keyed by pronoun
 *
 * Pronouns: já, ty, on/ona/ono, my, vy, oni/ony/ona
 */

export const pronouns = [
  'já',
  'ty',
  'on/ona/ono',
  'my',
  'vy',
  'oni/ony/ona',
];

export const verbs = [
  // ---- Group -á ----
  {
    infinitive: 'dělat',
    group: '-á',
    forms: {
      'já': 'dělám',
      'ty': 'děláš',
      'on/ona/ono': 'dělá',
      'my': 'děláme',
      'vy': 'děláte',
      'oni/ony/ona': 'dělají',
    },
  },
  {
    infinitive: 'znát',
    group: '-á',
    forms: {
      'já': 'znám',
      'ty': 'znáš',
      'on/ona/ono': 'zná',
      'my': 'známe',
      'vy': 'znáte',
      'oni/ony/ona': 'znají',
    },
  },
  {
    infinitive: 'volat',
    group: '-á',
    forms: {
      'já': 'volám',
      'ty': 'voláš',
      'on/ona/ono': 'volá',
      'my': 'voláme',
      'vy': 'voláte',
      'oni/ony/ona': 'volají',
    },
  },
  {
    infinitive: 'čekat',
    group: '-á',
    forms: {
      'já': 'čekám',
      'ty': 'čekáš',
      'on/ona/ono': 'čeká',
      'my': 'čekáme',
      'vy': 'čekáte',
      'oni/ony/ona': 'čekají',
    },
  },
  {
    infinitive: 'hledat',
    group: '-á',
    forms: {
      'já': 'hledám',
      'ty': 'hledáš',
      'on/ona/ono': 'hledá',
      'my': 'hledáme',
      'vy': 'hledáte',
      'oni/ony/ona': 'hledají',
    },
  },

  // ---- Group -í ----
  {
    infinitive: 'mluvit',
    group: '-í',
    forms: {
      'já': 'mluvím',
      'ty': 'mluvíš',
      'on/ona/ono': 'mluví',
      'my': 'mluvíme',
      'vy': 'mluvíte',
      'oni/ony/ona': 'mluví',
    },
  },
  {
    infinitive: 'rozumět',
    group: '-í',
    forms: {
      'já': 'rozumím',
      'ty': 'rozumíš',
      'on/ona/ono': 'rozumí',
      'my': 'rozumíme',
      'vy': 'rozumíte',
      'oni/ony/ona': 'rozumějí',
    },
  },
  {
    infinitive: 'vidět',
    group: '-í',
    forms: {
      'já': 'vidím',
      'ty': 'vidíš',
      'on/ona/ono': 'vidí',
      'my': 'vidíme',
      'vy': 'vidíte',
      'oni/ony/ona': 'vidí',
    },
  },
  {
    infinitive: 'prosit',
    group: '-í',
    forms: {
      'já': 'prosím',
      'ty': 'prosíš',
      'on/ona/ono': 'prosí',
      'my': 'prosíme',
      'vy': 'prosíte',
      'oni/ony/ona': 'prosí',
    },
  },
  {
    infinitive: 'myslet',
    group: '-í',
    forms: {
      'já': 'myslím',
      'ty': 'myslíš',
      'on/ona/ono': 'myslí',
      'my': 'myslíme',
      'vy': 'myslíte',
      'oni/ony/ona': 'myslí',
    },
  },

  // ---- Group -uj ----
  {
    infinitive: 'pracovat',
    group: '-uj',
    forms: {
      'já': 'pracuji',
      'ty': 'pracuješ',
      'on/ona/ono': 'pracuje',
      'my': 'pracujeme',
      'vy': 'pracujete',
      'oni/ony/ona': 'pracují',
    },
  },
  {
    infinitive: 'studovat',
    group: '-uj',
    forms: {
      'já': 'studuji',
      'ty': 'studuješ',
      'on/ona/ono': 'studuje',
      'my': 'studujeme',
      'vy': 'studujete',
      'oni/ony/ona': 'studují',
    },
  },
  {
    infinitive: 'kupovat',
    group: '-uj',
    forms: {
      'já': 'kupuji',
      'ty': 'kupuješ',
      'on/ona/ono': 'kupuje',
      'my': 'kupujeme',
      'vy': 'kupujete',
      'oni/ony/ona': 'kupují',
    },
  },
  {
    infinitive: 'milovat',
    group: '-uj',
    forms: {
      'já': 'miluji',
      'ty': 'miluješ',
      'on/ona/ono': 'miluje',
      'my': 'milujeme',
      'vy': 'milujete',
      'oni/ony/ona': 'milují',
    },
  },
  {
    infinitive: 'potřebovat',
    group: '-uj',
    forms: {
      'já': 'potřebuji',
      'ty': 'potřebuješ',
      'on/ona/ono': 'potřebuje',
      'my': 'potřebujeme',
      'vy': 'potřebujete',
      'oni/ony/ona': 'potřebují',
    },
  },

  // ---- Group -e ----
  {
    infinitive: 'psát',
    group: '-e',
    forms: {
      'já': 'píšu',
      'ty': 'píšeš',
      'on/ona/ono': 'píše',
      'my': 'píšeme',
      'vy': 'píšete',
      'oni/ony/ona': 'píšou',
    },
  },
  {
    infinitive: 'číst',
    group: '-e',
    forms: {
      'já': 'čtu',
      'ty': 'čteš',
      'on/ona/ono': 'čte',
      'my': 'čteme',
      'vy': 'čtete',
      'oni/ony/ona': 'čtou',
    },
  },
  {
    infinitive: 'brát',
    group: '-e',
    forms: {
      'já': 'beru',
      'ty': 'bereš',
      'on/ona/ono': 'bere',
      'my': 'bereme',
      'vy': 'berete',
      'oni/ony/ona': 'berou',
    },
  },
  {
    infinitive: 'nést',
    group: '-e',
    forms: {
      'já': 'nesu',
      'ty': 'neseš',
      'on/ona/ono': 'nese',
      'my': 'neseme',
      'vy': 'nesete',
      'oni/ony/ona': 'nesou',
    },
  },
  {
    infinitive: 'žít',
    group: '-e',
    forms: {
      'já': 'žiji',
      'ty': 'žiješ',
      'on/ona/ono': 'žije',
      'my': 'žijeme',
      'vy': 'žijete',
      'oni/ony/ona': 'žijou',
    },
  },
];
