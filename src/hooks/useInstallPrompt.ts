import { useCallback, useEffect, useRef, useState } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const useInstallPrompt = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();

      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setIsInstallable(true);
    });
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt.current) return;

    deferredPrompt.current.prompt();
    return deferredPrompt.current.userChoice;
  }, []);

  return {
    isInstallable,
    promptInstall,
  };
};

export default useInstallPrompt;
