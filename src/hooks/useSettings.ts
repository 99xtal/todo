import { useEffect, useState } from 'react';

interface Settings {
  hideInstallPrompt: boolean;
}

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const localSettings = localStorage.getItem('settings');
    if (!localSettings) {
      return { hideInstallPrompt: false };
    }

    return JSON.parse(localSettings);
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const setSetting = (key: keyof Settings, value: boolean) => {
    setSettings((oldSettings) => ({ ...oldSettings, [key]: value }));
  };

  return { settings, setSetting };
};

export default useSettings;
