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
    idCamera?: number;
    company_name?: string;
    company_name_camera?: string;
    created_at?: string;
    created_at_camera?: string;

    path?: string;
    path_camera?: string;

    duration?: string;
    duration_camera?: string;

    end_time?: string;
    end_time_camera?: string;

    start_time?: string;
    start_time_camera?: string;

    type?: string;
    type_camera?: string;

}