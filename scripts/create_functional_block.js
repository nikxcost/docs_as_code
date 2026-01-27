// Скрипт для QuickAdd - создание нового Функционального блока (FBxxx name)
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    // Находим все продукты (папки с Exxx)
    const allProducts = app.vault.getAllLoadedFiles()
        .filter(f => f.children !== undefined)
        .filter(f => f.path.startsWith('docs/products/E'))
        .filter(f => f.parent && f.parent.path === 'docs/products')
        .map(f => f.path);

    if (allProducts.length === 0) {
        new Notice("Ошибка: не найдено продуктов (Exxx)");
        return;
    }

    // Показываем выбор продукта
    const selectedProduct = await quickAddApi.suggester(
        allProducts.map(f => f.replace('docs/products/', '')),
        allProducts
    );

    if (!selectedProduct) return;

    // Запрашиваем номер функционального блока
    const blockNumber = await quickAddApi.inputPrompt("Номер функционального блока (например: 001):");
    if (!blockNumber) return;

    // Запрашиваем название функционального блока
    const blockName = await quickAddApi.inputPrompt("Название функционального блока:");
    if (!blockName) return;

    const fullName = `FB${blockNumber} ${blockName}`;
    const blockFolder = `${selectedProduct}/${fullName}`;

    // Создаём папку
    await app.vault.createFolder(blockFolder);

    // Содержимое index.md
    const indexContent = `# ${fullName}

## Описание

Краткое описание функционального блока и его назначения в продукте.

## Бизнес-цели

- Цель 1
- Цель 2

## Границы функционального блока

**Входит в scope:**

- Функциональность 1
- Функциональность 2

**Не входит в scope:**

- Управление подписками (отдельный блок)
- Бухгалтерский учет (отдельный блок)

## Функции (Features)

| Код | Название | Статус | Описание |
|-----|----------|--------|----------|
| F001 | [Название функции](./F001%20Название/index.md) | Planned | Описание |

## Интеграции

- **Сервис 1** — описание интеграции
- **Сервис 2** — описание интеграции

## Метрики

| Метрика | Текущее значение | Целевое значение |
|---------|------------------|------------------|
| Метрика 1 | - | Цель |
| Метрика 2 | - | Цель |
`;

    // Создаём index.md
    await app.vault.create(`${blockFolder}/index.md`, indexContent);

    // Открываем index.md
    const file = app.vault.getAbstractFileByPath(`${blockFolder}/index.md`);
    await app.workspace.getLeaf().openFile(file);

    new Notice(`Функциональный блок "${fullName}" создан!`);
};
