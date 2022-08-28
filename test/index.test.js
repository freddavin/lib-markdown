import lerArquivo from "../index.js";

const arrayResultado = [
    {
        FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList"
    }
]

describe("lerArquivo::", () => {
    it("deve ser uma função", () => {
        expect(typeof lerArquivo).toBe("function");
    })

    it("deve retonar um array com um resultado", async () => {
        expect(await lerArquivo("./test/arquivos/texto1.md"))
            .toEqual(arrayResultado);
    })

    it("deve retornar que não há links", async () => {
        expect(await lerArquivo("./test/arquivos/texto1-semlinks.md"))
            .toBe("Não há links.");
    })

    it("deve retornar um erro de caminho de arquivo invalido", async () => {
        await expect(lerArquivo("./test/arquivos/texto-errado.md"))
            .rejects.toThrow(Error);
    })
})
