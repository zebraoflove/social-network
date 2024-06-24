export const validateLink = (value: string) => {
    let error
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i')
    if (value && !urlPattern.test(value)) {
        error = 'Invalid url format'
    }
    return error
}
export const validateRequiredInfo =  (value: string) => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}