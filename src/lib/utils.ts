import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import crypto from 'crypto-js';
import { UserData } from './types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function hashSHA256(input: string): string {
	const hash = crypto.SHA256(input);
	return hash.toString();
}
export const getUserToken = async () => {
	const res = await fetch('https://api.ipify.org/?format=json');
	const data = await res.json();

	return hashSHA256(data.ip);
};
export function validateUserData() {
	const userData = localStorage.getItem('userData');
	if (!userData) return false;

	const jsonUserData: UserData = JSON.parse(userData);
	if (jsonUserData.bank == '' || jsonUserData.bank == null) return false;
	if (jsonUserData.banking_number == '' || jsonUserData.banking_number == null)
		return false;
	if (jsonUserData.name == '' || jsonUserData.name == null) return false;
	return true;
}
export function randomPrizeNumber(prize: string) {
	const m10k = [6];
	const m1k = [1, 3, 8, 11];
	const m100k = [10];
	const netflix = [0];
	const none = [4, 7, 9];
	const m5k = [2, 5];
	let randomNum: number = 0;

	switch (prize) {
		case 'm10k':
			randomNum = m10k[Math.floor(Math.random() * m10k.length)];
			break;
		case 'm1k':
			randomNum = m1k[Math.floor(Math.random() * m1k.length)];
			break;
		case 'm100k':
			randomNum = m100k[Math.floor(Math.random() * m100k.length)];
			break;
		case 'netflix':
			randomNum = netflix[Math.floor(Math.random() * netflix.length)];
			break;
		case 'm5k':
			randomNum = m5k[Math.floor(Math.random() * m5k.length)];
			break;
		case 'none':
			randomNum = none[Math.floor(Math.random() * none.length)];
			break;
		default:
			break;
	}

	return randomNum;
}
