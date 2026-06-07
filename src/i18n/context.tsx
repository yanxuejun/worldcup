import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type Lang = 'en' | 'zh';

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  setLang: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('worldcup-lang');
    if (saved === 'zh' || saved === 'en') return saved;
    return 'en';
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem('worldcup-lang', next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  return useContext(I18nContext);
}
