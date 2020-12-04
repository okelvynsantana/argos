# Argos

Será a api principal de verificação de faces do banco máxima

## Requisitos funcionais

- O usuário deve enviar uma imagem, e api deve retornar se o usuário já existe na base de dados do Banco Máxima informando caso o usuário já exista com qual foto da collection é semelhante e qual a porcentagem de similaridade com a foto presente na base dados.

- Caso o rosto ainda não exista na collection ela deve adicionar o rosto na collection e retornar um false.


## Requisitos não funcionais.

- Uso do rekoginition da AWS;
- NodeJs com sdkgen;
- Banco de dados postgres;
- typeorm;
