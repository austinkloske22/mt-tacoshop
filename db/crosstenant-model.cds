
namespace mt.tacoshop.crosstenant;

type tCurrency : String(3);

aspect aValue {
	value       : Decimal(10,3);
	currency    : tCurrency;
};

entity Currency {
    key code	: String(70);
	iso3		: String(3);
	iso3Number	: Integer;
    localized   : Association to many CurrencyTexts on localized.code = code;
}

entity CurrencyTexts @cds.autoexpose {
    key locale  : String(5);
    key code    : String(70); 
    title       : String;
};