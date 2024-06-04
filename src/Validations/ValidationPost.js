export const validatePost = (maxLength) => (value) => {
    let error
    if (!value) {
        error = 'Required'
    } else if (value.length > maxLength) {
        error = `Post must have ${maxLength} symbols or less`
    }
    return error
}