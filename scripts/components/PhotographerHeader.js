export function PhotograherHeader(photographer){
    const header = document.createElement("header")
    header.innerHTML = photographer.name

    return header
}