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
export interface GetParams {
	category?: string | null;
	article?: string | null;
	availability_in_game_centers?: string | null;
	ordering?: string | null;
	search?: string | null;
	page?: number | null;
	email?: string | null;
	is_staff?: boolean;
}
export interface Computer {
	number: number;
	mac_address: string;
	ip_address: string;
	map_x: number;
	map_y: number;
}
