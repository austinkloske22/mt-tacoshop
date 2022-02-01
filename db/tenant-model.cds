namespace mt.tacoshop;

using {mt.tacoshop.crosstenant} from './crosstenant-model';
using {cuid} from '@sap/cds/common';
entity Taco: cuid, crosstenant.aValue {
    type    :  String(50);
};
