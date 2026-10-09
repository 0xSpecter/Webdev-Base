import { useState, type ReactNode } from 'react';
import { Context } from '~/domain/firebase/types';

export default function Provider({ children }: { children?: ReactNode }) {
	return (
		<Context.Provider value={{}}>
			{children}
		</Context.Provider>
	);
}
