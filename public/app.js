angular.module('app', []);

angular
    .module('app')
    .controller('appCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$http'];

function AppCtrl($scope, $http) {
    var vm = this;
    vm.selectCount = 0;
    
    let findHall = () => {
        $http.get('/theatre/findHall').then((response) => {
            if (response.status == 200) {
                vm.hall = response.data.data;
            }else {
                vm.err = "Unknown error. Please contact your admin.";
                return;
            }            
        });
    };

    findHall();

    vm.selectSeat = (arOne, arTwo) => {
        if (vm.hall.Seats[arOne].Row[arTwo].Bkd == 1) {
            vm.hall.Seats[arOne].Row[arTwo].Bkd = 2;
            vm.selectCount++;
        }else if (vm.hall.Seats[arOne].Row[arTwo].Bkd == 2) {
            vm.hall.Seats[arOne].Row[arTwo].Bkd = 1;
            vm.selectCount--;
        }
    }

    vm.bookTickets = () => {
        let obj = {
            '_id': vm.hall._id,
            'Seats': []
        };

        for (let i = vm.hall.Seats.length - 1; i >= 0; i--) {
            for (let j = vm.hall.Seats[i].Row.length - 1; j >= 0; j--) {
                if (vm.hall.Seats[i].Row[j].Bkd == 2) {
                    obj.Seats.push({
                        'arOne': vm.hall.Seats[i]._id,
                        'arTwo': vm.hall.Seats[i].Row[j]._id
                    });
                }
            }
        }

        $http.post('/theatre/bookTickets', obj).then((response) => {
            if (response.status == 200) {
                if (response.data.state == 1) {
                    for (let i = vm.hall.Seats.length - 1; i >= 0; i--) {
                        for (let j = vm.hall.Seats[i].Row.length - 1; j >= 0; j--) {
                            if (vm.hall.Seats[i].Row[j].Bkd == 2) {
                                vm.hall.Seats[i].Row[j].Bkd = 3;
                            }
                        }
                    }

                    alert(`${vm.selectCount} ticket(s) were booked successfully.`);
                
                    vm.selectCount = 0;
                }else {
                    vm.info = "No data is found.";
                }
            }else {
                vm.err = "Unknown error. Please contact your admin.";
                return;
            }            
        });
    }
}
