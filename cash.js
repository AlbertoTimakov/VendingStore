	

		function Cash( data ){

			var data = JSON.parse( JSON.stringify( data ) )

			var getIndexByRating = function( rating ){

				for( var index = 0; index < data.length; index++ ){
					if( data[index].rating == rating ){
						return index;
					}
				}

				return null;
			};

			this.getNumberOfCoinByRating = function( rating ){

				var index = getIndexByRating(rating);

				if(index !== null){
					return data[index].count;
				}else{
					return null;
				}
			};

			this.getValueByRating = function( rating ){

				var index = getIndexByRating( rating );

				if(index !== null){
					return data[index].value;
				}else{
					return null;
				}
			};

			this.increaseNumberOfCoinByRating = function( rating ){

				var index = getIndexByRating(rating);

				if(index !== null){
					data[index].count = data[index].count + 1;
					return data[index].count;
				}else{
					return null;
				}
			};

			this.decreaseNumberOfCoinByRating = function( rating ){

				var index = getIndexByRating(rating);

				if(index !== null){
					data[index].count = data[index].count - 1;
					return data[index].count;
				}else{
					return null;
				}
			};
		};