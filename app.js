const tasks = [{
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function(arrOfTasks) {
    // удобнее перевести наш массив в объект объектов
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    // добавление элементов темы:
    const themes = {
        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
        light: {
            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color': '#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
    };

    // нужно предварительно сохранить название темы в переменной (для модуля, в котором пользователь отменяем выбранную тему и она возвращается назад)
    // let lastSelectedTheme = 'default'; - ставим тему по дефолту, а после добавили localStorage (JSON)
    let lastSelectedTheme = localStorage.getItem('app_theme') || 'defailt';
    console.log(lastSelectedTheme);
    

    // Elements UI
    const listContainer = document.querySelector( // находим нужный нам элемент
        '.tasks-list-section .list-group',
    );

    // тут мы ищем элементы формы 
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];

    // будем находить наш select через id
    const themeSelect = document.getElementById('themeSelect');

    // Events

    // будем вызывать тему и вызывать lastSelectedTheme
    setTheme(lastSelectedTheme);

    // функции будут вызваны раньше
    renderAllTasks(objOfTasks);

    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeletehandler);

    // вешаем обработчик на темы
    themeSelect.addEventListener('change', onThemeSelectHandler);

    // далее необходимо вывести наши задачи на страницу
    function renderAllTasks(tasksList) { // получает на вход объект тасков
        if (!tasksList) { // проверяет, что он передан
            console.error("Передайте список задач");
            return;
        }

        //создадим наш фрагмент
        const fragment = document.createDocumentFragment(); // далее создаем фрагмент с задачами, для того, чтобы не добавлять задачи по одной, чтобы не вызывать кажыдй раз перерисовку DOMa

        Object.values(tasksList).forEach(task => { // возвращет значение объекта в виде массива - создает генерацию нашего одного темплейта
            const li = listItemTemplate(task);
            fragment.appendChild(li); // сформировали фрагмент для того, чтобы ладее добавлять его в DOM
        });
        listContainer.appendChild(fragment); // обращаемся к контейнеру и вставляем туда весь наш fragment
    }

    // создаем функцию для li (фрагмент одной li)
    function listItemTemplate({_id, title, body} = {}) {
        const li = document.createElement("li");
        li.classList.add( // наполним классами нашу li
            'list-group-item', 
            'd-flex', 
            'align-items-center', 
            'flex-wrap', 
            'mt-2'
        ); // копируем все классы

        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = "bold";

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete task";
        deleteBtn.classList.add(
            'btn', 
            'btn-danger', 
            'ml-auto', 
            'delete-btn'
        );

        // сетим и получаем атрибут
        li.setAttribute('data-task-id', _id);

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add(
            'mt-2',
            'w-100'
        ); 

        // сейчас мы создали все наши элементы
        // теперь нам нужно всех их добавить в li
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(article);

        // в результате всего у нас получится li
        return li;
    }

    // пишем обработчик для события
    function onFormSubmitHandler(e) {
        e.preventDefault(); // убираем перезагрузку страницы рпи отправле формы
        // достаем знаечние input

        // теперь вытаскиваем события, которые были в input submit и body
        // получаем значения, которые были введены в форму
        const titleValue = inputTitle.value; // свое значение, которое хранится в это элементе
        const bodyValue = inputBody.value;
        
        if (!titleValue || !bodyValue) {
            alert("Пожалуйста, введите title и body");
            return;
        }

        const task = createNewTask(titleValue, bodyValue); // копию этой переменной мы получаем в переменной task
        
        const listItem = listItemTemplate(task); // теперь у нас есть одна задача в виде DOM объекта

        // добавляем нашу задачу в DOM
        listContainer.insertAdjacentElement("afterbegin", listItem);

        // очистка формы:
        form.reset();
    }

    // создание задачи и добавление в DOM (создаем отдельную функцию, которая занимается созданием элемента и отдельную функцию, которая занимается созданием объекта задачи)

    // эта функция будет создавать новый объект задачи и добавлять его в наш список тасков
    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`,
        };

        // создали под новым id новую задачу
        objOfTasks[newTask._id] = newTask; // добавляем в список всех тасков
        
        // далее возвращаем новую задачу или ее копию
        return {...newTask};
    }

    // имея id и родителя мы можем создать функцию о запросах на удаление
    function deleteTask(id) {
        const {title} = objOfTasks[id];
        const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
        
        // проверим, если isConfirm - false, то дальнейших действий мы не делаем
        if (!isConfirm) return isConfirm;
        delete objOfTasks[id];
        return isConfirm;
    }

    // делаем удаление
    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
    }

    // удаление таски, делегирование события
    function onDeletehandler({target}) {
        if (target.classList.contains('delete-btn')) {
            // нам нужно узнать id той задачи, которую мы хотим удалить, будем добавлять специальный атрибут
            // ищем родителя, у которого есть этот атрибут
            const parent = target.closest('[data-task-id');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id); // если удаляем таску, то true, если нет, то false            

            deleteTaskFromHtml(confirmed, parent);
        }
    }

    // обработчик события изменениея select
    function onThemeSelectHandler(e) {
        const selectedTheme = themeSelect.value;

        // спрашиваем у пользователя точно ли он хочет изменить тему
        const isConfirmed = confirm(
            `Вы действительно хотите изменить тему: ${selectedTheme}?`,
        );

        // проверка
        if (!isConfirmed) {
            themeSelect.value = lastSelectedTheme; // устанавливаем значение предыдущего (последнего выбранного)
            return;
        };
        setTheme(selectedTheme); // если же он выбрал эту тему
        lastSelectedTheme = selectedTheme; // то, после установки темы, тему делаем равным тому, что было выбрано

        // localStorage
        localStorage.setItem('app_theme', selectedTheme);
    }

    // эта функция устанавливает тему, принимает название темы. Нам нужно ее вытащить из объекта с темами
    function setTheme(name) {
        const selectedThemeObj = themes[name]; // вытаскиваем объект

        // теперь его нужно как-то засетить
        Object.entries(selectedThemeObj).forEach(([key, value]) => {
            console.log(key, value);

            // теперь нам нужно установить эти значения
            document.documentElement.style.setProperty(key, value);
        });
    }
})(tasks);


// Далее мы будем использовать localStorage и sessionStorage для того, чтобы была возвожность после перезагрузки страницы сохранять ту тему, которую мы выбрали

/* 
localStorage - хранилище в браузере, которое позволяет сохранять какие-то данные и оно их позволяет сохранять в формате типо объекта. Для этого дается специальный объект с набором методов. Остается доступным даже после перезагрузки страницы. 

Здесь данные хранятся в формате key -> value:

1. Записать значение в localStorage:
localStorage.setItem('myitem', 'myvalue');

2. Получить занчение из localStorage:
localStorage.getItem('myitem'); // "myvalue"

!! Лучше использовать методы по причине того, что, например, если я обращусь к свойству, которого там нет, то мы получим undefined. 
!! Если мы сделаем тоже самое, но только через метод getItem, то мы получим null

!! Мы можем хранить в localStorage какие-то сложные данные (объекты или массивы), но только в формате JSON
localStorage.setItem('user', JSON.stringify(user));
localStorage.getItem('user'); // "{"name":"Eugeni"}"

!! Соответственно, если мы будем получать своего usera через localStorage.user мы получим его нормально. Но, если там его не будет (!! а мы предполагаем, что он там есть и далее мы его парсим JSON.parse()), то при таком же парсинге (JSON.parse(localStorage.user)) мы получаем ошибку, поскольку запись localStorage.user вернула undefined, а undefined не может быть распарсиным.

!! Таким образом, лучше использовать методы JSON.parse(localStorage.getItem('user'));, поскольку при парсинге мы получим null, но ошибки уже не будет

3. Можем удалять значения из localStorage
localStorage.removeItem('myitem');

4. Можем очищать весь стек 
localStorage.clear();
*/


/*
sessionStorage - тоже самое, только сессия доступна только до тех пор, пока работает браузер (пока он не закрылся).

Эти же методы относятся и к sessionStorage
*/