import fs from 'fs';

// METODO THEN E CATCH

// function trataErro(erro) {
//     throw new Error(chalk.red(erro.message));
// }

// function lerArquivo(caminho) {
//     fs.readFile(caminho, "utf-8", (erro, texto) => {
//         if (erro) {
//             // throw new Error(chalk.red(erro.message));
//             trataErro(erro);
//         }
//         console.log(texto);
//     })
// }

// function lerArquivo(caminho) {
//     fs.promises
//         .readFile(caminho, "utf-8")
//         .then(texto => { console.log(texto) })
//         // .catch(erro => { trataErro(erro) })
//         .catch(erro => { throw new Error(chalk.red(erro.message)) })
// }

// METODO ASYNC E AWAIT

export default async function lerArquivo(caminho) {
    try {
        const texto = await fs.promises.readFile(caminho, "utf-8");
        return extrairLinks(texto);
    } catch(erro) {
        throw new Error(erro.message);
        //trataErro(erro);
    }
}

function extrairLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^#$\s].[^\s]*)\)/gm;
    const resultados = [];
    let temp;

    while ((temp = regex.exec(texto)) !== null) {
        resultados.push({
            [temp[1]]: temp[2]
        })
    }
    return resultados.length === 0 ? "Não há links." : resultados;
}
