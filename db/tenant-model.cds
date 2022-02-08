namespace mt.tacoshop;

using {mt.tacoshop.crosstenant} from './crosstenant-model';
using {cuid} from '@sap/cds/common';
entity Taco: cuid {
    type        : String(50)        @title : 'Type';
    value       : Decimal(10,3)     @title : 'Price';
	Currency    : Association to crosstenant.Currency @title : 'Currency';
};
