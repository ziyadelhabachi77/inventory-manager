

export const formatDate = (date) => {
    const newDate = new Date(date) 

    return newDate.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: '2-digit',
        minute: "2-digit",
        hour12: true
    }).replace(',', "")
}


export const formatDateForOrder = (date) => {
    const newDate = new Date(date)

    return newDate.toLocaleString("en-US",{
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).replace(',', '')
}