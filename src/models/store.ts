export interface DataOfStore {
    token: string | null
    darkMode: boolean;
};

export interface ActionOfStore {
    setToken: (token: DataOfStore['token']) => void
    resetToken: () => void
    setDarkMode: (darkMode: boolean) => void;
};

export type Store = DataOfStore & ActionOfStore;