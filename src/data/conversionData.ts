export interface UnitOption {
  id: string;
  nameKey: string;
  factorToBase: number; // For linear conversion: value * factorToBase = baseUnitValue
  symbol: string;
}

export interface DimensionCategory {
  id: string;
  nameKey: string;
  baseUnit: string;
  units: UnitOption[];
  customConvert?: (value: number, fromUnit: string, toUnit: string) => number;
}

export const CONVERSION_CATEGORIES: DimensionCategory[] = [
  {
    id: 'length',
    nameKey: 'dim_length',
    baseUnit: 'm',
    units: [
      { id: 'm', nameKey: 'unit_meter', factorToBase: 1, symbol: 'm' },
      { id: 'km', nameKey: 'unit_kilometer', factorToBase: 1000, symbol: 'km' },
      { id: 'cm', nameKey: 'unit_centimeter', factorToBase: 0.01, symbol: 'cm' },
      { id: 'mm', nameKey: 'unit_millimeter', factorToBase: 0.001, symbol: 'mm' },
      { id: 'mi', nameKey: 'unit_mile', factorToBase: 1609.344, symbol: 'mi' },
      { id: 'yd', nameKey: 'unit_yard', factorToBase: 0.9144, symbol: 'yd' },
      { id: 'ft', nameKey: 'unit_foot', factorToBase: 0.3048, symbol: 'ft' },
      { id: 'in', nameKey: 'unit_inch', factorToBase: 0.0254, symbol: 'in' },
      { id: 'nmi', nameKey: 'unit_nautical_mile', factorToBase: 1852, symbol: 'nmi' },
    ],
  },
  {
    id: 'weight',
    nameKey: 'dim_weight',
    baseUnit: 'kg',
    units: [
      { id: 'kg', nameKey: 'unit_kilogram', factorToBase: 1, symbol: 'kg' },
      { id: 'g', nameKey: 'unit_gram', factorToBase: 0.001, symbol: 'g' },
      { id: 'mg', nameKey: 'unit_milligram', factorToBase: 0.000001, symbol: 'mg' },
      { id: 't', nameKey: 'unit_metric_ton', factorToBase: 1000, symbol: 't' },
      { id: 'lb', nameKey: 'unit_pound', factorToBase: 0.45359237, symbol: 'lb' },
      { id: 'oz', nameKey: 'unit_ounce', factorToBase: 0.028349523, symbol: 'oz' },
      { id: 'st', nameKey: 'unit_stone', factorToBase: 6.35029318, symbol: 'st' },
    ],
  },
  {
    id: 'temperature',
    nameKey: 'dim_temperature',
    baseUnit: 'c',
    units: [
      { id: 'c', nameKey: 'unit_celsius', factorToBase: 1, symbol: '°C' },
      { id: 'f', nameKey: 'unit_fahrenheit', factorToBase: 1, symbol: '°F' },
      { id: 'k', nameKey: 'unit_kelvin', factorToBase: 1, symbol: 'K' },
    ],
    customConvert: (val, from, to) => {
      // First convert to Celsius
      let celsius = val;
      if (from === 'f') celsius = (val - 32) * (5 / 9);
      else if (from === 'k') celsius = val - 273.15;

      // Then convert Celsius to target
      if (to === 'c') return celsius;
      if (to === 'f') return celsius * (9 / 5) + 32;
      if (to === 'k') return celsius + 273.15;
      return celsius;
    },
  },
  {
    id: 'area',
    nameKey: 'dim_area',
    baseUnit: 'm2',
    units: [
      { id: 'm2', nameKey: 'unit_sq_meter', factorToBase: 1, symbol: 'm²' },
      { id: 'km2', nameKey: 'unit_sq_kilometer', factorToBase: 1000000, symbol: 'km²' },
      { id: 'cm2', nameKey: 'unit_sq_centimeter', factorToBase: 0.0001, symbol: 'cm²' },
      { id: 'ha', nameKey: 'unit_hectare', factorToBase: 10000, symbol: 'ha' },
      { id: 'ac', nameKey: 'unit_acre', factorToBase: 4046.85642, symbol: 'ac' },
      { id: 'sqft', nameKey: 'unit_sq_foot', factorToBase: 0.09290304, symbol: 'ft²' },
      { id: 'sqmi', nameKey: 'unit_sq_mile', factorToBase: 2589988.11, symbol: 'mi²' },
    ],
  },
  {
    id: 'volume',
    nameKey: 'dim_volume',
    baseUnit: 'l',
    units: [
      { id: 'l', nameKey: 'unit_liter', factorToBase: 1, symbol: 'L' },
      { id: 'ml', nameKey: 'unit_milliliter', factorToBase: 0.001, symbol: 'mL' },
      { id: 'm3', nameKey: 'unit_cubic_meter', factorToBase: 1000, symbol: 'm³' },
      { id: 'gal_us', nameKey: 'unit_us_gallon', factorToBase: 3.78541178, symbol: 'gal (US)' },
      { id: 'qt_us', nameKey: 'unit_us_quart', factorToBase: 0.946352946, symbol: 'qt (US)' },
      { id: 'pt_us', nameKey: 'unit_us_pint', factorToBase: 0.473176473, symbol: 'pt (US)' },
      { id: 'cup_us', nameKey: 'unit_us_cup', factorToBase: 0.236588236, symbol: 'cup' },
      { id: 'fl_oz_us', nameKey: 'unit_us_fluid_oz', factorToBase: 0.029573529, symbol: 'fl oz' },
    ],
  },
  {
    id: 'speed',
    nameKey: 'dim_speed',
    baseUnit: 'mps',
    units: [
      { id: 'mps', nameKey: 'unit_meters_per_sec', factorToBase: 1, symbol: 'm/s' },
      { id: 'kph', nameKey: 'unit_km_per_hour', factorToBase: 0.277777778, symbol: 'km/h' },
      { id: 'mph', nameKey: 'unit_miles_per_hour', factorToBase: 0.44704, symbol: 'mph' },
      { id: 'knot', nameKey: 'unit_knot', factorToBase: 0.514444444, symbol: 'kn' },
      { id: 'fps', nameKey: 'unit_feet_per_sec', factorToBase: 0.3048, symbol: 'ft/s' },
    ],
  },
  {
    id: 'time',
    nameKey: 'dim_time',
    baseUnit: 's',
    units: [
      { id: 's', nameKey: 'unit_second', factorToBase: 1, symbol: 's' },
      { id: 'ms', nameKey: 'unit_millisecond', factorToBase: 0.001, symbol: 'ms' },
      { id: 'min', nameKey: 'unit_minute', factorToBase: 60, symbol: 'min' },
      { id: 'h', nameKey: 'unit_hour', factorToBase: 3600, symbol: 'h' },
      { id: 'd', nameKey: 'unit_day', factorToBase: 86400, symbol: 'd' },
      { id: 'wk', nameKey: 'unit_week', factorToBase: 604800, symbol: 'wk' },
      { id: 'mo', nameKey: 'unit_month_avg', factorToBase: 2629746, symbol: 'mo' },
      { id: 'yr', nameKey: 'unit_year_avg', factorToBase: 31556952, symbol: 'yr' },
    ],
  },
  {
    id: 'data',
    nameKey: 'dim_data',
    baseUnit: 'b',
    units: [
      { id: 'b', nameKey: 'unit_byte', factorToBase: 1, symbol: 'B' },
      { id: 'kb', nameKey: 'unit_kilobyte', factorToBase: 1024, symbol: 'KB' },
      { id: 'mb', nameKey: 'unit_megabyte', factorToBase: 1048576, symbol: 'MB' },
      { id: 'gb', nameKey: 'unit_gigabyte', factorToBase: 1073741824, symbol: 'GB' },
      { id: 'tb', nameKey: 'unit_terabyte', factorToBase: 1099511627776, symbol: 'TB' },
      { id: 'bit', nameKey: 'unit_bit', factorToBase: 0.125, symbol: 'bit' },
    ],
  },
];

export function convertUnits(
  value: number,
  dimensionId: string,
  fromUnitId: string,
  toUnitId: string
): number {
  if (isNaN(value)) return 0;
  if (fromUnitId === toUnitId) return value;

  const dimension = CONVERSION_CATEGORIES.find((d) => d.id === dimensionId);
  if (!dimension) return value;

  if (dimension.customConvert) {
    return dimension.customConvert(value, fromUnitId, toUnitId);
  }

  const fromUnit = dimension.units.find((u) => u.id === fromUnitId);
  const toUnit = dimension.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return value;

  const inBase = value * fromUnit.factorToBase;
  return inBase / toUnit.factorToBase;
}
