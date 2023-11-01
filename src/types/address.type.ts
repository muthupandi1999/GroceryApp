export enum Label {
    Home = "Home",
    Work = "Work",
    Other = "Other",
}

export type Address = {
    id: string;
    address: string;
    apartment: string;
    label: Label;
    pincode: number
};