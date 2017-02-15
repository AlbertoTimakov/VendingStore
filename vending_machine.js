	

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

				this.putMoney = function(id, number){

					cash.increaseNumberOfCoins(id);

					payment = payment + cash.getValueOfCoin(id) * number;

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

					var coinDenominations = cash.getСoinDenominations(); 

					var change = [];

					for( var i = 0; payment > 0 && i < coinDenominations.length; i++ ){

						var count = 0;

						while( payment >= coinDenominations[i].value ){

							var restOfCoins = cash.decreaseNumberOfCoins( coinDenominations[i].id );

							if( restOfCoins >= 0 ){

								count++;

								payment -= coinDenominations[i].value;
							}else{

								break;
							}
						}

						change.push( { 
							id: coinDenominations[i].id, 
							name: coinDenominations[i].name, 
							value: coinDenominations[i].value, 
							count: count 
						} );
					}

					return change;
				}
			};