new Vue({

    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        atack: function() {
            var playerDamage = this.calculateDamage(3, 12);
            this.monsterHealth -= playerDamage;
            this.turns.unshift({
                isPlayer: true,
                text: "O Jogador atingiu o Monstro com um ataque de " + playerDamage + " dano."
            });
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                alert("ganhou")
                this.turns = []
                this.gameIsRunning = false;
            }
            var monsterDamage = this.calculateDamage(2, 16);
            this.playerHealth -= monsterDamage;
            this.turns.unshift({
                isPlayer: false,
                text: "O Monstro atingiu o Jogador com um ataque de " + monsterDamage + " dano."
            });
            if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                alert("perdeu")
                this.turns = []
                this.gameIsRunning = false;
            };
            if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
                this.turns = []
            }
        },
        specialAtack: function() {
            var playerDamage = this.calculateDamage(5, 20);
            this.monsterHealth -= playerDamage;
            this.turns.unshift({
                isPlayer: true,
                text: "O Jogador atingiu o Monstro com um ataque de " + playerDamage + " dano."
            });
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                alert("ganhou")
                this.turns = []
                this.gameIsRunning = false;
            }
            var monsterDamage = this.calculateDamage(4, 15);
            this.playerHealth -= monsterDamage;
            this.turns.unshift({
                isPlayer: false,
                text: "O Jogador foi atingido pelo Monstro com um ataque de " + monsterDamage + " dano."
            });
            if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                alert("perdeu")
                this.turns = []
                this.gameIsRunning = false;
            };
            if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
                this.turns = []
            }
        },
        heal: function() {
            var playerHeal = this.calculateDamage(10, 13);
            this.playerHealth += playerHeal;
            this.turns.unshift({
                isPlayer: true,
                text: "O Jogador regenerou " + playerHeal + " de vida."
            });
            if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                alert("perdeu")
                this.turns = []
                this.gameIsRunning = false;
            }
            var monsterDamage = this.calculateDamage(4, 15);
            this.playerHealth -= monsterDamage;
            this.turns.unshift({
                isPlayer: false,
                text: "O Jogador foi atingido pelo Monstro com um ataque de " + monsterDamage + " dano."
            });
            if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
                this.turns = []
            };
        },
        giveUp: function() {
            alert("O monstro fugiu.")
            this.turns = []
            this.gameIsRunning = false
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        }
    }
});