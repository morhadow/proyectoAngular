import { IEmpresa } from "./empresa-interfaces";
import { I2Send, IFecha } from "./model-interfaces";
import { IUsuario } from "./usuario-interfaces";

export interface IPagePaquete {
    content: IPaquete[];
    totalElements: number,
    totalPages: number
}

export interface IPaquete {
    id: number,
    nombre: string,
    codigo: string,
    precio: number,
    fecha: IFecha,
    pagado: boolean,
    empresa: IEmpresa,
    usuario: IUsuario

}

export interface IPaqueteToSend {
    id: number,
    nombre: string,
    codigo: string,
    precio: number,
    fecha: IFecha,
    pagado: boolean,
    empresa: I2Send,
    usuario: I2Send

}