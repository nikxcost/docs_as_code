# Docs-as-Code: Документация компании

Система продуктовой документации для бизнес-аналитиков на базе docs-as-code подхода.

## Для аналитиков (новичков)

**Начните здесь:** [Руководство по началу работы](docs/ONBOARDING.md)

Краткая версия:
1. Установите [GitHub Desktop](https://desktop.github.com/)
2. Клонируйте репозиторий
3. Установите [Obsidian](https://obsidian.md/)
4. Откройте папку репозитория как vault
5. Установите плагин **Obsidian Git**
6. Готово! Изменения синхронизируются автоматически

## Stack

- **Markdown** — формат документации
- **Obsidian** — редактор для BA (с автосинхронизацией)
- **MkDocs Material** — генератор статического сайта
- **GitHub Actions** — автоматический деплой

## Для разработчиков

### Локальный запуск

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

Открой в браузере: http://localhost:8000

### Сборка сайта

```bash
mkdocs build
```

Результат в папке `site/`.

## Структура репозитория

```
.
├── docs/                           # Документация
│   ├── products/                   # Продукты компании
│   │   └── [Product]/
│   │       └── capabilities/
│   │           └── [Capability]/
│   │               ├── index.md
│   │               └── features/
│   │                   └── [Feature]/
│   ├── templates/                  # Шаблоны документов
│   └── ONBOARDING.md               # Руководство для новичков
├── assets/
│   └── images/                     # Изображения
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline
├── .obsidian/                      # Настройки Obsidian
│   └── plugins/
│       └── obsidian-git/           # Конфиг автосинхронизации
├── mkdocs.yml                      # Конфигурация MkDocs
└── requirements.txt                # Python зависимости
```

## Иерархия документации

```
Product → Capability → Feature → Requirements
```

## Возможности

- **Mermaid диаграммы** — рисуйте схемы прямо в markdown
- **Draw.io** — вставляйте сложные диаграммы
- **Admonitions** — информационные блоки (note, warning, tip)
- **Автонавигация** — новые страницы появляются автоматически
- **Шаблоны** — готовые структуры для Feature, Capability, Requirements
- **Автосинхронизация** — изменения синхронизируются каждые 5 минут

## Совместная работа

### Для аналитиков

1. Открываете Obsidian — автоматически загружаются изменения коллег
2. Редактируете документы — сохраняете как обычно (Ctrl+S)
3. Закрываете Obsidian — изменения автоматически отправляются

### При конфликтах

Если два человека редактировали один файл:
1. Появится уведомление
2. Выберите нужную версию или объедините вручную
3. При сложных случаях — обратитесь к тимлиду

## CI/CD

При push в `main`:
1. GitHub Actions собирает сайт
2. Автоматически деплоится на GitHub Pages

## Ссылки

- **GitHub:** https://github.com/nikxcost/docs_as_code
- **Документация:** [ваш-сайт].github.io/docs_as_code
