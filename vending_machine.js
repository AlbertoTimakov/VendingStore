	

		function VendingMachine( product, cash ){

				var cash = new Cash(cash);
				var product = JSON.parse(JSON.stringify(product));
				var payment = 0;

				VendingMachine.PRODUCT_ENDED = -1;
				VendingMachine.NOT_ENOUGH_MONEY = -2;
				VendingMachine.PRODUCT_IS_NOT_DEFINED = -3;

				this.getPayment = function(){
					return payment;
				};

				this.putMoney = function(rating, number){

					cash.increaseNumberOfCoinByRating(rating);

					payment = payment + cash.getValueByRating(rating) * number;

					return payment;
				};

				//Функция подсчета количества заданной цифры в числе
				/*function getDigitOccuranceNumber( value, number ){
					return ( value - (value % number) ) / number;
				};*/

				this.getProduct = function( id ){

					for( var i = 0; i < product.length; i++ ){

						if( product[i].id == id ){
							
							if( product[i].count > 0 ){

								if( product[i].price <= payment ){

									payment -= product[i].price;
									return product[i];
								}else{

									return VendingMachine.NOT_ENOUGH_MONEY;
								}
							}else{

								return VendingMachine.PRODUCT_ENDED;
							}
						}
					}

					return VendingMachine.PRODUCT_IS_NOT_DEFINED;
				};

				this.giveChange = function(){

					var coins = [ {rating: '10 рублей', value: 10}, {rating: '5 рублей', value: 5}, {rating: '2 рубля', value: 2}, {rating: '1 рубль', value: 1} ];

					var change = [];

					var index = 0;

					var count = 0;

					while( payment > 0 ){

						if( index < coins.length ){

							if( payment >= coins[index].value ){
								
								var numberOfCoinByRating = cash.decreaseNumberOfCoinByRating(coins[index].rating);

								if( numberOfCoinByRating >= 0 ){

									count++;
									payment -= coins[index].value;

									if(payment === 0){
										change.push( { rating: coins[index].rating, value: coins[index].value, count: count} );
									}
								}else{
									change.push( { rating: coins[index].rating, value: coins[index].value, count: count} );

									count = 0;
									index += 1;
								}
							}else{

									change.push( { rating: coins[index].rating, value: coins[index].value, count: count} );

									count = 0;
									index += 1;
							}
						}else{
							return;
						}
						
					}

					return change;
				}
			};