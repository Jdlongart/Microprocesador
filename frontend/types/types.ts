export interface Instruccion {
  id?: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  sintaxis: string;
  usuario_id?: number;
}

export interface Registros {
  [key: string]: number;
}

export interface Flags {
  zero: boolean;
  carry: boolean;
  sign: boolean;
  overflow: boolean;
}