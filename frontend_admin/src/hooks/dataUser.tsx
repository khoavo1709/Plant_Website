import { atom } from "jotai";
import { User } from "../../types/user";

export const dataUser = atom<User | null>(null);
