## Развертывание инфраструктуры для разработки

### Создание приложения и репозитория

Был создан [репозиторий](https://github.com/Solechko/dz_infrastructure) на GitHub с проектом, представляющим собой простой редактор списка покупок. Он позволяет добавлять записи в список, удалять их, а так же очищать весь список для возможности начать его заполнение с чистого листа.
Список инициализируется при старте приложения и сохраняется в переменной. Поэтому при перезапуске приложения или его остановке, список будет сброшен.

В приложение добавлено логгирование времени выполнения запросов (получение списка элементов, добавление, удаление элемента, очистка всего списка) с помощью команд вида:
    console.time('get');
    console.timeEnd('get');

После запуска приложения и выполнения операций можно увидеть затраченное на их обработку время:
![01](https://cloud.githubusercontent.com/assets/.......png)

### Настройка ESLint

ESLint Был установлен командой: npm i -g eslint --save-dev
После чего командой "eslint --init" были проинициализированы его настройки.
Список выбранных опций мастера настройки приведен ниже:
    How would you like to configure ESLint? Answer questions about your style
    Are you using ECMAScript 6 features? No
    Where will your code run? Node
    Do you use CommonJS? No
    Do you use JSX? No
    What style of indentation do you use? Tabs
    What quotes do you use for strings? Single
    What line endings do you use? Unix
    Do you require semicolons? Yes
    What format do you want your config file to be in? JavaScript
    Successfully created .eslintrc.js file

Далее был настроен запуск ESLint по команде "npm test", для чего в файле package.json были отредактированы следующие строки:
    "scripts": {
        "start": "node server.js",
        "test": "eslint ."
    }

Для реализованного приложения так же были написаны юнит-тесты с использованием библиотек mocha и chai. Запустить их можно командой mocha. 

Для одновременного запуска по команде "npm test" линтера и юнит-тестов файл был package.json был изменен следующим образом:
    "scripts": {
        "start": "node server.js",
        "test": "eslint . & mocha"
    }

Результаты выполнения линтера и юнет-тестов представлены ниже:
![02](https://cloud.githubusercontent.com/assets/.......png)

### Настройка Heroku

После установки локальной копии Heroku, было опробовано создание и деплой тестового проекта согласно инструкции: https://devcenter.heroku.com/articles/getting-started-with-nodejs

TODO heroku logs


    - Настроить хостинг на Heroku для Node.js: https://devcenter.heroku.com/ и нажать Get started, там будет пошаговая инструкция. На примере тестового приложения, предложенного Heroku изучить структуру
    - Задание: изучить `heroku logs` – что за логи пишет приложение? Написать это в README.md
    - Настроить в своём приложении Heroku-окружение аналогично примеру
    - Залить его в  Heroku, убедиться, что всё работает

### Настройка Travis
    - Настроить CI с помощью Travis в своём репозитории, следуя инструкции: https://docs.travis-ci.com/user/getting-started
    - Настроить деплой ветки master в Heroku, следуя инструкции: https://docs.travis-ci.com/user/deployment/heroku
    - Добавить в README.md плашку "build"

### Дополнительные задания:
    - Настроить облачный линтер BitHound: https://www.bithound.io/
    - Настроить внешний мониторинг приложения с помощью сервиса http://uptimerobot.com/ При настройке лучше ставить большой интервал проверок, так как бесплатный тарифный план Heroku ограничивает время аптайма приложений
    - Использовать сервис с некоторой базовой логикой и написать хотя бы пару тесто




[![Build Status](https://travis-ci.org/Solechko/dz_infrastructure.svg?branch=master)](https://travis-ci.org/Solechko/dz_infrastructure)
[![bitHound Overall Score](https://www.bithound.io/github/Solechko/dz_infrastructure/badges/score.svg)](https://www.bithound.io/github/Solechko/dz_infrastructure)