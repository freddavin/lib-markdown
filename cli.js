import chalk from "chalk";
import lerArquivo from "./index.js";
import validarLinks from "./http-validacao.js";

const caminho = process.argv;

console.log(chalk.blue.bgWhite('### LIB-MARKDOWN ###'));

async function processaTexto(caminho) {
    let resultado = await lerArquivo(caminho[2]);

    if (caminho[3] === "-v") {
        resultado = await validarLinks(resultado);
    }
    console.log(resultado);
}

processaTexto(caminho);