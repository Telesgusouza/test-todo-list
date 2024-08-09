export interface IPropsFormTask {
    open: boolean;
    close: () => void;
    option: boolean;
    task?: ITask;
}

export interface IPropsInfoTask {
    open: boolean;
    close: () => void;
    task: ITask | null;
    openEdit: (task: ITask) => void;
}

export interface ITask {
    id?: number;
    title: string;
    description: string;
    color: string;
    check: boolean;
}

export interface ISnackBar {
    open: boolean;
    message: string;
}

export interface IMoreInfoTask {
    task: ITask | null;
    openModal: boolean;
    index: number;
}