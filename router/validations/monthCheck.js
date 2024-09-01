
export function monthOfBirthCheck(str) {

    
    const monthOfBirthMinSize = 1;
    const monthOfBirthMaxSize = 12;
    let errorMessage = '';

    if (typeof str !== 'number') {
        errorMessage = 'Trūksta gimimo mėnesio';
    } else if (str < monthOfBirthMinSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne ankstesni nei ${monthOfBirthMinSize}`;
    } else if (str > monthOfBirthMaxSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne vėlesni nei ${monthOfBirthMaxSize}`;
    } else if (Math.ceil(str) !== str) {
        errorMessage = `Gimimo mėnuo, turi būti sveikas skačius`;
    }
    return errorMessage;
}