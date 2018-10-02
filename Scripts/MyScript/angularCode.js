/// <reference path="../angular.min.js" />
var app = angular.module("myapp", []);
app.controller("MyController", function ($scope, $http) {
    debugger;
    //This is for insert and Update functionality
    $scope.InsertData = function () {
      
        var action = document.getElementById("btnSave").getAttribute("value");
        if (action == "Submit") {
      
            $scope.Employe = {};
            $scope.Employe.Emp_Name = $scope.EmpName;
            $scope.Employe.Emp_City = $scope.EmpCity;
            $scope.Employe.Emp_Age = $scope.EmpAge;
            $http({
                method: "post",
                url: "http://localhost:51374/Home/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpName = "";
                $scope.EmpAge = "";
                $scope.EmpCity = "";
            })

        }
        else {
         
            $scope.Employe = {};
            $scope.Employe.Emp_Name = $scope.EmpName;
            $scope.Employe.Emp_City = $scope.EmpCity;
            $scope.Employe.Emp_Age = $scope.EmpAge;
            $scope.Employe.Emp_Id = document.getElementById("EmpID_").value;
            $http({
                method: "post",
                url: "http://localhost:51374/Home/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpName = "";
                $scope.EmpCity = "";
                $scope.EmpAge = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }

    //This is for fetching data from database.
    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "http://localhost:51374/Home/Get_AllEmployee"
        }).then(function (response) {
            console.log(response);
            console.log("1");
            $scope.employees = response.data;
            console.log("1");
            console.log(response.data);
        }, function () {
            alert("Error Occur");
        })

    };

    //This is for deleting the record.
    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "http://localhost:51374/Home/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };

    //This is for selecting record on clicking particular record.
    $scope.UpdateEmp = function (Emp) {
      
        document.getElementById("EmpID_").value = Emp.Emp_Id;
        $scope.EmpName = Emp.Emp_Name;
        $scope.EmpCity = Emp.Emp_City;
        $scope.EmpAge = Emp.Emp_Age;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Employee Information";
    };


}
)
