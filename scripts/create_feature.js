// Скрипт для QuickAdd - создание новой Функции (Fxxx name)
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    // Находим все функциональные блоки (папки с FBxxx)
    const allFolders = app.vault.getAllLoadedFiles()
        .filter(f => f.children !== undefined)
        .filter(f => f.path.startsWith('docs/products/') && f.path.includes('/FB'))
        .filter(f => !f.path.includes('/F') || f.path.match(/\/FB\d+/))
        .filter(f => f.name.match(/^FB\d+/))
        .map(f => f.path);

    if (allFolders.length === 0) {
        new Notice("Ошибка: не найдено функциональных блоков (FBxxx)");
        return;
    }

    // Показываем выбор функционального блока
    const selectedFolder = await quickAddApi.suggester(
        allFolders.map(f => {
            const parts = f.replace('docs/products/', '').split('/');
            return `${parts[0]} → ${parts[1]}`;
        }),
        allFolders
    );

    if (!selectedFolder) return;

    // Запрашиваем номер функции
    const featureNumber = await quickAddApi.inputPrompt("Номер функции (например: 001):");
    if (!featureNumber) return;

    // Запрашиваем название функции
    const featureName = await quickAddApi.inputPrompt("Название функции:");
    if (!featureName) return;

    const fullName = `F${featureNumber} ${featureName}`;
    const featureFolder = `${selectedFolder}/${fullName}`;

    // Создаём папку
    await app.vault.createFolder(featureFolder);

    // Содержимое index.md
    const indexContent = `# ${fullName}

## Зачем это нужно

Краткое описание бизнес-проблемы, которую решает данная функция.

## Бизнес-эффект

Ожидаемый эффект для бизнеса:

- Метрика 1: ожидаемое изменение
- Метрика 2: ожидаемое изменение

## Пользователи и сценарии

**Основные пользователи:**

- Тип пользователя 1
- Тип пользователя 2

**Ключевые сценарии:**

1. Сценарий 1: описание
2. Сценарий 2: описание

## Функциональные требования

| ID | Описание | Приоритет |
|----|----------|-----------|
| FR-001 | Требование 1 | Must |
| FR-002 | Требование 2 | Should |
| FR-003 | Требование 3 | Could |

## Нефункциональные требования

| Категория | Требование |
|-----------|------------|
| Производительность | Время отклика < X мс |
| Доступность | SLA 99.9% |
| Безопасность | Требование безопасности |

## Ограничения и допущения

**Ограничения:**

- Техническое ограничение 1
- Бизнес-ограничение 1

**Допущения:**

- Допущение 1
- Допущение 2

## Связанные сервисы

- \`service-name-1\` — описание взаимодействия
- \`service-name-2\` — описание взаимодействия
`;

    // Содержимое requirements.md
    const requirementsContent = `# Требования: ${fullName}

## Функциональные требования

| ID | Описание | Приоритет | Статус |
|----|----------|-----------|--------|
| FR-001 | Требование 1 | Must | Planned |
| FR-002 | Требование 2 | Should | Planned |
| FR-003 | Требование 3 | Could | Planned |

## Нефункциональные требования

| Категория | ID | Требование |
|-----------|-----|------------|
| Производительность | NFR-001 | Операция должна выполняться < X секунд |
| Доступность | NFR-002 | Функция доступна 99.9% времени |
| Безопасность | NFR-003 | Требование безопасности |
| Аудит | NFR-004 | Все операции логируются |

## Бизнес-правила

| ID | Правило |
|----|---------|
| BR-001 | Бизнес-правило 1 |
| BR-002 | Бизнес-правило 2 |
| BR-003 | Бизнес-правило 3 |

## Acceptance Criteria

### AC-001: Название сценария

**Given:** Предусловие (начальное состояние системы)
**When:** Действие пользователя
**Then:**

- Ожидаемый результат 1
- Ожидаемый результат 2
`;

    // Содержимое process.md
    const processContent = `# Процесс: ${fullName}

## Диаграмма процесса

\`\`\`mermaid
flowchart TD
    A[Начало] --> B{Условие?}
    B -->|Да| C[Действие 1]
    B -->|Нет| D[Действие 2]
    C --> E[Конец]
    D --> E
\`\`\`

## Шаги процесса

1. **Шаг 1** — описание
2. **Шаг 2** — описание
3. **Шаг 3** — описание

## Участники

| Роль | Ответственность |
|------|-----------------|
| Пользователь | Инициирует процесс |
| Система | Обрабатывает запрос |

## Исключения

| Ситуация | Действие |
|----------|----------|
| Ошибка валидации | Показать сообщение об ошибке |
| Таймаут | Повторить запрос |
`;

    // Создаём файлы
    await app.vault.create(`${featureFolder}/index.md`, indexContent);
    await app.vault.create(`${featureFolder}/requirements.md`, requirementsContent);
    await app.vault.create(`${featureFolder}/process.md`, processContent);

    // Открываем index.md
    const file = app.vault.getAbstractFileByPath(`${featureFolder}/index.md`);
    await app.workspace.getLeaf().openFile(file);

    new Notice(`Функция "${fullName}" создана!`);
};
