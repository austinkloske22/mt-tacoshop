using mt.tacoshop as mt from '../db/tenant-model';

service CatalogService {
    entity Tacos as projection on mt.Taco;
}