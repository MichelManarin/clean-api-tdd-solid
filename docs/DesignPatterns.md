# Padrões de Projeto

> ## CLEAN ARCHITECTURE

1. Adapters: As bibliotecas terceiras ficam isoladas em adapter invertendo a dependencia da aplicação

2. Decorator: Os controllers ficam englobados por um decorator que em caso de retorno 500 salva a exception no database, criando assim um evento de observability sobre os constroller

2. Composite: Algumas validações da aplicação são simplificadas pelo padrão composite, e diminuindo o tamanho do controller
