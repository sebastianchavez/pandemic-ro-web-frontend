export interface IAccount {
    genre: string;
    idAccount: number
    ragnarokId: number
    user: string;
}

export interface IRequestAccount {
    userid: string;
    user_pass: string;
    sex: string;
    last_ip: string;
}