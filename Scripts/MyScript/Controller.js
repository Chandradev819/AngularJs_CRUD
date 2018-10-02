/// <reference path="Module.js" />
app.controller("crud_Controller", function ($scope, EmpCRUDServie) {
    debugger;
    $scope.divEmp = false;
    getAllEmps();
    function getAllEmps() {
     
        var getEmpData = EmpCRUDServie.getEmps()
        getEmpData.then(function (emp) {
            $scope.Emps = emp.data;
        }, function () {
            alert("Error in getting book records");
        })
    }

    $scope.editEmp = function (emp) {
        var getEmpData = EmpCRUDServie.getEmp(emp.Emp_Id);
        getEmpData.then(function (_emp) {
            $scope.Emp = _emp.data;
            $scope.Emp_Id = emp.emp_Id;
            $scope.EmpName = emp.empName;
            $scope.EmpCity = emp.empCity;
            $scope.EmpAge = emp.empAge;
            $scope.divEmp = true;
        }, function () {
            alert("Error in getting book records");

        })
    }

    $scope.AddUpdateEmp = function () {
        var Emp = {
            EmpId:  $scope.Emp_Id,
            EmpName: $scope.EmpName,
            EmpCity: $scope.EmpCity,
            EmpAge: $scope.EmpAge
        };

        var getEmpAction = $scope.Action;
        if (getEmpAction=="Update") {
            Emp.EmpId = $scope.emp_Id;
            var getEmpData = EmpCRUDServie.updateEmp(Emp);
            getEmpData.then(function (msg) {
                getAllEmps();
                alert(msg.data);
                $scope.divEmp = false;
            }, function () {
                alert('Error in updaing book record');
            });
        }
    }
    $scope.AddEmpDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divEmp = true;
    }
    $scope.deleteBook = function (Emp) {
        var getEmpData = EmpCRUDServie.DeleteEmp(Emp.emp_Id);
        getEmpData.then(function (msg) {
            alert(msg.data);
            getAllEmps();
        }, function () {
            alert('Error in deleting Emp record');
        });
    }

    function ClearFields() {
        $scope.Emp_Id = "";
        $scope.EmpName = "";
        $scope.EmpCity = "";
        $scope.EmpAge = "";
    }

    $scope.Cancel = function () {
        $scope.divEmp = false;
    };

})