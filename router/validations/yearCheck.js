
export function yearOfBirthCheck(str) {

    function textContainsOnlyAllowedSymbols(str, abc) {
        return str.split('').map(s => abc.includes(s)).every(x => x === true);
    }
    
    const date = new Date();
    const y = date.getFullYear();
    const m = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    const d = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const maxDate = `${y}-${m}-${d}`;

    const yearOfBirthMinSize = 1900;
    const yearOfBirthMaxSize = (date.getFullYear()-18);
    const yearOfBirthAllowed = '0123456789';
    let errorMessage = '';

    if (typeof str !== 'number') {
        errorMessage = 'Trūksta gimimo metų';
    } else if (str < yearOfBirthMinSize) {
        errorMessage = `Gimimo metai, turi būti ne ankstesni nei ${yearOfBirthMinSize}`;
    } else if (str > yearOfBirthMaxSize) {
        errorMessage = `Gimimo metai, turi būti ne vėlesni nei ${yearOfBirthMaxSize}`;
    } else if (!textContainsOnlyAllowedSymbols(str, yearOfBirthAllowed)) {
        errorMessage = `Gimimo metuose rasta neleistinas simbolis"${firstNonAllowedSymbol(str, yearOfBirthAllowed)}"`;
    }
    return errorMessage;
}