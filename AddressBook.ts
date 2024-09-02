import {IContact} from "./IContact";

export class AddressBook {
    /** Contacts index */
    contacts: {[id: string]: IContact}
    /** Address book version */
    static version = 1;

    constructor(contacts: IContact[] = []) {
        this.contacts = contacts.reduce( (acc, contact) => {
            acc[contact.id] = contact;
            return acc;
        }, {});
    }

    /**
     * Get all contacts by a given address
     */
    getAllContacts() {
        return Object.values(this.contacts);
    }

    /**
     * Get all contacts by it's id
     * @param id
     */
    getContactById(id: string): IContact  | undefined {
        return this.contacts[id];
    }

    /**
     * Get all contacts by a given address
     * @param address
     */
    getContactByAddress(address: string): IContact  | undefined {
        return Object.values(this.contacts).find( c => c.address === address || uglifyAddress(c.address) === uglifyAddress(address));
    }

    /**
     * Add new contact
     * @param contact
     */
    addContact(contact: IContact): IContact {
        contact.id = uuidv4();
        this.contacts[contact.id] = contact;
        return contact;
    }

    /**
     * Remove contact by its id
     * @param id
     */
    removeContact(id: string): IContact[] {
        delete this.contacts[id];
        return Object.values(this.contacts);
    }

    /**
     * Update a contact by id
     * @param id
     * @param newContact
     */
    updateContact(id: string, newContact: IContact): IContact {
        this.contacts[id] = newContact;
        return newContact;
    }

    /**
     * Export AddressBook to JSON format
     * @param pretty
     */
    toJSON(pretty: boolean = true): string {
        return JSON.stringify({
            version: AddressBook.version,
            contacts: Object.values(this.contacts)
        }, null, pretty ? '\t' : '');
    }

    /**
     * Import AddressBook from JSON format
     * @param input
     */
    static fromJSON(input: string | Object): AddressBook {
        let obj: any;
        if (typeof input === 'string') {
            try {
                obj = JSON.parse(input);
            } catch (e) {
                throw new Error("Error creating AddressBook: invalid JSON string");
            }
        } else {
            obj = input;
        }
        if (!obj.hasOwnProperty('version') || obj.version !== AddressBook.version) {
            throw new Error("Error creating AddressBook: versions don't match");
        }
        if (!obj.hasOwnProperty('contacts') || !Array.isArray(obj.contacts)) {
            throw new Error("Error creating AddressBook: property contacts not found");
        }
        const addressBook = new AddressBook();
        for (let contact of obj.contacts) {
            if (!contact.hasOwnProperty('id') || !contact.hasOwnProperty('name') || !contact.hasOwnProperty('address')) {
                throw new Error("Error creating AddressBook: contact has an invalid format");
            }
            addressBook.addContact(contact);
        }
        return addressBook;
    }
}

/**
 * Util function to uglify an address
 * @param address
 */
const uglifyAddress = (address: string) => {
    return address.replace(/-/g, '');
}

const uuidv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
