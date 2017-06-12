angular.module('marvel.controllers', [])

.controller('AppCtrl', function($scope, $http) {
	
})

.controller('listComicsCtrl', function($scope, $state, $http){
	var publicKey =  '534308e05c3ef949e284d282832621bc';
	var privateKey = 'a67a936b6168a42ed7beb6e2bfa7589d795dae81';

	var timestamp = Math.floor(Date.now() / 1000);
	var hashMd5 = timestamp + privateKey + publicKey;
	
	var hash = md5(hashMd5);

	var url = 'http://gateway.marvel.com/v1/public/comics?ts='+ timestamp +'&apikey='+ publicKey +'&hash='+hash;

	$http.get(url).then(function(response){
		$scope['comics'] = response['data']['data']['results'];
		console.log($scope['comics']);
	});
	
	$scope.details = function(idComic){
        $state.go('app.detailsComic', {idComic: idComic})
    };	
})

.controller('detailsComicCtrl', function($scope, $stateParams, $http){
		
	console.log($stateParams.idComic);
	
	var id = $stateParams.idComic;
	
	var publicKey =  '534308e05c3ef949e284d282832621bc';
	var privateKey = 'a67a936b6168a42ed7beb6e2bfa7589d795dae81';

	var timestamp = Math.floor(Date.now() / 1000);
	var hashMd5 = timestamp + privateKey + publicKey;
	
	var hash = md5(hashMd5);

	var url = 'http://gateway.marvel.com/v1/public/comics/' + id + '?ts=' + timestamp +'&apikey='+ publicKey +'&hash='+hash;

	$http.get(url).then(function(response){
		$scope['comic'] = response['data']['data']['results'][0];
		console.log($scope['comic']);
	});
	
});