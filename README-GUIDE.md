### Funcionalidades Frontend

## 🏠 Página Home

A página inicial é responsável por buscar e exibir os produtos disponíveis. Ao ser carregada, faz uma requisição à API (/api/products), armazenando os dados no estado com useState, enquanto o useEffect garante que a busca ocorra apenas na primeira renderização. Em caso de erro, uma mensagem é exibida no console.

### Componentes utilizados
- Banner: exibe mensagem de boas-vindas e incentiva a exploração dos produtos  
- ProductList: renderiza a listagem de produtos na tela  

Essa página funciona como porta de entrada da aplicação, exibindo os produtos de forma dinâmica a partir dos dados recebidos da API.

---

## 🧭 Componente Header

O Header gerencia a navegação principal da aplicação, oferecendo acesso à Home, carrinho e área do usuário.

### Funcionalidades
- Navegação entre páginas com react-router-dom  
- Exibição de login ou informações do usuário autenticado  
- Controle de logout integrado ao CartContext  
- Leitura dos dados do usuário no localStorage  
- Mensagem de boas-vindas exibida uma vez por sessão  
- Controle de menu dropdown e estados internos com useState  

O componente centraliza a navegação e o gerenciamento da autenticação, contribuindo para a experiência do usuário na aplicação.

---

## 🛒 Página Carrinho (Cart)

A página Cart exibe e gerencia os produtos adicionados ao carrinho, permitindo ao usuário revisar e finalizar suas compras.

### Funcionalidades
- Listagem de itens com imagem, nome, tamanho e preço  
- Seleção de produtos para compra com checkbox  
- Controle de quantidade em tempo real  
- Remoção individual ou limpeza completa do carrinho  
- Cálculo automático do total com base nos itens selecionados  
- Compra de item único ou finalização de múltiplos produtos  

### Controle e integração
- Usuários não autenticados são redirecionados para a Home  
- Integração com CartContext para gerenciamento global do carrinho  
- Navegação utilizando react-router-dom  
- Tratamento e correção automática das URLs das imagens dos produtos  

O componente centraliza toda a gestão do carrinho, proporcionando uma experiência dinâmica e organizada para o usuário.

---

## 🔐 Página Login

A página Login autentica o usuário, permitindo acesso a funcionalidades protegidas da aplicação, como o carrinho de compras.

### Funcionalidades
- Login com email e senha  
- Validação das credenciais via API (/usuario/login)  
- Exibição de mensagens de erro em caso de falha na autenticação  

### Processo de autenticação
- Armazena token e dados do usuário no localStorage  
- Atualiza o estado global via CartContext para carregar o carrinho corretamente  
- Registra login recente no sessionStorage  
- Dispara o evento global userLoggedIn para atualizar componentes da interface, como o Header  

### Navegação
- Redireciona para a Home após login  
- Links para cadastro, recuperação de senha e retorno à página inicial  

### Segurança
- Isola os dados do carrinho por usuário, evitando compartilhamento indevido entre sessões  

A página é essencial para o controle de acesso e personalização da experiência do usuário na aplicação.

---

## 🎯 Componente Banner

O Banner exibe uma seção de destaque na página inicial, apresentando a identidade visual da aplicação e incentivando a exploração dos produtos.

### Características
- Componente funcional simples, sem estados ou efeitos  
- Exibe a logo da aplicação, título principal e subtítulo  
- Estilizado via `Banner.css`  
- Utiliza `import.meta.env.BASE_URL` para carregar a imagem da logo  

Tem como objetivo tornar a interface inicial mais atrativa e acolhedora para o usuário.

---

## 📦 Componente ProductList

O ProductList é responsável por renderizar a lista de produtos da aplicação, recebendo os dados via props e utilizando o componente ProductCard para exibir cada item.

### Funcionalidades
- Validação do array de produtos recebido  
- Exibição de mensagem quando não houver produtos disponíveis  
- Renderização dinâmica dos produtos utilizando map  
- Integração com o componente ProductCard  
- Tratamento automático das URLs das imagens dos produtos  

