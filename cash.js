	

		function Cash( data ){

			var data = JSON.parse( JSON.stringify( data ) )

			var getIndexOfCoin = function( id ){

				for( var index = 0; index < data.length; index++ ){
					if( data[index].id == id ){
						return index;
					}
				}

				return null;
			};

			this.getNumberOfCoins = function( id ){

				var index = getIndexOfCoin(id);

				if(index !== null){
					return data[index].count;
				}else{
					return null;
				}
			};

			this.getValueOfCoin = function( id ){

				var index = getIndexOfCoin( id );

				if(index !== null){
					return data[index].value;
				}else{
					return null;
				}
			};

			this.increaseNumberOfCoins = function( id, number ){

				if( number == null ){
					number = 1;
				}

				var index = getIndexOfCoin(id);

				if(index !== null){
					data[index].count = data[index].count + number;
					return data[index].count;
				}else{
					return null;
				}
			};

			this.decreaseNumberOfCoins = function( id ){

				var index = getIndexOfCoin(id);

				if(index !== null){

					if( data[index].count > 0 ){
						data[index].count = data[index].count - 1;
						return data[index].count;
					}else{
						return -1;
					}
					
				}else{
					return null;
				}
			};
		};
