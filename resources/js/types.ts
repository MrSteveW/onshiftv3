export interface UserType {
    id: number;
    name: string;
    email: string;
    role: string | null;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    employee?: EmployeeType | null;
}

export interface EmployeeType {
    grade_id: number | null;
    grade_name: string | null;
    training: string | null;
}

export type GradePropsType = {
    id: number;
    name: string;
};

export type Duty = {
    id: number;
    user_id: number;
    task_id: number | null;
    dutydate: Date;
    shift_type?: string;
    hours?: number;
};

export type CreateDutyProps = {
    users?: UserType[];
    tasks?: Task[];
    date: Date;
};

export interface Task {
    id: number;
    name: string;
}

export interface Grade {
    id: number;
    name: string;
}
