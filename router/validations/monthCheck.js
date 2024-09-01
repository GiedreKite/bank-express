
export function monthOfBirthCheck(str) {

    function textContainsOnlyAllowedSymbols(str, abc) {
        return str.split('').map(s => abc.includes(s)).every(x => x === true);
    }
    
    const monthOfBirthMinSize = 1;
    const monthOfBirthMaxSize = 12
    const monthOfBirthAllowed = '0123456789';
    let errorMessage = '';

    if (typeof str !== 'number') {
        errorMessage = 'Trūksta gimimo mėnesio';
    } else if (str < monthOfBirthMinSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne ankstesni nei ${monthOfBirthMinSize}`;
    } else if (str > monthOfBirthMaxSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne vėlesni nei ${monthOfBirthMaxSize}`;
    } else if (!textContainsOnlyAllowedSymbols(str, monthOfBirthAllowed)) {
        errorMessage = `Gimimo mėnesyje rasta neleistinas simbolis"${firstNonAllowedSymbol(str, monthOfBirthAllowed)}"`;
    }
    return errorMessage;
}