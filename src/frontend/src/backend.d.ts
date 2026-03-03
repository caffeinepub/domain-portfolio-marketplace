import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    domainId: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Domain {
    id: bigint;
    afternicLink: string;
    name: string;
    registrar: string;
    spaceshipLink: string;
    price: number;
    atomLink: string;
}
export interface Offer {
    domainId: bigint;
    email: string;
    timestamp: bigint;
    amount: number;
}
export interface backendInterface {
    contactSeller(domainId: bigint, name: string, email: string, message: string): Promise<boolean>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getDomainById(id: bigint): Promise<Domain | null>;
    getDomains(): Promise<Array<Domain>>;
    getOffers(): Promise<Array<Offer>>;
    initStore(): Promise<void>;
    submitOffer(domainId: bigint, amount: number, email: string): Promise<boolean>;
}
