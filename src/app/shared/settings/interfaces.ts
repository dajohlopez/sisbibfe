export interface IAuthor {
    id?: number;
    name: string;
    country_id: ICountry;
}

export interface IEditorial {
    id?: number;
    name: string;
    idpais: ICountry;
}

export interface ICountry {
    id?: number;
    name: string;
}

export interface IMateria {
    idmateria?: number;
    nombre: string;
}

export interface IAnexo {
    idanexo?: number;
    nombre: string;
    ape_pat: string;
    ape_mat: string;
}

export interface IUsuario {
    idusuario?: number;
    nombre: string;
    password: string;
}

export interface IUser {
    id?: number;
    email: string;
    password: string;
}
