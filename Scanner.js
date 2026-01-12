// 1. Inicializa o objeto apenas apontando para o ID da sua div
const html5QrCode = new Html5Qrcode("leitor");

const config = { 
    fps: 10, 
    qrbox: { width: 250, height: 250 } 
};

// Função de sucesso
function teveSucesso(resultado) {
    document.getElementById('resultado').innerHTML = `Resultado: ${resultado}`;
    // Opcional: Para o scanner após ler um código
    html5QrCode.stop();
}

// 2. Função que força a abertura da câmera
function iniciarScannerAutomatico() {
    // 'environment' tenta abrir a câmera traseira diretamente
    html5QrCode.start(
        { facingMode: "environment" }, 
        config, 
        teveSucesso
    ).catch(err => {
        // Trata erro caso a permissão seja negada globalmente no navegador
        console.error("Erro ao iniciar automaticamente: ", err);
    });
}

// 3. Dispara assim que a página carregar
window.addEventListener('DOMContentLoaded', iniciarScannerAutomatico);
