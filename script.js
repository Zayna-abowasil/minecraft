const Game = {

    selectedTool: null,
    inventory: null,
    selectedInventoryItem: null,

    initialWorld: [
        ['sky','sky','sky','sky','sky','sky','sky','sky','sky','sky'],
        ['sky','tree','tree','sky','sky','sky','sky','tree','tree','sky'],
        ['sky','tree','tree','sky','sky','sky','sky','tree','tree','sky'],
        ['grass','grass','grass','grass','grass','grass','grass','grass','grass','grass'],
        ['dirt','dirt','dirt','dirt','dirt','dirt','dirt','dirt','dirt','dirt'],
        ['dirt','dirt','dirt','dirt','dirt','dirt','dirt','dirt','dirt','dirt'],
        ['rock','dirt','dirt','dirt','rock','dirt','dirt','rock','dirt','dirt'],
        ['rock','rock','dirt','rock','rock','dirt','rock','rock','dirt','rock'],
        ['rock','rock','rock','rock','rock','rock','rock','rock','rock','rock'],
        ['rock','rock','rock','rock','rock','rock','rock','rock','rock','rock']
    ],

    world: [],
    init() {
        this.world = this.initialWorld.map(row => [...row]);

        this.renderWorld();
        this.setupTools();
        this.setupInventory();
        this.setupButtons();
    },


    renderWorld() {
        const worldDiv = document.getElementById("world");

        worldDiv.innerHTML = "";

        this.world.forEach((row, rowIndex) => {

            row.forEach((type, colIndex) => {

                const tile = document.createElement("div");

                tile.className = "tile tile-" + type;

                tile.addEventListener("click", () => {
                    this.clickTile(rowIndex, colIndex);
                });

                worldDiv.appendChild(tile);
            });

        });
    },
    setupTools() {
        const tools = document.querySelectorAll(".tool");

        tools.forEach(tool => {

            tool.addEventListener("click", () => {

                tools.forEach(item => {
                    item.classList.remove("selected");
                });

                tool.classList.add("selected");

                this.selectedTool = tool.dataset.tool;
                this.selectedInventoryItem = null;
            });

        });
    },
    clickTile(row, col) {
        const type = this.world[row][col];
        if (this.selectedInventoryItem && type === "sky") {
            this.placeFromInventory(row, col);
            return;
        }
        if (this.selectedTool === "axe" && type === "tree") {
            this.removeTile(row, col);
        }
        else if (this.selectedTool === "pickaxe" && type === "rock") {
            this.removeTile(row, col);
        }
        else if (this.selectedTool === "shovel" && type === "dirt") {
            this.removeTile(row, col);
        }
    },
    removeTile(row, col) {
        const type = this.world[row][col];

        this.addToInventory(type);

        this.world[row][col] = "sky";

        this.renderWorld();
    },
    addToInventory(type) {
        this.inventory = type;

        const slot = document.getElementById("inventory-slot");

        slot.className = "inventory-slot tile-" + type;
    },
    setupInventory() {
        const slot = document.getElementById("inventory-slot");

        slot.addEventListener("click", () => {

            if (this.inventory) {

                this.selectedInventoryItem = this.inventory;
                this.selectedTool = null;

                document.querySelectorAll(".tool").forEach(tool => {
                    tool.classList.remove("selected");
                });

            }

        });
    },
    placeFromInventory(row, col) {

        this.world[row][col] = this.selectedInventoryItem;

        this.inventory = null;
        this.selectedInventoryItem = null;

        document.getElementById("inventory-slot").className =
            "inventory-slot";

        this.renderWorld();
    },
    resetWorld() {

        this.world = this.initialWorld.map(row => [...row]);

        this.selectedTool = null;
        this.inventory = null;
        this.selectedInventoryItem = null;

        document.getElementById("inventory-slot").className =
            "inventory-slot";

        document.querySelectorAll(".tool").forEach(tool => {
            tool.classList.remove("selected");
        });

        this.renderWorld();
    },
    setupButtons() {

        const landing = document.getElementById("landing-page");
        const game = document.getElementById("game-container");
        const startBtn = document.getElementById("start-btn");
        const resetBtn = document.getElementById("reset-btn");
        const backBtn = document.getElementById("back-btn");

        startBtn.addEventListener("click", () => {

            landing.style.display = "none";
            game.style.display = "flex";

        });
        resetBtn.addEventListener("click", () => {

            this.resetWorld();

        });
        backBtn.addEventListener("click", () => {

            game.style.display = "none";
            landing.style.display = "flex";

        });
    }

};
window.addEventListener("DOMContentLoaded", () => {
    Game.init();
});