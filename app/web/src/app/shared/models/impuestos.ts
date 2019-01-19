import { TipoImpuesto } from "./tipoImpuesto";

export class Impuestos{
    id:number;
    tipoImpuesto_id:number;
    nombre:string;
    descripcion:string;
    tipo_impuesto: TipoImpuesto;
}
