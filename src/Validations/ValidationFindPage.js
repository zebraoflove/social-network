export const validateFindPage = (pageCount) => (value) => {
    let error
    if (!value) {
        error = 'Required'
    } else if (!/^[0-9]{1,10}$/i.test(value)) {
        error = 'Incorrect symbols'
    } else if (value < 1 || value > pageCount) {
        error = `Out of bounds`
    }
    return error
}