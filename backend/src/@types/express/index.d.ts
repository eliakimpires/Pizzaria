//Tipagem do express para habilitar user_id
declare namespace Express{
    export interface Request{
        user_id: string
    }
}