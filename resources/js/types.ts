export interface User {
    id: number;
    name: string;
    email: string;
    role: string | null;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    employee?: EmployeeData | null;
    // [key: string]: unknown;
}

export type Duty = {
    id: number;
    user_id: number;
    task_id: number | null;
    dutydate: Date;
    shift_type?: string;
    hours?: number;
};

export type CreateDutyProps = {
    users?: User[];
    tasks?: Task[];
    date: Date;
};

export interface EmployeeData {
    grade: string | null;
    training: string | null;
}

export interface Task {
    id: number;
    name: string;
}
