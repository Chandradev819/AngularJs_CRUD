/// <reference path="../angular.min.js" />
var app = angular.module("DemoApp", []);

app.controller("DeptController", function ($scope, $http) {
    $scope.InsertData = function () {
        var action = document.getElementById("btnSave").getAttribute("value");
        if (action == "Submit") {
           
            $scope.Dept = {};
            $scope.Dept.DeptName = $scope.DeptName;
            $scope.Dept.DeptDesc = $scope.DeptDesc;
            $http({
                method: "post",
                url: "http://localhost:51374/api/DeptService",
                datatype: "json",
                data: JSON.stringify($scope.Dept)
            }).then(function (response) {
                $scope.GetAllData();
                $scope.DeptName = "";
                $scope.DeptDesc = "";

            }, function () {
                alert("Error Occur");
            });
        }
        else {
            debugger;
            $scope.Dept = {};
            $scope.Dept.DeptName = $scope.DeptName;
            $scope.Dept.DeptDesc = $scope.DeptDesc;
            $scope.Dept.Id = document.getElementById("DeptID_").value;
            console.log($scope.Dept.Id);
            $http({
                method: "put",
                url: "http://localhost:51374/api/DeptService" + $scope.Dept.Id,
                datatype: "json",
                data: JSON.stringify($scope.Dept)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.DeptName = "";
                $scope.DeptDesc = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
            }, function () {
                alert("Error Occur");
            })

        }
    }

    //This is for fetching data from database.
    $scope.GetAllData = function () {
        debugger;
        $http({
            method: "get",
            url: "http://localhost:51374/api/DeptService"
        }).then(function (response) {
            $scope.Depts = response.data;
            console.log(response.data);
        }, function () {
            alert("Error Occur");
        })

    };

    //This is for deleting the record.
    $scope.DeleteDept = function (Dept) {
        debugger;
        $http({
            method: "delete",
            url: "http://localhost:51374/api/DeptService" + Dept.Id,
            datatype: "json",
            data: JSON.stringify(Dept)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        }, function () {
            alert("Error Occur");
        })
    };


    //This is for selecting record on clicking particular record.
    $scope.UpdateDept = function (Dept) {
        debugger;
        document.getElementById("DeptID_").value = Dept.Id;
        $scope.DeptName = Dept.DeptName;
        $scope.DeptDesc = Dept.DeptDesc;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        
    };

});