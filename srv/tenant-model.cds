using mt.tacoshop as mt from '../db/tenant-model';
using mt.tacoshop.crosstenant from '../db/crosstenant-model';
service CatalogService @(path : '/Tenant/Catalog') {
    entity Tacos as projection on mt.Taco;

    @readonly
    entity Currencys              as projection on crosstenant.Currency;
}


annotate CatalogService.Tacos with @(
    UI: {
        HeaderInfo: {
            TypeName: 'Taco',
            TypeNamePlural: 'Tacos',
            Title: { Value: type },
            Description: { Value: type }
        },
        SelectionFields: [ type, value, Currency_code ],
        LineItem: [
            { Value: type },
            { Value: value },
            { Value: Currency_code }            
        ],
        Facets: [
            {
                $Type: 'UI.CollectionFacet',
                Label: 'Taco Info',
                Facets: [
                    {$Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Main', Label: 'Main Facet'}
                ]
            }
        ],        
        FieldGroup#Main: {
            Data: [
                { Value: type },
                { Value: value },
                { Value: Currency_code }
            ]
        }
    }
);