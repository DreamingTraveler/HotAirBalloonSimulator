var HABSimulator = Framework.Class(Framework.Level , {
		load: function(){
        this.field = new Field();
				this.field.load();
		},
		loadingProgress: function(context, requestInfo){

		},

    initialize: function() {
		    this.field.init();
    },

    update: function() {
        this.field.update();
				
    },

    draw: function(parentCtx){
        this.field.draw(parentCtx);
    },

    keydown:function(e, list){
        this.field.player.keydown(e,list);
				if(e.key === 'F11') {
            if(!this.isFullScreen) {
                Framework.Game.fullScreen();
                this.isFullScreen = true;
            } else {
                Framework.Game.exitFullScreen();
                this.isFullScreen = false;
            }

        }
    },

		keyup:function(e, list){
        this.field.player.keyup(e,list);
		},

    touchstart: function (e) {

    },

    click: function (e) {

    }
});
