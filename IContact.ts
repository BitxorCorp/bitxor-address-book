export interface IContact {
    /** Unique field / identifier */
    id: string,
    /** Address: Required */
    address: string,
    /** Name: Required */
    name: string,
    /** Phone */
    phone?: string,
    /** Email */
    email?: string,
    /** Label */
    label?: string,
    /** Personal contact notes */
    notes?: string,
}
