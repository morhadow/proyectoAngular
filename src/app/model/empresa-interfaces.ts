import { NumberSymbol } from "@angular/common";

export interface IEmpresa {
    id: number,
    nombre: string,
    telefono: number,
    direccion: string,
    email: string,
    paquetes: number
}

export interface IEmpresa2Send {
    id: number,
    nombre: string,
    telefono: number,
    direccion: string,
    email: string,
}

export interface IPageEmpresa {
    content: IEmpresa[];
    totalElements: number,
    totalPages: number
}