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
     * Преобразование внутреннего кода в код для интерфейса
     */
    getDisplayLang(langCode) {
        const displayMap = {
            'arm': 'ARM',
            'rus': 'RUS',
            'eng': 'ENG'
        };
        return displayMap[langCode] || 'ARM';
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
        const buttons = document.querySelectorAll('.multilingual-language-switcher button');
        const displayLang = this.getDisplayLang(this.currentLanguage);
        
        buttons.forEach(button => {
            button.classList.remove('active-language');
            if (button.getAttribute('data-lang') === displayLang) {
                button.classList.add('active-language');
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