#### Detalhes
- Corrige caminhos de imagens antigos ou locais, garantindo compatibilidade com o servidor de imagens da aplicação  
- Utiliza identificadores únicos (key) para otimizar a renderização dos itens no React  

O componente centraliza a exibição dos produtos, garantindo uma listagem dinâmica, organizada e compatível com os dados recebidos do backend.

---

## 🛍️ Componente ProductCard

O ProductCard exibe as informações de um produto e permite que o usuário selecione um tamanho, adicione o item ao carrinho ou realize a compra diretamente.

### Funcionalidades
- Exibição de imagem, nome, descrição e preço do produto  
- Seleção de tamanho por meio de um carrossel interativo  
- Validação da seleção de tamanho antes de adicionar ao carrinho ou comprar  
- Exibição de mensagens de erro quando nenhum tamanho é selecionado  

### Integração
- Utiliza o CartContext para adicionar produtos ao carrinho e verificar a autenticação do usuário  
- Redireciona usuários não autenticados para a página de login  
- Utiliza react-router-dom para navegação entre páginas  
- Tratamento automático das URLs das imagens dos produtos  

### Ações
- Adicionar produto ao carrinho com o tamanho selecionado  
- Compra imediata com redirecionamento para o checkout  

### Comportamentos adicionais
- Fecha a seleção ao clicar fora do componente  
- Reseta a seleção após adicionar ao carrinho ou finalizar a compra  
- Exibe imagem padrão em caso de falha no carregamento da imagem do produto  

O componente centraliza as principais interações de compra da aplicação, proporcionando uma experiência dinâmica e intuitiva para o usuário.

---

##🛒 Contexto CartContext

O CartContext é responsável por gerenciar o estado global do carrinho e da sessão do usuário, compartilhando dados e funcionalidades entre todos os componentes da aplicação por meio da Context API.

### Funcionalidades
- Armazenamento e gerenciamento dos produtos adicionados ao carrinho  
- Controle da identificação do usuário autenticado  
- Persistência dos dados do carrinho no localStorage  
- Exibição de notificações ao adicionar produtos  
- Atualização e remoção de itens do carrinho  
- Limpeza completa do carrinho  

### Controle de usuário
- Mantém carrinhos separados para usuários autenticados e visitantes  
- Realiza a sincronização e mesclagem do carrinho de visitante após o login  
- Permite atualização da sessão do usuário e controle de logout  

### Integração
- Utiliza localStorage para persistência dos dados entre sessões  
- Disponibiliza estados e funções para toda a aplicação por meio do Context API  

O contexto centraliza toda a lógica de gerenciamento do carrinho e da sessão do usuário, garantindo persistência, organização e consistência dos dados durante a navegação na aplicação.

---

## 🔔 Componente CartMessage

O CartMessage exibe uma notificação temporária sempre que um produto é adicionado ao carrinho, fornecendo feedback visual imediato ao usuário.

### Funcionalidades
- Exibição de mensagem de confirmação com imagem, nome, tamanho e preço do produto  
- Fechamento automático da notificação após alguns segundos  
- Possibilidade de fechamento manual da mensagem  

### Integração
- Utiliza o CartContext para acessar e controlar o estado das notificações  
- Utiliza react-router-dom para navegação até a página do carrinho  

### Ações
- Fechar a notificação manualmente  
- Redirecionar o usuário para o carrinho através da opção "Ver carrinho"  

### Comportamentos adicionais
- Não é renderizado quando não existe nenhuma notificação ativa  
- Utiliza useEffect para controlar o tempo de exibição da mensagem  

O componente melhora a experiência do usuário ao fornecer uma confirmação visual rápida e intuitiva após a adição de produtos ao carrinho.

---

## 💳 Página Checkout

A página Checkout exibe os detalhes do produto selecionado e permite ao usuário configurar a compra antes da finalização.

### Funcionalidades
- Exibição da imagem, nome e preço do produto  
- Seleção de tamanho com destaque visual  
- Controle de quantidade de itens  
- Cálculo automático do valor total da compra  

### Finalização
- Valida a seleção do tamanho antes de permitir a finalização da compra  
- Redireciona para a página de finalização enviando os dados do produto selecionado  
- Utiliza o componente BtnFinalizarCompra para padronizar a ação de compra  

