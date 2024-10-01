import React from 'react';

interface Props {
	className?: string;
}

export const CartItem: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}></div>
	);
};