AFRAME.registerComponent("players", {
    init: async function() {
        var players = await this.getPlayers()

        var barcodes = Object.keys(players)

        barcodes.map(e => {
            var element = players[e];
            this.createPlayers(element)
        })
    },
    getPlayers: function() {
        return fetch("players.json")
        .then(res => res.json())
        .then(data => data)
    },
    createPlayers: async function(json_data) {
        var playerName = json_data.player_name;
        var barcodeValue = json_data.barcodeValue;
        var countingStats = json_data.countingStats;
        var position = json_data.position;

        var scene = document.querySelector('a-scene')

        var marker = document.createElement('a-marker')

        marker.setAttribute("id", `marker-${barcodeValue}`);
        marker.setAttribute("type", "barcode");
        marker.setAttribute("element_name", playerName);
        marker.setAttribute("value", barcodeValue);
        marker.setAttribute("markerhandler", {});

        scene.appendChild(marker);

        var player = document.createElement('a-entity');
        player.setAttribute('id', `${playerName}-${barcodeValue}`)
        marker.appendChild(player)
    }
})