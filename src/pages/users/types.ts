export interface GetUserParams {
	email?: string | null;
	is_staff?: string | null;
	date_joined?: string | null;
	created?: string | null;
	updated?: string | null;
	is_active?: string | null;
	ordering?: string | null;
	search?: string | null;
	page?: number | null;
}
