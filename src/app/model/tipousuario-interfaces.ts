export interface IUserType {
	id: number;
	nombre: string;
}

export interface IUserTypePlist {
	id: number;
	nombre: string;
	usuarios: number;
}

export interface ITipoUsuarioPage {
	content: IUserTypePlist[];
	totalElements: number;
	totalPages: number;
}