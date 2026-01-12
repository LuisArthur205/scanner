// Configuração do Scanner
const SCANNER = new Html5QrcodeScanner("leitor", {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    // A propriedade abaixo ajuda a manter a preferência, mas o render é quem manda
    rememberLastUsedCamera: true, 
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
});

function teveSucesso(resultado) {
    document.getElementById('resultado').innerHTML = `Resultado: ${resultado}`;
    // Para parar de escanear após o sucesso
    SCANNER.clear();
}

function exibirMensagemDeErro(erro) {
    // Erros de permissão ou câmera não encontrada aparecem aqui
    console.warn(`Erro na leitura: ${erro}`);
}

// O segredo está no facingMode: "environment" (câmera traseira)
// Nota: O Html5QrcodeScanner as vezes ignora o facingMode se houver câmera salva no cache.
SCANNER.render(teveSucesso, exibirMensagemDeErro);
