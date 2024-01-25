# Camadas da aplicação

> ## CLEAN ARCHITECTURE

1. Domain: Contém a regra de negocios da aplicação, onde são definidos os conceitos, regras e comportamentos específicos do domínio.

2. Data: Camada responsável pelo acesso e persistência dos dados. Ela encapsula a lógica relacionada ao armazenamento e recuperação de dados do domínio. 

2. Infra: Camada responsável pelo isolamento de frameworks, bibliotecas externas, serviços de terceiros e outros elementos utilizados pela aplicação. Por considerar o mongo um serviço terceiro ele se encontra isolado nessa camada e ficando na Domain apenas as interfaces e useCases dos repositorios.

Exemplos de classes nessa camada podem ser adaptadores para APIs externas, serviços de autenticação, serviços de envio de e-mails, etc.

3. Main: "Junta o quebra cabeça" Essa camada é responsável por coordenar a interação entre as outras camadas. Ela é responsável por iniciar a aplicação, lidar com injeção de dependências, configurações e fluxo de controle geral. As classes nessa camada geralmente fazem a ponte entre os casos de uso do domínio, as operações de acesso a dados e as interfaces de usuário.

4. Presentation (Apresentação): Essa camada lida com a interação do usuário final. Ela inclui as interfaces de usuário, como interfaces gráficas, APIs ou qualquer outro mecanismo que permita a interação com o sistema. As classes nessa camada são responsáveis por receber as entradas do usuário (routes), exibir informações e encaminhar as solicitações (controllers) para a camada de aplicação (Main) para processamento.
