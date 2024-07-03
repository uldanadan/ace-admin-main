export interface NavList {
	name: string
	link: string
}
export interface Product {
	uuid: string
	name: string
	description: string
	article: string
	price: number
	amount: number
	thumbnail: { image: string };
	category: { name: string };
	availability_in_game_centers: { name: string }[];
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
	zone_id: string;
}

export interface Message {
    type?: string
    status?: string
    sender?: string
    message: string
    created_at: any
    admin: boolean
	uuid?: string
}

export interface Messages { 
	[key: string]: Message[] 
}

export interface IZone {
	uuid: string;
	name: string;
	busy_computers: number;
}

export interface GameCenter {
	uuid: string;
	name: string;
	image: string;
	rating: number;
	address: string;
	latitude: number;
	longitude: number;
	rate_from: number;
	schedule: string;
	is_available: boolean;
	class_level: number;
	app_deeplink: string;
	zones: IZone[];
}
