// Скрипт для QuickAdd - создание нового Продукта (Exxx name)
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    // Запрашиваем номер продукта
    const productNumber = await quickAddApi.inputPrompt("Номер продукта (например: 001):");
    if (!productNumber) return;

    // Запрашиваем название продукта
    const productName = await quickAddApi.inputPrompt("Название продукта:");
    if (!productName) return;

    const fullName = `E${productNumber} ${productName}`;
    const productFolder = `docs/products/${fullName}`;

    // Создаём папку продукта
    await app.vault.createFolder(productFolder);

    // Содержимое index.md
    const indexContent = `# ${fullName}

## Описание продукта

Краткое описание продукта и его назначения.

## Бизнес-цели

- Цель 1
- Цель 2
- Цель 3

## Целевая аудитория

| Сегмент | Описание | Потребности |
|---------|----------|-------------|
| Сегмент 1 | Описание сегмента | Основные потребности |
| Сегмент 2 | Описание сегмента | Основные потребности |

## Ключевые метрики

| Метрика | Текущее значение | Целевое значение |
|---------|------------------|------------------|
| Метрика 1 | - | Цель |
| Метрика 2 | - | Цель |

## Функциональные блоки

| Код | Название | Статус | Описание |
|-----|----------|--------|----------|
| FB001 | [Название блока](./FB001%20Название/index.md) | Planned | Описание |

## Интеграции

- **Система 1** — описание интеграции
- **Система 2** — описание интеграции

## Roadmap

| Квартал | Функциональный блок | Описание |
|---------|---------------------|----------|
| Q1 2025 | FB001 | Описание планов |
| Q2 2025 | FB002 | Описание планов |
`;

    // Создаём index.md
    await app.vault.create(`${productFolder}/index.md`, indexContent);

    // Открываем index.md
    const file = app.vault.getAbstractFileByPath(`${productFolder}/index.md`);
    await app.workspace.getLeaf().openFile(file);

    new Notice(`Продукт "${fullName}" создан!`);
};
