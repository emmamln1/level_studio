/**
 * Language Switcher System
 * Система переключения языков для Level Studio
 */

class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'arm'; // Армянский по умолчанию
        this.isLoaded = false;
        
        this.init();
    }

    /**
     * Инициализация системы переводов
     */
    async init() {
        try {
            // Ждем полной загрузки DOM
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Загружаем переводы
            await this.loadTranslations();
            
            // Получаем сохраненный язык из localStorage или устанавливаем армянский
            const savedLanguage = localStorage.getItem('level-studio-language') || 'arm';
            
            // Устанавливаем язык
            await this.setLanguage(savedLanguage);
            
            // Инициализируем обработчики событий
            this.initEventListeners();
            
            this.isLoaded = true;
        } catch (error) {
            console.error('Failed to initialize Language Switcher:', error);
        }
    }

    /**
     * Загрузка переводов из JSON файла
     */
    async loadTranslations() {
        try {
            // Пытаемся загрузить из JSON файла
            const response = await fetch('./translations.json');
            if (response.ok) {
                this.translations = await response.json();
                console.log('Translations loaded from JSON:', Object.keys(this.translations));
                return;
            }
        } catch (error) {
            console.warn('Failed to load translations.json:', error);
        }
    }


    /**
     * Инициализация обработчиков событий для переключателей языка
     */
    initEventListeners() {
        // Handle old language switcher buttons
        const languageButtons = document.querySelectorAll('.multilingual-language-switcher button');
        
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                
                if (lang) {
                    const langCode = this.getLangCode(lang);
                    this.setLanguage(langCode);
                }
            });
        });

        // Handle new dropdown language switcher
        this.initDropdownSwitcher();
    }

    /**
     * Initialize dropdown language switcher functionality
     */
    initDropdownSwitcher() {
        const trigger = document.querySelector('.language-switcher-trigger');
        const dropdown = document.querySelector('.language-dropdown');
        const currentLanguageSpan = document.querySelector('.current-language');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (!trigger || !dropdown) return;
        
        let isOpen = false;
        
        // Toggle dropdown on trigger click
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        // Handle language option selection
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const selectedLang = option.dataset.lang;
                const langCode = this.getLangCode(selectedLang);
                
                this.setLanguage(langCode);
                this.closeDropdown();
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const container = document.querySelector('.language-switcher-container');
            if (container && !container.contains(e.target)) {
                this.closeDropdown();
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isDropdownOpen()) {
                this.closeDropdown();
                trigger.focus();
            }
        });
        
        // Store references for later use
        this.dropdownElements = {
            trigger,
            dropdown,
            currentLanguageSpan,
            languageOptions
        };
    }

    toggleDropdown() {
        if (this.isDropdownOpen()) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        const { dropdown, trigger } = this.dropdownElements;
        dropdown.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
    }

    closeDropdown() {
        const { dropdown, trigger } = this.dropdownElements;
        dropdown.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
    }

    isDropdownOpen() {
        const { dropdown } = this.dropdownElements || {};
        return dropdown && dropdown.getAttribute('aria-hidden') === 'false';
    }

    /**
     * Преобразование кода языка из интерфейса в внутренний код
     */
    getLangCode(displayLang) {
        const langMap = {
            'ARM': 'arm',
            'RUS': 'rus', 
            'ENG': 'eng'
        };
        return langMap[displayLang] || 'arm';
    }

    /**
     * Преобразование внутреннего кода в нативное отображение языка
     */
    getDisplayLang(langCode) {
        const displayMap = {
            'arm': 'Հայ',
            'rus': 'Рус',
            'eng': 'Eng'
        };
        return displayMap[langCode] || 'Հայ';
    }

    /**
     * Преобразование внутреннего кода в код для data-lang атрибутов
     */
    getDataLang(langCode) {
        const dataLangMap = {
            'arm': 'ARM',
            'rus': 'RUS',
            'eng': 'ENG'
        };
        return dataLangMap[langCode] || 'ARM';
    }

    /**
     * Установка языка
     */
    async setLanguage(langCode) {
        if (!this.translations[langCode]) {
            console.warn(`Language ${langCode} not found, falling back to Armenian`);
            langCode = 'arm';
        }

        this.currentLanguage = langCode;
        
        // Сохраняем выбор в localStorage
        localStorage.setItem('level-studio-language', langCode);
        
        // Обновляем интерфейс
        this.updateLanguageButtons();
        this.translatePage();
        this.updatePageMeta(langCode);
        
        // Запускаем событие смены языка
        this.dispatchLanguageChangeEvent(langCode);
    }

    /**
     * Обновление активной кнопки языка
     */
    updateLanguageButtons() {
        // Update old language switcher buttons
        const buttons = document.querySelectorAll('.multilingual-language-switcher button');
        const displayLang = this.getDisplayLang(this.currentLanguage);
        
        buttons.forEach(button => {
            button.classList.remove('active-language');
            if (button.getAttribute('data-lang') === displayLang) {
                button.classList.add('active-language');
            }
        });

        // Update new dropdown language switcher
        this.updateDropdownLanguage();
    }

    /**
     * Update dropdown language switcher display
     */
    updateDropdownLanguage() {
        if (!this.dropdownElements) return;

        const { currentLanguageSpan, languageOptions } = this.dropdownElements;
        const displayLang = this.getDisplayLang(this.currentLanguage);
        const dataLang = this.getDataLang(this.currentLanguage);

        // Update current language display
        if (currentLanguageSpan) {
            currentLanguageSpan.textContent = displayLang;
        }

        // Update active state in dropdown options
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === dataLang) {
                option.classList.add('active');
            }
        });
    }

    /**
     * Перевод всех элементов на странице
     */
    translatePage() {
        const currentTranslations = this.translations[this.currentLanguage];
        if (!currentTranslations) return;

        // Переводим элементы с data-translate атрибутами
        const translatableElements = document.querySelectorAll('[data-translate]');
        
        translatableElements.forEach(element => {
            const translateKey = element.getAttribute('data-translate');
            const translation = this.getNestedTranslation(currentTranslations, translateKey);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = translation;
                    } else {
                        element.value = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Переводим элементы с data-translate-html (для HTML контента)
        const htmlTranslatableElements = document.querySelectorAll('[data-translate-html]');
        
        htmlTranslatableElements.forEach(element => {
            const translateKey = element.getAttribute('data-translate-html');
            const translation = this.getNestedTranslation(currentTranslations, translateKey);
            
            if (translation) {
                element.innerHTML = translation;
            }
        });
    }

    /**
     * Получение вложенного перевода по ключу (например: "nav.home")
     */
    getNestedTranslation(translations, key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], translations);
    }

    /**
     * Обновление мета-данных страницы
     */
    updatePageMeta(langCode) {
        // Обновляем lang атрибут
        document.documentElement.lang = this.getHtmlLangCode(langCode);
        
        // Обновляем мета-теги если есть переводы для них
        const currentTranslations = this.translations[langCode];
        if (currentTranslations && currentTranslations.meta) {
            this.updateMetaTags(currentTranslations.meta);
        }
    }

    /**
     * Получение HTML lang кода
     */
    getHtmlLangCode(langCode) {
        const htmlLangMap = {
            'arm': 'hy',
            'rus': 'ru', 
            'eng': 'en'
        };
        return htmlLangMap[langCode] || 'hy';
    }

    /**
     * Обновление мета-тегов
     */
    updateMetaTags(metaTranslations) {
        if (metaTranslations.title) {
            document.title = metaTranslations.title;
        }
        
        if (metaTranslations.description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', metaTranslations.description);
            }
        }
    }

    /**
     * Получение текущего языка
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Получение переводов для текущего языка
     */
    getCurrentTranslations() {
        return this.translations[this.currentLanguage] || {};
    }

    /**
     * Получение конкретного перевода
     */
    t(key) {
        return this.getNestedTranslation(this.getCurrentTranslations(), key) || key;
    }

    /**
     * Добавление атрибутов перевода к элементу
     */
    addTranslateAttribute(element, translateKey) {
        element.setAttribute('data-translate', translateKey);
        
        // Сразу переводим если система уже загружена
        if (this.isLoaded) {
            const translation = this.t(translateKey);
            if (translation && translation !== translateKey) {
                element.textContent = translation;
            }
        }
    }

    /**
     * Принудительное обновление переводов
     */
    forceUpdate() {
        if (this.isLoaded) {
            this.translatePage();
        }
    }

    /**
     * Получение вложенного перевода по ключу (например: "nav.home")
     */
    getNestedTranslation(translations, key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], translations);
    }

    /**
     * Обновление мета-данных страницы
     */
    updatePageMeta(langCode) {
        // Обновляем lang атрибут
        document.documentElement.lang = this.getHtmlLangCode(langCode);
        
        // Обновляем мета-теги если есть переводы для них
        const currentTranslations = this.translations[langCode];
        if (currentTranslations && currentTranslations.meta) {
            this.updateMetaTags(currentTranslations.meta);
        }
    }

    /**
     * Получение HTML lang кода
     */
    getHtmlLangCode(langCode) {
        const htmlLangMap = {
            'arm': 'hy',
            'rus': 'ru', 
            'eng': 'en'
        };
        return htmlLangMap[langCode] || 'hy';
    }

    /**
     * Обновление мета-тегов
     */
    updateMetaTags(metaTranslations) {
        if (metaTranslations.title) {
            document.title = metaTranslations.title;
        }
        
        if (metaTranslations.description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', metaTranslations.description);
            }
        }
    }

    /**
     * Получение текущего языка
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Получение переводов для текущего языка
     */
    getCurrentTranslations() {
        return this.translations[this.currentLanguage] || {};
    }

    /**
     * Получение конкретного перевода
     */
    t(key) {
        return this.getNestedTranslation(this.getCurrentTranslations(), key) || key;
    }

    /**
     * Отправка события смены языка
     */
    dispatchLanguageChangeEvent(language) {
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: language }
        }));
    }

    /**
     * Принудительное обновление переводов
     */
    forceUpdate() {
        if (this.isLoaded) {
            this.translatePage();
        }
    }
}

// Создаем глобальный экземпляр
window.languageSwitcher = new LanguageSwitcher();

// Экспортируем для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
}
