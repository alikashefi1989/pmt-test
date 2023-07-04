// module
import { create } from "zustand";
import { persist } from "zustand/middleware";
// custom
import { Store, DataOfStore } from "../models/store";

const persistedStateName = 'app-golbal-store'

export const extractPersistedAppGolbalStore = <FieldType>(fieldName: keyof DataOfStore): FieldType | null => {

    const persistedData: any = localStorage.getItem(persistedStateName);

    try {
        const parsedData: any = JSON.parse(persistedData);

        if ('state' in parsedData) {
            const persistedAppGolbalStore: any = parsedData['state'];
            if (fieldName in persistedAppGolbalStore) {
                return persistedAppGolbalStore[fieldName];
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

const useStore = create<Store, any>(
    persist((set, _) =>
    ({
        token: extractPersistedAppGolbalStore<Store['token']>('token'),
        darkMode: false,
        setToken: (token: Store['token']) => {
            set({ token });
        },
        resetToken: () => {
            set({ token: null });
        },
        setDarkMode: (darkMode: Store['darkMode']) => {
            set({ darkMode });
        },
    }),
        {
            name: persistedStateName,
            getStorage: () => localStorage,
        }
    )
);

export default useStore;