### Controle e integração
- Recebe os dados do produto por meio do react-router-dom  
- Mantém os dados da compra utilizando localStorage para evitar perda de informações durante a navegação  
- Realiza o tratamento automático das URLs das imagens dos produtos  
- Exibe mensagem quando não há produto selecionado  

A página prepara e valida os dados da compra, garantindo uma experiência organizada e segura antes da finalização do pedido.

---

## 🧾 Página FinalizarCompra

A página FinalizarCompra conclui o processo de compra, exibindo os produtos selecionados, coletando os dados do cliente e permitindo a escolha da forma de pagamento.

### Funcionalidades
- Exibição dos produtos com imagem, nome, tamanho, quantidade e valor total  
- Cálculo automático do total do pedido  
- Preenchimento automático dos dados do usuário autenticado  
- Consulta de CEP para preenchimento do endereço  
- Seleção entre as formas de pagamento Pix, Boleto e Cartão  
- Validação dos dados antes da finalização da compra  

### Integração
- Utiliza o CartContext para gerenciamento e atualização do carrinho  
- Consome a API para carregar os dados do usuário e processar a compra  
- Integra os componentes AbaPix, AbaCartao e BtnFinalizarCompra  
- Realiza o tratamento automático das URLs das imagens dos produtos  

### Controle e feedback
- Exibe mensagens temporárias de sucesso e erro durante o processo de pagamento  
- Remove do carrinho os produtos comprados após a confirmação da compra  
- Redireciona para a página de acompanhamento do pedido após a finalização  
- Exibe mensagem quando não há produtos selecionados para compra  

A página centraliza a etapa final do fluxo de compra, reunindo informações do pedido, dados do cliente e opções de pagamento para garantir uma finalização segura e organizada.

---

## 🔘 Componente BtnFinalizarCompra

O BtnFinalizarCompra é um componente reutilizável utilizado para executar ações de finalização de compra em diferentes etapas da aplicação.

### Funcionalidades
- Exibição de texto personalizado por meio de propriedades  
- Execução de ações ao ser clicado  
- Suporte ao estado desabilitado para impedir interações quando necessário  

### Integração
- Pode ser utilizado em páginas como Carrinho, Checkout e FinalizarCompra  
- Estilizado por meio do arquivo `BtnFinalizarCompra.css`  

O componente padroniza os botões de finalização da aplicação, garantindo consistência visual, reutilização de código e melhor manutenção da interface.

---

## 📦 Página StatusPedido

A página StatusPedido exibe o progresso em tempo real do rastreamento de um pedido, além de listar recomendações de produtos para o usuário.

### Funcionalidades
- Linha do tempo interativa (*stepper*) com 5 etapas visuais de rastreamento do pedido
- Avanço simulado e automático do status do pedido baseado em tempo  
- Renderização de uma lista de recomendações utilizando o componente secundário `ProductList`  

### Integração com backend
- Consome a lista de produtos recomendados via requisição GET utilizando a API nativa `fetch`  
- Aponta diretamente para o ambiente de produção hospedado no Render: `https://runshoes-backend.onrender.com/api/products`  

### Rastreamento e Animação
- Estrutura baseada em etapas: Pedido Realizado, Pagamento Confirmado, Pedido Enviado, Em Trânsito e Entregue  
- Hook `useEffect` configura um intervalo que avança o status automaticamente a cada 10 segundos  
- Substituição automática dos ícones das etapas concluídas por um símbolo de checkmark (✔)  
- Gerenciamento e limpeza do temporizador (`clearInterval`) para prevenir vazamentos de memória (*memory leaks*)  

### Controle e navegação
- Estado interno controlado por `useState` para gerenciar o passo atual do rastreamento e os dados da API  
- Estilização dedicada via `StatusPedido.css` para demarcar os estados ativos e as linhas de conexão do *stepper* A página oferece uma experiência visual fluida e dinâmica para o acompanhamento logístico do pedido, aproveitando o espaço para impulsionar novas conversões com vitrines de recomendação.

---

