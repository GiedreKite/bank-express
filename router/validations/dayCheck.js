
export function dayOfBirthCheck(str) {

    function textContainsOnlyAllowedSymbols(str, abc) {
        return str.split('').map(s => abc.includes(s)).every(x => x === true);
    }
    
    const dayOfBirthMinSize = 1;
    const dayOfBirthMaxSize = 31;
    const dayOfBirthAllowed = '0123456789';
    let errorMessage = '';

    if (typeof str !== 'number') {
        errorMessage = 'Trūksta gimimo mėnesio';
    } else if (str < dayOfBirthMinSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne ankstesni nei ${dayOfBirthMinSize}`;
    } else if (str > dayOfBirthMaxSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne vėlesni nei ${dayOfBirthMaxSize}`;
    } else if (!textContainsOnlyAllowedSymbols(str, dayOfBirthAllowed)) {
        errorMessage = `Gimimo mėnesyje rasta neleistinas simbolis"${firstNonAllowedSymbol(str, dayOfBirthAllowed)}"`;
    }
    return errorMessage;
}