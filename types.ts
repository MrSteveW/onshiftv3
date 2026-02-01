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

export interface User {
    id: number;
    name: string;
    grade: string;
}

export interface Task {
    id: number;
    name: string;
}
