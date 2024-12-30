import { UserProfile } from "@/lib/interfaces/user/user.interface";
import { defaultUserObject } from "@/lib/utils/user/user.util";
import { createStore } from "zustand/vanilla";

export type UserState = {
    user: UserProfile | null;
};

export type UserActions = {
    // todo: Implement User Store actions
    setUser: (user: UserProfile | null) => void;
};

export type UserStore = UserState & UserActions;

export const defaultUserInitState: UserState = {
    user: defaultUserObject,
};

export const createUserStore = (
    initState: UserState = defaultUserInitState
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        setUser: (user: UserProfile | null) =>
            set((state) => ({ ...state, user })),
        // todo: Implement User Related Store actions
    }));
};