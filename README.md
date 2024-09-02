# Bitxor Address Book

Bitxor address book module

1. [Installation](#installation)
2. [Usage](#usage)

## Installation <a name="installation"></a>

To install the npm module on your typescript or node project run:

`npm install bitxor-address-book --save`

## Usage <a name="usage"></a>

```javascript
import { AddressBook } from 'bitxor-address-book';

const addressBook = new AddressBook();

addressBook.addContact({
    address: 'TAVVVJBBCTYJDWC7TQPSVNHK2IPNY6URKK4DTHY',
    name: 'Bob',
    phone: '+34 000000000',
    email: 'bob@bitxorcorp.software',
    label: 'Executive team',
    notes: 'A very good friend',
});

const json = addressBook.toJSON(true);
fs.writeFileSync('./my-path/', json);
```
