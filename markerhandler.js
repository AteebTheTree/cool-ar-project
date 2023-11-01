AFRAME.registerComponent("markerhandler", {
    init: async function() {
        var players = await this.getPlayers();

        this.el.addEventListener("markerFound", () => {
            var playerName = this.el.getAttribute("player_name");
            var barcodeValue = this.el.getAttribute("barcode_vale")
        })
    },
    getPlayers: function() {
        return fetch("players.json")
        .then(res => res.json())
        .then(data => data)
    },
})