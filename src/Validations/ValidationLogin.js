export const validateEmail = (value) => {
    let error
    if (!value) {
        error = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address'
    }
    return error
}
export const validatePassword = (minLength) => (value) => {
    let error
    if (!value) {
        error = 'Required'
    } else if (value.length < minLength) {
        error = `Password must have at least ${minLength} symbols`
    }
    return error
}