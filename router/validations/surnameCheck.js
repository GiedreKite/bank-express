
export function surnameCheck(str) {

    function textContainsOnlyAllowedSymbols(str, abc) {
        return str.split('').map(s => abc.includes(s)).every(x => x === true);
    }
    
    function firstNonAllowedSymbol(str, abc) {
        return str.split('').filter(s => !abc.includes(s))[0] ?? '';
    }
    const surnameMinSize = 2;
    const surnameMaxSize = 20;
    const surnameAllowedABC = 'aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ';
    let errorMessage = '';

    if (typeof str !== 'string') {
        errorMessage = 'Trūksta vardo';
    } else if (str.length < nameMinSize) {
        errorMessage = `Vardas per trumpas, turi būti minimum ${surnameMinSize} raidės`;
    } else if (str.length > nameMaxSize) {
        errorMessage = `Vardas per ilgas, negali viršyti ${surnameMaxSize} raidžių`;
    } else if (!textContainsOnlyAllowedSymbols(str, surnameAllowedABC)) {
        errorMessage = `Varde rasta neleistina raidė "${firstNonAllowedSymbol(str, surnameAllowedABC)}"`;
    } else if (str[0].toUpperCase() !== str[0]) {
        errorMessage = `Vardas turi prasidėti didžiąja raide`;
    }

    return errorMessage;
}