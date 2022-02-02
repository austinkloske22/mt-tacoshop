
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
}