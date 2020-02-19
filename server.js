const cor = "branco"
const tamanho = 2.5

function verificarSeCopoEstaSujo(sujo) {
    return `o copo: ${sujo}`
}

const copo = {
    cor,
    tamanho,
    verificarSeCopoEstaSujo
}
console.log(copo.verificarSeCopoEstaSujo("está sujo"))