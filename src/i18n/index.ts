import { useI18nContext } from './context';
import en from './locales/en';
import zh from './locales/zh';

const locales = { en, zh };

export function useI18n() {
  const { lang, setLang } = useI18nContext();
  const locale = locales[lang];

  function t(key: string): string {
    const parts = key.split('.');
    let value: any = locale;
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) break;
    }
    return typeof value === 'string' ? value : key;
  }

  return { lang, setLang, t, locale };
}

export type { Lang } from './context';
export { I18nProvider } from './context';
