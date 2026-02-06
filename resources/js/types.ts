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

export interface User {
    name: string;
    email: string;
    role: string | null;
    employee?: EmployeeData | null;
}

export interface Task {
    id: number;
    name: string;
}
