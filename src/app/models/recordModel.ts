export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Recording {
    id?: number;
    company_name?: string;
    created_at?: string;
    path?: string;
    duration?: string;
    end_time?: string;
    start_time?: string;
    type?: string;
}