using mt.tacoshop as mt from '../db/tenant-model';
using mt.tacoshop.crosstenant from '../db/crosstenant-model';
service CatalogService @(path : '/Tenant/Catalog') {
    entity Tacos as projection on mt.Taco;

    @readonly
    entity Currencys              as projection on crosstenant.Currency;
}