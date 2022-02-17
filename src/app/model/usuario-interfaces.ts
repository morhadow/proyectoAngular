import { I2Send } from "./model-interfaces";
import { IUserType } from "./tipousuario-interfaces";

export interface IUsuario {
    id: number,
    nombre: string,
    apellido1: string,
    apellido2: string,
    login: string,
    email: string,
    validado: boolean,
    activo: boolean,
    tipousuario: IUserType,
    empresas: number,
    paquetes: number
}

export interface IPageUsuario {
    content: IUsuario[];
    totalElements: number,
    totalPages: number
}

export interface IUsuario2Send {
    id: number,
    nombre: string,
    apellido1: string,
    apellido2: string,
    login: string,
    email: string,
    validado: boolean,
    activo: boolean,
    tipousuario: I2Send
}