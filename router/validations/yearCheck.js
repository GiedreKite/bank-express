
export function yearOfBirthCheck(str) {

    
    const date = new Date();
    const y = date.getFullYear();


    const yearOfBirthMinSize = 1900;
    const yearOfBirthMaxSize = (y-18);
    const yearOfBirthAllowed = '0123456789';
    let errorMessage = '';

    if (typeof str !== 'number') {
        errorMessage = 'Trūksta gimimo metų';
    } else if (str < yearOfBirthMinSize) {
        errorMessage = `Gimimo metai, turi būti ne ankstesni nei ${yearOfBirthMinSize}`;
    } else if (str > yearOfBirthMaxSize) {
        errorMessage = `Gimimo metai, turi būti ne vėlesni nei ${yearOfBirthMaxSize}`;
    }  else if (Math.ceil(str) !== str) {
        errorMessage = `Gimimo metai, turi būti sveikas skačius`;
    }
    return errorMessage;
}