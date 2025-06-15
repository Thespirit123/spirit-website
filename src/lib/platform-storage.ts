export type SelectedPlatform = 'affiliate' | 'utilities' | null;

const PLATFORM_KEY = 'selectedPlatform';

export const setSelectedPlatform = (platform: SelectedPlatform): void => {
    if (typeof window !== 'undefined') {
        if (platform) {
            localStorage.setItem(PLATFORM_KEY, platform);
        } else {
            localStorage.removeItem(PLATFORM_KEY);
        }
    }
};

export const getSelectedPlatform = (): SelectedPlatform => {
    if (typeof window !== 'undefined') {
        const platform = localStorage.getItem(PLATFORM_KEY);
        if (platform === 'affiliate' || platform === 'utilities') {
            return platform;
        }
    }
    return null;
};