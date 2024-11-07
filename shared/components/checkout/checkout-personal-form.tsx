import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

interface Props {
	className?: string;
	isMedia?: boolean;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className, isMedia }) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={className}>
			<div className={isMedia ? "flex flex-col gap-2" : "grid grid-cols-2 gap-5"}>
				<FormInput name="firstName" className="text-base" placeholder="Имя" />
				<FormInput name="lastName" className="text-base" placeholder="Фамилия" />
				<FormInput name="email" className="text-base" placeholder="E-Mail" />
				<FormInput name="phone" className="text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	);
};
