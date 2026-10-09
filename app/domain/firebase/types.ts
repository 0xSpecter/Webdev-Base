import type { Timestamp } from "firebase/firestore";
import { createContext } from "react"

export interface Inter {
	id: string,
	createdAt: Timestamp
}

export type CreateInterProps = Omit<Inter, "id" | "createdAt">;

export const Context = createContext<undefined>(undefined);
