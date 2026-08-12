# ⚽ LF Sábado Manager | PWA de Gestão Esportiva

👉 **[ACESSAR O APLICATIVO ONLINE](https://raneeralmeida.github.io/lf-sabado-manager/index.html)**

Uma aplicação Web Progressiva (PWA) desenvolvida do zero para automatizar, organizar e gerenciar partidas de futebol amador. O projeto substitui o tradicional "caderninho" por um sistema inteligente, rápido e projetado especificamente para a usabilidade à beira da quadra.

---

## 🚀 Principais Funcionalidades e Soluções Técnicas

Este projeto foi construído focando em resolver problemas reais do uso de dispositivos móveis em ambientes externos, aplicando conceitos sólidos de engenharia de front-end:

*   **Sorteio Cego (Fisher-Yates):** Implementação de um algoritmo de duplo embaralhamento (Double Shuffle) para garantir equipes formadas de maneira 100% aleatória e imparcial, com separação prévia de goleiros.
*   **Recuperação de Estado (Anti-Zumbi):** Uso intensivo da API `localStorage` para criar backups contínuos e automáticos do estado da aplicação. Se o navegador do celular encerrar a página por falta de memória RAM, o usuário retorna exatamente de onde parou (times, placar e tempo mantidos).
*   **Screen Wake Lock API:** Integração com a API nativa do navegador para impedir que a tela do dispositivo bloqueie ou apague enquanto o cronômetro da partida estiver em andamento.
*   **Gestão Dinâmica de Equipes:** Regras de negócio flexíveis que permitem adicionar "atrasildos" (jogadores que chegam após o sorteio) diretamente para a fila de espera, convertendo-os automaticamente em times oficiais ao atingir o limite de vagas. Permite também substituições manuais via modal.
*   **Single-Screen UI (Compactação):** Interface de controle da partida redesenhada para caber em uma única tela de celular, eliminando a necessidade de rolagem (scroll) durante o jogo para marcação de gols e controle de tempo.
*   **Integração e Compartilhamento:** Uso da `Clipboard API` para gerar e exportar relatórios formatados (escalações e artilharia) diretamente para o WhatsApp.
*   **PWA Completo:** Arquitetura Progressive Web App configurada com `manifest.json`, Service Workers (`sw.js`) com injeção de cache e banner de instalação nativo, permitindo o funcionamento 100% offline.

---

## 💻 Tecnologias Utilizadas

*   **HTML5** (Semântico e acessível)
*   **Tailwind CSS** (Estilização utilitária, responsividade extrema e design system)
*   **JavaScript Vanilla (ES6+)** (Lógica de negócio, algoritmos de sorteio, manipulação de DOM)
*   **Web APIs:** `Service Workers`, `Wake Lock API`, `Clipboard API`, `Web Storage API`

---

## 📱 Como testar o aplicativo

1. Acesse o link oficial: [LF Sábado Manager](https://raneeralmeida.github.io/lf-sabado-manager/index.html)
2. **No Computador:** Pressione `F12` e ative a visualização de dispositivos móveis (Device Toolbar) para a experiência ideal.
3. **No Celular:** Abra o link pelo navegador (Chrome/Safari). Uma notificação sugerindo a instalação do aplicativo surgirá após alguns segundos. Ao instalar, o app passará a rodar em tela cheia e sem depender de internet.

---

## 👨‍💻 Autor

Desenvolvido por **Râneer Almeida**.
*   **LinkedIn:** [linkedin.com/in/raneer-antonio-de-almeida](https://www.linkedin.com/in/raneer-antonio-de-almeida)
*   **Projeto criado para portfólio de transição de carreira para a área de Análise e Desenvolvimento de Sistemas.**
