export interface CurrencyInfo {
  code: string;
  name: string;
  nameAr: string;
  symbol: string;
  rateAgainstUSD: number; // Fallback reference rate against 1 USD
  flag: string;
  category: 'major' | 'arab' | 'global' | 'metal' | 'crypto';
}

// 50+ Currencies: Major Globals, Arab & MENA, Metals & Crypto
export const CURRENCY_DATABASE: CurrencyInfo[] = [
  // --- Major Currencies ---
  { code: 'USD', name: 'US Dollar', nameAr: 'دولار أمريكي', symbol: '$', rateAgainstUSD: 1.0, flag: '🇺🇸', category: 'major' },
  { code: 'EUR', name: 'Euro', nameAr: 'يورو أوروبي', symbol: '€', rateAgainstUSD: 0.92, flag: '🇪🇺', category: 'major' },
  { code: 'GBP', name: 'British Pound', nameAr: 'جنيه إسترليني', symbol: '£', rateAgainstUSD: 0.79, flag: '🇬🇧', category: 'major' },
  { code: 'JPY', name: 'Japanese Yen', nameAr: 'ين ياباني', symbol: '¥', rateAgainstUSD: 154.5, flag: '🇯🇵', category: 'major' },
  { code: 'CHF', name: 'Swiss Franc', nameAr: 'فرنك سويسري', symbol: 'CHF', rateAgainstUSD: 0.90, flag: '🇨🇭', category: 'major' },
  { code: 'CAD', name: 'Canadian Dollar', nameAr: 'دولار كندي', symbol: 'CA$', rateAgainstUSD: 1.37, flag: '🇨🇦', category: 'major' },
  { code: 'AUD', name: 'Australian Dollar', nameAr: 'دولار أسترالي', symbol: 'A$', rateAgainstUSD: 1.53, flag: '🇦🇺', category: 'major' },
  { code: 'CNY', name: 'Chinese Yuan', nameAr: 'يوان صيني', symbol: '¥', rateAgainstUSD: 7.24, flag: '🇨🇳', category: 'major' },

  // --- Arab & MENA Currencies ---
  { code: 'SAR', name: 'Saudi Riyal', nameAr: 'ريال سعودي', symbol: '﷼', rateAgainstUSD: 3.75, flag: '🇸🇦', category: 'arab' },
  { code: 'AED', name: 'UAE Dirham', nameAr: 'درهم إماراتي', symbol: 'د.إ', rateAgainstUSD: 3.6725, flag: '🇦🇪', category: 'arab' },
  { code: 'EGP', name: 'Egyptian Pound', nameAr: 'جنيه مصري', symbol: 'E£', rateAgainstUSD: 48.6, flag: '🇪🇬', category: 'arab' },
  { code: 'KWD', name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي', symbol: 'د.ك', rateAgainstUSD: 0.308, flag: '🇰🇼', category: 'arab' },
  { code: 'QAR', name: 'Qatari Riyal', nameAr: 'ريال قطري', symbol: 'ر.ق', rateAgainstUSD: 3.64, flag: '🇶🇦', category: 'arab' },
  { code: 'BHD', name: 'Bahraini Dinar', nameAr: 'دينار بحريني', symbol: 'د.ب', rateAgainstUSD: 0.376, flag: '🇧🇭', category: 'arab' },
  { code: 'OMR', name: 'Omani Rial', nameAr: 'ريال عماني', symbol: 'ر.ع', rateAgainstUSD: 0.385, flag: '🇴🇲', category: 'arab' },
  { code: 'JOD', name: 'Jordanian Dinar', nameAr: 'دينار أردني', symbol: 'د.أ', rateAgainstUSD: 0.709, flag: '🇯🇴', category: 'arab' },
  { code: 'MAD', name: 'Moroccan Dirham', nameAr: 'درهم مغربي', symbol: 'د.م.', rateAgainstUSD: 10.05, flag: '🇲🇦', category: 'arab' },
  { code: 'DZD', name: 'Algerian Dinar', nameAr: 'دينار جزائري', symbol: 'د.ج', rateAgainstUSD: 134.5, flag: '🇩🇿', category: 'arab' },
  { code: 'TND', name: 'Tunisian Dinar', nameAr: 'دينار تونسي', symbol: 'د.ت', rateAgainstUSD: 3.12, flag: '🇹🇳', category: 'arab' },
  { code: 'IQD', name: 'Iraqi Dinar', nameAr: 'دينار عراقي', symbol: 'ع.د', rateAgainstUSD: 1310.0, flag: '🇮🇶', category: 'arab' },
  { code: 'LBP', name: 'Lebanese Pound', nameAr: 'ليرة لبنانية', symbol: 'ل.ل', rateAgainstUSD: 89500.0, flag: '🇱🇧', category: 'arab' },
  { code: 'LYD', name: 'Libyan Dinar', nameAr: 'دينار ليبي', symbol: 'د.ل', rateAgainstUSD: 4.88, flag: '🇱🇾', category: 'arab' },
  { code: 'SDG', name: 'Sudanese Pound', nameAr: 'جنيه سوداني', symbol: 'ج.س', rateAgainstUSD: 601.0, flag: '🇸🇩', category: 'arab' },
  { code: 'YER', name: 'Yemeni Rial', nameAr: 'ريال يمني', symbol: '﷼', rateAgainstUSD: 250.3, flag: '🇾🇪', category: 'arab' },

  // --- Global Economies ---
  { code: 'INR', name: 'Indian Rupee', nameAr: 'روبية هندية', symbol: '₹', rateAgainstUSD: 83.5, flag: '🇮🇳', category: 'global' },
  { code: 'TRY', name: 'Turkish Lira', nameAr: 'ليرة تركية', symbol: '₺', rateAgainstUSD: 32.8, flag: '🇹🇷', category: 'global' },
  { code: 'BRL', name: 'Brazilian Real', nameAr: 'ريال برازيلي', symbol: 'R$', rateAgainstUSD: 5.45, flag: '🇧🇷', category: 'global' },
  { code: 'MXN', name: 'Mexican Peso', nameAr: 'بيزو مكسيكي', symbol: 'Mex$', rateAgainstUSD: 18.2, flag: '🇲🇽', category: 'global' },
  { code: 'KRW', name: 'South Korean Won', nameAr: 'وون كوري جنوبي', symbol: '₩', rateAgainstUSD: 1380.0, flag: '🇰🇷', category: 'global' },
  { code: 'SGD', name: 'Singapore Dollar', nameAr: 'دولار سنغافوري', symbol: 'S$', rateAgainstUSD: 1.35, flag: '🇸🇬', category: 'global' },
  { code: 'HKD', name: 'Hong Kong Dollar', nameAr: 'دولار هونغ كونغ', symbol: 'HK$', rateAgainstUSD: 7.81, flag: '🇭🇰', category: 'global' },
  { code: 'NZD', name: 'New Zealand Dollar', nameAr: 'دولار نيوزيلندي', symbol: 'NZ$', rateAgainstUSD: 1.63, flag: '🇳🇿', category: 'global' },
  { code: 'SEK', name: 'Swedish Krona', nameAr: 'كرونة سويدية', symbol: 'kr', rateAgainstUSD: 10.5, flag: '🇸🇪', category: 'global' },
  { code: 'NOK', name: 'Norwegian Krone', nameAr: 'كرونة نرويجية', symbol: 'kr', rateAgainstUSD: 10.6, flag: '🇳🇴', category: 'global' },
  { code: 'DKK', name: 'Danish Krone', nameAr: 'كرونة دنماركية', symbol: 'kr', rateAgainstUSD: 6.9, flag: '🇩🇰', category: 'global' },
  { code: 'RUB', name: 'Russian Ruble', nameAr: 'روبل روسي', symbol: '₽', rateAgainstUSD: 88.5, flag: '🇷🇺', category: 'global' },
  { code: 'ZAR', name: 'South African Rand', nameAr: 'راند جنوب أفريقي', symbol: 'R', rateAgainstUSD: 18.3, flag: '🇿🇦', category: 'global' },
  { code: 'MYR', name: 'Malaysian Ringgit', nameAr: 'رينغيت ماليزي', symbol: 'RM', rateAgainstUSD: 4.71, flag: '🇲🇾', category: 'global' },
  { code: 'THB', name: 'Thai Baht', nameAr: 'بات تايلاندي', symbol: '฿', rateAgainstUSD: 36.7, flag: '🇹🇭', category: 'global' },
  { code: 'IDR', name: 'Indonesian Rupiah', nameAr: 'روبية إندونيسية', symbol: 'Rp', rateAgainstUSD: 16350.0, flag: '🇮🇩', category: 'global' },
  { code: 'PHP', name: 'Philippine Peso', nameAr: 'بيزو فلبيني', symbol: '₱', rateAgainstUSD: 58.6, flag: '🇵🇭', category: 'global' },
  { code: 'PKR', name: 'Pakistani Rupee', nameAr: 'روبية باكستانية', symbol: '₨', rateAgainstUSD: 278.5, flag: '🇵🇰', category: 'global' },

  // --- Metals & Commodities (USD per unit) ---
  { code: 'XAU', name: 'Gold (Ounce troy)', nameAr: 'ذهب (أونصة تروي)', symbol: 'Gold oz', rateAgainstUSD: 0.000416, flag: '🥇', category: 'metal' }, // ~ $2400/oz -> 1/2400
  { code: 'XAG', name: 'Silver (Ounce troy)', nameAr: 'فضة (أونصة تروي)', symbol: 'Silver oz', rateAgainstUSD: 0.0333, flag: '🥈', category: 'metal' }, // ~ $30/oz -> 1/30

  // --- Cryptocurrencies ---
  { code: 'BTC', name: 'Bitcoin', nameAr: 'بيتكوين', symbol: '₿', rateAgainstUSD: 0.0000153, flag: '🪙', category: 'crypto' }, // ~ $65,000
  { code: 'ETH', name: 'Ethereum', nameAr: 'إيثيريوم', symbol: 'Ξ', rateAgainstUSD: 0.000285, flag: '🔷', category: 'crypto' }, // ~ $3,500
  { code: 'USDT', name: 'Tether USD', nameAr: 'تيذر رقمي', symbol: '₮', rateAgainstUSD: 1.0, flag: '💵', category: 'crypto' },
];

export interface RatesCache {
  rates: Record<string, number>; // Code -> Rate against USD
  timestamp: number;
  source: string;
}

let memoryRatesCache: RatesCache | null = null;

// Dynamic Live & Fallback Exchange Rate Provider
export const LiveCurrencyProvider = {
  getRatesAgainstUSD: async (): Promise<{ rates: Record<string, number>; isLive: boolean; lastUpdated: string; source: string }> => {
    // Check in-memory cache (fresh for 10 minutes)
    const now = Date.now();
    if (memoryRatesCache && now - memoryRatesCache.timestamp < 10 * 60 * 1000) {
      return {
        rates: memoryRatesCache.rates,
        isLive: true,
        lastUpdated: new Date(memoryRatesCache.timestamp).toLocaleTimeString(),
        source: memoryRatesCache.source,
      };
    }

    try {
      // Free public Open Exchange Rates endpoint (no API key needed, high reliability)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          const liveRates: Record<string, number> = { ...data.rates };
          // Keep special commodities & crypto estimates if not in feed
          CURRENCY_DATABASE.forEach((c) => {
            if (!liveRates[c.code]) {
              liveRates[c.code] = c.rateAgainstUSD;
            }
          });

          memoryRatesCache = {
            rates: liveRates,
            timestamp: now,
            source: 'Open Exchange Rates (Live Market Feed)',
          };

          return {
            rates: liveRates,
            isLive: true,
            lastUpdated: new Date(now).toLocaleTimeString(),
            source: 'Open Exchange Rates (Live Market Feed)',
          };
        }
      }
    } catch {
      // Network offline or timeout -> silently use static fallback
    }

    // Static fallback from comprehensive database
    const fallbackRates: Record<string, number> = {};
    CURRENCY_DATABASE.forEach((c) => {
      fallbackRates[c.code] = c.rateAgainstUSD;
    });

    return {
      rates: fallbackRates,
      isLive: false,
      lastUpdated: 'Benchmark Standard Rates',
      source: 'Calcyfy Global Benchmark Table',
    };
  },

  getRate: async (fromCode: string, toCode: string) => {
    const { rates, isLive, lastUpdated, source } = await LiveCurrencyProvider.getRatesAgainstUSD();
    const fromRateToUSD = rates[fromCode] || 1;
    const toRateToUSD = rates[toCode] || 1;

    // Convert: from -> USD -> to
    // If 1 USD = fromRateToUSD [FROM], then 1 [FROM] = 1 / fromRateToUSD [USD]
    // Then 1 [FROM] in [TO] = (1 / fromRateToUSD) * toRateToUSD
    const rate = (1 / fromRateToUSD) * toRateToUSD;

    return {
      rate,
      isLive,
      lastUpdated,
      source,
    };
  },
};
