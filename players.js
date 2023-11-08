AFRAME.registerComponent("players", {
    init: async function() {
        console.log("Im the player script, and im working!")
        var players = await this.getPlayers()

        var barcodes = Object.keys(players)

        barcodes.map(e => {
            var player = players[e];
            this.createPlayers(player)
        })
    },
    getPlayers: function() {
        console.log("Wow, I just got a player!")
        return fetch("myplayers.json")
        .then(res => res.json())
        .then(data => data)
    },
    createPlayers: async function(json_data) {
        console.log("If this code is somehow working, I have no clue what's going on!")
        var playerName = json_data.player_name;
        var barcodeValue = json_data.barcodeValue;
        var countingStats = json_data.countingStats;
        var position = json_data.position;

        var scene = document.querySelector('a-scene')

        var marker = document.createElement('a-marker')

        marker.setAttribute("id", `marker-${barcodeValue}`);
        marker.setAttribute("type", "barcode");
        marker.setAttribute("player_name", playerName);
        marker.setAttribute("value", barcodeValue);
        marker.setAttribute("markerhandler", {});

        scene.appendChild(marker);

        var player = document.createElement('a-entity');
        player.setAttribute('id', `${playerName}-${barcodeValue}`)
        marker.appendChild(player)

        var card = document.createElement('a-entity');
        card.setAttribute("geometry", {
            primitive: "plane",
            width: 1,
            height: 1
        });
        card.setAttribute("position", { x: 0, y: 0, z: 0 });
        card.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        player.appendChild(card)
    }
})