## 💰 Componente AbaPix

O AbaPix exibe as opções de pagamento via Pix ou Boleto na finalização da compra, alternando o conteúdo conforme o tipo de pagamento selecionado.

### Funcionalidades
- Renderização condicional baseada na prop `tipo`:
  - "pix" → Exibe QR Code e chave Pix com opção de cópia  
  - "boleto" → Exibe imagem do boleto bancário  
- Permite copiar a chave Pix para a área de transferência  

### Personalização e uso
- Utiliza imagens locais para QR Code e boleto  
- Estilizado com `AbaPix.css`  
- Usado na página de finalização de compra, integrado ao sistema de seleção de pagamento  

Oferece uma interface simples e direta para métodos de pagamento alternativos, facilitando a escolha do usuário na etapa final da compra.

---

## 💳 Componente AbaCartao

O AbaCartao exibe e gerencia o formulário de pagamento com cartão de crédito na finalização da compra.

### Funcionalidades
- Preenchimento de número do cartão (16 dígitos), validade (MM/AA) e CVV  
- Campos individuais para o número do cartão com navegação automática entre inputs  
- Máscara e controle de entrada apenas numérica  

### Validação, segurança e integração
- Número do cartão: 16 dígitos obrigatórios  
- Validade: mês entre 01-12 e ano não pode estar vencido  
- CVV: mínimo de 3 dígitos  
- Exibe mensagens de erro em caso de dados inválidos  
- Disponibiliza função global `validarCartao` para validação no momento da compra  
- Integra com API para carregar cartão salvo do usuário  
- Permite opção de salvar cartão para compras futuras  

### Interações inteligentes
- Avança automaticamente entre campos ao digitar  
- Retorna foco ao campo anterior ao apagar valores  
- Formata mês automaticamente (ex: 2 → 02)  
- Divide número do cartão em blocos para melhor visualização  
- Exibe dica interativa do CVV com `AnimacaoCartao`  

### Comportamentos adicionais
- Controla estado de salvamento do cartão  
- Sincroniza dados do cartão com `window` para uso no fluxo de pagamento  
- Remove dados globais ao desmontar o componente  

Oferece uma experiência segura, validada e interativa para pagamentos com cartão, garantindo precisão e usabilidade no processo de compra.

---

## 🎴 Componente AnimacaoCartao

O AnimacaoCartao exibe uma animação visual de um cartão de crédito, destacando a localização do CVV.

### Funcionalidades
- Exibe frente e verso do cartão de crédito  
- Mostra chip na frente e tarja preta no verso  
- Destaca a área do CVV com animação visual  

### Animação
- Efeito de flip entre frente e verso do cartão  
- Realce animado na área do CVV para facilitar identificação  

### Uso e personalização
- Utilizado dentro do componente AbaCartao  
- Ativado ao clicar no ícone de ajuda do CVV  
- Estilizado via `AnimacaoCartao.css` e SVG para efeito visual  

Fornece orientação visual clara e melhora a experiência do usuário no preenchimento do CVV.

---

## 📝 Página de Cadastro

A página Cadastro permite que novos usuários criem uma conta, preenchendo informações pessoais, login e endereço.

### Funcionalidades
- Formulário com nome, CPF, email, senha e confirmação de senha  
- Preenchimento e validação de endereço completo  
- Máscaras automáticas para CPF e CEP  
- Validação de campos obrigatórios antes do envio  
- Integração com API para cadastro de usuário  

### Integração com backend
- Carrega dados iniciais do usuário via `/usuario/dados-iniciais`  
- Envia registro de usuário via POST em `/usuario/register`  
- Utiliza axios e serviço `api` para comunicação com o backend  

### Endereço
- Consulta automática de CEP via ViaCEP  
- Preenchimento automático de rua, bairro, cidade e estado  
- Opção de marcar “S/N” para número do endereço  
- Campos de cidade e estado somente leitura  

### Validações e regras
- CPF e CEP formatados automaticamente  
- Email validado por tipo de input  
- Senha com confirmação obrigatória  
- Controle de número do endereço com opção de ausência (S/N)  
- Exibição de mensagens de erro em caso de falha  

