# Docs-as-Code Prototype

Прототип системы продуктовой документации для бизнес-аналитиков.

## Stack

- **Markdown** — формат документации
- **Obsidian** — редактор для BA
- **MkDocs Material** — генератор статического сайта

## Quick Start

### 1. Установка зависимостей

```bash
python -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Запуск локального сервера

```bash
mkdocs serve
```

Открой в браузере: http://localhost:8000

### 3. Сборка статического сайта

```bash
mkdocs build
```

Результат в папке `site/`.

## Настройка Obsidian

1. Открой Obsidian
2. **Open folder as vault** → выбери корень этого репозитория
3. **Settings → Files & Links:**
   - Default location for new attachments: `assets/images`
   - Use [[Wikilinks]]: выключить (использовать Markdown links)
4. Рекомендуемые плагины:
   - **Obsidian Git** — для коммитов прямо из Obsidian
   - **Advanced Tables** — удобное редактирование таблиц
   - **Templates** — быстрая вставка шаблонов

## Структура репозитория

```
.
├── docs/                    # Документация
│   ├── products/            # Продукты
│   │   └── product-a/
│   │       └── capabilities/
│   │           └── payments/
│   └── templates/           # Шаблоны документов
├── assets/
│   └── images/              # Изображения (для Obsidian)
├── mkdocs.yml               # Конфигурация MkDocs
├── requirements.txt         # Python зависимости
└── README.md
```

## Создание нового документа

1. Скопируй подходящий шаблон из `docs/templates/`
2. Размести в нужной папке согласно иерархии
3. Заполни содержимое
4. Добавь в `mkdocs.yml` в секцию `nav`

## Иерархия документации

```
Product → Capability → Feature → Requirements
```

## GitHub Repository

https://github.com/nikxcost/docs_as_code
