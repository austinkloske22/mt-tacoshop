namespace mt.tacoshop;
using {cuid} from '@sap/cds/common';

type tCurrency : String(3);

aspect aValue {
	value       : Decimal(10,3);
	currency    : tCurrency;
};

entity Taco: cuid, aValue {
    type    :  String(50);
};