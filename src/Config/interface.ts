export interface IPropsFormTask {
    open: boolean;
    close: () => void;
    option: boolean;
    task?: ITask;
}


export interface ITask {
    title: string;
    description: string;
    color: string;
}