export const replaceUrl =(link)=>{
    return link.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, "")
}