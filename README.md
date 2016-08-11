## Настройка инфраструктуры для разработки

[![Build Status](https://travis-ci.org/Solechko/dz_infrastructure.svg?branch=master)](https://travis-ci.org/Solechko/dz_infrastructure)
[![bitHound Overall Score](https://www.bithound.io/github/Solechko/dz_infrastructure/badges/score.svg)](https://www.bithound.io/github/Solechko/dz_infrastructure)

### Создание приложения

Был создан [репозиторий](https://github.com/Solechko/dz_infrastructure) на GitHub с проектом редактора списка покупок. 
Список инициализируется при старте приложения и сохраняется в переменной. Поэтому при перезапуске приложения или его остановке, список будет сброшен.

В приложение добавлено логгирование времени выполнения запросов (получение списка элементов, добавление, удаление элемента, очистка всего списка) с помощью команд:
    console.time('get');
    console.timeEnd('get');

После запуска приложения и выполнения операций можно увидеть затраченное на их обработку время:

![01](https://cloud.githubusercontent.com/assets/18663439/17575566/fd1b39e4-5f72-11e6-97d6-8229826ec027.png)

### Настройка ESLint и юнит-тестов

ESLint Был установлен командой: npm i -g eslint --save-dev
После чего командой "eslint --init" были проинициализированы его настройки.

Далее был настроен запуск ESLint по команде "npm test", для чего в файле package.json были отредактированы следующие строки:
    "scripts": {
        "start": "node server.js",
        "test": "eslint ."
    }

Для реализованного приложения так же были написаны юнит-тесты с использованием библиотек mocha и chai. Запустить их можно командой mocha. 

Для одновременного запуска по команде "npm test" линтера и юнит-тестов файл был package.json был изменен следующим образом:
    "scripts": {
        "start": "node server.js",
        "test": "eslint . && mocha"
    }

Результаты выполнения линтера и юнет-тестов представлены ниже:

![02](https://cloud.githubusercontent.com/assets/18663439/17575550/ca2dacb0-5f72-11e6-9733-e91afd00f55f.png)

### Настройка Heroku

После установки локальной копии Heroku, было опробовано создание и деплой тестового проекта согласно инструкции: https://devcenter.heroku.com/articles/getting-started-with-nodejs
В результате тестовое приложение было залито на Heroku и была проверена его работоспособность.

### Настройка Travis

После авторизации в Travis по учетной записи GitHub, был добавлен [репозиторий](https://github.com/Solechko/dz_infrastructure) и настроена Continous Integration для него с деплоем на сервер Heroku:
https://travis-ci.org/Solechko/dz_infrastructure

Ниже приведен скриншот настроек, для обеспечения построение проекта для пушей и пулл реквестов:

![03](https://cloud.githubusercontent.com/assets/18663439/17575559/e781d5ac-5f72-11e6-933f-15e3db044de9.png)

Вверху страницы добавлена плашка со статусом билда в Travis.
При отправке Pull Request происходит автоматический запуск команды npm test, запускающей линтер и выполнение юнит-тестов .

### Изучение логов Heroku

При первоначальной заливке разработанного приложения на Heroku через Travis, было появлялась ошибка:

![04](https://cloud.githubusercontent.com/assets/18663439/17576087/e0c7bbd2-5f77-11e6-8f94-06dc2e9dd7b7.png)

В результате изучения логов Heroku выяснилось, что при разработке была допущена ошибка - жестко прописан нестандартный порт для веб-приложения, с которым не работает Heroku. После исправления, приложение корректно развернулось. Ниже приведен скриншот лога с ошибкой:

![05](https://cloud.githubusercontent.com/assets/18663439/17576102/f4b0f62c-5f77-11e6-957b-3affe6d46481.png)

Так же логи Heroku можно посмотреть через инструменты командной строки:
    heroku logs --app dz-infrastructure-solechko
    
![06](https://cloud.githubusercontent.com/assets/18663439/17576112/101b1e92-5f78-11e6-803c-e15deb11683a.png)

В логах отображаются GET запросы на сервер, включая запросы ресурсов. Так же, поскольку в разработанном приложении добавлено логгирование времени выполнения запросов, эту информацию можно увидеть в логе.

### Настройка облачного линтера BitHound и мониторинга UptimeRobot

В облачном линтере BitHound была произведена авторизация с помощью учетной записи GitHub, после чего был добавлен [репозиторий](https://github.com/Solechko/dz_infrastructure) для анализа. 
Ниже приведен пример работы облачного линтера, который обнаружил отсутствие символа tab:

![07](https://cloud.githubusercontent.com/assets/18663439/17576120/20c4ea70-5f78-11e6-8623-ca3a05d57d97.png)

После исправления можно увидеть что анализ кода прошел успешно:

![09](https://cloud.githubusercontent.com/assets/18663439/17576143/47a62884-5f78-11e6-87db-42f0a2c370e3.png)

В UptimeRobot был создан новый монитор, тестирующий адрес https://dz-infrastructure-solechko.herokuapp.com/

![10](https://cloud.githubusercontent.com/assets/18663439/17576483/11e21bbe-5f7c-11e6-9e30-977b3ba0f6e3.png)

Настроено оповещение на электронную почту и интервал тестирования:

![11](https://cloud.githubusercontent.com/assets/18663439/17576488/246b760e-5f7c-11e6-9791-5966f67e88d4.png)

В результате, после нескольких часов работы монитора можно увидеть такую картину:

![08](https://cloud.githubusercontent.com/assets/18663439/17576133/380a38d4-5f78-11e6-8eb9-5c2852f193d9.png)

На ней видна статистика аптайма сервера, а так же время простоя.