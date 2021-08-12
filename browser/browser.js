(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { currency } = require('./currency')
const { unit } = require('./unit')
const { language } = require('./language')

module.exports = { unit, currency, language }
},{"./currency":2,"./language":3,"./unit":4}],2:[function(require,module,exports){
const currency = [{
    'title': 'General'
}, {
    "symbol": 'item',
    "name": 'item'
}, {
    "symbol": 'free',
    "name": 'Free'
}, {
    "symbol": 'points',
    "name": 'Points'
}, {
    'title': 'Percentage'
}, {
    'symbol': '%',
    "name": "Percentage",
    "code": "Percent",
}, {
    'symbol': '‰',
    "name": "Per Thousand",
    "code": "Per-mille",
}, {
    'symbol': '‱',
    "name": "Per Ten Thousand",
    "code": "Per-tenk",
}, {
    'title': 'Currency'
}, {
    "symbol": "$",
    "name": "US Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "USD",
    "name_plural": "US dollars"
}, {
    "symbol": "L.L",
    "name": "Lebanese Pound",
    "symbol_native": "ل.ل.‏",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "LBP",
    "name_plural": "Lebanese pounds"
}, {
    "symbol": "€",
    "name": "Euro",
    "symbol_native": "€",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "EUR",
    "name_plural": "euros"
}, {
    "symbol": "IQD",
    "name": "Iraqi Dinar",
    "symbol_native": "د.ع.‏",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "IQD",
    "name_plural": "Iraqi dinars"
}, {
    "symbol": "IRR",
    "name": "Iranian Rial",
    "symbol_native": "﷼",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "IRR",
    "name_plural": "Iranian rials"
}, {
    "symbol": "EGP",
    "name": "Egyptian Pound",
    "symbol_native": "ج.م.‏",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "EGP",
    "name_plural": "Egyptian pounds"
}, {
    "symbol": "AED",
    "name": "United Arab Emirates Dirham",
    "symbol_native": "د.إ.‏",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "AED",
    "name_plural": "UAE dirhams"
}, {
    "symbol": "CA$",
    "name": "Canadian Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CAD",
    "name_plural": "Canadian dollars"
}, {
    "symbol": "Af",
    "name": "Afghan Afghani",
    "symbol_native": "؋",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "AFN",
    "name_plural": "Afghan Afghanis"
}, {
    "symbol": "ALL",
    "name": "Albanian Lek",
    "symbol_native": "Lek",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "ALL",
    "name_plural": "Albanian lekë"
}, {
    "symbol": "AMD",
    "name": "Armenian Dram",
    "symbol_native": "դր.",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "AMD",
    "name_plural": "Armenian drams"
}, {
    "symbol": "AR$",
    "name": "Argentine Peso",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "ARS",
    "name_plural": "Argentine pesos"
}, {
    "symbol": "AU$",
    "name": "Australian Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "AUD",
    "name_plural": "Australian dollars"
}, {
    "symbol": "man.",
    "name": "Azerbaijani Manat",
    "symbol_native": "ман.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "AZN",
    "name_plural": "Azerbaijani manats"
}, {
    "symbol": "KM",
    "name": "Bosnia-Herzegovina Convertible Mark",
    "symbol_native": "KM",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BAM",
    "name_plural": "Bosnia-Herzegovina convertible marks"
}, {
    "symbol": "Tk",
    "name": "Bangladeshi Taka",
    "symbol_native": "৳",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BDT",
    "name_plural": "Bangladeshi takas"
}, {
    "symbol": "BGN",
    "name": "Bulgarian Lev",
    "symbol_native": "лв.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BGN",
    "name_plural": "Bulgarian leva"
}, {
    "symbol": "BD",
    "name": "Bahraini Dinar",
    "symbol_native": "د.ب.‏",
    "decimal_digits": 3,
    "rounding": 0,
    "code": "BHD",
    "name_plural": "Bahraini dinars"
}, {
    "symbol": "FBu",
    "name": "Burundian Franc",
    "symbol_native": "FBu",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "BIF",
    "name_plural": "Burundian francs"
}, {
    "symbol": "BN$",
    "name": "Brunei Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BND",
    "name_plural": "Brunei dollars"
}, {
    "symbol": "Bs",
    "name": "Bolivian Boliviano",
    "symbol_native": "Bs",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BOB",
    "name_plural": "Bolivian bolivianos"
}, {
    "symbol": "R$",
    "name": "Brazilian Real",
    "symbol_native": "R$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BRL",
    "name_plural": "Brazilian reals"
}, {
    "symbol": "BWP",
    "name": "Botswanan Pula",
    "symbol_native": "P",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BWP",
    "name_plural": "Botswanan pulas"
}, {
    "symbol": "Br",
    "name": "Belarusian Ruble",
    "symbol_native": "руб.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BYN",
    "name_plural": "Belarusian rubles"
}, {
    "symbol": "BZ$",
    "name": "Belize Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "BZD",
    "name_plural": "Belize dollars"
}, {
    "symbol": "CDF",
    "name": "Congolese Franc",
    "symbol_native": "FrCD",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CDF",
    "name_plural": "Congolese francs"
}, {
    "symbol": "CHF",
    "name": "Swiss Franc",
    "symbol_native": "CHF",
    "decimal_digits": 2,
    "rounding": 0.05,
    "code": "CHF",
    "name_plural": "Swiss francs"
}, {
    "symbol": "CL$",
    "name": "Chilean Peso",
    "symbol_native": "$",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "CLP",
    "name_plural": "Chilean pesos"
}, {
    "symbol": "CN¥",
    "name": "Chinese Yuan",
    "symbol_native": "CN¥",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CNY",
    "name_plural": "Chinese yuan"
}, {
    "symbol": "CO$",
    "name": "Colombian Peso",
    "symbol_native": "$",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "COP",
    "name_plural": "Colombian pesos"
}, {
    "symbol": "₡",
    "name": "Costa Rican Colón",
    "symbol_native": "₡",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "CRC",
    "name_plural": "Costa Rican colóns"
}, {
    "symbol": "CV$",
    "name": "Cape Verdean Escudo",
    "symbol_native": "CV$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CVE",
    "name_plural": "Cape Verdean escudos"
}, {
    "symbol": "Kč",
    "name": "Czech Republic Koruna",
    "symbol_native": "Kč",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "CZK",
    "name_plural": "Czech Republic korunas"
}, {
    "symbol": "Fdj",
    "name": "Djiboutian Franc",
    "symbol_native": "Fdj",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "DJF",
    "name_plural": "Djiboutian francs"
}, {
    "symbol": "Dkr",
    "name": "Danish Krone",
    "symbol_native": "kr",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "DKK",
    "name_plural": "Danish kroner"
}, {
    "symbol": "RD$",
    "name": "Dominican Peso",
    "symbol_native": "RD$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "DOP",
    "name_plural": "Dominican pesos"
}, {
    "symbol": "DA",
    "name": "Algerian Dinar",
    "symbol_native": "د.ج.‏",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "DZD",
    "name_plural": "Algerian dinars"
}, {
    "symbol": "Ekr",
    "name": "Estonian Kroon",
    "symbol_native": "kr",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "EEK",
    "name_plural": "Estonian kroons"
}, {
    "symbol": "Nfk",
    "name": "Eritrean Nakfa",
    "symbol_native": "Nfk",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "ERN",
    "name_plural": "Eritrean nakfas"
}, {
    "symbol": "Br",
    "name": "Ethiopian Birr",
    "symbol_native": "Br",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "ETB",
    "name_plural": "Ethiopian birrs"
}, {
    "symbol": "£",
    "name": "British Pound Sterling",
    "symbol_native": "£",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "GBP",
    "name_plural": "British pounds sterling"
}, {
    "symbol": "GEL",
    "name": "Georgian Lari",
    "symbol_native": "GEL",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "GEL",
    "name_plural": "Georgian laris"
}, {
    "symbol": "GH₵",
    "name": "Ghanaian Cedi",
    "symbol_native": "GH₵",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "GHS",
    "name_plural": "Ghanaian cedis"
}, {
    "symbol": "FG",
    "name": "Guinean Franc",
    "symbol_native": "FG",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "GNF",
    "name_plural": "Guinean francs"
}, {
    "symbol": "GTQ",
    "name": "Guatemalan Quetzal",
    "symbol_native": "Q",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "GTQ",
    "name_plural": "Guatemalan quetzals"
}, {
    "symbol": "HK$",
    "name": "Hong Kong Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "HKD",
    "name_plural": "Hong Kong dollars"
}, {
    "symbol": "HNL",
    "name": "Honduran Lempira",
    "symbol_native": "L",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "HNL",
    "name_plural": "Honduran lempiras"
}, {
    "symbol": "kn",
    "name": "Croatian Kuna",
    "symbol_native": "kn",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "HRK",
    "name_plural": "Croatian kunas"
}, {
    "symbol": "Ft",
    "name": "Hungarian Forint",
    "symbol_native": "Ft",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "HUF",
    "name_plural": "Hungarian forints"
}, {
    "symbol": "Rp",
    "name": "Indonesian Rupiah",
    "symbol_native": "Rp",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "IDR",
    "name_plural": "Indonesian rupiahs"
}, {
    "symbol": "₪",
    "name": "Israeli New Sheqel",
    "symbol_native": "₪",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "ILS",
    "name_plural": "Israeli new sheqels"
}, {
    "symbol": "Rs",
    "name": "Indian Rupee",
    "symbol_native": "টকা",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "INR",
    "name_plural": "Indian rupees"
}, {
    "symbol": "Ikr",
    "name": "Icelandic Króna",
    "symbol_native": "kr",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "ISK",
    "name_plural": "Icelandic krónur"
}, {
    "symbol": "J$",
    "name": "Jamaican Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "JMD",
    "name_plural": "Jamaican dollars"
}, {
    "symbol": "JD",
    "name": "Jordanian Dinar",
    "symbol_native": "د.أ.‏",
    "decimal_digits": 3,
    "rounding": 0,
    "code": "JOD",
    "name_plural": "Jordanian dinars"
}, {
    "symbol": "¥",
    "name": "Japanese Yen",
    "symbol_native": "￥",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "JPY",
    "name_plural": "Japanese yen"
}, {
    "symbol": "Ksh",
    "name": "Kenyan Shilling",
    "symbol_native": "Ksh",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "KES",
    "name_plural": "Kenyan shillings"
}, {
    "symbol": "KHR",
    "name": "Cambodian Riel",
    "symbol_native": "៛",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "KHR",
    "name_plural": "Cambodian riels"
}, {
    "symbol": "CF",
    "name": "Comorian Franc",
    "symbol_native": "FC",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "KMF",
    "name_plural": "Comorian francs"
}, {
    "symbol": "₩",
    "name": "South Korean Won",
    "symbol_native": "₩",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "KRW",
    "name_plural": "South Korean won"
}, {
    "symbol": "KD",
    "name": "Kuwaiti Dinar",
    "symbol_native": "د.ك.‏",
    "decimal_digits": 3,
    "rounding": 0,
    "code": "KWD",
    "name_plural": "Kuwaiti dinars"
}, {
    "symbol": "KZT",
    "name": "Kazakhstani Tenge",
    "symbol_native": "тңг.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "KZT",
    "name_plural": "Kazakhstani tenges"
}, {
    "symbol": "SLRs",
    "name": "Sri Lankan Rupee",
    "symbol_native": "SL Re",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "LKR",
    "name_plural": "Sri Lankan rupees"
}, {
    "symbol": "Lt",
    "name": "Lithuanian Litas",
    "symbol_native": "Lt",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "LTL",
    "name_plural": "Lithuanian litai"
}, {
    "symbol": "Ls",
    "name": "Latvian Lats",
    "symbol_native": "Ls",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "LVL",
    "name_plural": "Latvian lati"
}, {
    "symbol": "LD",
    "name": "Libyan Dinar",
    "symbol_native": "د.ل.‏",
    "decimal_digits": 3,
    "rounding": 0,
    "code": "LYD",
    "name_plural": "Libyan dinars"
}, {
    "symbol": "MAD",
    "name": "Moroccan Dirham",
    "symbol_native": "د.م.‏",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "MAD",
    "name_plural": "Moroccan dirhams"
}, {
    "symbol": "MDL",
    "name": "Moldovan Leu",
    "symbol_native": "MDL",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "MDL",
    "name_plural": "Moldovan lei"
}, {
    "symbol": "MGA",
    "name": "Malagasy Ariary",
    "symbol_native": "MGA",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "MGA",
    "name_plural": "Malagasy Ariaries"
}, {
    "symbol": "MKD",
    "name": "Macedonian Denar",
    "symbol_native": "MKD",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "MKD",
    "name_plural": "Macedonian denari"
}, {
    "symbol": "MMK",
    "name": "Myanma Kyat",
    "symbol_native": "K",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "MMK",
    "name_plural": "Myanma kyats"
}, {
    "symbol": "MOP$",
    "name": "Macanese Pataca",
    "symbol_native": "MOP$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "MOP",
    "name_plural": "Macanese patacas"
}, {
    "symbol": "MURs",
    "name": "Mauritian Rupee",
    "symbol_native": "MURs",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "MUR",
    "name_plural": "Mauritian rupees"
}, {
    "symbol": "MX$",
    "name": "Mexican Peso",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "MXN",
    "name_plural": "Mexican pesos"
}, {
    "symbol": "RM",
    "name": "Malaysian Ringgit",
    "symbol_native": "RM",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "MYR",
    "name_plural": "Malaysian ringgits"
}, {
    "symbol": "MTn",
    "name": "Mozambican Metical",
    "symbol_native": "MTn",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "MZN",
    "name_plural": "Mozambican meticals"
}, {
    "symbol": "N$",
    "name": "Namibian Dollar",
    "symbol_native": "N$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "NAD",
    "name_plural": "Namibian dollars"
}, {
    "symbol": "₦",
    "name": "Nigerian Naira",
    "symbol_native": "₦",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "NGN",
    "name_plural": "Nigerian nairas"
}, {
    "symbol": "C$",
    "name": "Nicaraguan Córdoba",
    "symbol_native": "C$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "NIO",
    "name_plural": "Nicaraguan córdobas"
}, {
    "symbol": "Nkr",
    "name": "Norwegian Krone",
    "symbol_native": "kr",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "NOK",
    "name_plural": "Norwegian kroner"
}, {
    "symbol": "NPRs",
    "name": "Nepalese Rupee",
    "symbol_native": "नेरू",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "NPR",
    "name_plural": "Nepalese rupees"
}, {
    "symbol": "NZ$",
    "name": "New Zealand Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "NZD",
    "name_plural": "New Zealand dollars"
}, {
    "symbol": "OMR",
    "name": "Omani Rial",
    "symbol_native": "ر.ع.‏",
    "decimal_digits": 3,
    "rounding": 0,
    "code": "OMR",
    "name_plural": "Omani rials"
}, {
    "symbol": "B/.",
    "name": "Panamanian Balboa",
    "symbol_native": "B/.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "PAB",
    "name_plural": "Panamanian balboas"
}, {
    "symbol": "S/.",
    "name": "Peruvian Nuevo Sol",
    "symbol_native": "S/.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "PEN",
    "name_plural": "Peruvian nuevos soles"
}, {
    "symbol": "₱",
    "name": "Philippine Peso",
    "symbol_native": "₱",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "PHP",
    "name_plural": "Philippine pesos"
}, {
    "symbol": "PKRs",
    "name": "Pakistani Rupee",
    "symbol_native": "₨",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "PKR",
    "name_plural": "Pakistani rupees"
}, {
    "symbol": "zł",
    "name": "Polish Zloty",
    "symbol_native": "zł",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "PLN",
    "name_plural": "Polish zlotys"
}, {
    "symbol": "₲",
    "name": "Paraguayan Guarani",
    "symbol_native": "₲",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "PYG",
    "name_plural": "Paraguayan guaranis"
}, {
    "symbol": "QR",
    "name": "Qatari Rial",
    "symbol_native": "ر.ق.‏",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "QAR",
    "name_plural": "Qatari rials"
}, {
    "symbol": "RON",
    "name": "Romanian Leu",
    "symbol_native": "RON",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "RON",
    "name_plural": "Romanian lei"
}, {
    "symbol": "din.",
    "name": "Serbian Dinar",
    "symbol_native": "дин.",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "RSD",
    "name_plural": "Serbian dinars"
}, {
    "symbol": "RUB",
    "name": "Russian Ruble",
    "symbol_native": "₽.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "RUB",
    "name_plural": "Russian rubles"
}, {
    "symbol": "RWF",
    "name": "Rwandan Franc",
    "symbol_native": "FR",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "RWF",
    "name_plural": "Rwandan francs"
}, {
    "symbol": "SR",
    "name": "Saudi Riyal",
    "symbol_native": "ر.س.‏",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "SAR",
    "name_plural": "Saudi riyals"
}, {
    "symbol": "SDG",
    "name": "Sudanese Pound",
    "symbol_native": "SDG",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "SDG",
    "name_plural": "Sudanese pounds"
}, {
    "symbol": "Skr",
    "name": "Swedish Krona",
    "symbol_native": "kr",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "SEK",
    "name_plural": "Swedish kronor"
}, {
    "symbol": "S$",
    "name": "Singapore Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "SGD",
    "name_plural": "Singapore dollars"
}, {
    "symbol": "Ssh",
    "name": "Somali Shilling",
    "symbol_native": "Ssh",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "SOS",
    "name_plural": "Somali shillings"
}, {
    "symbol": "SY£",
    "name": "Syrian Pound",
    "symbol_native": "ل.س.‏",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "SYP",
    "name_plural": "Syrian pounds"
}, {
    "symbol": "฿",
    "name": "Thai Baht",
    "symbol_native": "฿",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "THB",
    "name_plural": "Thai baht"
}, {
    "symbol": "DT",
    "name": "Tunisian Dinar",
    "symbol_native": "د.ت.‏",
    "decimal_digits": 3,
    "rounding": 0,
    "code": "TND",
    "name_plural": "Tunisian dinars"
}, {
    "symbol": "T$",
    "name": "Tongan Paʻanga",
    "symbol_native": "T$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "TOP",
    "name_plural": "Tongan paʻanga"
}, {
    "symbol": "TL",
    "name": "Turkish Lira",
    "symbol_native": "TL",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "TRY",
    "name_plural": "Turkish Lira"
}, {
    "symbol": "TT$",
    "name": "Trinidad and Tobago Dollar",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "TTD",
    "name_plural": "Trinidad and Tobago dollars"
}, {
    "symbol": "NT$",
    "name": "New Taiwan Dollar",
    "symbol_native": "NT$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "TWD",
    "name_plural": "New Taiwan dollars"
}, {
    "symbol": "TSh",
    "name": "Tanzanian Shilling",
    "symbol_native": "TSh",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "TZS",
    "name_plural": "Tanzanian shillings"
}, {
    "symbol": "₴",
    "name": "Ukrainian Hryvnia",
    "symbol_native": "₴",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "UAH",
    "name_plural": "Ukrainian hryvnias"
}, {
    "symbol": "USh",
    "name": "Ugandan Shilling",
    "symbol_native": "USh",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "UGX",
    "name_plural": "Ugandan shillings"
}, {
    "symbol": "$U",
    "name": "Uruguayan Peso",
    "symbol_native": "$",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "UYU",
    "name_plural": "Uruguayan pesos"
}, {
    "symbol": "UZS",
    "name": "Uzbekistan Som",
    "symbol_native": "UZS",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "UZS",
    "name_plural": "Uzbekistan som"
}, {
    "symbol": "Bs.F.",
    "name": "Venezuelan Bolívar",
    "symbol_native": "Bs.F.",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "VEF",
    "name_plural": "Venezuelan bolívars"
}, {
    "symbol": "₫",
    "name": "Vietnamese Dong",
    "symbol_native": "₫",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "VND",
    "name_plural": "Vietnamese dong"
}, {
    "symbol": "FCFA",
    "name": "CFA Franc BEAC",
    "symbol_native": "FCFA",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "XAF",
    "name_plural": "CFA francs BEAC"
}, {
    "symbol": "CFA",
    "name": "CFA Franc BCEAO",
    "symbol_native": "CFA",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "XOF",
    "name_plural": "CFA francs BCEAO"
}, {
    "symbol": "YR",
    "name": "Yemeni Rial",
    "symbol_native": "ر.ي.‏",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "YER",
    "name_plural": "Yemeni rials"
}, {
    "symbol": "R",
    "name": "South African Rand",
    "symbol_native": "R",
    "decimal_digits": 2,
    "rounding": 0,
    "code": "ZAR",
    "name_plural": "South African rand"
}, {
    "symbol": "ZK",
    "name": "Zambian Kwacha",
    "symbol_native": "ZK",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "ZMK",
    "name_plural": "Zambian kwachas"
}, {
    "symbol": "ZWL$",
    "name": "Zimbabwean Dollar",
    "symbol_native": "ZWL$",
    "decimal_digits": 0,
    "rounding": 0,
    "code": "ZWL",
    "name_plural": "Zimbabwean Dollar"
}]

module.exports = {currency}
},{}],3:[function(require,module,exports){
const language = [{
    'title': 'Language'
},
{ "code": "ar", "name": "Arabic", 'native-name': 'العربية' },
{ "code": "en", "name": "English", 'native-name': 'English' },
{ "code": "fr", "name": "French", 'native-name': 'Francais' },
{ "code": "fa", "name": "Persian", 'native-name': 'فارسی' },
{ "code": "aa", "name": "Afar" },
{ "code": "ab", "name": "Abkhazian" },
{ "code": "ae", "name": "Avestan" },
{ "code": "af", "name": "Afrikaans" },
{ "code": "ak", "name": "Akan" },
{ "code": "am", "name": "Amharic" },
{ "code": "an", "name": "Aragonese" },
{ "code": "as", "name": "Assamese" },
{ "code": "av", "name": "Avaric" },
{ "code": "ay", "name": "Aymara" },
{ "code": "az", "name": "Azerbaijani" },
{ "code": "ba", "name": "Bashkir" },
{ "code": "be", "name": "Belarusian" },
{ "code": "bg", "name": "Bulgarian" },
{ "code": "bh", "name": "Bihari languages" },
{ "code": "bi", "name": "Bislama" },
{ "code": "bm", "name": "Bambara" },
{ "code": "bn", "name": "Bengali" },
{ "code": "bo", "name": "Tibetan" },
{ "code": "br", "name": "Breton" },
{ "code": "bs", "name": "Bosnian" },
{ "code": "ca", "name": "Catalan; Valencian" },
{ "code": "ce", "name": "Chechen" },
{ "code": "ch", "name": "Chamorro" },
{ "code": "co", "name": "Corsican" },
{ "code": "cr", "name": "Cree" },
{ "code": "cs", "name": "Czech" },
{
    "code": "cu",
    "name": "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic"
},
{ "code": "cv", "name": "Chuvash" },
{ "code": "cy", "name": "Welsh" },
{ "code": "da", "name": "Danish" },
{ "code": "de", "name": "German" },
{ "code": "dv", "name": "Divehi; Dhivehi; Maldivian" },
{ "code": "dz", "name": "Dzongkha" },
{ "code": "ee", "name": "Ewe" },
{ "code": "el", "name": "Greek, Modern (1453-)" },
{ "code": "eo", "name": "Esperanto" },
{ "code": "es", "name": "Spanish; Castilian" },
{ "code": "et", "name": "Estonian" },
{ "code": "eu", "name": "Basque" },
{ "code": "ff", "name": "Fulah" },
{ "code": "fi", "name": "Finnish" },
{ "code": "fj", "name": "Fijian" },
{ "code": "fo", "name": "Faroese" },
{ "code": "fy", "name": "Western Frisian" },
{ "code": "ga", "name": "Irish" },
{ "code": "gd", "name": "Gaelic; Scomttish Gaelic" },
{ "code": "gl", "name": "Galician" },
{ "code": "gn", "name": "Guarani" },
{ "code": "gu", "name": "Gujarati" },
{ "code": "gv", "name": "Manx" },
{ "code": "ha", "name": "Hausa" },
{ "code": "he", "name": "Hebrew" },
{ "code": "hi", "name": "Hindi" },
{ "code": "ho", "name": "Hiri Motu" },
{ "code": "hr", "name": "Croatian" },
{ "code": "ht", "name": "Haitian; Haitian Creole" },
{ "code": "hu", "name": "Hungarian" },
{ "code": "hy", "name": "Armenian" },
{ "code": "hz", "name": "Herero" },
{
    "code": "ia",
    "name": "Interlingua (International Auxiliary Language Association)"
},
{ "code": "id", "name": "Indonesian" },
{ "code": "ie", "name": "Interlingue; Occidental" },
{ "code": "ig", "name": "Igbo" },
{ "code": "ii", "name": "Sichuan Yi; Nuosu" },
{ "code": "ik", "name": "Inupiaq" },
{ "code": "io", "name": "Ido" },
{ "code": "is", "name": "Icelandic" },
{ "code": "it", "name": "Italian" },
{ "code": "iu", "name": "Inuktitut" },
{ "code": "ja", "name": "Japanese" },
{ "code": "jv", "name": "Javanese" },
{ "code": "ka", "name": "Georgian" },
{ "code": "kg", "name": "Kongo" },
{ "code": "ki", "name": "Kikuyu; Gikuyu" },
{ "code": "kj", "name": "Kuanyama; Kwanyama" },
{ "code": "kk", "name": "Kazakh" },
{ "code": "kl", "name": "Kalaallisut; Greenlandic" },
{ "code": "km", "name": "Central Khmer" },
{ "code": "kn", "name": "Kannada" },
{ "code": "ko", "name": "Korean" },
{ "code": "kr", "name": "Kanuri" },
{ "code": "ks", "name": "Kashmiri" },
{ "code": "ku", "name": "Kurdish" },
{ "code": "kv", "name": "Komi" },
{ "code": "kw", "name": "Cornish" },
{ "code": "ky", "name": "Kirghiz; Kyrgyz" },
{ "code": "la", "name": "Latin" },
{ "code": "lb", "name": "Luxembourgish; Letzeburgesch" },
{ "code": "lg", "name": "Ganda" },
{ "code": "li", "name": "Limburgan; Limburger; Limburgish" },
{ "code": "ln", "name": "Lingala" },
{ "code": "lo", "name": "Lao" },
{ "code": "lt", "name": "Lithuanian" },
{ "code": "lu", "name": "Luba-Katanga" },
{ "code": "lv", "name": "Latvian" },
{ "code": "mg", "name": "Malagasy" },
{ "code": "mh", "name": "Marshallese" },
{ "code": "mi", "name": "Maori" },
{ "code": "mk", "name": "Macedonian" },
{ "code": "ml", "name": "Malayalam" },
{ "code": "mn", "name": "Mongolian" },
{ "code": "mr", "name": "Marathi" },
{ "code": "ms", "name": "Malay" },
{ "code": "mt", "name": "Maltese" },
{ "code": "my", "name": "Burmese" },
{ "code": "na", "name": "Nauru" },
{
    "code": "nb",
    "name": "Bokmål, Norwegian; Norwegian Bokmål"
},
{ "code": "nd", "name": "Ndebele, North; North Ndebele" },
{ "code": "ne", "name": "Nepali" },
{ "code": "ng", "name": "Ndonga" },
{ "code": "nl", "name": "Dutch; Flemish" },
{ "code": "nn", "name": "Norwegian Nynorsk; Nynorsk, Norwegian" },
{ "code": "no", "name": "Norwegian" },
{ "code": "nr", "name": "Ndebele, South; South Ndebele" },
{ "code": "nv", "name": "Navajo; Navaho" },
{ "code": "ny", "name": "Chichewa; Chewa; Nyanja" },
{ "code": "oc", "name": "Occitan (post 1500)" },
{ "code": "oj", "name": "Ojibwa" },
{ "code": "om", "name": "Oromo" },
{ "code": "or", "name": "Oriya" },
{ "code": "os", "name": "Ossetian; Ossetic" },
{ "code": "pa", "name": "Panjabi; Punjabi" },
{ "code": "pi", "name": "Pali" },
{ "code": "pl", "name": "Polish" },
{ "code": "ps", "name": "Pushto; Pashto" },
{ "code": "pt", "name": "Portuguese" },
{ "code": "qu", "name": "Quechua" },
{ "code": "rm", "name": "Romansh" },
{ "code": "rn", "name": "Rundi" },
{ "code": "ro", "name": "Romanian; Moldavian; Moldovan" },
{ "code": "ru", "name": "Russian" },
{ "code": "rw", "name": "Kinyarwanda" },
{ "code": "sa", "name": "Sanskrit" },
{ "code": "sc", "name": "Sardinian" },
{ "code": "sd", "name": "Sindhi" },
{ "code": "se", "name": "Northern Sami" },
{ "code": "sg", "name": "Sango" },
{ "code": "si", "name": "Sinhala; Sinhalese" },
{ "code": "sk", "name": "Slovak" },
{ "code": "sl", "name": "Slovenian" },
{ "code": "sm", "name": "Samoan" },
{ "code": "sn", "name": "Shona" },
{ "code": "so", "name": "Somali" },
{ "code": "sq", "name": "Albanian" },
{ "code": "sr", "name": "Serbian" },
{ "code": "ss", "name": "Swati" },
{ "code": "st", "name": "Sotho, Southern" },
{ "code": "su", "name": "Sundanese" },
{ "code": "sv", "name": "Swedish" },
{ "code": "sw", "name": "Swahili" },
{ "code": "ta", "name": "Tamil" },
{ "code": "te", "name": "Telugu" },
{ "code": "tg", "name": "Tajik" },
{ "code": "th", "name": "Thai" },
{ "code": "ti", "name": "Tigrinya" },
{ "code": "tk", "name": "Turkmen" },
{ "code": "tl", "name": "Tagalog" },
{ "code": "tn", "name": "Tswana" },
{ "code": "to", "name": "Tonga (Tonga Islands)" },
{ "code": "tr", "name": "Turkish" },
{ "code": "ts", "name": "Tsonga" },
{ "code": "tt", "name": "Tatar" },
{ "code": "tw", "name": "Twi" },
{ "code": "ty", "name": "Tahitian" },
{ "code": "ug", "name": "Uighur; Uyghur" },
{ "code": "uk", "name": "Ukrainian" },
{ "code": "ur", "name": "Urdu" },
{ "code": "uz", "name": "Uzbek" },
{ "code": "ve", "name": "Venda" },
{ "code": "vi", "name": "Vietnamese" },
{ "code": "vo", "name": "Volapük" },
{ "code": "wa", "name": "Walloon" },
{ "code": "wo", "name": "Wolof" },
{ "code": "xh", "name": "Xhosa" },
{ "code": "yi", "name": "Yiddish" },
{ "code": "yo", "name": "Yoruba" },
{ "code": "za", "name": "Zhuang; Chuang" },
{ "code": "zh", "name": "Chinese" },
{ "code": "zu", "name": "Zulu" }
]

module.exports = {language}
},{}],4:[function(require,module,exports){
const unit = [
    { title: 'Unit' },
    { name: 'unit', symbol: 'unit' },
    { name: 'item', symbol: 'item' },
    { name: 'piece', symbol: 'piece' },
    { name: 'bag', symbol: 'bag' },
    { name: 'cartoon', symbol: 'cartoon' },
    { name: 'pack', symbol: 'pack' },
    { name: 'box', symbol: 'box' },
    { name: 'pallet', symbol: 'pallet' },


    { title: 'Service' },
    { name: 'service', symbol: 'service' },
    { name: 'ticket', symbol: 'ticket' },
    { name: 'room', symbol: 'room' },
    { name: 'seat', symbol: 'seat' },
    { name: 'way', symbol: 'way' },
    { name: 'meal', symbol: 'meal' },


    { title: 'Length' },
    { name: 'millimeter', symbol: 'mm' },
    { name: 'centimeter', symbol: 'cm' },
    { name: 'decimeter', symbol: 'dm' },
    { name: 'meter', symbol: 'm' },
    { name: 'kilometer', symbol: 'km' },
    { name: 'foot', symbol: 'ft' },
    { name: 'inch', symbol: 'in' },
    { name: 'mile', symbol: 'mi' },
    { name: 'yard', symbol: 'yd' },

    { title: 'Volume' },
    { name: 'cubic foot', symbol: 'ft3' },
    { name: 'cubic inch', symbol: 'in3' },
    { name: 'cubic mile', symbol: 'mi3' },
    { name: 'cubic yard', symbol: 'yd3' },
    { name: 'cup', symbol: 'cup' },
    { name: 'Imperial gallon', symbol: 'gal' },
    { name: 'milliliter', symbol: 'mL' },
    { name: 'liter', symbol: 'L' },
    { name: 'Imperial fluid ounce', symbol: 'fl oz' },
    { name: 'Imperial pint', symbol: 'pt' },
    { name: 'Imperial quart', symbol: 'qt' },
    { name: 'tablespoon', symbol: 'tbsp' },
    { name: 'teaspoon', symbol: 'tspn' },

    { title: 'Weight' },
    { name: 'milligram', symbol: 'mg' },
    { name: 'gram', symbol: 'g' },
    { name: 'kilogram', symbol: 'kg' },
    { name: 'carat', symbol: 'CD' },
    { name: 'grain', symbol: 'gr' },
    { name: 'ounce', symbol: 'oz' },
    { name: 'pennyweight', symbol: 'dwt' },
    { name: 'pound', symbol: 'lb' },
    { name: 'stone', symbol: 'st' },
    { name: 'slug', symbol: 'slug' },
    { name: 'metric ton', symbol: 't' },

    { title: 'Area' },
    { name: 'hectare', symbol: 'ha' },
    { name: 'square foot', symbol: 'ft2' },
    { name: 'square meter', symbol: 'm2' },
    { name: 'square kilometer', symbol: 'km2' },
    { name: 'square inch', symbol: 'in2' },
    { name: 'square yard', symbol: 'yd2' },
    { name: 'square mile', symbol: 'mi2' },

    { title: 'Pressure' },
    { name: 'pascal', symbol: 'Pa' },
    { name: 'torr', symbol: 'Torr' },
    { name: 'bar', symbol: 'bar' },
    { name: 'millibar', symbol: 'mb' },
    { name: 'psi', symbol: 'lbf/in2' },

    { title: 'Time' },
    { name: 'day', symbol: 'day' },
    { name: 'hour', symbol: 'hr' },
    { name: 'minute', symbol: 'min' },
    { name: 'year', symbol: 'yr' },

    { title: 'Temperature' },
    { name: 'celsius', symbol: '°C' },
    { name: 'fahrenheit', symbol: '°F' },
    { name: 'kelvin', symbol: 'K' }
]

module.exports = {unit}
},{}],5:[function(require,module,exports){
// browserify index.js > browser.js
const { starter } = require("../method/starter")

var root = document.querySelector('#root')

var VALUE = JSON.parse(root.getAttribute('VALUE'))
var STATE = JSON.parse(root.getAttribute('STATE'))

VALUE.body = document.body
VALUE.window = window

starter({VALUE, STATE, id: 'root'})
},{"../method/starter":53}],6:[function(require,module,exports){
const { toString } = require('../method/toString')
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Button = (component) => {
    
    component = toComponent(component)
    var { style, tooltip, icon, controls } = component
    var id = component.id || generate()

    // for search inputs
    if (component.search.query) {
        component.state = component.search.state
        component.query = toString(component.search)
        component.searchable = true
    }
    
    return {
        ...component,
        class: 'flex-box button',
        type: 'View',
        id,
        tooltip,
        style: {
            border: '1px solid #e0e0e0',
            borderRadius: '.75rem',
            padding: '0.75rem 1rem',
            margin: '0 0.4rem',
            cursor: 'pointer',
            transition: 'border 0.1s',
            ...style,
            after: {
                border: '1px solid #0d6efd',
                ...style.after
            }
        },
        children: [{
            type: `Icon?icon.name=${icon.name};icon.code=${icon.code};id=${id}-icon`,
            style: {
                color: style.color || '#444',
                fontSize: style.fontSize || '1.4rem',
                margin: '0 0.4rem',
                transition: 'color 0.1s',
                display: 'flex',
                alignItems: 'center',
                ...icon.style,
                after: {
                    color: style.after.color || '#0d6efd'
                }
            }
        }, {
            type: `Text?text=${component.text};id=${id}-text`,
            style: {
                color: style.color || '#444',
                fontSize: style.fontSize || '1.4rem',
                margin: '0 0.4rem',
                transition: 'color 0.1s',
                after: {
                    color: style.after.color || '#0d6efd'
                }
            }
        }],
        controls: [...controls, {
            actions: `createControls?type=dropList?dropList`
        }, /*{
            event: 'click',
            actions: 'ripple'
        }, */{
            event: 'mouseenter',
            actions: `mountAfterStyles???${id};${id}-text;${id}-icon`
        }, {
            event: 'mouseleave',
            actions: `resetStyles???${id};${id}-text;${id}-icon`
        }/*, {
            watch: 'value.data',
            actions: `search?state=${component.state};${component.query}?${component.searchable}`
        }*/]
    }
}

module.exports = {Button}
},{"../method/generate":39,"../method/toComponent":58,"../method/toString":61}],7:[function(require,module,exports){
const { generate } = require("../method/generate")
const { toComponent } = require("../method/toComponent")

const Header = (component) => {

    if (component.templated) return component

    component = toComponent(component)
    var { text, style, sort, path, model } = component
    var id = component.id || generate()

    if (model === 'classic') return component

    else if (model === 'featured')
    return {
        ...component,
        type: 'Header',
        id,
        style: {
            display: 'flex',
            ...style,
        },
        children: [{
            type: 'View?class=flex-box;style.position=relative;style.flexDirection=column',
            children: [{
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    width: 'fit-content',
                    fontSize: style.fontSize || '1.4rem',
                    cursor: 'pointer',
                },
                controls: [{
                    event: 'click',
                    actions: [
                        // hide previous visible carrets
                        `setStyle?style.display=none?state.${sort.state}-sort!=${id}-caret?state.${sort.state}-sort`,
                        // show carrets
                        `setStyle?style.display=flex??${id}-caret`,
                        // sort
                        `sort;setState?data=state.${sort.state};id=${sort.id};path=${path};state.${sort.state}-sort=${id}-caret?const.${path}`,
                        // caret-up
                        `setStyle?style.display=flex?value.sort=ascending?${id}-caret-up`,
                        `setStyle?style.display=none?value.sort=descending?${id}-caret-up`,
                        // caret-down
                        `setStyle?style.display=none?value.sort=ascending?${id}-caret-down`,
                        `setStyle?style.display=flex?value.sort=descending?${id}-caret-down`,
                    ]
                }]
            }, {
                type: `View?id=${id}-caret;style.display=none;style.cursor=pointer?const.${path}`,
                children: [{
                    type: `Icon?id=${id}-caret-up;style.position=absolute;style.top=-1rem;style.left=calc(50% - 1rem);style.width=2rem;icon.name=caret-up-fill`,
                }, {
                    type: `Icon?id=${id}-caret-down;style.position=absolute;style.bottom=-1.1rem;style.left=calc(50% - 1rem);style.width=2rem;icon.name=caret-down-fill`
                }]
            }]
        }]
    }
}

module.exports = {Header}
},{"../method/generate":39,"../method/toComponent":58}],8:[function(require,module,exports){
const { toString } = require('../method/toString')
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Input = (component) => {

    if (component.templated) return component

    component = toComponent(component)
    var { input, model, dropList, lang, readOnly, style, controls, icon, placeholder } = component
    var id = component.id || generate()

    // for search inputs
    if (component.search && component.search.query) {
        component.search.query = toString(component.search)
        component.searchable = true
    }

    component.clearable = component.clearable !== undefined ? component.clearable : true
    component.removable = component.removable !== undefined ? component.removable : true
    component.duplicatable = component.duplicatable !== undefined ? component.duplicatable : true
    
    if (model === 'classic') {
        return {
            ...component,
            templated: true,
            controls: [...controls,
            /*{
                watch: 'value.data',
                actions: 'setContent?value=value.data'
            }, */{
                event: 'mouseenter??overflow',
                actions: 'showTooltip?tooltip=value.data;placement=top?value.data',
            }, {
                event: 'mouseleave',
                actions: 'hideTooltip',
            }]
        }

    }

    if (model === 'featured') {

        return {
            ...component,
            class: 'flex-box',
            type: 'View',
            id,
            controls: { actions: `focus::50>>${id}-input??value.length;value.index=value.length--1` },
            style: {
                display: 'inline-flex',
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                backgroundColor: '#fff',
                height: '4rem',
                flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                ...style,
            },
            children: [{
                type: `Icon?icon.name=${icon.name}${icon.code ? ';icon.code=' : ''};id=${id}-icon?const.${icon.name}`,
                style: {
                    color: '#444',
                    fontSize: '1.6rem',
                    marginLeft: '1rem',
                    marginRight: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    ...icon.style
                }
            }, {
                class: lang === 'ar' ? 'arabic' : '',
                type: `Input?readOnly=${readOnly};input.type=${input.type || 'text'};id=${id}-input;input.value=${input.value}${(component.currency || component.unit) ? `;path=amount;data=${component.data}` : component.lang ? `;path=name;data=${component.data}` : ''};filterable=${component.filterable}`,
                dropList: dropList,
                placeholder,
                'placeholder-ar': component['placeholer-ar'],
                templated: true,
                style: {
                    width: style.width || '100%',
                    height: '100%',
                    borderRadius: style.borderRadius || '0.25rem',
                    backgroundColor: style.backgroundColor || '#fff',
                    fontSize: style.fontSize || '1.4rem',
                    minWidth: style.minWidth || 'initial',
                    border: '0',
                    padding: '0.5rem',
                    color: '#444',
                    transition: 'width 0.2s',
                    outline: 'none',
                },
                controls: [...controls, {
                    actions: 'resizeInput'
                }, {
                    event: `keyup??value.data;e.key=Enter;${component.duplicatable};${component.removable}`,
                    actions: `duplicate>>${id}`
                }, {
                    event: `input??value.data!=free`,
                    actions: [
                        `filter>>drop-list?${component.filterable};dropList`,
                        `setData>>${id}-language?data=ar?isArabic`,
                        `search?state=${component.search.state};${component.search.query};id=${component.search.id}?${component.searchable}`
                    ]
                }, {
                    event: `input??value.data=free`,
                    actions: `setValue?value.element.value=''`
                }, {
                    event: 'mouseenter??overflow',
                    actions: 'showTooltip?tooltip=value.data;placement=top?value.data',
                }, {
                    event: 'mouseleave',
                    actions: 'hideTooltip',
                }]
            }, {
                type: `View?class=flex-box ${lang === 'ar' ? 'arabic' : ''}`,
                style: { 
                    padding: '0 0.5rem',
                },
                children: [{
                    type: `Text?path=currency;id=${id}-currency;dropList.items=[asset.currency.symbol]?const.${component.currency}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        margin: '0 0.5rem'
                    },
                    actions: `setData?data=${component.currency}?!value.data`
                }, {
                    type: `Text?path=unit;id=${id}-unit;dropList.items=[asset.unit.symbol]?const.${component.unit}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        margin: '0 0.5rem',
                    },
                    actions: `setData?data=${component.unit}?!value.data`
                }, {
                    type: `Text?path=lang;id=${id}-language;dropList.items=[asset.language.code]?const.${component.lang}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        margin: '0 0.5rem',
                    },
                    actions: `setData?data=${component.lang}?!value.data`,
                }, {
                    type: `Icon?icon.name=x;id=${id}-x?${component.clearable}||${component.removable}`,
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '2rem',
                        color: '#444',
                        cursor: 'pointer',
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            `remove>>${id}??${component.removable}${component.clearable ? `;value.length>>${id}>1;!value.data>>${id}-input` : ''}`,
                            `clearData>>${id}-input;focus::50>>${id}-input??${component.clearable}`,
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}
},{"../method/generate":39,"../method/toComponent":58,"../method/toString":61}],9:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Item = (component) => {

    component = toComponent(component)
    var { model, state, props, style, icon, text, tooltip, chevron, controls } = component

    props.borderMarker = props.borderMarker !== undefined ? props.borderMarker : true
    component.readOnly = component.readOnly !== undefined ? component.readOnly : false

    var id = component.id || generate()

    if (model === 'featured')
        return {
            ...component,
            class: `flex-box`,
            type: 'View',
            tooltip,
            props,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                height: '4rem',
                cursor: 'pointer',
                pointerEvents: 'fill',
                marginRight: '1px',
                marginLeft: '1px',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                ...style,
                after: {
                    border: '1px solid #ee384e',
                    marginRight: '0',
                    marginLeft: '0',
                    marginBottom: '1px',
                    ...style.after,
                },
            },
            children: [{
                type: `Icon?icon.name=${icon.name};icon.code=${icon.code};id=${id}-icon?const.${icon.name}`,
                style: {
                    width: '4rem',
                    color: style.color || '#444',
                    fontSize: '1.8rem',
                    ...icon.style,
                    after: {
                        color: style.after.color || '#ee384e',
                        ...icon.style.after,
                    },
                }
            }, {
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: style.color || '#444',
                    userSelect: 'none',
                    after: {
                        color: style.after.color || '#ee384e',
                        fontSize: style.after.fontSize || style.fontSize || '1.4rem',
                    }
                },
            }, {
                type: `Icon?icon.name=chevron-right;icon.code=fas;id=${id}-chevron`,
                style: {
                    display: 'flex',
                    position: 'absolute',
                    right: '1.2rem',
                    fontSize: style.fontSize || '1.3rem',
                    color: style.color || '#666',
                    transition: '0.2s',
                    ...chevron.style,
                    after: {
                        right: '0.8rem',
                        color: style.after.color || '#ee384e',
                        ...chevron.style.after,
                    }
                }
            }],
            controls: [...controls,
            {
                actions: [
                    `mountAfterStyles??mountOnLoad?${id};${id}-icon;${id}-text;${id}-chevron`,
                    `setState?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron]?mountOnLoad`,
                ]
            }, {
                event: `click??state.${state}.0!=${id}`,
                actions: `createActions?type=item;id=${id};state=${state}`
            }, {
                event: 'mouseenter',
                actions: `mountAfterStyles???${id};${id}-icon;${id}-text;${id}-chevron`
            }, {
                event: 'mouseleave',
                actions: `resetStyles??!mountOnLoad?${id};${id}-icon;${id}-text;${id}-chevron`
            }]
        }

    if (model === 'classic')
        return {
            ...component,
            class: `flex-box`,
            type: 'View',
            tooltip,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                minHeight: '3.3rem',
                cursor: !component.readOnly ? 'pointer' : 'initial',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                padding: '0.9rem',
                borderBottom: !component.readOnly ? 'initial' : '1px solid #eee',
                pointerEvents: 'fill',
                ...style,
                after: component.readOnly ? {} : {
                    backgroundColor: '#eee',
                    ...style.after,
                },
            },
            children: [{
                class: 'side-bar-home-icon',
                type: `Icon?icon.name=${icon.name};icon.code=${icon.code};id=${id}-icon?const.${icon.name}`,
                style: {
                    display: icon ? 'flex' : 'none',
                    color: !component.readOnly ? style.color || '#444' : '#333',
                    fontSize: !component.readOnly ? style.fontSize || '1.4rem' : '1.6rem',
                    fontWeight: !component.readOnly ? 'initial' : 'bolder',
                    marginRight: '1rem',
                    ...icon.style,
                    after: {
                        color: style.after.color || style.color || '#444'
                    }
                }
            }, {
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: !component.readOnly ? style.color || '#444' : '#333',
                    fontWeight: !component.readOnly ? 'initial' : 'bolder',
                    userSelect: 'none',
                    textAlign: 'left',
                    after: {
                        color: style.after.color || style.color || '#444'
                    }
                },
            }],
            controls: [...controls, {
                event: 'mouseenter',
                actions: `mountAfterStyles???${id};${id}-icon;${id}-text`
            }, {
                event: 'mouseleave',
                actions: `resetStyles??!mountOnLoad?${id};${id}-icon;${id}-text`
            }, {
                // on item click
                event: `click??!readOnly`,
                actions: `setData;setState?data=${text};state.${state}=${id}?!duplicates`,
            }]
        }
}

module.exports = {Item}
},{"../method/generate":39,"../method/toComponent":58}],10:[function(require,module,exports){
const { toComponent } = require("../method/toComponent")

const List = (component) => {

    component = toComponent(component)
    var { id, model, props, style, children, controls } = component

    props.placement = props.placement || ''
    props.distance = props.distance || '15'
    
    if (model === 'featured')
        return {
            ...component,
            class: `list flex-box`,
            type: 'View',
            style: {
                flexDirection: 'column',
                alignItem: 'flex-start',
                backgroundColor: '#333',
                padding: '1rem',
                borderRadius: '0.5rem',
                position: 'fixed',
                opacity: '0',
                transform: 'translateY(-100%)',
                transition: 'transform 0.2s, opacity 0.1s, top 0.1s',
                minWidth: '18rem',
                pointerEvents: 'none',
                zIndex: '2',
                ...style,
                after: {
                    pointerEvents: 'auto',
                    opacity: '1',
                    transform: 'translateY(0)',
                    ...style.after
                },
            },
            props,
            children: [...children,
            {
                class: `list-fin`,
                type: 'Text',
                style: {
                    position: 'absolute',
                    backgroundColor: '#333',
                    width: '1rem',
                    height: '1rem',
                    transform: 'rotate(45deg)',
                    borderRadius: '0 0 0 0.4rem',
                }
            }],
            controls: [...controls,
            {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }

    else if (model === 'classic')
        return {
            ...component,
            class: `box-shadow list flex-box`,
            type: 'View',
            style: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                position: 'fixed',
                opacity: '0',
                transform: 'translateY(-100%)',
                transition: 'transform 0.2s, opacity 0.1s, top 0.1s',
                minWidth: '18rem',
                pointerEvents: 'none',
                zIndex: '-1',
                ...style,
                after: {
                    opacity: '1',
                    pointerEvents: 'auto',
                    transform: 'translateY(0)',
                    zIndex: '2'
                }
            },
            children: [{
                type: 'View',
                style: {
                    height: '100%',
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    zIndex: '1'
                },
                children,
            }, {
                class: 'box-shadow list-fin',
                type: 'Text',
                style: {
                    position: 'absolute',
                    backgroundColor: '#fff',
                    width: '1rem',
                    height: '1rem',
                    transform: 'rotate(45deg)',
                    borderRadius: '0 0 0 0.4rem',
                    transition: 'top 0.1s',
                    zIndex: '0'
                }
            }],
            controls: [...controls,
            {
                event: 'mouseleave',
                actions: `resetStyles::200??!mouseenter;!state.${id}-mouseenter`
            }]
        }
}

module.exports = {List}
},{"../method/toComponent":58}],11:[function(require,module,exports){
const { toComponent } = require("../method/toComponent")

const Upload = (component) => {

    component = toComponent(component)
    var { upload } = component

    return {
        ...component,
        type: 'View',
        class: `file-drop-area ${component.class || ''}`,
        children: [{
            type: `Icon?icon.name=${upload.type === 'image' ? 'images' : upload.type === 'video' ? 'camera-video' : ''}`,
            style: {
                fontSize: '2.5rem',
                color: '#444',
                marginRight: '1rem'
            }
        }, {
            type: `Text?class=file-msg;text=or drag and drop ${upload.type}s here`
        }, {
            type: `Input?class=file-input;upload.type=${upload.type};upload.multiple;upload.accept=${upload.accept}`
        }]
    }
}

module.exports = {Upload}
},{"../method/toComponent":58}],12:[function(require,module,exports){
const {Button} = require('./Button')
const {Input} = require('./Input')
const {Item} = require('./Item')
const {List} = require('./List')
const {Upload} = require('./Upload')
const {Header} = require('./Header')

module.exports = {Input, Button, Item, List, Upload, Header}
},{"./Button":6,"./Header":7,"./Input":8,"./Item":9,"./List":10,"./Upload":11}],13:[function(require,module,exports){
const {dropList} = require('./dropList')
const {item} = require('./item')
const {list} = require('./list')
const {toggleView} = require('./toggleView')
const {windowView} = require('./windowView')

const _controls = {dropList, item, list, windowView, toggleView}

module.exports = _controls
},{"./dropList":14,"./item":15,"./list":16,"./toggleView":17,"./windowView":18}],14:[function(require,module,exports){
const dropList = ({id, path, placement, distance}) => (
    [{
        event: `mouseenter`,
        actions: [
            `setState?state.drop-list-mouseenter;state.drop-list=${id || 'value.id'}`,
            `dropList>>drop-list?id=${id || 'value.id'}${path ? `;path=${path}` : ''}`,
            `setPosition::50?id=drop-list;placement=${placement || 'bottom'};distance=${distance}`,
            `mountAfterStyles::100>>drop-list`,
        ]
    }, {
        event: 'Input',
        actions: 'setState?state.drop-list-filter=value.input;state.drop-list-element=value.element'
    }, {
        event: 'mouseleave',
        actions: [
            `resetStyles::200>>drop-list??!mouseenter;!mouseenter>>drop-list;!state.drop-list-mouseenter`,
            `setState?state.drop-list-mouseenter=false`
        ]
    }]
)

module.exports = {dropList}
},{}],15:[function(require,module,exports){
const item = ({id, state}) => ([
    `setData?data=value.text`,
    `setValue;resetStyles?value.mountOnLoad=false??state.${state}`,
    `setState?state.${state}=[${id || 'value.id'},${id || 'value.id'}++-icon,${id || 'value.id'}++-text,${id || 'value.id'}++-chevron]`,
    `setValue;mountAfterStyles?value.mountOnLoad??state.${state}`,
])//;state.admin-view=Inventory;route,

module.exports = {item}
},{}],16:[function(require,module,exports){
const list = ({id, placement, distance}) => (
    [{
        event: `mouseenter`,
        actions: [
            `setState?state.${id}-mouseenter`,
            `mountAfterStyles>>${id}`,
            `setPosition?placement=${placement || 'right'};distance=${distance || '15'};id=${id}`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `resetStyles::200>>${id}??!mouseenter;!mouseenter>>${id};!state.${id}-mouseenter`,
            `setState?state.${id}-mouseenter=false`
        ]
    }]
)

module.exports = {list}
},{}],17:[function(require,module,exports){
const toggleView = ({id, view}) => ([
    {
        event: `click??global.${id}.view!=${view}`,
        actions: [
            `resetStyles;mountAfterStyles::400???global.${id}.parent.id`,
            `createView::250>>${id}?view=${view}`,
        ]
    }
])

module.exports = {toggleView}
},{}],18:[function(require,module,exports){
const windowView = (params) => (
    [{
        event: 'click',
        actions: [
            `setValue;createView?value.DATA=value.DATA;view=${params.view}??window-view`,
            `setStyle?style.display=flex;style.opacity=1::25??sub-window`
        ]
    }]
)

module.exports = {windowView}
},{}],19:[function(require,module,exports){
const {clearIntervals} = require('./clearIntervals')
const {clearValues} = require('./clearValues')
const {clone} = require('./clone')
const {derive} = require('./derive')
const {duplicate, duplicates} = require('./duplicate')
const {getParam} = require('./getParam')
const {isArabic} = require('./isArabic')
const {isEqual} = require('./isEqual')
const {merge} = require('./merge')
const {overflow} = require('./overflow')
const {toBoolean} = require('./toBoolean')
const {toComponent} = require('./toComponent')
const {toId} = require('./toId')
const {toObject} = require('./toObject')
const {toString} = require('./toString')
const {update} = require('./update')
const {createDocument} = require('./createDocument')
const {createControls} = require('./createControls')
const {toArray} = require('./toArray')
const {generate} = require('./generate')
const {createElement} = require('./createElement')
const {addEventListener} = require('./event')
const {execute} = require('./execute')
const {controls} = require('./controls')
const {setContent} = require('./setContent')
const {route} = require('./route')
const {starter} = require('./starter')
const {setState} = require('./state')
const {setPosition} = require('./setPosition')
const {dropList} = require('./dropList')
const {createView} = require('./createView')
const {filter} = require('./filter')
const {setValue} = require('./setValue')
const {remove} = require('./remove')
const {focus} = require('./focus')
const {sort} = require('./sort')
const {defaultInputHandler} = require('./defaultInputHandler')
const {createActions} = require('./createActions')
const {setStyle, resetStyles, toggleStyles, mountAfterStyles} = require('./style')
const {resizeInput, dimensions} = require('./resize')
const {createData, setData, pushData, clearData, removeData} = require('./data')

const _method = {
    clearIntervals, clearValues, clone, derive, duplicate, duplicates,
    getParam, isArabic, isEqual, merge, overflow, addEventListener, setState,
    toBoolean, toComponent, toId, toObject, toString, update, execute,
    createDocument, toArray, generate, createElement, controls, route,
    setStyle, resetStyles, toggleStyles, mountAfterStyles, resizeInput, dimensions,
    createData, setData, pushData, clearData, removeData, setContent, starter,
    setPosition, dropList, filter, setValue, createView, createActions,
    createControls, remove, defaultInputHandler, focus, sort
}

module.exports = _method
},{"./clearIntervals":20,"./clearValues":21,"./clone":22,"./controls":23,"./createActions":24,"./createControls":25,"./createDocument":26,"./createElement":27,"./createView":29,"./data":30,"./defaultInputHandler":31,"./derive":32,"./dropList":33,"./duplicate":34,"./event":35,"./execute":36,"./filter":37,"./focus":38,"./generate":39,"./getParam":40,"./isArabic":41,"./isEqual":42,"./merge":43,"./overflow":44,"./remove":45,"./resize":47,"./route":48,"./setContent":49,"./setPosition":50,"./setValue":51,"./sort":52,"./starter":53,"./state":54,"./style":55,"./toArray":56,"./toBoolean":57,"./toComponent":58,"./toId":59,"./toObject":60,"./toString":61,"./update":62}],20:[function(require,module,exports){
const clearIntervals = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.childrenSiblings && local.childrenSiblings.map(id => {

        Object.entries(VALUE[id]).map(([key, value]) => {
            if (key.includes('-timer')) setTimeout(() => clearTimeout(value), 1000)
        })

        clearIntervals({ VALUE, id })
    })
}

module.exports = {clearIntervals}
},{}],21:[function(require,module,exports){
const { clone } = require("./clone")

const clearValues = ({ params }) => {
    var obj = params.values
    var newObj = clone(obj)

    if (typeof obj === 'undefined') return ''

    if (typeof obj === 'string') return ''

    if (Array.isArray(obj)) {
        newObj = []
        obj.map((element, index) => {

            if (typeof element === 'object') {
                newObj[index] = clearValues({ params: { values: element } })
            } else newObj[index] = ''

        })

        return newObj
    }

    Object.entries(obj).map(([key, value]) => {
        if (Array.isArray(value)) {
            newObj[key] = []
            value.map((element, index) => {

                if (typeof element === 'object') {
                    newObj[key][index] = clearValues({ params: { values: element } })
                } else newObj[key][index] = ''

            })
        } else if (typeof value === 'object') newObj[key] = clearValues({ params: { values: value } })
        else newObj[key] = ''
    })

    return newObj
}

module.exports = {clearValues}
},{"./clone":22}],22:[function(require,module,exports){
const clone = (obj) => {
    var copy
    if (typeof obj !== 'object') return obj

    //if (obj.nodeType === Node.ELEMENT_NODE) return obj

    if (Array.isArray(obj)) {

        copy = []
        obj.map((value, index) => {

            if (typeof value === "object") copy[index] = clone(value)
            else copy[index] = value
        })

    } else {

        copy = obj.constructor()
        Object.entries(obj).map(([key, value]) => {
            copy[key] = value
        })

    }

    return copy
}

module.exports = {clone}
},{}],23:[function(require,module,exports){
const controls = ({ VALUE, STATE, controls, id }) => {
    
    const { addEventListener } = require("./event")
    const { execute } = require("./execute")
    const { toArray } = require("./toArray")
    const { watch } = require("./watch")

    var local = VALUE[id]

    // controls coming from createControls action
    controls = controls || local.controls

    controls && toArray(controls).map(controls => {
        
        // watch
        if (controls.watch) watch({ VALUE, STATE, controls, id })

        // event
        else if (controls.event) addEventListener({ VALUE, STATE, controls, id })

        // execute onload
        else execute({ VALUE, STATE, controls, id })
    })
}

module.exports = {controls}
},{"./event":35,"./execute":36,"./toArray":56,"./watch":63}],24:[function(require,module,exports){
const _controls = require("../controls/_controls")

const createActions = ({ VALUE, STATE, params, id }) => {
    
    const { execute } = require('./execute')

    if (!params.type) return
    var actions = _controls[params.type](params)

    execute({ VALUE, STATE, actions, id })
}

module.exports = {createActions}
},{"../controls/_controls":13,"./execute":36}],25:[function(require,module,exports){
const _controls = require("../controls/_controls")
const {controls} = require("./controls")

const createControls = ({ VALUE, STATE, params, id }) => {
    var local = VALUE[id]
    if (!local) return

    var type = params.type
    if (!_controls[type]) return
    if (type === 'dropList') params = local[type] || {}
    
    controls({VALUE, STATE, id, controls: _controls[type](params)})
}

module.exports = {createControls}
},{"../controls/_controls":13,"./controls":23}],26:[function(require,module,exports){
const { createElement } = require("./createElement")
const _view = require('../view/_view')
const _page = require('../page/_page')

const createDocument = (page) => {
    var innerHTML = '', STATE = {}, VALUE = {}, id = 'root'

    // set root values
    VALUE[id] = {}
    VALUE[id].children = []
    VALUE[id].derivations = []
    VALUE[id].childrenSiblings = []
    
    // push page views to root
    page.views.map(view => _view[view] && VALUE[id].children.push(_view[view]))

    // push public views to root
    _page.public.views.map(view => _view[view] && VALUE[id].children.push(_view[view]))
    
    // create html
    innerHTML = createElement({STATE, VALUE, id})
    
    return `<!DOCTYPE html>
    <html lang="en" class="html">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DigiMatjar</title>
        <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
        <div id="root" VALUE='${JSON.stringify(VALUE)}' STATE='${JSON.stringify(STATE)}'>${innerHTML}</div>
        <script src="browser.js"></script>
    </body>
    </html>`
}

module.exports = {createDocument}
},{"../page/_page":64,"../view/_view":68,"./createElement":27}],27:[function(require,module,exports){
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toObject } = require("./toObject")
const { toBoolean } = require("./toBoolean")
const { override } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")
const { createTags } = require("./createTags")

const _view = require("../view/_view")

const createElement = ({STATE, VALUE, id, params = {}}) => {
    
    var tags = '', innerHTML = '', parent = VALUE[id], children = params.children || parent.children

    // childrenSiblings
    parent.childrenSiblings = params.siblings || []

    children && toArray(children).map(child => {
        var value = clone(child)
        
        // view value
        if (_view[value.view]) value = _view[value.view]

        // no value
        if (!value.type) return

        // destructure type, params, & conditions from type
        var type = value.type.split('?')[0]
        var params = value.type.split('?')[1] 
        var conditions = value.type.split('?')[2]

        // type
        value.type = type
        
        // approval
        var approved = toBoolean({ VALUE, STATE, string: conditions, id })
        if (!approved) return
        
        // push destructured params from type to value
        if (params) {
            params = toObject({VALUE, STATE, string: params, id})
            Object.entries(params).map(([k, v]) => value[k] = v )
        }
        
        // pass to children
        if (parent.toChildren) {

            if (typeof params === 'string')
                params = toObject({ VALUE, STATE, string: parent.toChildren, id })

            value = override(value, parent.toChildren)
        }
        
        // icon
        if (value.icon) value.icon.name = value.icon.name || ''

        // id
        value.id = value.id || generate()
        value.class = value.class || ''

        // parent
        value.parent = id
        value.DATA = value.DATA || parent.DATA

        // derivations
        var derivations = clone(parent.derivations)

        // path
        var path = typeof value.path === 'string' && value.path !== '' ? value.path.split('.') : []
        if (path.length > 0) {
            if (!parent.DATA) parent.DATA = {}

            // push path to a data array and derivations last element is not an index
            if (isNaN(path[0])) {
                var data = derive(parent.DATA, parent.derivations)[0]
                if (Array.isArray(data)) derivations.push(0)
            }

            derivations.push(...path)
        }

        // data (turnoff is do not mount data)
        var data, isArray
        if (parent.turnOff) { data = ''; value.turnOff = true }                     //def value
        else { [data, derivations, isArray] = derive(value.DATA, derivations, false, value.data, true) }

        if (isArray) {
            
            tags = data.map((data, index) => {
            
                var keys = clone(derivations)
                keys.push(index, ...path)
                
                // data
                var [data, derivations] = derive(value.DATA, keys, false, value.data, true)

                return createTags({ VALUE, STATE, value, data, derivations })

            }).join('')

        } else tags = createTags({ VALUE, STATE, value, data, derivations })
        
        //tag = innerHTML
        innerHTML += tags

    })
    return innerHTML
}

module.exports = {createElement}
},{"../view/_view":68,"./clone":22,"./createTags":28,"./derive":32,"./generate":39,"./merge":43,"./toArray":56,"./toBoolean":57,"./toObject":60}],28:[function(require,module,exports){
const { clone } = require("./clone")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toBoolean } = require("./toBoolean")
const { toObject } = require("./toObject")

const _component = require("../component/_component")

const createTags = ({ VALUE, STATE, value, data, derivations }) => {
    const { execute } = require("./execute")
    
    if (Array.isArray(data)) {

        value.length = data.length

        if (data.length > 0) {
            var tags = data.map((data, index) => {

                var id = generate(), local = clone(value)
                local.id = id
        
                // components
                if (_component[local.type]) {
                    
                    local = _component[local.type](local)
        
                    // destructure type, params, & conditions from type
                    var type = local.type.split('?')[0]
                    var params = local.type.split('?')[1] 
                    var conditions = local.type.split('?')[2]
            
                    // type
                    local.type = type
                    
                    // approval
                    var approved = toBoolean({ VALUE, STATE, string: conditions, id })
                    if (!approved) return
                    
                    // push destructured params from type to value
                    if (params) {
                        params = toObject({VALUE, STATE, string: params, id})
                        Object.entries(params).map(([k, v]) => local[k] = v )
                    }
                }

                VALUE[id] = { ...local, id, index, data, derivations: [...derivations, index] }
                VALUE[local.parent].childrenSiblings.push(id)

                // execute onload actions
                if (local.actions) execute({ VALUE, STATE, actions: local.actions, id })

                //if (!Components[local.type]) return <></>

                return oneTag({ STATE, VALUE, id })

            }).join('')

            return tags
        }
    }

    // template

    var id = value.id || generate()
    
    // components
    if (_component[value.type]) {
        
        value = _component[value.type](value)

        // destructure type, params, & conditions from type
        var type = value.type.split('?')[0]
        var params = value.type.split('?')[1] 
        var conditions = value.type.split('?')[2]

        // type
        value.type = type
        
        // approval
        var approved = toBoolean({ VALUE, STATE, string: conditions, id })
        if (!approved) return
        
        // push destructured params from type to value
        if (params) {
            params = toObject({VALUE, STATE, string: params, id})
            Object.entries(params).map(([k, v]) => value[k] = v )
        }
    }

    VALUE[id] = { ...value, id, data, derivations }
    VALUE[value.parent].childrenSiblings.push(id)

    // execute onload actions
    if (value.actions) execute({ VALUE, STATE, actions: value.actions, id })

    //if (!Components[value.type]) return <></>

    tag = oneTag({ STATE, VALUE, id })

    return tag
}



const oneTag = ({STATE, VALUE, id}) => {

    const { createElement } = require("./createElement")
    var tag, value = VALUE[id]
    
    // style
    var style = ''
    if (value.style) {
        Object.entries(value.style).map(([k, v]) => {
            if (k === 'after' || k.includes('::')) return
            else if (k === 'borderBottom') k = 'border-bottom'
            else if (k === 'borderLeft') k = 'border-left'
            else if (k === 'borderRight') k = 'border-right'
            else if (k === 'borderTop') k = 'border-top'
            else if (k === 'marginBottom') k = 'margin-bottom'
            else if (k === 'marginLeft') k = 'margin-left'
            else if (k === 'marginRight') k = 'margin-right'
            else if (k === 'marginTop') k = 'margin-top'
            else if (k === 'fontSize') k = 'font-size'
            else if (k === 'backgroundColor') k = 'background-color'
            else if (k === 'zIndex') k = 'z-index'
            else if (k === 'boxShadow') k = 'box-shadow'
            else if (k === 'borderRadius') k = 'border-radius'
            else if (k === 'fontWeight') k = 'font-weight'
            else if (k === 'zIndex') k = 'z-index'
            else if (k === 'alignItems') k = 'align-items'
            else if (k === 'justifyContent') k = 'justify-content'
            else if (k === 'userSelect') k = 'user-select'
            else if (k === 'textAlign') k = 'text-align'
            else if (k === 'pointerEvents') k = 'pointer-events'
            else if (k === 'flexDirection') k = 'flex-direction'
            else if (k === 'maxWidth') k = 'max-width'
            else if (k === 'minWidth') k = 'min-width'
            else if (k === 'maxHeight') k = 'max-height'
            else if (k === 'minHeight') k = 'min-height'
            style += `${k}:${v}; `
        })
    }

    // innerHTML
    var text = (typeof value.data !== 'object' && value.data) || value.text || ''
    
    if (value.type === 'View')
    tag = `<div class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</div>`

    else if (value.type === 'Table')
    tag = `<table class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</table>`

    else if (value.type === 'Row')
    tag = `<tr class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</tr>`

    else if (value.type === 'Header')
    tag = `<th class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</th>`

    else if (value.type === 'Cell')
    tag = `<td class='${value.class}' id='${value.id}' style='${style}'>${value.children ? createElement({STATE, VALUE, id}) : text}</td>`

    else if (value.type === 'Text')
    tag = `<p class='${value.class}' id='${value.id}' style='${style}'>${text}</p>`

    else if (value.type === 'Label')
    tag = `<label class='${value.class}' id='${value.id}' style='${style}'>${text}</label>`

    else if (value.type === 'Icon')
    tag = `<i class='${value.class} bi-${value.icon.name}' id='${value.id}' style='${style}'></i>`
    
    else if (value.type === 'Input')
    tag = `<input class='${value.class}' id='${value.id}' style='${style}' ${value.upload ? `type=file accept='${value.upload.type}/*' ${value.upload.multiple ? 'multiple': ''}` : ''} type='${value.input.type || 'text'}' placeholder='${value.placeholder || ''}' value='${value.data || value.input.value || ''}'/>`
    
    else if (value.type === 'Paragraph')
    tag = `<textarea class='${value.class}' id='${value.id}' style='${style}' placeholder='${value.placeholder || ''}'>${text}</textarea>`

    // linkable
    if (value.link) {

        tag = `<a href=${value.link}>${tag}</a>`
        value.controls = toArray(value.controls) || []
        value.controls.push({
            event: 'click',
            actions: `route?route=${value.link}`
        })
    }

    return tag
}

module.exports = {createTags}
},{"../component/_component":12,"./clone":22,"./createElement":27,"./execute":36,"./generate":39,"./toArray":56,"./toBoolean":57,"./toObject":60}],29:[function(require,module,exports){
const { update } = require("./update")
const _view = require("../view/_view")

const createView = ({ STATE, VALUE, params, id }) => {

    var local = VALUE[id]
    var view = params.view

    if (!view) return
    if (local.view === view) return

    local.view = view
    if (!_view[view]) return

    local.children = [_view[view]]
    
    // update
    update({ VALUE, STATE, id })
}

module.exports = {createView}
},{"../view/_view":68,"./update":62}],30:[function(require,module,exports){
const { clone } = require("./clone")
const { setContent } = require("./setContent")
const { update } = require("./update")

const createData = ({ VALUE, params, id }) => {
    var local = VALUE[id]
    var data = params.data

    local.derivations.reduce((o, k, i) => {
        if (i === local.derivations.length - 1) return o[k] = data
        return o[k]
    }, local.DATA)
}

const pushData = ({ VALUE, params }) => {
    var value = params.data
    setData({ VALUE, value })
}

const setData = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]
    if (!local.DATA) return

    var path = params.path
    if (path) path = path.split('.')
    else path = []

    var value = params.value || params.data

    var derivations = clone(local.derivations)
    if (params.derivations) derivations = params.derivations.split('.')

    if (!value) value = ''
    local.data = value

    setContent({ VALUE, params: { value }, id })

    var keys = [...derivations, ...path]
console.log(keys);
    keys.reduce((o, k, i) => {
        if (!o) return o
        console.log(o[k], o, k, i);
        if (i === keys.length - 1) {

            if (Array.isArray(o[k]) && typeof value !== 'object') {

                if (isNaN(k) && o[k].length === 0) {

                    local.derivations.push(0)
                    o[k][0] = value

                } else o[k].push(value)


            } else o[k] = value

        } else {
            if (!o[k]) return o[k] = {}

            if (i === keys.length - 2 && !value) {
                /*if (Array.isArray(o[k]) && o[k].length === 1) {
                    delete o[k]
                    local.derivations.pop()
                    update({ VALUE, STATE, id: local.parent })
                }*/
            }
        }

        return o[k]
    }, local.DATA)
}

const clearData = ({ VALUE, STATE, id }) => {
    setData({ VALUE, STATE, id })
}

const removeData = ({ VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local.DATA) return

    var path = params.path
    path = path ? path.split('.') : []
    path = [...local.derivations, ...path]

    path.reduce((o, k, i) => {
        if (i === path.length - 1) return delete o[k]
        return o[k]
    }, local.DATA)
    
}

module.exports = {createData, setData, pushData, clearData, removeData}
},{"./clone":22,"./setContent":49,"./update":62}],31:[function(require,module,exports){
const { setData } = require("./data")
const { resizeInput } = require("./resize")
const { isArabic } = require("./isArabic")
const { remove } = require("./remove")

const defaultInputHandler = ({STATE, VALUE, id}) => {

    var local = VALUE[id]
    if (!local || local.element.tagName !== 'INPUT') return

    // input
    local.value = local.element.value
    
    if (local.input && local.input.type === 'number')
        local.element.addEventListener("mousewheel", (e) => e.target.blur())

    if (local.input && local.input.value && !local.data)
        setData({ VALUE, params: { value: local.input.value }, id })

    if (local.readOnly) return

    var myFn = (e) => {

        // VAR[id] doesnot exist
        if (!VALUE[id]) return e.target.removeEventListener('input', myFn)

        var value = e.target.value

        // for number inputs, strings are rejecteds
        if (local.input && local.input.type === 'number') {
            if (isNaN(value) || local.data === 'free') return
            value = parseFloat(value)
        }

        // for uploads
        if (local.upload) {

            value = e.target.files
            var length = Object.entries(value).length

            if (length === 0) return
            else if (length === 1) value = value[0].name
            else if (length > 1) {
                value = []
                Object.entries(e.target.files).map(([key, val]) => {
                    value.push(val.name)
                })
            }

        }

        local.element.value = value
        local.value = value
        local.data = value

        if (local.DATA && local.derivations[0] != '') {

            // reset DATA
            setData({ VALUE, params: { value }, id })

            // remove value from data
            //if (value === '') return remove({ VALUE, STATE, id })
        }

        // resize
        resizeInput({ VALUE, id })

        // arabic values
        isArabic({ VALUE, params: { value }, id })

        console.log(local.data, local.DATA)
    }

    local.element.addEventListener('input', myFn)
}

module.exports = {defaultInputHandler}
},{"./data":30,"./isArabic":41,"./remove":45,"./resize":47}],32:[function(require,module,exports){
const { merge } = require("./merge")

const derive = (data, keys, fullDerivation, defValue, writable) => {

    var derivedData = data
    var isArray = false

    if (!Array.isArray(keys)) keys = keys.split('.')

    if (!data || typeof data !== 'object' || keys.length === 0) {
        if (defValue) data = defValue
        derivedData = data
    }

    else derivedData = keys.reduce((o, k, i) => {
        if (isArray) return o

        if (k === 'merge') return merge(o)

        // path doesnot exist => create path
        if (writable && typeof o[k] !== 'object') {

            if (i < keys.length - 1) o[k] = {}
            else if (i === keys.length - 1) {

                if (defValue || defValue === 0) {
                    if (!o[k]) o[k] = defValue
                } else if (Array.isArray(o) && isNaN(k)) {
                    if (o.length === 0) {
                        o.push({})
                        keys.splice(i, 0, 0)
                    }
                }
            }
        }

        if (o === undefined) return undefined

        if (Array.isArray(o) && isNaN(k)) {

            if (fullDerivation) o = o.map(o => derive(o, keys.slice(i), true)[0])
            else keys = keys.slice(0, i) || []

            isArray = true
            return o
        }

        return o[k]
    }, data)

    // do not touch isArray...
    return [derivedData, keys, isArray]
}


module.exports = {derive}
},{"./merge":43}],33:[function(require,module,exports){
const { generate } = require('./generate')
const { update } = require('./update')
const { filter } = require('./filter')
const { toObject } = require('./toObject')
const { clone } = require('./clone')

const dropList = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id] // drop-list
    if (!local) return

    // button or input or text...
    var button = clone(VALUE[params.id]) 

    // items
    var items = clone(button.dropList.items) || []
    local.derivations = clone(button.derivations)
    local.DATA = button.DATA

    // path
    if (params.path) local.derivations = params.path.split('.')

    // input components => focus
    var inputid
    if (button.id.includes('-language') || button.id.includes('-unit') || button.id.includes('-currency')) {

        inputid = button.id.split('-language')
        if (inputid[1] === undefined) inputid = button.id.split('-unit')
        if (inputid[1] === undefined) inputid = button.id.split('-currency')

        inputid = inputid[0] + '-input'
    }

    // data related items
    var index = items.findIndex(item => item && item.split('.')[0] === 'DATA' || item.split('.')[0] === 'data')
    if (index !== -1) {
        var k = generate()
        var editedItem = toObject({ VALUE, STATE, string: `${k}=${items[index]}`, id: button.id })[k]
        items.splice(index, 1)
        items.push(...editedItem)
    }
    
    items = items.filter(item => item)
    if (items.length > 0) local.children = items.map(item => {

        var readOnly = false
        item = item.split(':')
        if (item[1]) readOnly = item[1].split(';').find(param => param === 'readOnly')

        return {
            type: `Item?text=${item[0]};readOnly=${readOnly};data=${item[0]}`,
            controls: [{
                event: `click??!readOnly;state.drop-list=${button.id}`,
                actions: [
                    `setContent>>${button.id};focus>>${inputid}?content=${item[0]}`,
                    //`update::50>>${button.id}`,
                    `setData>>${inputid}?data=free?const.${item[0]}=free`,
                    `setData>>${inputid}?data=''?const.${item[0]}!=free;value.data=free`
                ]
            }]
        }
    })
    
    local.turnOff = true
    update({ VALUE, STATE, id })
    
    if (local.filterable) {
        // get input value for filter
        var value = button.value

        if (!value) {
            value = button.getElementsByTagName('INPUT')[0]
            if (value) value = value.value
        }

        if (value) filter({ VALUE, STATE, params: { value }, id })
    }
}

module.exports = {dropList}
},{"./clone":22,"./filter":37,"./generate":39,"./toObject":60,"./update":62}],34:[function(require,module,exports){
const { clearValues } = require('./clearValues')
const { clone } = require('./clone')
const { toArray } = require('./toArray')
const { derive } = require('./derive')
const { isEqual } = require('./isEqual')
const { removeDuplicates } = require('./removeDuplicates')
const { update } = require('./update')

const duplicate = ({ VALUE, STATE, params, id }) => {

    const { createElement } = require('./createElement')

    var local = VALUE[id]
    if (!local) return

    if (!params) params = {}
    if (local.DATA) {

        var keys = clone(local.derivations)
        var index = params.index || 0
        if (params.path) keys.push(...params.path.split('.'))

        // last index refers to data index => must be poped
        if (!isNaN(keys[keys.length - 1])) {
            index = keys[keys.length - 1]
            keys.pop()
        }

        //if (keys.length === 0) local.parent.children.push(clone(local.parent.children[index]))

        keys.reduce((o, k, i) => {

            if (i === keys.length - 1) {

                o[k] = toArray(o[k])
                i = o[k].length - 1

                o[k].push(clone(local.pushData || o[k][i] || ''))

                if (!params.keepValues) {
                    var i = o[k].length - 1
                    o[k][i] = removeDuplicates(clearValues({ params: { values: o[k][i] } }))
                }
            }

            return o[k]

        }, local.DATA)

    } else {

        var index = params.index || (local.children.length - 1)
        local.children.push(local.children[index])

    }

    update({ VALUE, STATE, id: local.parent })
}

const duplicates = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var [data] = derive(local.DATA, local.derivations), exists
    if (!params.data) return false

    data = toArray(data)
    if (params.data) exists = data.find(data => isEqual(data, params.data))
    else {
        data.map(data0 => {
            if (!exists) exists = data.find(data1 => isEqual(data0, data1))
        })
    }

    return exists
}

module.exports = {duplicate, duplicates}
},{"./clearValues":21,"./clone":22,"./createElement":27,"./derive":32,"./isEqual":42,"./removeDuplicates":46,"./toArray":56,"./update":62}],35:[function(require,module,exports){

const { toBoolean } = require('./toBoolean')
const { toObject } = require('./toObject')
const { toId } = require('./toId')

const events = ['click', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'touchstart', 'touchend']

const addEventListener = ({ VALUE, STATE, controls, id }) => {
    
    const { execute } = require('./execute')

    if (!controls.actions) return
    var local = VALUE[id]

    var events = controls.event.split('?')
    var params = toObject({ VALUE, STATE, string: events[1] })
    var conditions = events[2]
    var idList = events[3]
    var once = params.once !== undefined ? true : false

    idList = toId({ VALUE, STATE, id, string: idList })

    events = events[0].split(';')

    events.map(event => {

        var timer = 0

        // action>>id
        var eventid = event.split('>>')[1]
        if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
        event = event.split('>>')[0]

        // action::timer
        timer = event.split('::')[1] || 0
        event = event.split('::')[0]

        if (!event) return

        // add event listener
        idList.map(id => {

            var body = id === 'body'
            var myFn = (e) => {
                
                if (body) id = local.id
                
                // VALUE[id] doesnot exist
                if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
                
                var approved = toBoolean({ VALUE, STATE, string: conditions, e, id })
                if (!approved) return

                local[`${controls.actions}-timer`] = setTimeout(
                    () => execute({ VALUE, STATE, controls, e, id }),
                    timer)

            }

            // body || window
            if (id === 'body' || id === 'window') return document.body.addEventListener(event, myFn, { once })

            // elements
            return VALUE[id].element.addEventListener(event, myFn, { once })
        })
    })
}

const setEvents = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.touchStart = false
    local.mouseenter = false
    local.mouseDown = false

    events.map(event => {

        const setEventType = (e) => {

            var local = VALUE[id]
            if (!local) return e.target.removeEventListener(event, setEventType)

            if (event === 'mouseenter') local.mouseenter = true
            else if (event === 'mouseleave') local.mouseenter = false
            else if (event === 'mousedown') local.mouseDown = true
            else if (event === 'mouseup') local.mouseDown = false
            else if (event === 'touchstart') local.touchStart = true
            else if (event === 'touchend') local.touchStart = false
        }

        local.element.addEventListener(event, setEventType)
    })
}

module.exports = {addEventListener, setEvents}
},{"./execute":36,"./toBoolean":57,"./toId":59,"./toObject":60}],36:[function(require,module,exports){

const { toBoolean } = require("./toBoolean")
const { toArray } = require("./toArray")
const { toObject } = require("./toObject")
const { getParam } = require("./getParam")
const { toId } = require("./toId")
const { generate } = require("./generate")
const _method = require("./_method")

const execute = ({ VALUE, STATE, controls, actions, e, id }) => {

    var local = VALUE[id]
    if (!local) return
    if (controls) actions = controls.actions

    // execute actions
    toArray(actions).map(action => {
        
        var approved = true
        var actions = action.split('?')
        var params = actions[1]
        var conditions = actions[2]
        var idList = actions[3]

        actions = actions[0].split(';')

        // action does not exist
        actions.map(action => {

            var name = action.split('>>')[0]

            // action::timer
            var timer = name.split('::')[1] || 0
            name = name.split('::')[0]

            if (!_method[name]) return

            // reset
            var reset = getParam(action, 'reset', false)
            if (reset) clearTimeout(local[`${name}-timer`])

            local[`${name}-timer`] = setTimeout(() => {

                // approval
                approved = toBoolean({ VALUE, STATE, string: conditions, params, id })
                if (!approved) return

                // params
                params = toObject({ VALUE, STATE, string: params, e, id })

                // id's
                idList = toId({ VALUE, STATE, id, string: idList, e })

                // action>>id
                var actionid = action.split('>>')[1];


                (actionid ? [actionid] : idList).map(id => {

                    // id = value.path
                    if (id.includes('.')) {

                        var k = generate()
                        id = toObject({ VALUE, STATE, string: `${k}=${id}`, e, id: local.id })[k]
                    }

                    // component doesnot exist
                    if (!id || !VALUE[id]) return
                    
                    _method[name]({ VALUE, STATE, controls, params, e, id })
                })

            }, timer)
        })
    })
}

module.exports = {execute}
},{"./_method":19,"./generate":39,"./getParam":40,"./toArray":56,"./toBoolean":57,"./toId":59,"./toObject":60}],37:[function(require,module,exports){
const filter = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var element = params.element || local.element
    var value = params.value || local.element.value

    if (!value) return
    value = value.toLowerCase()
    var textEl = [...element.getElementsByClassName('text')]

    textEl.map(el => {
        if (el.innerHTML.toLowerCase().includes(value)) el.parentElement.style.display = 'flex'
        else el.parentElement.style.display = 'none'
    })
}

module.exports = {filter}
},{}],38:[function(require,module,exports){
const focus = ({ VALUE, id }) => {
    var local = VALUE[id]

    if (local.type === 'Input' || local.type === 'TextInput') local.element.focus()
    else {
        if (local.element) {
            var childElements = local.element.getElementsByTagName("INPUT")
            if (childElements.length > 0) {
                childElements[0].focus()
            }
        }
    }

    var value = local.element.value
    local.element.value = ''
    local.element.value = value
}

module.exports = {focus}
},{}],39:[function(require,module,exports){
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generate = (length) => {
    var result = '';
    if (!length) length = 5
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
}

module.exports = {generate}
},{}],40:[function(require,module,exports){
const getParam = (string, param, defValue) => {
    if (!string) return defValue
    if (!string.includes('?')) return defValue

    string = string.split('?')[1]
    if (!string) return defValue

    string = string.split(';')
    string = string.find(el => el.includes(param))
    if (!string) return defValue

    var value = string.split(param)[1]
    if (!value) value = true

    return value
}

module.exports = {getParam}
},{}],41:[function(require,module,exports){
var arabic = /[\u0600-\u06FF\u0750-\u077F]/

const isArabic = (value) => {
    if (typeof value === 'string' || typeof value === 'number') return arabic.test(value)

    if (!value) return
    var { VALUE, params = {}, id } = value
    var local = VALUE[id]

    var text = params.value || (local.type === 'Input' ? local.value : (local.type === 'Text' && local.text))
    if (!text) return 
    var result = arabic.test(text)

    if (result) {
        local.element.classList.add('arabic')
        local.element.style.textAlign = 'right'
        if (local['placeholder-ar']) local.element.placeholder = local['placeholder-ar']
    } else {
        if (local.element.className.includes('arabic')) local.element.style.textAlign = 'left'
        local.element.classList.remove('arabic')
        if (local['placeholder']) local.element.placeholder = local['placeholder']
    }
    return true
}

module.exports = {isArabic}
},{}],42:[function(require,module,exports){
const isEqual = function (value, other) {
    //if (value === undefined || other === undefined) return false

    // string || boolean || number
    if (typeof value !== 'object' && typeof other !== 'object') return value == other

    // html elements
    if (value && other)
        if (value.nodeType === Node.ELEMENT_NODE && other.nodeType === Node.ELEMENT_NODE) {
            return value.isSameNode(other) || value.contains(other) || other.contains(value)
        } else if ((value.nodeType !== Node.ELEMENT_NODE && other.nodeType === Node.ELEMENT_NODE)
            || (value.nodeType === Node.ELEMENT_NODE && other.nodeType !== Node.ELEMENT_NODE))
            return false

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {

        // Get the object type
        var itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {

            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() != item2.toString()) return false;
            } else {
                if (item1 != item2) return false;
            }

        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;

};

module.exports = {isEqual}
},{}],43:[function(require,module,exports){

const { toArray } = require("./toArray")
const { clone } = require("./clone")

const merge = (objects) => {

    objects = clone(objects)
    if (typeof objects !== 'object') return objects

    var merged = toArray(objects[0]).flat()

    objects.shift()

    objects.map(obj => {

        merged.push(...toArray(obj).flat())

        if (!Array.isArray(obj) && typeof obj === 'object')

            Object.entries(obj).map(([key, value]) => {
                if (merged[key]) {

                    if (typeof value === 'string' || typeof value === 'number') {

                        merged[key] = toArray(merged[key])
                        merged[key].push(value)

                    } else if (Array.isArray(value)) {
                        merged[key].push(...value)

                    } else if (typeof value === 'object')
                        merged[key] = merge([value, merged[key]])

                } else merged[key] = value
            })

    })

    return merged
}

const override = (obj1, obj2) => {
    obj1 = obj1 || {}

    Object.entries(obj2).map(([key, value]) => {
        if (obj1[key]) {

            if (!Array.isArray(value) && typeof value === 'object')
                obj1[key] = override(obj1[key], value)

            else obj1[key] = value

        } else obj1[key] = value
    })

    return obj1
}

module.exports = {merge, override}
},{"./clone":22,"./toArray":56}],44:[function(require,module,exports){
const overflow = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var width = local.element.clientWidth
    var height = local.element.clientHeight
    var text

    if (local.type === 'Input' || local.type === 'TextInput') text = local.element.value
    else if (local.type === 'Text' || local.type === 'Label' || local.type === 'Header') text = local.element.innerHTML
    else if (local.type === 'UploadInput') text = local.element.value


    // create a test div
    var lDiv = document.createElement('div')

    document.body.appendChild(lDiv)

    var pStyle = local.element.style
    var pText = local.data || local.input.value || ''
    var pFontSize = pStyle.fontSize

    if (pStyle != null) {
        lDiv.style = pStyle;
    }

    lDiv.style.fontSize = pFontSize
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;
    lDiv.style.padding = pStyle.padding;

    lDiv.innerHTML = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    var overflowX, overflowY
    if (width < lResult.width) overflowX = true
    if (height < lResult.height) overflowY = true

    return [overflowX, overflowY]
}

module.exports = {overflow}
},{}],45:[function(require,module,exports){
const { removeId } = require("./update")
const { clone } = require("./clone")
const { clearIntervals } = require("./clearIntervals")

const remove = ({ VALUE, params, id }) => {

    var local = VALUE[id]
    if (!params) params = {}

    if (!local.DATA) return

    var keys = clone(local.derivations)
    if (params.path) keys.push(...params.path.split('.'))

    if (keys.length === 0) local.parent.children.splice([keys[keys.length - 1]], 1)
    else keys.reduce((o, k, i) => {

        if (i === keys.length - 1) {
            if (Array.isArray(o)) {
                o.splice(k, 1)
                local.derivations.pop()
            } else return delete o[k]

        }
        return o[k]

    }, local.DATA)

    //local.parent.children.splice([keys[keys.length - 1]], 1)

    console.log(local.DATA)
    clearIntervals({ VALUE, id })
    removeId({ VALUE, id })
    local.element.remove()
    
    VALUE[local.parent].childrenSiblings.map((id, i) => {
        VALUE[id].length -= 1
        if (id === local.id) VALUE[local.parent].childrenSiblings.splice(i, 1)
    })
    delete VALUE[id]

}

module.exports = {remove}
},{"./clearIntervals":20,"./clone":22,"./update":62}],46:[function(require,module,exports){
const removeDuplicates = (object) => {

    if (typeof object === 'string' || typeof object === 'number' || !object) return object

    if (Array.isArray(object)) return object = [removeDuplicates(object[0])]

    if (typeof object === 'object') {

        Object.entries(object).map(([key, value]) => {
            object[key] = removeDuplicates(value)
        })
        return object
    }
}

module.exports = {removeDuplicates}
},{}],47:[function(require,module,exports){
const resizeInput = ({ VALUE, id }) => {
    var local = VALUE[id]
    if (!local) return

    if (local.type !== 'Input') return

    var width = local.style.width
    if (width === 'fit-content') {

        var results = dimensions({ VALUE, id })

        if (local.element) local.element.style.width = results.width + 'px'
        else return results.width + 'px'

    } else return local.style.width
}

const dimensions = ({ VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local) return

    var lDiv = document.createElement('div')
    document.body.appendChild(lDiv)

    var pStyle = local.style
    var pText = params.text || local.data || (local.input && local.input.value) || local.text || ''
    var pFontSize = pStyle.fontSize

    if (pStyle != null) lDiv.style = pStyle

    lDiv.style.fontSize = pFontSize
    lDiv.style.position = "absolute"
    lDiv.style.left = -1000
    lDiv.style.top = -1000
    lDiv.style.padding = pStyle.padding
    lDiv.style.maxWidth = pStyle.maxWidth
    lDiv.style.transform = pStyle.transform

    lDiv.innerHTML = pText

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    }

    document.body.removeChild(lDiv)
    lDiv = null

    return lResult
}

module.exports = {resizeInput, dimensions}
},{}],48:[function(require,module,exports){
const { clearIntervals } = require('./clearIntervals')
const { starter } = require('./starter')
//const { search } = require("./search")
//const { setState } = require("./state")

/*const toRoute = ({ VAR, STATE }) => {

    var pathname = window.location.pathname.split('/')
    pathname.slice(2)
    var queries = pathname.filter(path => path.includes('search?') ; path.includes('search?').split('search?')[1])
    pathname = pathname.filter(path => !path.includes('search?'))

    queries.map(query => {
        query = toObject({ VAR, STATE, string: query })
        search({ VAR, STATE, params: query })
    })

    var stateList = toObject({ VAR, STATE, string: pathname.join(';') || '' })
    setState({ VAR, STATE, params: stateList })

}*/

const route = async ({ VALUE, STATE, params, id }) => {

    clearIntervals({ VALUE, STATE, id })

    var {data} = await axios.get(`/route${params.route}`)
    document.body.innerHTML = data

    starter()
        
    window.history.replaceState({}, '', params.route)
}



/*const replaceRoute = ({ params }) => {

    var route = '/' + window.location.pathname.split('/')[1]
    var pathname = `/search?state=${params.state};${params.query}`

    window.history.replaceState(null, "New Page Title", route + pathname)

}



export const pushRoute = ({ params }) => {

    var route = window.location.pathname.split('/')

    // page name
    var pathname = `/${route[1]}`
    route = route.slice(2)

    // search queries
    var queries = route.filter(route => route.includes('search?'))
    route = route.filter(route => !route.includes('search?'))
    queries.map(query => {
        pathname += `/${query}`
    })

    // states
    var states = toObject({ string: route.join(';') })
    states = states.state || {}
    states = { ...states, ...params.state }

    pathname += '/'

    states = Object.entries(states)
    states.map(([key, value], index) => {
        pathname += `state.${key}=${value}`
        if (index < states.length - 1) pathname += ';'
    })

    window.history.replaceState(null, "New Page Title", pathname)

}*/

module.exports = {route}
},{"./clearIntervals":20,"./starter":53}],49:[function(require,module,exports){
const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")

const setContent = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var value = ''
    if (params) value = params.value || params.content || ''

    // for specific case: VAR.data was equal to [], then updated to ['value'] =>
    if (Array.isArray(value))
        if (value.length === 1 && isNaN(local.derivations.slice(-1)[0])) {
            value = value[0]
            local.derivations.push(0)
        }

    if (typeof value !== 'string' && typeof value !== 'number') return

    // not loaded yet
    if (!local.element) return

    if (local.type === 'Input' || local.type === 'TextInput') local.element.value = value || ''
    else if (local.type === 'Text' || local.type === 'Label' || local.type === 'Header') local.element.innerHTML = value || ''
    else if (local.type === 'UploadInput') local.element.value = value || null

    // set parent data the same as child data
    if (isEqual(local.parent.derivations, local.derivations) && isEqual(local.data, local.parent.data)) {

        // set derivations
        if (Array.isArray(local.data))
            if (isNaN(local.derivations.slice(-1)[0]))
                local.derivations.push(0)

        // set data
        local.data = value

        local.parent.data = local.data
        local.parent.DATA = local.DATA
        local.parent.derivations = local.derivations

    } else {

        // set derivations
        if (Array.isArray(local.data))
            if (isNaN(local.derivations.slice(-1)[0]))
                local.derivations.push(0)

        // set data
        local.data = value
    }

    isArabic({ VALUE, params: { value }, id })
}

module.exports = {setContent}
},{"./isArabic":41,"./isEqual":42}],50:[function(require,module,exports){
const setPosition = ({ VALUE, params, id }) => {
    var element = VALUE[id].element
    
    if (!VALUE[params.id]) return
    var list = VALUE[params.id].element
    var fin = list.getElementsByClassName('list-fin')[0]

    var top, left, bottom, distance, placement
    var height = list.offsetHeight
    var width = list.offsetWidth

    placement = list.placement || params.placement || 'right'
    distance = parseFloat(list.distance || params.distance || 10)

    if (placement === 'right') {

        left = element.getBoundingClientRect().right + distance
        top = element.getBoundingClientRect().top + element.clientHeight / 2 - height / 2

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = '-0.5rem'
            fin.style.top = 'unset'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0 0 0.4rem'
        }

    }

    else if (placement === 'left') {

        left = element.getBoundingClientRect().left - distance - width
        top = element.getBoundingClientRect().top + element.clientHeight / 2 - height / 2

        if (fin) {
            fin.style.right = '-0.5rem'
            fin.style.left = 'unset'
            fin.style.top = 'unset'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0.4rem 0 0'
        }
    }

    else if (placement === 'top') {

        top = element.getBoundingClientRect().top - height - distance
        left = element.getBoundingClientRect().left + (element.clientWidth / 2) - (width / 2)

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = 'unset'
            fin.style.top = 'unset'
            fin.style.bottom = '-0.5rem'
            fin.style.borderRadius = '0 0 0.4rem 0'
        }
    }

    else if (placement === 'bottom') {

        top = element.getBoundingClientRect().top + element.clientHeight + 10
        left = element.getBoundingClientRect().left + (element.clientWidth / 2) - (width / 2)

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = 'unset'
            fin.style.top = '-0.5rem'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0.4rem 0 0'
        }
    }

    bottom = top + height

    if (top - 10 < 0) {

        if (fin) fin.style.top = height / 2 - 5 - 10 + top + 'px'
        top = 10

    } else if (bottom + 10 > window.innerHeight) {

        if (fin) fin.style.top = height / 2 - (fin ? 5 : 0) + 10 + bottom - window.innerHeight + 'px'
        top = window.innerHeight - 10 - height

    } else {
        if (fin) fin.style.top = 'unset'
    }

    list.style.top = top + 'px'
    list.style.left = left + 'px'
}

module.exports = {setPosition}
},{}],51:[function(require,module,exports){
const { setData } = require("./data")
const { setStyle } = require("./style")
const { toString } = require("./toString")

const setValue = ({ VALUE, params, id }) => {
    
    if (!params.value) return
    var local = VALUE[id]

    Object.entries(params.value).map(([key, value]) => {
        if (key === 'data') setData({ VALUE, params: { value }, id })

        else if (key === 'DATA') {
            local[key] = value
            local.data = value
        }

        else if (key === 'element') {

            value = toString(value)
            var keys = value.split('=')[0].split('.')
            value = value.split('=')[1]

            keys.reduce((o, k, i) => {
                if (i === keys.length - 1) return o[k] = value
                return o[k]
            }, local.element)

        }

        else if (key === 'style') {
            setStyle({ VALUE, params: { style: value }, id })
        }

        else local[key] = value
    })
}

module.exports = {setValue}
},{"./data":30,"./style":55,"./toString":61}],52:[function(require,module,exports){
const { update } = require("./update")

const sort = ({ VALUE, STATE, params, id }) => {
    var local = VALUE[id]
    if (!local) return

    local.sort = local.sort === 'ascending' ? 'descending' : 'ascending'
    var path = params.path.split('.')
    var data = params.data || local.data || []

    data.sort((a, b) => {

        a = path.reduce((o, k) => o[k], a)
        if (a !== undefined) a = a.toString()

        b = path.reduce((o, k) => o[k], b)
        if (b !== undefined) b = b.toString()

        if (local.sort === 'ascending') {

            if (!isNaN(a)) return b - a

            if (a < b) return -1
            return a > b ? 1 : 0

        } else {

            if (!isNaN(a)) return a - b

            if (b < a) return -1
            return b > a ? 1 : 0
        }
    })

    if (params.id) {
        var id = params.id
        VALUE[id].DATA = data
        update({ VALUE, STATE, id })
    }

}

module.exports = {sort}
},{"./update":62}],53:[function(require,module,exports){

const starter = ({STATE, VALUE, id}) => {

    const { setEvents } = require("./event")
    const { setStyle } = require("./style")
    const { controls } = require('./controls')
    const { createControls } = require("./createControls")
    const { defaultInputHandler } = require("./defaultInputHandler")

    var local = VALUE[id]
    var element = document.getElementById(id)
    
    if (!element) return
    
    local.element = element

    if (local.link) local.element.addEventListener('click', (e) => e.preventDefault())

    // setStyles
    if (local.style) setStyle({ VALUE, STATE, id, params: {style: local.style} })

    // execute controls
    if (local.controls) controls({ VALUE, STATE, id })

    // lunch dropList
    if (local.dropList) createControls({ VALUE, STATE, id, params: {type: 'dropList'} })

    // input handlers
    defaultInputHandler({ VALUE, STATE, id })

    // mouseenter, click, mouseover...
    setEvents({VALUE, id})
    
    if (local.childrenSiblings) local.childrenSiblings.map(id => starter({STATE, VALUE, id}))

}

module.exports = {starter}
},{"./controls":23,"./createControls":25,"./defaultInputHandler":31,"./event":35,"./style":55}],54:[function(require,module,exports){
const setState = ({ STATE, params }) => {

    // push states to route
    if (params.route) pushRoute({ params })

    params.state ;
        Object.entries(params.state).map(([key, value]) => {
            STATE[key] = value
        })
}

module.exports = {setState}
},{}],55:[function(require,module,exports){
const {resizeInput} = require('./resize')

const setStyle = ({ VALUE, params, id }) => {

    var local = VALUE[id]
    if (!local) return

    if (!local.style) local.style = {}

    Object.entries(params.style).map(([key, value]) => {

        var timer = 0

        if ((value + '').includes('::')) {
            value = value + ''
            timer = value.split('::')[1]
            value = value.split('::')[0]
        }

        local[key + '-timer'] = setTimeout(() => {

            //VAR.style[key] = value
            if (local.element) local.element.style[key] = value
            else local.style[key] = value

        }, timer)
        if (key === 'width') resizeInput({ VALUE, id })
    })
}

const resetStyles = ({ VALUE, params, id }) => {
    
    var local = VALUE[id]
    if (!local.style.after) return

    params = { style: {} }

    Object.entries(local.style.after).map(([key]) => {

        if (local.style[key]) params.style[key] = local.style[key]
        else params.style[key] = null
    })

    setStyle({ VALUE, params, id })
    
}

const toggleStyles = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    if (local.afterStylesMounted) resetStyles({ VALUE, params, id })
    else mountAfterStyles({ VALUE, params, id })
};

const mountAfterStyles = ({ VALUE, params, id }) => {
    var local = VALUE[id]
    if (!local.style.after) return

    local.afterStylesMounted = true

    Object.entries(local.style.after).map(([key, value]) => {
        var timer = 0
        value = value + ''
        if (value.includes('::')) {
            timer = value.split('::')[1]
            value = value.split('::')[0]
        }
        local[key + '-timer'] = setTimeout(
            () => local.element.style[key] = value, timer
        )
    })
}

module.exports = {setStyle, resetStyles, toggleStyles, mountAfterStyles}
},{"./resize":47}],56:[function(require,module,exports){
const toArray = (data) => {
    return data !== undefined ? (Array.isArray(data) ? data : [data]) : []
}

module.exports = {toArray}
},{}],57:[function(require,module,exports){
const { derive } = require("./derive")
const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")
const { generate } = require("./generate")
const { duplicates } = require("./duplicate")
const { clone } = require("./clone")
const { overflow } = require("./overflow")
const { getParam } = require("./getParam")
const { toId } = require("./toId")

const toBoolean = ({ STATE, VALUE, e, string, params, id }) => {
    var mainId = id

    if (!string || typeof string !== 'string') return true
    var approval = true

    string.split(';').map(condition => {
        if (approval) {

            var local = VALUE[mainId]
            id = mainId

            // no condition
            if (condition === '') return

            var eq = condition.includes('=')
            var gt = condition.includes('>')
            if (gt) {
                var test = condition.split('>>')
                gt = test.find(exp => exp.includes('>'))
            }
            var gte = condition.includes('>=')
            var lt = condition.includes('<')
            var lte = condition.includes('<=')
            var noOperator = false

            if (!eq && !gt && !gte && !lt && !lte) noOperator = true

            if ((eq && !gte && !lte) || (!eq && !gt && !gte && !lt && !lte) || noOperator) {

                var minus, plus, times, division, notEqual

                condition = condition.split('=')
                var key = condition[0]
                var value = condition[1]

                // ex: key1=string1=string2=string3
                if (condition[2]) {
                    condition[1] = condition[1].split('||')

                    // ex: key1=value1||key2=value2||key3=value3
                    if (condition[1].length > 1) {
                        condition[2] = condition.slice(2, condition.length).join('=')
                        approval = toBoolean({ VALUE, STATE, e, string: `${condition[1][1]}=${condition[2]}`, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        value = condition[1][0]
                    }

                    // ex: key=value1=value2=value3
                    else {
                        condition[2] = condition.slice(2, condition.length).join('=')
                        approval = toBoolean({ VALUE, STATE, e, string: `${key}=${condition[2]}`, id })
                        if (!approval) return

                        // approval is true till now => keep going
                        value = condition[1]
                    }
                }


                else if (value) {

                    value = value.split('||')

                    if (value.length === 1) value = value[0]

                    // ex: key=value1||value2||value3
                    else if (value[1]) {

                        value[1] = value.slice(1, value.length).join('||')
                        var string = `${key}=${value[1]}`
                        approval = toBoolean({ VALUE, STATE, e, string, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        value = value[0]
                    }
                }


                if (key) {
                    key = key.split('||')

                    if (key.length === 1) key = key[0]

                    // ex. key1||key2||key3=value
                    else if (key[1]) {

                        key[1] = key.slice(1, key.length).join('||')
                        var string = `${key[1]}${value ? `=${value}` : ''}`
                        approval = toBoolean({ VALUE, STATE, e, string, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        key = key[0]
                    }
                }

                // operator has !
                if (key.includes('!')) {

                    if (key.split('!')[0]) key = key.split('!')[0]
                    else {
                        // !key => study key without value
                        value = undefined
                        key = key.split('!')[1]
                    }
                    notEqual = true
                }

                // id
                if (value && value.includes('>>')) {

                    id = value.split('>>')[1]
                    value = value.split('>>')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]

                }

                var local = VALUE[id]
                if (!local) return approval = false

                if (value) {
                    minus = value.split('--')[1]
                    plus = value.split('++')[1]
                    times = value.split('**')[1]
                    division = value.split('÷÷')[1] // hold Alt + 0247
                }

                if (plus) value = value.split('++')[0]
                if (minus) value = value.split('--')[0]
                if (times) value = value.split('**')[0]
                if (division) value = value.split('÷÷')[0]

                if (value && value.includes('.')) {

                    var value0 = value.split('.')[0]
                    var value1 = value.split(`${value0}.`)[1]

                    if (value0 === 'state') value = STATE[value1]
                    else if (value0 === 'value') value = value1.split('.').reduce((o, k) => o[k], local)
                    else if (value0 === 'className') value = document.getElementsByClassName(value1)[0]
                    else if (value0 === 'parent') value = local.parent[value1]
                    else if (value0 === 'window') {
                        if (value1 === 'element') value = STATE.window
                        else value = STATE.window[value1]
                    }

                }

                if (value === 'false') value = false
                else if (value === 'true') value = true
                else if (value === 'element') value = local.element
                else if (value === 'nextSibling') value = local.element.nextSibling
                else if (value === '[]') value = []
                else if (value === '[{}]') value = [{}]
                else if (value === 'string') value = ''
                else if (value === '{}') value = {}

                ///////////////////// key /////////////////////

                // id
                if (key.includes('>>')) {

                    id = key.split('>>')[1]
                    key = key.split('>>')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]
                }

                var local = VALUE[id]
                if (!local) return approval = false

                if (key === 'false' || key === 'undefined') {

                    key = generate()
                    local[key] = false

                } else if (key === 'true') {

                    key = generate()
                    local[key] = true
                }

                else if (key.includes('.')) {

                    var key0 = key.split('.')[0]
                    var key1 = key.split(`${key0}.`)[1]
                    if (key1 !== undefined) key1 = key1.split('.')

                    if (key0 === 'global') {
                        key0 = 'value'
                        local = VALUE[key1[0]]
                        key1 = key1.slice(1)
                    }

                    key = generate()

                    if (key0 === 'state') {
                        
                        var val = STATE[key1[0]]
                        key1 = key1.slice(1)

                        if (key1.length > 0) key1.reduce((o, k, i) => {
                            
                            if (i === key1.length - 1) return local[key] = o[k]
                            return o[k]
                        }, clone(val))

                        else local[key] = val
                    }

                    else if (key0 === 'value') {
                        
                        if (key1[0] === 'data') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(local.DATA, [...local.derivations, ...key1])[0]
                            local[key] = data

                            if (length) {
                                if (data) local[key] = data.length
                                else local[key] = false
                            }

                        }
                        else if (key1[0] === 'DATA') {

                            key1 = key1.slice(1)
                            var data = derive(local.DATA, key1)[0]
                            local[key] = data

                        }
                        else {

                            local[key] = local[key1[0]]
                            key1 = key1.slice(1)
                            local[key] = key1.reduce((o, k, i) => {

                                if (k === 'parent') {

                                    var parent = o.parent
                                    if (o.type === 'Input') parent = VALUE[parent].parent
                                    return VALUE[parent]
    
                                } else if (k === 'next' || k === 'nextSibling') {
    
                                    var nextSibling = o.element.nextSibling
                                    var id = nextSibling.id
    
                                    return VALUE[id]
    
                                } else if (k === 'prev' || k === 'prevSibling') {
    
                                    var previousSibling = o.element.previousSibling
                                    var id = previousSibling.id
    
                                    return VALUE[id]
    
                                }
                                
                                return o[k]
    
                            }, clone(local[key]))

                        }
                    }

                    else if (key0 === 'e') local[key] = e[key1]
                    else if (key0 === 'input') {

                        if (key1[0] === 'length') {

                            var length = 0
                            if (local.input.value) length = local.input.value.length
                            local[key] = length

                        }
                    }
                    else if (key0 === 'data') {

                        var data = derive(local.DATA, [...local.derivations, ...key1])[0]
                        local[key] = data
                    }
                    else if (key0 === 'DATA') {
                        var data = derive(local.DATA, key1)[0]
                        local[key] = data
                    }
                    else if (key0 === 'style') {
                        var style = local.style[key1]
                        local[key] = style
                    }
                    else if (key0 === 'const') {
                        
                        if (key1[0] === 'false' || key1[0] === 'undefined' || key1[0] === '') local[key] = false
                        else local[key] = key1.join('')
                    }
                    else if (key0 === 'parent') {

                        if (key1[0] === 'length') {
                            local[key] = local.parent.element.children.length
                        } else local[key] = local.parent[key]
                    }
                    else if (key0 === 'className') {
                        local[key] = document.getElementsByClassName(key1)[0]
                    }

                } else if (key === 'nextSibling') {
                    local[key] = local.element.nextSibling

                } else if (key === 'isArabic') {

                    key = generate()
                    var result = isArabic(local.type === 'Input' ? local.value : (local.type === 'Text' && local.text))
                    local[key] = result

                } else if (key === 'data') {

                    key = generate()
                    local[key] = derive(local.DATA, local.derivations)[0]

                } else if (key === 'duplicates') {

                    var data = getParam(`?${params}`, 'data=', false)
                    local[key] = duplicates({ VALUE, params: { data }, id })

                } else if (key === 'overflow') {

                    local[key] = overflow({ VALUE, id })[0]
                }

                if (plus) value = value + plus
                if (minus) value = value - minus
                if (times) value = value * times
                if (division) value = value / division

                if (!local) return approval = false
                if (value === undefined) approval = notEqual ? !local[key] : local[key]
                else {
                    if (value === 'undefined') value = undefined
                    if (value === 'false') value = false
                    if (value === 'true') value = true
                    approval = notEqual ? !isEqual(local[key], value) : isEqual(local[key], value)
                }

            } else if (gt && !gte) {

                var local = VALUE[id]
                var key = '', value = '', test = condition.split('>>')

                if (test[1]) {

                    test.map(exp => {
                        if (exp.includes('>')) {

                            exp = exp.split('>')
                            key += exp[0]
                            value += exp[1]

                        }
                        else if (!value) key += exp + '>>'
                        else value += '>>' + exp
                    })

                } else {
                    key = condition.split('>')[0]
                    value = condition.split('>')[1]
                }

                // id
                if (key.includes('>>')) {

                    id = key.split('>>')[1]
                    key = key.split('>>')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]
                }

                var local = VALUE[id]
                if (!local) return approval = false

                if (key === 'length') {

                    if (!local.element.parentElement) return approval = false
                    return approval = local.element.parentElement.children.length > value

                } else if (key.includes('.')) {

                    var key0 = key.split('.')[0]
                    var key1 = key.split(`${key0}.`)[1]
                    if (key1) key1 = key1.split('.')
                    key = generate()

                    if (key0 === 'state') {
                        local[key] = STATE[key1]
                    }

                    else if (key0 === 'value') {

                        if (key1[0] === 'data') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(local.DATA, [...local.derivations, ...key1])[0]
                            local[key] = data
                            if (length) local[key] = data.length

                        }
                        else if (key1[0] === 'DATA') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(local.DATA, key1)[0]
                            local[key] = data
                            if (length) local[key] = data.length

                        }
                        else if (key1[0] === 'length') {
                            local[key] = local.length
                        }
                        else {

                            var val = clone(local[key1[0]])
                            key1 = key1.slice(1)
                            local[key] = val
                            key1.reduce((o, k, i) => {
                                if (i === key1.length - 1) return local[key] = o[k]
                                return o[k]
                            }, val)

                        }
                    }
                }

                approval = local[key] > value
            }
        } else return approval
    })

    return approval
}

module.exports = {toBoolean}
},{"./clone":22,"./derive":32,"./duplicate":34,"./generate":39,"./getParam":40,"./isArabic":41,"./isEqual":42,"./overflow":44,"./toId":59}],58:[function(require,module,exports){
const { generate } = require('./generate')
const {toArray} = require('./toArray')

const toComponent = (obj) => {

    // class
    obj.class = obj.class || ''

    // id
    obj.id = obj.id || generate()

    // style
    obj.style = obj.style || {}
    if (!obj.style.after) obj.style.after = obj.style.after || {}

    // controls
    obj.controls = toArray(obj.controls) || []

    // input
    if (obj.type === 'Input') {
    obj.input = obj.input || { type: 'text'}
    obj.input.value = obj.input.value || ''
    }

    // text
    obj.text = obj.text || obj.data

    // icon
    obj.icon = obj.icon || { name: '', style: { after: {} } }
    obj.icon.style = obj.icon.style || { after: {} }
    obj.icon.style.after = obj.icon.style.after || {}

    // label
    if (obj.type === 'Label') {
    obj.label = obj.label || { text: false }
    }

    // children
    obj.children = obj.children || []

    // chevron
    obj.chevron = obj.chevron || { style: { after: {} } }
    obj.chevron.style = obj.chevron.style || { after: {} }
    obj.chevron.style.after = obj.chevron.style.after || {}

    // props
    obj.props = obj.props || {}

    // text
    obj.text = obj.text || ''

    // item
    obj.item = obj.item || {}

    // model
    obj.featured = obj.featured && 'featured'
    obj.model = obj.model || obj.featured || 'classic'

    // path
    obj.path = obj.path || ''

    // search
    obj.search = obj.search || {}

    // sort
    obj.sort = obj.sort || {}

    return obj
}

module.exports = {toComponent}
},{"./generate":39,"./toArray":56}],59:[function(require,module,exports){
const { generate } = require("./generate");
const { toArray } = require("./toArray")
const { toObject } = require("./toObject");

const toId = ({ VALUE, STATE, id, string }) => {
    var idList = [], local = VALUE[id]

    if (typeof string === 'object') return string;

    (string || id).split(';').map(id => {

        // id=id:index
        if (id.includes(':index')) {

            var index = local.index
            var parent = local.parent

            // search parent for index
            while (index === undefined) {
                index = VALUE[parent].index
                parent = VALUE[parent].parent
            }

            id = id.split(':index')[0] + ':' + index
        }

        // id=this
        if (id === 'this') idList.push(local.id)

        // id=siblings
        else if (id === 'siblings') {
            var siblings = VALUE[local.parent].childrenSiblings

            // remove current id from siblings
            siblings = siblings.filter(id => id !== id)

            // insert siblings
            idList.push(...siblings)
        }

        // id=value.path
        else if (id.includes('.')) {

            var k = generate()
            id = toObject({ VALUE, STATE, string: `${k}=${id}`, id: local.id })[k]
            idList.push(...toArray(id))
        }

        else idList.push(id)
    })

    return idList
}

module.exports = {toId}
},{"./generate":39,"./toArray":56,"./toObject":60}],60:[function(require,module,exports){
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { merge } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")
const _asset = require("../asset/_asset")
//import Assets from '../Assets/Assets'

const toObject = ({ VALUE, STATE, string, e, id }) => {

    if (typeof string !== 'string' || !string) return string || {}
    var params = {}

    string.split(';').map(param => {

        var key, value, minus, plus, times, division

        if (param.includes('=')) {

            key = param.split('=')[0]
            value = param.split(`${key}=`)[1]

        } else key = param

        // operator has !
        if (key.includes('!')) {

            if (key.split('!')[0]) key = key.split('!')[0]
            else key = key.split('!')[1]
            if (!value) value = false
        }

        // id
        if (value && value.includes('>>')) {

            id = value.split('>>')[1]
            value = value.split('>>')[0]

        }

        var local = VALUE[id]
        if (!local) return

        var path = typeof value === 'string' ? value.split('.') : []
        var keys = typeof key === 'string' ? key.split('.') : []

        if (value && value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {

            var k = generate()
            value = value.slice(1, value.length - 1).split(',')

            value = merge(
                value.map(
                    val => toObject({ VALUE, STATE, string: `${k}=${val}`, id })[k]
                )
            )

            value = value.filter(value => value)

        } else {

            if (value) {
                minus = value.split('--')[1]
                plus = value.split('++')[1]
                times = value.split('**')[1]
                division = value.split('÷÷')[1] // hold Alt + 0247
            }

            if (plus) {
                value = value.split('++')[0]
                if (!isNaN(plus)) plus = parseFloat(plus)
            } else if (minus) {
                value = value.split('--')[0]
                if (!isNaN(minus)) minus = parseFloat(minus)
            } else if (times) {
                value = value.split('**')[0]
                if (!isNaN(times)) times = parseFloat(times)
            } else if (division) {
                value = value.split('÷÷')[0]
                if (!isNaN(division)) division = parseFloat(division)
            }

            /* value */
            if (typeof value === 'boolean') { }
            else if (!isNaN(value)) value = parseFloat(value)
            else if (value === undefined || value === 'generate') value = generate()
            else if (value === 'undefined') value = false
            else if (value === 'input') value = local && local.element.value
            else if (value === 'false') value = false
            else if (value === 'true') value = true
            else if (value === 'string' || value === `''`) value = ''
            else if (value === 'object' || value === '{}') value = {}
            else if (value === 'array' || value === '[]') value = []
            else if (value === '[string]') value = ['']
            else if (value.includes('%20')) value = value.split('%20').join(' ')
            else if (path.length > 1) {

                if (path[0] === 'global') {
                    
                    local = VALUE[path[1]]
                    path = path.slice(2)
                    path.unshift('value')
                }

                if (path[0] === 'e') {

                    path = path.slice(1)
                    value = path.reduce((o, k) => o[k], e)

                } else if (path[0] === 'state') {

                    value = STATE[path[1]]

                    path = path.slice(2)
                    if (path.length > 0) {
                        if (value) value = merge(
                            value.map(
                                val => derive(val, path)[0] || (local.dropList ? `${derive(val, 'title')[0]}:readOnly` : '')
                            )
                        )
                    }

                } else if (path[0] === 'value') {

                    if (path[1] === 'data') {

                        var path = path.slice(2)
                        value = derive(local.DATA, [...local.derivations, ...path])[0]

                    } else {

                        path = path.slice(1)
                        value = path.reduce((o, k, i) => {

                            if (k === 'parent') {

                                var parent = o.parent
                                if (o.type === 'Input') parent = VALUE[parent].parent
                                return VALUE[parent]

                            } else if (k === 'next' || k === 'nextSibling') {

                                var nextSibling = o.element.nextSibling
                                var id = nextSibling.id

                                return VALUE[id]

                            } else if (k === 'prev' || k === 'prevSibling') {

                                var previousSibling = o.element.previousSibling
                                var id = previousSibling.id

                                return VALUE[id]

                            } else if (k === 'INPUT') {

                                var inputComps = [...o.element.getElementsByTagName(k)]
                                inputComps = inputComps.map(comp => VALUE[comp.id])
                                if (inputComps.length === 0) return inputComps[0]
                                else return inputComps

                            } else if (k === 'findidByData') {

                                var id = o.find(id => local.data === VALUE[id].text)
                                if (id) return id
                                else return id
                            }

                            return o[k]

                        }, clone(local))
                    }

                } else if (path[0] === 'DATA') {

                    value = value.split('.')
                    value.shift()
                    value = merge(toArray(derive(local.DATA, value, true)[0]))

                } else if (path[0] === 'const') {
                    value = value.split('const.')[1]

                } else if (path[0] === 'asset') {

                    value = value.split('asset.')[1]
                    var file = value.split('.')[0]
                    value = value.split(`${file}.`)[1]
                    var path = value.split('.')
                    value = _asset[file]
                    value = merge(
                        value.map(
                            val => derive(val, path)[0] || `${derive(val, 'title')[0]}:readOnly`
                        )
                    )

                } else if (path[0] === 'encoded') {
                    value = STATE.encoded[path[1]]

                } else if (path[0] === 'date') {
                    if (path[1] === 'today') {
                        value = new Date()
                        if (path[2]) {
                            value = addDays(new Date(), parseInt(path[2]))
                        }
                        value = value.toJSON().slice(0, -8)
                    }

                } else if (path[0] === 'generate') {
                    if (path[1] === 'capitalize') value = generate().toUpperCase()
                    else value = generate()
                }

                else if (path[0] === 'element') {
                    if (path[1] === 'className') {

                        value = document.getElementsByClassName(path[1])[0]
                        path = path.slice(2)
                        value = path.reduce((o, k) => o[k], value)

                    } else value = path.reduce((o, k) => o[k], local)

                }

                else if (path[path.length - 1] === 'parent') {
                    var element = VALUE[path[0]]
                    if (!element) value = path[0]
                    else value = element.parent
                }

            }


            if (plus) value = value + plus
            else if (minus) value = value - minus
            else if (times) value = value * times
            else if (division) value = value / division

        }

        // remove key from VAR
        if (key.split('.')[0] === 'remove') {

            key = key.split('.').slice(1)
            key.reduce((o, k, i) => {
                if (i === key.length - 1) return delete o[k]
                return o[k]
            }, local)
        }

        // object structure
        if (keys && keys.length > 1) {
            keys.reduce((obj, key, index) => {

                if (obj[key] !== undefined) {

                    if (index === keys.length - 1) {

                        obj[key] = toArray(obj[key])
                        return obj[key].push(value)

                    }

                } else {

                    if (index === keys.length - 1) return obj[key] = value
                    else obj[key] = {}

                }

                return obj[key]
            }, params)

        } else {

            if (params[key]) {

                params[key] = toArray(params[key])
                params[key].push(value)

            } else params[key] = value
        }
    })

    return params
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

module.exports = {toObject}
},{"../asset/_asset":1,"./clone":22,"./derive":32,"./generate":39,"./merge":43,"./toArray":56}],61:[function(require,module,exports){
const toString = (object) => {
    if (!object) return ''

    var string = ''
    var length = Object.entries(object).length

    Object.entries(object).map(([key, value], index) => {

        if (Array.isArray(value)) {
            string += `${key}=[${value.join(',')}]`
        }

        else if (typeof value === 'object') {
            var path = toString(value).split(';')
            string = path.map(path => path = `${key}.${path}`).join(';')
        }

        else string += `${key}=${value}`

        if (index < length - 1) string += ';'
    })

    return string || ''
}

module.exports = {toString}
},{}],62:[function(require,module,exports){
const { clearIntervals } = require("./clearIntervals")
const { starter } = require("./starter")

const update = ({ STATE, VALUE, params = {}, id }) => {

    const { createElement } = require("./createElement")

    var local = VALUE[id]
    if (!local) return

    if (params.parent) {

        var id = local.parent
        var local = VALUE[id]
        
        clearIntervals({ VALUE, id })
        removeId({ VALUE, id })

        var innerHTML = createElement({ STATE, VALUE, id })
        local.element.innerHTML = innerHTML

        if (local.childrenSiblings) local.childrenSiblings.map(id => starter({ STATE, VALUE, id }))

        console.log('#', Object.entries(VALUE).length)

    } else {

        clearIntervals({ VALUE, id })
        removeId({ VALUE, id })

        var innerHTML = createElement({ STATE, VALUE, id })
        local.element.innerHTML = innerHTML

        if (local.childrenSiblings) local.childrenSiblings.map(id => starter({ STATE, VALUE, id }))

        console.log('#', Object.entries(VALUE).length)
    }

}

const removeId = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.childrenSiblings && local.childrenSiblings.map(id => {
        if (!VALUE[id]) return
        removeId({ VALUE, id })
        delete VALUE[id]
    })
}

module.exports = {update, removeId}
},{"./clearIntervals":20,"./createElement":27,"./starter":53}],63:[function(require,module,exports){
const { generate } = require("./generate")
const { execute } = require("./execute")
const { toBoolean } = require("./toBoolean")
const { isEqual } = require("./isEqual")
const { clone } = require("./clone")
const { toObject } = require("./toObject")
const { setData } = require("./data")

const watch = ({ VALUE, STATE, controls, id }) => {
    var local = VALUE[id]

    var key = generate()
    var watch = controls.watch.toString()
    var names = watch.split('?')[0].split(';')

    // approval
    var conditions = watch.split('?')[2] || true
    var approved = toBoolean({ VALUE, STATE, string: conditions, id })
    if (!approved) return

    names.map(name => {

        // params
        var params = watch.split('?')[1]
        if (params) params = toObject({ VALUE, STATE, string: params, id })
        else params = {}

        var timer = 50
        if (name.includes('::')) {
            timer = name.split('::')[1]
            name = name.split('::')[0]
        }

        // value
        var value = name.split('.')[0] === 'value'

        // state
        var state = name.split('.')[0] === 'state'
        if (state) state = name.split('.')[1]
        else state = name
        if (state === 'true') state = false

        const myFn = () => {

            if (value) {

                value = toObject({ VALUE, STATE, string: `${key}=${name}`, id })[key]

                if (value !== undefined && !isEqual(value, local[`${name}-watch`])) {

                    if (value.nodeType === Node.ELEMENT_NODE) local[`${name}-watch`] = value
                    else local[`${name}-watch`] = clone(value)

                    if (name.split('.')[1] === 'data') setData({ VALUE, STATE, params: { value }, id })
                    if (params.once) clearInterval(local[`${watch}-timer`])

                    execute({ VALUE, STATE, controls, id })
                }

                // rewatch
                value = true

            } else if (state) {

                if (STATE[state] !== undefined && !isEqual(STATE[state], local[`${name}-watch`])) {

                    if (STATE[state].nodeType === Node.ELEMENT_NODE) local[`${name}-watch`] = STATE[state]
                    else local[`${name}-watch`] = clone(STATE[state])

                    if (params.once) STATE[state] = undefined
                    execute({ VALUE, STATE, controls, id })
                }

            } else execute({ VALUE, STATE, controls, id })

        }

        if (local[`${watch}-timer`]) clearInterval(local[`${watch}-timer`])
        local[`${watch}-timer`] = setInterval(myFn, timer)

    })
}

module.exports = {watch}
},{"./clone":22,"./data":30,"./execute":36,"./generate":39,"./isEqual":42,"./toBoolean":57,"./toObject":60}],64:[function(require,module,exports){
const {admin} = require('./admin')
const {home} = require('./home')
const {public} = require('./public')

module.exports = {
    admin, home, public
}
},{"./admin":65,"./home":66,"./public":67}],65:[function(require,module,exports){
const admin = { 
    views: ['adminNavbar', 'admin', 'productList']
}

module.exports = {admin}
},{}],66:[function(require,module,exports){
const home = {
    views: ['navbar']
}

module.exports = {home}
},{}],67:[function(require,module,exports){
const public = {
    views: ['dropList']
}

module.exports = {public}
},{}],68:[function(require,module,exports){
const {navbar} = require('./home/navbar')

const {searchBox} = require('./public/searchBox')
const {dropList} = require('./public/dropList')

const {adminNavbar} = require('./admin/navbar')
const {adminSidebar} = require('./admin/sidebar')
const {admin} = require('./admin/admin')
const {productList} = require('./admin/productList')
const {inventory} = require('./admin/inventory')
const {newProduct} = require('./admin/newProduct')

module.exports = {
    navbar, searchBox, adminNavbar, admin, adminSidebar, productList, inventory, newProduct, dropList
}
},{"./admin/admin":69,"./admin/inventory":70,"./admin/navbar":71,"./admin/newProduct":72,"./admin/productList":73,"./admin/sidebar":74,"./home/navbar":75,"./public/dropList":76,"./public/searchBox":77}],69:[function(require,module,exports){
const admin = {
    type: 'View',
    style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
    },
    controls: [{
        actions: [
            'search?state=category-list;query.collection=category',
            'search?state=brand-list;query.collection=brand'
        ]
    }],
    children: [{
        view: 'adminSidebar',
    }, {
        type: 'View',
        style: {
            width: '83%',
            height: '90%',
            overflowY: 'auto',
            marginLeft: '17%',
            padding: '2.5rem 3rem',
            flexDirection: 'column',
            transform: 'translateY(-110%)',
            position: 'fixed',
            after: {
                transform: 'translateY(0)',
            }
        },
        children: [{
            type: 'View?id=admin-view',
        }],
        controls: [{
            actions: 'setStyle?style.transition=transform 0.2s'
        }]
    }]
}

module.exports = {admin}
},{}],70:[function(require,module,exports){
const inventory = {
    type: 'View?remove.DATA',
    actions: 'search?state=products-table;query.collection=product;id=products-table',
    children: [{
        type: 'View?class=flex-box;style.width=100%;style.marginBottom=2.5rem;style.justifyContent=space-between',
        children: [{
            type: 'Text?text=Inventory;style.fontSize=1.8rem;style.color=#444;style.fontWeight=500'
        }, {
            type: 'View?class=flex-box',
            children: [{
                type: 'Button?text=Import;icon.name=download;style.marginRight=1rem',
                tooltip: 'Import multiple products to store at once',
            }, {
                type: 'Button?text=Export;icon.name=upload;style.marginRight=1rem',
                tooltip: 'Export all products to a CSV file',
            }, {
                type: 'Button?text=New Product;icon.name=plus;style.marginRight=1rem',
                tooltip: 'Create a new product',
                controls: [{
                    actions: 'createControls?type=toggleView;id=admin-view;view=newProduct'
                }]
            }]
        }]
    }, {
        type: 'View?style.padding=1rem;style.borderRadius=.5rem;style.border=1px solid #eee',
        children: [{
            type: 'View?class=flex-box;style.paddingBottom=1rem;style.borderBottom=1px solid #eee',
            children: [{
                type: 'Input?featured;!removable;!clearable;icon.name=search;icon.style.fontSize=1.8rem;search.id=products-table;search.state=products-table;search.query.collection=const.product;search.query.all=const.element.value;placeholder-ar=...إبحث عن الإسم، الصنف، الماركة',
                placeholder: 'Search by name, collection, category, brand...',
                style: {
                    height: '4rem',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    color: '#666',
                    borderRadius: '.75rem',
                    marginRight: '1rem'
                }
            }, {
                type: 'Button?text=Filter;icon.name=funnel',
            }, {
                type: 'Button?text=Collection;icon.name=ui-checks-grid',
            }, {
                type: 'Button?text=Category;icon.name=bookmarks;dropList.items=[Categories:readOnly,state.category-list.name];search.state=products-admin;search.query.collection=const.product;search.query.category=const.value.data',
            }, {
                type: 'Button?text=Brand;icon.name=bootstrap;dropList.items=[Brands:readOnly,state.brand-list.name]',
            }, {
                type: 'Button?text=View;icon.name=list-ul',
            }]
        }, {
            type: 'View?style.padding=1rem;style.width=100%',
            children: [{
                type: 'Table?style.width=100%',
                children: [{
                    type: 'Row?class=flex-box;toChildren.sort.state=products-table;toChildren.sort.id=products-table;toChildren.featured=true',
                    style: {
                        height: '5rem',
                        fontSize: '1.4rem',
                        fontWeight: '400',
                        color: '#444',
                        textAlign: 'Left',
                        borderBottom: '1px solid #eee',
                    },
                    children: [{
                        type: 'Header?text=Image;style.width=6rem',
                    }, {
                        type: 'Header?path=nameEn;text=Name;style.width=25rem',
                    }, {
                        type: 'Header?path=discount;text=Discount;style.wdith=6rem',
                    }, {
                        type: 'Header?path=priceLbp;text=Price;style.width=10rem;style.justifyContent=flex-end',
                    }, {
                        type: 'Header?path=countInStock;text=Stock;style.width=7rem;style.justifyContent=center',
                    }, {
                        type: 'Header?path=active;text=Status;style.width=10rem;style.justifyContent=center',
                    }, {
                        type: 'Header?text=Actions;style.flex=1',
                    }]
                }]
            }, {
                type: 'View?id=products-table;t=true',
                actions: [
                    'setStyle?style.display=none?!value.data',
                    'setStyle?style.display=initial;t?value.data',
                    'setValue?value.DATA=state.products-table?state.products-table'
                ],
                children: [{
                    type: 'View?class=flex-box',
                    style: {
                        textAlign: 'start',
                        justifyContent: 'flex-start',
                        fontSize: '1.4rem',
                        color: '#444',
                        borderBottom: '1px solid #eee',
                        height: '5rem',
                        after: { backgroundColor: '#daeffe' }
                    },
                    controls: [{
                        event: 'mouseenter',
                        actions: 'mountAfterStyles'
                    }, {
                        event: 'mouseleave',
                        actions: 'resetStyles'
                    }],
                    children: [{
                        type: 'View?path=image;class=flex-box;style.width=6rem',
                        children: [{
                            type: 'Image?style.borderRadius=5rem;style.maxWidth=4rem;style.maxHeight=4rem'
                        }]
                    }, {
                        type: 'View?path=nameEn;style.width=25rem',
                        children: [{
                            type: 'Text',
                            tooltip: '?text=value.element.innerHTML;placement=right;width=25rem',
                            style: {
                                width: 'fit-content',
                                maxWidth: '25rem',
                                overflowX: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }
                        }]
                    }, {
                        type: 'View?path=discount;class=flex-box;style.width=6rem;style.maxWidth=6rem;style.color=red',
                        children: [{
                            type: 'Text?style.marginRight=.1rem',
                        }, {
                            type: 'Text?text=%',
                            actions: `setValue?value.text=''?!value.data`
                        }]
                    }, {
                        type: 'View?path=priceLbp;class=flex-box;style.width=10rem;style.justifyContent=flex-end',
                        children: [{
                            type: 'Text?style.marginRight=.2rem',
                            actions: 'toNumber'
                        }, {
                            type: 'Text?text=L.L'
                        }]
                    }, {
                        type: 'View?path=countInStock;class=Stock flex-box;style.width=7rem',
                        children: [{
                            type: 'Text',
                        }]
                    }, {
                        type: 'View?path=active;class=Status flex-box;style.width=10rem',
                        children: [{
                            type: 'View?class=flex-box',
                            style: {
                                padding: '0.2rem 0.8rem',
                                backgroundColor: '#f0c040',
                                borderRadius: '1.5rem',
                                cursor: 'pointer'
                            },
                            children: [{
                                type: 'Text?text=Active;style.color=#fff;style.fontSize=1.2rem'
                            }, {
                                type: 'Icon?icon.name=chevron-down',
                                style: {
                                    color: '#fff',
                                    marginTop: '0.3rem',
                                    fontSize: '1.2rem',
                                    marginLeft: '0.4rem',
                                    transition: 'transform 0.2s'
                                }
                            }]
                        }]
                    }, {
                        type: 'View?class=flex-box;style.justifyContent=flex-end;style.flex=1',
                        children: [{
                            type: 'Icon?class=flex-box actions-list;icon.name=three-dots',
                            style: {
                                cursor: 'pointer',
                                color: '#116dff',
                                fontSize: '2.5rem',
                                height: '3.5rem',
                                width: '3.5rem',
                                borderRadius: '3.5rem',
                                transition: 'all 0.2s',
                                marginRight: '1rem',
                                after: { backgroundColor: '#fff' }
                            },
                            controls: [{
                                actions: 'createControls?type=list;id=actions-list;placement=left'
                            }, {
                                event: 'mouseenter',
                                actions: 'mountAfterStyles'
                            }, {
                                event: 'mouseleave',
                                actions: 'resetStyles'
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]
}

module.exports = {inventory}
},{}],71:[function(require,module,exports){
const adminNavbar = {
    type: 'View',
    style: {
        zIndex: '2',
        width: '100%',
        position: 'sticky',
        top: '0',
        backgroundColor: '#fff',
        boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
    },
    children: [{
        type: 'View?class=flex-box',
        style: {
            backgroundColor: '#fff',
            padding: '1rem'
        },
        children: [{
            type: 'Text?link=/;text=digiMatjar',
            style: {
                fontSize: '2.9rem',
                fontWeight: '900',
                color: '#ee384e',
                margin: '0 1rem',
                cursor: 'pointer'
            },
        }, {
            view: 'searchBox'
        }, {
            type: 'View?class=flex-box',
            style: {
                borderLeft: '1px solid #ddd',
                borderRight: '1px solid #ddd',
                marginRight: '0.5rem',
                padding: '0 1rem',
                height: '3.5rem'
            },
            children: [{
                type: 'Text?text=My sites: ',
                style: {
                    fontSize: '1.3rem',
                    color: '#bbb',
                    marginRight: '0.5rem',
                },
            }, {
                type: 'View?class=flex-box',
                style: {
                    cursor: 'pointer',
                    padding: '0.5rem 0'
                },
                controls: [{
                    event: 'click',
                    actions: 'toggleStyles???my-sites-chevron'
                }],
                children: [{
                    type: 'Text?text=Sarah Originals',
                    style: {
                        fontSize: '1.5rem',
                        color: '#444',
                        margin: '0 0.5rem',
                    },
                }, {
                    type: 'Icon?id=my-sites-chevron;icon.name=chevron-down;icon.code=fas',
                    style: {
                        color: '#444',
                        fontSize: '1.5rem',
                        transition: 'all 0.2s',
                        margin: '0 0.5rem',
                        marginTop: '0.2rem',
                        after: {
                            transform: 'rotate(180deg)'
                        }
                    }
                }]
            }]
        }, {
            type: 'Icon?tooltip=Notifications;icon.name=bell',
            style: {
                color: '#666',
                fontSize: '1.7rem',
                margin: '0 2rem',
                cursor: 'pointer',
                after: {
                    color: '#116dff'
                }
            },
            controls: [{
                event: 'mouseenter',
                actions: 'mountAfterStyles'
            }, {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }, {
            type: 'Icon?icon.name=megaphone;tooltip=New Releases',
            style: {
                color: '#666',
                fontSize: '1.7rem',
                marginRight: '2rem',
                cursor: 'pointer',
                after: {
                    color: '#116dff'
                }
            },
            controls: [{
                event: 'mouseenter',
                actions: 'mountAfterStyles'
            }, {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }, {
            type: 'Icon?icon.name=box;tooltip=Plans & Pricing',
            style: {
                color: '#666',
                fontSize: '1.7rem',
                marginRight: '2rem',
                cursor: 'pointer',
                after: {
                    color: '#116dff'
                }
            },
            controls: [{
                event: 'mouseenter',
                actions: 'mountAfterStyles'
            }, {
                event: 'mouseleave',
                actions: 'resetStyles'
            }]
        }, {
            type: 'Button?link=/signin;text=Sign In | Up;icon.name=person-circle;icon.style.fontSize=2.4rem;tooltip=Free Sign Up',
        }]
    }]
}

module.exports = {adminNavbar}
},{}],72:[function(require,module,exports){
const newProduct = {
    type: 'View?DATA={}',
    actions: 'setValue?value.element.scrollTop=0',
    children: [{
        type: 'View?class=flex-box;style.width=100%;style.marginBottom=2.5rem',
        children: [{
            type: 'Text?text=Create a New Product',
            style: { fontSize: '1.8rem', color: '#444', fontWeight: '500' }
        }, {
            type: 'View?class=flex-box;style.marginLeft=auto',
            children: [{
                type: 'Icon?class=flex-box;icon.name=three-dots',
                style: {
                    cursor: 'pointer',
                    color: '#116dff',
                    fontSize: '2.5rem',
                    height: '4rem',
                    width: '4rem',
                    borderRadius: '4rem',
                    transition: 'all 0.2s',
                    marginRight: '1rem',
                    after: { backgroundColor: '#eee' }
                },
                controls: [{
                    actions: 'createControls?state=actions-list;type=list;id=actions-list;placement=left'
                }, {
                    event: 'mouseenter',
                    actions: 'mountAfterStyles'
                }, {
                    event: 'mouseleave',
                    actions: 'resetStyles'
                }]
            }, {
                type: 'Button?icon.name=x-square;text=Cancel;style.marginRight=1rem',
                controls: [{ actions: 'createControls?type=toggleView;id=admin-view;view=inventory' }]
            }, {
                type: 'Button?icon.name=check2-square;text=Save',
            }]
        }]
    }, {
        type: 'View',
        style: {
            border: '1px solid #eee',
            borderRadius: '0.5rem',
            padding: '1rem',
            display: 'flex'
        },
        children: [{
            type: 'View',
            style: {
                display: 'flex',
                flexDirection: 'column',
                width: '75%',
                padding: '1rem',
            },
            children: [{
                type: 'Text?text=General Info',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
            }, {
                type: 'View',
                style: {
                    display: 'flex',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                },
                children: [{
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '1rem',
                    },
                    children: [{
                        type: 'Label?text=Product Name',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        }
                    }, {
                        type: 'View?actions=focus::200',
                        children: [{
                            type: 'Input?featured;lang=en;path=name;data=[]',
                            style: {
                                height: '4rem',
                                borderRadius: '0.25rem',
                                border: '0',
                                padding: '0.5rem',
                                width: '100%',
                                marginBottom: '1rem'
                            },
                        }]
                    }, {
                        type: 'Label?text=Suppliers',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                            marginTop: '1rem'
                        }
                    }, {
                        type: 'View',
                        children: [{
                            type: 'Input?featured;path=supplier;data=[]',
                            style: {
                                height: '4rem',
                                borderRadius: '0.25rem',
                                border: '0',
                                padding: '0.5rem',
                                width: '100%',
                                marginBottom: '1rem'
                            }
                        }]
                    }, {
                        type: 'Label?text=UPC;class=flex-box',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                            justifyContent: 'flex-start',
                            width: 'fit-content',
                            marginTop: '1rem'
                        },
                        tooltip: 'UPC is a 13 digits number which stands for Universal Product Code?placement=right;maxWidth=30rem'
                    }, {
                        type: 'Input?input.type=number;path=UPC',
                        style: {
                            height: '4rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }, {
                        type: 'Label?text=EAN;class=flex-box',
                        style: {
                            justifyContent: 'flex-start',
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                            width: 'fit-content'
                        },
                        tooltip: 'EAN is a 12 digits number which stands for European Article Number?placement=right;maxWidth=30rem'
                    }, {
                        type: 'Input?path=EAN;input.type=number',
                        style: {
                            height: '4rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }]
                }, {
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '1rem',
                    },
                    children: [{
                        type: 'Label?text=Product Description',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }, {
                        type: 'Paragraph?lang=en;path=description',
                        style: {
                            minHeight: '13rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }, {
                        type: 'Label?text=Notes',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }, {
                        type: 'Paragraph?lang=en;path=notes',
                        style: {
                            minHeight: '13rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }]
                }]
            }, {
                type: 'Text',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
                text: 'Uploads'
            }, {
                type: 'View',
                style: {
                    display: 'grid',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    gridTemplateColumns: 'calc(50% - 1rem) calc(50% - 1rem)'
                },
                children: [{
                    type: 'View',
                    children: [{
                        type: 'Text?text=Images',
                        style: {
                            color: '#444',
                            fontSize: '1.5rem',
                            marginBottom: '1rem'
                        }
                    }, {
                        type: 'Upload?upload.type=image;style.width=100%;path=images',
                    }]
                }, {
                    type: 'View',
                    children: [{
                        type: 'Text?text=Videos',
                        style: {
                            color: '#444',
                            fontSize: '1.5rem',
                            marginBottom: '1rem'
                        }
                    }, {
                        type: 'Upload?upload.type=video;style.width=100%;path=videos',
                    }]
                }]
            },

            // specs and options

            {
                type: 'Text?text=Specifications & Options',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
            }, {
                type: 'View',
                style: {
                    display: 'flex',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                    flexDirection: 'column'
                },
                children: [{
                    type: 'View?style.display=flex',
                    children: [{
                        type: 'View?style.flex=1',
                        children: [{

                            // spec

                            type: 'Text?text=Specifications;style.fontSize=1.5rem;style.width=fit-content',
                            tooltip: 'It is how product looks like, what are its features and functions...?placement=right;maxWidth=30rem'
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                marginTop: '2rem',
                                flex: '1',
                            },
                            children: [{
                                type: 'Text?text=Specification',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }, {
                                type: 'Text?text=Value',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }]
                        }, {
                            type: 'View',
                            style: {
                                flex: '1',
                                display: 'grid',
                                gap: '1rem',
                                marginBottom: '1rem'
                            },
                            children: [{
                                type: 'View?path=specifications;class=flex-box;data=[]',
                                actions: 'setState?state.spec-dup=value.id',
                                children: [{
                                    type: 'Input?featured;lang=en;!removable;!clearable;path=specification',
                                    style: {
                                        width: '100%',
                                        height: '4rem',
                                        borderRadius: '0.25rem',
                                        border: '0',
                                        padding: '0.5rem',
                                        color: '#444'
                                    },
                                    actions: 'setState?state.spec-dup-input=value.id',
                                }, {
                                    type: 'Text?text=:',
                                    style: {
                                        minWidth: '3rem',
                                        fontSize: '2.4rem',
                                        color: '#444'
                                    }
                                }, {
                                    type: 'Input?featured;lang=en;!removable;!clearable;path=value',
                                    style: {
                                        width: '100%',
                                        height: '4rem',
                                        borderRadius: '0.25rem',
                                        border: '0',
                                        padding: '0.5rem',
                                        color: '#444'
                                    }
                                }, {
                                    type: 'View?style.minWidth=3rem',
                                    children: [{
                                        type: 'Icon?icon.name=x',
                                        style: {
                                            fontSize: '2.2rem',
                                            color: '#444',
                                            cursor: 'pointer'
                                        },
                                        controls: [{
                                            event: 'click',
                                            actions: [
                                                'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                                `focus::100>>state.spec-dup-input`
                                            ]
                                        }]
                                    }]
                                }]
                            }]
                        }, {
                            type: 'View',
                            style: {
                                display: 'flex',
                                alignItems: 'center'
                            },
                            children: [{
                                type: 'Icon?icon.name=plus-circle-fill',
                                style: {
                                    fontSize: '2rem',
                                    margin: '0 1rem',
                                    color: '#444',
                                    cursor: 'pointer'
                                },
                                controls: [{
                                    event: 'click',
                                    actions: 'duplicate>>state.spec-dup;focus::100>>state.spec-dup-input'
                                }]
                            }, {
                                type: 'Text?text=Add New Specification',
                                style: {
                                    fontSize: '1.4rem',
                                    color: '#444',
                                }
                            }]
                        }]
                    }, {
                        type: 'Text?style.height=100%;style.width=1px;style.backgroundColor=#ddd;style.margin=0 1rem'
                    }, {
                        type: 'View',
                        style: {
                            flex: '1',
                            marginLeft: '1rem'
                        },
                        children: [{
                            type: 'Text?text=Options',
                            style: {
                                fontSize: '1.5rem',
                                width: 'fit-content'
                            },
                            tooltip: 'If the product come in options like size: small, medium, large | color: red, blue, yellow...?placement=right;maxWidth=30rem'
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                marginTop: '2rem',
                                flex: '1',
                            },
                            children: [{
                                type: 'Text?text=Group',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }, {
                                type: 'Text?text=Options',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }]
                        }, {
                            type: 'View',
                            style: {
                                flex: '1',
                                display: 'grid',
                                gap: '1rem',
                                marginBottom: '1rem'
                            },
                            children: [{
                                type: 'View?path=options;class=flex-box;data=[]',
                                actions: 'setState?state.options-dup=value.id',
                                style: { flex: '1' },
                                children: [{
                                    type: 'Input?featured;!removable;!clearable;lang=en;path=group',
                                    actions: 'setState?state.options-input=value.id',
                                    style: {
                                        width: '100%',
                                        height: '4rem',
                                        borderRadius: '0.25rem',
                                        border: '0',
                                        padding: '0.5rem',
                                        color: '#444',
                                        alignSelf: 'flex-start',
                                    }
                                }, {
                                    type: 'Text?text=:',
                                    style: {
                                        minWidth: '3rem',
                                        fontSize: '2.4rem',
                                        color: '#444',
                                        height: '4rem',
                                        alignSelf: 'flex-start',
                                    }
                                }, {
                                    type: 'View',
                                    style: {
                                        width: '100%',
                                        display: 'grid',
                                        gap: '1rem'
                                    },
                                    children: [{
                                        type: 'Input?featured;lang=en;path=options;data=[]'
                                    }]
                                }, {
                                    type: 'View',
                                    style: {
                                        minWidth: '3rem',
                                    },
                                    children: [{
                                        type: 'Icon?icon.name=x',
                                        style: {
                                            fontSize: '2.2rem',
                                            color: '#444',
                                            cursor: 'pointer'
                                        },
                                        controls: [{
                                            event: 'click',
                                            actions: [
                                                'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                                `focus::100>>state.options-input`
                                            ]
                                        }]
                                    }],
                                }]
                            }, {
                                type: 'View',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                children: [{
                                    type: 'Icon',
                                    style: {
                                        fontSize: '2rem',
                                        margin: '0 1rem',
                                        color: '#444',
                                        cursor: 'pointer'
                                    },
                                    icon: { name: 'plus-circle-fill' },
                                    controls: [{
                                        event: 'click',
                                        actions: 'duplicate>>state.options-dup;focus::100>>state.options-input'
                                    }]
                                }, {
                                    type: 'Text?text=Add New Group',
                                    style: {
                                        fontSize: '1.4rem',
                                        color: '#444',
                                    }
                                }]
                            }]
                        }, {

                        }]
                    }],
                }]
            }, {

                // Inventory & Pricing

                type: 'Text',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
                text: 'Inventory & Pricing'
            }, {
                type: 'View',
                style: {
                    display: 'flex',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                    flexDirection: 'column'
                },
                children: [{

                    // Inventory

                    type: 'Text',
                    style: {
                        fontSize: '1.5rem',
                        width: 'fit-content'
                    },
                    text: 'Inventory',
                }, {
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        marginTop: '2rem',
                    },
                    children: [{
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Options',
                            tooltip: 'Set price according to product options. Press enter to add new option. Press X to delete it'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Status',
                            tooltip: 'Set item available for purchase or block ordering it'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content',
                            },
                            text: 'SKU',
                            tooltip: 'A “Stock Keeping Unit” is a unique code you can create for each product or variant you have in your store. Using SKUs helps with tracking inventory.?maxWidth=25rem'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content',
                                whiteSpace: 'nowrap'
                            },
                            text: 'Count in stock',
                            tooltip: 'Quantity available in stock'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Minimum',
                            tooltip: 'Minimum amount of items allowed per order'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Maximum',
                            tooltip: 'Maximum amount of items allowed per order'
                        }]
                    }, {
                        type: 'Text',
                        style: { minWidth: '3rem' }
                    }]
                }, {
                    type: 'View',
                    style: {
                        display: 'grid',
                        gap: '1rem',
                        flex: '1'
                    },
                    children: [{
                        type: 'View?path=inventory;data=[]',
                        actions: 'setState?state.inventory-dup=value.id',
                        style: {
                            flex: '1',
                            display: 'flex',
                        },
                        children: [{
                            type: 'View',
                            style: {
                                width: '100%',
                                display: 'grid',
                                gap: '1rem',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: `Input?readOnly;featured;dropList.items=[Options:readOnly,All,const.DATA.options.options.name];path=options;data=[]`,
                                actions: 'setState?state.inventory-input=value.id',
                            }]
                        }, {
                            class: 'status-input',
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?input.type=text;path=status;readOnly;input.value=In stock;dropList.items=[Status:readOnly,In stock,Out of stock,Pre Order]',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                },
                                controls: [{
                                    actions: 'createControls?type=dropList'
                                }]
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?input.type=number;path=SKU',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?featured;input.type=number;path=count-in-stock;input.value=1;unit=unit;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?input.type=number;path=min-per-order;input.value=1',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                            },
                            children: [{
                                type: 'Input?input.type=number;path=max-per-order;input.value=10',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                height: '4rem',
                                minWidth: '3rem',
                            },
                            children: [{
                                type: 'Icon?icon.name=x',
                                style: {
                                    fontSize: '2.2rem',
                                    color: '#444',
                                    cursor: 'pointer'
                                },
                                controls: [{
                                    event: 'click',
                                    actions: [
                                        'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                        `focus::100>>state.inventory-input`
                                    ]
                                }]
                            }],
                        }]
                    }],
                }, {
                    type: 'View',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem'
                    },
                    children: [{
                        type: 'Icon?icon.name=plus-circle-fill',
                        style: {
                            fontSize: '2rem',
                            margin: '0 1rem',
                            color: '#444',
                            cursor: 'pointer'
                        },
                        controls: [{
                            event: 'click',
                            actions: 'duplicate>>state.inventory-dup;focus::100>>state.inventory-input'
                        }]
                    }, {
                        type: 'Text',
                        text: 'Add More To Inventory',
                        style: {
                            fontSize: '1.4rem',
                            color: '#444',
                        }
                    }]
                }, {

                    // divider

                    type: 'Text',
                    style: {
                        height: '1px',
                        width: '100%',
                        backgroundColor: '#ddd',
                        margin: '2.5rem 0'
                    }
                }, {

                    // Pricing

                    type: 'Text',
                    style: {
                        fontSize: '1.5rem',
                        width: 'fit-content'
                    },
                    text: 'Pricing',
                }, {
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        marginTop: '2rem',
                    },
                    children: [{
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Options',
                            tooltip: 'Set price according to product options. Press enter to add new option. Press X to delete it'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text?text=Cost',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '6rem',
                        },
                        children: [{
                            type: 'Text?text=Selling',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '200%',
                        },
                        children: [{
                            type: 'Text?text=Exchange Rate',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                        }]
                    }, {
                        type: 'Text',
                        style: { minWidth: '6rem' }
                    }]
                }, {
                    type: 'View',
                    style: {
                        display: 'grid',
                        gap: '1rem',
                        flex: '1',
                    },
                    children: [{
                        type: 'View?path=pricing',
                        actions: 'setState?state.pricing-dup=value.id',
                        style: {
                            flex: '1',
                            display: 'flex',
                        },
                        children: [{
                            type: 'View',
                            style: {
                                width: '100%',
                                display: 'grid',
                                gap: '1rem',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: `Input?readOnly;model=featured;dropList.items=[Options:readOnly,All,const.DATA.options.options.name];path=options;data=[]`,
                                actions: 'setState?state.pricing-input=value.id',
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?model=featured;input.type=number;path=cost;currency=$;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '6rem'
                            },
                            children: [{
                                type: 'Input?input.type=number;path=selling;model=featured;currency=$;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                            },
                            children: [{
                                type: 'Input?input.type=number;path=exchange-rate.global;model=featured;currency=$;input.value=1;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            class: 'flex-box',
                            type: 'Text?text==',
                            style: {
                                minWidth: '3rem',
                                height: '4rem',
                                fontSize: '1.8rem',
                                color: '#444',
                                alignSelf: 'flex-start'
                            }
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                            },
                            children: [{
                                type: 'Input?featured;input.type=number;path=exchange-rate.local;currency=L.L;input.value=13000;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                height: '4rem',
                                minWidth: '3rem',
                            },
                            children: [{
                                type: 'Icon?icon.name=x',
                                style: {
                                    fontSize: '2.2rem',
                                    color: '#444',
                                    cursor: 'pointer'
                                },
                                controls: [{
                                    event: 'click',
                                    actions: [
                                        'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                        `focus::100>>state.pricing-input`
                                    ]
                                }]
                            }],
                        }]
                    }]
                }, {
                    type: 'View',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem'
                    },
                    children: [{
                        type: 'Icon',
                        style: {
                            fontSize: '2rem',
                            margin: '0 1rem',
                            color: '#444',
                            cursor: 'pointer'
                        },
                        icon: { name: 'plus-circle-fill' },
                        controls: [{
                            event: 'click',
                            actions: 'duplicate>>state.pricing-dup;focus::100>>state.pricing-input'
                        }]
                    }, {
                        type: 'Text',
                        text: 'Add More Option Prices',
                        style: {
                            fontSize: '1.4rem',
                            color: '#444',
                        }
                    }]
                }]
            }]
        }, {

            // Collections & Categories

            type: 'View',
            style: {
                width: '25%',
                padding: '1rem'
            },
            children: [{
                type: 'Text',
                style: {
                    display: 'flex',
                    fontSize: '1.6rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
                text: 'Collections & Categories'
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [{
                    class: 'flex-box',
                    type: 'View',
                    style: {
                        justifyContent: 'space-between',
                        height: '3.5rem'
                    },
                    children: [{
                        type: 'Text?text=Categories',
                        style: {
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }, {
                        type: 'Icon?icon.name=plus-circle-fill;dropList.id=category-view',
                        style: {
                            fontSize: '2rem',
                            color: '#444',
                            cursor: 'pointer'
                        }
                    }]
                }, {
                    type: 'View?id=category-view;dropList.items=[Categories:readOnly,state.category-list.name];dropList.path=category',
                    style: {
                        display: 'inline-flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        gap: '1rem',
                    },
                    children: [{
                        type: 'Input?featured;readOnly;path=category;!clearable;!duplicatable;data=[]',
                        style: {
                            width: 'fit-content',
                            height: '3rem',
                        },
                        actions: 'setStyle?style.display=none?!data||data=[]',
                    }]
                }]
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [{
                    class: 'flex-box',
                    type: 'View',
                    style: {
                        height: '3.5rem',
                        width: '100%',
                        justifyContent: 'space-between',
                    },
                    children: [{
                        type: 'Text?text=Collections',
                        style: {
                            fontSize: '1.5rem',
                            color: '#444',
                        }
                    }, {
                        type: 'Icon?icon.name=plus-circle-fill;dropList.id=collections-view',
                        style: {
                            fontSize: '2rem',
                            color: '#444',
                            cursor: 'pointer'
                        }
                    }]
                }, {
                    type: 'View?id=collections-view;dropList.items=[Collections:readOnly,state.collections-list.name];dropList.path=collections',
                    style: {
                        display: 'inline-flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        width: '100%',
                    },
                    children: [{
                        type: 'Input?model=featured;readOnly;path=collections;!clearable;!duplicates;data=[]',
                        style: {
                            width: 'fit-content',
                            height: '3rem'
                        },
                        actions: 'setValue?value.style.display=none?!data||data=[]'
                    }]
                }]
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                },
                children: [{
                    type: 'View',
                    style: {
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                    },
                    children: [{
                        type: 'Text?text=Brand',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }]
                }, {
                    type: 'Input?model=featured;path=brand;dropList.items=[Brands:readOnly,state.brand-list.name];!duplicate;readOnly'
                }]
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                },
                children: [{
                    type: 'Text?text=Tags',
                    style: {
                        height: '3rem',
                        fontSize: '1.5rem',
                        color: '#444',
                        marginRight: '1rem'
                    },
                }, {
                    type: 'Input?featured;path=tags;data=[]',
                    style: {
                        width: 'fit-content',
                        minWidth: '6rem',
                        height: '3rem',
                        marginRight: '.5rem',
                        marginBottom: '.5rem'
                    },
                }]
            }, {

                // Offers & Promotions

                type: 'Text?text=Offers & Promotions',
                style: {
                    display: 'flex',
                    fontSize: '1.6rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '2rem',
                },
                children: [{
                    type: 'Item?icon.name=gift;text=Offers;style.fontSize=1.5rem;icon.style.fontSize=1.6rem;style.after.color=#0d6efd',
                    controls: [{
                        actions: 'createControls?type=windowView;view=Offer'
                    }]
                }]
            }]
        }]
    }]
}

module.exports = {newProduct}
},{}],73:[function(require,module,exports){
const productList = {
    type: 'List?id=side-bar-products-list',
    children: [{
        type: 'Item?text=Inventory;icon.name=grid',
        controls: [{
            event: 'click',
            actions: 'createActions?type=item;state=side-bar-item;id=side-bar-products-id',
        }, {
            actions: 'createControls?type=toggleView;id=admin-view;view=inventory'
        }]
    }, {
        type: 'Item?text=Brands;icon.name=bootstrap',
    }, {
        type: 'Item?text=Packages;icon.name=box-seam',
    }]
}

module.exports = {productList}
},{}],74:[function(require,module,exports){
const adminSidebar = {
    type: 'View?toChildren.state=side-bar-item;toChildren.featured',
    style: {
        padding: '0.5rem 0.2rem',
        boxShadow: '0px 0px 5px 0px #888',
        clipPath: 'inset(0 -5px 0 0)',
        width: '17%',
        position: 'fixed',
        height: '90%',
        display: 'display',
        flexDirection: 'column',
    },
    children: [{
        type: 'Item?text=Dashboard;icon.name=house-door;chevron.style.display=none;mountOnLoad'
    }, {
        type: 'Item?text=Orders;icon.name=cart3',
    }, {
        type: 'Item?text=Products;icon.name=tag;id=side-bar-products-id',
        controls: [{
            actions: 'createControls?type=list;id=side-bar-products-list',
        }]
    }, {
        type: 'Item?text=Collections;icon.name=collection',
    }, {
        type: 'Item?text=Customers;icon.name=people',
    }, {
        type: 'Item?text=Shipping & Delivery;icon.name=truck',
    }, {
        type: 'Item?text=Finance & Payment;icon.name=credit-card',
    }, {
        type: 'Item?text=Marketing & SEO;icon.name=megaphone',
    }, {
        type: 'Item?text=Analytics & Reports;icon.name=clipboard-data'
    }, {
        type: 'Item?text=Inbox;icon.name=chat-left-text',
    }, {
        type: 'Item?text=Website;icon.name=layout-wtf',
    }, {
        type: 'Item?text=Settings;icon.name=gear',
    }]
}

module.exports = {adminSidebar}
},{}],75:[function(require,module,exports){
const navbar = {
    type: 'View?class=nav-bar',
    style: {
        zIndex: '2',
        width: '100%',
        position: 'sticky',
        top: '0',
        backgroundColor: '#fff',
        boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
    },
    children: [{
        type: 'View?class=main-nav-bar flex-box',
        style: {
            backgroundColor: '#fff',
            padding: '1rem',
        },
        children: [{
            type: 'Text?link=/;text=digiMatjar;class=nav-bar-logo',
            style: {
                fontSize: '2.9rem',
                fontWeight: '900',
                color: '#ee384e',
                margin: '0 1rem',
                cursor: 'pointer'
            }
        }, {
            view: 'searchBox'
        }, {
            type: 'Button?link=/signin;text=Sign In | Up;icon.name=person-circle;icon.style.fontSize=2.4rem;tooltip=Free Sign Up',
        }, {
            type: 'Text?class=vertical-stroke-nav-bar',
            style: {
                backgroundColor: '#e0e0e0',
                height: '2.5rem',
                width: '1px',
                margin: '0 0.8rem'
            }
        }, {
            type: 'Icon?link=/cart;icon.name=cart3;tooltip=Cart Quick View',
            style: {
                color: '#666',
                fontSize: '2.4rem',
                margin: '0 1rem',
                cursor: 'pointer'
            }
        }]
    }]
}

module.exports={navbar}
},{}],76:[function(require,module,exports){
const dropList = {
    class: 'box-shadow',
    type: 'View?id=drop-list',
    style: {
        transform: 'scale(0.8)',
        opacity: '0',
        position: 'fixed',
        padding: '0.5rem',
        minWidth: '15rem',
        maxWidth: '20rem',
        maxHeight: '25rem',
        minHeight: '3rem',
        overflowY: 'auto',
        borderRadius: '0.5rem',
        backgroundColor: '#fff',
        transition: 'opacity 0.1s, transform 0.1s, max-height 0.2s, top 0.1s',
        pointerEvents: 'none',
        zIndex: '-1',
        after: {
            zIndex: '9999',
            transform: 'scale(1)',
            opacity: '1',
            pointerEvents: 'auto'
        }
    },
    controls: [{
        event: 'mouseover>>body',
        actions: `resetStyles::200??!mouseenter;!state.drop-list-mouseenter`
    }]
}

module.exports = {dropList}
},{}],77:[function(require,module,exports){
const searchBox = {
    type: 'View',
    style: {
        flex: '1',
        margin: '0 1rem',
        height: '4.5rem',
    },
    children: [{
        type: 'View?class=overlay;id=search-mini-page-overlay',
        style: {
            zIndex: '-1',
            transition: '0.2s',
            display: 'none',
            after: {
                opacity: '1::50',
                display: 'flex'
            }
        },
        controls: [{
            event: 'click',
            actions: [
                'resetStyles???search-mini-page;search-mini-page-results',
                'setStyle?style.opacity=0;style.display=none::250'
            ],
        }]
    }, {
        type: 'View?id=search-mini-page',
        style: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0f0f0',
            borderRadius: '.75rem',
            flex: '1',
            top: '1rem',
            position: 'initial::210',
            width: '60rem',
            after: {
                backgroundColor: '#fff',
                boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
                position: 'absolute',
                width: '60rem',
            }
        },
        children: [{
            type: 'View?class=flex-box',
            style: {
                flex: '1',
                borderRadius: '.75rem',
                height: '4.5rem',
                justifyContent: 'flex-start',
            },
            children: [{
                type: 'Icon?icon.name=search',
                style: {
                    margin: '0 1rem',
                    color: '#888',
                    fontSize: '1.8rem',
                }
            }, {
                type: 'Input?placeholder=Search for product, category, brand...',
                style: {
                    flex: '1',
                    height: '4.5rem',
                    backgroundColor: 'inherit',
                    border: '0',
                    color: '#444',
                    fontSize: '1.4rem',
                    outline: 'none',
                },
                controls: [{
                    event: 'focusin',
                    actions: 'mountAfterStyles???search-mini-page-overlay;search-mini-page;search-mini-page-results'
                }, {
                    event: 'input',
                    actions: 'search?query.collection=all;query.name=input||query.nameEn=input;state=search-input?value.input'
                }]
            }]
        }, {
            type: 'View?id=search-mini-page-results',
            style: {
                width: '100%',
                padding: '0 1rem',
                transition: '.2s',
                height: '0',
                after: {
                    height: '15rem',
                }
            },
            children: [{
                type: 'Text?class=divider;style.margin=0'
            }]
        }]
    }]
}

module.exports = {searchBox}
},{}]},{},[5]);
