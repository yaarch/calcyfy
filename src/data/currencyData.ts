export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rateAgainstUSD: number; // Reference rate for static fallback
  flag: string;
}

// Dedicated isolated currency reference dataset
export const CURRENCY_DATABASE: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateAgainstUSD: 1.0, flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', rateAgainstUSD: 0.92, flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateAgainstUSD: 0.79, flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rateAgainstUSD: 154.2, flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateAgainstUSD: 1.36, flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateAgainstUSD: 1.52, flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rateAgainstUSD: 0.90, flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rateAgainstUSD: 7.23, flag: '🇨🇳' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', rateAgainstUSD: 3.75, flag: '🇸🇦' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rateAgainstUSD: 3.67, flag: '🇦🇪' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', rateAgainstUSD: 48.5, flag: '🇪🇬' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateAgainstUSD: 83.4, flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rateAgainstUSD: 5.15, flag: '🇧🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', rateAgainstUSD: 16.8, flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rateAgainstUSD: 1.35, flag: '🇸🇬' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rateAgainstUSD: 1.65, flag: '🇳🇿' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', rateAgainstUSD: 0.31, flag: '🇰🇼' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', rateAgainstUSD: 3.64, flag: '🇶🇦' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rateAgainstUSD: 32.2, flag: '🇹🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', rateAgainstUSD: 1375.0, flag: '🇰🇷' },
];

export interface ExchangeRateProvider {
  getRate: (fromCode: string, toCode: string) => Promise<{
    rate: number;
    isLive: boolean;
    lastUpdated: string;
    source: string;
  }>;
}

// Modular currency conversion engine: Currently uses static reference data with clear disclosure,
// and can be plugged into open.er-api.com / exchangerate-api with zero frontend code changes.
export const StaticCurrencyProvider: ExchangeRateProvider = {
  getRate: async (fromCode: string, toCode: string) => {
    const from = CURRENCY_DATABASE.find((c) => c.code === fromCode);
    const to = CURRENCY_DATABASE.find((c) => c.code === toCode);

    if (!from || !to) {
      return {
        rate: 1,
        isLive: false,
        lastUpdated: 'Sample reference data',
        source: 'Static Reference Table',
      };
    }

    // Convert from -> USD -> to
    const usdAmount = 1 / from.rateAgainstUSD;
    const rate = usdAmount * to.rateAgainstUSD;

    return {
      rate,
      isLive: false,
      lastUpdated: 'Reference rates (Informational only)',
      source: 'Calcyfy Standard Benchmark Table',
    };
  },
};
