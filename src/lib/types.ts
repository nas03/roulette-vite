export interface UserData {
	banking_number: string;
	bank: string;
	name: string;
}
export interface BankList {
	id: number;
	name: string;
	code: string;
	bin: string;
	shortName: string;
	logo: string;
	transferSupported: boolean;
	lookupSupported: boolean;
	short_name: string;
	support: boolean;
	isTransfer: boolean;
	swift_code: null | string;
}
export interface SuccessfulResponse {
	code: string;
	message: string;
	data: string;
}
export interface ValidationError {
	detail: [
		{
			loc: [string, 0];
			msg: string;
			type: string;
		}
	];
}
export interface User {
	_id: string;
	banking_number: string;
	bank: string;
	name: string;
	secret_token: string;
	reward_type: string;
	money_tranfered: boolean;
}
export enum Prize {
	'm100k',
	'm10k',
	'm1k',
	'netflix',
	'none',
}
