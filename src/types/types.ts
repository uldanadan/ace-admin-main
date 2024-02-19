export interface NavList {
	name: string
	link: string
}
export interface Product {
	uuid: string
	name: string
	descrption: string
	article: string
	price: number
	amount: number
	thumbnail: string
	category: string
}
export interface Statistics {
	other_expenses: number
	cash_paid_for_taxes: number
	total_cash_expenditure: number
}

export interface FileInfo {
	created: Date
	file: string;
	is_active: boolean;
	updated: Date;
	uuid: string;
}
