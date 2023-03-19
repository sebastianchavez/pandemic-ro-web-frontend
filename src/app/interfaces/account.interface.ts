export interface IAccount {
    genre: string;
    ragnarokId: number
    user: string;
    state: string;
    pjs: IPlayer[]
}


export interface IPlayer {
    userid: string;
    email: string;
    account_id: number;
    sex: string;
    state: number;
    name: string | null;
    class: number | null;
    base_level: number | null;
    job_level: number | null;
    last_map: string | null;
    last_x: number | null;
    last_y: number | null;
    str: number | null;
    agi: number | null;
    vit: number | null;
    int: number | null;
    dex: number | null;
    luk: number | null;
}

export interface IRequestAccount {
    userid: string;
    user_pass: string;
    sex: string;
    last_ip: string;
}