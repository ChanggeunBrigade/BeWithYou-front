export const validatePhNum = number => {
    const regex = /^[0-9\b -]{0,13}$/;
}

export const autoHipen10 = text => {
    text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
}

export const autoHipen13 = text => {
    text.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}