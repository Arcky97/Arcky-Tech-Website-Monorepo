export type StyleGroup = 'default' | 'updateHistory' | 'contentSection';

type StyleConfig = {
  wrapper: string;
  section: string;
  card?: string;
  date?: string;
  header?: string;
};

const baseStyles: Record<StyleGroup, StyleConfig> = {
  'default': {
    wrapper: 'text-white w-[90%] lg:w-[75%] lg:px-8 mx-auto',
    section: 'text-center space-y-8',
  },
  'updateHistory': {
    wrapper: 'text-white w-[95%] lg:w-[75%] lg:px-8 mx-auto',
    section: 'text-center space-y-4 mb-4',
    card: 'border border-gray-700 rounded-lg px-2 lg:px-6 py-4 bg-gray-800 section-wrapper-history',
    date: 'text-gray-600 text-sm text-left'
  },
  'contentSection': {
    wrapper: 'text-white w-[90%] lg:w-[75%] lg:px-8 mx-auto',
    section: 'text-center space-y-4 mb-4',
    card: 'border border-gray-700 rounded-lg py-4 px-6 section-wrapper'
  }
}

export function getStyles(layout: StyleGroup | null): StyleConfig {
  const base = baseStyles[layout || "default"];
  return {
    ...base
  };
}