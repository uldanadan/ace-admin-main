export interface GetProductsParams {
	category?: string | null;
	article?: string | null;
	availability_in_game_centers?: string | null;
	ordering?: string | null;
	search?: string | null;
	page?: number | null;
}

export interface GetOrdersParams {
	status?: string | null;
	computer?: string | null;
	page?: number | null;
	created?: string | null;
}