### Controle e navegação
- Redireciona para login após cadastro bem-sucedido  
- Botão de retorno para página inicial  
- Exibe mensagens de erro quando necessário  

A página centraliza o processo de criação de conta, garantindo validação, integração com backend e preenchimento inteligente de endereço para melhorar a experiência do usuário.

---

## ✏️ Página EditarCadastro

A página EditarCadastro permite que o usuário logado atualize seus dados pessoais, credenciais de login e endereço.

### Funcionalidades
- Formulário pré-preenchido com os dados atuais do usuário  
- Edição opcional de senha com campo de confirmação  
- Máscaras automáticas para os campos de CPF e CEP  
- Validação de campos obrigatórios antes do envio  
- Exibição de mensagens de sucesso ou erro  

### Integração com backend
- Recebe os dados iniciais via estado de navegação (`location.state.user`)  
- Envia os dados atualizados via requisição PUT para `/usuario/editar/:id`  
- Utiliza axios através do serviço `api` para comunicação  

### Endereço
- Consulta automática de CEP via API ViaCEP ao digitar ou sair do campo  
- Preenchimento automático de rua, bairro, cidade e estado  
- Opção de marcar "S/N" para número, desabilitando o campo de texto  
- Campos de cidade e estado configurados como somente leitura  

### Validações e regras
- Nome e email são campos obrigatórios  
- Nova senha deve conter no mínimo 8 caracteres (se preenchida)  
- Confirmação de senha deve ser idêntica à nova senha  
- CPF e CEP têm seus caracteres não numéricos limpos antes do envio  

### Controle e navegação
- Redireciona o usuário para a página de login 2 segundos após o sucesso  
- Botão "Voltar" para navegação direta para a página de login  

A página simplifica a manutenção da conta do usuário, unindo validações de segurança, preenchimento inteligente de endereço e feedback visual de sucesso ou erro.

---

## 🔑 Página ForgotPassword

A página ForgotPassword permite que o usuário inicie o processo de recuperação de conta validando o seu email cadastrado.

### Funcionalidades
- Formulário simples para inserção do email de recuperação  
- Validação local para garantir que o campo não seja enviado vazio  
- Exibição dinâmica de mensagens de erro caso o email não seja encontrado  

### Integração com backend
- Envia o email via requisição POST para o endpoint `/usuario/verificar-email`  
- Utiliza a instância `api` para comunicação com o servidor  
- Captura os dados do usuário retornados pela API após a validação bem-sucedida  

### Validações e regras
- Validação obrigatória de preenchimento do campo de email antes do disparo da requisição  
- Tratamento de erro genérico ou específico caso o e-mail não conste na base de dados  

### Controle e navegação
- Redireciona para a página `/editar-cadastro` enviando os dados do usuário via estado (`location.state.user`) após a validação  
- Botão "Voltar" para navegação direta de retorno à tela de login  

A página oferece uma porta de entrada segura para a recuperação de credenciais, validando a existência da conta antes de liberar o fluxo de edição de dados.
---

## 🔐 Página ResetPassword

A página ResetPassword permite que o usuário crie uma nova credencial de acesso utilizando um token de recuperação enviado via URL.

### Funcionalidades
- Formulário para inserção da nova senha e confirmação  
- Validação local para garantir a correspondência entre os campos  
- Exibição de mensagens de feedback para sucesso ou falhas da API  

### Integração com backend
- Captura o parâmetro `token` diretamente da URL utilizando o hook `useParams`  
- Envia a nova senha via requisição POST para o endpoint `/reset-password/:token`  
- Utiliza a instância `api` para realizar a comunicação com o servidor  

### Validações e regras
- Verificação obrigatória de igualdade entre o campo de nova senha e confirmação antes do envio  
- Tratamento e exibição de mensagens de erro customizadas vindas do backend em caso de falha ou token expirado  

### Controle e navegação
- Redireciona o usuário automaticamente para a página de `/login` após 2 segundos em caso de sucesso  

A página conclui o fluxo de recuperação de conta de forma objetiva, garantindo que a nova senha seja validada e gravada com segurança no banco de dados.
