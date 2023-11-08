var playersArray = [];
AFRAME.registerComponent("markerhandler", {
    init: async function() {
        console.log("this is a marker handler, and I am doing my job")
        this.el.addEventListener("markerFound", () => {
            var playerName = this.el.getAttribute("player_name");
            var barcodeValue = this.el.getAttribute("value")
            playersArray.push({player_name: playerName, barcode_value: barcodeValue})

            var player = document.querySelector(`#${playerName}-${barcodeValue}`)
            player.setAttribute("visible", true)
        })

        this.el.addEventListener("markerLost", () => {
            var playerName = this.el.getAttribute("player_name")
            var index = playersArray.findIndex(x => x.player_name = playerName);
            if(index > -1) {
                playersArray.splice(index, 1)
            }
        })
    },
    tick: function() {
        if(playersArray.length > 1)
        {
            var player = this.getPlayers();
        }
    },
    getPlayers: function() {
        console.log("Wow, I just got a player!")
        return fetch("myplayers.json")
        .then(res => res.json())
        .then(data => data)
    },
})