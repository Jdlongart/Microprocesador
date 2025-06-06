export interface Instruccion {
  id?: number;
  sentencia: string;
  id_dir: number;
  id_registro?: number;
  id_usuario?: number;
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