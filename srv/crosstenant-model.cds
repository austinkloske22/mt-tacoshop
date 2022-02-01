using mt.tacoshop.crosstenant as ct from '../db/crosstenant-model';

service CrosstenantService @(path : '/Crosstenant/Catalog') {
    entity Currencys as projection on ct.Currency;
}