export const validateFindPage = (pageCount: number) => (value: number) => {
    let error
    if (!value) {
        error = 'Required'
    } else if (!/^[0-9]{1,10}$/i.test(value.toString())) {
        error = 'Incorrect symbols'
    } else if (value < 1 || value > pageCount) {
        error = 'Out of bounds'
    }
    return error
}
export const validateFindTerm = (value: string) => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}