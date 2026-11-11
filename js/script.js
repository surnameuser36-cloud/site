// Управление мобильным меню
const menuButton = document.querySelector('.menu-button');
const mainMenu = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
    const opened = mainMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(opened));
});

mainMenu.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        mainMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
    }
});

// Переключение светлой и тёмной темы
const themeButton = document.querySelector('.theme-button');
const savedTheme = localStorage.getItem('city-theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeButton.textContent = '☀';
}

themeButton.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark-theme');
    themeButton.textContent = dark ? '☀' : '☾';
    localStorage.setItem('city-theme', dark ? 'dark' : 'light');
});

// Фильтрация карточек событий по категории
const filterButtons = document.querySelectorAll('.filter-button');
const eventCards = document.querySelectorAll('.event-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.filter;
        eventCards.forEach((card) => {
            const visible = category === 'all' || card.dataset.category === category;
            card.classList.toggle('hidden', !visible);
        });
    });
});

// Открытие, закрытие и отправка модальной формы
const dialog = document.querySelector('.event-dialog');
const openDialogButton = document.querySelector('.open-dialog');
const closeDialogButton = document.querySelector('.close-dialog');
const eventForm = document.querySelector('.event-form');
const formMessage = document.querySelector('.form-message');

openDialogButton.addEventListener('click', () => dialog.showModal());
closeDialogButton.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

eventForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!eventForm.checkValidity()) {
        eventForm.reportValidity();
        return;
    }

    formMessage.textContent = 'Спасибо! Предложение принято.';
    eventForm.reset();
    setTimeout(() => {
        dialog.close();
        formMessage.textContent = '';
    }, 1400);
});
