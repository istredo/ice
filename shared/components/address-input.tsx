'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token="fa80a213e02c06ffe1b6fae9b47e82bda3afb1d3"
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
