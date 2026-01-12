// 1. Instância simples (sem interface)
const html5QrCode = new Html5Qrcode("leitor");

async function iniciarCameraAutomaticamente() {
    try {
        // Busca as câmeras disponíveis
        const devices = await Html5Qrcode.getCameras();
        
        if (devices && devices.length > 0) {
            // No celular, tentamos encontrar a câmera traseira (geralmente a última da lista)
            // No PC, ele pegará a única disponível
            const cameraId = devices.length > 1 ? devices[devices.length - 1].id : devices[0].id;

            await html5QrCode.start(
                cameraId, 
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                (decodedText) => {
                    // Sucesso
                    document.getElementById('resultado').innerHTML = `Resultado: ${decodedText}`;
                    html5QrCode.stop();
                },
                (errorMessage) => {
                    // Erros de leitura (ignorar para não poluir o log)
                }
            );
        } else {
            console.error("Nenhuma câmera encontrada.");
        }
    } catch (err) {
        console.error("Erro ao iniciar automaticamente:", err);
    }
}

// 2. Garante que o DOM está pronto e limpa qualquer resquício de botão
window.addEventListener('load', () => {
    const container = document.getElementById('leitor');
    container.innerHTML = ""; // Limpa qualquer botão que a lib tente criar
    iniciarCameraAutomaticamente();
});

