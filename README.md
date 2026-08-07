# ⚽ LF Sábado Manager | PWA de Gestão Esportiva

👉 **[ACESSAR O APLICATIVO ONLINE CLICANDO AQUI](https://raneeralmeida.github.io/lf-sabado-manager/index.html)**

Uma aplicação Web Progressiva (PWA) desenvolvida para automatizar, balancear e gerenciar partidas de futebol amador. O projeto substitui o tradicional "caderninho" por um sistema inteligente que equilibra as equipes através de algoritmos, gerencia o tempo de quadra e aplica as regras de permanência automaticamente.

🚀 Principais Funcionalidades:

Algoritmo de Sorteio Inteligente: Utiliza um método de "Duplo Embaralhamento" (Double Shuffle) cruzado com o nível técnico de cada jogador (0 a 5) para gerar equipes matematicamente equilibradas a cada novo sorteio.

Gestão de Partida e Cronômetro: Painel em tempo real para controle de tempo, placar e substituições dinâmicas de jogadores em quadra com atualização imediata no painel.

Inteligência de Regras (VAR): O sistema calcula automaticamente quem permanece na quadra em caso de empate, aplicando regras condicionais complexas:

Fila Cheia: Se há 8+ jogadores aguardando, ambos os times saem.

Primeira Partida: Em caso de empate, decisão vai para os pênaltis.

Vantagem do Rei da Quadra: O time que já estava ganhando tem vantagem no empate.

Persistência de Dados (Artilharia): Utilização da API localStorage para salvar o histórico de gols marcados, gerando um ranking automático que é limpo apenas na virada do dia.

Integração e Compartilhamento: Geração de relatórios formatados em texto (times e artilharia) que são injetados na área de transferência (clipboard API) para fácil compartilhamento via WhatsApp.

PWA Ready: Suporte a instalação direta no smartphone e cache de assets via Service Workers (manifest.json e sw.js).

💻 Tecnologias Utilizadas:

HTML5 (Semântico)

Tailwind CSS (Estilização utilitária e responsividade)

JavaScript (ES6+, manipulação de DOM, LocalStorage, Clipboard API)

PWA (Progressive Web App)
