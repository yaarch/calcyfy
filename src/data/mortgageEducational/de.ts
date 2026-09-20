import { MortgageEducationalData } from './types';

export const MORTGAGE_EDUCATIONAL_DE: MortgageEducationalData = {
  title: 'Leitfaden und Berechnung der Baufinanzierung',
  subtitle: 'Ausführliche Referenz zu Kreditmechanik, Eingabeparametern, Annuitätenformeln und monatlicher Kostenaufteilung.',

  // 1. About Mortgage Calculators
  aboutTitle: 'Über Baufinanzierungs- und Hypothekenrechner',
  aboutText: 'Ein Baufinanzierungsrechner ermittelt die regelmäßigen monatlichen Kosten für ein Darlehen zum Erwerb einer Wohnimmobilie. Durch die Eingabe der maßgeblichen Eckdaten — einschließlich Kaufpreis, Eigenkapitalquote, Sollzinssatz, Zinsbindungs- bzw. Darlehenslaufzeit, Grundsteuer, Gebäudeversicherung und monatlichem Hausgeld — berechnet das System die voraussichtliche monatliche Belastung.',
  aboutQuoteDistinction: 'Es ist wichtig, zwischen einer mathematischen Modellrechnung und einem verbindlichen Kreditangebot einer Bank zu unterscheiden. Dieser Rechner liefert eine rechnerische Orientierungshilfe auf Basis Ihrer eingegebenen Werte. Er stellt weder ein verbindliches Darlehensversprechen noch eine Kreditzusage dar. Die tatsächlichen Konditionen hängen von Bonitätsprüfungen (z. B. SCHUFA), dem Haushaltsnettoeinkommen, der Beleihungswertprüfung der Immobilie und den bankinternen Vergaberichtlinien ab.',

  // 2. How to Use This Mortgage Calculator
  howToUseTitle: 'So nutzen Sie diesen Baufinanzierungsrechner',
  howToUseIntro: 'Befolgen Sie diese Schritte unter ausschließlicher Nutzung der sieben vorhandenen Eingabefelder des Rechners:',
  howToUseSteps: [
    'Tragen Sie den vereinbarten Immobilienkaufpreis in das Feld "Kaufpreis der Immobilie (€ / $)" ein.',
    'Geben Sie den prozentualen Anteil an Eigenkapital an, den Sie beim Kauf einbringen, im Feld "Eigenkapitalanteil (%)".',
    'Tragen Sie den jährlichen Sollzinssatz der Bank in das Feld "Sollzinssatz p. a. (%)" ein.',
    'Wählen Sie die gewünschte Darlehenslaufzeit in Jahren im Feld "Laufzeit des Darlehens (Jahre)" (z. B. 30, 20, 15 oder 10 Jahre).',
    'Geben Sie die geschätzte jährliche Grundsteuer im Feld "Jährliche Grundsteuer (€ / $)" an (oder 0, falls nicht berücksichtigt).',
    'Tragen Sie den jährlichen Beitrag zur Wohngebäudeversicherung im Feld "Jährliche Gebäudeversicherung (€ / $)" ein (oder 0).',
    'Fügen Sie anfallende monatliche Nebenkosten oder Verwaltergebühren im Feld "Monatliches Hausgeld (€ / $)" hinzu.',
    'Prüfen Sie die berechnete monatliche Gesamtrate, den Nettodarlehensbetrag, den Eigenkapitalbetrag, den Zahlungsverteilungsbalken sowie die detaillierte monatliche Aufteilung (Zins und Tilgung, Steuern, Versicherung und Hausgeld).',
  ],

  // 3. What Each Input Means
  inputMeaningsTitle: 'Bedeutung der einzelnen Eingabefelder',
  inputMeaningsIntro: 'Das Verständnis dieser Parameter hilft Ihnen einzuschätzen, wie finanzielle Entscheidungen und Immobilienmerkmale Ihre Monatsrate beeinflussen:',
  inputs: [
    {
      name: 'Kaufpreis der Immobilie (€ / $)',
      represents: 'Der gesamte vereinbarte Kaufpreis der Wohnimmobilie vor Abzug des eingebrachten Eigenkapitals.',
      whyItMatters: 'Er bildet das wirtschaftliche Fundament der Transaktion, aus dem sich Darlehensbedarf und Eigenkapital ableiten.',
      howItAffects: 'Ein höherer Kaufpreis erhöht bei sonst gleichen Eingaben in der Regel den Darlehensbedarf und führt zu einer höheren monatlichen Rate für Zins und Tilgung, sofern er nicht durch mehr Eigenkapital ausgeglichen wird.',
    },
    {
      name: 'Eigenkapitalanteil (%)',
      represents: 'Der Prozentsatz des Kaufpreises, den der Käufer aus eigenen Barmitteln direkt zur Kaufabwicklung beisteuert.',
      whyItMatters: 'Das Eigenkapital begründet Ihre unmittelbare Eigentumsquote und bestimmt die verbleibende Nettodarlehenssumme.',
      howItAffects: 'Ein höherer Eigenkapitalanteil senkt den Darlehensbetrag, was bei sonst unveränderten Bedingungen in der Regel die monatliche Rate für Zins und Tilgung verringert und den Gesamtzinsaufwand über die Darlehenslaufzeit senkt.',
    },
    {
      name: 'Sollzinssatz p. a. (%)',
      represents: 'Der jährliche prozentuale Zinssatz, den das Kreditinstitut für die Überlassung des Kapitals berechnet.',
      whyItMatters: 'Er legt den monatlichen Zinsaufwand bezogen auf die jeweilige Restschuld fest.',
      howItAffects: 'Ein höherer Zinssatz erhöht in der Regel die monatliche Rate für Zins und Tilgung bei gleichem Darlehensbetrag und gleicher Laufzeit, wodurch die Gesamtkosten der Finanzierung über die Zeit steigen.',
    },
    {
      name: 'Laufzeit des Darlehens (Jahre)',
      represents: 'Der vereinbarte Zeitraum in Jahren, über den das Darlehen vollständig amortisiert werden soll.',
      whyItMatters: 'Er bestimmt die Gesamtzahl der planmäßigen Monatsraten (Jahre × 12 Monate).',
      howItAffects: 'Eine längere Laufzeit führt in der Regel zu einer niedrigeren monatlichen Rate für Zins und Tilgung, da die Rückzahlung auf mehr Monate verteilt wird. Sie bedeutet jedoch eine größere Anzahl an Raten und kann bei unveränderten Bedingungen zu einem höheren Gesamtzinsaufwand führen. Eine kürzere Laufzeit erfordert höhere Monatsraten, tilgt die Schuld jedoch schneller mit geringerem Gesamtzinsaufwand.',
    },
    {
      name: 'Jährliche Grundsteuer (€ / $)',
      represents: 'Die jährlich anfallende Steuer auf den Grundbesitz.',
      whyItMatters: 'Grundsteuern variieren je nach Standort und Immobilienart. Bei Angabe wird der Jahresbetrag in 12 gleiche Monatsraten aufgeteilt.',
      howItAffects: 'Der Rechner teilt den Jahresbetrag durch 12 und rechnet ihn der geschätzten Gesamtwohnkostenrate hinzu, sofern angegeben.',
    },
    {
      name: 'Jährliche Gebäudeversicherung (€ / $)',
      represents: 'Die jährliche Prämie für die Gebäudeversicherung zum Schutz der Immobilie gegen Schäden.',
      whyItMatters: 'In vielen Märkten verlangen Kreditgeber oder Eigentümer eine Gebäudeversicherung zum Schutz vor Schäden. Bei Angabe wird der Jahresbeitrag in 12 Monatsraten aufgeteilt.',
      howItAffects: 'Der Jahresbeitrag wird durch 12 geteilt und fließt in die monatliche Gesamtbelastung ein.',
    },
    {
      name: 'Monatliches Hausgeld (€ / $)',
      represents: 'Das monatliche Entgelt für Instandhaltung, Pflege von Gemeinschaftseigentum und Verwaltung.',
      whyItMatters: 'Hausgeld oder Nebenkosten sind regelmäßige Zahlungen für die Instandhaltung gemeinschaftlicher Einrichtungen oder geteilter Dienstleistungen, sofern zutreffend.',
      howItAffects: 'Wird in voller Höhe monatlich aufgeschlagen, ohne die Darlehensschuld abzutragen.',
    },
  ],

  // 4. How Mortgage Payment Is Calculated
  formulaTitle: 'Wie die Darlehensrate berechnet wird',
  formulaSubtitle: 'Standardmäßige Annuitätenformel mit festem Zinssatz',
  formulaExpression: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
  formulaDefinitions: [
    { symbol: 'M', meaning: 'Monatliche Rate für Zins und Tilgung' },
    { symbol: 'P', meaning: 'Nettodarlehensbetrag (Kaufpreis abzüglich Eigenkapital)' },
    { symbol: 'r', meaning: 'Monatlicher periodischer Zinssatz in Dezimalform (Jahreszins ÷ 12)' },
    { symbol: 'n', meaning: 'Gesamtzahl der monatlichen Rückzahlungsraten (Laufzeit in Jahren × 12)' },
  ],
  formulaNotes: [
    'Der jährliche Sollzins wird durch 12 geteilt, um den monatlichen Zinsfaktor zu erhalten (z. B. 6,8 % p. a. entspricht r = 0,068 ÷ 12 ≈ 0,0056667 pro Monat).',
    'Die Darlehenslaufzeit in Jahren wird in Monate umgerechnet (z. B. entspricht eine 30-jährige Laufzeit n = 30 × 12 = 360 Monatsraten).',
    'Das Eigenkapital wird vom Kaufpreis subtrahiert, um die Darlehenssumme zu ermitteln (z. B. bleiben bei 400.000 Kaufpreis mit 20 % Eigenkapital P = 320.000 Nettodarlehen).',
    'Diese Standardformel gilt für klassische Annuitätendarlehen mit gleichbleibender periodischer Rate für Zins und Tilgung über die vereinbarte Laufzeit.',
  ],

  // 5. Worked Example
  workedExample: {
    title: 'Vollständiges Berechnungsbeispiel',
    label: 'Hypothetisches Rechenbeispiel (Erwerb einer Wohnimmobilie)',
    homePrice: '400.000 € / $',
    downPayment: '20 % (80.000 € / $)',
    loanAmount: '320.000 € / $',
    interestRate: '6,8 % p. a.',
    loanTerm: '30 Jahre (360 Monate)',
    annualTax: '4.800 € / $ jährlich',
    annualInsurance: '1.200 € / $ jährlich',
    monthlyHoa: '0 € / $ monatlich',
    stepByStep: [
      'Berechnung der Nettodarlehenssumme: Kaufpreis 400.000 − Eigenkapital 80.000 (20 %) = 320.000 Darlehensbetrag (P).',
      'Umrechnung des Zinssatzes in monatliche Dezimalform: r = 0,068 ÷ 12 ≈ 0,0056667.',
      'Ermittlung der Gesamtmonate: n = 30 Jahre × 12 = 360 Monatsraten.',
      'Berechnung des Zinseszins-Faktors: (1 + 0,0056667)^360 ≈ 7,606782.',
      'Berechnung der monatlichen Rate für Zins und Tilgung (M): 320.000 × [0,0056667 × 7,606782] ÷ [7,606782 − 1] = 320.000 × 0,043105 ÷ 6,606782 ≈ 2.086,16.',
      'Monatlicher Anteil der Grundsteuer: 4.800 ÷ 12 = 400,00 monatlich.',
      'Monatlicher Anteil der Gebäudeversicherung: 1.200 ÷ 12 = 100,00 monatlich.',
      'Berücksichtigung des Hausgeldes: 0,00 monatlich.',
      'Addition aller monatlichen Komponenten: 2.086,16 (Zins & Tilgung) + 400,00 (Grundsteuer) + 100,00 (Versicherung) + 0,00 (Hausgeld) = 2.586,16 geschätzte monatliche Gesamtbelastung.',
    ],
    monthlyPi: '2.086,16 € / $',
    monthlyTax: '400,00 € / $',
    monthlyInsurance: '100,00 € / $',
    monthlyHoaResult: '0,00 € / $',
    totalMonthly: '2.586,16 € / $',
  },

  // 6. Principal vs. Interest
  piTitle: 'Tilgung vs. Zins: Die Veränderung der Ratenzusammensetzung',
  principalDefinition: 'Die Tilgung (Principal) ist der eigentliche Rückzahlungsbetrag, der die verbleibende Darlehensschuld bei der Bank aktiv reduziert.',
  interestDefinition: 'Die Zinsen (Interest) sind der finanzielle Preis für das geliehene Kapital, der monatlich auf Basis der noch ausstehenden Restschuld berechnet wird.',
  amortizationDynamic: 'Bei einem klassischen Annuitätendarlehen bleibt die monatliche Gesamtrate für das Darlehen konstant, ihre innere Aufteilung verschiebt sich jedoch Monat für Monat. Zu Beginn ist die Restschuld am höchsten, weshalb der Großteil der Monatsrate für Zinszahlungen aufgewendet wird. Mit jeder Tilgungsleistung sinkt die Restschuld kontinuierlich, wodurch der Zinsanteil im nächsten Monat fällt und ein wachsender Anteil der Rate in die tatsächliche Schuldentilgung fließt.',

  // 7. Understanding Total Payment
  totalPaymentTitle: 'Die monatliche Gesamtwohnkostenbelastung verstehen',
  totalPaymentIntro: 'Bei der Finanzierungsplanung empfiehlt es sich, zwischen der Darlehensrückzahlung und den gesamten laufenden Wohnkosten zu unterscheiden. Dieser Rechner berücksichtigt vier Monatskomponenten:',
  totalPaymentComponents: [
    { label: 'Zins und Tilgung', description: 'Die planmäßige Rückzahlung des Darlehens und die Zinsvergütung, berechnet nach der Annuitätenformel (2.086,16 in diesem Beispiel).' },
    { label: 'Grundsteuer', description: 'Der monatliche Anteil (ein Zwölftel) der angegebenen jährlichen Grundsteuer (400,00 in diesem Beispiel).' },
    { label: 'Wohngebäudeversicherung', description: 'Der monatliche Anteil (ein Zwölftel) des angegebenen jährlichen Versicherungsbeitrags (100,00 in diesem Beispiel).' },
    { label: 'Hausgeld / Nebenkosten', description: 'Monatliche Verwalter- oder Betriebskosten für Gemeinschaftsanlagen, sofern zutreffend (0,00 in diesem Beispiel).' },
  ],
  totalPaymentClarification: 'In diesem Rechner ergibt sich die monatliche Gesamtrate aus der Summe aller eingegebenen Wohnkostenkomponenten: Zins und Tilgung (2.086,16) + Grundsteuer (400,00) + Gebäudeversicherung (100,00) + Hausgeld (0,00) = 2.586,16 pro Monat.',

  // 8. How Main Inputs Affect Payment
  inputImpactTitle: 'Wie die wesentlichen Eingaben die Rate beeinflussen',
  downPaymentImpact: {
    title: 'Einfluss des Eigenkapitals',
    description: 'Mehr Eigenkapital verringert direkt den Darlehensbetrag. Dadurch sinkt bei sonst gleichen Eingaben in der Regel die monatliche Rate für Zins und Tilgung sowie der über die Gesamtlaufzeit gezahlte Gesamtzinsaufwand.',
  },
  interestRateImpact: {
    title: 'Einfluss des Sollzinssatzes',
    description: 'Ein höherer Zinssatz steigert in der Regel die Monatsrate für Zins und Tilgung bei gegebenem Betrag und gegebener Laufzeit, wodurch die Gesamtkosten der Finanzierung über die Zeit steigen.',
  },
  loanTermImpact: {
    title: 'Einfluss der Darlehenslaufzeit',
    description: 'Eine längere Laufzeit verteilt die Tilgung auf mehr Monate, was in der Regel zu einer niedrigeren monatlichen Rate für Zins und Tilgung führt. Da jedoch über einen längeren Zeitraum Zinsen anfallen, kann der Gesamtzinsaufwand bei unveränderten Bedingungen steigen. Eine kürzere Laufzeit erfordert höhere Monatsraten, tilgt das Darlehen jedoch schneller mit geringerem Gesamtzinsaufwand.',
  },

  // 9. What This Calculator Includes
  includedTitle: 'Was dieser Rechner berücksichtigt',
  includedItems: [
    'Die monatliche Tilgung des Darlehensbetrags auf Basis von Kaufpreis und Eigenkapitalanteil.',
    'Die monatliche Zinsberechnung nach der standardisierten Annuitätenformel für Festzinsdarlehen.',
    'Die lineare Verteilung der jährlichen Grundsteuer auf 12 Monate (Jahresbetrag ÷ 12).',
    'Die lineare Verteilung des Jahresbeitrags der Gebäudeversicherung (Jahresbeitrag ÷ 12).',
    'Die direkte Berücksichtigung des monatlichen Hausgeldes in der Gesamtrate.',
    'Die Berechnung der monatlichen Gesamtrate und die detaillierte Aufteilung in Zins und Tilgung, Steuern, Gebäudeversicherung und Hausgeld.',
  ],

  // 10. What This Calculator Does Not Include
  notIncludedTitle: 'Kosten, die nicht im Rechner enthalten sind',
  notIncludedItems: [
    'Einmalige Erwerbs- und Abschlusskosten (Notar-, Grundbuch- und Eintragungsgebühren sowie behördliche Abgaben).',
    'Private Hypothekenversicherungen oder Bereitstellungsgebühren, sofern nicht manuell in den monatlichen Kosten erfasst.',
    'Laufende Instandhaltungsrücklagen und unvorhergesehene Reparaturen an der Immobilie.',
    'Monatliche Verbrauchskosten für Haushaltsenergie und Entsorgung (Strom, Gas, Wasser, Telekommunikation und Müllabfuhr).',
    'Zukünftige Anpassungen kommunaler Grundsteuern oder steigende Versicherungsbeiträge.',
    'Vorab gezahlte Zinsabschläge oder Rabattpunkte zur Reduzierung des Nominalzinssatzes.',
  ],

  // 11. Assumptions and Limitations
  assumptionsTitle: 'Annahmen und Grenzen der Berechnung',
  assumptionsIntro: 'Die Ergebnisse dieses Rechners basieren auf Modellannahmen:',
  assumptionsList: [
    'Konstanter Sollzinssatz: Es wird unterstellt, dass der Zinssatz über die gesamte gewählte Laufzeit hinweg unverändert bleibt.',
    'Pünktliche Ratenzahlung: Es wird von regelmäßigen Zahlungen nach Zahlungsplan ohne Sondertilgungen oder Zahlungsverzug ausgegangen.',
    'Gleichmäßige Kostenverteilung: Jährliche Steuern und Versicherungen werden zu gleichen Teilen auf 12 Monate aufgeteilt.',
    'Abhängigkeit von den Nutzereingaben: Die Genauigkeit der Berechnung hängt unmittelbar von den angegebenen Werten ab; die tatsächlichen Kosten können abweichen, wenn zusätzliche Gebühren oder Konditionen anfallen.',
  ],
  disclaimer: 'Dieser Rechner dient rein informativen Orientierungs- und Bildungszwecken. Er ersetzt keine professionelle Finanzberatung, Bonitätsprüfung oder verbindliche Kreditzusage eines Darlehensgebers. Wenden Sie sich für ein verbindliches Angebot an Ihre Bank oder einen zugelassenen Baufinanzierungsberater.',

  // 12. Frequently Asked Questions
  faqTitle: 'Häufig gestellte Fragen zur Baufinanzierung',
  faqs: [
    {
      q: 'Was ist eine Baufinanzierungsrate?',
      a: 'Eine Baufinanzierungsrate (Annuität) ist die regelmäßige monatliche Zahlung des Darlehensnehmers an die Bank. Sie setzt sich aus Zins (Kosten für das geliehene Geld) und Tilgung (Rückzahlung der Kreditschuld) zusammen. Im Alltag kommen oft noch monatliche Anteile für Grundsteuer, Versicherung und Hausgeld hinzu.',
    },
    {
      q: 'Wie wird die monatliche Rate berechnet?',
      a: 'Die Annuität aus Zins und Tilgung wird mit der Formel berechnet: M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], wobei P die Darlehenssumme, r der Monatszins und n die Gesamtmonate sind. Dazu werden ein Zwölftel von Grundsteuer und Versicherung sowie das monatliche Hausgeld addiert.',
    },
    {
      q: 'Wie wirkt sich das Eigenkapital auf die Monatsrate aus?',
      a: 'Eigenkapital ist das selbst aufgebrachte Bargeld. Je mehr Eigenkapital Sie einbringen, desto geringer ist der benötigte Darlehensbetrag (P). Dies senkt sofort die Monatsrate und reduziert den gesamten Zinsaufwand über die Darlehenslaufzeit erheblich.',
    },
    {
      q: 'Senkt eine längere Darlehenslaufzeit die monatliche Rate?',
      a: 'Ja. Wird die Laufzeit verlängert (z. B. von 15 auf 30 Jahre), verteilt sich die Tilgung auf deutlich mehr Monate, was die Pflichtrate spürbar verringert. Da Zinsen jedoch über einen doppelt so langen Zeitraum berechnet werden, sind die Gesamtzinskosten drastisch höher.',
    },
    {
      q: 'Beinhaltet die Monatsrate auch Steuern und Versicherungen?',
      a: 'In diesem Rechner werden Grundsteuer und Gebäudeversicherung in die geschätzte Gesamtrate einbezogen, sobald Sie Jahreswerte eingeben. Die Beträge werden durch 12 geteilt und der Annuität und dem Hausgeld hinzugerechnet.',
    },
    {
      q: 'Was ist der Unterschied zwischen Tilgung und Zins?',
      a: 'Die Tilgung ist der tatsächliche Betrag, der Ihre Restschuld mindert. Der Zins ist das Entgelt der Bank für die Bereitstellung des Kredits. Im Zeitverlauf sinkt der Zinsanteil der Rate, während der Tilgungsanteil Monat für Monat ansteigt.',
    },
    {
      q: 'Ist das Rechnerergebnis ein verbindliches Kreditangebot?',
      a: 'Nein. Es handelt sich um eine rechnerische Schätzung. Verbindliche Kreditangebote erfordern eine individuelle Bonitätsprüfung, Einkommensnachweise, den Beleihungswert der Immobilie und die Berücksichtigung aller Erwerbsnebenkosten.',
    },
    {
      q: 'Welche Kosten werden im Rechner nicht berücksichtigt?',
      a: 'Nicht enthalten sind einmalige Kaufnebenkosten (Grunderwerbsteuer, Notar, Grundbuch, Makler), etwaige Bereitstellungszinsen, private Lebensversicherungen, individuelle Nebenkosten für Energie sowie künftige Hebesatzerhöhungen der Gemeinden.',
    },
  ],
};
