namespace mt.tacoshop;

using {mt.tacoshop.crosstenant} from './crosstenant-model';
using {cuid} from '@sap/cds/common';
entity Taco: cuid {
    type        : String(50);
    value       : Decimal(10,3);
	Currency    : Association to crosstenant.Currency;
};
