export const validateMessage = (maxLength: number) => (value: string) => {
    let error
    if (!value) {
        error = 'Required'
    } else if (value.length > maxLength) {
        error = `Message must have ${maxLength} symbols or less`
    }
    return error
}