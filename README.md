# Countdown Timer

Este é um projeto que usa HTML5, CSS3 e JavaScript para implementar um cronômetro.

Informe uma data no campo evidenciado e clique no botão 'Iniciar contagem'. O contador iniciará a contagem regressiva até as 00h00 da data informada. O tempo será disposto no formato *dias:horas:minutos:segundos*.

Há uma pequena validação no formato da data digitada, que não permite:
- Datas digitadas no formato errado (1/12/21)
- Datas passadas
- Data atual
Entretanto, não há validação para o número do dia e do mês ou para inserção de caracteres no lugar de '/', portanto o programa não funcionará como esperado caso a entrada seja:
- 40/40/2021
- 10/01/20/1
