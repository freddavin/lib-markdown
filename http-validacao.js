import fetch from "node-fetch";

function tratarErro(erro) {
    throw new Error(erro.message);
}

async function checarStatus(arrayDeLinks) {
    try {
        const arrayDeStatus = await Promise.all(arrayDeLinks.map(async link => {
            const res = await fetch(link);
            return `${res.status} - ${res.statusText}`;
        }))
        return arrayDeStatus;
    } catch (erro) {
        tratarErro(erro);
    }
}

function gerarArrayLinks(arrayDeLinks) {
    return arrayDeLinks.map(link => Object.values(link).join());
}

function juncaoLinkStatus(arrayDeLinks, arrayDeStatus) {
    const resultado = arrayDeLinks.map(obj => {
        obj.status = arrayDeStatus.shift();
        return obj;
    })
    return resultado;
}

export default async function validarLinks(arrayDeLinks) {
    try {
        const links = gerarArrayLinks(arrayDeLinks);
        const arrayDeStatus = await checarStatus(links);
        const resultado = juncaoLinkStatus(arrayDeLinks, arrayDeStatus);
        return resultado;
    } catch (erro) {
        tratarErro(erro);
    }
}