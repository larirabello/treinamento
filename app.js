angular.module("listaTelefonica", ['ngMessages']);
		angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($filter, $q, $http, $log) {             
			var ctrl = this;	
			//ctrl.app = "Lista Telefonica";
			//ctrl.teste = ['item 1', 'item 2', 'item 3'];


			//modo mais longo
			function consumindoQ() {
				var defer = $q.defer();
				defer.resolve(['um', 'dois']);
				return defer.promise;
			}

			consumindoQ().then(function(resposta) {
				var res = resposta;
			});

			//modo mais fácil
			function consumindoQ2() {
				return $q.when({});
			}


			function getOperadoras(successCallBack) {
				var url = 'https://raw.githubusercontent.com/dhiegoatencio/treinamento/master/operadoras.json';
				return $http.get(url).then(function (response) {
					return response.data;
				});
			}


			function getOperadoras2(successCallBack) {
				var url = 'https://raw.githubusercontent.com/dhiegoatencio/treinamento/master/operadoras.json';
				return $http.get(url).then(function (response) {
					response.data.splice(0,1);
					return response.data;
				});
			}

			getOperadoras2().then(function(data) {
				ctrl.operadoras = data;
			})

			$q.all([getOperadoras(), getOperadoras2()]).then(function(response) {
				var teste = response;
			})




			function asyncBomba() {
				var defer = $q.defer();
				$log.info('Vai colocar a bomba!');

				setTimeout(function() {
					var tentativas = 0;
					while (Math.random() < 0.7) {
						tentativas++;
						defer.notify('Armando...');
						if(tentativas>3) {
							defer.reject('Explodiu!');
						}
					}
					defer.resolve('Bomba armada!!!');
				}, 3000);

				return defer.promise; 
			}

			asyncBomba().then(function resolveFunc(resolveResponse) {
				$log.info(resolveResponse)
			}, function rejectFunc() {}, function notifyFunc(notifyMessage){

				}
			);




			//duas chamadas ao mesmo tempo
			getOperadoras().then(function(response) {
				ctrl.operadoras = response;
			});
			
			//getOperadoras(function(operadoras) {
			//	ctrl.operadoras = operadoras;
			//});


			function _updateBtnApagar(contatos) {
				var selecionados = $filter('filter')(contatos, {selecionado: true});
				ctrl.disabledBtnApagar = selecionados.length === 0;
			}

			function onClickSelecionado(contato) {
				if (contato.selecionado) {
					ctrl.disabledBtnApagar = false;
				} else {
					_updateBtnApagar(ctrl.contatos);
				}
			}

			function adicionarContato(contato) {
				//ctrl.contatos.push(contato);
				ctrl.contatos.push(angular.copy(contato));
				
				//alert(contato.nome);
				//não é boa prática -> alert(ctrl.contato.nome);
			}

			function removerContato(contato, contatos) {
				var index = ctrl.contatos.indexOf(contato);
				contatos.splice(index, 1);
				if (!ctrl.disabledBtnApagar) {
					_updateBtnApagar(contatos);
				}
			}

			function removerContatos(contatos) {
				var contatosSelecionados = $filter('filter')(contatos, {selecionado: true});

				contatosSelecionados.forEach(function (contato, index) {
					removerContato(contato, contatos);
					//contatos.splice(index, 1); WRONG
					//removerContato(contatos, contato);
				});	
			}

			function desativaBtnApagar(contatos) {
				
			}


			//view properties
				ctrl.app = "Lista Telefonica";

				ctrl.contatos = [{nome:'larissa', telefone: '123-456'},
							{nome:'paloma', telefone: '123-456'},
							{nome:'felipe', telefone: '123-456'},
							{nome:'guilherme', telefone: '123-456'},
							{nome:'arthur', telefone: '123-456'},
							];
				ctrl.contato = undefined;

			//view functions



				ctrl.operadoras = undefined;

				ctrl.adicionarContato = adicionarContato;

				ctrl.removerContato = removerContato;

				ctrl.removerContatos = removerContatos;

				ctrl.disabledBtnApagar =  true;

				ctrl.onClickSelecionado = onClickSelecionado;
				
				});	