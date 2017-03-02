myApp.controller('userController', function($location, $scope, $cookies, userFactory){



	var getdate = function(){
		var datenow = new Date();
		var month = (datenow.getMonth() + 1).toString();
		var day = datenow.getDate().toString();
		var year = datenow.getFullYear().toString();

		day = day.length == 1 ? "0" + day : day;
		month = month.length == 1 ? "0" + month : month;
		return year + "-" + month + "-" + day


	}

	$scope.appointments;
	// $scope.user = $cookies.get('name');
	$scope.datenow = getdate()

	$scope.adduser = function(){
		userFactory.adduser($scope.newUser, function(data){
			if(data.hasOwnProperty('errors')){
				$scope.regErrors = data.errors;
			} else {
				$location.path('/')
				$scope.newUser = {}
			}
		})
	}

	$scope.loginuser = function(){
		userFactory.loginuser($scope.user, function(data){
			if(data.hasOwnProperty('errors')){
				$scope.loginErrors = data.errors;
			} else {
				console.log(data)
				$cookies.put("name", data['name'])
				$cookies.put("id", data['_id'])

				$location.url('/home');
			}
		})
	}

	$scope.initAppts = function(){
		$scope.user = $cookies.get('name');
		$scope.id = $cookies.get('id');
		userFactory.getAllAppts(function(data){
			// console.log(data);
			$scope.appointments = data;
		});
		
	}


	$scope.addAppt = function(){
		$location.url('/appointment')
	}


	$scope.logout = function(){
		$cookies.remove('name');
		$cookies.remove('id');
		$scope = {}
		$location.url('/');	
	}

	$scope.deleteAppt = function(apptID){
		console.log(apptID)
		var data = {}
		data.id = apptID
		userFactory.deleteAppt(data, function(data){
			console.log("Sucessfully Deleted Appt")
			// $scope.initAppts();
			$scope.appointments = {};
			$scope.appointments = data;
		})

	}


	$scope.submitForm = function(){
		console.log($scope.appointment)
		$scope.errors = []
		var data = {date: new Date($scope.appointment.date)}
		// userFactory.getnumberofdates(data, function(data){
		// 	if (data >= 3){
		// 		$scope.errors.push("Date is booked full, please pick another")	
		// 	}
		// })

			
		for (var i = 0; i < $scope.appointments; i++){
			if (data.dat == $scope.appointments[i].date){
				console.log("MATCH")
				console.log($scope.appointments[i])	
			}
			
		}
		


		if (!$scope.appointment.date){
			$scope.errors.push("Date is required")
		} else if ($scope.appointment.date < $scope.datenow){
			$scope.errors.push("Date must be in the future")
		}
		


		if (!$scope.appointment.time){
			$scope.errors.push("Time is required")	
		}

		if (!$scope.appointment.complain) {
			$scope.errors.push("Complain is required")	
		} else if ($scope.appointment.complain.length < 10){
			$scope.errors.push("Complain must be longer than 10 characters")	
		}
		console.log($scope.errors)

		$scope.appointment.date = new Date($scope.appointment.date);
		$scope.appointment.name = $scope.user;
		$scope.appointment.userid = $scope.id;
		if ($scope.errors.length == 0){
			userFactory.addAppt($scope.appointment, function(data){
				console.log("Successfully created a new Appointment")
				console.log(data)
				$location.path('/home')
			})
		}

	}

});