	

		function VendingMachine( products, cash ){

				var cash = new Cash(cash);
				var products = JSON.parse(JSON.stringify(products));
				var payment = 0;

				VendingMachine.PRODUCT_ENDED = -1;
				VendingMachine.NOT_ENOUGH_MONEY = -2;
				VendingMachine.PRODUCT_IS_NOT_DEFINED = -3;

				this.getPayment = function(){
					return payment;
				};

				this.getCash = function(){
					return cash;
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

					for( var i = 0; i < products.length; i++ ){
						
						var product = products[i];

						if( product.id == id ){
							
							if( product.count > 0 ){

								if( product.price <= payment ){

									payment -= product.price;
									
									product.count -= 1;

									return product;
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

					for(var i = 0; payment > 0 && i < coins.length; i++){

						var count = 0;

						while( payment >= coins[i].value ){

							var restOfCoinsByRating = cash.decreaseNumberOfCoinByRating(coins[i].rating);

							if( restOfCoinsByRating >= 0 ){

								count++;

								payment -= coins[i].value;
							}else{
								break;
							}
						}

						change.push( { rating: coins[i].rating, value: coins[i].value, count: count } );
					}

					return change;
				}
			};