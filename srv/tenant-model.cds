using mt.tacoshop as mt from '../db/tenant-model';

service CatalogService @(path : '/Tenant/Catalog') {
    entity Tacos as projection on mt.Taco;
}