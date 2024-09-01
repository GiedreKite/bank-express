
export function dayOfBirthCheck(str) {

    
    const dayOfBirthMinSize = 1;
    const dayOfBirthMaxSize = 31;
    let errorMessage = '';

    if (typeof str !== 'number') {
        errorMessage = 'Trūksta gimimo mėnesio';
    } else if (str < dayOfBirthMinSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne ankstesni nei ${dayOfBirthMinSize}`;
    } else if (str > dayOfBirthMaxSize) {
        errorMessage = `Gimimo mėnuo, turi būti ne vėlesni nei ${dayOfBirthMaxSize}`;
    } else if (Math.ceil(str) !== str) {
        errorMessage = `Gimimo diena, turi būti sveikas skačius`;
    }
    return errorMessage;
}